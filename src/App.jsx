// src/App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoadingProvider } from './Context/LoadingContext';
import { UserContextProvider } from './Context/UserContext';
import Layout from './Compontents/Layout/Layout';
import Home from './Compontents/Home/Home';
import Product from './Compontents/Products/Product';
import Cart from './Compontents/Cart/Cart';
import Catgories from './Compontents/Catgories/Catgories';
import Brands from './Compontents/Brands/Brands';
import Wishlist from './Compontents/Wishlist/Wishlist';
import Productdetails from './Compontents/Productdetails/Productdetails';
import Notfound from './Compontents/Notfound/Notfound';
import Register from './Compontents/Register/Register';
import Login from './Compontents/Login/Login';
import ProtectedRoute from './Compontents/ProtectedRoute/ProtectedRoute';
import CatgoriesSlider from './Compontents/CatgoriesSlider/CatgoriesSlider';
import { CartContext, CartContextProvider } from './Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import ShippingAddress from './Compontents/ShippingAddress/ShippingAddress';
import AllOrders from './Compontents/Orders/AllOrders';
import { CartCountProvider } from './Context/CartCountCountext';
import { WishlistContextProvider } from './Context/WishListContext';
import ForgetPassword from './Compontents/ForgetPassword/ForgetPassword';
import RestPassword from './Compontents/RestPassword/RestPassword';


const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { index: true, path: '/', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'Product', element: <ProtectedRoute><Product /></ProtectedRoute> },
      { path: 'Cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'Wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: 'Brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'Catgories', element: <ProtectedRoute><Catgories /></ProtectedRoute> },
      { path: 'Productdetails/:id/:category', element: <ProtectedRoute><Productdetails /></ProtectedRoute> },
      { path: 'CatgoriesSlider/:categoryid', element: <ProtectedRoute><CatgoriesSlider /></ProtectedRoute> },
      { path: 'ShippingAddress/:cartId', element: <ProtectedRoute><ShippingAddress/></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><AllOrders/></ProtectedRoute> },
      { path: 'ForgetPassword', element:<ForgetPassword/> },
      { path: 'RestPassword', element:<RestPassword/> },
      { path: 'Register', element: <Register /> },
      { path: 'Login', element: <Login /> },
      { path: '*', element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <LoadingProvider>
      <UserContextProvider>
        <CartContextProvider>
          <CartCountProvider>
            <WishlistContextProvider>
            <RouterProvider router={router} />
            </WishlistContextProvider>
            <Toaster />
          </CartCountProvider>
        </CartContextProvider>
      </UserContextProvider>
    </LoadingProvider>
  );
}

export default App;



