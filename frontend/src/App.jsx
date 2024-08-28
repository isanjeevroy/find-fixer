import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WorkerRegister from './components/WorkerRegister';
import CustomerRegister from './components/CustomerRegister';
import WorkerLogin from './components/WorkerLogin';
import CustomerLogin from './components/CustomerLogin';
import WorkerProfile from './components/WorkerProfile';
import CustomerProfile from './components/CustomerProfile';
import WorkerSearch from './components/WorkerSearch';
import Navbar from './components/Navbar'
import Logout from './components/Logout';
import WorkersList from './components/WorkersList';

const App = () => {
  return (
    <div>

    <Router>

    <Navbar/>
      <Routes>
        <Route path="/" element = {<WorkersList/>}/>
        <Route path="/worker/register" element={<WorkerRegister />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route path="/worker/login" element={<WorkerLogin />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/worker/profile" element={<WorkerProfile />} />
        <Route path="/customer/profile" element={<CustomerProfile />} />
        <Route path="/workers/search" element={<WorkerSearch />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
