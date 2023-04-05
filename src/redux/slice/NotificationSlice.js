import {createSlice} from "@reduxjs/toolkit";
import {checkNotification, editNotification, getNotifications} from "../../services/NotificationService";


const initialState = {
    notifications: [],
    check :''
}
const notificationSlice = createSlice({
        name: 'notifications',
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(getNotifications.fulfilled, (state, action) => {
                state.notifications = action.payload
            });

            builder.addCase(checkNotification.fulfilled, (state, action) => {
                state.check = action.payload
            });

            builder.addCase(editNotification.fulfilled, (state, action) => {
                state.check = action.payload;
            });


        }
    }
)

export default notificationSlice.reducer;
