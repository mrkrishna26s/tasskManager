import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left: App Name */}
        <Typography variant="h6" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          TaskManager
        </Typography>

        {/* Right: Socials + Auth Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Social Icons (open in new tab) */}
          <IconButton color="inherit" href="https://github.com/" target="_blank">
            <GitHubIcon />
          </IconButton>
          <IconButton color="inherit" href="https://linkedin.com/" target="_blank">
            <LinkedInIcon />
          </IconButton>

          {/* Auth Buttons */}
          <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
          <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;