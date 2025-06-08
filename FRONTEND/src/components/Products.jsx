import React, { useContext, useEffect } from "react";
import { Context } from "../utils/ContextProvider";
import { useNavigate } from "react-router-dom";

const Products = (props) => {
  const { id, brand, name, category, src, price } = props;
  const {setCart,order,setOrder} = useContext(Context);
  const maxLen = 14;
  const truncatedName = brand.length + name.length > maxLen 
    ? name.slice(0, maxLen - brand.length) + "..." 
    : name;
    const Navigate = useNavigate();
    const handleAddToCart = (item) => {
      setCart((prevCart) => {
        const existingItem = prevCart.find(cartItem => cartItem.name === item.name); // Check if item already exists in the cart
        if (existingItem) {
          // If item already exists, increment the quantity
          return prevCart.map(cartItem =>
            cartItem.name === item.name
              ? { ...cartItem, quantity: cartItem.quantity + 1 } // Update the quantity of the existing item
              : cartItem // Keep other items unchanged
          );
        } else {
          // If item doesn't exist, add it with quantity 1
          return [...prevCart, { ...item, quantity: 1 }];
        }
      });
    };
    
    const handleRedirect = (item) =>{
      console.log({...props})
      localStorage.setItem("activeProduct",JSON.stringify({ ...props}));
      Navigate(`/product/${encodeURIComponent(name)}`);
    }
    const buyNow = () => {
      // Check if the item exists in the order
      const itemExists = order.find(e => e.name === name);
  
      if (itemExists) {
        // If it exists, increment the quantity
        const updatedOrder = order.map((e) => {
          if (e.name === name) {
            return { ...e, quantity: e.quantity + 1 };
          }
          return e;
        });
        setOrder(updatedOrder); // Update the order state
      } else {
        // If item doesn't exist, add new item with quantity 1
        setOrder((prev) => [...prev, { ...props, quantity: 1 }]);
      }
     if(location) Navigate('/buy');
    };
  return (
    <div id={id} className="card lg:mt-5 mt-2 border border-gray-300 lg:rounded rounded-md lg:pb-0 pb-1">
      <div className="card-img lg:h-64 lg:w-64 h-42 w-42 overflow-hidden">
        <img src={src} className="h-64 w-64 object-cover object-top" alt="product" onClick={()=> handleRedirect(props)}/>
      </div>
      <h1 className="font-semibold lg:text-xl text-sm lg:px-3 lg:pt-2 px-1 pt-1">{brand} {truncatedName}</h1>
      <h4 className="lg:text-md font-light text-xs text-gray-400 lg:px-3 px-1">{category}</h4>
      <h3 className="font-normal text-xs lg:text-base text-gray-700 lg:px-3 px-1">${price}</h3>
      <div className="flex lg:justify-between justify-center gap-5 lg:gap-0 items-center mx-1 my-1.5 lg:mx-3 lg:my-3">
        <button 
          className="text-white bg-black lg:px-3 lg:py-2 rounded-xs lg:rounded text-xs py-1 px-3 lg:text-sm cursor-pointer"
          onClick={()=>handleAddToCart(props)}
        >
          <span className="lg:inline hidden">Add to Cart</span> <span className="lg:hidden flex items-center gap-1"><img src="/bag.svg" alt="bag" className=" h-4 w-4" /> Cart</span>
        </button>
        <button className="text-white bg-black lg:px-3 lg:py-2 rounded-xs lg:rounded text-xs py-1 px-3 lg:text-sm cursor-pointer"
        onClick={()=>buyNow()}
        >
          <span className="lg:inline hidden">Buy Now</span> <span className="lg:hidden flex items-center gap-1"><img src="/cash.svg" alt="bag" className="h-4 w-4" /> Buy</span>
        </button>
      </div>
    </div>
  );
};

export default React.memo(Products);
