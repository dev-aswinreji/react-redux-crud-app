import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    id: "",
    token: "",
    adminData: {
        name: "",
        email: "",
    },
    userslist:[],
    isLoading: false,
    error: null,
}
export const fetchData = createAsyncThunk(
    'admin/fetchData',
    async ({ accessToken, endpoint, method, data = null }) => {
        console.log(accessToken, 'token is here');
        console.log(endpoint, accessToken, 'is it working');
        const res = await axios({
            method: method,
            url: `http://localhost:5000/api/admin${endpoint}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: data,
        })
        return res.data
    }

)

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        adminAuth: (state, action) => {
            state.token = action.payload
        },
        adminId: (state, action) => {
            state.id = action.payload
        },
        adminData: (state, action) => {
            state.adminData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.isLoading = false
            state.token = action.payload
        })
        builder.addCase(fetchData.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    }

})

export const { adminAuth, adminId, adminData } = adminSlice.actions
export default adminSlice.reducer