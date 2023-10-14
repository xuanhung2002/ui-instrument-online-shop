import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  API_GET_CART_ITEM,
  API_REMOVE_CART_ITEM_FROM_CART,
  API_UPDATE_CART_ITEM_QUANTITY,
} from "../service/api";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  const { fetchCountCartItem } = useContext(AppContext); // Danh sách các ID của các mục được chọn

  const navigate = useNavigate();
  useEffect(() => {
    fetchCartItem();
  }, []);

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
          fetchCountCartItem();
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

  const handleUpdateNewQuantity = async (cartItemId, newQuantity) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      const userToken = user.token;
      try {
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const respone = await axiosInstance.post(
          API_UPDATE_CART_ITEM_QUANTITY,
          {
            cartItemId,
            newQuantity,
          }
        );

        if (respone && respone.status === 200) {
          console.log("Update success");
        } else {
          console.log("Error when update");
        }
      } catch (error) {
        console.log("Error when call API update");
      }
    } else {
      console.log("Vui long dang nhap");
    }
  };

  // / Hàm để tăng số lượng cho một item cụ thể
  const handlePlusQuantity = (cartItemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) => {
        if (cartItem.itemId === cartItemId) {
          const newQuantity = cartItem.quantity + 1;
          handleUpdateNewQuantity(cartItemId, newQuantity);
          return { ...cartItem, quantity: newQuantity };
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
          const newQuantity = cartItem.quantity - 1;
          if (newQuantity === 0) {
            handleRemoveCartItem(cartItemId);
            removeCartItem(cartItemId);
            return cartItems;
          } else {
            handleUpdateNewQuantity(cartItemId, newQuantity);
            return { ...cartItem, quantity: newQuantity };
          }
        }
        return cartItem;
      })
    );
  };
  const removeCartItem = (cartItemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((cartItem) => {
        if (cartItem.itemId === cartItemId) {
          if (cartItem.quantity === 0) {
            return false;
          }
          return true;
        }
        return true;
      })
    );
  };

  const handleRemoveCartItem = async (cartItemId) => {
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
          setCartItems(fetchCartItem);
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

  const handleCheckboxChange = (cartItem) => {
    // Kiểm tra xem cartItemId đã có trong danh sách selectedCartItems chưa
    if (selectedCartItems.some((item) => item.id === cartItem.id)) {
      // Nếu đã có, loại bỏ nó khỏi danh sách
      setSelectedCartItems((prevSelectedCartItems) =>
        prevSelectedCartItems.filter((s) => s.id !== cartItem.id)
      );
    } else {
      // Nếu chưa có, thêm nó vào danh sách
      setSelectedCartItems((prevSelectedCartItems) => [
        ...prevSelectedCartItems,
        cartItem,
      ]);
    }
  };
  // Hàm để tính subtotal cho các mục được chọn
  const calculateSelectedSubtotal = () => {
    let total = 0;
    if (Array.isArray(cartItems)) {
      cartItems.forEach((cartItem) => {
        if (selectedCartItems.some((item) => item.id === cartItem.id)) {
          total += cartItem.quantity * cartItem.unitPrice;
        }
      });
      return total;
    }
  };

  const handleBuyClick = () => {
    localStorage.setItem(
      "selectedCartItems",
      JSON.stringify(selectedCartItems)
    );
    navigate("/order");
  };

  // Hàm để kiểm tra xem nút "Buy" có nên được bật hay không
  const shouldEnableBuyButton = selectedCartItems.length > 0;

  return (
    <div className="container padding-bottom-3x mb-5">
      <div className="d-flex justify-content-center mt-5">
        <h3>Cart</h3>
      </div>
      <div className="mt-2 mb-5 d-flex justify-content-end">
        <Link to={"/orderInfo"} className="btn btn-warning me-4 ps-5 pe-5 ">
          My order
        </Link>
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
              <th className="text-center">Select</th>
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
                      onClick={() => handleRemoveCartItem(cartItem.itemId)}
                      style={{ backgroundColor: "white" }}
                      className="remove-from-cart mt-5 border-0"
                      data-toggle="tooltip"
                      title="Remove"
                      data-original-title="Remove item"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                  <td className=" text-center">
                    <input
                      className="form-check-input my-5"
                      type="checkbox"
                      value=""
                      id="flexCheckIndeterminate"
                      checked={selectedCartItems.some(
                        (item) => item.id === cartItem.id
                      )}
                      onChange={() => handleCheckboxChange(cartItem)}
                    />
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
            {"  "}${calculateSelectedSubtotal()}
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
            <button
              className="btn btn-success me-4 ps-5 pe-5"
              onClick={handleBuyClick}
              disabled={!shouldEnableBuyButton}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
