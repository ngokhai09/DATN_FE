import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const like = createAsyncThunk(
    'likes/like',
    async (data) => {
        await axios.post(`http://localhost:4000/likes`, data);
        return data;
    }
)
export const unLike = createAsyncThunk(
    'likes/unLike',
    async (data) => {
        await axios.delete(`http://localhost:4000/likes`, {data: data});
        return data;
    }
)


