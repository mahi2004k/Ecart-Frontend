import Sidebar from '@/components/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard
