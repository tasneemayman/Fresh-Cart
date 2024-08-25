import React, { createContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const WishlistContext = createContext();

export function WishlistContextProvider({ children }) {
    const headers = {
        token: localStorage.getItem('token')
    };

    async function getWishlist() {
        try {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers });
            if (response.status === 200) {
                return response.data.data; // Adjust based on your API response structure
            } else {
                console.error('API response error:', response.status);
                return null;
            }
        } catch (error) {
            console.error('API request failed:', error);
            return null;
        }
    }

    async function addProductToWishlist(productId) {
        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', 
                { productId }, 
                { headers }
            );
            if (response.status === 200) {
                return response.data;
            } else {
                console.error('API response error:', response.status);
                return null;
            }
        } catch (error) {
            console.error('API request failed:', error);
            return null;
        }
    }

    async function removeProductFromWishlist(productId) {
        try {
            const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
            if (response.status === 200) {
                return response.data;
            } else {
                console.error('API response error:', response.status);
                return null;
            }
        } catch (error) {
            console.error('API request failed:', error);

            return null;
        }
    }

    return (
        <WishlistContext.Provider value={{ getWishlist, addProductToWishlist, removeProductFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}
