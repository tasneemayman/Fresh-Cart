import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLoading } from '../../Context/LoadingContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { Helmet } from 'react-helmet';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    // Fetch categories
    setLoading(true);
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then(({ data }) => {
        setCategories(data.data);
        // Fetch subcategories for each category
        data.data.forEach(category => {
          axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories?category=${category._id}`)
            .then(({ data }) => {
              setSubcategories(prev => ({
                ...prev,
                [category._id]: data.data // Store subcategories by category ID
              }));
            })
            .catch((error) => {
              console.error('Error fetching subcategories:', error);
            }).finally(() => {
              setLoading(false);
            });
        });
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <>
      <Helmet><title>Categories</title></Helmet>
      {loading && <LoadingSpinner />}
      <h1 className='mt-20 text-center text-2xl font-bold font-serif'>Categories</h1>
      <div className=" w-3/4 container mx-auto mt-10 mb-7">
        {categories.map((category) => (
          <div key={category._id} className="mb-10">
            {/* Category */}
            <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row mb-6 text-center">
              {/* Image */}
              <img src={category.image} alt={category.name} className="w-full md:w-1/3 h-40 object-contain rounded-t-lg md:rounded-none md:rounded-l-lg" />
              {/* Content */}
              <div className="p-4 flex flex-col justify-between w-full md:w-2/3">
                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 text-center md:text-left">{category.name}</h3>
                {/* Subcategories */}
                <div className="flex flex-wrap gap-4 mt-auto">
                  {(subcategories[category._id] || []).map((subcategory) => (
                    <div key={subcategory._id} className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0">
                      <div className="bg-gray-100 w-full flex items-center justify-center rounded-lg">
                        <p className="text-center text-lg font-serif font-medium ">{subcategory.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
