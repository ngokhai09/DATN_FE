import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
export const findByIdPostComment = createAsyncThunk(
    'comments/findByIdPostComment',
    async (data) => {
        const res = await axios.get(`http://localhost:4000/comments/findByIdPC/${data}`);
        return res.data
    }
)
export const getComment = createAsyncThunk(
    'comments/getComment',
    async () =>{
        const res = await axios.get(`http://localhost:4000/comments`)
        return res.data
    }
)
export const deleteComment = createAsyncThunk(
    'comments/deleteComments',
    async (id) => {
        await axios.delete(`http://localhost:4000/comments/${id}`)
        return id;
    }
)
export const addComment = createAsyncThunk(
    'comments/addComment',
    async (data) => {
        const response = await axios.post('http://localhost:4000/comments', data);
        return response.data[0];
    }
)
export const findByIdComment = createAsyncThunk(
    'comments/findByIdComment',
    async (data) => {
        const res = await axios.get(`http://localhost:4000/comments/findById/${data}`);
        return res.data
    }
)
export const editComment = createAsyncThunk(
    'comments/editComment',
    async (data) => {
        const response = await axios.put(`http://localhost:4000/comments/${data.idComment}`, data);
        console.log(response.data)
        return response.data[0];
    }
)