import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSelectedProductDetailsAsync, filterOption, selectedProduct } from '../../ProductList/ProductListSlice'
import { useNavigate, useParams } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { token } from '../../auth/authSlice'
function EditProduct() {
    const dispatch=useDispatch()
    const userToken=useSelector(token)
    const navigate=useNavigate()
    const product=useSelector(selectedProduct)
    const {id}=useParams()
 const filterOptions=useSelector(filterOption)
 //undoDeleteProductHandler
 const undoDeleteProductHandler=async(e)=>{
  e.preventDefault()
  try{
const res=await fetch(`https://render.com/docs/web-services#port-binding/api/v1/admin/undo-delete-product/${id}`,{
  method:'DELETE',
  headers:{
    Authorization:`Bearer ${userToken}`
  }

})
const data= await res.json()
if(data.success){
  toast.success(data.message)
  navigate('/')
}
else{
  toast.error(data.message)
}
  }
  catch(err){
console.log(err)
  }
 }
 //DeleteProductHandler
 const deleteProductHandler=async(e)=>{
  e.preventDefault()
  try{
const res=await fetch(`https://render.com/docs/web-services#port-binding/api/v1/admin/delete-product/${id}`,{
  method:'DELETE',
  headers:{
    Authorization:`Bearer ${userToken}`
  }

})
const data= await res.json()
if(data.success){
  toast.success(data.message)
  navigate('/')
}
else{
  toast.error(data.message)
}
  }
  catch(err){
console.log(err)
  }
 }
    // const [totalImage,setTotalImage]=useState(0)
    // const product=useSelector(selectedProduct)
    const [disableButton,setDisableButton]=useState(false)
    const [formData,setFormData]=useState({
        brand:product.brand,
        category:product.category,
        description:product.description,
        discountPercentage:product.discountPercentage,
        price:product.price,
        rating:product.rating,
        stock:product.stock,
        thumbnail:product.thumbnail,
        title:product.title,
        image1:product?.images[0],
        image2:product?.images[1],
        image3:product?.images[2],
// images:[]
    })
   
//value change handler
const onChangeHandler=(e)=>{
   
        setFormData((prev)=>{
            return {...prev,[e.target.id]:e.target.value}
       
    })

}
//add new image
// const addNewImage=(e)=>{
//     e.preventDefault()
//     setTotalImage((prev)=>(prev+1))
//     console.log(totalImage)
// }
const submitFormHandler=async(e)=>{
  e.preventDefault()
  setDisableButton(true)
console.log(formData)
try{
  console.log(formData)
const response=await fetch(`https://render.com/docs/web-services#port-binding/api/v1/admin/edit-product/${id}`,{
  method:'PATCH',
  headers:{
    Authorization:`Bearer ${userToken}`,
    'Content-Type':'application/json'
  },
  body:JSON.stringify(formData)
})
const data=await response.json()
console.log(data)
if(data.success){
 toast.success(data.message)
 navigate('/')
}
else{
  toast.error(data.message)
}
setDisableButton(false)
}
catch(err){
  console.log(err)
}
}

    useEffect(()=>{
        dispatch(fetchSelectedProductDetailsAsync({id}))
    },[dispatch,id])
    // console.log(product)
  return (
    <div className=' mx-auto max-w-7xl   px-4 my-6   sm:px-6 lg:px-8'>
    <div className="pb-4 pt-2">
<form  onSubmit={submitFormHandler}className="rounded-lg bg-white px-4 py-2">
 <div className="mt-3 pb-6">
   <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product Details</h2>


   <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
     <div className="sm:col-span-3">
       <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
         Brand
       </label>
<select name='brand' id='brand' onChange={onChangeHandler}>
  <option value={formData.brand}defaultValue>{formData.brand}</option>
{filterOptions[1]?.options.map((item,index)=>(formData.brand!==item.value&&<option key={index} value={item.value}>{item.label}</option>))}
</select>
     </div>

     <div className="sm:col-span-3">
       <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
       Category
       </label>
       <select name='category' id='category' onChange={onChangeHandler}>
       <option value={formData.category} defaultValue>{formData.category}</option>
{filterOptions[0]?.options.map((item,index)=>(formData.category!==item.value&&<option key={index} value={item.value}>{item.label}</option>))}
</select>
     </div>

     <div className="sm:col-span-4">
       <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
       Description
       </label>
       <div className="mt-2">
         <textarea
         onChange={onChangeHandler}
          value={formData.description}
           id="description"
           name="description"
           type="description"
         
           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
         />
       </div>
     </div>

   

     <div className="col-span-full">
       <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
       Discount Percentage
       </label>
       <div className="mt-2">
         <input
         onChange={onChangeHandler}
          value={formData.discountPercentage}
           type="number"
           name="discountPercentage"
           id="discountPercentage"
        min="0"
        max="100"
        step="0.01"
           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
         />
       </div>
     </div>

     <div className="sm:col-span-2 sm:col-start-1">
       <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
         Price
       </label>
       <div className="mt-2">
         <input
         onChange={onChangeHandler}
           type="number"
           value={formData.price}
           name="price"
           id="price"
        min="0"
        
           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
         />
       </div>
     </div>

     <div className="sm:col-span-2">
       <label htmlFor="rating" className="block text-sm font-medium leading-6 text-gray-900">
      Rating
       </label>
       <div className="mt-2">
         <input
         onChange={onChangeHandler}
           type="number"
           value={formData.rating}
           name="rating"
           id="rating"
   min="1"
   max="5"
   step="0.01"
           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
         />
       </div>
     </div>

     <div className="sm:col-span-2">
       <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
     Stock
       </label>
       <div className="mt-2">
         <input
         onChange={onChangeHandler}
          value={formData.stock}
           type="number"
           name="stock"
           id="stock"
          min="1"
          
           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
         />
       </div>
     </div>
     <div className="sm:col-span-2">
       <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
       Thumbnail
       </label>
       <div className="mt-2">
         <input
         onChange={onChangeHandler}
          value={formData.thumbnail}
           type="text"
           name="thumbnail"
           id="thumbnail"
          
           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
         />
       </div>
     </div>
     <div className="sm:col-span-2">
       <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
   Title
       </label>
       <div className="mt-2">
         <input
         onChange={onChangeHandler}
          value={formData.title}
           type="text"
           name="title"
           id="title"
          
           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
         />
       </div>
     </div>
   </div>
 </div>

<div className="col-span-full">
       <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
       Image 1
       </label>
       <div className="mt-2">
         <input
         onChange={onChangeHandler}
          value={formData.image1}
           type="text"
           name="image1"
           id="image1"
           required
           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
         />
       </div>
     </div>
  <div className="col-span-full">
       <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
     Image 2
       </label>
       <div className="mt-2">
         <input
         onChange={onChangeHandler}
          value={formData.image2}
           type="text"
           name="image2"
           id="image2"
           required
           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
         />
       </div>
     </div>
    <div className="col-span-full">
       <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
       Image 3
       </label>
       <div className="mt-2">
         <input
         onChange={onChangeHandler}
          value={formData.image3}
           type="text"
           name="image3"
           id="image3"
        required
           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
         />
       </div>
     </div>


{!product.delete&&
<div className="flex  mt-8 items-center justify-end gap-x-6">
 <button onClick={(e)=>{navigate('/admin/product-list')}}type="button" className="text-sm font-semibold leading-6 text-gray-900">
   Cancel
 </button>
 <button
 disabled={disableButton}
   type="submit"
   className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
 >
   Save Changes
 </button>
  <button
onClick={deleteProductHandler}
   type="button"
   className="rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline "
 >
  Delete Product
 </button>
</div>}
{
  product.delete &&
  <div className="flex  mt-8 items-center justify-end ">
      <button
  onClick={undoDeleteProductHandler}
     type="button"
     className="rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800  "
   >
 Undo Delete
   </button>
  </div>

}
</form>
</div>
</div>
  )
}

export default EditProduct
