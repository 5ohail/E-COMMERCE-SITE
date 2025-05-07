import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../utils/ContextProvider";

export default function ProductDetails() {
  const { id } = useParams();
  const item = JSON.parse(localStorage.getItem("activeProduct")) || {};
  const { Data, cart, setCart } = useContext(Context);
  const product = Data.find((e) => e.name === item.name) || {};

  const found = cart.find((e) => e.name === product.name);
  const qty = found ? found.quantity : 0;
  const [count, setCount] = useState(qty);

  useEffect(() => {
    setCount(qty);
  }, [qty]);

  // Add to Cart
  const addToCart = () => {
    const check = cart.find((e) => e.name === product.name);
    if (!check) {
      setCart((prev) => [...prev, { ...product, quantity: 1, src: product.image }]);
      setCount(1);
    } else {
      setCart((prev) =>
        prev.map((e) =>
          e.name === product.name ? { ...e, quantity: e.quantity + 1 } : e
        )
      );
      setCount((prev) => prev + 1);
    }
  };

  // Increase
  const increase = () => {
    const check = cart.find((e) => e.name === product.name);
    if (!check) {
      // Item not in cart → add it
      setCart((prev) => [...prev, { ...product, quantity: 1, src: product.image }]);
      setCount(1);
    } else {
      // Item exists → increment quantity
      setCart((prev) =>
        prev.map((e) =>
          e.name === product.name ? { ...e, quantity: e.quantity + 1 } : e
        )
      );
      setCount((prev) => prev + 1);
    }
  };
  

  // Decrease
  const decrease = () => {
    const check = cart.find((e) => e.name === product.name);
    if (check && check.quantity > 1) {
      setCart((prev) =>
        prev.map((e) =>
          e.name === product.name ? { ...e, quantity: e.quantity - 1 } : e
        )
      );
      setCount((prev) => prev - 1);
    } else if (check && check.quantity === 1) {
      // Remove item from cart when quantity becomes 0
      setCart((prev) => prev.filter((e) => e.name !== product.name));
      setCount(0);
    }
  };

  return (
    <div className="max-w-5xl mx-10 my-4 py-10 px-4 bg-white text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[70vh] object-cover rounded-xl"
        />

        <div className="my-4">
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <h2 className="text-2xl my-2 font-medium">
            Brand : <span>{product.brand}</span>
          </h2>
          <p className="font-medium text-2xl mb-2">
            <span className="text-green-600 mb-4">${product.price}</span>
          </p>

          <div className="flex items-center gap-1 mb-3">
            <span className="font-medium">Rating : </span>
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-500 text-2xl">
                &#9733;
              </span>
            ))}
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* COUNTER */}
          <div className="flex items-center justify-evenly border-[1px] ml-2 w-32 border-[#0000001a] px-2 mb-4">
            <button
              className="text-xl font-semibold w-8 h-8 flex justify-center items-center"
              onClick={decrease}
            >
              -
            </button>
            <div className="border-l-[1px] border-solid border-l-gray-300 h-6"></div>
            <span className="mx-3">{count}</span>
            <div className="border-l-[1px] border-solid border-l-gray-300 h-6"></div>
            <button
              className="text-xl font-semibold w-8 h-8 flex justify-center items-center"
              onClick={increase}
            >
              +
            </button>
          </div>

          <div className="flex justify-left gap-4 items-center">
            <button className="bg-black text-white py-3 px-6 rounded-xl text-lg font-medium hover:bg-gray-800 transition duration-300">
              Buy Now
            </button>
            <button
              className="bg-black text-white py-3 px-6 rounded-xl text-lg font-medium hover:bg-gray-800 transition duration-300"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
