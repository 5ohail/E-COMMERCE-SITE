import React from "react";

const CartCard = ({ src, name, category, price, quantity, add, remove }) => {
  const formattedPrice = (parseFloat(price) * (quantity || 1)).toFixed(2);
  const item = {src, name, category, price, quantity};
  const removeItem = () =>{
    remove(item);
    console.log("Item removed",item);
  }
  return (
    <div className="flex items-center justify-between mx-4 my-3 card-box rounded-2xl">
      <div className="flex gap-4 p-4 items-center">
        <img src={src} className="object-cover object-top w-20 h-20 rounded-xl" alt="Product" />
        <div>
          <h1 className="text-md font-semibold">{name}</h1>
          <p className="text-sm">
            Category: <span className="text-[#5b5b5b82]">{category}</span>
          </p>
        </div>
      </div>
      
      <div className="flex border-[1px] mr-16 border-[#0000001a] rounded-4xl px-2">
        <button onClick={remove}>-</button>
        <span className="border-[1px] h-6 border-[#00000005] mx-3"></span>
        <span>{quantity || 1}</span>
        <span className="border-[1px] h-6 border-[#00000005] mx-3"></span>
        <button onClick={add}>+</button>
      </div>

      <p className="font-medium text-xl mr-5">${formattedPrice}</p>

      <div className="flex flex-col items-center mr-5 pr-4 cursor-pointer" onClick={removeItem}>
        <img src="remove.svg" alt="Remove" />
      </div>
    </div>
  );
};

export default CartCard;
