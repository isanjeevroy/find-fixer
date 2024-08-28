import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Make an API call to log out the user
        await axios.post('http://localhost:8080/api/auth/logout'); // Replace with your actual logout endpoint
        
        // Clear any stored tokens or user data in localStorage or cookies
        localStorage.removeItem('customerToken'); // Adjust according to how you store the token
        localStorage.removeItem('workerToken'); 
        localStorage.removeItem('user');
        localStorage.setItem('isLoggedIn',false)
        
        // Redirect to the login page or home page after successful logout
        navigate('/customer/login');
      } catch (error) {
        console.error('Logout failed:', error);
        // Handle errors, e.g., show an error message
      }
    };

    handleLogout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
