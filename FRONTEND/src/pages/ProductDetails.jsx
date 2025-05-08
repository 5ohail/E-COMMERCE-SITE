import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../utils/ContextProvider";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { item } = useParams();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("activeProduct") || "{}");
    setProduct(data);
  }, [item]);
  console.log(product)

  

  const { Data, setCart,cart } = useContext(Context);
  const cartItem = cart.find((e)=>e.name === product.name);
  const quantity = cartItem?.quantity || 0;
  const increase = () => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.name === product.name);
      
      if (existingItem) {
        // Increment quantity of the existing item
        return prevCart.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 } // Increase quantity
            : item // Keep other items unchanged
        );
      } else {
        // Add the product if it doesn't exist in the cart
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  
  const decrease = () => {
    setCart(prevCart => {
      return prevCart
        .map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0); // remove item if quantity is 0
    });
  };
  

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


  const foundProduct = Data.find((e) => e.name === product.name);
  const description = foundProduct?.description || "";
  return (
    <div className="p-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-gray-400">
        <Link to="/product" className="hover:underline">
          Products
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="12"
          fill="#99a1af"
          viewBox="0 -960 960 960"
        >
          <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
        </svg>
        <span className="text-black">
          {product.brand} {product.name}
        </span>
      </div>

      {/* Product Display */}
      <div className="flex flex-wrap gap-16 mt-16">
        {/* Product Image */}
        <div className="h-[30rem] w-[26rem] overflow-hidden rounded-lg shadow-md">
          <img
            src={product.src}
            alt={`${product.brand} ${product.name}`}
            className="w-full h-full object-cover hover:scale-105 delay-125 ease-linear transition-all"
          />
        </div>

        {/* Product Info */}
        <div className="max-w-lg mt-8">
          <h1 className="text-4xl font-semibold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-2">
            Brand: <span className="font-normal text-gray-500">{product.brand}</span>
          </p>
          <p className="text-xl text-gray-700 mb-4">
            Price:{" "}
            <span className="text-green-600 font-semibold">
              ${product.price}
            </span>
          </p>
          <p className="text-xl text-gray-600 mb-4">{description}</p>
          <div className="flex items-center mb-6">
            <p className="text-xl text-gray-700 mr-2">Rating:</p>
            <div className="text-yellow-400 text-2xl">{"★★★★★"}</div>
          </div>
          <div className="inline-flex items-center border-[1px] mr-16 border-[#0000001a]  px-2 mb-4">
            
        <button 
          className="text-xl font-light w-8 h-8 flex justify-center items-center cursor-pointer"
          onClick={decrease}
        >
          -
        </button>
        <div className="h-5 border-r-[1px] border-gray-400 "></div>
        <span className="mx-3">{quantity}</span>
        <div className="h-5 border-r-[1px] border-gray-400 "></div>
        <button 
          className="text-xl font-light w-8 h-8 flex justify-center items-center cursor-pointer"
          onClick={increase}
        >
          +
        </button>
      </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition cursor-pointer">
              Buy Now
            </button>
            <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-700 transition cursor-pointer" onClick={()=>handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
