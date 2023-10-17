import axios from "axios";
import React, { useState } from "react";
import { createContext } from "react";
import { API_GET_CART_ITEM } from "../service/api";
import Cookies from "js-cookie";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [countCartItem, setCountCartItem] = useState();
  const fetchCountCartItem = async () => {
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
    if (user && user.token) {
      const userToken = user.token;
      try {
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const response = await axiosInstance.get(API_GET_CART_ITEM);
        if (response && response.status === 200) {
          setCountCartItem(response.data.length);
        } else {
          setCountCartItem(0);
        }
      } catch (error) {
        setCountCartItem(0);
      }
    }
  };
  return (
    <AppContext.Provider
      value={{ countCartItem, setCountCartItem, fetchCountCartItem }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
