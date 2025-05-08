import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import TaskCard from '../components/Tasks/TaskCard';
import API from '../services/api';

const AssignedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchAssignedTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get(`/tasks?assignedTo=${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      alert('Failed to fetch assigned tasks');
    }
  };

  useEffect(() => {
    fetchAssignedTasks();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Assigned To Me</Typography>
      {tasks.map(task => (
        <TaskCard key={task._id} task={task} />
      ))}
    </Container>
  );
};

export default AssignedTasks;