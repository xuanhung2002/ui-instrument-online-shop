import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ADD_ORDER } from "../service/api";
import axios from "axios";

export default function ResponseOrder() {
  // Trong trang vnp_ReturnUrl
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const orderInfo = localStorage.getItem("orderInfo");
  useEffect(() => {
    getResponse();
  }, []);
  const getResponse = () => {
    const params = new URLSearchParams(window.location.search);
    const vnp_Amount = params.get("vnp_Amount");
    const vnp_ResponseCode = params.get("vnp_ResponseCode");
    console.log("vnp_Amount", vnp_Amount);
    console.log("vnp_ResponseCode", vnp_ResponseCode);
    if (vnp_ResponseCode === "00") {
      // Xử lý khi thanh toán thành công

      setStatus(true);
      handleConfirmOrder();
      localStorage.removeItem("orderInfo");
      console.log(`Thanh toán thành công. Số tiền: ${vnp_Amount}`);
      // Cập nhật paymentStatus tại đây nếu cần thiết
      //   setPaymentStatus("Paid");
    } else {
      // Xử lý khi thanh toán thất bại
      console.error("Thanh toán thất bại.");
    }
  };

  const handleConfirmOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      const userToken = user.token;
      try {
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const respone = await axiosInstance.post(API_ADD_ORDER, {
          customerName: orderInfo.name,
          customerPhone: orderInfo.phone,
          address: orderInfo.address,
          totalAmount: orderInfo.calculateTotal(),
          paymentMethod: orderInfo.paymentMethod,
          paymentStatus:
            orderInfo.paymentMethod === "cash" ? "pending" : "Paid",
          idCartItems: orderInfo.selectedCartItems.map((item) => item.id),
        });
        if (respone && respone.status === 200) {
          alert("Order thanh cong");
          navigate("/orderinfo");
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
    <div>
      {status === true ? <p>Order thanh cong</p> : <p>Order that bai</p>}
      <div>
        <button onClick={() => navigate("/orderinfo")}>Order info</button>
      </div>
    </div>
  );
}
