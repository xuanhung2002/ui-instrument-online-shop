import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResponseOrder() {
  const location = useLocation();
  const { status } = location.state;
  const navigate = useNavigate();
  useEffect(() => {
    console.log("status" + status);
  }, []);
  return (
    <div>
      <div
        className="container d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        {status === "success" ? (
          <div className="text-center">
            <h3 className="text-uppercase">Order thành công</h3>
            <img
              src="/assets/successIcon.png"
              alt="success"
              style={{ maxHeight: "300px" }}
            />
          </div>
        ) : null}

        {status === "failed" ? (
          <div className="text-center">
            <h3 className="text-uppercase">Order thất bại</h3>
            <img
              src="/assets/failedIcon.png"
              alt="failed"
              style={{ maxHeight: "300px" }}
            />
          </div>
        ) : null}
        <div className="mt-4">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/orderinfo")}
          >
            Xem đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
}
