import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  API_GET_CART_ITEM,
  API_REMOVE_CART_ITEM_FROM_CART,
} from "../service/api";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCartItem();
  }, [cartItems]);

  const fetchCartItem = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      setIsLoggedIn(true);
      const userToken = user.token;
      try {
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const respone = await axiosInstance.get(API_GET_CART_ITEM);
        if (respone && respone.status === 200) {
          setCartItems(respone.data);
        } else {
          console.error("Không có gì trong giỏ hàng.");
        }
      } catch (error) {
        console.error("Không có gì trong giỏ hàng.");
      }
    } else {
      setIsLoggedIn(false);
    }
    try {
      // console.log("check respone: ", response); // Axios đã tự động chuyển đổi dữ liệu JSON
    } catch (error) {
      console.log("Error when fetching data: ", error);
    }
  };

  // / Hàm để tăng số lượng cho một item cụ thể
  const handlePlusQuantity = (cartItemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) => {
        if (cartItem.itemId === cartItemId) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      })
    );
  };

  // Hàm để giảm số lượng cho một item cụ thể
  const handleSubtractQuantity = (cartItemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) => {
        if (cartItem.itemId === cartItemId && cartItem.quantity > 0) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        return cartItem;
      })
    );
  };

  const calculateTotalPrice = () => {
    let total = 0;
    if (!cartItems) {
      return 0;
    }
    cartItems.forEach((cartItem) => {
      total += cartItem.quantity * cartItem.unitPrice;
    });
    return total;
  };

  const handleRemoveItem = async (cartItemId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      setIsLoggedIn(true);
      const userToken = user.token;
      try {
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const respone = await axiosInstance.delete(
          API_REMOVE_CART_ITEM_FROM_CART + cartItemId
        );
        if (respone && respone.status === 200) {
          setCartItems(respone.data);
        } else {
          console.error("Xoa khong thanh cong");
        }
      } catch (error) {
        console.error("Xoa khong thanh cong");
      }
    } else {
      setIsLoggedIn(false);
    }
    try {
      // console.log("check respone: ", response); // Axios đã tự động chuyển đổi dữ liệu JSON
    } catch (error) {
      console.log("Error when fetching data: ", error);
    }
  };

  return (
    <div className="container padding-bottom-3x mb-1">
      <div className="d-flex justify-content-center mt-5">
        <h3>Cart</h3>
      </div>
      <div className="table-responsive shopping-cart">
        <table className="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Subtotal</th>
              <th className="text-center">
                <a className="btn btn-sm btn-outline-danger" href="#">
                  Clear Cart
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(cartItems) && cartItems.length > 0 ? (
              cartItems.map((cartItem, index) => (
                <tr key={index}>
                  <td>
                    <div className="product-item justify-content-center">
                      <a className="product-thumb" href="#">
                        <img
                          src={cartItem.itemImage}
                          alt="Product"
                          style={{ height: "100px", width: "100px" }}
                        />
                      </a>
                      <div className="product-info">
                        <h4 className="product-title">
                          <p href="#">{cartItem.nameItem}</p>
                        </h4>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="count-input d-flex justify-content-center">
                      <button
                        onClick={() => handleSubtractQuantity(cartItem.id)}
                        className="fs-3 pe-3 ps-3 mt-5"
                      >
                        -
                      </button>

                      <span
                        className="form-control sm fs-7 mt-5"
                        style={{ maxWidth: "200px", borderRadius: "0" }}
                      >
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => handlePlusQuantity(cartItem.id)}
                        className="button fs-3 pe-3 ps-3 mt-5"
                        aria-hidden="true"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className=" text-center">
                    <p className=" text-center my-5">
                      {cartItem.quantity * cartItem.unitPrice}
                    </p>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleRemoveItem(cartItem.itemId)}
                      style={{ backgroundColor: "white" }}
                      className="remove-from-cart mt-5 border-0"
                      data-toggle="tooltip"
                      title=""
                      data-original-title="Remove item"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <p>Không có sản phẩm nào trong giỏ hàng</p>
            )}
          </tbody>
        </table>
      </div>
      <div className="shopping-cart-footer">
        <div className="d-flex justify-content-end text-lg mb-4 me-5">
          <p className="mt-1">Subtotal:</p>
          <span className="text-medium fw-bold fs-5">
            {"  "}${calculateTotalPrice()}
          </span>
        </div>
      </div>
      <div className="container shopping-cart-footer">
        <div className="d-flex justify-content-between">
          <div className="float-left">
            <a
              className="btn btn-outline-secondary"
              onClick={() => navigate(-1)}
            >
              <i className="icon-arrow-left"></i>&nbsp;Back to Shopping
            </a>
          </div>
          <div className="float-right">
            <a className="btn btn-success me-4 ps-5 pe-5">Buy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
