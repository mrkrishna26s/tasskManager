import React from 'react';
import { Typography } from '@mui/material';

const OverdueBadge = ({ dueDate, status }) => {
  const isOverdue = new Date(dueDate) < new Date() && status !== 'Completed';

  if (!isOverdue) return null;

  return (
    <Typography variant="body2" color="error" sx={{ fontWeight: 'bold' }}>
      ⚠️ Overdue
    </Typography>
  );
};

export default OverdueBadge;