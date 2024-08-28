import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
    <nav className="w-[100%] bg-black h-16 fixed top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-full px-4  w-9/12">
        <div className="text-white text-xl font-bold">
          <Link to="/">MyApp</Link>
        </div>

        <div className='space-x-4'>
        <Link to="/" className="text-white">Home</Link>
          <Link to="/about" className="text-white">About</Link>
          <Link to="/contact" className="text-white">Contact</Link>
        </div>
        <div className="space-x-4">
          
          <Link to="/customer/login" className="text-white">Login</Link>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
