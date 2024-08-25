import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLoading } from '../../Context/LoadingContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { CartCountContext } from '../../Context/CartCountCountext';
import { WishlistContext } from '../../Context/WishListContext';
export default function Productdetails() {
  let { id, category } = useParams();
  const [Productdetails, setProductdetails] = useState(null);
  const [relatedProduct, setrelatedProduct] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false); // State for wishlist
  const { loading, setLoading } = useLoading();
  const { addProductTOCart } = useContext(CartContext);
  const { updateCartCount } = useContext(CartCountContext);
  const { getWishlist, addProductToWishlist, removeProductFromWishlist } = useContext(WishlistContext);

  function getProductdetails(id) {
    setLoading(true);
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductdetails(data.data);
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setLoading(false);
      });
  }

  function getrelatedProduct(category) {
    setLoading(true);
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProduct = data.data;
        let allRelatedProduct = allProduct.filter((product) => product.category.name === category);
        setrelatedProduct(allRelatedProduct);
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setLoading(false);
      });
  }

  async function checkIfInWishlist() {
    const wishlist = await getWishlist();
    if (wishlist && Productdetails) {
      const isInWishlist = wishlist.some(item => item.id === Productdetails.id);
      setIsInWishlist(isInWishlist);
    }
  }

  useEffect(() => {
    getProductdetails(id);
    getrelatedProduct(category);
    updateCartCount(); 
    checkIfInWishlist(); 
  }, [id, category]);

  const productImageSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const relatedProductSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  async function addProduct(productId, title) {
    try {
      await addProductTOCart(productId);
      await updateCartCount(); // Update cart count after adding product
      handleAddToCart({ title }); // Pass the actual product title
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }

  const handleAddToCart = (product) => {
    toast.success(`${product.title} added to cart!`, {
      icon: '🛒',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const handleWishlistClick = async () => {
    if (isInWishlist) {
      await removeProductFromWishlist(Productdetails.id);
      setIsInWishlist(false);
    } else {
      await addProductToWishlist(Productdetails.id);
      setIsInWishlist(true);
    }
  };

  return (
    <>
      <Helmet><title>Product Details</title></Helmet>
      {loading && <LoadingSpinner />}
      <h1 className="text-2xl font-bold text-center mt-20 font-serif">Product Details</h1>
      <div className="mt-10">
        <div className="flex flex-col md:flex-row justify-center items-center max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="w-full md:w-1/2 text-center">
            {Productdetails?.images?.length > 0 && (
              <Slider {...productImageSettings}>
                {Productdetails.images.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={`Product ${index + 1}`} width={250} className="h-auto mx-auto rounded-lg" />
                  </div>
                ))}
              </Slider>
            )}
          </div>
          <div className="w-full md:w-1/2 p-6">
            <h1 className="text-2xl font-medium mb-2 text-green-700">{Productdetails?.title}</h1>
            <p className="text-black mb-2 font-semibold">{Productdetails?.description}</p>
            <p className="text-2xl font-bold mb-4">{Productdetails?.price} EGP</p>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => addProduct(Productdetails.id, Productdetails.title)} 
                className="font-bold bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
              >
                Add to Cart
              </button>
              <button 
                onClick={handleWishlistClick} 
                className="text-3xl"
              >
                <i className={`fa-heart ${isInWishlist ? 'fa-solid text-red-500' : 'fa-regular text-gray-500'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {loading && <LoadingSpinner />}
      <h1 className="text-2xl font-bold text-center mt-20 font-serif">Related Products</h1>
      <div className="container mx-auto mb-20">
        <Slider {...relatedProductSettings}>
          {relatedProduct.map((product) => (
            <div key={product._id} className="mb-5 pb-2 max-h-full max-w-sm bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <Link to={`/Productdetails/${product.id}/${product.category.name}`}>
                <div className="w-full text-center">
                  <img className="p-5 rounded-t-lg" src={product.imageCover} width={250} alt={product.title} />
                </div>
                <div className="px-5">
                  <h5 className="text-xl font-semibold tracking-tight text-green-700 text-center">{product.category.name}</h5>
                  <div className="flex justify-between">
                    <h5 className="text-lg font-semibold tracking-tight text-gray-900 font-serif">{product.title.split(' ').slice(0, 2).join(' ')}</h5>
                    <div className="flex items-center mt-2.5 mb-5">
                      <div className="flex items-center space-x-1">
                        <i className='fas fa-star text-yellow-300'></i>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">{product.ratingsAverage}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">{product.price} EGP</span>
                    <button 
                      onClick={() => addProduct(product.id, product.title)} 
                      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
