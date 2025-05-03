import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import API from '../services/api';
import TaskForm from '../components/Tasks/TaskForm';
import TaskCard from '../components/Tasks/TaskCard';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/tasks', {
        headers: {
          Authorization: token,
        },
      });
      setTasks(res.data);
    } catch (err) {
      alert('Error fetching tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <TaskForm onTaskCreated={fetchTasks} />
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </Container>
  );
};

export default Dashboard;