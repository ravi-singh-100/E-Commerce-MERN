import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAll } from "./OrdersAPI";
const initialState={
orders:[],
deliveredOrders:[],
dispatchedOrders:[],
cancelledOrders:[],
isLoading:false
}
export const getAllCartHistoryAsync=createAsyncThunk('/cart/getAll',async({token})=>{
    // console.log(token)
const response=await getAll(token)
return response
})
const orderSlice=createSlice({
    name:'orders',
    initialState,
    reducers:{
updateOrder:function(state,action){
state.orders=action.payload
},
updateBoth:function(state,action){
    state.orders=action.payload.orders
    state.dispatchedOrders=action.payload.dispatchedOrders
},
updateDispatchedOrders:function(state,action){
    state.dispatchedOrders=action.payload
},
updateCancelledOrder:function(state,action){
    state.cancelledOrders=action.payload
},
updateDeliveredOrders:function(state,action){
    state.deliveredOrders=action.payload
},
emptyAllOrders:function(state,action){
state.orders=[]
state.cancelledOrders=[]
state.deliveredOrders=[]
state.dispatchedOrders=[]
}
},
    extraReducers:(builder)=>{
        builder.addCase(getAllCartHistoryAsync.fulfilled,(state,action)=>{
 state.orders=action.payload.orders
      
            state.isLoading=false
        })
     .addCase(getAllCartHistoryAsync.pending,(state,action)=>{
state.isLoading=true
        })
        
    }
})

export const orders=(state)=>state.order.orders
export const dispatchedOrders=(state)=>state.order.dispatchedOrders
export const deliveredOrders=(state)=>state.order.deliveredOrders
export const cancelledOrders=(state)=>state.order.cancelledOrders
export const isLoading=(state)=>state.order.isLoading
export const {updateOrder,updateCancelledOrder,updateDeliveredOrders,updateDispatchedOrders,updateBoth,emptyAllOrders}=orderSlice.actions
export const orderReducer=orderSlice.reducer
