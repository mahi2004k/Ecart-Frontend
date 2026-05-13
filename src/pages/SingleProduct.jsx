import Breadcrums from '@/components/Breadcrums'
import ProductDesc from '@/components/ProductDesc'
import ProductImg from '@/components/ProductImg'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const SingleProduct = () => {
    const params = useParams()
    const productId = params.id
    const {products} = useSelector((store)=>store.product)
    const product = products.find((item)=>item._id === productId)

  return (
    <div className='pt-35 py-10 max-w-7xl mx-auto bg-yellow-50 min-h-screen px-4'>
      
      {/* Breadcrumb */}
      <Breadcrums product={product}/>

      {/* Main Section */}
      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start bg-white p-5 rounded-lg border border-yellow-200 shadow-sm'>
        
        <ProductImg images={product?.productImg}/>
        
        <ProductDesc product={product}/>
      
      </div>

    </div>
  )
}

export default SingleProduct