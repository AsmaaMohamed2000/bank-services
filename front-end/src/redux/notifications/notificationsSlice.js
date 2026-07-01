import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as notificationService from "../../services/notoficationService"

const initialState = {
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
    success: false,
    message: ""
}

export const getNotifications = createAsyncThunk(
    "notification/getAll",
    async (user, thunkAPI) => {
        try {
            return await notificationService.getNotifications(user)
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || err.message
            )
        }
    }
)

export const getUnreadCount = createAsyncThunk(
    "notification/unreadCount",
    async (user, thunkAPI) => {
        try {
            return await notificationService.getUnreadCount(user)
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || err.message
            )
        }
    }
)

export const markAsRead = createAsyncThunk(
    "notification/markAsRead",
    async ({ id, user }, thunkAPI) => {
        try {
            return await notificationService.markAsRead(id, user)
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || err.message
            )
        }
    }
)

export const markAllAsRead = createAsyncThunk(
    "notification/markAllAsRead",
    async (user, thunkAPI) => {
        try {
            return await notificationService.markAllAsRead(user)
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || err.message
            )
        }
    }
)

export const deleteNotification = createAsyncThunk(
    "notification/delete",
    async ({ id, user }, thunkAPI) => {
        try {
            await notificationService.deleteNotification(id, user)
            return id
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || err.message
            )
        }
    }
)

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false
            state.error = null
            state.success = false
            state.message = ""
        }
    },

    extraReducers: (builder) => {

        builder

            .addCase(getNotifications.pending, (state) => {
                state.loading = true
            })

            .addCase(getNotifications.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.notifications = action.payload.notifications
            })

            .addCase(getNotifications.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(getUnreadCount.fulfilled, (state, action) => {
                state.unreadCount = action.payload.unreadCount
            })

            .addCase(markAsRead.fulfilled, (state, action) => {

                const index = state.notifications.findIndex(
                    item => item._id === action.payload.notification._id
                )

                if (index !== -1) {
                    state.notifications[index] =
                        action.payload.notification
                }

                state.unreadCount =
                    Math.max(0, state.unreadCount - 1)

            })

            .addCase(markAllAsRead.fulfilled, (state) => {

                state.notifications =
                    state.notifications.map(item => ({
                        ...item,
                        isRead: true
                    }))

                state.unreadCount = 0

            })

            .addCase(deleteNotification.fulfilled, (state, action) => {

                state.notifications =
                    state.notifications.filter(
                        item => item._id !== action.payload
                    )

            })

    }

})

export const { reset } = notificationSlice.actions

export default notificationSlice.reducer