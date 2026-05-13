import React from 'react'
import { Button } from './ui/button'

const Hero = () => {
  return (
    <section className='bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-16'>
        <div className='max-w-7xl mx-auto px-4'>
            <div className='grid md:grid-cols-2 gap-8 items-center'>
                <div>
                    <h1 className='text-4xl md:text-6xl font-bold mb-4'>
                      Latest Electronics at best prices
                    </h1>
                    <p className='text-xl mb-6 text-yellow-100'>
                      Discover the latest gadgets and devices at unbeatable prices. Shop now and save big!
                    </p>
                    <div className='flex flex-col sm:flex-row gap-4'>
                        <Button className='bg-white text-yellow-600 hover:bg-yellow-100'>
                          Shop Now
                        </Button>
                        <Button 
                          variant='outline' 
                          className='border-white text-white hover:bg-white hover:text-yellow-600 bg-transparent'
                        >
                          View Deals
                        </Button>
                    </div>
                </div>
                <div className='relative'>
                    <img 
                      src="/ecart-hero1.png" 
                      alt="" 
                      width={500} 
                      height={400} 
                      className='rounded-lg shadow-2xl'
                    />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero