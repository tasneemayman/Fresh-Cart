import React from 'react';
import { Link } from 'react-router-dom';

const AllOrders = ( ) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {`All Orders Done!`}
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          You have successfully completed all your orders. Thank you for shopping with us!
        </p>
        <div className="mt-6">
          <Link to={'/'} className="font-medium px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;

