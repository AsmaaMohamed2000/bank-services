import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import notificationReducer from './notifications/notificationsSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        notification:notificationReducer
    }
})