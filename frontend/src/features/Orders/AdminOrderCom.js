import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { token } from '../auth/authSlice'
import setStatusColor from '../../setStatusColor'
import { useLocation } from 'react-router-dom'
import { updateBoth, updateOrder } from './OrdersSlice'
function AdminOrderCom({loading,orderHistory,title}) {
  const location=useLocation()
  // console.log(location.pathname)
  const [status,setStatus]=useState('')
    const [id,setId]=useState(-1)
    const dispatch=useDispatch()
    const userToken=useSelector(token)
    const onChangeHandler=(e)=>{
      // if(e.target.value!==''){
        setStatus(e.target.value)
      // }
       
    }
    const changeStatusHandler=async(id,e)=>{
      
        e.preventDefault()
        // if(status==='') {return;}
try{
const response=await fetch('http://localhost:8000/api/v1/admin/change-status',{
    method:'POST',
    headers:{
        Authorization:`Bearer ${userToken}`,
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        id,status
    })
})
const data=await response.json()
if(data.success){
    toast.success(data.message)
dispatch(updateBoth({orders:data.orders,dispatchedOrders:data.dispatchedOrders}))
    setId(-1)
}
else{
    toast.error(data.message)
  setId(-1)
}
setStatus('')
}
catch(err){
    console.log(err)
}
    }
   
  return (
    <>
    {loading && <div className='text-center my-3 py-3 font-bold text-lg'>Loading....</div>}
    {!loading && orderHistory?.length===0 && <div className='text-center my-3 py-3 font-bold text-lg'> No order History</div>}
      {!loading&& orderHistory?.length>0&&  <div className="flow-root">
                          <h1 className='mt-2 font-bold text-xl text-center '>{title}</h1>
                          <ul role="list" className="my-2 divide-y divide-gray-200">
                              {orderHistory.map((i,index) => (
                                     <li key={i._id}role="list" className="mb-4  bg-white">
                                      <div className='flex flex-wrap justify-between py-2 bg-gray-400 font-bold text-l'>
                                      <div >OrderId : #{i._id}</div>
                                      <div className='mr-3'>Date: {i.createdAt.split('T')[0]} </div>
                                      </div>
                            {i.items.map((product,index)=> 
                             (  <div key={index} className="flex py-6 px-6 ">
                           
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.imageSrc}
                                  
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
                              
                      
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          {product.name}
                                        </h3>
                                        {/* <p className="ml-4">{product.quantity} X {product.price}</p> */}
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">Rs.{product.price}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className='flex space x-2'>
       <p className="text-gray-500">Qty {product.quantity}</p>
                                 
                                   </div>  
    
                                    </div>
                                  </div>
                                </div>))}
                                <div className=' border-y-2'>
                                <div className='text-right my-1 mr-4 text-xl font-medium text-gray-900'><span className=' '>Total : Rs.</span>{i.price}</div>
                                
                                <div className="flex pb-6 px-6 flex-col " >
                              {id!==index &&  <div><span className=' font-medium text-gray-900 text-lg ' >Status : </span><span className={`font-bold ${setStatusColor(i.status)}`}>{i.status}</span></div>}
                             { id===index           &&        <form onSubmit={(e)=>changeStatusHandler(i._id,e)}>
               <label className=' font-medium text-gray-900 text-lg ' htmlFor='status'>Status : </label>  
<select  name='status' id="status" onChange={onChangeHandler}>
    <option value='' defaultValue>--Select Option--</option>
<option value='ordered'>ordered</option>
<option value='dispatched'>dispatched</option>
<option value='delivered' >delivered</option>
<option value='cancelled' >cancelled</option>
</select>
<div className='flex mt-2 text-center'>

<button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-2 ml-2 py-1.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 ">Save Changes</button>


<button onClick={(e)=>setId(-1)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm  px-2 ml-2 py-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 ">Cancel</button>

</div>
                                    </form> 
                                 }
                                <div><span className=' font-medium text-gray-900 text-lg '>Address : </span>{i.address.streetAddress} {i.address.city}, {i.address.state}-{i.address.pincode}</div>
                                <div><span className=' font-medium text-gray-900 text-lg '>Name : </span>{i.address.fullName}</div>
                                <div><span className=' font-medium text-gray-900 text-lg '>Email : </span>{i.address.email}</div>
                                <div><span className=' font-medium text-gray-900 text-lg '>Phone : </span>{i.address.phone}</div>
                             {id!==index &&  <div className='mt-4'><button type="button" className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none " onClick={()=>{setId(index)}}>Change Status</button></div> }
                           
                                </div>
                                </div>
                                </li>
                         
                              )
                            
                              )}
                            </ul>
                          </div>}
    </>
  )
}

export default AdminOrderCom
