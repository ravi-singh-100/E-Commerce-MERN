import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams,useNavigate } from 'react-router-dom'
import {fetchSelectedProductDetailsAsync,selectedProduct, selectedProductLoading}from '../ProductListSlice'
import { cartProducts, increaseQuantityAsync, price, pushToCart, totalQuantity, updateCartAsync } from '../../Cart/CartSlice'
import { AddToCartLogic } from '../../Cart/AddToCartLogic'
import { isAuthenticated, token } from '../../auth/authSlice'


function ProductDetails() {
  const navigate=useNavigate()
  const product=useSelector(selectedProduct)
  const isLoading=useSelector(selectedProductLoading)
  const items=useSelector(cartProducts)
  const isAuth=useSelector(isAuthenticated)
  const cartPrice=useSelector(price)
  const cartTotalQuantity=useSelector(totalQuantity)
  const {id}=useParams()
  const usersToken=useSelector(token)
const dispatch=useDispatch()
//useEffect
useEffect(()=>{
  dispatch(fetchSelectedProductDetailsAsync({id}))
},[id,dispatch])

//add to bag handler
const addToBagHandler=(e)=>{
  console.log(isAuth)
  if(!isAuth){
    // console.log('yaha hu bro')
   return navigate('/sign-in')
  }
 const newItem= AddToCartLogic(items,product)

dispatch(updateCartAsync({item:newItem,totalQuantity:newItem.length,price:cartPrice+product.discountPrice,token:usersToken}))
// dispatch(increaseQuantityAsync({Token:token,product}))
}
  return (
    <div className="bg-white">
      {isLoading && <p>Loading...</p>}
      {!isLoading&&
      <div className="pt-6">
      <h2 className="text-center text-2xl font-bold">Product Information</h2>
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-3 aspect-w-2 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={product.images[0]}
           
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="aspect-h-3 aspect-w-2 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={product.images[1]}
           
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="aspect-h-3 aspect-w-2 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={product.images[2]}
           
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
          <div className='flex' >
            <p className="text-xl tracking-tight text-red-900 line-through">Rs. {product.price} </p>
            <p className="ml-3 text-xl tracking-tight text-green-900">Rs. {product.discountPrice} </p>
        
            </div>
            {/* add to cart button */}
            <div className='mt-2'>
              <span>Ratings : {product.rating}</span>
              </div>
            {isAuth &&  <button
              onClick={addToBagHandler}
                className="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to Cart
              </button>}
          </div>
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and description */}
            <div>

            <h3 className="font-bold text-gray-900">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
}
    </div>
 
  )
}

export default ProductDetails
