import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  Paper,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  Badge
} from '@mui/material';
import {
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  AttachMoney as SalaryIcon,
  Work as WorkIcon,
  Sort as SortIcon
} from '@mui/icons-material';

const SavedJobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Mock saved jobs data
  const [savedJobs, setSavedJobs] = useState([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      datePosted: '2023-05-01',
      description: 'We are looking for an experienced Frontend Developer with strong React skills to join our team.',
      skills: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
      savedDate: '2023-05-10'
    },
    {
      id: 2,
      title: 'UX Designer',
      company: 'Creative Designs',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90,000 - $120,000',
      datePosted: '2023-05-03',
      description: 'Join our design team to create beautiful and intuitive user experiences for our products.',
      skills: ['Figma', 'Adobe XD', 'UI/UX', 'Prototyping'],
      savedDate: '2023-05-11'
    },
    {
      id: 3,
      title: 'Backend Developer',
      company: 'Data Systems',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$130,000 - $160,000',
      datePosted: '2023-05-05',
      description: 'Looking for a skilled Backend Developer with experience in Node.js and database design.',
      skills: ['Node.js', 'Express', 'MongoDB', 'SQL', 'API Design'],
      savedDate: '2023-05-12'
    },
    {
      id: 4,
      title: 'Product Manager',
      company: 'Innovate Labs',
      location: 'Chicago, IL',
      type: 'Full-time',
      salary: '$110,000 - $140,000',
      datePosted: '2023-05-07',
      description: 'Lead product development and strategy for our SaaS platform.',
      skills: ['Product Strategy', 'Agile', 'User Research', 'Roadmapping'],
      savedDate: '2023-05-13'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'Cloud Solutions',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$125,000 - $155,000',
      datePosted: '2023-05-10',
      description: 'Join our DevOps team to build and maintain our cloud infrastructure.',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
      savedDate: '2023-05-14'
    }
  ]);

  // Handle menu open
  const handleMenuOpen = (event, job) => {
    setAnchorEl(event.currentTarget);
    setSelectedJob(job);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle delete dialog open
  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  // Handle delete dialog close
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  // Handle job removal from saved list
  const handleRemoveJob = () => {
    if (selectedJob) {
      setSavedJobs(savedJobs.filter(job => job.id !== selectedJob.id));
      setSuccessMessage(`Job "${selectedJob.title}" has been removed from your saved jobs.`);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
    setDeleteDialogOpen(false);
  };

  // Filter jobs based on search query
  const filteredJobs = savedJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
  });

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Saved Jobs
          <Badge 
            badgeContent={savedJobs.length} 
            color="primary" 
            sx={{ ml: 2 }}
          />
        </Typography>
      </Box>
      
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}
      
      <Paper elevation={1} sx={{ mb: 3, p: 2, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search saved jobs by title, company, location, or skills"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              startIcon={<SortIcon />}
              sx={{ mr: 1 }}
            >
              Sort By
            </Button>
            <Button
              startIcon={<FilterIcon />}
            >
              Filter
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {filteredJobs.length === 0 ? (
        <Paper elevation={1} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
          <BookmarkBorderIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No saved jobs found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {searchQuery ? 
              "No saved jobs match your search criteria." : 
              "You haven't saved any jobs yet. Browse jobs and click the bookmark icon to save them for later."}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/jobs"
          >
            Browse Jobs
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredJobs.map((job) => (
            <Grid item xs={12} key={job.id}>
              <Card elevation={1} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {job.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                          <BusinessIcon fontSize="small" sx={{ mr: 0.5 }} />
                          {job.company}
                        </Box>
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationIcon fontSize="small" sx={{ mr: 0.5 }} />
                          {job.location}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                          <WorkIcon fontSize="small" sx={{ mr: 0.5 }} />
                          {job.type}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                          <SalaryIcon fontSize="small" sx={{ mr: 0.5 }} />
                          {job.salary}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton
                      onClick={(event) => handleMenuOpen(event, job)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                  
                  <Typography variant="body2" paragraph>
                    {job.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {job.skills.map((skill, index) => (
                      <Chip key={index} label={skill} size="small" />
                    ))}
                  </Box>
                </CardContent>
                
                <Divider />
                
                <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Saved on {formatDate(job.savedDate)} • Posted on {formatDate(job.datePosted)}
                  </Typography>
                  <Box>
                    <Button
                      size="small"
                      startIcon={<BookmarkIcon color="primary" />}
                      onClick={handleDeleteDialogOpen}
                    >
                      Saved
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      component={Link}
                      to={`/jobs/${job.id}`}
                      sx={{ ml: 1 }}
                    >
                      View Job
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Job Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem component={Link} to={`/jobs/${selectedJob?.id}`} onClick={handleMenuClose}>
          <ListItemIcon>
            <WorkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Job Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share Job</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteDialogOpen} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Remove from Saved</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
      >
        <DialogTitle>Remove Saved Job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove "{selectedJob?.title}" from your saved jobs?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleRemoveJob} color="error">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SavedJobs;
