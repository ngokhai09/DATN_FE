import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getNotifications = createAsyncThunk(
    'notifications/getNotifications',
    async (data) => {
        const response = await axios.get(`http://localhost:4000/notifications/${data}`);
        return response.data;
    }
)

export const addNotification = createAsyncThunk(
    'notifications/addNotification',
    async (data) => {
        const response = await axios.post(`http://localhost:4000/notifications`,data);
        return response.data;
    }
)

export const checkNotification = createAsyncThunk(
    'notifications/checkNotification',
    async (data) => {
        const response = await axios.get(`http://localhost:4000/notifications/check/${data}`);
        return response.data;
    }
)

export const editNotification = createAsyncThunk(
    'notifications/editNotification',
    async (data) => {
        const response = await axios.put(`http://localhost:4000/notifications/${data}`);
        return response.data;
    }
)