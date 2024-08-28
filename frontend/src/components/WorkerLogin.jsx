import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {Link} from 'react-router-dom'

const WorkerLogin = () => {

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
      const res = await axios.post('http://localhost:8080/api/auth/login/worker', loginData);
      localStorage.setItem('workerToken', res.data.token);
      console.log('Login successful');
      localStorage.setItem('isLoggedIn',true)
      navigate("/worker/profile")
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-24 flex flex-col items-center w-72 mx-auto p-5 border border-gray-300 bg-gray-50  rounded-lg">
         <h1 className='font-bold text-center mb-3 text-2xl'>Worker Login </h1>
  <input
    type="email"
    name="email"
    placeholder="Email"
    required
    onChange={handleChange}
    className="mb-4 p-2 text-base w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="password"
    name="password"
    placeholder="Password"
    required
    onChange={handleChange}
    className="mb-4 p-2 text-base w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
    type="submit"
    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
  >
    Login
  </button>
  <p className='mt-2 text-center'>Don't have account ? <span className='font-bold'><Link to="/worker/register">register</Link></span></p>
</form>

  );
};

export default WorkerLogin;
