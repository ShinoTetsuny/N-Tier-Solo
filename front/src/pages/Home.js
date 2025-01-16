import { Container, Typography, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Bienvenue
        </Typography>
        {user ? (
          <Typography variant="h5">
            Content de vous revoir, {user.username} !
          </Typography>
        ) : (
          <Typography variant="h5">
            Connectez-vous pour gérer vos publications
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Home; 