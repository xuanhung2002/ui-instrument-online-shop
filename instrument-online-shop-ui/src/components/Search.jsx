import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_SEARCH_ITEM } from "../service/api";
import CardItem from "./CardItem";

export default function Search() {
  const { searchKey } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchSearchItems();
  }, [searchKey]);

  const fetchSearchItems = async () => {
    try {
      const response = await axios.get(API_SEARCH_ITEM, {
        params: {
          searchKey: searchKey,
        },
      });
      if (response && response.status === 200) {
        setItems(response.data);
      } else {
        setItems(null);
        console.log("Null or error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container">
      <div className="mt-3 mb-4" style={{ fontSize: "30px" }}>
        <span>
          Có{" "}
          {Array.isArray(items) && items.length > 0 ? (
            <span style={{ fontWeight: "bold" }}>{items.length}</span>
          ) : (
            <span style={{ fontWeight: "bold" }}>0</span>
          )}{" "}
          kết quả tìm kiếm cho{" "}
          <span style={{ fontWeight: "bold" }}>"{searchKey}"</span>
        </span>
      </div>
      <div className="row">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item, index) => (
            <div className="col-lg-2 col-md-4 col-sm-6 col-6 mb-3">
              <CardItem key={index} item={item} />
            </div>
          ))
        ) : (
          <p>No items to display.</p>
        )}
      </div>
    </div>
  );
}
