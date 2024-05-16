import React, { useEffect, useState } from 'react'

import { IoIosArrowDropdownCircle } from "react-icons/io"
import { useDispatch } from 'react-redux'
import CartComponent from '../features/Cart/CartComponent'
import { cartAsync, cartOrderId, cartProducts, mode, price,totalQuantity } from '../features/Cart/CartSlice' 
import { cartSavedAddress } from '../features/Cart/CartSlice'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { orderAsync } from '../features/Cart/CartSlice'
import { ordering } from '../features/Cart/CartSlice'
import { token, user } from '../features/auth/authSlice'
import  Authenticates from './Authenticates'
import Navbar from '../features/Navbar/Navbar'
import {updateUser} from '../features/auth/authSlice'
function CheckoutPage() {

  // const address=useSelector(user)
  const dispatch=useDispatch()
  const [showSavedDetails,setShowDetails]=useState(false)
  const [selectedSavedAddress,setSelectedSavedAddress]=useState(null)
  const items=useSelector(cartProducts)
  const navigate=useNavigate()
  const userToken=useSelector(token)
const [change,setChange]=useState(false)
  const carttotalQuantity=useSelector(totalQuantity)
  const cartprice=useSelector(price)
  const orderId=useSelector(cartOrderId)
  const userDetails=useSelector(user)
  const address=userDetails.savedAddress
  const paymentMode=useSelector(mode)
  console.log(paymentMode)
  const [formData,setFormData]=useState({
    fullName:'',
    email:'',
    phone:'',
    streetAddress:'',
    city:'',
    state:'',
    pincode:'',

    modeOfPayment:''
  })

  const toggleHandler=()=>{
    setShowDetails((prev)=>(!prev))
  }
  //onChange Handler
const onChangeHandler=(e)=>{
 
  setFormData((prev)=>({
...prev,
[e.target.id]:e.target.value
  }))
 
}

const cartPrice=useSelector(price)
//const savedAddressChangeHandler=(e)=>{
const savedAddressChangeHandler=(e)=>{
  const index=e.target.value
  console.log(index)
  setFormData((prev)=>{return {
    ...prev,
    fullName:address[index].fullName,
    email:address[index].email,
    phone:address[index].phone,
    streetAddress:address[index].streetAddress,
    city:address[index].city,
    state:address[index].state,
    pincode:address[index].pincode,


  }})
}
//submit Form Handler
const submitFormHandler=async(e)=>{
  e.preventDefault()
  // console.log(formData)
  dispatch(orderAsync({form:formData,cartData:{items,totalQuantity:carttotalQuantity,price:cartPrice},token:userToken}))
  setFormData({
    fullName:'',
    email:'',
    phone:'',
    streetAddress:'',
    city:'',
    state:'',
    pincode:'',

    modeOfPayment:''
  })
// setChange((prev)=>!prev)

}
useEffect(()=>{
  console.log('hit hua')
  // console.log('ifja hu')
  fetch(`http://localhost:8000/api/v1/user/${userDetails._id}`,{
     headers:{ Authorization:`Bearer ${userToken}`}
  })
.then((res)=>res.json()).then((data)=>{
  console.log(data)
 dispatch(updateUser(data.user))})
  .catch((err)=>console.log(err))
},[])
  return (
  <Navbar>
  {items.length===0&&<Navigate to='/'></Navigate>}
  {orderId&& paymentMode==='cash'&& <Navigate to={`/order-success/${orderId}`} ></Navigate>}
  {orderId&&paymentMode==='online'&&<Navigate to='/stripe/payment'></Navigate>}
    <div className=" mx-auto max-w-7xl   px-4 my-6 mb-4  sm:px-6 lg:px-8">
  
    <div className="pb-4 pt-2">
        
    <h2 className="text-lg font-semibold leading-7 text-gray-900">Personal Information</h2>
    <p className="mt-1 text-sm  mb-2 leading-6 text-gray-600">Use a permanent address where you can receive order.</p>
  
      <CartComponent />
      <div className=" border-gray-200 px-4 py-6 sm:px-6">
      <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>Rs.{cartPrice}</p>
                    </div>
                    </div>
  
    
   <form onSubmit={submitFormHandler} className='rounded-lg bg-white px-4 py-2'>
              {showSavedDetails &&address.length>0&&  <>    <ul role="list" className="divide-y divide-gray-100">
      {address.map((item,index) => (
        <li key={index} className="flex justify-between gap-x-6 py-4">
          <div className="flex items-center min-w-0 gap-x-4">
          <input
       required
                    id={index}
                    name="savedAddress"
                 value={index}
                 onChange={savedAddressChangeHandler}
                
                    type="radio"
                    className="h-4 w-4  border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                   <label htmlFor={index}className="block text-sm font-medium leading-6 text-gray-900">       
            <div className="min-w-0 flex-auto"> 
              <p className="text-sm font-semibold leading-6 text-gray-900">{item.fullName} </p>
             
             <p>Email : {item.email}</p>
              <span>Address : {item.streetAddress}, {item.city}, {item.state}, {item.pincode}</span>
         <p>Phone : {item.phone}</p>
          </div> 
          </label>
         </div>   
        
        </li>
    
      ))}
    </ul>
    <div className="flex items-center">
      <p className="mt-2 block text-sm font-medium leading-6 text-gray-900"> Fill New Details </p>
    <span  className='cursor-pointer mt-2 ml-2'onClick={toggleHandler}><IoIosArrowDropdownCircle /></span>
    </div>
    </> }
   {!showSavedDetails&& <>
    {address.length>0&&  <div className="flex items-center">
    <p className="mt-2 block text-sm font-medium leading-6 text-gray-900">Select from Exsisting Address</p>
    <span className='cursor-pointer mt-2 ml-2' onClick={toggleHandler}><IoIosArrowDropdownCircle /></span>
    </div>}
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="sm:col-span-3">
        <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
         Full Name
        </label>
        <div className="mt-2">
          <input
          required
        
          onChange={onChangeHandler}
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            autoComplete="given-name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

    

      <div className="sm:col-span-4">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <div className="mt-2">
          <input
          onChange={onChangeHandler}
          value={formData.email}
          
           required
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-4">
        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
        Phone Number
        </label>
        <div className="mt-2">
          <input
          onChange={onChangeHandler}
          value={formData.phone}
          
           required
            id="phone"
            name="phone"
            type='text'
            autoComplete="phone"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      </div>

      <div className="col-span-full">
        <label htmlFor="streetAddress" className="block text-sm font-medium leading-6 text-gray-900">
          Street address
        </label>
        <div className="mt-2">
          <input
           required
           onChange={onChangeHandler}
           value={formData.streetAddress}
            type="text"
            name="streetAddress"
            id="streetAddress"
            autoComplete="streetAddress"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-2 sm:col-start-1">
        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
          City
        </label>
        <div className="mt-2">
          <input
           required
           value={formData.city}
           onChange={onChangeHandler}
            type="text"
            name="city"
            id="city"
            autoComplete="address-level2"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
          State / Province
        </label>
        <div className="mt-2">
          <input
           required
           value={formData.state}
           onChange={onChangeHandler}
            type="text"
            name="state"
            id="state"
            autoComplete="address-level1"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="pincode" className="block text-sm font-medium leading-6 text-gray-900">
          ZIP / Pincode
        </label>
        <div className="mt-2">
          <input
         
          onChange={onChangeHandler}
          value={formData.pincode}
           required
            type="text"
            name="pincode"
            id="pincode"
            autoComplete="pincode"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
</>}
{/* address */}

    {/* Payment */}
    <p className="mt-2 block text-sm font-medium leading-6 text-gray-900">Select Payment Method</p>
    <div className="mt-3 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                  onChange={onChangeHandler}
                    id="modeOfPayment"
                    value='cash'
                    required
                    checked={formData.modeOfPayment==='cash'}
                    name="money"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="modeOfPayment" className="block text-sm font-medium leading-6 text-gray-900">
                    Cash on Delivery
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                  onChange={onChangeHandler}
                   required
                   id="modeOfPayment"
                    value='online'
                    name="money"
                    checked={formData.modeOfPayment==='online'}
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="modeOfPayment" className="block text-sm font-medium leading-6 text-gray-900">
               Online
                  </label>
                </div>
                </div>

    
    <div className='flex justify-center pt-5'>
  <button className="text-white bg-blue-700 hover:bg-blue-800  font-xl rounded-lg text-sm px-10 py-2.5 me-2 mb-2 ">Order</button>
  </div>
  </form>

  </div>
 
 </div>
 </Navbar>
  )
}

export default CheckoutPage
