import React, { useContext } from 'react'
import Products from '../components/Products'
import { Context } from '../utils/ContextProvider'
const Product = () => {
    const { Data } = useContext(Context);
   
  return (
    <>
    <div className='flex w-auto flex-wrap my-14 gap-4 ml-14'>
    {Data.map((item,index) => (
      <Products 
        key={index} 
        id={index} 
        name={item.name} 
        brand={item.brand}  
        category={item.category} 
        src={item.image} 
        price={item.price} 
      />
    ))}
    </div>
    </>
  )
}

export default Product