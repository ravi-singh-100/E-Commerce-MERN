import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { emptyCart, totalQuantity } from '../Cart/CartSlice'
import { isAuthenticated ,signout,user} from '../auth/authSlice'

const navigation=[  { name: 'Home', href: '/', customer: true,admin:true },
{
  name:'Admin' ,href:'/admin/product-list',admin:true,customer:false
},
{name:'Orders', href:'/admin/orders',admin:true,customer:false},
// {
//   name:'Remaing Orders' ,href:'/admin/remaining-orders',admin:true,customer:false
// },
// {name:'Dispatched Orders',href:'/admin/dispatch-orders',admin:true,customer:false}
// ,{name:'Delivered Orders', href:'/admin/delivered-orders',admin:true,customer:false}
// { name: 'Team', href: '#', current: false },

// { name: 'Reports', href: '#', current: false },
]
// const userNavigation=[{ name: 'Order History', href: '#' },
// { name: 'Settings', href: '#' },
// { name: 'Sign out', href: '#' },]
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
function Navbar({children}) {

  const cartQuantity=useSelector(totalQuantity)
  const userDetails=useSelector(user)
  const isAuth=useSelector(isAuthenticated)
  const navigate=useNavigate()
  const dispatch=useDispatch()

 const cartHandler=()=>{
navigate('/cart')
 }   
//  const signOutHandler=()=>{
// dispatch(emptyCart())
// dispatch(signout())
//  }
 const loginHandler=()=>{
  navigate('/sign-in')
 }
//  {isAuth &&console.log(userDetails.email)}
  return (
<div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
      
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (<div key={item.name}>
                     {  userDetails&& item[userDetails.role] && ( <Link
                            
                           to={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>)
                        
                     }
                       </div>
                        ))}
                     
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                    {isAuth&&userDetails.role==='customer'&&     <button
                       onClick={cartHandler}
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        {/* <span className="sr-only">View notifications</span> */}
                      <div className='flex'>
                      <span><ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      {cartQuantity!==0&& <span className="inline-flex items-center rounded-md mx-1 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
       {cartQuantity}
      </span>}
      </div>
                      </button>}

                      {/* Profile dropdown */}
                      {isAuth ?    <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            {/* <span className="sr-only">Open user menu</span> */}
                            <img className="h-8 w-8 rounded-full" src={`https://ui-avatars.com/api/?name=${userDetails.email}`} alt="" />
                          </Menu.Button>
                        </div>
                        
                       <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {/* {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))} */}
                                {userDetails.role==='customer'&& <Link to='/order-history'><span  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"> Order History</span></Link>}
                           <Link to='/profile'> <span  className="w-full block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Profile</span></Link>  
                          <span  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"><Link to='/logout'><p>Sign Out</p></Link></span>
                          </Menu.Items>
                  
                      </Menu>:<span  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"><button onClick={loginHandler}>Login</button></span>}
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                   
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <div   key={item.name}>
                 { userDetails&&item[userDetails.role] && <Disclosure.Button
                    
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>}
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                {isAuth&&    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${userDetails.email}`} alt="" />
                    </div>}
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.email}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                    {isAuth&&userDetails.role==='customer' &&  <button
                    onClick={cartHandler}
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                 
                      <div className='flex'>
                      <span><ShoppingCartIcon className="h-6 w-6" aria-hidden="true" /> </span>
                     
                    {/* here is one  */}
                     {cartQuantity!==0&&  <span className="inline-flex items-center rounded-md mx-1 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
     {cartQuantity}
      </span>}
      </div>
                  </button>}
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {/* {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))} */}
                      {isAuth  ? (<div>{userDetails.role==='customer'&&<Link to='/order-history'><span  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Order History</span> </Link>}
                         <Link to ='/profile'>  <span  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Profile</span></Link>
                            <span  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"><Link to='/logout'><p>Sign Out</p></Link></span>
                            </div>):<span  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"><button onClick={loginHandler}>Login</button></span>}</div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

   
        <main>
          <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
  )
}

export default Navbar
