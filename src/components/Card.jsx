import React from 'react'

const Card = ({brand,name,category,src}) => {
  return (
    <div className='card'>
        <h1 className='font-semibold text-xl'>{brand} {name}</h1>
        <h4 className='text-md font-light text-gray-300'>{category}</h4>
        {/* <img src="" alt="" /> */}
        <div className='card-img h-96 w-80 overflow-hidden'>
        <img src={src} className='h-96 w-80 object-cover object-top'/>
        </div>
    </div>
  )
}

export default Card