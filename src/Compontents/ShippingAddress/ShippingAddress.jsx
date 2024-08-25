import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function CheckoutForm() {
 const {cartId} = useParams()
  const [shippingAddress, setShippingAddress] = useState({
    
    details: '',
    phone: '',
    city: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/orders/checkout-session/'+cartId,
        {
          shippingAddress: {
            details: shippingAddress.details,
            phone: shippingAddress.phone,
            city: shippingAddress.city
          }
        },{
          headers:
          {token:localStorage.getItem('token')}
        ,params:{
              url:'http://localhost:5173'
            }
      });
      console.log('Checkout successful:', response.data.session.url);
      location.href = response.data.session.url;
    } catch (error) {
      console.error('Checkout failed:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-40 mb-20  w-1/2  mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-700 text-center">Add Your Shipping Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4 p-10">
        <div className="relative">
          <input
            type="text"
            name="details"
            value={shippingAddress.details}
            onChange={handleChange}
            required
            className="font-medium peer w-full px-10 py-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <label className="font-medium absolute top-2 left-4 text-gray-600 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 transition-all duration-300 peer-focus:-top-1 peer-focus:text-gray-700 peer-focus:text-sm">
            Details
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            name="phone"
            value={shippingAddress.phone}
            onChange={handleChange}
            required
            className="font-medium peer w-full px-4 py-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <label className="font-medium absolute top-2 left-4 text-gray-600 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 transition-all duration-300 peer-focus:-top-1 peer-focus:text-gray-700 peer-focus:text-sm">
            Phone
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            name="city"
            value={shippingAddress.city}
            onChange={handleChange}
            required
            className=" font-medium peer w-full px-6 py-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <label className="font-medium absolute top-2 left-4 text-gray-600 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 transition-all duration-300 peer-focus:-top-1 peer-focus:text-gray-700 peer-focus:text-sm">
            City
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg text-white font-bold ${loading ? 'bg-green-800' : 'bg-green-500 hover:bg-green-600'} transition-colors duration-300`}
        > {loading ?<i className="fa-solid fa-spinner fa-spin"></i>  : 'Checkout'}
        </button>
      </form>
    </div>
  );
}
