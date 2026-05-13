import {
  LayoutDashboard,
  PackagePlus,
  PackageSearch,
  Users
} from 'lucide-react'
import React from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='hidden md:block fixed left-0 top-0 w-[280px] h-screen bg-yellow-50 border-r border-yellow-200'>

      <div className='pt-24 px-5 space-y-3'>

        {/* Dashboard */}
        <NavLink
          to='/dashboard/sales'
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-[18px] font-semibold transition-all
            ${isActive
              ? 'bg-yellow-500 text-white shadow-sm'
              : 'text-gray-800 hover:bg-yellow-100'}`
          }
        >
          <LayoutDashboard size={22} />
          <span>Dashboard</span>
        </NavLink>

        {/* Add Product */}
        <NavLink
          to='/dashboard/add-product'
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-[18px] font-semibold transition-all
            ${isActive
              ? 'bg-yellow-500 text-white shadow-sm'
              : 'text-gray-800 hover:bg-yellow-100'}`
          }
        >
          <PackagePlus size={22} />
          <span>Add Product</span>
        </NavLink>

        {/* Products */}
        <NavLink
          to='/dashboard/products'
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-[18px] font-semibold transition-all
            ${isActive
              ? 'bg-yellow-500 text-white shadow-sm'
              : 'text-gray-800 hover:bg-yellow-100'}`
          }
        >
          <PackageSearch size={22} />
          <span>Products</span>
        </NavLink>

        {/* Users */}
        <NavLink
          to='/dashboard/users'
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-[18px] font-semibold transition-all
            ${isActive
              ? 'bg-yellow-500 text-white shadow-sm'
              : 'text-gray-800 hover:bg-yellow-100'}`
          }
        >
          <Users size={22} />
          <span>Users</span>
        </NavLink>

        {/* Orders */}
        <NavLink
          to='/dashboard/orders'
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-[18px] font-semibold transition-all
            ${isActive
              ? 'bg-yellow-500 text-white shadow-sm'
              : 'text-gray-800 hover:bg-yellow-100'}`
          }
        >
          <FaRegEdit size={20} />
          <span>Orders</span>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar