import React, { useEffect, useState } from 'react'
import Navbar from '../../features/Navbar/Navbar'
import { useSelector } from 'react-redux'
import { token } from '../../features/auth/authSlice'
import AdminOrderCom from '../../features/Orders/AdminOrderCom'

function RemaingOrdersPage() {
    const userToken=useSelector(token)
    const [products,setProducts]=useState([])
    const[isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
fetch('http://localhost:8000/api/v1/admin/orderType?status=ordered',{
    headers:{
        Authorization:`Bearer ${userToken}`
    }
})
.then((res)=>res.json())
.then((response)=>{setProducts(response.data)}).catch((err)=>console.log(err))
setIsLoading(false)
    },[])
  return (

<AdminOrderCom title='Remaining Orders'orderHistory={products} loading={isLoading}/>

  )
}

export default RemaingOrdersPage
