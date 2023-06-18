import {ErrorMessage, Field, Form, Formik} from "formik";
import {changePassword} from "../services/AccountService";
import swal from "sweetalert";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";

function Password(){
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
    return(
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
                                    swal("Old password incorrect", {icon: "error"})
                                }else {
                                    swal(`Change password success`,{
                                        icon: "success",
                                    })
                                    document.getElementById('namngo').reset()
                                }
                            })
                        }else {
                            swal("RePassword incorrect", {icon: "error"})
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
    )
}
export default Password;