import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ workerId, worktype, description, price, onClose }) => {
  const [formData, setFormData] = useState({
    worktype: worktype,
    description: description,
    price: price,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isLoggedIn = localStorage.getItem('customerToken');
  
    if (!isLoggedIn) {
      alert('Please log in to book a worker.');
      return;
    }
  
    // Log form data for debugging
    console.log('Form Data:', formData);
  
    try {
      const response = await axios.post("http://localhost:8080/api/workHistory/book", {
        ...formData,
        workerId,
      }, {
        headers: {
          Authorization: `Bearer ${isLoggedIn}`,
        },
      });
      console.log('Booking response:', response.data);
      alert('Booking successful!');
      onClose(); // Close the form after successful booking
    } catch (error) {
      console.error('Error booking worker:', error);
      alert('Booking failed.');
    }
  };
  
  return (
    <div className="fixed inset-0  flex justify-center items-center bg-gray-800 bg-opacity-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Book Worker</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Work Type:
              <input
                type="text"
                name="worktype"
                value={formData.worktype}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description:
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Price:
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </label>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
