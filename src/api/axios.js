import axios from "axios";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "../redux/features/snackbarSlice";
const baseURL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json-patch+json",
    accept: "text/plain",
  },
});

const StatusCode = {
  Unauthorized: 401,
  Forbidden: 403,
  TooManyRequests: 429,
  InternalServerError: 500,
  NotFound: 404,
  BadRequest: 400,
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.ProjectId = import.meta.env.VITE_PROJECT_ID;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case StatusCode.Unauthorized:
          console.error("Unauthorized access. Redirecting to login...");
          break;
        case StatusCode.Forbidden:
          console.error("Access forbidden. You don't have permission.");
          break;
        case StatusCode.TooManyRequests:
          console.error("Too many requests. Please try again later.");
          break;
        case StatusCode.InternalServerError:
          dispatch(
            enqueueSnackbar({
              message: err.error.details || err.error.message,
              severity: "error",
              duration: 3000,
            })
          );
          break;
        case StatusCode.NotFound:
          console.error("The resource was not found.");
          break;
        case StatusCode.BadRequest:
          console.error("Bad request. Please check the input.");
          break;
        default:
          console.error("An unexpected error occurred.");
      }
    } else {
      console.error("Network error or server is not responding.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
