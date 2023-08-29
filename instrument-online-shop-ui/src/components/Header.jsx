import React from "react";
import "../styles/Header.scss";
export default function Hearder() {
  return (
    <div>
      <nav class="navbar bg-black py-1 shadow-sm text-light">
        <div class="container">
          <div class="d-flex justify-content-start">
            <ul class="navbar-nav mb-2 mb-lg-0 d-flex flex-row">
              <li class="header-info ms-3 d-none d-md-block">
                <i className="header-info-item fa fa-map-marker text-warning me-1"></i>
                K256/49/9 Âu Cơ, Hoà Khánh Bắc, Liên Chiểu, Đà Nẵng
              </li>
              <li class="header-info ms-3 d-none d-md-block">
                <i className="header-info-item fa fa-phone text-warning me-1"></i>
                0384651408
              </li>
              <li class="header-info ms-3 d-none d-md-block flex-nowrap">
                <i className="header-info-item fa fa-clock-o text-warning me-1"></i>
                7:20 - 20:30
              </li>
            </ul>
          </div>
          <div className="buttons d-flex justify-content-end me-5">
            <ul className="nav align-items-center">
              <li className="button nav-item">
                <a href="" className="btn btn-outline-dark text-light ms-2">
                  <i className="fa fa-sign-in text-warning ms-2"></i> Login
                </a>
              </li>
              <li className="button nav-item">
                <a href="" className="btn btn-outline-dark text-light ms-2">
                  <i className="fa fa-user-plus text-warning ms-2"></i> Register
                </a>
              </li>
              <li className="nav-item ms-2">
                <a href="">
                  <i className="fa fa-search text-light ms-4"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
