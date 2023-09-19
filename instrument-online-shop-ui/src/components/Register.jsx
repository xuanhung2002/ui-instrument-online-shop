/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import * as yup from "yup";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { handleRegister } from "../service/AuthService";

function Register() {
  const schema = yup
    .object()
    .shape({
      name: yup.string().required(),
      email: yup.string().required(),
      username: yup.string().required(),
      password: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <ToastContainer />
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
          <form onSubmit={handleSubmit(handleRegister)}>
            <MDBInput
              className="mt-2"
              wrapperClassclassName="mb-5"
              label="Your name"
              // id="formControlLg"
              type="text"
              size="lg"
              name="name"
              {...register("name")}
            />
            {errors.name?.message && (
              <p style={{ color: "red" }}>{errors.name?.message}</p>
            )}
            <MDBInput
              className="mt-2"
              wrapperClassclassName="mb-5"
              label="Your email"
              // id="formControlLg"
              type="email"
              size="lg"
              name="email"
              {...register("email")}
            />
            {errors.email?.message && (
              <p style={{ color: "red" }}>{errors.email?.message}</p>
            )}
            <MDBInput
              className="mt-2"
              wrapperClassclassName="mb-5"
              label="Username"
              // id="formControlLg"
              type="text"
              size="lg"
              name="username"
              {...register("username")}
            />
            {errors.username?.message && (
              <p style={{ color: "red" }}>{errors.username?.message}</p>
            )}
            <MDBInput
              className="mt-2"
              wrapperClassclassName="mb-5"
              label="Password"
              // id="formControlLg"
              type="password"
              size="lg"
              name="password"
              {...register("password")}
            />
            {errors.password?.message && (
              <p style={{ color: "red" }}>{errors.password?.message}</p>
            )}

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
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
