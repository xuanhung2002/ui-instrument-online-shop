import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";

export default function HomeProducts() {
  const API_GET_CATEGORY = "http://localhost:8080/api/category";
  const API_GET_ITEM = "http://localhost:8080/api/item";
  const [category, setCategory] = useState([]);
  const [item, setItem] = useState([]);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await fetch(API_GET_CATEGORY);
      const jsonData = await response.json();
      setCategory(jsonData);
    } catch (error) {
      console.log("Error when fetch data: ", error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);
  const fetchItem = async () => {
    try {
      const response = await fetch(API_GET_ITEM);
      const jsonData = await response.json();
      setItem(jsonData);
    } catch (error) {
      console.log("Error when fetch data: ", error);
    }
  };

  return (
    <div>
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
                      {category.name}
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
                {item.map((item, index) => (
                  <CardItem key={index} item={item} />
                ))}
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
