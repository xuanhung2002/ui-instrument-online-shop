import { useEffect, useState } from "react";
import axios from "axios";
import { API_ADD_ORDER } from "../service/api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ResponsePaymentOnlineOrder() {
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleResponse();
  }, []);

  const handleResponse = async () => {
    const params = new URLSearchParams(window.location.search);
    localStorage.setItem("url:", params);
    const vnp_ResponseCode = params.get("vnp_ResponseCode");
    if (vnp_ResponseCode === "00") {
      try {
        const orderInfo = JSON.parse(Cookies.get("orderInfo"));
        if (orderInfo) {
          const user = JSON.parse(Cookies.get("user"));
          if (user && user.token) {
            const userToken = user.token;
            const axiosInstance = axios.create({
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            });

            const response = await axiosInstance.post(API_ADD_ORDER, orderInfo);
            if (response && response.status === 200) {
              console.log("order thanh cong");
              setStatus("success");
              navigate("/response-order", { state: { status: "success" } });
            } else {
              setStatus("failed");
              console.error("Order khong thanh cong");
              navigate("/response-order", { state: { status: "failed" } });
            }
            // localStorage.removeItem("orderInfo");
            Cookies.remove("orderInfo");
          }
        }
      } catch (error) {
        setStatus("failed");
        console.error("Error handling response:", error);
        navigate("/response-order", { state: { status: "failed" } });
      }
    } else {
      Cookies.remove("orderInfo");
      setStatus("failed");
      console.error("Thanh toán thất bại.");
      navigate("/response-order", { state: { status: "failed" } });
    }
  };
}
