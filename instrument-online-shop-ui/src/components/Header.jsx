/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_GET_CART_ITEM } from "../service/api";
import { AppContext } from "../context/AppProvider";
import Cookies from "js-cookie";
import "../App.scss";
import { Button } from "react-bootstrap";
function Hearder() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { countCartItem, setCountCartItem, fetchCountCartItem } =
    useContext(AppContext);

  const [isSearchHovered, setIsSearchHovered] = useState(false);

  const [searchKey, setSearchKey] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef(null);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (
        menuOpen &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [menuOpen]);

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

  const handleSearchKeyChange = (event) => {
    setSearchKey(event.target.value);
  };
  const handleGotoSearchPage = () => {
    if (searchKey) {
      navigate(`/search/${searchKey}`);
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
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleGotoSearchPage();
    }
  };
  return (
    <div>
      <div className="fixed-top">
        <nav className="navbar bg-black py-1 shadow-sm text-light">
          <div className="container d-flex justify-content-between">
            <div className="col-lg-6 col-md-4 col-md-0 d-flex flex-row">
              <ul className="navbar-nav nav d-flex flex-row">
                <li className="header-info ms-3 d-none d-lg-block">
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

            <div className="col-lg-6 col-md-12 buttons d-flex flex-row ps-5 justify-content-center">
              <ul className="nav d-flex flex-row">
                <li className=" hover-pointer col-lg-6 col-sm-5 col-md-6 col-19">
                  <div
                    className="d-flex flex-row"
                    style={{ border: "1px solid #333333" }}
                  >
                    <div class="form-outline">
                      <input
                        type="search"
                        id="form1"
                        className="form-control"
                        placeholder="Search..."
                        style={{ borderRadius: "0" }}
                        value={searchKey}
                        onChange={handleSearchKeyChange}
                        onKeyDown={handleEnter}
                      />
                    </div>
                    <a
                      // href={`/search/${searchKey}`}
                      onClick={() => handleGotoSearchPage()}
                      type="button"
                      className="btn"
                    >
                      <i className="fa fa-search text-warning"></i>
                    </a>
                  </div>
                </li>
                {user ? (
                  <li className="col-lg-6 col-md-6 col-sm-7 col-7">
                    <span className="button nav-item">
                      <p className="btn btn-outline-dark text-light ps-2">
                        <i className="fa fa-user text-warning ms-2"></i>{" "}
                        {user.username}
                      </p>
                    </span>
                    <span className="button nav-item">
                      <p
                        onClick={handleLogout}
                        to="/register"
                        className="btn btn-outline-dark text-light ms-2"
                      >
                        <i
                          class="fa fa-sign-out text-warning"
                          aria-hidden="true"
                        ></i>{" "}
                        Logout
                      </p>
                    </span>
                  </li>
                ) : (
                  <>
                    <li className="ms-2">
                      <span className="button nav-item col-lg-6 col-md-6 col-sm-7 col-12">
                        <Link
                          to="/login"
                          className="btn btn-outline-dark text-light ps-2"
                        >
                          <i className="fa fa-sign-in text-warning ms-2"></i>{" "}
                          Login
                        </Link>
                      </span>
                      <span className="button nav-item ">
                        <Link
                          to="/register"
                          className="btn btn-outline-dark text-light ms-2"
                        >
                          <i className="fa fa-user-plus text-warning "></i>{" "}
                          Register
                        </Link>
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="mt-5">
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-lg">
          <div className="container d-flex flex-nowrap position-relative">
            <button
              ref={buttonRef}
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={handleToggleMenu}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {menuOpen && (
              <div
                className="position-absolute top-50 mt-4 "
                style={{ zIndex: "1000" }}
              >
                <ul className="list-group text-uppercase">
                  <li className="list-group-item pe-5 pt-3 pb-3">
                    <a className="nav-link letter-spacing " href="/">
                      Home
                    </a>
                  </li>
                  <li className="list-group-item pe-5 pt-3 pb-3">
                    <a className="nav-link letter-spacing " href="/product">
                      Product
                    </a>
                  </li>
                  <li className="list-group-item pe-5 pt-3 pb-3">
                    <a className="nav-link letter-spacing " href="/brand">
                      Brand
                    </a>
                  </li>
                  <li className="list-group-item pe-5 pt-3 pb-3">
                    <a className="nav-link letter-spacing " href="/contact">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            )}
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
