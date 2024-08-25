import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { useLoading } from '../../Context/LoadingContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { CartCountContext } from '../../Context/CartCountCountext';


export default function Cart() {
  let { getLoggedUserCart, updateProductCount, deleteProduct } = useContext(CartContext);
  const [CartDetails, setCartDetails] = useState(null);
  const { loading, setLoading } = useLoading();
  const { updateCartCount } = useContext(CartCountContext); // Use CartCountContext

  async function getCartItem() {
    setLoading(true);
    try {
      let response = await getLoggedUserCart();
      console.log(response.data.data);
      setCartDetails(response.data.data);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateCartCountHandler(count, productId) {
    try {
      let response = await updateProductCount(count, productId);
      if (response) {
        console.log(response.data.data);
        setCartDetails(response.data.data);
        updateCartCount(); // Update cart count after modifying product quantity
      } else {
        console.error('Failed to update cart count due to API error');
      }
    } catch (error) {
      console.error('Failed to update cart count:', error);
    }
  }

  async function deleteProductitems(productId) {
    try {
      let response = await deleteProduct(productId);
      if (response) {
        getCartItem();
        updateCartCount(); // Update cart count after deleting a product
      } else {
        console.error('Failed to delete product due to API error');
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  }

  async function ClearCart() {
    try {
      let response = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
          token: localStorage.getItem('token')
        }
      });
      if (response) {
        setCartDetails(null);
        updateCartCount(); // Update cart count after clearing the cart
      }
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  }

  useEffect(() => {
    getCartItem();
  }, []);

  return (
    <>
      <Helmet><title>Cart</title></Helmet>
      {loading && <LoadingSpinner />}
      <h1 className='mt-20 text-center text-2xl font-bold font-serif'>Shopping Cart</h1>
      <div className="w-3/4 flex flex-col items-center mt-5 bg-white shadow-md p-8 rounded-lg container m-auto">
        <p className="text-gray-800 font-semibold">Total: ${CartDetails ? CartDetails.totalCartPrice : 0}</p>
        <p className="text-gray-800 font-semibold">Total number of items: {CartDetails ? CartDetails.products.length : 0}</p>
        <Link to={'/ShippingAddress/' + CartDetails?._id}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-14 rounded mt-2">
          Proceed to Checkout
        </Link>
      </div>
      {CartDetails?.products.map((item, index) => (
        <div key={`${item.product.id}-${index}`} className="w-3/4 m-auto flex items-center justify-center bg-white shadow-md p-8 rounded-lg mt-20 container">
          <img src={item.product.imageCover} className="object-cover rounded-md" width={150} />
          <div className="flex-1 ml-4">
            <h3 className="text-lg font-semibold">{item.product.title}</h3>
            <p className="text-gray-600 font-bold">EGP {item.price}</p>
            <div className="flex items-center mt-2">
              <button
                onClick={() => updateCartCountHandler(item.count - 1, item.product.id)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded-l">
                -
              </button>
              <span className="px-4 font-medium">{item.count || 1}</span>
              <button
                onClick={() => updateCartCountHandler(item.count + 1, item.product.id)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded-r">
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center mt-5">
            <button
              onClick={() => deleteProductitems(item.product.id)}
              className="text-red-500 hover:text-red-700 text-5xl font-bold">
              &times;
            </button>
          </div>
        </div>
      ))}
      <div onClick={() => ClearCart()} className='flex justify-center items-center'>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-20 rounded mt-6 mb-6">
          Clear Cart
        </button>
      </div>
    </>
  );
}

