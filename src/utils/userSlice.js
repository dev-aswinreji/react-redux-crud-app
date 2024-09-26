import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        isAuth: "false",
        userid: "",
        imageUrl: "",
        token: "",
        userDatas:{
            name:"",
            email:"",
        },
    },
    reducers: {
        userAuth: (state, action) => {
            state.token = action.payload
        },
        userId: (state, action) => {
            state.userid = action.payload
        },
        userData:(state,action) => {
            state.userDatas = action.payload
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

export const { userAuth, userId,userData, signOut, addImage, removeImage } = userSlice.actions

export default userSlice.reducer