import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkerProfile = () => {
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkerProfile = async () => {
      try {
        const token = localStorage.getItem('workerToken');
        const res = await axios.get('http://localhost:8080/api/worker/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWorker(res.data.data); // Assuming `data` contains the worker object
      } catch (error) {
        console.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkerProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!worker) {
    return <p>Error loading worker profile.</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-24">
      <h1 className="w-full font-bold text-black text-3xl text-center mb-8">Your Profile</h1>
      <div className='w-9/12 flex justify-evenly'>

        <div>
          <img src={worker.profile} alt="" />
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-4">{worker.name}</h1>
          <p className="text-gray-700 mb-2">Email: <span className="font-semibold">{worker.email}</span></p>
          <p className="text-gray-700 mb-2">Aadhar: <span className="font-semibold">{worker.adhar}</span></p>
          <p className="text-gray-700 mb-2">Work Type: <span className="font-semibold">{worker.workType}</span></p>
          <p className="text-gray-700 mb-4">Address: <span className="font-semibold">{worker.address}</span></p>

          <h2 className="text-xl font-semibold mb-4">Work History</h2>
          <ul className="space-y-4">
            {worker.workHistory && worker.workHistory.length > 0 ? (
              worker.workHistory.map((work, index) => (
                <li
                  key={work._id || index}
                  className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <p className="text-gray-800 font-semibold mb-1">Customer Name: <span className="font-normal">{work.customer.name}</span></p>
                  <p className="text-gray-800 font-semibold mb-1">Customer Email: <span className="font-normal">{work.customer.email}</span></p>
                  <p className="text-gray-800 font-semibold mb-1">Customer Address: <span className="font-normal">{work.customer.address}</span></p>
                  <p className="text-gray-800 font-semibold mb-1">Work Type: <span className="font-normal">{work.worktype}</span></p>
                  <p className="text-gray-800 font-semibold mb-1">Description: <span className="font-normal">{work.description}</span></p>
                  <p className="text-gray-800 font-semibold mb-1">Price: <span className="font-normal">{work.price}</span></p>
                  <p className="text-gray-800 font-semibold mb-1">Rating: <span className="font-normal">{work.rating}</span></p>
                  <p className="text-gray-800 font-semibold mb-1">Feedback: <span className="font-normal">{work.feedback}</span></p>
                  <p className="text-gray-800 font-semibold mb-1">Status: <span className="font-normal">{work.status}</span></p>
                </li>
              ))
            ) : (
              <li className="text-gray-600">No work history available.</li>
            )}
          </ul>
        </div>

      </div>

    </div>
  )
};

export default WorkerProfile;
