import {createSlice} from "@reduxjs/toolkit";
import {
    addComment,
    deleteComment,
    editComment,
    findByIdComment,
    findByIdPostComment, getComment
} from "../../services/CommentService";
import {editPost} from "../../services/PostService";

const initialState = {
    comments: [],
    currentComment: []
}
const commentSlice = createSlice({
        name: 'comments',
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(findByIdPostComment.fulfilled, (state, action) => {
                state.comments = action.payload;
            });
            builder.addCase(getComment.fulfilled, (state, action) => {
                state.comments = action.payload;
            });
            builder.addCase(addComment.fulfilled, (state, action) => {
                state.comments.unshift(action.payload)
            });
            builder.addCase(deleteComment.fulfilled, (state, action) => {
                state.comments.map((it, id) => {
                    if (it.idComment === action.payload) {
                        state.comments.splice(id, 1)
                    }
                })
            });
            builder.addCase(findByIdComment.fulfilled, (state, action) => {
                state.currentComment = action.payload;
            });
            builder.addCase(editComment.fulfilled, (state, action) => {
                state.comments.map((it, id) => {
                    if (it.idComment === action.payload.idComment) {
                        state.comments[id] = action.payload
                    }
                })
            })

        }

    }
)

export default commentSlice.reducer;