import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";
import axios from "axios"; // Import Axios
import {
  API_GET_ALL_BRAND,
  API_GET_ALL_CATEGORY,
  API_GET_ALL_ITEM,
} from "../service/api";

export default function HomeProducts() {
  const [category, setCategory] = useState([]);
  const [item, setItem] = useState([]);
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    fetchCategory();
    fetchItem();
    fetchBrand();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(API_GET_ALL_CATEGORY); // Sử dụng axios.get thay cho fetch
      setCategory(response.data); // Axios đã tự động chuyển đổi dữ liệu JSON
    } catch (error) {
      console.log("Error when fetching data: ", error);
    }
  };

  const fetchItem = async () => {
    try {
      const response = await axios.get(API_GET_ALL_ITEM, {
        params: {
          size: 20,
        },
      }); // Sử dụng axios.get thay cho fetch
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

  const fetchBrand = async () => {
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
          <div className="col-sm-12 section-title mb-3 mt-5 d-flex justify-content-center">
            <i class="fa fa-caret-right mt-3" aria-hidden="true"></i>
            <h2 className="ms-1 me-1 mb-5 text-uppercase">
              Best selling products
            </h2>
            <i class="fa fa-caret-left mt-3" aria-hidden="true"></i>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="container text-center">
              <div className="row">
                {Array.isArray(item) && item.length > 0 ? (
                  item.map((item, index) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6 mb-3">
                      <CardItem key={index} item={item} />
                    </div>
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
