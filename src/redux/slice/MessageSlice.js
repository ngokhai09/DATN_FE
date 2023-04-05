import {createSlice} from "@reduxjs/toolkit";
import {getListMessage, getMessage, sendMessage} from "../../services/MessageService";


const initialState = {
    messages: [],
    message:{otherAccount:{}},
    list : []
}
const messageSlice = createSlice({
        name: 'messages',
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(getMessage.fulfilled, (state, action) => {
                console.log(action.payload)
                state.messages = action.payload
            });
            builder.addCase(sendMessage.fulfilled, (state, action) => {
                state.message = action.payload
            });
            builder.addCase(getListMessage.fulfilled, (state, action) => {
                state.list = action.payload
            });
        }
    }
)

export default messageSlice.reducer;
