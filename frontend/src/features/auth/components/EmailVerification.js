import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
function EmailVerification() {
    const [email,setEmail]=useState('')
    const navigate=useNavigate()
    const changeFormHandler=(e)=>{
        setEmail(e.target.value)
        
            }
            const sendOTPHandler=async (e)=>{
                e.preventDefault()
             try{
        const response=await fetch('http://localhost:8000/api/v1/user/email-verification',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email})
        })
        const data=await response.json()
        if(data.success){
            toast.success(data.message)
            setEmail('')
       navigate('/')
        }
        else{
            toast.error(data.message)
        }
             }
             catch(err){
        console.log(err)
             }
            }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">

      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Email Verfication
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={sendOTPHandler} className="space-y-6" >
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
          
              id="email"
              name="email"
              type="email"
              value={email}
              autoComplete="email"
              onChange={changeFormHandler}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>



        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
           Send OTP
          </button>
        </div>
      </form>
      <p className="mt-5 text-center text-sm text-gray-500">
       Back to Login ?{' '}
        <Link to="/sign-in" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
         Login
        </Link>
      </p> 
     
    </div>
  </div>
  )
}

export default EmailVerification
