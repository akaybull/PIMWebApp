import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Suspense, lazy } from "react";
import { store } from "./redux/store";
import SnackbarManager from "./components/SnackbarManager";
import { ThemeProvider } from "./theme/ThemeProvider";
import AuthGuard from "./components/AuthGuard";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Products = lazy(() => import("./pages/Catalog/Products"));
const Categories = lazy(() => import("./pages/Catalog/Categories"));
const ProductTags = lazy(() => import("./pages/Catalog/ProductTags"));
const Brands = lazy(() => import("./pages/Catalog/Brands/Brands"));
const BrandCreate = lazy(() => import("./pages/Catalog/Brands/BrandCreate"));

function AppContent() {
  return (
    <div className="min-h-screen">
      <SnackbarManager />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/brands"
            element={
              <AuthGuard>
                <Brands />
              </AuthGuard>
            }
          />
          <Route
            path="/brands/create"
            element={
              <AuthGuard>
                <BrandCreate />
              </AuthGuard>
            }
          />
          <Route
            path="/products"
            element={
              <AuthGuard>
                <Products />
              </AuthGuard>
            }
          />
          <Route
            path="/categories"
            element={
              <AuthGuard>
                <Categories />
              </AuthGuard>
            }
          />
          <Route
            path="/product-tags"
            element={
              <AuthGuard>
                <ProductTags />
              </AuthGuard>
            }
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
