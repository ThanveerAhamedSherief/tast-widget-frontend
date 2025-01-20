import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/LoginForm';


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Router>
      <div className="container">
        {token && <button onClick={handleLogout}>Logout</button>}
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/dashboard" /> : <Login setToken={setToken} />}
          />
          <Route
            path="/dashboard"
            element={token ? <Dashboard token={token} /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
