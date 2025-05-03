import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TaskCard = ({ task }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2">{task.description}</Typography>
        <Typography variant="caption">
          Due: {new Date(task.dueDate).toLocaleDateString()} | Priority: {task.priority}
        </Typography>
        <br />
        <Typography variant="caption">
          Assigned To: {task.assignedTo?.name || 'Unassigned'} | Status: {task.status}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;