import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/images/logo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartCountContext } from '../../Context/CartCountCountext';

export default function Navbar() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  const { cartCount } = useContext(CartCountContext);
  let navigate = useNavigate();

  function logOut() {
    setuserLogin(null);
    localStorage.removeItem('token');
    navigate("/Login");
    
  }

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-20 top-0 start-0 transition-all duration-300 text-lg ${isScrolled ? "bg-slate-50" : "bg-white dark:bg-transparent"}`}>
      <div className="w-3/4 container flex flex-wrap items-center justify-between mx-auto p-3">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} width={30} alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">Fresh cart</span>
        </Link>

        <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
        <div className="relative">
            <i className="fa-solid fa-cart-arrow-down mt-3 text-xl"></i>
            {cartCount > 0 && (
              <div className="absolute -top-0 -right-2 w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-green-300 bg-opacity-90 rounded-full">
                {cartCount}
              </div>
              )} 
          </div>
          {userLogin === null ? (
            <>
              <Link to="/Register" className="text-black focus:outline-none font-medium rounded-lg text-lg px-4 py-2 text-center">Register</Link>
              <Link to="/Login" className="text-black focus:outline-none font-medium rounded-lg text-lg px-4 py-2 text-center">Login</Link>
            </>
          ) : (
            <button type='button' onClick={logOut} className="text-black focus:outline-none font-medium rounded-lg text-lg px-4 py-2 text-center">LogOut</button>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-300 dark:focus:ring-gray-200">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
          </button>
        </div>

        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1${menuOpen ? 'bg-gray-200' : 'hidden'} md:block`}>
          <ul className="flex flex-col md:flex-row p-4 md:p-0 mt-4 font-medium  rounded-lg md:border-0 md:space-x-8 rtl:space-x-reverse md:mt-0">
            {userLogin !== null && (
              <>
                <li>
                  <NavLink to="/" className="block py-2 px-3 rounded" aria-current="page">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/Cart" className="block py-2 px-3 rounded">Cart</NavLink>
                </li>
                <li>
                  <NavLink to="/Wishlist" className="block py-2 px-3 rounded">Wish List</NavLink>
                </li>
                <li>
                  <NavLink to="/Product" className="block py-2 px-3 rounded">Products</NavLink>
                </li>
                <li>
                  <NavLink to="/Catgories" className="block py-2 px-3 rounded">Categories</NavLink>
                </li>
                <li>
                  <NavLink to="/Brands" className="block py-2 px-3 rounded">Brands</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
