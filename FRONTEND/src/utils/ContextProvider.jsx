import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [isloggedin, setisloggedin] = useState(false);
  const [Data, setData] = useState([]);
  const [user, setUser] = useState(() => localStorage.getItem("user") || "");
  const [cart, setCart] = useState([]);
  const [itemsAdded, setItemsAdded] = useState(0);
  const [cartFetched, setCartFetched] = useState(false); // 🆕 Added flag

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
    setItemsAdded(cart.length);
  }, [cart]);

  // 🛒 Fetch saved cart from DB on user login
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);
      const fetchCart = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8080/api/products/cart/add?username=${user}`
          );
          console.log("Fetched Cart from DB:", res.data);
          setCart(res.data.cart || []);
          setCartFetched(true); // ✅ Flag after cart fetched
        } catch (err) {
          console.error("Error fetching cart:", err);
        }
      };

      fetchCart();
    }
  }, [user]);

  // 💾 Save cart to DB — only after it's fetched
  useEffect(() => {
    const saveCart = async () => {
      if (user && cartFetched) {
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

    saveCart();
  }, [cart, user, cartFetched]);

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
        setItemsAdded,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
