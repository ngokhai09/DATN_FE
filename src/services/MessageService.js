import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
export const getMessage = createAsyncThunk(
    'message/getMessages',
    async (data) => {
        const response = await axios.get(`http://localhost:4000/messages`+ data);
        return response.data;
    }
)

export const sendMessage = createAsyncThunk(
    'message/sendMessage',
    async (data) => {
        const response = await axios.post(`http://localhost:4000/messages`,data);
        console.log(response.data)
        return response.data;
    }
)

export const getListMessage = createAsyncThunk(
    'message/getListMessages',
    async (data) => {
        const response = await axios.get(`http://localhost:4000/messages/contacts/${data}`);
        return response.data;
    }
)
