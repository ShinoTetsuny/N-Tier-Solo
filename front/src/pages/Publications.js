import { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Card, CardContent, 
  Button, TextField, Dialog, DialogTitle, 
  DialogContent, DialogActions 
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { publicationService } from '../services/api';

const Publications = () => {
  const { isAuthenticated } = useAuth();
  const [publications, setPublications] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = async () => {
    try {
      const response = await publicationService.getAll();
      setPublications(response.data.data);
    } catch (error) {
      console.error('Erreur de chargement des publications:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await publicationService.update(editingId, formData);
      } else {
        await publicationService.create(formData);
      }
      setOpen(false);
      setFormData({ title: '', content: '' });
      setEditingId(null);
      loadPublications();
    } catch (error) {
      console.error('Erreur lors de l\'opération:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await publicationService.delete(id);
      loadPublications();
    } catch (error) {
      console.error('Erreur de suppression:', error);
    }
  };

  const handleEdit = (publication) => {
    setFormData({ title: publication.title, content: publication.content });
    setEditingId(publication._id);
    setOpen(true);
  };

  const handleCreate = async (publicationData) => {
    if (!isAuthenticated) {
      alert('Vous devez être connecté pour créer une publication');
      return;
    }

    try {
      const response = await publicationService.create(publicationData);
      setPublications(prev => [response.data.data, ...prev]);
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Publications
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
          Nouvelle Publication
        </Button>

        {publications.map((pub) => (
          <Card key={pub._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{pub.title}</Typography>
              <Typography variant="body1">{pub.content}</Typography>
              <Box sx={{ mt: 2 }}>
                <Button onClick={() => handleEdit(pub)} sx={{ mr: 1 }}>
                  Modifier
                </Button>
                <Button onClick={() => handleDelete(pub._id)} color="error">
                  Supprimer
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}

        <Dialog open={open} onClose={() => {
          setOpen(false);
          setFormData({ title: '', content: '' });
          setEditingId(null);
        }}>
          <DialogTitle>{editingId ? 'Modifier la publication' : 'Nouvelle publication'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Titre"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Contenu"
              fullWidth
              multiline
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setOpen(false);
              setFormData({ title: '', content: '' });
              setEditingId(null);
            }}>
              Annuler
            </Button>
            <Button onClick={handleSubmit}>
              {editingId ? 'Modifier' : 'Créer'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Publications; 