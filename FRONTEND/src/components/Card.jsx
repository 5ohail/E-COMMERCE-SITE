import React from 'react'
const Card = ({brand,name,category,src}) => {

  return (
    <div className='card'>
        <h1 className='font-semibold lg:text-xl text-sm lg:block hidden'>{brand} {name}</h1>
        <h4 className='text-xs lg:text-base font-light text-gray-300 lg:block hidden'>{category}</h4>
        <div className='card-img w-42 h-96 lg:w-80 overflow-hidden'>
        <img src={src} className='h-96 w-80 object-cover object-top'/>
        </div>
    </div>
  )
}

export default Card