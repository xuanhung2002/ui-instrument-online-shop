/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_GET_ALL_BRAND } from "../service/api";

export default function Brand() {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    fetchBrands();
  }, []);
  const fetchBrands = async () => {
    try {
      const response = await axios.get(API_GET_ALL_BRAND); // Sử dụng axios.get thay cho fetch
      const jsonData = response.data;
      if (jsonData === null || !Object.keys(jsonData).length) {
        console.log("API returned null or empty data.");
      } else {
        console.log(response); // check res
        setBrands(jsonData);
      }
    } catch (error) {
      console.log("Error when fetching data: ", error);
    }
  };
  return (
    <div>
      <div className="container">
        <div className="ms-5 mt-4 pb-3 border-bottom">
          <h2 className="text-uppercase">Brand</h2>
        </div>
      </div>
      <div className="container mb-3 mt-3 pb-3">
        <div className="row ms-5 me-5">
          {brands
            .filter((b) => b.logo !== null)
            .map((brand, index) => (
              <div className="col-2 mt-2 ms-2" key={index}>
                {brand.logo?.imageUrl ? (
                  <a href="">
                    <img
                      style={{ height: "70px", width: "100px" }}
                      src={brand.logo.imageUrl}
                      alt={brand.name}
                    />
                  </a>
                ) : (
                  ""
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
