import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Box, Grid, Typography, Button, Chip, Divider, Paper,
  Avatar, List, ListItem, ListItemIcon, ListItemText, CircularProgress,
  Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import {
  LocationOn, AccessTime, AttachMoney, Work, Business,
  Bookmark, BookmarkBorder, Share, Flag, ArrowBack, Send
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import apiClient from '../services/apiClient';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  
  const [job, setJob] = useState(null);
  const [company, setCompany] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [application, setApplication] = useState({ coverLetter: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        // Fetch job details
        const jobResponse = await apiClient.get(`/jobs/${id}`);
        setJob(jobResponse.data);
        
        // Fetch company details
        const companyResponse = await apiClient.get(`/companies/${jobResponse.data.companyId}`);
        setCompany(companyResponse.data);
        
        // Fetch similar jobs
        const similarJobsResponse = await apiClient.get('/jobs', {
          params: { category: jobResponse.data.category, limit: 3 }
        });
        setSimilarJobs(similarJobsResponse.data.filter(j => j.id !== id));
        
        // Check if job is saved
        if (isAuthenticated()) {
          const savedJobsResponse = await apiClient.get('/jobs/saved');
          setSaved(savedJobsResponse.data.some(j => j.id === id));
        }
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, isAuthenticated]);

  const handleToggleSave = async () => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }
    
    try {
      if (saved) {
        await apiClient.delete(`/jobs/${id}/save`);
      } else {
        await apiClient.post(`/jobs/${id}/save`);
      }
      setSaved(!saved);
    } catch (err) {
      console.error('Error toggling save status:', err);
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }
    
    try {
      setSubmitting(true);
      await apiClient.post(`/jobs/${id}/apply`, application);
      setApplyDialogOpen(false);
      // Show success message or redirect
    } catch (err) {
      console.error('Error applying for job:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!job) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">Job not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        Back to Jobs
      </Button>
      
      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
              <Box display="flex" alignItems="center">
                <Avatar src={company?.logo} alt={company?.name} sx={{ width: 70, height: 70, mr: 2 }} />
                <Box>
                  <Typography variant="h4" component="h1" fontWeight="bold" mb={1}>
                    {job.title}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {company?.name}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Button 
                  startIcon={saved ? <Bookmark /> : <BookmarkBorder />}
                  onClick={handleToggleSave}
                >
                  {saved ? 'Saved' : 'Save'}
                </Button>
                <Button startIcon={<Share />}>Share</Button>
              </Box>
            </Box>
            
            <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
              <Chip icon={<LocationOn />} label={job.location} />
              <Chip icon={<Work />} label={job.type} />
              <Chip icon={<AttachMoney />} label={job.salary} />
              <Chip icon={<AccessTime />} label={`Posted on ${new Date(job.postedDate).toLocaleDateString()}`} />
            </Box>
            
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              onClick={() => setApplyDialogOpen(true)}
              sx={{ mb: 3 }}
            >
              Apply Now
            </Button>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Job Description
            </Typography>
            <Typography paragraph>
              {job.description}
            </Typography>
            
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Requirements
            </Typography>
            <Typography paragraph>
              {job.requirements}
            </Typography>
            
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Benefits
            </Typography>
            <Typography paragraph>
              {job.benefits}
            </Typography>
            
            <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
              <Typography variant="h6" width="100%" mb={1}>
                Skills:
              </Typography>
              {job.skills?.map((skill) => (
                <Chip key={skill} label={skill} />
              ))}
            </Box>
          </Paper>
        </Grid>
        
        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              About the Company
            </Typography>
            
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar src={company?.logo} alt={company?.name} sx={{ width: 50, height: 50, mr: 2 }} />
              <Typography variant="h6" color="primary">
                {company?.name}
              </Typography>
            </Box>
            
            <Typography paragraph>
              {company?.description?.substring(0, 200)}...
            </Typography>
            
            <List>
              <ListItem>
                <ListItemIcon><Business /></ListItemIcon>
                <ListItemText primary={`Industry: ${company?.industry}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon><LocationOn /></ListItemIcon>
                <ListItemText primary={`Location: ${company?.location}`} />
              </ListItem>
            </List>
            
            <Button variant="outlined" fullWidth onClick={() => navigate(`/companies/${company?.id}`)}>
              View Company Profile
            </Button>
          </Paper>
          
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Similar Jobs
            </Typography>
            
            {similarJobs.map((job) => (
              <Box key={job.id} mb={2} p={2} sx={{ '&:hover': { bgcolor: 'grey.100' }, cursor: 'pointer' }}
                onClick={() => navigate(`/jobs/${job.id}`)}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {job.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.company}
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <LocationOn fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">{job.location}</Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
      
      {/* Apply Dialog */}
      <Dialog open={applyDialogOpen} onClose={() => setApplyDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Apply for {job.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" mb={2}>
            You are applying to {job.title} at {company?.name}
          </Typography>
          <TextField
            label="Cover Letter"
            multiline
            rows={6}
            fullWidth
            value={application.coverLetter}
            onChange={(e) => setApplication({ ...application, coverLetter: e.target.value })}
            placeholder="Explain why you're a good fit for this position..."
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApplyDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleApply}
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={20} /> : <Send />}
          >
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default JobDetailPage;
