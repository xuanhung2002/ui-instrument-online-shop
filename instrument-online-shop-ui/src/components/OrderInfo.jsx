/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_GET_ORDERS_OF_USER, API_USER_CANCEL_ORDER } from "../service/api";
import Cookies from "js-cookie";
import { format } from "date-fns";
import "../App.scss";
export default function () {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("PROCESSING");

  const fetchOrders = async () => {
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
    if (user && user.token) {
      const userToken = user.token;
      try {
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const response = await axiosInstance.get(API_GET_ORDERS_OF_USER, {});
        if (response && response.status === 200) {
          setOrders(response.data);
          console.log(response);
        } else {
          console.error("Order khong thanh cong");
        }
      } catch (error) {
        console.error("Order khong thanh cong", error);
      }
    } else {
      console.log("hmmm");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedOrderStatus]);

  const handleCancelOrder = async (idOrder) => {
    const user = JSON.parse(Cookies.get("user"));
    if (user && user.token) {
      const userToken = user.token;
      try {
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const response = await axiosInstance.put(
          `${API_USER_CANCEL_ORDER}/${idOrder}`
        );
        if (response && response.status === 200) {
          fetchOrders();
          console.log(response);
        } else {
          console.error("Cancel khong thanh cong");
        }
      } catch (error) {
        console.error("Cancel khong thanh cong", error);
      }
    } else {
      console.log("hmmm");
    }
  };

  const filterOrdersByStatus = () => {
    return orders.filter((order) => order.orderStatus === selectedOrderStatus);
  };

  return (
    <div className="container padding-bottom-3x mb-1">
      <div className="d-flex justify-content-center mt-3">
        <h3>My Order</h3>
      </div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li
              className={`nav-item ${
                selectedOrderStatus === "PROCESSING" && "active-tab"
              }`}
            >
              <a
                className="nav-link"
                href="#"
                onClick={() => setSelectedOrderStatus("PROCESSING")}
              >
                PROCESSING
              </a>
            </li>
            <li
              className={`nav-item ${
                selectedOrderStatus === "SHIPPING" && "active-tab"
              }`}
            >
              <a
                className="nav-link"
                href="#"
                onClick={() => setSelectedOrderStatus("SHIPPING")}
              >
                SHIPPING
              </a>
            </li>
            <li
              className={`nav-item ${
                selectedOrderStatus === "DELIVERED" && "active-tab"
              }`}
            >
              <a
                className="nav-link"
                href="#"
                onClick={() => setSelectedOrderStatus("DELIVERED")}
              >
                DELIVERED
              </a>
            </li>
            <li
              className={`nav-item ${
                selectedOrderStatus === "CANCELLED" && "active-tab"
              }`}
            >
              <a
                className="nav-link"
                href="#"
                onClick={() => setSelectedOrderStatus("CANCELLED")}
              >
                CANCELLED
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="table-responsive shopping-cart">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th className="text-center">Order date</th>
              <th className="text-center">Subtotal</th>
              <th className="text-center">Payment status</th>
              <th className="text-center">Order status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) && orders.length > 0 ? (
              filterOrdersByStatus().map((order, index) => (
                <tr key={index}>
                  <td>
                    {order.detailItemOrders.map((itemOrder, indexOrder) => (
                      <div key={indexOrder}>
                        <div className="product-item d-flex flex-row mb-2">
                          <a className="product-thumb" href="#">
                            <img
                              src={itemOrder.item.images[0].imageUrl}
                              alt="Product"
                              style={{ height: "80px", width: "80px" }}
                            />
                          </a>
                          <span className="product-info">
                            <h9 className="product-title">
                              <p href="#">{itemOrder.item.name}</p>
                            </h9>
                            <h7>x {itemOrder.quantity}</h7>
                          </span>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="text-center">
                    <div className="count-input d-flex justify-content-center">
                      {format(
                        new Date(
                          order.orderDate[0],
                          order.orderDate[1] - 1,
                          order.orderDate[2],
                          order.orderDate[3],
                          order.orderDate[4]
                        ),
                        "dd/MM/yyyy HH:mm"
                      )}
                    </div>
                  </td>
                  <td className=" text-center">
                    <div className="count-input d-flex justify-content-center">
                      {order.totalAmount}
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="count-input d-flex justify-content-center">
                      {order.paymentStatus} {"("}
                      {order.paymentMethod}
                      {")"}
                    </div>
                  </td>
                  <td className=" text-center">
                    <div className="count-input d-flex justify-content-center">
                      {order.orderStatus}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      disabled={order.orderStatus !== "PROCESSING"}
                      style={{ backgroundColor: "white" }}
                      className="remove-from-cart border-0"
                      data-toggle="tooltip"
                      title="Remove"
                      data-original-title="Remove item"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <p>Không có đơn hàng nào</p>
            )}
          </tbody>
        </table>
      </div>
      <div className="shopping-cart-footer"></div>
      <div className="container shopping-cart-footer">
        <div className="d-flex justify-content-between">
          <div className="float-left">
            <a
              className="btn btn-outline-secondary"
              onClick={() => navigate("/cart")}
            >
              <i className="icon-arrow-left"></i>&nbsp;Back to cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
