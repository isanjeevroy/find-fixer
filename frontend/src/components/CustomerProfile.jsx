import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerProfile = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedWorkHistoryId, setSelectedWorkHistoryId] = useState(null);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState(5); // Default rating value

  useEffect(() => {
    const fetchCustomerProfile = async () => {
      try {
        const token = localStorage.getItem('customerToken');
        const res = await axios.get('http://localhost:8080/api/customer/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomer(res.data.data);
      } catch (error) {
        console.error(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerProfile();
  }, []);

  const handleCompleteWork = async () => {
    if (!selectedWorkHistoryId) return;

    try {
      const token = localStorage.getItem('customerToken');
      await axios.post(`http://localhost:8080/api/workHistory/complete/${selectedWorkHistoryId}`, {
        description,
        price,
        status: 'Completed',
        rating,
        feedback: 'Great job!', // You can also prompt for feedback if needed
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Work marked as completed!');
      setSelectedWorkHistoryId(null);
      setDescription('');
      setPrice('');
      setRating(5);
    } catch (error) {
      console.error(error.response?.data?.message);
      alert('Failed to complete work.');
    }
  };

  const openCompletionForm = (workHistoryId) => {
    setSelectedWorkHistoryId(workHistoryId);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!customer) {
    return <p>Error loading customer profile.</p>;
  }
  return (
    <div className="flex flex-col justify-center items-center mt-24">
      <h1 className="w-full font-bold text-black text-3xl text-center mb-8">Your Profile</h1>
      <div className='w-9/12 flex justify-evenly'>

        <div>
          <img src={customer.profile} alt="customer profile image" />
        </div>

        <div>
          <h1>{customer.name}</h1>
          <p>Email: {customer.email}</p>
          <p>Address: {customer.address}</p>
          <h2>Work History</h2>

          <ul>
            {customer.workHistory && customer.workHistory.length > 0 ? (
              customer.workHistory.map((work) => (
                <li key={work._id}>
                  <h3>Worker Details:</h3>
                  <p>Name: {work.worker.name}</p>
                  <p>Email: {work.worker.email}</p>
                  <p>Address: {work.worker.address}</p>
                  <h3>Work Details:</h3>
                  <p>Description: {work.description || 'No Description'}</p>
                  <p>Status: {work.status || 'No Status'}</p>
                  <p>Rating: {work.rating || 'No Rating'}</p>
                  <p>Feedback: {work.feedback || 'No Feedback'}</p>
                  <p>Work Type: {work.worktype || 'No Work Type'}</p>
                  <button onClick={() => openCompletionForm(work._id)}>Complete Work</button>
                </li>
              ))
            ) : (
              <li>No work history available.</li>
            )}
          </ul>

          {selectedWorkHistoryId && (

            <div className="completion-form">
              <h3>Complete Work for ID: {selectedWorkHistoryId}</h3>

              <label>
                Description:
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>

              <label>
                Price:
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>

              <label>
                Rating:
                <input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  min="1"
                  max="5"
                />
              </label>

              <button onClick={handleCompleteWork}>Submit</button>
              <button onClick={() => setSelectedWorkHistoryId(null)}>Cancel</button>
            </div>

          )}
        </div>
        
      </div>
    </div>
  );
};

export default CustomerProfile;
