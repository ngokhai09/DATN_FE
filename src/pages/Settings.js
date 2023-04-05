import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {AccountsEdit, changePassword} from "../services/AccountService";
import swal from "sweetalert";
import * as Yup from "yup";


const Settings = () => {

    const account = useSelector(state => {
        return state.account.currentAccount
    })

    const dispatch =useDispatch()

    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .required( <p style={{color:"red", marginTop:-15}}>Please enter password.</p>)
            .min(6,  <p style={{color:"red", marginTop:-15 }}>Passwords must be at least 6 characters</p>)
            .max(32, <p style={{color:"red", marginTop:-15 }}>Password must be at most 14 characters</p>),
        repeatPassword: Yup.string()
            .required(<p style={{color:"red", marginTop:-15 }}>Please re-enter your password.</p>)
    });



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
                                                    <li className="nav-item" data-bs-dismiss="offcanvas">
                                                        <a className="nav-link d-flex mb-0 active"
                                                           href="#nav-setting-tab-1" data-bs-toggle="tab"> <img
                                                            className="me-2 h-20px fa-fw"
                                                            src="/assets/images/icon/person-outline-filled.svg"
                                                            alt=""/><span>Account </span></a>
                                                    </li>
                                                    <li className="nav-item" data-bs-dismiss="offcanvas">
                                                        <a className="nav-link d-flex mb-0" href="#nav-setting-tab-2"
                                                           data-bs-toggle="tab"> <img className="me-2 h-20px fa-fw"
                                                                                      src="/assets/images/icon/notification-outlined-filled.svg"
                                                                                      alt=""/><span>About </span></a>
                                                    </li>
                                                    <li className="nav-item" data-bs-dismiss="offcanvas">
                                                        <a className="nav-link d-flex mb-0" href="#nav-setting-tab-3"
                                                           data-bs-toggle="tab"> <img className="me-2 h-20px fa-fw"
                                                                                      src="/assets/images/icon/shield-outline-filled.svg"
                                                                                      alt=""/><span>Privacy and safety </span></a>
                                                    </li>

                                                </ul>
                                            </div>
                                            <div className="card-footer text-center py-2">
                                                <a className="btn btn-link text-secondary btn-sm" href="#!">View
                                                    Profile </a>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </nav>
                        </div>

                        <div className="col-lg-6 vstack gap-4">
                            <div className="tab-content py-0 mb-0">
                                <div className="tab-pane show active fade" id="nav-setting-tab-1">
                                    <div className="card mb-4">
                                        <Formik initialValues={{
                                            name:account.name,
                                            address:account.address,
                                            german:account.german,
                                            birthday:account.birthday,
                                        }}
                                                onSubmit={ (values)=>{
                                                    values.idAccount = account.idAccount;
                                                    values.avatar = account.avatar;
                                                  dispatch(AccountsEdit(values)).then( ()=>{
                                                        swal(`Update information`,{
                                                            icon:"success"
                                                        })})

                                                }}
                                        enableReinitialize={true}>

                                            <Form>
                                                <div className="card-header border-0 pb-0">
                                                    <h1 className="h5 card-title">Account Settings</h1>

                                                </div>

                                                <div className="card-body">
                                                    <div className="row g-3">

                                                        <div className="col-sm-6 ">
                                                            <label className="form-label">Name</label>
                                                            <Field type="text" className="form-control" name={'name'}/>
                                                        </div>
                                                        <div className="col-sm-6 ">
                                                            <label className="form-label">Address</label>
                                                            <Field type="text" className="form-control" name="address"/>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <label className="form-label">German</label>
                                                            <Field as={'select'} className="form-control" name={'german'}>
                                                                <option value={'men'}>Men</option>
                                                                <option value={'woman'}>Woman</option>
                                                                <option value={'other'}>Other</option>
                                                            </Field>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <label className="form-label">Birthday </label>
                                                            <Field type="date" className="form-control flatpickr" name="birthday"/>
                                                        </div>

                                                        <div className="col-12 text-end">
                                                            <button type="submit" className="btn btn-sm btn-primary mb-0">Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Form>
                                        </Formik>
                                    </div>
                                    <div className="card">
                                        <Formik initialValues={{
                                            oldPassword:'',
                                            newPassword:'',
                                            repeatPassword:'',
                                        }}
                                        validationSchema={validationSchema}
                                        onSubmit={(values)=>{
                                            values.id = account.idAccount;
                                            if(values.repeatPassword === values.newPassword){
                                                dispatch(changePassword(values)).then((values)=>{
                                                    if (values.payload === undefined){
                                                        alert(`OldPassword Fail`)
                                                    }else {
                                                        swal(`Change password success`,{
                                                            icon: "success",
                                                        })
                                                        document.getElementById('namngo').reset()
                                                    }
                                                })
                                            }else {
                                                alert(`Wrong repeat password`)
                                            }
                                        }}
                                        enableReinitialize={true}>

                                            <Form id='namngo'>
                                            <div className="card-header border-0 pb-0">
                                                <h5 className="card-title">Change your password</h5>
                                                <p className="mb-0">See resolved goodness felicity shy civility domestic had
                                                    but.</p>
                                            </div>

                                                <div className="card-body">
                                                <div className="row g-3">
                                                    <div className="col-12">
                                                        <label className="form-label">OldPassword</label>
                                                        <Field type="password" className="form-control" name={'oldPassword'}/>
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label">New password</label>
                                                        <div className="input-group">
                                                            <Field className="form-control fakepassword" type="password"
                                                                    name={'newPassword'}/>
                                                        </div>
                                                        <br/>
                                                        <alert >
                                                            <ErrorMessage name={"newPassword"}></ErrorMessage>
                                                        </alert>
                                                        <div id="pswmeter" className="mt-2"></div>
                                                        <div id="pswmeter-message" className="rounded mt-1"></div>
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label">Repeat Password</label>
                                                        <Field type="password" className="form-control" name={'repeatPassword'}/>
                                                        <br/>
                                                        <alert>
                                                            <ErrorMessage name={"repeatPassword"}></ErrorMessage>
                                                        </alert>
                                                    </div>

                                                    <div className="col-12 text-end">
                                                        <button type="submit" className="btn btn-primary mb-0">Update
                                                            password
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            </Form>
                                        </Formik>
                                    </div>
                                </div>



                            </div>
                        </div>

                    </div>
                </div>


            </main>

        </>
    )
}

export default Settings;
