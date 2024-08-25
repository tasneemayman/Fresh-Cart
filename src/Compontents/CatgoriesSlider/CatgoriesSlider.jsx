import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CatgoriesSlider() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mt-20 font-serif mb-6">Categories</h2>
      {categories.length > 0 && (
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category._id} className="p-7 ">
              <div className="bg-white shadow-md rounded-lg overflow-hidden w-full">
                <img src={category.image} alt={category.name} className=" rounded w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-800 text-center">{category.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

