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
          style={{ height: "200px" }}
        />

        <div className="card-body">
          <div className="">
            <Link
              to={`/product/${item.id}`}
              className="text-decoration-none"
              style={{ color: "#000000", fontWeight: "bold" }}
            >
              <span className="item-name" title={item.name}>
                {item.name}
              </span>
            </Link>
          </div>

          <div>
            {" "}
            <span className="card-text p-1 mt-2 mb-2">
              Price:{" "}
              <strong style={{ color: "#FF3333" }}>{item.price} &#8363;</strong>
            </span>
          </div>

          <Link to={`/product/${item.id}`} className="btn btn-primary mt-2">
            Mua ngay
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CardItem;
