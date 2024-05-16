import { createSlice } from "@reduxjs/toolkit";


const adminSlice=createSlice({
    name:'admin',
initialState:{
    allOrders:null,
    remainingOrders:null,
    dispatchedOrders:null,
    deliveredOrders:null
}
})