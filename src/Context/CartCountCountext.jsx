import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartCountContext = createContext();

export function CartCountProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  async function fetchCartCount() {
    const token = localStorage.getItem('token');
    if (!token) {
      setCartCount(0);
      return;
    }
  
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: { token },
      });
  
      if (response.status === 200 && response.data.numOfCartItems !== undefined) {
        setCartCount(response.data.numOfCartItems);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Cart not found, set count to 0 without logging the warning multiple times
        setCartCount(0); 
      } else {
        console.error('Failed to fetch cart count:', error.response ? error.response.data : error.message);
        setCartCount(0);
      }
    }
  }

  const updateCartCount = async () => {
    await fetchCartCount();
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartCountContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartCountContext.Provider>
  );
}
