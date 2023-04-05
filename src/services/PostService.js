import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const editPost = createAsyncThunk(
    'posts/editPost',
    async (data) => {
        const response = await axios.put(`http://localhost:4000/posts/${data.idPost}`, data);
        return response.data[0];
    }
)
export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (data) => {
        const response = await axios.get(`http://localhost:4000/posts`);
        return response.data;
    }
)

export const getStatus = createAsyncThunk(
    'posts/getStatus',
    async () => {
        const response = await axios.get('http://localhost:4000/posts/status');
        return response.data;
    }
)

export const addPosts = createAsyncThunk(
    'posts/addPosts',
    async (data) => {
        const response = await axios.post('http://localhost:4000/posts', data);
        return response.data[0];
    }
)
export const findByIdPost = createAsyncThunk(
    'posts/findByIdPost',
    async (data) => {
        const res = await axios.get(`http://localhost:4000/posts/findById/${data}`);
        return res.data

    }
)
export const deletePost = createAsyncThunk(
    'posts/deletePosts',
    async (id) => {
        await axios.delete(`http://localhost:4000/posts/${id}`)
        return id;
    }
)
export const findByIdAccount = createAsyncThunk(
    'posts/findByIdAccount',
    async (data) => {
        const res = await axios.get(`http://localhost:4000/posts/${data}`);
        return res.data
    }
)
export const findByContent = createAsyncThunk(
    'posts/findByContent',
    async (data)=>{
        const res = await axios.get(`http://localhost:4000/posts/search/findByContent?search=${data}`);
        return res.data;
    }
)

export const unlikePost = createAsyncThunk(
    'posts/unlikePost',
    async (data)=> {
        return data
    }
)

export const likePost = createAsyncThunk(
    'posts/likePost',
    async (data)=> {
        return data
    }
)

export const unlikePostDetail = createAsyncThunk(
    'posts/unlikePostDetail',
    async (data)=> {
        return data
    }
)
export const likePostDetail = createAsyncThunk(
    'posts/likePostDetail',
    async (data)=> {
        return data
    }
)

