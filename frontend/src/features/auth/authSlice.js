import { createSlice } from '@reduxjs/toolkit'

const initialState={
    user:null,
    isAuthenticated:false,
    token:null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        signout(state){
state.isAuthenticated=false
state.user=null
state.token=null
        },
        signin(state,action){
            state.user=action.payload.user
            state.isAuthenticated=true
            state.token=action.payload.token
        },
        updateUser(state,action){
state.user=action.payload
        }
        
    }
})
export const authReducer=authSlice.reducer
export const user=(state)=>state.auth.user
export const token=(state)=>state.auth.token
export const {signin,signout,updateUser}=authSlice.actions
export const isAuthenticated=(state)=>state.auth.isAuthenticated