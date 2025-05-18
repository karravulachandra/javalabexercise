import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Skeleton,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Work as WorkIcon,
  AttachMoney as SalaryIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { JobService } from '../../services';

const RecommendedJobs = ({ limit = 4, showTitle = true, showViewAll = true }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedJobs, setSavedJobs] = useState({});

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      setLoading(true);
      try {
        const response = await JobService.getRecommendedJobs();
        const recommendedJobs = response.slice(0, limit);
        setJobs(recommendedJobs);
        
        // Initialize saved jobs state
        const initialSavedState = {};
        recommendedJobs.forEach(job => {
          initialSavedState[job.id] = job.isSaved || false;
        });
        setSavedJobs(initialSavedState);
      } catch (err) {
        console.error('Error fetching recommended jobs:', err);
        setError('Failed to load recommended jobs');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecommendedJobs();
  }, [limit]);

  const handleToggleSave = async (e, jobId) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newSavedState = !savedJobs[jobId];
    
    // Update local state immediately for responsive UI
    setSavedJobs({
      ...savedJobs,
      [jobId]: newSavedState
    });
    
    try {
      // In a real app, you would call an API to save/unsave the job
      await JobService.toggleSaveJob(jobId, newSavedState);
    } catch (err) {
      console.error('Error toggling job save status:', err);
      
      // Revert the state if the API call fails
      setSavedJobs({
        ...savedJobs,
        [jobId]: !newSavedState
      });
    }
  };

  // Render loading skeletons
  const renderSkeletons = () => {
    return Array(limit).fill(0).map((_, index) => (
      <Grid item xs={12} sm={6} md={limit > 2 ? 3 : 6} key={`skeleton-${index}`}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
              <Box>
                <Skeleton variant="text" width={120} />
                <Skeleton variant="text" width={80} />
              </Box>
            </Box>
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="70%" />
            <Box sx={{ mt: 2 }}>
              <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1, display: 'inline-block', mr: 1 }} />
              <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1, display: 'inline-block' }} />
            </Box>
          </CardContent>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
          </Box>
        </Card>
      </Grid>
    ));
  };

  return (
    <Box>
      {showTitle && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2" fontWeight="bold">
            Recommended Jobs
          </Typography>
          {showViewAll && (
            <Button
              component={Link}
              to="/jobs"
              endIcon={<ArrowForwardIcon />}
              color="primary"
            >
              View All Jobs
            </Button>
          )}
        </Box>
      )}
      
      {error ? (
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'error.light', borderRadius: 2 }}>
          <Typography color="error" align="center">
            {error}
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {loading ? (
            renderSkeletons()
          ) : jobs.length === 0 ? (
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
                <Typography align="center" color="text.secondary">
                  No recommended jobs found. Update your profile to get personalized recommendations.
                </Typography>
              </Paper>
            </Grid>
          ) : (
            jobs.map((job) => (
              <Grid item xs={12} sm={6} md={limit > 2 ? 3 : 6} key={job.id}>
                <Card
                  component={Link}
                  to={`/jobs/${job.id}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    },
                    position: 'relative',
                    overflow: 'visible',
                    border: job.isFeatured ? '1px solid' : 'none',
                    borderColor: 'primary.main',
                  }}
                >
                  {job.isFeatured && (
                    <Chip
                      label="Featured"
                      color="primary"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: -10,
                        right: 16,
                        fontWeight: 'bold',
                      }}
                    />
                  )}
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={job.companyLogo}
                        alt={job.company}
                        sx={{ mr: 2, width: 40, height: 40 }}
                      />
                      <Box>
                        <Typography variant="h6" component="h3" noWrap>
                          {job.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {job.company}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationIcon fontSize="small" sx={{ mr: 0.5 }} />
                        {job.location}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <WorkIcon fontSize="small" sx={{ mr: 0.5 }} />
                        {job.jobType}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <SalaryIcon fontSize="small" sx={{ mr: 0.5 }} />
                        {job.salary}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                      {job.skills && job.skills.slice(0, 3).map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      ))}
                      {job.skills && job.skills.length > 3 && (
                        <Chip
                          label={`+${job.skills.length - 3}`}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      )}
                    </Box>
                    
                    {job.isNew && (
                      <Chip
                        label="New"
                        color="success"
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    )}
                  </CardContent>
                  
                  <Divider />
                  
                  <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Posted {new Date(job.postedDate).toLocaleDateString()}
                    </Typography>
                    
                    <IconButton
                      onClick={(e) => handleToggleSave(e, job.id)}
                      color="primary"
                      size="small"
                    >
                      {savedJobs[job.id] ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Box>
  );
};

export default RecommendedJobs;
