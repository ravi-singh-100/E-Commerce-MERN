import React from 'react'
import { isAuthenticated, user } from '../features/auth/authSlice'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function OnlyCustomer({children}) {
    const isLoggedIn=useSelector(isAuthenticated)
    const userDetails=useSelector(user)
    if(isLoggedIn&&userDetails.role==='customer'){
        return children
    }  
    else{
    
     return   <Navigate to='/' ></Navigate>
    }
}

export default OnlyCustomer
