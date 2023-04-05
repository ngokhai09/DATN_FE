import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const AccountsRegister = createAsyncThunk(
    'accounts/accountsRegister',
    async (data) => {
        const response = await axios.post('http://localhost:4000/accounts/register', data);
        return response.data
    }
)
export const AccountsLogin = createAsyncThunk(
    'accounts/accountsLogin',
    async (data) => {
        return await axios.post('http://localhost:4000/accounts/login', data);
    }
)
export const AccountsLoginGG = createAsyncThunk(
    'accounts/accountsLoginGG',
    async (data) => {
        return await axios.post('http://localhost:4000/accounts/loginGG', data);
    }
)
export const AccountsLogout = createAsyncThunk(
    'accounts/accountsLogout',
    async () => {
        return false
    }
)

export const AccountsEdit = createAsyncThunk(
    'accounts/accountsEdit',
    async (data) => {
        await axios.put(`http://localhost:4000/accounts/${data.idAccount}`, data);
        return data;
    }
)
export const changePassword = createAsyncThunk(
    'accounts/changePassword',
    async (data) => {
        const response = await axios.post(`http://localhost:4000/accounts/changePassword/` + data.id, data);
        return response.data.accountFind
    }
)
export const findById = createAsyncThunk(
    'accounts/findById',
    async (data) => {
        const res = await axios.get(`http://localhost:4000/accounts/findById/${data}`);
        return res.data
    }
)
export const searchOtherAccount = createAsyncThunk(
    'accounts/searchOtherAccount',
    async (data) => {
        const res = await axios.get(`http://localhost:4000/accounts/findById/${data}`);
        return res.data
    }
)
