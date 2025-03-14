import React, { createContext, useState, useEffect } from "react";
import Data from "../Data.json";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  
  const [itemsAdded, setitemsAdded] = useState(() => {
    return Number(localStorage.getItem("itemsAdded")) || 0;
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  useEffect(() => {
    localStorage.setItem("itemsAdded", itemsAdded);
  }, [itemsAdded]);

  return (
    <Context.Provider value={{ cart, setCart, Data, itemsAdded, setitemsAdded }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
