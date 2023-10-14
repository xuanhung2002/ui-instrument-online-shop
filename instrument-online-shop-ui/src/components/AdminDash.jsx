import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import OrderManagement from "./OrderManagement";
import ProductManagement from "./ProductManagement";
import BrandManagement from "./BrandManagement";

export default function AdminDash() {
  return (
    <div className="container">
      <div className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="list-group navbar-nav d-flex flex-column">
              <li className="list-group-item nav-item">
                <Link to="/order-management" className="nav-link">
                  Order management
                </Link>
              </li>
              <li className="list-group-item nav-item">
                <Link to="/product-management" className="nav-link">
                  Product management
                </Link>
              </li>
              <li className="list-group-item nav-item">
                <Link to="/brand-management" className="nav-link">
                  Brand management
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="content">
        <Routes>
          <Route path="/order-management" element={<OrderManagement />} />
          <Route path="/product-management" element={<ProductManagement />} />
          <Route path="/brand-management" element={<BrandManagement />} />
        </Routes>
      </div>
    </div>
  );
}
