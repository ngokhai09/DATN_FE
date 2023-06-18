import {createSlice} from "@reduxjs/toolkit";
import {
    changePassword,
    findById,
    AccountsEdit,
    AccountsLogin,
    AccountsLogout,
    AccountsRegister,
    AccountsLoginGG,
    searchOtherAccount
} from "../../services/AccountService";
import {json} from "react-router-dom";

const initialState = {
    account: [],
    checkUser: null,
    otherAccount: {account : {}},
    currentAccount: null,
}
const accountSlice = createSlice({
    name: 'account', initialState, reducers: {}, extraReducers: builder => {
        // builder.addCase(AccountsRegister.fulfilled, (state, {payload}) => {
        //     state.account.push(payload.data);
        // });

        builder.addCase(findById.fulfilled, (state, {payload}) => {
            state.account = payload;
            state.currentAccount = payload;
        });
        builder.addCase(AccountsEdit.fulfilled, (state, action) => {
            state.currentAccount = action.payload;
            localStorage.setItem('account', JSON.stringify(action.payload.idAccount));
        });

        builder.addCase(AccountsLogin.fulfilled, (state, {payload}) => {
            state.account = payload.data;
            state.currentAccount = payload.data;
            if (state.account !== 'User is not exit' && state.account !== 'Password is wrong') {
                localStorage.setItem("account", payload.data.idAccount)
                localStorage.setItem("access_token", payload.data.token)
            }

        });
        builder.addCase(AccountsLogout.fulfilled, (state, {payload}) => {
            state.accountShow = true
            state.account = payload.data;
            state.currentAccount = payload.data;
            if (state.account !== 'User is not exit' && state.account !== 'Password is wrong') {
                localStorage.setItem("account", payload.data.idAccount)
                localStorage.setItem("access_token", payload.data.token)
            }
        })
        builder.addCase(AccountsLoginGG.fulfilled, (state, {payload}) => {
            state.accountShow = true
            state.account = payload;
            state.currentAccount = payload;
            if (state.account !== 'User is not exit' && state.account !== 'Password is wrong') {
                localStorage.setItem("account", payload.idAccount)
                localStorage.setItem("access_token", payload.token)
            }
            state.checkUser = payload.idAccount != null;

        })
        builder.addCase(searchOtherAccount.fulfilled, (state, action) => {
            state.otherAccount = action.payload
        })
    }
})
export default accountSlice.reducer;
