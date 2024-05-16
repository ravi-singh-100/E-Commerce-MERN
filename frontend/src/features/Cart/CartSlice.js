import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {updateCart,cart ,orderCart, increaseQuantity,removeCart} from "./CartAPI";

const initialState={
    items:[],
    totalQuantity:0,
    price:0,
    ordering:false,
    // orderHistory:[],
    orderId:null,
    address:[],
    mode:null,
    paymentAmount:0,
    savedCart:null
}
//order
export const orderAsync=createAsyncThunk('/cart/orderCart',async({form,cartData,token})=>{
    // console.log(form)
    // console.log(cartData)
    // console.log(token)
    const response=await orderCart(form,cartData,token)
    return response
})
export const removeCartAsync=createAsyncThunk('/cart/removeCart',async({id,token})=>{
    console.log(id)
    const response=await removeCart(id,token)
    return response
})

export const increaseQuantityAsync=createAsyncThunk('/cart/increase',async(Token,product)=>{
    console.log(Token)
    console.log(product)
    const response=await increaseQuantity(Token,product)
    return response;
})

//immmediate cart data when user singn in
export const cartAsync=createAsyncThunk('/cart/cart',async(Token)=>{
const response=await cart(Token)
return response
})
// update cart data in the backend
// export const updateCartAsync=createAsyncThunk('/cart/updateCart',async({item,token,type})=>{
//     const response=await updateCart(item,token,type)
//     return response
// })
export const updateCartAsync=createAsyncThunk('/cart/updateCart',async({item,totalQuantity,price,token})=>{
    const response=await updateCart(item,totalQuantity,price,token)
    return response
})
const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
// pushToCart(state,action){
//     state.items=action.payload.items
//     state.price=action.payload.price
//     state.totalQuantity=action.payload.totalQuantity
// },
setOrderIdNull(state,action){
    state.orderId=null
    state.mode=null
    state.paymentAmount=0
    state.savedCart=null
},
emptyCart(state,action){
    state.items=[]
    state.totalQuantity=0
    state.price=0
    state.ordering=false
    state.orderId=null
    state.address=[]
}

    },
    extraReducers:(builder)=>{
builder
.addCase(cartAsync.fulfilled,(state,action)=>{
    state.items=action.payload.items
    state.price=action.payload.price
    state.totalQuantity=action.payload.totalQuantity
    // state.orderHistory=action.payload.orderHistory
    state.address=action.payload.address
})

.addCase(updateCartAsync.fulfilled,(state,action)=>{
    state.items=action.payload.items
    state.price=action.payload.price
    state.totalQuantity=action.payload.totalQuantity
})
.addCase(orderAsync.pending,(state)=>{
    state.ordering=true
})
.addCase(orderAsync.fulfilled,(state,action)=>{
  state.ordering=false
  state.address=action.payload.address
   state.items=action.payload.items
   state.price=action.payload.price
   state.totalQuantity=action.payload.totalQuantity
   state.orderId=action.payload.orderId
   state.mode=action.payload.mode
   state.paymentAmount=action.payload.paymentAmount
   state.savedCart=action.payload.savedCart
})

.addCase(removeCartAsync.fulfilled,(state,action)=>{
    state.items=action.payload.items
    state.totalQuantity=action.payload.totalQuantity
    state.price=action.payload.price
})
    }
})

export const cartReducer=cartSlice.reducer
export const {pushToCart,emptyCart}=cartSlice.actions
export const cartProducts=(state)=>state.cart.items
export const price=(state)=>state.cart.price
export const totalQuantity=(state)=>state.cart.totalQuantity
export const ordering=(state)=>state.cart.ordering
export const cartOrderId=(state)=>state.cart.orderId
export const mode=(state)=>state.cart.mode
export const paymentAmount=(state)=>state.cart.paymentAmount
export const savedCart=(state)=>state.cart.savedCart
// export const cartOrderHistory=(state)=>state.cart.orderHistory
export const cartSavedAddress=(state)=>state.cart.address
export const {setOrderIdNull}=cartSlice.actions
