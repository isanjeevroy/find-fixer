import React, { useState } from 'react';
import axios from 'axios';

const WorkerSearch = () => {
  const [workType, setWorkType] = useState('');
  const [location, setLocation] = useState('');
  const [workers, setWorkers] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get('http://localhost:8080/api/customer/search?', {
        params: { workType, location },
      });
      setWorkers(res.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Work Type"
          value={workType}
          onChange={(e) => setWorkType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {workers.map((worker) => (
          <li key={worker._id}>
            {worker.name} - {worker.workType} - {worker.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkerSearch;
