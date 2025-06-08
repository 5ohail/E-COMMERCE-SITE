import React, { useContext } from 'react'
import Card from '../components/Card'
import { Context } from '../utils/ContextProvider'
import { Link } from 'react-router-dom'
const Home = () => {
  const {Data,setIsActiveOn} = useContext(Context);
  let i = 0;
  return (
    <> 
    <div className='flex w-auto justify-center overflow-hidden md:flex-wrap my-14 gap-1.5 md:gap-2'>
      {
       Data.map((item,index)=>{
        if(i<4){
          i++;
         return <Card key={index} name={item.name} brand={item.brand} category={item.category} src={item.image}/>
        }
      }

      )}
    </div>
    <div className= 'lg:flex lg:gap-12 lg:justify-between lg:items-center '>
      <h1 className='lg:mx-21 mx-2 main-txt lg:text-9xl font-bold'>NEW <span className='logo-b z-10'>Luxora</span> <br />EYEWARE <br />COLLECTION</h1>
      <div className='lg:mt-50 mt-4'>
      <Link to='/Product' className='lg:ml-50 font-semibold lg:font-bold lg:text-[1.2rem] text-[1rem] flex gap-2 ml-3 items-center' onClick={()=>setIsActiveOn(true)}>DISCOVER THE COLLECTION <svg className='border-[1px] border-black rounded-full' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="m600-200-57-56 184-184H80v-80h647L544-704l56-56 280 280-280 280Z"/></svg></Link>
      <p className='m-2 text-[0.7rem] lg:text-[1rem] font-extralight ml-3'>An iconic collection inspired by the past and reinvented for the future; discover the new sunglasses for him and her</p>
    </div>
    </div>
   
    </>
  )
}

export default Home