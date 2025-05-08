import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import TaskCard from '../components/Tasks/TaskCard';
import API from '../services/api';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchMyTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get(`/tasks?createdBy=${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      alert('Failed to fetch your tasks');
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>My Created Tasks</Typography>
      {tasks.map(task => (
        <TaskCard key={task._id} task={task} />
      ))}
    </Container>
  );
};

export default MyTasks;