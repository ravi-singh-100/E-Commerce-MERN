import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

function ResetPassword() {
    const {id,token}=useParams()
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    const [confirmPassword,setConfirmPassword]=useState('')
    const paswordHandler=(e)=>{
setPassword(e.target.value)
    }
    const confirmPasswordHandler=(e)=>{
setConfirmPassword(e.target.value)
    }
    const submitFormHandler=async(e)=>{
e.preventDefault()
// console.log(password+" "+confirmPassword)
try{
    const response=await fetch(`http://localhost:8000/api/v1/user/reset-password/${id}/${token}`,{
        method:'POST',
        body:JSON.stringify({
            password:password,confirmPassword:confirmPassword
        }),
        headers:{
            'Content-Type':'application/json'
        }
    })
    const data=await response.json()
    console.log(data)
    if(data.success){
    toast.success(data.message)
    navigate('/sign-in')
    }
    else{
        
        toast.error(data.message)
    }
}
catch(err){
    console.log(err)
    toast.error(err.message)
}
    }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
             Reset Password
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={submitFormHandler} className="space-y-6" >
   
                
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>   
                  </div>
                  <div className="mt-2">
                    <input
                    value={password}
                    onChange={paswordHandler}
                      id="password"
                      name="password"
                      type="password"
              
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                      Confirm Password
                    </label>
             
                  </div>
                  <div className="mt-2">
                    <input
                    value={confirmPassword}
                    onChange={confirmPasswordHandler}
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
              
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
                   Submit
                  </button>
                </div>
              </form>
    
          
            </div>
          </div>
  )
}

export default ResetPassword
