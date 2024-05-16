import React, { useEffect, useState } from 'react'
import Navbar from '../../features/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { token } from '../../features/auth/authSlice'
import AdminOrderCom from '../../features/Orders/AdminOrderCom'
import { orders, updateOrder } from '../../features/Orders/OrdersSlice'
import { useNavigate } from 'react-router-dom'



function AllOrdersPage() {
  
    const userToken=useSelector(token)
    // const [products,setProducts]=useState([])
    const products=useSelector(orders)
    const dispatch=useDispatch()
    const[isLoading,setIsLoading]=useState(true)
    const navigate=useNavigate()
    useEffect(()=>{
fetch('http://localhost:8000/api/v1/admin/all-orders',{
    headers:{
        Authorization:`Bearer ${userToken}`
    }
})
.then((res)=>res.json())
.then((response)=>{dispatch(updateOrder(response.data))})
setIsLoading(false)
    },[])

  return (
 

  <>   
<AdminOrderCom title='All Orders' orderHistory={products} loading={isLoading} />
</> 
  )
}

export default AllOrdersPage
