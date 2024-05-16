import React from 'react'
import { isAuthenticated } from '../features/auth/authSlice'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
function Authenticates({children}) {
    const isLoggedIn=useSelector(isAuthenticated)
    if(!isLoggedIn){
        return children
    }  
    else{
      return   <Navigate to='/'></Navigate>
    }
  
}

export default Authenticates
