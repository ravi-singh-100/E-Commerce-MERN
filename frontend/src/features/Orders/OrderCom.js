import React from 'react'
import setStatusColor from '../../setStatusColor'


function OrderCom({loading,orderHistory,title}) {
  return (
<>
{loading && <div className='text-center my-3 py-3 font-bold text-lg'>Loading....</div>}
{!loading && orderHistory?.length===0 && <div className='text-center my-3 py-3 font-bold text-lg'> No order History</div>}
  {!loading&& orderHistory?.length>0&&  <div className="flow-root">
                      <h1 className='mt-2 font-bold text-xl text-center '>{title}</h1>
                      <ul role="list" className="my-2 divide-y divide-gray-200">
                          {orderHistory.map((i,index) => (
                                 <li key={index}role="list" className="mb-4  bg-white">
                                  <div className='flex justify-between py-2 bg-gray-400 font-bold text-l'>
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
                            <div><span className={`font-medium text-gray-900  text-lg`} >Status : </span><span className={`font-bold ${setStatusColor(i.status)}`}>{i.status}</span></div>
                            
                            <div><span className=' font-medium text-gray-900 text-lg '>Address : </span>{i.address.streetAddress} {i.address.city}, {i.address.state}-{i.address.pincode}</div>
                            <div><span className=' font-medium text-gray-900 text-lg '>Name : </span>{i.address.fullName}</div>
                            <div><span className=' font-medium text-gray-900 text-lg '>Email : </span>{i.address.email}</div>
                            <div><span className=' font-medium text-gray-900 text-lg '>Phone : </span>{i.address.phone}</div>
                            <div><span className=' font-medium text-gray-900 text-lg '>Payment Mode : </span>{i.paymentMode}</div>
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

export default OrderCom
