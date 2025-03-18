import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { store } from "./redux/store";
import SnackbarManager from "./components/SnackbarManager";
import { ThemeProvider } from "./theme/ThemeProvider";
import AuthGuard from "./components/AuthGuard";
import Products from "./pages/Catalog/Products";
import Categories from "./pages/Catalog/Categories";
import ProductTags from "./pages/Catalog/ProductTags";
import Brands from "./pages/Catalog/Brands/Brands";
import BrandCreate from "./pages/Catalog/Brands/BrandCreate";

function AppContent() {
  return (
    <div className="min-h-screen">
      <SnackbarManager />
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
