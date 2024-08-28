import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const CustomerRegister = () => {
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    profile:''
  });

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8082/api/auth/register/customer', customerData);
      console.log(res.data);
      navigate("/customer/login")
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-24 max-w-md mx-auto p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-md">
         <h1 className='font-bold text-center mb-3 text-2xl'>Worker Registration </h1>
  <input
    type="text"
    name="name"
    placeholder="Name"
    onChange={handleChange}
    className="mb-4 w-full p-2 text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
  <input
    type="email"
    name="email"
    placeholder="Email"
    onChange={handleChange}
    className="mb-4 w-full p-2 text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
  <input
    type="text"
    name="address"
    placeholder="Address"
    onChange={handleChange}
    className="mb-4 w-full p-2 text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
  <input
    type="password"
    name="password"
    placeholder="Password"
    onChange={handleChange}
    className="mb-6 w-full p-2 text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
  <input
    type="file"
    name="profile"
    placeholder="upload your profile"
    onChange={handleChange}
    required
  />
  <button
    type="submit"
    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
  >
    Register
  </button>
  <p className='mt-2 text-center'>Already you have account ? <span className='text-black font-bold'><Link to="/customer/login">login</Link></span></p>
</form>

  );
};

export default CustomerRegister;
