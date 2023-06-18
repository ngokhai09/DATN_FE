import React, {useEffect, useState} from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AccountsLogin,
  AccountsLoginGG,
  AccountsRegister,
} from "../services/AccountService";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import * as Yup from "yup";
import swal from "sweetalert";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValuesAdd = {
    username: "",
    password: "",
  };

  const checkUSer = useSelector((state) => {
    return state.account.checkUser;
  });
  let [userGG, setUserGG] = useState({});
  async function check() {
    console.log(checkUSer)
    if (checkUSer == false) {
      await dispatch(AccountsRegister(userGG));
      await dispatch(AccountsLogin(userGG));
      swal(`Welcome to Bug Men.`, {
        icon: "success",
      });
      navigate("/home");
    }
    if (checkUSer == true) {
      console.log(userGG)
      await dispatch(AccountsLogin(userGG));
      swal(`Welcome to Bug Men.`, {
        icon: "success",
      });
      navigate("/home");
    }
  }
  useEffect(()=>{
    check()
  }, [checkUSer])

  const handleSubmit = async (values) => {
    await dispatch(AccountsLogin(values)).then((value) => {
      if (
        value.payload.data === "User is not exit" ||
        value.payload.data === "Password is wrong"
      ) {
        swal(`Incorrect account or password`, {
          icon: "warning",
        });
        navigate("/");
      } else {
        swal(`Welcome to Connectivity.`, {
          icon: "success",
        });
        navigate("/home");
      }
    });
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Please Enter Username")
      .matches(/^[a-zA-Z0-9]/),
    password: Yup.string()
      .required("Please Enter Password")
      .min(6, "Passwords must be at least 6 characters")
      .max(32, "Password must be at most 14 characters"),
  });

  return (
    <>
      <Formik
        className="mt-sm-4"
        initialValues={initialValuesAdd}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values).then();
        }}
      >
        <Form>
          <div className="container">
            <div className="row justify-content-center align-items-center vh-100 py-5">
              <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                <div className="card card-body text-center p-4 p-sm-5">
                  <h1 className="mb-2">Sign in</h1>
                  <p className="mb-0">
                    Don't have an account?
                    <Link to={"/registers"}> Click here to sign up</Link>
                  </p>

                  <div className="mb-3 mt-3 input-group-lg">
                    <Field
                      className="form-control"
                      type="text"
                      placeholder="UserName"
                      name="username"
                    />
                    <alert style={{color: "red", fontSize: "12px", fontWeight: "bold"}}>
                      <ErrorMessage name={"username"} />
                    </alert>
                  </div>
                  <div className="mb-3 position-relative">
                    <div className="input-group input-group-lg">
                      <Field
                        className="form-control password"
                        type="password"
                        id="psw-input"
                        placeholder="Password"
                        name="password"
                      />

                      <span className="input-group-text p-0">
                        <i className="fakepasswordicon fa-solid fa-eye-slash cursor-pointer p-2 w-40px"></i>
                      </span>
                    </div>
                    <div id="psw meter" className="mt-2"></div>
                    <alert  style={{color: "red", fontSize: "12px", fontWeight: "bold"}} >
                      <ErrorMessage style={{color: "red"}} name={"password"} />
                    </alert>

                  </div>
                  <div className="mb-3 d-sm-flex justify-content-between">
                    <div>

                    </div>
                    <a href="forgot-password.html">Forgot password?</a>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-lg btn-primary">
                      Login
                    </button>
                  </div>
                  <div className="row mt-3">
                    <div className={"col-12 d-flex justify-content-center"}>


                        <GoogleLogin

                          onSuccess={async (credentialResponse) => {
                            const decoded = jwt_decode(
                              credentialResponse.credential
                            );
                            let user = {
                              username: decoded.email,
                              name: decoded.name,
                              avatar: decoded.picture,
                            };
                            await setUserGG(user);
                            await dispatch(AccountsLoginGG(user))
                          }}
                          onError={(e) => {
                            console.log(e);
                          }}
                        />
                    </div>
                  </div>
                  <p className="mb-0 mt-3">
                    ©2023{" "}
                    <a target="_blank" href="#">
                      Connectivity.
                    </a>{" "}
                    All rights reserved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};
export default Login;
