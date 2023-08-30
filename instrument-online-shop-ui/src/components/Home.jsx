import React, { useState } from "react";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevClick = () => {
    const newIndex = activeIndex === 0 ? activeIndex : activeIndex - 1;
    setActiveIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = activeIndex === 2 ? activeIndex : activeIndex + 1;
    setActiveIndex(newIndex);
  };

  return (
    <div className="home shadow-lg">
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className={activeIndex === 0 ? "active" : ""}
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            className={activeIndex === 1 ? "active" : ""}
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            className={activeIndex === 2 ? "active" : ""}
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className={`carousel-item ${activeIndex === 0 ? "active" : ""}`}>
            <img
              src="./assets/slider_1.jpg"
              className="d-block w-100"
              alt="huhu"
            />
          </div>
          <div className={`carousel-item ${activeIndex === 1 ? "active" : ""}`}>
            <img
              src="./assets/slider_2.webp"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className={`carousel-item ${activeIndex === 2 ? "active" : ""}`}>
            <img
              src="./assets/slider_3.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          onClick={handlePrevClick}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          onClick={handleNextClick}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
