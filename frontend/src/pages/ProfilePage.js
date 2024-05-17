import React, { useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { token, updateUser, user } from '../features/auth/authSlice'
import Navbar from '../features/Navbar/Navbar';
import toast from 'react-hot-toast';
function ProfilePage() {
    const dispatch=useDispatch()
    const userDetails=useSelector(user)
    const userToken=useSelector(token)
    useEffect(()=>{
        // console.log('ifja hu')
        fetch(`https://render.com/docs/web-services#port-binding/api/v1/user/${userDetails._id}`,{
           headers:{ Authorization:`Bearer ${userToken}`}
        })
    .then((res)=>res.json()).then((data)=>{
        console.log(data)
       dispatch(updateUser(data.user))})
        .catch((err)=>console.log(err))
    },[])
 
//    console.log(userDetails)
 
    const deleteAddress=async (addressId)=>{
    //   console.log(addressId)
      try{
const response=await fetch(`https://render.com/docs/web-services#port-binding/api/v1/user/delete-address?addressId=${addressId}&userId=${userDetails?._id}`,{
    headers:{
        Authorization:`Bearer ${userToken}`
    },
method:'DELETE'
})
const data=await response.json()
console.log(data)
dispatch(updateUser(data.user))
if(data.success){
toast.success(data.message)
}
      }
      catch(err){
console.log(err)
      }
    }
    // console.log(user)
    return (
     <Navbar>
        <div>
          <div className="px-4 sm:px-0">
            <h3 className="mt-3 text-base font-semibold leading-7 text-gray-900">User Information</h3>
           
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetails?.email}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Role</dt>
               {userDetails&& <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetails?.role}</dd>}
              </div>
             {userDetails.role==='customer'&& <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Saved Address</dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                 {userDetails?.savedAddress.length===0 ? <p>No saved Address</p>: <ul role="list" className="divide-y divide-gray-100 ">
                  {userDetails?.savedAddress.map((item,index)=>
                       <li key={index}className="rounded-md border border-gray-200 flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                       <div className="flex w-0 flex-1 items-center">
                        
                         <div className="ml-4 flex  flex-col min-w-0 ">
                         <span className="truncate font-medium">{item.fullName}</span>
                         <span className="truncate font-medium">{item.email}</span>
                         <span className="truncate font-medium">{item.phone}  </span>
                           <span className="truncate font-medium">{item.streetAddress} ,{item.city} </span>
                           <span className="truncate font-medium">{item.state}-{item.pincode}</span>
                         </div>
                       </div>
                       <div className="ml-4 flex-shrink-0">
                       
                         <button onClick={(e)=>deleteAddress(item._id)}><MdDelete className='h-6 w-9'/></button>
                       </div>
                     </li>
                  )}
            
                  </ul>}
                </dd>
              </div>}
            </dl>
          </div>
        </div>
 </Navbar>
      )
}

export default ProfilePage
