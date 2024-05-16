import React, { useEffect, useState } from 'react'
import Navbar from '../../features/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { token } from '../../features/auth/authSlice'
import AdminOrderCom from '../../features/Orders/AdminOrderCom'
import { dispatchedOrders, updateDispatchedOrders } from '../../features/Orders/OrdersSlice'

function DispatchedOrdersPage() {
    const userToken=useSelector(token)
    const dispatch=useDispatch()
const products=useSelector(dispatchedOrders)
    const[isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
fetch('http://localhost:8000/api/v1/admin/orderType?status=dispatched',{
    headers:{
        Authorization:`Bearer ${userToken}`
    }
})
.then((res)=>res.json())
.then((response)=>{dispatch(updateDispatchedOrders(response.data))
})
setIsLoading(false)
    },[dispatch])
   
  return (

<AdminOrderCom title='Dispatch Orders'orderHistory={products} loading={isLoading}/>

  )
}

export default DispatchedOrdersPage
