import {configureStore} from "@reduxjs/toolkit";
import accountSlice from "./slice/AccountSlice";
import postReducer from "./slice/PostSlice";
import currentPostReducer from "./slice/PostSlice";
import friendReducer from "./slice/FriendSlice";
import notificationReducer from "./slice/NotificationSlice";
import commentReducer from "./slice/CommentSlice";
import currentCommentReducer from "./slice/CommentSlice";
import messageReducer from "./slice/MessageSlice";
import likeReducer from "./slice/LikeSlice";


const Store = configureStore({
    reducer: {
        account: accountSlice,
        posts: postReducer,
        currentPost: currentPostReducer,
        friends: friendReducer,
        notifications: notificationReducer,
        comments : commentReducer,
        currentComment : currentCommentReducer,
        message : messageReducer,
        likes: likeReducer
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default Store;





