import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate,  } from "react-router-dom";
import CartCard from "../components/CartCard";
import { Context } from "../utils/ContextProvider";

const Cart = () => {
  const { cart, setCart,order,setOrder } = useContext(Context);
  const cartData = localStorage.getItem("cartItem");
  console.log(cartData);
  const [Discount, setDiscount] = useState(20);
  const [Price, setPrice] = useState(0);
  // Function to calculate the total price
  const calculateTotalPrice = () => {
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
    });
    setPrice(total);
  };
  const Navigate = useNavigate();
  // Function to remove an item from the cart
    const removeFromCart = (itemName) => {
     let updatedCart = cart.filter(item => item.name !== itemName)
     setCart(updatedCart)
    };

    useEffect(()=>{
        console.log("Cart: ",cart)
    },[cart])
  
    

    const decreaseQuantity = (name) => {
      setCart(prevCart =>
        prevCart.map(item =>
          item.name === name && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    };
    
    const increaseQuantity = (name) => {
      setCart(prevCart =>
        prevCart.map(item =>
          item.name === name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    };
    const orderProduct = () => {
      if (cart.length !== 0) {
        const updatedOrder = [...order];
        Navigate('/buy')
    
        cart.forEach((cartItem) => {
          const index = updatedOrder.findIndex((orderItem) => orderItem.name === cartItem.name);
    
          if (index !== -1) {
            // Item exists → increase quantity
            updatedOrder[index].quantity += cartItem.quantity;
          } else {
            // New item → add to order
            updatedOrder.push({ ...cartItem });
          }
        });
    
        setOrder(updatedOrder); // Update the state with merged items
        console.log("order: ", updatedOrder); // Check the merged order
        setCart([]); // Clear the cart after adding
      } else {
        setOrder([...order, ...cart]); // If cart is not empty, merge cart to order
      }
    };
    
    
    console.log(order);
    
  
  
  

  // Recalculate the total price when the cart changes
  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  return (
    <>
      <div className="flex items-center gap-2 text-gray-400 pt-8 px-12">
        <Link to="/">Home</Link>
        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="12px" fill="#99a1af">
          <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
        </svg>
        <span className="text-black">Cart</span>
      </div>

      <div className="flex">
        {/* Cart Products Section */}
        <div className="overflow-y-hidden pt-3 cart-box w-[50vw] h-[70vh] mt-6 ml-12 rounded-3xl">
          <h1 className="text-3xl flex items-center gap-4 ml-4 my-3">
            Cart <span className="text-[0.9rem] font-light text-[#888888]">({cart.length} Products)</span>
          </h1>
          <div className="my-4 flex justify-between items-center ml-10 font-medium">
            <h1>Product</h1>
            <h1 className="ml-12">Count</h1>
            <h1>Price</h1>
            <div></div>
          </div>
          <div className="border-[1px] border-[#88888839] mx-4 rounded-2xl"></div>
          <div className="overflow-y-auto box rounded-2xl h-[55vh] relative">
            {cart.length ? (
              cart.map((item,index) => (
                <CartCard
                  key={index}
                  id = {index}
                  src={item.src}
                  itemName={item.name}
                  category={item.category}
                  price={(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}
                  quantity={item.quantity || 1}
                  removeFromCart={removeFromCart}
                  decrease = {decreaseQuantity} 
                  increase = {increaseQuantity}// Pass the remove function
                />
              ))
            ) : (
              <h1 className="text-2xl m-5 text-gray-400 font-extralight absolute top-50 left-1/2 -translate-x-[50%] -translate-y-[50%]">
                No items in cart
              </h1>
            )}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="cart-box overflow-y-auto rounded-xl w-[40vw] h-[58vh] mt-6 ml-12 bg-[#f7f7f730]">
          <h1 className="text-2xl m-5">Order Summary</h1>
          <div className="border-[1px] border-[#88888839] mx-4 rounded-2xl"></div>
          <div className="flex justify-between items-center mx-8 my-4">
            <h1 className="font-normal text-[#888888]">Subtotal :</h1>
            <h1 className="font-semibold">${Price.toFixed(2)}</h1> {/* Display total price */}
          </div>
          <div className="border-[1px] border-[#88888839] mx-4 rounded-2xl"></div>
          <div className="flex justify-between items-center mx-8 my-4">
            <h1 className="font-normal text-[#888888]">Discount :</h1>
            <h1 className="font-semibold">{Discount}%</h1>
          </div>
          <div className="border-[1px] border-[#88888839] mx-4 rounded-2xl"></div>
          <div className="flex justify-between items-center mx-8 my-4">
            <h1 className="font-normal text-[#888888]">Total :</h1>
            <h1 className="font-semibold ">${(Price - Price * (Discount / 100)).toFixed(2)}</h1>
          </div>
          <h1 className="font-light text-small text-center mt-15">
            Need Help? <Link to='/contact' className="text-blue-500">Contact Us</Link>
          </h1>
          <div className="flex justify-center items-center mt-12">
            <button className="bg-black text-white w-full mx-4 mt-3 py-3 rounded cursor-pointer"
              onClick={()=>orderProduct()}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
