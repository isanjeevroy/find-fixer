import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {Link} from 'react-router-dom'

const CustomerLogin = () => {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login/customer', loginData);
      localStorage.setItem('customerToken', res.data.token);
      localStorage.setItem('isLoggedIn', true);
      console.log(res.data.token)
      navigate("/customer/profile")
      console.log('Login successful');
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-24 flex flex-col items-center w-80 mx-auto p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-md">
         <h1 className='font-bold text-center mb-3 text-2xl'>Customer Login </h1>
  <input
    type="email"
    name="email"
    placeholder="Email"
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
  <button
    type="submit"
    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
  >
    Login
  </button>
  <p className='mt-2 text-center'>Don't have account ? <span className='font-bold'><Link to="/customer/register">register</Link></span></p>
</form>

  );
};

export default CustomerLogin;
