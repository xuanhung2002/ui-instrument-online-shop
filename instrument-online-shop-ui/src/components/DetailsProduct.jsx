import React, { useContext, useEffect, useState } from "react";
import { getDetailsItemApi } from "../service/UserService";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { API_ADD_ITEM_TO_CART } from "../service/api";
import { AppContext } from "../context/AppProvider";
import Cookies from "js-cookie";

function DetailsProduct() {
  const { fetchCountCartItem } = useContext(AppContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const handlePlusQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleSubtractQuantity = () => {
    setQuantity(quantity - 1);
    if (quantity === 1) {
      setQuantity(1);
    }
  };
  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const response = await getDetailsItemApi(id); // Sử dụng axios.get thay cho fetch
      setProduct(response.data);
      // console.log("check respone: ", response); // Axios đã tự động chuyển đổi dữ liệu JSON
    } catch (error) {
      console.log("Error when fetching data: ", error);
    }
  };

  const changeImage = (imageUrl) => {
    // Thực hiện xử lý thay đổi hình ảnh chính dựa trên imageUrl
    document.getElementById("main-image").src = imageUrl;
  };

  //add to cart
  const handleAddToCart = async (itemId, quantity) => {
    const user = JSON.parse(Cookies.get("user"));
    if (user && user.token) {
      const userToken = user.token;
      try {
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        console.log("userToken" + userToken);
        // Gửi yêu cầu POST với URL đầy đủ
        const response = await axiosInstance.post(API_ADD_ITEM_TO_CART, {
          itemId: itemId,
          quantity: quantity,
        });
        if (response.status === 200) {
          fetchCountCartItem();
          toast.success("Thêm vào giỏ hàng thành công");
          console.log("Sản phẩm đã được thêm vào giỏ hàng.");
        } else {
          toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
          console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", response.data);
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      }
    } else {
      navigate("/login");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ToastContainer />
      <div className="container mt-5 mb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-10">
            <div className="card">
              <div className="row">
                <div className="col-md-6">
                  <div className="images p-3">
                    <div className="text-center p-4">
                      <img
                        id="main-image"
                        src={product.images[0].imageUrl}
                        alt="Product Main Image"
                        width="250"
                      />
                    </div>
                    <div className="thumbnail text-center">
                      {" "}
                      {product.images.map((image, index) => (
                        <img
                          key={index}
                          onClick={() => changeImage(image.imageUrl)}
                          src={image.imageUrl}
                          alt={`Product Image ${index + 2}`}
                          width="70"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="product p-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        {" "}
                        <i className="fa fa-long-arrow-left"></i>
                        <button
                          onClick={() => navigate(-1)}
                          className="btn text-reset"
                          style={{ textDecoration: "none" }}
                        >
                          Back
                        </button>{" "}
                      </div>{" "}
                      <Link
                        to={"/cart"}
                        className="fa fa-shopping-cart text-muted"
                      ></Link>
                    </div>
                    <div className="mt-4 mb-3">
                      <div className="text-uppercase fw-bold fs-3">
                        {product.name}
                      </div>
                      Brand:{"  "}
                      <span className="text-uppercase text-muted brand fw-bold">
                        {product.brandName}
                      </span>
                      <h5 className="text-uppercase">{""}</h5>
                      <div className="price d-flex flex-row align-items-center">
                        {" "}
                        <span className="act-price fs-3 text-warning">
                          {product.price} <i aria-hidden="true">&#8363;</i>
                        </span>
                      </div>
                    </div>
                    <p className="about">{product.description}</p>

                    <div className=""></div>
                    <div className="count-input d-flex">
                      <button
                        onClick={handleSubtractQuantity}
                        className="fs-3 pe-3 ps-3"
                        style={{ border: "none" }}
                      >
                        -
                      </button>

                      <span
                        className="form-control sm fs-7 text-center"
                        style={{ maxWidth: "70px", borderRadius: "0" }}
                      >
                        {" "}
                        {quantity}
                      </span>
                      <button
                        onClick={handlePlusQuantity}
                        className="button fs-3 pe-3 ps-3"
                        aria-hidden="true"
                        style={{ border: "none" }}
                      >
                        +
                      </button>
                      {Number(product.inventoryQuantity) > 0 ? (
                        <p className="" style={{ fontStyle: "italic" }}>
                          {" "}
                          {product.inventoryQuantity} sản phẩm có sẵn
                        </p>
                      ) : (
                        <p
                          style={{
                            fontStyle: "italic",
                            textTransform: "uppercase",
                            color: "red",
                          }}
                        >
                          {" "}
                          Hết hàng
                        </p>
                      )}
                    </div>
                    <div className="cart mt-4 align-items-center">
                      {" "}
                      <button
                        onClick={() => handleAddToCart(id, quantity)}
                        className="btn btn-warning text-uppercase mr-2 px-4"
                        style={{ background: "#ffc107" }}
                      >
                        Add to cart
                      </button>{" "}
                      <i className="fa fa-heart text-muted"></i>{" "}
                      <i className="fa fa-share-alt text-muted"></i>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsProduct;
