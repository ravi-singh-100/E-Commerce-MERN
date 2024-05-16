import React, { useEffect, useState } from 'react'
import Navbar from '../../features/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { token } from '../../features/auth/authSlice'
import AdminOrderCom from '../../features/Orders/AdminOrderCom'
import OrderCom from '../../features/Orders/OrderCom'
import { cancelledOrders, updateCancelledOrder } from '../../features/Orders/OrdersSlice'

function CancelledOrderPage() {
    const userToken=useSelector(token)
  const products=useSelector(cancelledOrders)
  const dispatch=useDispatch()
    const[isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
fetch('http://localhost:8000/api/v1/admin/orderType?status=cancelled',{
    headers:{
        Authorization:`Bearer ${userToken}`
    }
})
.then((res)=>res.json())
.then((response)=>{dispatch(updateCancelledOrder(response.data))})
setIsLoading(false)
    },[])
  return (
    
    <OrderCom title='Cancelled Orders' orderHistory={products} loading={isLoading}/>
  
  )
}

export default CancelledOrderPage
