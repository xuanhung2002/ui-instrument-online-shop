/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_GET_CART_ITEM } from "../service/api";
import { AppContext } from "../context/AppProvider";
import Cookies from "js-cookie";

function Hearder() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { countCartItem, setCountCartItem, fetchCountCartItem } =
    useContext(AppContext);
  useEffect(() => {
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
    if (user) {
      setUser(user);
    }
    fetchCountCartItem();
  }, [countCartItem]);

  const handleLogout = () => {
    if (user) {
      // localStorage.removeItem("user");
      Cookies.remove("user");

      window.location.reload();
    }
  };

  const handleGoToCart = async () => {
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
    if (user && user.token) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="fixed-top">
        <nav className="navbar bg-black py-1 shadow-sm text-light">
          <div className="container">
            <div className="d-flex justify-content-start float-left">
              <ul className="navbar-nav nav d-flex flex-row">
                <li className="header-info ms-3 d-none d-md-block">
                  <i className="header-info-item fa fa-map-marker text-warning me-1"></i>
                  K256/49/9 Âu Cơ, Hoà Khánh Bắc, Liên Chiểu, Đà Nẵng
                </li>
                <li className="header-info ms-3 d-none d-lg-block">
                  <i className="header-info-item fa fa-phone text-warning me-1"></i>
                  0384651408
                </li>
                <li className="header-info ms-3 d-none d-lg-block">
                  <i className="header-info-item fa fa-clock-o text-warning me-1"></i>
                  7:20 - 20:30
                </li>
              </ul>
            </div>
            {user ? (
              <div className="buttons me-5 float-right">
                <ul className="nav d-flex align-items-center">
                  <li className="button nav-item">
                    <p className="btn btn-outline-dark text-light ms-2">
                      <i className="fa fa-user text-warning ms-2"></i>{" "}
                      {user.username}
                    </p>
                  </li>
                  <li className="button nav-item">
                    <p
                      onClick={handleLogout}
                      to="/register"
                      className="btn btn-outline-dark text-light ms-2"
                    >
                      <i className="fa fa-logout text-warning ms-2"></i> Logout
                    </p>
                  </li>
                  <li className="nav-item ms-2">
                    <a href="">
                      <i className="fa fa-search text-light ms-4"></i>
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="buttons me-5 float-right">
                <ul className="nav align-items-center d-flex justify-content-between">
                  <li className="button nav-item">
                    <Link
                      to="/login"
                      className="btn btn-outline-dark text-light ms-2"
                    >
                      <i className="fa fa-sign-in text-warning ms-2"></i> Login
                    </Link>
                  </li>
                  <li className="button nav-item">
                    <Link
                      to="/register"
                      className="btn btn-outline-dark text-light ms-2"
                    >
                      <i className="fa fa-user-plus text-warning ms-2"></i>{" "}
                      Register
                    </Link>
                  </li>
                  <li className="nav-item ms-2">
                    <a href="">
                      <i className="fa fa-search text-light ms-4"></i>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
      <div className="mt-5">
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-lg">
          <div className="container d-flex flex-nowrap">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="header-info navbar-collapse d-flex justify-content-center">
              <ul className="navbar-nav mx-auto d-flex flex-row align-items-center">
                <li className="nav-item collapse navbar-collapse me-3">
                  <Link
                    to="/"
                    className="nav-link"
                    aria-current="page"
                    href="#"
                  >
                    HOME
                  </Link>
                </li>
                <li
                  className="nav-item collapse navbar-collapse me-4"
                  id="navbarNavDropdown"
                >
                  <a className="nav-link" href="/product">
                    PRODUCTS
                  </a>
                </li>
                <li className="nav-item logo">
                  <Link to="/" className="nav-link">
                    <img
                      src="/assets/logo.png"
                      alt="logo"
                      style={{ maxHeight: "160px" }}
                    />
                  </Link>
                </li>
                <li
                  className="nav-item collapse navbar-collapse ms-4"
                  id="navbarNavDropdown"
                >
                  <a className="nav-link" href="/brand">
                    BRAND
                  </a>
                </li>
                <li
                  className="nav-item collapse navbar-collapse ms-3"
                  id="navbarNavDropdown"
                >
                  <a className="nav-link" href="/contact">
                    CONTACT
                  </a>
                </li>
              </ul>
              <div className="cart-item" style={{}}>
                <a
                  onClick={() => handleGoToCart()}
                  className="btn btn-outline-dark d-flex flex-row"
                >
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  {""}
                  <span className="ms-1 ">
                    {"("}
                    {countCartItem}
                    {")"}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default React.memo(Hearder);
