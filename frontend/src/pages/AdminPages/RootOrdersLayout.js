import React, { useState } from 'react'
import Navbar from '../../features/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function RootOrdersLayout() {
  const navigate=useNavigate()
const [activeTab,setActievTab]=useState('orders')
  const tabContents = [
    {status:'orders',href:'/admin/orders'},
    {
      status:'dispatched',href:'dispatch-orders'
    },
    {status:'Delivered',href:'delivered-orders'},
    {status:'cancelled',href:'cancelled-orders'}
  
 
  ]
  const handleTabClick=(href,status)=>{
    setActievTab(status)
    // console.log(href)
    navigate(href)
  }
  return (
  <Navbar>
<div className="flex justify-center flex-col mx-auto">
      <ul className="flex flex-wrap xs:text-xs sm:text-base font-medium text-center pl-2 justify-start text-gray-500 border-b border-gray-200 bg-white dark:border-gray-700 dark:text-gray-400">
        {tabContents.map((tab) => (
          <li key={tab.status} className="me-2">
            <button
              onClick={() => handleTabClick(tab.href,tab.status)}
              className={`inline-block p-4 mt-1 rounded-t-lg
              ${
                activeTab === tab.status
                  ? "text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
                  : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              }
              `}
            >
              {tab.status.charAt(0).toUpperCase() + tab.status.slice(1)}{" "}
              {/* Capitalize the tab name */}
            </button>
          </li>
        ))}
      </ul>
      {/* Tab content */}
      {/* <div className="">{tabContents[activeTab]}</div> */}
</div>
    <Outlet/>
  </Navbar>
  )
}

export default RootOrdersLayout
