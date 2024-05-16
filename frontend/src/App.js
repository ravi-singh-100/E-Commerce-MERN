import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';

import Authenticates from './pages/Authenticates';
import Protected from './pages/Protected'
import { cartAsync } from './features/Cart/CartSlice';
import { useSelector } from 'react-redux';
import { isAuthenticated,token,updateUser,user } from './features/auth/authSlice';

import ErrorPage from './pages/ErrorPage';
import OrderSuccess from './pages/OrderSuccess';
import OrderHistoryPage from './pages/OrderHistoryPage';

import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SignOutPage from './pages/SignOutPage';
import AdminProtected from './pages/AdminPages/AdminProtected';
import AdminProductListPage from './pages/AdminPages/AdminProductListPage';
import AddNewProductPage from './pages/AdminPages/AddNewProductPage';
import EditProductPage from './pages/AdminPages/EditProductPage';
import AllOrdersPage from './pages/AdminPages/AllOrdersPage';
import RemaingOrdersPage from './pages/AdminPages/RemaingOrdersPage';
import DispatchedOrdersPage from './pages/AdminPages/DispatchedOrdersPage';
import DeliveredOrdersPage from './pages/AdminPages/DeliveredOrdersPage';
import ProfilePage from './pages/ProfilePage';
import RootOrdersLayout from './pages/AdminPages/RootOrdersLayout';
import CancelledOrderPage from './pages/AdminPages/CancelledOrderPage';
import OnlyCustomer from './pages/OnlyCustomer';
import StripePayment from './pages/StripePayment';

function App() {
  const isLoggedIn=useSelector(isAuthenticated)
  const userDetails=useSelector(user)
const userToken=useSelector(token)
  const dispatch=useDispatch()
  
  //useEffect



  const router=createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },{
      path:'sign-in',
      element:<Authenticates><LoginPage/></Authenticates>
    },
    {
      path:'sign-up',
      element:<Authenticates><SignupPage/></Authenticates>
    },{
      path:'/cart',
      element:<OnlyCustomer><CartPage/></OnlyCustomer>
    },{
      path:'/checkout',
      element:<OnlyCustomer><CheckoutPage/></OnlyCustomer>
    },
    {
      path:'/product-detail/:id',
      element:<ProductDetailPage/>
    },
    {
      path:'/order-success/:id',
      element:<OnlyCustomer><OrderSuccess/></OnlyCustomer>
    },
    {
      path:'/stripe/payment',
      element:<OnlyCustomer><StripePayment/></OnlyCustomer>
    },
    {
      path:'/order-history',
      element:<OnlyCustomer><OrderHistoryPage/></OnlyCustomer>
    },
    {
      path:'forgot-password',
      element:<Authenticates><ForgotPasswordPage/></Authenticates>
    },
    {
      path:'/logout',
      element:<Protected><SignOutPage/></Protected>
    },
    {
  path:'/reset-password/:id/:token',
  element:<ResetPasswordPage/>
    },
    {
      path:'/admin/add-new-product',
      element:<AdminProtected><AddNewProductPage/></AdminProtected>
    },
    {
      path:'/admin/product-list',
      element:<AdminProtected><AdminProductListPage/></AdminProtected>
    },
    {
      path:'/admin/edit-product/:id',
      element:<AdminProtected><EditProductPage/></AdminProtected>

    },
    {
      path:'/admin/orders',
      element:<AdminProtected><RootOrdersLayout/></AdminProtected>,
      children:[
        {
index:true,
element:<AdminProtected><AllOrdersPage/></AdminProtected>
        },
        {
          path:'remaining-orders',
      element:<AdminProtected><RemaingOrdersPage/></AdminProtected>
        },
        {
          path:'dispatch-orders',
          element:<AdminProtected><DispatchedOrdersPage/></AdminProtected>
      
        },
        {
          path:'delivered-orders',
          element:<AdminProtected><DeliveredOrdersPage/></AdminProtected>
        },
        
          {
            path:'cancelled-orders',
            element:<AdminProtected><CancelledOrderPage/></AdminProtected>
          }
        
      ]
    },
    {
      path:'profile',
      element:<Protected><ProfilePage/></Protected>
    },
    {
      path:'*',
      element:<ErrorPage/>
    },
    
  ])
  return (<>
<RouterProvider router={router}/>
<Toaster/>
</>
  );
}

export default App;
