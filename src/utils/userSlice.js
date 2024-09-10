import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'users',
    initialState:{
        session:[]
    },
    reducers:{
        userAuth:(state,action)=>{
            state.session.push(action.payload)
        },
        signOut:(state)=>{state
            state.session.length = 0
        }
    }
})

export const {userAuth,signOut} = userSlice.actions

export default userSlice.reducer