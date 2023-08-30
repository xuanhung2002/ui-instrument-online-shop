import React from "react";
import "../styles/Navbar.scss";
export default function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary shadow-lg">
        <div class="container d-flex flex-nowrap">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="header-info navbar-collapse d-flex justify-content-center">
            <ul class="navbar-nav mx-auto d-flex flex-row align-items-center">
              <li class="nav-item collapse navbar-collapse me-3">
                <a class="nav-link" aria-current="page" href="#">
                  HOME
                </a>
              </li>
              <li
                class="nav-item collapse navbar-collapse me-4"
                id="navbarNavDropdown"
              >
                <a class="nav-link" href="#">
                  PRODUCTS
                </a>
              </li>
              <li class="nav-item logo">
                <a class="nav-link" href="/">
                  <img
                    src="./assets/logo.png"
                    alt="logo"
                    style={{ maxHeight: "160px" }}
                  />
                </a>
              </li>
              <li
                class="nav-item collapse navbar-collapse ms-4"
                id="navbarNavDropdown"
              >
                <a class="nav-link" href="#">
                  BRAND
                </a>
              </li>
              <li
                class="nav-item collapse navbar-collapse ms-3"
                id="navbarNavDropdown"
              >
                <a class="nav-link" href="#">
                  CONTACT
                </a>
              </li>
            </ul>
            <div class="cart-item" style={{}}>
              <a href="" className="btn btn-outline-dark">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i> (0)
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
