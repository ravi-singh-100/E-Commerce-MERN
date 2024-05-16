import React, { useEffect, useState } from 'react'
import logo from '../../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import{toast} from 'react-hot-toast'
import OtpVerification from './OtpVerification'
function Signup() {
  // const [disableButton,setDisableButton]=useState(false)
  const navigate=useNavigate()
  const[showOTPComponent,setShowOTPComponent]=useState(false)
  const [formData,setFormData]=useState({
email:'',
password:'',
confirmPassword:'',
otp:''
  })
  //onchange handler
  const formChangeHandler=(event)=>{
    event.preventDefault()
    // console.log(formData)
   setFormData((prev)=>{
        return {...prev ,[event.target.id]:event.target.value}
        }) 
  }
  //
  const showOTPContentHandler=async(e)=>{
    e.preventDefault()
    try{
    const response=await fetch('http://localhost:8000/api/v1/admin/send-otp',{
      method:'POST',
      body:JSON.stringify(formData),
      headers:{
'Content-Type':'application/json'
      }
    })
    const data=await response.json()
    console.log(data)
    if(data.success){
toast.success(data.message)
setShowOTPComponent(true)
    }
    else{
     setShowOTPComponent(false)
toast.error(data.message)
    }
    }
    catch(err){
console.log(err)
    }
  }
  //form submit handler
  const submitFormHandler=async(e)=>{
e.preventDefault()
// console.log(formData)
try{
  const response=await fetch('http://localhost:8000/api/v1/user/sign-up',{
    method:'POST',
    body:JSON.stringify(formData),
    headers:{
        'Content-Type':'application/json'
    }

})
const data=await response.json()

if(data.success){
  console.log(data)
toast.success(data.message)
navigate('/sign-in')
}
else{
toast.error(data.message)
}
}
catch(err){
console.log(err)
}
// setFormData(()=>{
//   return {email:'',password:'',confirmPassword:''}
// })
}
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
  {!showOTPComponent &&  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-20 w-auto"
        src={logo}
      
        alt="Your Company"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign Up
      </h2>
    </div>}

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={submitFormHandler}>
      { !showOTPComponent&&
      <div>
       <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
            onChange={formChangeHandler}
              id="email"
              name="email"
              type="email"
              value={formData.email}
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
       
          </div>
          <div className="mt-2">
            <input
                 onChange={formChangeHandler}
              id="password"
              name="password"
              type="password"
        value={formData.password}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
<div>
<label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
           Confirm Password
          </label>
          <div className="mt-2">
            <input
                 onChange={formChangeHandler}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
        value={formData.confirmPassword}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div> 
</div> 
<button
        onClick={showOTPContentHandler}
        type="button"

        className="mt-5 cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
       Next
      </button></div>
}
{
  showOTPComponent && <>
  <OtpVerification email={formData.email} formChangeHandler={formChangeHandler} formData={formData}/>



  <div>
          <button
        
            type="submit"
            className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Up
          </button>
        </div>
        </>}
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
       Already a member?{' '}
        <Link to="/sign-in" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
         Login
        </Link>
      </p> 
    </div>
  </div>
  )
}

export default Signup
