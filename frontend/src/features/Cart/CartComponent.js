import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { cartProducts, price, pushToCart, totalQuantity, updateCartAsync ,removeCartAsync} from './CartSlice'
import { AddToCartLogic ,decreaseFromCart, removeAllItems} from './AddToCartLogic'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated, token } from '../auth/authSlice'
// import { removeCartAsync } from './CartAPI'
function CartComponent() {
  const navigate=useNavigate()
  const products=useSelector(cartProducts)
  const userToken=useSelector(token)
  const cartPrice=useSelector(price)
  const cartTotalQuantity=useSelector(totalQuantity)
  const isAuth=useSelector(isAuthenticated)
  const dispatch=useDispatch()
  const increaseQuantityHandler=(product)=>{

    if(!isAuth){
      navigate('/sign-in')
    }
    // add to cart logic
  const newItem=AddToCartLogic(products,product)
  dispatch(updateCartAsync({item:newItem,totalQuantity:newItem.length,price:cartPrice+product.price,token:userToken}))
  
  }
  //remove one item from cart
  const decreaseQuantityHandler=(product)=>{
    if(!isAuth){
      navigate('/sign-in')
    }
  const newItem=decreaseFromCart(products,product)
  
  
  dispatch(updateCartAsync({item:newItem,totalQuantity:newItem.length,price:cartPrice-product.price,token:userToken}))
  }
  //remove all item from cart
  const removeAllItemsHandler=(product)=>{
    if(!isAuth){
      navigate('/sign-in')
    }
  const {items:itItems,itsQuantity,itsPrice}=removeAllItems(products,product)
  dispatch(updateCartAsync({item:itItems,totalQuantity:itItems.length,price:cartPrice-itsPrice,token:userToken}))
//   console.log(product._id)
// dispatch(removeCartAsync({id:product._id,token:userToken}))
  }
  //checkout Handler

  return (
    <div className="flow-root">
                      
    <ul role="list" className="my-2 divide-y divide-gray-200">
        {products?.length>0&&products.map((product,index) => (
          <li key={index} className="flex py-6 px-6 bg-white">
      <Link to={`/product-detail/${product._id}`}>     <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src={product.imageSrc}
            
                className="h-full w-full object-cover object-center"
              />
            </div></Link> 

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    {product.name}
                  </h3>
                  <p className="ml-4">{product.quantity} X {product.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">Rs.{product.price}</p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <div className='flex space x-2'>
             <span className="cursor-pointer mr-1"onClick={()=>decreaseQuantityHandler(product)} >-</span>   <p className="text-gray-500">Qty {product.quantity}</p>
             <span className="cursor-pointer"onClick={()=>increaseQuantityHandler(product)}>+</span> 
             </div>  
             
                <div className="flex">
                  <button
                    type="button"
                    onClick={()=>removeAllItemsHandler(product)}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
               
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CartComponent
