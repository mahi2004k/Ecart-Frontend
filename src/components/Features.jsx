import { Headphones, Shield, Truck } from 'lucide-react'
import React from 'react'

const Features = () => {
  return (
    <section className='py-12 bg-yellow-50'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid md:grid-cols-3 gap-8'>

            <div className='flex items-center space-x-4'>
                <div className='h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center'>
                    <Truck className='h-6 w-6 text-yellow-600'/>
                </div>
                <div>
                    <h3 className='text-lg font-semibold'>Free Shipping</h3>
                    <p className='text-gray-600'>
                        Enjoy free shipping on all orders over $50.
                    </p>
                </div>
            </div>

            <div className='flex items-center space-x-4'>
                <div className='h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center'>
                    <Shield className='h-6 w-6 text-yellow-600'/>
                </div>
                <div>
                    <h3 className='text-lg font-semibold'>Secure Payment</h3>
                    <p className='text-gray-600'>
                        Your payment information is always protected.
                    </p>
                </div>
            </div>

            <div className='flex items-center space-x-4'>
                <div className='h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center'>
                    <Headphones className='h-6 w-6 text-yellow-600'/>
                </div>
                <div>
                    <h3 className='text-lg font-semibold'>24/7 Support</h3>
                    <p className='text-gray-600'>
                        Our customer support team is available around the clock.
                    </p>
                </div>
            </div>

        </div>
      </div>
    </section>
  )
}

export default Features