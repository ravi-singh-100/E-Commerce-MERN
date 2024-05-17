import React, { useState } from 'react'
import logo from '../../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch,useSelector } from 'react-redux'
import { signin } from '../authSlice'
import { token } from '../authSlice'
import { cartAsync } from '../../Cart/CartSlice'
function Login() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const Token=useSelector(token)
  const[formData,setFormData]=useState({
    email:'',
    password:''
  })
  //change form handler
  const changeFormHandler=(e)=>{
    e.preventDefault()
setFormData((prev)=>{
  return {...prev,[e.target.id]:e.target.value}
})
  }
  //submit form handler
  const submitFormHandler=async(e)=>{
    e.preventDefault()
    try{
const response=await fetch ('https://render.com/docs/web-services#port-binding/api/v1/user/sign-in',{
method:'POST',
body:JSON.stringify(formData),
headers:{
  'Content-Type':'application/json'
}
})
const data=await response.json()
// console.log(data)
if(data.success){
  toast.success(data.message)
  dispatch(signin({user:data.user,token:data.Token}))


  dispatch(cartAsync(data.Token))
  navigate('/')
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
              <img
                className="mx-auto h-20 w-auto"
                src={logo}
              
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={submitFormHandler} className="space-y-6" >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                    value={formData.email}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      onChange={changeFormHandler}
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
                    <div className="text-sm">
                      <Link to='/forgot-password' className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                    value={formData.password}
                    onChange={changeFormHandler}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
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
                    Sign in
                  </button>
                </div>
              </form>
    
              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <Link to="/sign-up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Create Account
                </Link>
              </p> 
            </div>
          </div>
      )
}

export default Login
