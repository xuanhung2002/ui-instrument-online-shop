import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ADD_ORDER, API_GET_PAYMENT_REQ } from "../service/api";
import Cookies from "js-cookie";
import * as yup from "yup";
import { handleLogin } from "../service/AuthService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";

export default function Order() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [phone, setPhone] = useState(""); // Giá trị mặc định
  const [paymentStatus, setPaymentStatus] = useState("pending");

  const [selectedCartItems, setSelectedCartItems] = useState([]);

  const schema = yup
    .object()
    .shape({
      name: yup.string().required(),
      phone: yup.string().required(),
      address: yup.string().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    fetchSelectedCartItems();
  }, []);

  const fetchSelectedCartItems = () => {
    const selectedItemsString = Cookies.get("selectedCartItems");
    if (selectedItemsString) {
      const selectedItemsArray = JSON.parse(selectedItemsString);
      setSelectedCartItems(selectedItemsArray);
    }
  };

  useEffect(() => {
    return () => {
      Cookies.remove("selectedCartItems");
    };
  }, []);

  const navigate = useNavigate();
  // Xử lý khi người dùng thay đổi giá trị các trường
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const calculateTotal = () => {
    let total = 0;
    selectedCartItems.forEach((cartItem) => {
      total += cartItem.quantity * cartItem.unitPrice;
    });
    return total;
  };

  const saveDataToLocal = () => {
    const orderInfo = {
      customerName: name,
      customerPhone: phone,
      address: address,
      totalAmount: calculateTotal(),
      paymentMethod: paymentMethod,
      paymentStatus: "Paid",
      idCartItems: selectedCartItems.map((item) => item.id),
    };
    console.log("orderInfo", orderInfo);
    Cookies.set("orderInfo", JSON.stringify(orderInfo));
  };
  const handleConfirmOrder = async () => {
    const user = JSON.parse(Cookies.get("user"));
    if (user && user.token) {
      const userToken = user.token;
      try {
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const respone = await axiosInstance.post(API_ADD_ORDER, {
          customerName: name,
          customerPhone: phone,
          address: address,
          paymentMethod: paymentMethod,
          paymentStatus: "pending",
          idCartItems: selectedCartItems.map((item) => item.id),
        });
        if (respone && respone.status === 200) {
          navigate("/response-order", { state: { status: "success" } });
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

  const handlePayment = async () => {
    saveDataToLocal();
    try {
      // Gọi API để tạo yêu cầu thanh toán
      const response = await axios.get(API_GET_PAYMENT_REQ, {
        params: {
          amount: calculateTotal(), // Số tiền thanh toán
        },
      });

      // Lấy URL thanh toán từ phản hồi
      const paymentUrl = response.data.url;
      console.log(paymentUrl);
      // Chuyển hướng người dùng đến URL thanh toán
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Error creating VNPay payment:", error);
    }
  };
  return (
    <div className="container padding-bottom-3x mb-1">
      <div className="d-flex justify-content-center mt-5">
        <h3>ORDER</h3>
      </div>
      <form
        onSubmit={handleSubmit((data) => {
          if (paymentMethod === "cash") {
            handleConfirmOrder();
          } else {
            handlePayment();
          }
        })}
      >
        <MDBInput
          wrapperClassclassName="mb-4"
          label="Name"
          type="name"
          value={name}
          size="lg"
          name="name"
          {...register("name")}
          onChange={handleNameChange}
        />
        {errors.name?.message && (
          <p style={{ color: "red" }}>{errors.name?.message}</p>
        )}
        <MDBInput
          wrapperClassclassName="mb-4"
          label="Phone"
          type="phone"
          value={phone}
          size="lg"
          name="phone"
          {...register("phone")}
          onChange={handlePhoneChange}
        />
        {errors.name?.message && (
          <p style={{ color: "red" }}>{errors.phone?.message}</p>
        )}
        <MDBInput
          wrapperClassclassName="mb-4"
          label="Address"
          type="address"
          value={address}
          size="lg"
          name="address"
          {...register("address")}
          onChange={handleAddressChange}
        />
        {errors.address?.message && (
          <p style={{ color: "red" }}>{errors.address?.message}</p>
        )}

        <div className="table-responsive shopping-cart">
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {selectedCartItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="product-item justify-content-center">
                      <a className="product-thumb" href="#">
                        <img
                          src={item.itemImage} // Correct the property name here
                          alt="Product"
                          style={{ height: "100px", width: "100px" }}
                        />
                      </a>
                      <div className="product-info">
                        <h4 className="product-title">
                          <p href="#">{item.nameItem}</p>{" "}
                          {/* Correct the property name here */}
                        </h4>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="count-input d-flex justify-content-center">
                      <span
                        className="form-control sm fs-7 mt-5"
                        style={{ maxWidth: "200px", borderRadius: "0" }}
                      >
                        {item.quantity} {/* Correct the property name here */}
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    <p className="text-center my-5">
                      {item.quantity * item.unitPrice}{" "}
                      {/* Correct the property names here */}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="shopping-cart-footer">
          <div className="d-flex justify-content-end text-lg me-5">
            <p className="mt-1">Total:</p>
            <span className="text-medium fw-bold fs-5">
              {"  "}${calculateTotal()}
            </span>
          </div>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="paymentMethod">Payment method:</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            className="form-control"
            required
          >
            <option value="cash">Cash</option>
            <option value="vnpay">Online payment</option>
          </select>
        </div>
        <div className="container shopping-cart-footer">
          <div className="d-flex justify-content-between">
            <div className="float-left">
              <a
                className="btn btn-outline-secondary"
                onClick={() => navigate(-1)}
              >
                <i className="icon-arrow-left"></i>&nbsp;Back to Cart
              </a>
            </div>
            <div className="float-right">
              <MDBBtn className="btn btn-success me-4 ps-5 pe-5" type="submit">
                Confirm
              </MDBBtn>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
