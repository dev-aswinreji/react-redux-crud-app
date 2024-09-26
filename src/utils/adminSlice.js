import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        id: "",
        token: "",
        adminData: {
            name: "",
            email: "",
        }
    },
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
    }
})

export const { adminAuth, adminId, adminData } = adminSlice.actions
export default adminSlice.reducer