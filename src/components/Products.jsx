import React, { useContext, useEffect, useId } from "react";
import { Context } from "../utils/ContextProvider";

const Products = ({ id, brand, name, category, src, price }) => {
  if (brand.length + name.length > 14) {
    name = name.slice(0, 14 - brand.length) + "...";
  }
  const ID = useId();

  const { itemsAdded, cart, setCart, setitemsAdded } = useContext(Context);

  // Retrieve from Local Storage on Mount
  useEffect(() => {
    const storedItems = localStorage.getItem("itemsAdded");
    if (storedItems) {
      setitemsAdded(Number(storedItems));
    }
  }, []); 
  
  // Save to Local Storage and update cart
  const updateCart = () => {
    setitemsAdded(prev => {
      const newCount = prev + 1;
      localStorage.setItem("itemsAdded", newCount);
      return newCount;
    });
    
    setCart(prevCart => {
      const updatedCart = [...prevCart, { id, brand, name, category, image: src, price }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <div id={ID} className="card mt-5 border border-gray-300 rounded">
      <div className="card-img h-64 w-64 overflow-hidden">
        <img src={src} className="h-64 w-64 object-cover object-top" alt="product" />
      </div>
      <h1 className="font-semibold text-xl px-3 pt-2">{brand} {name}</h1>
      <h4 className="text-md font-light text-gray-400 px-3">{category}</h4>
      <h3 className="font-normal text-gray-700 px-3">${price}</h3>
      <div className="flex justify-between items-center mx-3 my-3">
        <button
          className="text-white bg-black px-3 py-2 rounded text-sm cursor-pointer"
          onClick={updateCart}
        >
          Add to Cart
        </button>
        <button className="text-white bg-black px-3 py-2 rounded text-sm cursor-pointer">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Products;
