import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {Link} from 'react-router-dom'

const WorkerRegister = () => {
  const navigate = useNavigate();
  const [workerData, setWorkerData] = useState({
    name: '',
    email: '',
    adhar: '',
    worktype: [],
    address: '',
    password: '',
    profile:''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setWorkerData((prevData) => ({
        ...prevData,
        worktype: checked
          ? [...prevData.worktype, value]
          : prevData.worktype.filter((type) => type !== value)
      }));
    } else {
      setWorkerData({ ...workerData, [name]: value });
    }
  };
  console.log(workerData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/register/worker', workerData);
      console.log(res.data);
      navigate("/worker/login")
    } catch (error) {
      console.error(error.response.data.message || 'Error occurred');
    }
  };

  return (
    <div className="mt-24 flex justify-center">
  
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-50 p-6 rounded-lg shadow-md">
      <h1 className='font-bold text-center mb-3 text-2xl'>Worker Registration </h1>
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        onChange={handleChange}
        className="mb-4 w-full p-2 text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        onChange={handleChange}
        className="mb-4 w-full p-2 text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="adhar"
        placeholder="Aadhar"
        required
        onChange={handleChange}
        className="mb-4 w-full p-2 text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
  
      <div className="mb-4">
        <label className="block mb-2 text-gray-700 font-semibold">Work Type:</label>
        <div className="pl-1 flex flex-wrap gap-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="worktype"
              value="Electrician"
              onChange={handleChange}
              className="mr-2"
            />
            Electrician
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="worktype"
              value="Plumber"
              onChange={handleChange}
              className="mr-2"
            />
            Plumber
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="worktype"
              value="Carpenter"
              onChange={handleChange}
              className="mr-2"
            />
            Carpenter
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="worktype"
              value="Painter"
              onChange={handleChange}
              className="mr-2"
            />
            Painter
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="worktype"
              value="Mechanic"
              onChange={handleChange}
              className="mr-2"
            />
            Mechanic
          </label>
        </div>
      </div>
  
      <input
        type="text"
        name="address"
        placeholder="Address"
        required
        onChange={handleChange}
        className="mb-4 w-full p-2 text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        onChange={handleChange}
        className="mb-6 w-full p-2 text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <p className='mt-2 text-center'>Already you have account ? <span className='text-black font-bold'><Link to="/worker/login">login</Link></span></p>
    </form>
  </div>
  
  );
};

export default WorkerRegister;
