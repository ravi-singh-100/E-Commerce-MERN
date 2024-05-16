import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { user } from '../../features/auth/authSlice'
import { Navigate } from 'react-router-dom'

function AdminProtected({children}) {
    const authUser=useSelector(user)
    if(!authUser){
        return <Navigate to='/login'></Navigate>
    }
if(authUser.role==='admin'){
    return children
}
else{
    return <Navigate to='/'></Navigate> 
}
}

export default AdminProtected
