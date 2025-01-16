import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
          Mon App
        </Typography>
        
        <Button color="inherit" component={Link} to="/publications" sx={{ mr: 2 }}>
          Publications
        </Button>

        {isAuthenticated ? (
          <>
            <Button color="inherit" onClick={logout}>Déconnexion</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Connexion</Button>
            <Button color="inherit" component={Link} to="/register">Inscription</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 