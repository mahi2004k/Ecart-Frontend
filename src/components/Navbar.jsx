import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/userSlice'

const Navbar = () => {
  const { user } = useSelector(store => store.user)
  const { cart } = useSelector(store => store.product)

  const accessToken = localStorage.getItem('accessToken')
  const admin = user?.role === 'admin'

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/user/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      if (res.data.success) {
        dispatch(setUser(null))
        toast.success(res.data.message)
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
      toast.error('Logout failed')
    }
  }

  return (
    <header className='fixed top-0 left-0 w-full z-50 bg-yellow-50 border-b border-yellow-200 shadow-md'>
      <div className='max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between'>

        {/* LOGO */}
        <Link to='/' className='flex items-center'>
          <img
            src='/Ecart.png'
            alt='logo'
            className='w-[90px] object-contain'
          />
        </Link>

        {/* RIGHT SECTION */}
        <nav className='flex items-center gap-7'>

          {/* Menu */}
          <ul className='hidden md:flex items-center gap-7 text-[18px] font-semibold text-gray-800'>

            <Link to='/'>
              <li className='hover:text-yellow-600 transition'>Home</li>
            </Link>

            <Link to='/products'>
              <li className='hover:text-yellow-600 transition'>Products</li>
            </Link>

            {user && (
              <Link to={`/profile/${user._id}`}>
                <li className='hover:text-yellow-600 transition'>
                  Hello, {user.firstName}
                </li>
              </Link>
            )}

            {admin && (
              <Link to='/dashboard/sales'>
                <li className='hover:text-yellow-600 transition'>
                  Dashboard
                </li>
              </Link>
            )}
          </ul>

          {/* CART */}
          <Link to='/cart' className='relative'>
            <ShoppingCart className='w-6 h-6 text-yellow-700' />

            <span className='absolute -top-2 -right-3 min-w-[20px] h-[20px] px-1 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center'>
              {cart?.items?.length || 0}
            </span>
          </Link>

          {/* LOGIN / LOGOUT BUTTON */}
          {user ? (
            <Button
              onClick={logoutHandler}
              className='bg-yellow-500 hover:bg-yellow-600 text-white px-5 rounded-md cursor-pointer shadow-sm'
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate('/login')}
              className='bg-yellow-600 hover:bg-yellow-700 text-white px-5 rounded-md cursor-pointer shadow-sm'
            >
              Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar