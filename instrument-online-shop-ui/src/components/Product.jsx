import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";
import axios from "axios"; // Import Axios
import "../App.scss";
import {
  API_GET_ALL_BRAND,
  API_GET_ALL_CATEGORY,
  API_GET_ALL_ITEM,
  API_GET_ITEM_BY_CATEGORY_NAME,
} from "../service/api";
import { NavDropdown } from "react-bootstrap";
import ReactPaginate from "react-paginate";

export default function Product() {
  const [currentPageReactPaginate, setCurrentPageReactPaginate] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [category, setCategory] = useState([]);
  const [item, setItem] = useState([]);
  const [brand, setBrand] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemPerPage = 8;
  const [selectedSortOption, setSelectedSortOption] = useState(null);

  const [isHovered, setIsHovered] = useState(false);

  const sortList = [
    { name: "Default", value: "default" },
    { name: "Name A->Z", value: "name-asc" },
    { name: "Name Z->A", value: "name-desc" },
    { name: "Price ASC", value: "price-asc" },
    { name: "Price DESC", value: "price-desc" },
  ];

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

  const fetchItem = async (currentPage, sortBy) => {
    setSelectedCategory(null);
    try {
      const response = await axios.get(API_GET_ALL_ITEM, {
        params: {
          page: currentPage,
          size: itemPerPage,
          sortBy: sortBy,
        },
      }); // Sử dụng axios.get thay cho fetch
      const jsonData = response.data;
      if (jsonData === null || !Object.keys(jsonData).length) {
        console.log("API returned null or empty data.");
      } else {
        setItem(jsonData);
        fetchTotalItem();
      }
    } catch (error) {
      console.log("Error when fetching data: ", error);
    }
    setCurrentPageReactPaginate(currentPage);
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(API_GET_ALL_CATEGORY); // Sử dụng axios.get thay cho fetch
      setCategory(response.data); // Axios đã tự động chuyển đổi dữ liệu JSON
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
  useEffect(() => {
    fetchCategory();
    fetchItem(currentPage);
    fetchTotalItem();
    fetchBrand();
  }, []);

  const fetchItemsByCategory = async (categoryName, currentPage, sortBy) => {
    setItem([]);
    try {
      const response = await axios.get(API_GET_ITEM_BY_CATEGORY_NAME, {
        params: {
          categoryName: categoryName,
          page: currentPage,
          size: itemPerPage,
          sortBy: sortBy,
        },
      }); // Sử dụng axios.get thay cho fetch
      const jsonData = response.data;
      if (jsonData === null || !Object.keys(jsonData).length) {
        setTotalPage(0);
        console.log("API returned null or empty data.");
      } else {
        const allItem = await axios.get(API_GET_ITEM_BY_CATEGORY_NAME, {
          params: {
            categoryName: categoryName,
          },
        });
        setItem(jsonData);
        setTotalItem(jsonData.length);
        setTotalPage(Math.ceil(allItem.data.length / itemPerPage));
      }
    } catch (error) {
      console.log("Error when fetching data: ", error);
    }
  };

  const handleSort = (sortValue) => {
    setSelectedSortOption(sortValue);

    {
      selectedCategory && fetchItemsByCategory(selectedCategory, 0, sortValue);
    }

    {
      !selectedCategory && fetchItem(0, sortValue);
    }
  };

  const handleViewItemsByCategory = (categoryName) => {
    setCurrentPage(0);
    setSelectedCategory(categoryName);
    fetchItemsByCategory(categoryName, 0);
    setCurrentPageReactPaginate(0);
  };

  const handlePageClick = (event) => {
    console.log("selectedCategory 2", selectedCategory);
    const newListItem =
      selectedCategory === null
        ? fetchItem(event.selected, selectedSortOption)
        : fetchItemsByCategory(
            selectedCategory,
            event.selected,
            selectedSortOption
          );
    console.log(
      `User requested page number ${event.selected}, which is offset ${newListItem}`
    );
    setItem(newListItem);
    window.scrollTo(0, (window.innerHeight * 25) / 100);
    setCurrentPageReactPaginate(event.selected);
  };

  return (
    <div className="mb-5">
      <div className="container">
        <div className="ms-3 mt-4 pb-3 border-bottom">
          <h2 className="text-uppercase">Products</h2>
        </div>
      </div>
      <div className="container text-center mt-2">
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
                  <li
                    className="list-group-item hover-pointer"
                    onClick={() => fetchItem(0)}
                  >
                    All product
                  </li>
                  {category.map((category, index) => (
                    <li
                      key={index}
                      className="list-group-item hover-pointer"
                      onClick={() => handleViewItemsByCategory(category.name)}
                    >
                      <a style={{ textDecoration: "none", color: "#000" }}>
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-10 col-sm-12">
            <div className="ms-2 mb-3 d-flex flex-row justify-content-between border-bottom">
              <p
                className="text-uppercase ms-2"
                style={{ fontSize: "25px", marginBottom: "10px" }}
              >
                {!selectedCategory && "All product"}
                {selectedCategory && selectedCategory}
              </p>
              <div
                className="d-flex flex-column me-4 sort-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ position: "relative" }}
              >
                <div className="d-flex flex-row">
                  <p className="ps-3 mt-2 me-3">Sort</p>
                  <i
                    class="fa fa-chevron-down ms-5 mt-2"
                    aria-hidden="true"
                  ></i>
                </div>
                <div
                  className=""
                  style={{ position: "absolute", top: "100%", zIndex: "100" }}
                >
                  {isHovered && (
                    <ul
                      className="list-group"
                      style={{
                        borderRadius: "0",
                        textAlign: "left",
                        fontSize: "14px",
                      }}
                    >
                      {sortList.map((sort, index) => (
                        <li
                          key={index}
                          className="list-group-item li-hover p-3"
                          style={{ width: "140px" }}
                          value={sort.value}
                          onClick={() => handleSort(sort.value)}
                        >
                          {sort.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
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
                initialPage={0}
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
                forcePage={currentPageReactPaginate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
