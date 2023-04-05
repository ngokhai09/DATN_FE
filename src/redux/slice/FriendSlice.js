import {createSlice} from "@reduxjs/toolkit";
import {addFriend, checkFriend, confirmFriend, deleteFriend, getFriends} from "../../services/FriendService";


const initialState = {
    friend: {},
    friends: []
}
const friendSlice = createSlice({
        name: 'friends',
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(checkFriend.fulfilled, (state, action) => {
                state.friend = action.payload
            });
            builder.addCase(addFriend.fulfilled, (state, action) => {
                state.friend = action.payload
            });
            builder.addCase(deleteFriend.fulfilled, (state, action) => {
                state.friend = "Add Friend"
            });
            builder.addCase(confirmFriend.fulfilled, (state, action) => {
                state.friend = action.payload
            });
            builder.addCase(getFriends.fulfilled, (state, action) => {
                state.friends = action.payload
            });

        }
    }
)

export default friendSlice.reducer;
