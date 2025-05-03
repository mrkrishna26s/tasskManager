import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import API from '../services/api';
import TaskForm from '../components/Tasks/TaskForm';
import TaskCard from '../components/Tasks/TaskCard';
import TaskFilters from '../components/Tasks/TaskFilters';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    dueDate: ''
  });

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams(filters);
      const res = await API.get(`/tasks?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
      <TaskFilters filters={filters} setFilters={setFilters} onSearch={fetchTasks} />
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </Container>
  );
};

export default Dashboard;