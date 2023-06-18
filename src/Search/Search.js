import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {AccountsEdit, changePassword} from "../services/AccountService";
import swal from "sweetalert";
import * as Yup from "yup";
import {Link, Outlet, useSearchParams} from "react-router-dom";


const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [keyword, setKeyword] = useState(searchParams.get("keyword"));
    const [selection, setSelection] = useState("All")
    const navSelection = (value)=>{
        setSelection(value)
    }
    return (
        <>
            <main>
                <div className="container">
                    <div className="row">

                        <div className="col-lg-3">

                            <div className="d-flex align-items-center mb-4 d-lg-none">
                                <button className="border-0 bg-transparent" type="button" data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                    <i className="btn btn-primary fw-bold fa-solid fa-sliders"></i>
                                    <span className="h6 mb-0 fw-bold d-lg-none ms-2">Settings</span>
                                </button>
                            </div>

                            <nav className="navbar navbar-light navbar-expand-lg mx-0">
                                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar">
                                    <div className="offcanvas-header">
                                        <button type="button" className="btn-close text-reset ms-auto"
                                                data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div className="offcanvas-body p-0">
                                        <div className="card w-100">
                                            <div className="card-body">
                                                <ul className="nav nav-tabs nav-pills nav-pills-soft flex-column fw-bold gap-2 border-0">
                                                    <li className="nav-item" data-bs-dismiss="offcanvas" onClick={()=>{navSelection("All")}}>
                                                        <Link className={`nav-link d-flex mb-0 ${selection === "All"?" active":""}`}
                                                              to={`/home/search?keyword=${keyword}`} > <img
                                                            className="me-2 h-20px fa-fw"
                                                            src="/assets/images/icon/earth-outline-filled.svg"
                                                            alt=""/><span>All </span></Link>
                                                    </li>
                                                    <li className="nav-item" data-bs-dismiss="offcanvas" onClick={()=>{navSelection("People")}}>
                                                        <Link className={selection === "People" ? 'nav-link d-flex mb-0 active' : 'nav-link d-flex mb-0'} to={`people?keyword=${keyword}`}
                                                        > <img className="me-2 h-20px fa-fw"
                                                               src="/assets/images/icon/person-outline-filled.svg"
                                                               alt=""/><span>People </span></Link>
                                                    </li>
                                                    <li className="nav-item" data-bs-dismiss="offcanvas" onClick={()=>{navSelection("Post")}}>
                                                        <Link className={selection === "Post" ? 'nav-link d-flex mb-0 active' : 'nav-link d-flex mb-0'} to={`post?keyword=${keyword}`}
                                                        > <img className="me-2 h-20px fa-fw"
                                                               src="/assets/images/icon/task-done-outline-filled.svg"
                                                               alt=""/><span>Post </span></Link>
                                                    </li>

                                                </ul>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </nav>
                        </div>

                        <div className="col-lg-6 vstack gap-4">
                            <div className="tab-content py-0 mb-0">
                                <div className="tab-pane show active fade" id="nav-setting-tab-1">
                                    <Outlet ></Outlet>
                                </div>



                            </div>
                        </div>

                    </div>
                </div>


            </main>

        </>
    )
}

export default Search;
