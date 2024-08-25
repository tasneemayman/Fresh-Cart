import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import Product from '../Products/Product';
import CatgoriesSlider from '../CatgoriesSlider/CatgoriesSlider';
import { useLoading } from '../../Context/LoadingContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import {Helmet} from "react-helmet";
export default function Home() {
  const { loading, setLoading } = useLoading();

  return <>
   {loading && <LoadingSpinner />}
   <Helmet><title>Home</title></Helmet>
  <div className='home flex flex-col  justify-center items-center'>
    <div className='text-center text-white'>
      <h2 className=' text-4xl font-bold mb-4 '>Welcome To The FRESH CART </h2>
      <h1 className=' text-2xl mb-4'>Your one-stop shop for all brands and categories!</h1>
      <p>Find everything you need for your Home, right here.</p>
      <Link to="/Product"><button type="button" className="mt-5  text-black bg-gradient-to-r from-white via-white to-white-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">Shop Now</button></Link>
    </div>
    <div>
    </div>
  </div>
    <CatgoriesSlider/>
    <Product/>
  </>
}
