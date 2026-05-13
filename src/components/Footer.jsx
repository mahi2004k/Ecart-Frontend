import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='bg-yellow-50 text-gray-700 pt-12 pb-6 mt-12 border-t border-yellow-200'>
      <div className='max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>

        {/* Info Section */}
        <div>
          <Link to='/'>
            <img src="/Ecart.png" alt="Ecart Logo" className='w-32 mb-3' />
          </Link>
          <p className='text-sm'>© 2026 Ecart. All rights reserved.</p>
          <p className='text-sm mt-2'>123 Main Street, City, Country</p>
          <p className='text-sm'>Email: info@ecart.com</p>
          <p className='text-sm'>Phone: +1 (123) 456-7890</p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className='text-yellow-700 font-semibold mb-4 text-lg'>Customer Service</h3>
          <ul className='space-y-2'>
            <li><Link to='/contact' className='hover:text-yellow-600 transition'>Contact Us</Link></li>
            <li><Link to='/shipping' className='hover:text-yellow-600 transition'>Shipping & Delivery</Link></li>
            <li><Link to='/faq' className='hover:text-yellow-600 transition'>FAQ</Link></li>
            <li><Link to='/orders' className='hover:text-yellow-600 transition'>Order Status</Link></li>
            <li><Link to='/returns' className='hover:text-yellow-600 transition'>Returns</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className='text-yellow-700 font-semibold mb-4 text-lg'>Follow Us</h3>
          <div className='flex gap-4'>

            <a href="https://www.facebook.com/ecart" target="_blank" rel="noopener noreferrer"
              className='bg-yellow-100 text-yellow-700 p-3 rounded-full hover:bg-yellow-400 hover:text-white transition transform hover:scale-110'>
              <FaFacebookF />
            </a>

            <a href="https://www.twitter.com/ecart" target="_blank" rel="noopener noreferrer"
              className='bg-yellow-100 text-yellow-700 p-3 rounded-full hover:bg-yellow-500 hover:text-white transition transform hover:scale-110'>
              <FaTwitter />
            </a>

            <a href="https://www.instagram.com/ecart" target="_blank" rel="noopener noreferrer"
              className='bg-yellow-100 text-yellow-700 p-3 rounded-full hover:bg-yellow-500 hover:text-white transition transform hover:scale-110'>
              <FaInstagram />
            </a>

            <a href="https://www.pinterest.com/ecart" target="_blank" rel="noopener noreferrer"
              className='bg-yellow-100 text-yellow-700 p-3 rounded-full hover:bg-yellow-600 hover:text-white transition transform hover:scale-110'>
              <FaPinterest />
            </a>

          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className='text-yellow-700 font-semibold mb-4 text-lg'>Newsletter</h3>
          <p className='text-sm mb-3'>
            Subscribe to get latest offers and updates.
          </p>

          <form className='flex flex-col sm:flex-row gap-2'>
            <input
              type='email'
              placeholder='Enter your email'
              className='flex-1 px-3 py-2 rounded-md bg-white border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500'
            />
            <button
              type='submit'
              className='bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-white transition'
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Line */}
      <div className='border-t border-yellow-200 mt-10 pt-4 text-center text-sm text-gray-600'>
        Built with ❤️ by Ecart Team
      </div>
    </footer>
  )
}

export default Footer