import React from 'react'

const Address = () => {
  return (
    <div className='card-box w-[40vw] m-4 py-2 px-3  rounded-2xl'>
        <div className='font-medium'>Your Address</div>
        <div className='text-sm '> Street : <span className='text-gray-500'>XYZ Street</span></div>
        <div className='text-sm '>Country : <span className='text-gray-500'>India</span></div>
    </div>
  )
}

export default Address