import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useDispatch,useSelector } from 'react-redux'
import { token } from '../../auth/authSlice'
import { filterOption } from '../../ProductList/ProductListSlice'
function AddNewProduct() {
  const dispatch=useDispatch()
  const userToken=useSelector(token)
  const navigate=useNavigate()
  const [disableButton,setDisableButton]=useState(false)
const filterOptions=useSelector(filterOption)

    const [formData,setFormData]=useState({
        brand:'',
        category:'',
        description:'',
        discountPercentage:'',
        price:'',
        rating:'',
        stock:'',
        thumbnail:'',
        title:'',
        image1:'',
        image2:'',
        image3:'',
      

    })
    //submit form
    const sbmitFormHandler=async(e)=>{
      e.preventDefault()
      try{
        // console.log(formData)
      const response=await fetch(`http://localhost:8000/api/v1/admin/add-new-product`,{
        method:'POST',
        headers:{
          Authorization:`Bearer ${userToken}`,
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data=await response.json()
      // console.log(data)
      if(data.success){
       toast.success(data.message)
       navigate('/admin/product-list')
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
    const onChangeHandler=(e)=>{
   
        setFormData((prev)=>{
            return {...prev,[e.target.id]:e.target.value}
       
    })

}
  return (
    <div className=' mx-auto max-w-7xl   px-4 my-6   sm:px-6 lg:px-8'>
         <div className="pb-4 pt-2">
    <form onSubmit={sbmitFormHandler} className="rounded-lg bg-white px-4 py-2">
      <div className="mt-3 pb-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product Details</h2>
     

        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
              Brand
            </label>
 <select name='brand' id='brand' onChange={onChangeHandler}>
 <option value='' defaultValue>--Choose Option--</option>
 {filterOptions[1]?.options.map((item,index)=><option value={item.value} key={index}>{item.label}</option>) }
 </select>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
            Category
            </label>
     <select name='category' id='category' onChange={onChangeHandler}>
      <option value='' defaultValue>--Choose Option--</option>
    {filterOptions[0]?.options.map((item,index)=><option key={index} value={item.value}>{item.label}</option>)}
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
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
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
              min="0"
              onChange={onChangeHandler}
                type="number"
                name="price"
                id="price"
                value={formData.price}
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
                name="rating"
                id="rating"
                value={formData.rating}
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
                type="number"
                name="stock"
                id="stock"
                value={formData.stock}
               min="1"
               onChange={onChangeHandler}
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
                type="text"
                name="thumbnail"
                id="thumbnail"
                value={formData.thumbnail}
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
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={onChangeHandler}
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
    
    {/* </div> */}

    <div className="flex mt-8 items-center justify-end gap-x-6">
      <button onClick={(e)=>{navigate('/admin/product-list')}}type="button" className="text-sm font-semibold leading-6 text-gray-900">
        Cancel
      </button>
      <button
      disabled={disableButton}
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save
      </button>
    </div>
  </form>
  </div>
  </div>
  )
}

export default AddNewProduct
