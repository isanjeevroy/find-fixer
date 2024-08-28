import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';

const WorkersList = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/worker');
        console.log('API Response:', res.data); // Log the entire response to verify the structure

        if (res.data && res.data.success && Array.isArray(res.data.workers)) {
          console.log('Data to be set in state:', res.data.workers); // Log the exact data you're setting
          setWorkers(res.data.workers);
        } else {
          console.warn('Unexpected response structure:', res.data);
          setWorkers([]); // If response is not what you expect, set an empty array
        }
      } catch (error) {
        console.error('Error fetching workers:', error);
        setWorkers([]); // Handle error case by setting workers to an empty array
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, []);

  const handleBookWorker = (worker) => {
    console.log(worker)
    setSelectedWorker(worker);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedWorker(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log('Final Workers state:', workers); // Debugging workers state

  return (
    <div className="flex flex-col justify-center items-center mt-24">
  <h1 className="w-full font-bold text-black text-3xl text-center mb-8">Workers List</h1>
  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-9/12">
    {workers.length > 0 ? (
      workers.map((worker) => (
        <li
          key={worker._id}
          className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex flex-col items-center"
        >
          <p className="text-lg font-semibold mb-2">Name: {worker.name}</p>
          <p className="text-sm text-gray-600 mb-2">Work Type: 

          </p>
          <select>
                {worker.worktype.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
          <p className="text-sm text-gray-600 mb-4">Location: {worker.address}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => handleBookWorker(worker)}
          >
            Book
          </button>
        </li>
      ))
    ) : (
      <p className="col-span-full text-center text-gray-500">No workers available.</p>
    )}
  </ul>
  {showForm && selectedWorker && (
    <BookingForm
      workerId={selectedWorker._id}
      worktype={selectedWorker.worktype}
      description=""
      price={0}
      onClose={handleCloseForm}
    />
  )}
</div>

  );
};

export default WorkersList;
