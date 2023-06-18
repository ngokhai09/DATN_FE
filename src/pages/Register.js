import React from 'react';
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {AccountsRegister} from "../services/AccountService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import password from "./Password";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const initialValuesAdd = {
        username: "", password: "", passwordAgain: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username must not empty")
            .matches(/^[a-zA-Z0-9]/, "Username must not have special characters"),
        password: Yup.string()
            .required("Password must not empty.")
            .min(6, "Passwords must be at least 6 characters")
            .max(32, "Password must be at most 32 characters"),
        passwordAgain: Yup.string()
            .required("RePassword must not empty")
            .oneOf([Yup.ref('password'), null], "Password must match")
    });
    const handleSubmit = async (values) => {
        if (values.password !== values.passwordAgain) {
            alert('Incorrect password.')
        } else {
            let data = {
                username: values.username, password: values.password
            }

                dispatch(AccountsRegister(data)).then((value)=>{
                if(value.payload !== 'Username registered'){
                    swal(`Registered successfully.`, {
                        icon: "success",
                    })
                    navigate('/')
                } else {
                    alert('Username registered')
                    navigate('')
                }
            })
        }

    };
    return (<>
        <Formik className="mt-sm-4" initialValues={initialValuesAdd}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
            <Form>
                <div className="container">
                    <div className="row justify-content-center align-items-center vh-100 py-5">


                        <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">

                            <div className="card card-body text-center p-4 p-sm-5">

                                <h1 className="mb-2">Sign up</h1>
                                <p>
                                <span className="d-block">Already have an account? <Link
                                    to="/">Sign in here</Link></span>
                                </p>

                                <div className="mb-3 mt-3 input-group-lg">

                                    <Field className="form-control" type="text" placeholder="UserName"
                                           name="username"/>
                                    <alert style={{color: "red", fontSize: "12px", fontWeight: "bold"}}>
                                        <ErrorMessage name={"username"}/>
                                    </alert>
                                </div>
                                <div className="mb-3 position-relative">

                                    <div className="input-group input-group-lg">

                                        <Field className="form-control fakepassword" type="password"
                                               id="psw-input"
                                               placeholder="Password" name="password"/>

                                        <span className="input-group-text p-0">
                                            <i className="fakepasswordicon fa-solid fa-eye-slash cursor-pointer p-2 w-40px"></i>
                                            </span>
                                    </div>
                                    <div id="pswmeter" className="mt-2"></div>
                                    <alert style={{color: "red", fontSize: "12px", fontWeight: "bold"}}>
                                        <ErrorMessage name={"password"}/>
                                    </alert>
                                    <div className="d-flex mt-1">
                                        <div id="pswmeter-message" className="rounded"></div>
                                        <div className="ms-auto">
                                            <i className="bi bi-info-circle ps-1" data-bs-container="body"
                                               data-bs-toggle="popover" data-bs-placement="top"
                                               data-bs-content="Include at least one uppercase, one lowercase, one special character, one number and 8 characters long."
                                               data-bs-original-title="" title=""></i>
                                        </div>
                                    </div>
                                    <div className="input-group input-group-lg">
                                        <Field type="password" placeholder="Password Again"
                                               className="form-control fakepassword"
                                               name="passwordAgain" style={{borderRadius: '5px'}}/>
                                    </div>
                                    <alert style={{color: "red", fontSize: "12px", fontWeight: "bold"}}>
                                        <ErrorMessage name={"passwordAgain"}></ErrorMessage>
                                    </alert>
                                </div>
                                <div className="mb-3 d-sm-flex justify-content-between">
                                    <a href="forgot-password.html">Forgot password?</a>
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-lg btn-primary">Register</button>
                                </div>

                                <p className="mb-0 mt-3">©2023 <a target="_blank"
                                                                  href="#">Connectivity.</a> All
                                    rights reserved</p>

                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    </>)
}


export default Register;
