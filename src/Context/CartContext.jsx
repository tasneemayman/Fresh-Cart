import axios from "axios";
import { createContext } from "react";
import toast from "react-hot-toast";
export const CartContext = createContext();

export function CartContextProvider(props) {
    const headers = localStorage.getItem('token') !== null ? {
        token: localStorage.getItem('token')
    } : {};

    async function getLoggedUserCart() {
        try {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: headers
            });
            if (response.status === 200) {
                return response;
            } else {
                console.error('API response error:', response.status);
                return null;
            }
        } catch (error) {
            console.error('API request failed:', error);
            return null;
        }
    }

    async function addProductTOCart(productId){
        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
                {productId:productId}
                ,{
                headers: headers
            });
            if (response.status === 200) {
                return response;
            } else {
                console.error('API response error:', response.status);
                return null;
            }
        } catch (error) {
            console.error('API request failed:', error);
            return null;
        }
    }
    async function updateProductCount(productId, count) {
        try {
            const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, 
                { count }, 
                { headers: headers }
            );
            console.log('Product count updated:', response.data);
            return response;
        } catch (error) {
            console.error('API response error:', error.response ? error.response.data : error.message);
            return null;
        }
    }
    
    async function deleteProduct(productId) {
        try {
            const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, 
                { headers: headers }
            );
            console.log('Product count updated:', response.data);
            return response;
        } catch (error) {
            console.error('API response error:', error.response ? error.response.data : error.message);

            return null;
        }
    }

    return (
        <CartContext.Provider value={{ getLoggedUserCart ,addProductTOCart ,updateProductCount,deleteProduct}}>
            {props.children}
        </CartContext.Provider>
    );
}
