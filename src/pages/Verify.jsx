import React from 'react'

const Verify = () => {
  return (
    <div className='relative w-full h-[760px] overflow-hidden'>
      <div className='min-h-screen flex items-center justify-center bg-yellow-50 px-4'>
        
        <div className='bg-white p-8 rounded-2xl shadow-md border border-yellow-200 w-full max-w-md text-center'>
          
          <h2 className='text-2xl font-semibold text-yellow-600 mb-4'>
            ✅ Check Your Email
          </h2>

          <p className='text-gray-600 text-sm'>
            We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
          </p>

        </div>

      </div>
    </div>
  )
}

export default Verify