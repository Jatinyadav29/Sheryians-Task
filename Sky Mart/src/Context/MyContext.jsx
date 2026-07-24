import { createContext, useEffect, useState } from "react";

export const MyStore = createContext();

export const ContextProvider = ({ children }) => {
  const [productsData, setProductsData] = useState([]);

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || [],
  );
  console.log(cartItems);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  let clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (productId) => {
    return cartItems.some((val) => val.id === productId);
  };

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null,
  );

  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || [],
  );

  const incQuantity = (id) => {
    setCartItems((prev) => {
      return prev.map((val) => {
        return val.id === id ? { ...val, quantity: val.quantity + 1 } : val;
      });
    });
  };

  const decQuantity = (id) => {
    setCartItems((prev) => {
      return prev.map((val) => {
        return val.id === id ? { ...val, quantity: val.quantity - 1 } : val;
      });
    });
  };

  const removeItem = (id) => {};

  return (
    <MyStore.Provider
      value={{
        cartItems,
        setCartItems,
        users,
        setUsers,
        currentUser,
        setCurrentUser,
        productsData,
        setProductsData,
        isInCart,
        incQuantity,
        decQuantity,
        clearCart,
      }}
    >
      {children}
    </MyStore.Provider>
  );
};
