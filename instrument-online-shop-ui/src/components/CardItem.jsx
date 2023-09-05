import React, { useState } from "react";
import "../App.scss";

const CardItem = ({ item }) => {
  const API_ADD_TO_CART = "http://localhost:8080/api/cart/add";
  const [isLoading, setIsLoading] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setIsLoading(true);

    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MiIsImlhdCI6MTY5MzkwMTM5OCwiZXhwIjoxNjkzOTA0OTk4fQ.GD3PGOWRRAlcV3VQyTiLNeNU-dzIsRK46PyOaFAzNOE";
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({ itemId: item.id, quantity: 1 });

    fetch(API_ADD_TO_CART, {
      method: "POST",
      headers,
      body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi mạng");
        }
        return response.json();
      })
      .then((data) => {
        setIsAddedToCart(true);
        setIsLoading(false);
        setTimeout(() => {
          setIsAddedToCart(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="col">
      <div className="card">
        <img
          src={item.images[0].imageUrl}
          className="card-img-top"
          alt="Sản phẩm"
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">
            <strong>Giá: {item.price}</strong>
          </p>
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? "Adding to cart..." : "Add to cart"}
          </button>
        </div>
      </div>
      {isAddedToCart && (
        <div className="corner-notification">
          <p>Added to cart!</p>
          <button onClick={() => setIsAddedToCart(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default CardItem;
