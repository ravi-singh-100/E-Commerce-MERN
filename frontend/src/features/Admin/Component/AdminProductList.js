import React, { useEffect ,useState} from 'react'
import { StarIcon} from '@heroicons/react/20/solid'
import { Fragment, } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { Link, useNavigate } from 'react-router-dom'
// import Pagination from './Pagination'
import {allProducts,currentState,sortOption,filterOption} from '../../ProductList/ProductListSlice'
import { useDispatch, useSelector } from 'react-redux'
import {fetchAllProductsByFilterAsync,fetchFilterOptionsAsync,fetchSortOptionsAsync} from '../../ProductList/ProductListSlice'


function AdminProductList() {
  const navigate=useNavigate()
  //add new product
  const addNewProductHandler=()=>{
    navigate('/admin/add-new-product')
  }
  //edit product
  const editProductHandler=(e,product)=>{
navigate(`/admin/edit-product/${product._id}`)
  }
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const dispatch=useDispatch()
    const[filter,setFilter]=useState({})
    const [sort,setSort]=useState({})
    // const[pageNumber,setPageNumber]=useState(1)
    // const limit=10
    const sortOptions=useSelector(sortOption)
    const filters=useSelector(filterOption)
    const products=useSelector(allProducts)
  // const totalItems=products.length
  const loadingState=useSelector(currentState)
  
    //paginationHandler
  //   const paginationHandler=(page)=>{
  //     console.log(page)
  // setPageNumber(page)
  //   }
    //filterHandler
    const addFilterHandler=(e,section)=>{
      const newFilter={...filter}
    if(e.target.checked){
      if(newFilter[section._id]){
     newFilter[section._id].push(e.target.value)
      }else{
        newFilter[section._id]=[]
        newFilter[section._id].push(e.target.value)
      }
    }else{
      const index=newFilter[section._id].findIndex(ele=>ele===e.target.value)
    newFilter[section._id].splice(index,1)
    }
    setFilter(newFilter)
  
       console.log(newFilter)
    }
    //sortHandler
    const sortHandler=(e,options)=>{
      const newSort={_sort:options.sort}
    setSort(newSort)
      console.log(newSort)
    }
    //fetch all the products
    useEffect(()=>{
      // const pagination={_page:pageNumber,_limit:limit}
      dispatch(fetchFilterOptionsAsync())
      dispatch(fetchSortOptionsAsync())
      dispatch(fetchAllProductsByFilterAsync({filter,sort,isAdmin:true}))
    },[dispatch,filter,sort])
  
    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }
    
  
        return (
  
          <div className="bg-white">
          <div>
            {/* Mobile filter dialog */}
       
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
  
        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
  
              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
        
  
                {filters.map((section) => (
                  <Disclosure as="div" key={section._id} className="border-t border-gray-200 px-4 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.title}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-mobile-${section._id}-${optionIdx}`}
                                  title={`${section._id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  onChange={e=>addFilterHandler(e,section)}
                                  defaultChecked={option.checked}
            
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section._id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>
    
                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
    
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.title}>
                              {({ active }) => (
                                <p
                               onClick={(e)=>sortHandler(e,option)}
                                  className={classNames(
                                    option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  {option.title}
                                </p>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
{/*     
                  <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                  </button> */}
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
    
              <section aria-labelledby="products-heading" className="pb-24 pt-6">
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>
    
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}
                  <form className="hidden lg:block">
          
    
                    {filters.map((section) => (
                      <Disclosure as="div" key={section._id} className="border-b border-gray-200 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.title}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-${section._id}-${optionIdx}`}
                                      title={`${section._id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      onChange={e=>addFilterHandler(e,section)}
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-${section._id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
    
                  {/* Product grid */}
               {loadingState==='loading'?<p>Loading..</p>:   
               <div className="lg:col-span-3">
                <div>
                <button onClick={addNewProductHandler}className="rounded-xl bg-green-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200">
  Add New Product
</button>
                </div>
                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                       {products.map((product,index) => (
                        <div key={product._id}>
         <Link to={`/product-detail/${product._id}`} >  <div  className="group relative border-2 p-4">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.thumbnail}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {/* <a href='#'> */}
                      <span aria-hidden="true" className=" absolute inset-0" />
                      {product.title}
                    {/* </a> */}
                  </h3>
                  {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                </div>
                <p className="text-sm font-medium text-gray-800">Rs. {product.price}</p>
                
              </div>
              {/* <p className="pt-2 text-sm">{product.description}</p> */}
              <div className='flex items-center mt-1'>
              <span className='text-xs font-medium'>Ratings : </span>  
              <StarIcon className='ml-2 w-3 h-3 text-center'></StarIcon>
           <span className='ml-2 text-xs font-medium'>{product.rating}</span></div>
      {product.delete &&     <div ><span className='text-sm font-medium text-red-500'>Deleted Product</span></div>}
            </div>
       
            </Link> 
           <div className='mt-3'> 
            <button onClick={(e)=>editProductHandler(e,product)} className="rounded-xl bg-blue-500 px-3 py-1 text-base font-medium text-white transition duration-200 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-400 dark:text-white dark:hover:bg-blue-300 dark:active:bg-blue-200">
  Edit
</button>
</div>
            </div>
            
          ))}
               </div>  
                </div>
  }
                </div>
              </section>
            </main>
          </div>
        {/* Pagination */}
     {/* <Pagination pageNumber={pageNumber} paginationHandler={paginationHandler} setPageNumber={setPageNumber} totalItems={totalItems} limit={limit}/> */}
        </div>
  
  
  
  
  
  
  
    )
}

export default AdminProductList
