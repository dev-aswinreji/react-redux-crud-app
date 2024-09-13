import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        session: []
    },
    reducers: {
        userAuth: (state, action) => {
            state.session.push(action.payload)
        },
        signOut: (state, action) => {
            state.session.filter((item => item === action.payload))
        },
        addImage: (state, action) => {
            state.session.push(action.payload)
        },
        removeImage: (state, action) => {
            state.session.filter((item => item === action.payload))
        }

    }
})

export const { userAuth, signOut, addImage, removeImage } = userSlice.actions

export default userSlice.reducer