import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const checkFriend = createAsyncThunk(
    'friends/checkFriend',
    async (data) => {
        const response = await axios.get(`http://localhost:4000/friends/search?thisId=${data.thisId}&thatId=${data.thatId}`);
        return response.data;
    }
)
export const addFriend = createAsyncThunk(
    'friends/addFriend',
    async (data) => {
        const response = await axios.post(`http://localhost:4000/friends`,data);
        return response.data;
    }
)
export const deleteFriend = createAsyncThunk(
    'friends/deleteFriend',
    async (data) => {
        await axios.delete(`http://localhost:4000/friends/${data}`);
        return data;
    }
)
export const confirmFriend = createAsyncThunk(
    'friends/confirmFriend',
    async (data) => {
        const response = await axios.put(`http://localhost:4000/friends/${data}`,data);
        return response.data;
    }
)
export const getFriends = createAsyncThunk(
    'friends/getFriends',
    async (data) => {
        const response = await axios.get(`http://localhost:4000/friends/getFriends/${data}`);
        return response.data;
    }
)
