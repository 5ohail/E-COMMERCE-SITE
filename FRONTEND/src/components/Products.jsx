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
    <div id={id} className="card mt-5 border border-gray-300 rounded">
      <div className="card-img h-64 w-64 overflow-hidden">
        <img src={src} className="h-64 w-64 object-cover object-top" alt="product" onClick={()=> handleRedirect(props)}/>
      </div>
      <h1 className="font-semibold text-xl px-3 pt-2">{brand} {truncatedName}</h1>
      <h4 className="text-md font-light text-gray-400 px-3">{category}</h4>
      <h3 className="font-normal text-gray-700 px-3">${price}</h3>
      <div className="flex justify-between items-center mx-3 my-3">
        <button 
          className="text-white bg-black px-3 py-2 rounded text-sm cursor-pointer"
          onClick={()=>handleAddToCart(props)}
        >
          Add to Cart
        </button>
        <button className="text-white bg-black px-3 py-2 rounded text-sm cursor-pointer"
        onClick={()=>buyNow()}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default React.memo(Products);
