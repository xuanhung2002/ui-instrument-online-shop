/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="lead fw-normal mb-0 me-3 fs-3">Sign up</p>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0"></p>
          </div>

          <MDBInput
            wrapperClassclassName="mb-4"
            label="Your name"
            id="formControlLg"
            type="email"
            size="lg"
          />
          <MDBInput
            wrapperClassclassName="mb-4"
            label="Username"
            id="formControlLg"
            type="email"
            size="lg"
          />
          <MDBInput
            wrapperClassclassName="mb-4"
            label="Password"
            id="formControlLg"
            type="password"
            size="lg"
          />

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="Remember me"
            />
            <a href="!#">Forgot password?</a>
          </div>

          <div className="text-center text-md-start mt-4 pt-2">
            <MDBBtn className="mb-0 px-5" size="lg" color="warning">
              Register
            </MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">
              You have already account?{" "}
              <Link to="/login" className="link-danger">
                Login
              </Link>
            </p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
