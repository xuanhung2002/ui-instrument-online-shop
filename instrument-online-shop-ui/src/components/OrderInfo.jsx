/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_GET_ORDERS_OF_USER } from "../service/api";
export default function () {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      const userToken = user.token;
      try {
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const respone = await axiosInstance.get(API_GET_ORDERS_OF_USER, {});
        if (respone && respone.status === 200) {
          setOrders(respone.data);
          console.log(respone);
        } else {
          console.error("Order khong thanh cong");
        }
      } catch (error) {
        console.error("Order khong thanh cong");
      }
    } else {
      console.log("hmmm");
    }
  };

  return (
    <div className="container padding-bottom-3x mb-1">
      <div className="d-flex justify-content-center mt-5">
        <h3>List Order</h3>
      </div>

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
              orders.map((order, index) => (
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
                      {order.orderDate.join("/")}
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
                      disabled={
                        order.orderStatus === "PROCESSING" ? false : true
                      }
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
              onClick={() => navigate(-1)}
            >
              <i className="icon-arrow-left"></i>&nbsp;Back to cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
