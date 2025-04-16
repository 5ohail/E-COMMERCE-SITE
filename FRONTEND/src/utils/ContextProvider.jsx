import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cart from "../pages/Cart";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [isloggedin, setisloggedin] = useState(false);
  const [Data, setData] = useState([]);
  const [user, setUser] = useState(() => localStorage.getItem("user") || ""); // ✅ Load user from localStorage
  const [cart, setCart] = useState([]);
  const [itemsAdded, setItemsAdded] = useState(0);
  
  // 🛍️ Fetch product data once on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    // Calculate the total number of items in the cart whenever it changes
    const fetchItemsAdded = () => {
      let total = cart.length;
      setItemsAdded(total);
    };
    fetchItemsAdded();
  }, [cart]);

  // 🛒 Fetch saved cart from DB on user login
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);  // Save user to localStorage
      const fetchCart = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8080/api/products/cart/add?username=${user}`
          );
          console.log("Fetched Cart from DB:", res.data);
          setCart(res.data.cart || []);  // Set cart data or empty array if not found
        } catch (err) {
          console.error("Error fetching cart:", err);
        }
      };

      fetchCart();  // Fetch the cart only if the user is logged in
    }
  }, [user]);
  useEffect(()=>{
    console.log(cart)
  },[cart])

  // 💾 Save cart to DB when cart changes (and user is logged in)
  useEffect(() => {
    const saveCart = async () => {
      if (user) {
        try {
          await axios.post("http://localhost:8080/api/products/cart/add", {
            username: user,
            cart,
          });
        } catch (err) {
          console.error("Error saving cart:", err);
        }
      }
    };

    saveCart();  // Save the cart only when it changes
  }, [cart, user]);  // Only run when `cart` or `user` changes

  return (
    <Context.Provider
      value={{
        user,
        cart,
        setUser,
        setCart,
        Data,
        isloggedin,
        setisloggedin,
        itemsAdded,
        setItemsAdded
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
