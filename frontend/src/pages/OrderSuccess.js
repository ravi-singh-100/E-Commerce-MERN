import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartOrderId } from '../features/Cart/CartSlice'
import { setOrderIdNull } from '../features/Cart/CartSlice'
import { Navigate, useParams } from 'react-router-dom'
function OrderSuccess() {
  const orderId=useSelector(cartOrderId)
  const dispatch=useDispatch()
  const {id}=useParams()
  const moveToHome=()=>{
   dispatch(setOrderIdNull())
  }
  return (
    <>
    {!orderId&&<Navigate to='/'></Navigate>}
    {orderId &&
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight text-green-600 lg:text-9xl">Success</h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">Your Order placed Successfully</p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Order-Id : {id}</p>
         <p onClick={moveToHome} className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400 cursor-pointer">Go to Home Page</p>
        </div>
      </div>
    </section>}
            </>
  )
}

export default OrderSuccess
