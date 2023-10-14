import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";
import axios from "axios"; // Import Axios
import {
  API_GET_ALL_BRAND,
  API_GET_ALL_CATEGORY,
  API_GET_ALL_ITEM,
} from "../service/api";
import { NavDropdown } from "react-bootstrap";
import ReactPaginate from "react-paginate";

export default function Product() {
  const [category, setCategory] = useState([]);
  const [item, setItem] = useState([]);
  const [brand, setBrand] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemPerPage = 8;

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const fetchTotalItem = async () => {
    try {
      const response = await axios.get(API_GET_ALL_ITEM); // Sử dụng axios.get thay cho fetch
      const jsonData = response.data;
      if (jsonData === null || !Object.keys(jsonData).length) {
        console.log("API returned null or empty data.");
      } else {
        console.log(jsonData);
        setTotalItem(jsonData.length);
        setTotalPage(Math.ceil(jsonData.length / itemPerPage));
        console.log("total", Math.ceil(jsonData.length / itemPerPage));
      }
    } catch (error) {
      console.log("Error when fetching data: ", error);
    }
  };

  const fetchItem = async (currentPage) => {
    try {
      const response = await axios.get(API_GET_ALL_ITEM, {
        params: {
          page: currentPage,
          size: itemPerPage,
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

  const fetchCategory = async () => {
    try {
      const response = await axios.get(API_GET_ALL_CATEGORY); // Sử dụng axios.get thay cho fetch
      setCategory(response.data); // Axios đã tự động chuyển đổi dữ liệu JSON
    } catch (error) {
      console.log("Error when fetching data: ", error);
    }
  };

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
  useEffect(() => {
    fetchCategory();
    fetchItem(currentPage);
    fetchTotalItem();
    fetchCBrand();
  }, []);

  const handlePageClick = (event) => {
    const newListItem = fetchItem(event.selected);
    console.log(
      `User requested page number ${event.selected}, which is offset ${newListItem}`
    );
    setItem(newListItem);
    window.scrollTo(0, (window.innerHeight * 25) / 100);
  };
  return (
    <div className="mb-5">
      <div className="container">
        <div className="ms-3 mt-4 pb-3 border-bottom">
          <h2 className="text-uppercase">Products</h2>
        </div>
      </div>
      <div className="container text-center mt-4">
        <div className="row">
          <div className="col-md-2 col-sm-3 d-none d-md-block">
            <div className="slidebar-item">
              <div className="slidebar-title mb-3">
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

          <div className="col-md-10 col-sm-12">
            <div className="ms-2 mb-3 d-flex flex-row justify-content-between border-bottom">
              <p className="text-uppercase ms-2" style={{ fontSize: "25px" }}>
                Instrument
              </p>
              <div className="d-flex flex-row me-4 sort-pointer">
                <p>Sort</p>
                <i class="fa fa-chevron-down ms-5 mt-1" aria-hidden="true"></i>
              </div>
            </div>

            <div className="container text-center">
              <div className="row">
                {Array.isArray(item) && item.length > 0 ? (
                  item.map((item, index) => (
                    <div className="col-lg-3 col-md-4 col-sm-4 col-6 mb-3">
                      <CardItem key={index} item={item} />
                    </div>
                  ))
                ) : (
                  <p>No items to display.</p>
                )}
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center mt-5">
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={0}
                pageCount={totalPage}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
