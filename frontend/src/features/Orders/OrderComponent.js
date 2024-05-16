import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { token } from '../auth/authSlice'
import { getAllCartHistoryAsync, isLoading, orders } from './OrdersSlice'
import OrderCom from './OrderCom'

function OrderComponent() {
    const userToken=useSelector(token)
    const loading=useSelector(isLoading)
    const orderHistory=useSelector(orders)
    const dispatch=useDispatch()
    useEffect(()=>{
        // console.log(token)
dispatch(getAllCartHistoryAsync({token:userToken}))
    },[])
  return (
    <>
    <OrderCom title='Order History'loading={loading} orderHistory={orderHistory}/>

    
</>
  )
}

export default OrderComponent
