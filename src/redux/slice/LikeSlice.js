import {createSlice} from "@reduxjs/toolkit";
import {like} from "../../services/LikeService";


const initialState = {
    likes: []
}
const likeSlice = createSlice({
        name: 'likes',
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(like.fulfilled, (state, action) => {
                state.likes.unshift(action.payload)
            });
        }
    }
)

export default likeSlice.reducer;
