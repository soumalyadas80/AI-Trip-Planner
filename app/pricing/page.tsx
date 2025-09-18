import React from 'react'
import PricingTable from './_components/PricingTable'

function Pricing() {
  return (
    <div className='mt-20 pb-20'>
     <h2 className='font-bold text-3xl my-5 text-center'>Choose the Perfect <span className='text-primary'>Plan</span> for Smarter, AI-Powered Trip Planning</h2>
     <div className='max-w-7xl mx-auto px-4'>
      <PricingTable />
    </div>
    </div>
  )
}

export default Pricing