import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section
        className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
        style={{ backgroundColor: "#252525" }}
      >
        <div className="text-white text-uppercase ms-5 d-flex">
          <span className="d-none d-lg-block mt-2 me-3">Gửi email</span>
          <MDBInput
            className="mt-0"
            id="form1"
            type="text"
            placeholder="Nhập email của bạn"
            style={{ borderRadius: "0px" }}
          />
          <MDBBtn
            className="mt-0"
            color="warning"
            style={{ borderRadius: "0px" }}
          >
            Gửi ngay
          </MDBBtn>
        </div>

        <div className="d-flex align-items-center me-5">
          <h5 className="d-none d-lg-block text-white me-4 text-uppercase mt-2">
            Theo dõi chúng tôi
          </h5>
          <a
            href="https://www.facebook.com/nxhung02"
            target="_blank"
            className="ms-3 me-2"
          >
            <i
              className="fa fa-facebook-official"
              aria-hidden="true"
              style={{ color: "#f0f2f5" }}
            ></i>
          </a>
          <a
            href="https://www.instagram.com/nxhung02/"
            target="_blank"
            className="ms-3 me-4 text-reset"
          >
            <i
              className="fa fa-instagram"
              aria-hidden="true"
              style={{ color: "#f0f2f5" }}
            ></i>
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                HT Music intrument
              </h6>
              <p>
                <Link
                  to="/"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Home
                </Link>
              </p>
              <p>
                <Link
                  to="/brand"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Brand
                </Link>
              </p>
              <p>
                <Link
                  to="/product"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Product
                </Link>
              </p>
              <p>
                <Link
                  to="/contact"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Contact
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Các bài viết hữu ích
              </h6>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Pricing
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Settings
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Orders
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  style={{ textDecoration: "none" }}
                >
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4 me-5">
              <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
              <p>
                <MDBIcon color="secondary" icon="home" className="me-2" />
                K256/49/9 Au Co, Hoa Khanh Bac, Lien Chieu, Da Nang
              </p>
              <p>
                <MDBIcon color="secondary" icon="envelope" className="me-3" />
                xuanhung09052002@gmail.com
              </p>
              <p>
                <MDBIcon color="secondary" icon="phone" className="me-3" />
                0384651408
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        Bản quyền thuộc về
        <a className="text-reset fw-bold" href="https://facebook.com/nxhung02">
          {" "}
          HT Music
        </a>
      </div>
    </MDBFooter>
  );
}
