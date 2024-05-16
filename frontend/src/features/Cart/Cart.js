import React from 'react'

import { Link } from 'react-router-dom'
import CartComponent from './CartComponent'
import { useSelector } from 'react-redux'
import { cartProducts, price} from './CartSlice'

import { useNavigate } from 'react-router-dom'



function Cart() {
  const navigate=useNavigate()
const products=useSelector(cartProducts)

const cartPrice=useSelector(price)

const checkOutHandler=()=>{
navigate('/checkout')
}
  return (
   
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="border-t border-gray-200 px-2 py-6 sm:px-6 
                 mt-12
                     bg-white">
                    <h2 className='text-3xl text-center'>Cart</h2>
                   {products.length===0 && <p className='text-center mt-4'>No Item in the cart</p>}

                      <CartComponent/>
                    </div>
               

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>Rs.{cartPrice}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-4 flex justify-center items-center">
              
                        <button   className={` rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm ${products.length===0?`bg-blue-500  opacity-50 cursor-not-allowed`:`bg-indigo-600  hover:bg-indigo-700`} `}
                         onClick={checkOutHandler} disabled={products.length===0}>
                        Checkout
                       </button>
                   
                    </div>
                    <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <Link to='/'>
                  <button  type="button" className='font-medium text-indigo-600 hover:text-indigo-500 px-1'>
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                  </Link>
                </p>
              </div>
                  </div>
                  </div>
                 
           
               
  )
}

export default Cart
