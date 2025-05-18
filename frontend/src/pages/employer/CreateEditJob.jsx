import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Paper,
  Alert
} from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import JobForm from '../../components/forms/JobForm';
import { JobService } from '../../services';

const CreateEditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!isEditMode) return;
      
      setLoading(true);
      try {
        const jobData = await JobService.getJobById(id);
        setJob(jobData);
      } catch (err) {
        console.error('Error fetching job:', err);
        setError('Failed to load job data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchJob();
  }, [id, isEditMode]);

  const handleSubmitSuccess = () => {
    navigate('/employer/jobs');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link color="inherit" href="/employer/dashboard">
            Dashboard
          </Link>
          <Link color="inherit" href="/employer/jobs">
            Manage Jobs
          </Link>
          <Typography color="text.primary">
            {isEditMode ? 'Edit Job' : 'Create Job'}
          </Typography>
        </Breadcrumbs>
        
        <Typography variant="h4" component="h1" sx={{ mt: 2, mb: 4, fontWeight: 'bold' }}>
          {isEditMode ? 'Edit Job' : 'Create a New Job'}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <JobForm 
          jobId={id} 
          onSubmitSuccess={handleSubmitSuccess} 
        />
      </Box>
    </Container>
  );
};

export default CreateEditJob;
