import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { loginApi } from "../service/UserService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { handleLogin } from "../service/AuthService";

function Login() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const schema = yup
    .object()
    .shape({
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
            <p className="lead fw-normal fs-2 mb-4 me-3">Sign in</p>
          </div>
          <form onSubmit={handleSubmit(handleLogin)}>
            <MDBInput
              wrapperClassclassName="mb-4"
              label="Username"
              // id="formControlLg"
              size="lg"
              name="username"
              {...register("username")}

              // onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username?.message && (
              <p style={{ color: "red" }}>{errors.username?.message}</p>
            )}
            <MDBInput
              wrapperClassclassName="mb-4"
              label="Password"
              // id="formControlLg"
              type="password"
              size="lg"
              name="password"
              {...register("password")}
              // onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password?.message && (
              <p style={{ color: "red" }}>{errors.password?.message}</p>
            )}
            <MDBBtn
              className="mb-0 px-5"
              size="lg"
              color="warning"
              type="submit"
            >
              Login
            </MDBBtn>
          </form>

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
            <p className="small fw-bold mt-2 pt-1 mb-2">
              Don't have an account?{" "}
              <Link to="/register" className="link-danger">
                Register
              </Link>
            </p>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>

            <MDBBtn floating size="sm" tag="a" className="me-2" color="white">
              <i className="fa fa-facebook-square" aria-hidden="true"></i>
            </MDBBtn>

            <MDBBtn floating size="sm" tag="a" className="me-2" color="white">
              <i className="fa fa-google" aria-hidden="true"></i>
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
