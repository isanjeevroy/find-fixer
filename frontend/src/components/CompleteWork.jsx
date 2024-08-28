import React, { useState } from 'react';
import axios from 'axios';

const CompleteWork = ({ workId, onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isLoggedIn = localStorage.getItem('customerToken'); // Replace with actual token key

    if (!isLoggedIn) {
      alert('Please log in to submit feedback.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/workHistory/complete/${workId}`, {
        feedback,
        rating
      }, {
        headers: {
          Authorization: `Bearer ${isLoggedIn}`,
        }
      });
      console.log('Update response:', response.data);
      alert('Feedback submitted successfully!');
      onClose(); // Close the form after successful submission
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Submission failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='complete-work'>
      <h2>Complete Work</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Feedback:
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </label>
        <label>
          Rating:
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default CompleteWork;
