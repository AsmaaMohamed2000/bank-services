import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser } from '../../services/authService'

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (data, thunkAPI) => {
        try {
            const response = await loginUser(data)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            )
        }
    }
)