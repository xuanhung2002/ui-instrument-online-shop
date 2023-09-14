import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";
import axios from "axios"; // Import Axios
import {
  API_GET_ALL_BRAND,
  API_GET_ALL_CATEGORY,
  API_GET_ALL_ITEM,
} from "../service/api";

export default function Product() {
  const [category, setCategory] = useState([]);
  const [item, setItem] = useState([]);
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(API_GET_ALL_CATEGORY); // Sử dụng axios.get thay cho fetch
      setCategory(response.data); // Axios đã tự động chuyển đổi dữ liệu JSON
    } catch (error) {
      console.log("Error when fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const response = await axios.get(API_GET_ALL_ITEM); // Sử dụng axios.get thay cho fetch
      const jsonData = response.data;
      if (jsonData === null || !Object.keys(jsonData).length) {
        console.log("API returned null or empty data.");
      } else {
        setItem(jsonData);
      }
    } catch (error) {
      console.log("Error when fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchCBrand();
  }, []);

  const fetchCBrand = async () => {
    try {
      const response = await axios.get(API_GET_ALL_BRAND); // Sử dụng axios.get thay cho fetch
      const jsonData = response.data;
      if (jsonData === null || !Object.keys(jsonData).length) {
        console.log("API returned null or empty data.");
      } else {
        console.log(response); // check res
        setBrand(jsonData);
      }
    } catch (error) {
      console.log("Error when fetching data: ", error);
    }
  };

  return (
    <div className="mb-5">
      <div className="container text-center mt-4">
        <div className="row">
          <div className="col-md-2 col-sm-3 hidden-xs">
            <div className="slidebar-item">
              <div className="slidebar-title">
                <h2 className="title-head margin-top-0">
                  <span>Category</span>
                </h2>
              </div>

              <div className="slidebar-content">
                <ul className="list-group">
                  {category.map((category, index) => (
                    <li key={index} className="list-group-item">
                      <a
                        href=""
                        style={{ textDecoration: "none", color: "#000" }}
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="slidebar-item mt-3">
              <div className="slidebar-title">
                <h2 className="title-head margin-top-0">
                  <span>Brand</span>
                </h2>
              </div>
              <div className="slidebar-content">
                <ul className="list-group">
                  {brand.map((brand, index) => (
                    <li key={index} className="list-group-item">
                      <a
                        href=""
                        style={{ textDecoration: "none", color: "#000" }}
                      >
                        {brand.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-10 col-sm-9">
            <div className="section-title a-center">
              <h2>Instrument</h2>
            </div>

            <div className="container text-center">
              <div className="row row-cols-5">
                {Array.isArray(item) && item.length > 0 ? (
                  item.map((item, index) => (
                    <CardItem key={index} item={item} />
                  ))
                ) : (
                  <p>No items to display.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
<h2 className="title-head margin-top-0">
  <span>Nhạc cụ</span>
</h2>;
