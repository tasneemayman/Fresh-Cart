import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishListContext';
import { useLoading } from '../../Context/LoadingContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { CartCountContext } from '../../Context/CartCountCountext';
export default function Wishlist() {
  const { addProductTOCart } = useContext(CartContext);
  const { getWishlist, removeProductFromWishlist } = useContext(WishlistContext);
  const { updateCartCount } = useContext(CartCountContext); // Import the updateCartCount function
  const [wishlistItems, setWishlistItems] = useState([]);
  const { loading, setLoading } = useLoading();

  // Fetch wishlist items when component mounts
  useEffect(() => {
    async function fetchWishlistItems() {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await getWishlist();
        if (response) {
          setWishlistItems(response); // Adjust based on your API response structure
        }
      } catch (error) {
        console.error('Failed to fetch wishlist items:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }
    fetchWishlistItems();
  }, [getWishlist, setLoading]);

  const handleAddToCart = async (productId, title) => {
    try {
      const response = await addProductTOCart(productId);
      if (response) {
        toast.success(`${title} added to cart!`, {
          icon: '🛒',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        updateCartCount(); // Update the cart count after adding a product to the cart
      }
    } catch (error) {
      toast.error('Failed to add product to cart');
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await removeProductFromWishlist(productId);
      if (response) {
        setWishlistItems(wishlistItems.filter(item => item._id !== productId));
      }
    } catch (error) {
    }
  };

  return (
    <>
      <Helmet><title>Wish List</title></Helmet>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className='mt-20 text-center text-2xl font-bold font-serif'>My Wish List</h1>
          <div className="w-3/4 container m-auto">
            {wishlistItems.length > 0 ? (
              wishlistItems.map(item => (
                <div key={item._id} className="flex bg-white shadow-lg rounded-lg p-4 mb-4 mt-10 transform hover:scale-105 transition-transform duration-300">
                  {/* Item Image */}
                  <img src={item.imageCover} className="w-40 object-cover rounded-lg" alt={item.title} />
                  {/* Item Details */}
                  <div className="ml-4 flex-1">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-2 font-bold">${item.price}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAddToCart(item._id, item.title)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleRemoveFromWishlist(item._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-gray-800 mb-4">
                    Your wishlist is empty
                  </p>
                  <p className="text-lg text-gray-600 font-medium">
                    It looks like you haven’t added any products to your wishlist yet.
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
