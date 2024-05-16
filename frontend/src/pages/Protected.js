import React from 'react'
import { isAuthenticated, user } from '../features/auth/authSlice'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
function Protected({children}) {
const isLoggedIn=useSelector(isAuthenticated)

if(isLoggedIn){
    return children
}  
else{

 return   <Navigate to='/' ></Navigate>
}
}

export default Protected
