import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/user/HomePage";
import 'react-toastify/dist/ReactToastify.css';
import Cart from "./components/Cart";
import Order from "./components/Order";
import AppProvider from "./context/AppProvider";
import OrderInfo from "./components/OrderInfo";
import AdminDash from "./components/AdminDash";
import Brand from "./components/Brand";
import Contact from "./components/Contact";
import ProductPage from "./pages/user/ProductPage";
import DetailsProductPage from "./pages/user/DetailsProductPage";
import LoginPage from "./pages/user/LoginPage";
import RegisterPage from "./pages/user/RegisterPage";
import CartPage from "./pages/user/CartPage";
import BrandPage from "./pages/user/BrandPage";
import ContactPage from "./pages/user/ContactPage";
import OrderPage from "./pages/user/OrderPage";
import OrderInfoPage from "./pages/user/OrderInfoPage";
function App() {
  return (
    <BrowserRouter> 
      <AppProvider>
        <Routes>
          <Route path="/admin-dashboard" element={<AdminDash />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<DetailsProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/brand" element={<BrandPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/orderinfo" element={<OrderInfoPage />} />
          <Route path="/pay-response" element={<Order />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
