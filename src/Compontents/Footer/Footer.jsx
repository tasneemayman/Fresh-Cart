import React from 'react'
import ReactDOM from 'react-dom'
import { Link, NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <>
        <div className='footer bg-slate-200  text-xl w-full bottom-0 left-0 right-0 '>
            <div className='w-3/4 container flex justify-between m-auto items-center text-black text-center font-medium text-lg'>
                <div className='col-span-4 mt-4'>
                    <h2>Contact Us</h2>
                    <p>Email: contact@info.com</p>
                    <p>Phone: +91 987 654 321</p>
                </div>
                <div className='col-span-4'>
                    <h2>Menu</h2>
                    <ul className="flex text-black">
                        <li>
                        <Link to="/Product" className="block py-2 px-3 rounded">Products</Link>
                        </li>
                        <li>
                        <Link to="/Catgories" className="block py-2 px-3 rounded">Catgories</Link>
                        </li>
                        <li>
                        <Link to="/Brands" className="block py-2 px-3 rounded">Brands</Link>
                        </li>
                    </ul>
                </div>
                <div className='col-span-4 mt-4'>
                    <h2>Follow US</h2>
                    <div className='icons mb-3'>
                        <i className="fa-brands fa-facebook mx-1 icon"></i>
                        <i className="fa-brands fa-linkedin-in mx-1 icon"></i>
                        <i className="fa-brands fa-instagram mx-1 icon"></i>
                        <i className="fa-solid fa-globe mx-1 icon"></i>
                    </div>
                </div>
            </div>
            <div className='text-center text-black p-5 bg-slate-200 font-medium text-lg'>
            <p>Copyright © FRESH CART 2024 , All rights reserved.</p>
            </div>
        </div>
    </>
  )
}
