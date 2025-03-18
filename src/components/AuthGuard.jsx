import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentLoginInformationsWithRoles } from "../redux/features/authSlice";

const AuthGuard = ({ children }) => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await dispatch(getCurrentLoginInformationsWithRoles()).unwrap();
      } catch (error) {
        console.error("Kullanıcı bilgileri alınamadı:", error);
      }
    };

    initializeAuth();
  }, [dispatch]);
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      Cookies.remove("token");
      return <Navigate to="/login" />;
    }

    return children;
  } catch (error) {
    Cookies.remove("token");
    return <Navigate to="/login" />;
  }
};

export default AuthGuard;
