import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../utils/ContextProvider';
const Navbar = () => {
  const [active, setActive] = useState(null);
  const [search,setSearch] = useState(false);
  const [list,setList] = useState(null);
  const [searchData,setSearchData] = useState([]);
  const {itemsAdded,setitemAdded,Data,isActiveOn,setIsActiveOn} = useContext(Context);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("user");
    localStorage.removeItem("cart")
    navigate("/login"); // Redirect to login page
};    
const handleNavigate = (itemName) =>{
  console.log(itemName)
  localStorage.setItem("activeProduct", JSON.stringify({ ...itemName,src:itemName.image }))
  navigate(`/product/${encodeURIComponent(itemName.name)}`)
  setSearch(false);
}
  //search functionality
    const searchList = () => {
      const arr = Data.filter(item => 
        item.name.toLowerCase().includes(list.toLowerCase())
      );
      setSearchData(arr);
      console.log(searchData);
    }

  
 
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      setActive("login");
    }
  }, [location.pathname, setActive]);

  return (
    <nav className='bg-[#ffffff] text-[#000] flex justify-between items-center px-5 py-2'>
      <div className="font-semibold text-3xl">
        <h1 className='logo'>Luxora</h1>
      </div>
      <ul className='list-none flex gap-8 justify-center items-center py-4'>
        <li>
          <Link
            onClick={() => {
              setActive(null);
              setIsActiveOn(false);
              console.log(isActiveOn)
            }}
            className={`text-[1rem] ${active === null && !isActiveOn ? 'border-b-[1px] border-b-black' : ''} px-3 py-2`}
            to='/'
          >
            HOME
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setActive('product')}
            className={`text-[1rem] ${active === 'product' || isActiveOn ? 'border-b-[1px] border-b-black' : ''} px-3 py-2`}
            to='/product'
          >
            PRODUCT
          </Link>
        </li>
        <li>
          <Link
            onClick={() => {
              setActive('contact');
              setIsActiveOn(false)
            }}
            className={`text-[1rem] ${active === 'contact' && !isActiveOn? 'border-b-[1px] border-b-black' : ''} px-3 py-2`}
            to='/contact'
          >
            CONTACT
          </Link>
        </li>
        <li>
          <Link
            onClick={() => {
              setActive('login');
              setIsActiveOn(false)
            }}
            className={`text-[1rem] rounded ${active === 'login' && !isActiveOn ? 'bg-black text-white' : 'text-black'} px-3 py-2 `}
            to='/login'
          >
            SIGN-IN
          </Link>
        </li>
        <Link
            onClick={logout}
            className='text-[1rem] text-white bg-red-500 px-3 py-2 rounded'
            to='/login'
          >
            Log Out
          </Link>
      </ul>
      <div className='accessories flex items-center gap-6 px-4'>
       <img src="search.svg" className='w-7' alt="Search" />
        <div className='line'></div>
        <Link to='/cart'>
        <div className='relative'>
        <img src="cart.svg" className='w-7' alt="Cart" /> 
          {itemsAdded ? (
            <div className='item-num bg-red-500 text-[0.8rem] text-white rounded-full w-4 h-4 flex justify-center items-center'>
              {itemsAdded}
            </div>
          ) : null}
        </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
