import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLoading } from '../../Context/LoadingContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { Helmet } from 'react-helmet';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    // Fetch brands
    setLoading(true);
    axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      .then(({ data }) => {
        setBrands(data.data);
      })
      .catch((error) => {
        console.error('Error fetching brands:', error);
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Helmet><title>Brands</title></Helmet>
      {loading && <LoadingSpinner />}
      <h1 className='mt-20 text-center text-2xl font-bold font-serif'>All Brands</h1>
      <div className=" w-3/4 container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-7">
        {brands.map((brand) => (
          <div key={brand._id} className="bg-white shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
            {/* Image */}
            <img src={brand.image} alt={brand.name} className="w-50 h-40 object-cover m-auto" />
            {/* Content */}
            <div className="p-4">
              {/* Title */}
              <h3 className="text-xl font-semibold mb-3 text-center">{brand.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
