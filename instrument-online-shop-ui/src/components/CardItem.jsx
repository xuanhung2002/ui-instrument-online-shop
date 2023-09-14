import React, { createContext, useState } from "react";
import "../App.scss";
import { Link } from "react-router-dom";

export const ItemIdContext = createContext();
const CardItem = ({ item }) => {
  const [itemId, setItemId] = useState(0);
  console.log(itemId);

  return (
    <div className="col">
      <div className="card">
        <img
          src={item.images && item.images[0] ? item.images[0].imageUrl : ""}
          className="card-img-top"
          alt="Sản phẩm"
          style={{ height: "150px" }}
        />

        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">
            <strong>Giá: {item.price}</strong>
          </p>
          <Link to={`/product/${item.id}`} className="btn btn-primary">
            Mua ngay
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CardItem;
