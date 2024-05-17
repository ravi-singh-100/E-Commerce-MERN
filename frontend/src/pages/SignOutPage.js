import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { signout, token, user } from '../features/auth/authSlice'
import { emptyAllOrders } from '../features/Orders/OrdersSlice'
function SignOutPage() {
    const userExsist=useSelector(user)
    const userToken=useSelector(token)
    const dispatch=useDispatch()
    useEffect(()=>{
      if(userExsist){
        fetch('https://render.com/docs/web-services#port-binding/api/v1/user/logout',{
          headers:{
            Authorization:`Bearer ${userToken}`
          }
        }).catch((err)=>console.log(err))
        dispatch(signout())
        dispatch(emptyAllOrders())
      }
    },[])
  return (
    <>
 {!userExsist && <Navigate to='/'></Navigate>}
 </>)
}

export default SignOutPage
