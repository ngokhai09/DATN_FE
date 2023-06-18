import {Field, Form, Formik} from "formik";
import {AccountsEdit} from "../services/AccountService";
import swal from "sweetalert";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";

function Account(){
    const account = useSelector(state => {
        return state.account.currentAccount
    })

    const dispatch =useDispatch()


    return(
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
    )
}
export default Account;