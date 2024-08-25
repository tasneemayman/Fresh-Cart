import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLoading } from '../../Context/LoadingContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';
import { CartCountContext } from '../../Context/CartCountCountext';
import { WishlistContext } from '../../Context/WishListContext'; // Import WishlistContext

export default function Product() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { loading, setLoading } = useLoading();
  const { addProductTOCart } = useContext(CartContext);
  const { updateCartCount } = useContext(CartCountContext);
  const { addProductToWishlist, wishlist = [] } = useContext(WishlistContext); // Set a default value for wishlist

  // Fetch products
  async function getProduct() {
    setLoading(true);
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  async function addProduct(product) {
    try {
      await addProductTOCart(product.id); // Add the product to the cart
      await updateCartCount(); // Update the cart count
      toast.success(`${product.title} added to cart!`, {
        icon: '🛒',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product to cart');
    }
  }

  async function handleAddToWishlist(product) {
    try {
      await addProductToWishlist(product.id);
      // Force re-render or update state
      toast.success(`${product.title} added to wishlist!`, {
        icon: '❤️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      toast.error('Failed to add product to wishlist');
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Check if product is in wishlist
  const isProductInWishlist = (productId) => {
    return wishlist && wishlist.some((item) => item.id === productId);
  };

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      {loading && <LoadingSpinner />}
      <h1 className="text-2xl font-bold text-center mt-20 font-serif">Newest Products</h1>
      <div className="flex items-center justify-center mt-10 mb-5">
        <input
          type="text"
          placeholder="Search..."
          className="search w-full max-w-3xl p-1 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="w-3/4 container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="mb-5 pb-2 bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <Link to={`/Productdetails/${product.id}/${product.category.name}`}>
                <img className="p-5 rounded-t-lg w-full" src={product.imageCover} alt={product.title} />
                <div className="px-5">
                  <h5 className="text-xl font-semibold tracking-tight text-green-700 dark:yellow-900 text-center">
                    {product.category.name}
                  </h5>
                  <div className="flex justify-between">
                    <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-600 font-serif">
                      {product.title.split(' ').slice(0, 2).join(' ')}
                    </h5>
                    <div className="flex items-center mt-2.5 mb-5">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <i className="fas fa-star text-yellow-300"></i>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="flex items-center justify-end px-2">
                <span className="mr-20 text-lg font-bold text-gray-900 dark:text-gray-700">{product.price} EGP</span>
                <i
                  className={`fa-heart text-3xl px-4 cursor-pointer ${isProductInWishlist(product.id) ? 'fa-solid text-red-500' : 'fa-regular text-gray-500'}`}
                  onClick={() => {
                    handleAddToWishlist(product);
                    // Force update by using state or a dummy update
                    setProducts(products.map(p => p.id === product.id ? {...p, inWishlist: !isProductInWishlist(product.id)} : p));
                  }}
                ></i>
                <button
                  onClick={() => addProduct(product)}
                  className="text-white bg-green-700 px-4 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

