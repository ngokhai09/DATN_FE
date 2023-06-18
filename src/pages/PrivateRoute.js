import {Route, Redirect, useNavigate, Navigate} from 'react-router-dom';

import React, {useEffect, useLayoutEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findById} from "../services/AccountService";

export { PrivateRoute };

function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [auth, setAuth] = useState(localStorage.getItem("access_token") || null);
    const account = useSelector(state => {
        return state.account.currentAccount
    })
    useEffect(()=>{
        dispatch(findById(JSON.parse(localStorage.getItem("account"))))
    },[])
    return auth ? (
        <>{account && children}</>
    ) : (
        <>
            <Navigate
                replace={true}
                to="/"
            />
        </>
    )
}