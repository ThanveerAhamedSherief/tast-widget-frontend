import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ token, setTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError('Please fill out both fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/submit`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('New task submitted:', response.data);

      const newTask = response.data.data;

      console.log('Previous tasks:', await setTasks);
      setTasks((prevTasks) => {
        const updatedTasks = [newTask, ...prevTasks];
        console.log('Updated tasks:', updatedTasks);
        return updatedTasks;
      });

      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error submitting task:', error);
      setError('Failed to submit task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Submit a New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
