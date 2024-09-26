import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        isAuth: "false",
        userid: "",
        imageUrl: "",
        token: ""
    },
    reducers: {
        userAuth: (state, action) => {
            state.token = action.payload
        },
        userId: (state, action) => {
            state.userid = action.payload
        },
        signOut: (state, action) => {
            state.token = action.payload
        },
        addImage: (state, action) => {
            state.imageUrl = action.payload
        },
        removeImage: (state, action) => {
            state.imageUrl = action.payload
        }

    }
})

export const { userAuth, userId, signOut, addImage, removeImage } = userSlice.actions

export default userSlice.reducer