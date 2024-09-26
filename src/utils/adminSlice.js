import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    adminid: "",
    token: "",
    adminData: {
        name: "",
        email: "",
    },
    message:"",
    userslist:"",
    userauth:"",
    isLoading: false,
    error: null,
}
export const fetchData = createAsyncThunk(
    'admin/fetchData',
    async ({ accessToken, endpoint, method, data = null }) => {
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
            state.adminid = action.payload
        },
        adminData: (state, action) => {
            state.adminData = action.payload
        },
        adminUsersList:(state,action) => {
            state.userslist= action.payload
        },
        adminLogout:(state,action) => {
            state.token = action.payload
        },
        adminUserManage:(state,action) => {
            state.userauth = action.payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.isLoading = false
            console.log(action.payload,'payload is showing ========>>>');
            state.message = action.payload.message
            const {userid,name,email} = action.payload.adminData
            state.adminData = {name,email}
            state.adminid = userid
        })
        builder.addCase(fetchData.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    }

})

export const { adminAuth, adminId, adminData, adminUsersList, adminLogout } = adminSlice.actions
export default adminSlice.reducer