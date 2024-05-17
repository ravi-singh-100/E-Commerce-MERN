import React, { useEffect, useState } from 'react'
import Navbar from '../../features/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { token } from '../../features/auth/authSlice'
import AdminOrderCom from '../../features/Orders/AdminOrderCom'
import OrderCom from '../../features/Orders/OrderCom'
import { deliveredOrders, updateDeliveredOrders } from '../../features/Orders/OrdersSlice'

function DeliveredOrdersPage() {
    const userToken=useSelector(token)
  const products=useSelector(deliveredOrders)
  const dispatch=useDispatch()
    const[isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
fetch('https://render.com/docs/web-services#port-binding/api/v1/admin/orderType?status=delivered',{
    headers:{
        Authorization:`Bearer ${userToken}`
    }
})
.then((res)=>res.json())
.then((response)=>{dispatch(updateDeliveredOrders(response.data))})
setIsLoading(false)
    },[])
  return (

<OrderCom title='Delivered Orders' orderHistory={products} loading={isLoading}/>

  )
}

export default DeliveredOrdersPage
