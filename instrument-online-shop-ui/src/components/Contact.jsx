import React, { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="container">
        <div className="ms-5 mt-4 pb-3 border-bottom">
          <h2 className="text-uppercase">Contact</h2>
        </div>
      </div>
      <div className="container mb-3 mt-3 pb-3">
        <div className="row">
          <div className="col-lg-9 col-md-9 col-sm-7"></div>
          <div className="col-lg-3 col-md-3 col-sm-5"></div>
        </div>
      </div>
    </div>
  );
}
