import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./components/Login";
import HomePage from "./pages/user/HomePage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Register from "./components/Register";
import 'react-toastify/dist/ReactToastify.css';
import DetailsProduct from "./components/DetailsProduct";
import Cart from "./components/Cart";
import Product from "./components/Product";
import Order from "./components/Order";
function App() {
  return (
    <BrowserRouter> 
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<DetailsProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product" element={<Product />} />
          <Route path="/order" element={<Order />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
