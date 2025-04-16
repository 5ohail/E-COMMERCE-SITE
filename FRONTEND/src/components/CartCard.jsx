import { useEffect, useState } from "react";

const CartCard = ({ id, src, itemName, category, price, quantity, removeFromCart, decrease, increase }) => {
  const [count, setCount] = useState(quantity || 1); // Use the `quantity` prop as the initial value
  useEffect(() => {
    setCount(quantity);
  }, [quantity]);

  // Update formatted price whenever count or price changes
  // Calculate price on the fly

  const truncateName = () => {
    if (itemName && itemName.length > 7) {  // Check if itemName is defined
      return itemName.slice(0, 6) + '...';
    }
    return itemName || '';  // Return empty string if itemName is undefined
  };

  const truncateCategory = () => {
    if (category && category.length > 8) {  // Check if category is defined
      return category.slice(0, 5) + '...';
    }
    return category || '';  // Return empty string if category is undefined
  };

  return (
    <div className="flex items-center justify-between mx-4 my-3 card-box rounded-2xl">
      <div className="flex gap-4 p-4 items-center">
        <img src={src} className="object-cover object-top w-20 h-20 rounded-xl" alt="Product" />
        <div>
          <h1 className="text-md font-semibold ">{truncateName()}</h1>
          <p className="text-sm">
            <span className="text-[#5b5b5b82]">{truncateCategory()}</span>
          </p>
        </div>
      </div>

      {/* Counter section */}
      <div className="flex items-center border-[1px] mr-16 border-[#0000001a] rounded-4xl px-2">
        <button 
          onClick={() => decrease(itemName)} 
          className="text-xl font-semibold w-8 h-8 flex justify-center items-center"
        >
          -
        </button>
        <span className="mx-3">{count}</span>
        <button 
          onClick={() => increase(itemName)} 
          className="text-xl font-semibold w-8 h-8 flex justify-center items-center"
        >
          +
        </button>
      </div>

      {/* Price */}
      <p className="font-medium text-xl mr-5">${price}</p>

      {/* Remove button */}
      <div className="flex flex-col items-center mr-5 pr-4 cursor-pointer" onClick={() => removeFromCart(itemName)}>
        <img src="remove.svg" alt="Remove" />
      </div>
    </div>
  );
};

export default CartCard;
