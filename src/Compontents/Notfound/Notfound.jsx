import React from 'react'
import notfound from '../../assets/images/notfound2.png'
import { Helmet } from 'react-helmet';

export default function Notfound() {
  return <>
        <Helmet><title>Not Found</title></Helmet>
    <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center">
    {/* Image */}
    <img src={notfound} alt="Not Found" className="w-full max-w-lg mt-2" />

    {/* Message */}
    <p className="text-gray-500 text-lg font-medium ">It seems like the page you are looking for does not exist. 
    </p>
    <p className="text-gray-500 text-lg mb-6 font-medium">Please check the URL or return to the homepage.</p>
    {/* Action */}
    <button className="font-bold bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200">
    Go to Home page
    </button>
    </div>
  </>
}
