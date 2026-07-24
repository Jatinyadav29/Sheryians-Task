import { Route, Routes } from "react-router";
import Home from "../Pages/Home";
import About from "../Pages/About";
import ProductsDetail from "../Pages/ProductsDetail";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Product from "../Pages/Product";
import ProtectedRoutes from "./ProtectedRoutes";
import Cart from "../Pages/Cart";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/about"
          element={
            <ProtectedRoutes>
              <About />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoutes>
              <Product />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoutes>
              <ProductsDetail />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;
