import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm'; 
import '../App.css'; 

const Dashboard = ({ token }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks`, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => setTasks(response.data))
        .catch((error) => console.error('Failed to fetch tasks', error));
    }
  }, [token]);

  return (
    <div className="dashboard">
      <h1>Task Dashboard</h1>

      <TaskForm token={token} setTasks={setTasks} />

      <div>
        <h2>My Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
