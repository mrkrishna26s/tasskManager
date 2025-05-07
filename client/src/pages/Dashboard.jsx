import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab, Box, Typography } from '@mui/material';
import TaskCard from '../components/Tasks/TaskCard';
import TaskForm from '../components/Tasks/TaskForm';
import TaskFilters from '../components/Tasks/TaskFilters';
import API from '../services/api';
import Logout from '../components/Logout'; // ✅ Already imported

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ search: '', status: '', priority: '', dueDate: '' });
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchTasks = async (type = 'all') => {
    const token = localStorage.getItem('token');
    const query = new URLSearchParams(filters);
    if (type === 'created') query.append('createdBy', user.id);
    if (type === 'assigned') query.append('assignedTo', user.id);

    const res = await API.get(`/tasks?${query.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) fetchTasks(); // All
    if (newValue === 1) fetchTasks('created');
    if (newValue === 2) fetchTasks('assigned');
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2, mb: 2 }}>
        <Typography variant="h4">Welcome, {user?.name || 'User'}</Typography>
        <Logout /> 
      </Box>

      <Tabs value={value} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="All Tasks" />
        <Tab label="My Created Tasks" />
        <Tab label="Assigned To Me" />
        <Tab label="Create Task" />
      </Tabs>

      {value !== 3 && (
        <>
          <TaskFilters
            filters={filters}
            setFilters={setFilters}
            onSearch={() => fetchTasks(['all', 'created', 'assigned'][value])}
          />
          {tasks.length === 0 ? (
            <Typography>No tasks found.</Typography>
          ) : (
            tasks.map(task => <TaskCard key={task._id} task={task} />)
          )}
        </>
      )}

      {value === 3 && (
        <TaskForm onTaskCreated={() => fetchTasks(['all', 'created', 'assigned'][value])} />
      )}
    </Container>
  );
};

export default Dashboard;