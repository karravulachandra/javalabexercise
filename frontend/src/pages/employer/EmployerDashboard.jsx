import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Work as WorkIcon,
  Person as PersonIcon,
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
  Add as AddIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  MoreVert as MoreVertIcon,
  Business as BusinessIcon,
  Assessment as AssessmentIcon,
  Group as GroupIcon
} from '@mui/icons-material';

// Mock data for charts (in a real app, you would use a charting library like recharts)
const jobPostingsData = [
  { month: 'Jan', count: 3 },
  { month: 'Feb', count: 5 },
  { month: 'Mar', count: 4 },
  { month: 'Apr', count: 7 },
  { month: 'May', count: 9 },
  { month: 'Jun', count: 8 }
];

const applicationsData = [
  { month: 'Jan', count: 12 },
  { month: 'Feb', count: 19 },
  { month: 'Mar', count: 15 },
  { month: 'Apr', count: 27 },
  { month: 'May', count: 32 },
  { month: 'Jun', count: 38 }
];

const EmployerDashboard = () => {
  // Mock data for dashboard
  const dashboardStats = {
    activeJobs: 12,
    totalApplications: 143,
    newApplications: 27,
    viewsToday: 89,
    profileViews: 245,
    averageResponseRate: 78
  };

  const recentApplications = [
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      applicantName: 'Michael Johnson',
      applicantPhoto: 'https://randomuser.me/api/portraits/men/32.jpg',
      date: '2023-05-15',
      status: 'new'
    },
    {
      id: 2,
      jobTitle: 'UX Designer',
      applicantName: 'Emily Rodriguez',
      applicantPhoto: 'https://randomuser.me/api/portraits/women/28.jpg',
      date: '2023-05-14',
      status: 'reviewed'
    },
    {
      id: 3,
      jobTitle: 'Backend Developer',
      applicantName: 'David Kim',
      applicantPhoto: 'https://randomuser.me/api/portraits/men/45.jpg',
      date: '2023-05-13',
      status: 'interview'
    },
    {
      id: 4,
      jobTitle: 'Product Manager',
      applicantName: 'Sarah Wilson',
      applicantPhoto: 'https://randomuser.me/api/portraits/women/37.jpg',
      date: '2023-05-12',
      status: 'rejected'
    }
  ];

  const topPerformingJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      applications: 42,
      views: 312,
      conversionRate: 13.5,
      trend: 'up'
    },
    {
      id: 2,
      title: 'UX Designer',
      applications: 38,
      views: 287,
      conversionRate: 13.2,
      trend: 'up'
    },
    {
      id: 3,
      title: 'Backend Developer',
      applications: 31,
      views: 245,
      conversionRate: 12.7,
      trend: 'down'
    },
    {
      id: 4,
      title: 'Product Manager',
      applications: 27,
      views: 198,
      conversionRate: 13.6,
      trend: 'up'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      applications: 23,
      views: 176,
      conversionRate: 13.1,
      trend: 'down'
    }
  ];

  // Function to render status chip
  const renderStatusChip = (status) => {
    switch (status) {
      case 'new':
        return <Chip label="New" size="small" color="primary" />;
      case 'reviewed':
        return <Chip label="Reviewed" size="small" color="info" />;
      case 'interview':
        return <Chip label="Interview" size="small" color="success" />;
      case 'rejected':
        return <Chip label="Rejected" size="small" color="error" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  // Simple bar chart component
  const SimpleBarChart = ({ data, height = 100, color = 'primary.main' }) => {
    const maxValue = Math.max(...data.map(item => item.count));
    
    return (
      <Box sx={{ display: 'flex', alignItems: 'flex-end', height, justifyContent: 'space-between' }}>
        {data.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: `${100 / data.length}%` }}>
            <Box 
              sx={{ 
                width: '60%', 
                height: `${(item.count / maxValue) * 100}%`, 
                backgroundColor: color,
                borderRadius: '4px 4px 0 0',
                minHeight: 4
              }} 
            />
            <Typography variant="caption" sx={{ mt: 1 }}>
              {item.month}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Employer Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/employer/jobs/new"
        >
          Post New Job
        </Button>
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                <WorkIcon />
              </Avatar>
              <Typography variant="h6" component="h2">
                Job Postings
              </Typography>
            </Box>
            <Typography variant="h3" component="p" fontWeight="bold" sx={{ mb: 1 }}>
              {dashboardStats.activeJobs}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Active job postings
            </Typography>
            <Divider sx={{ my: 2 }} />
            <SimpleBarChart data={jobPostingsData} color="primary.main" />
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                <PersonIcon />
              </Avatar>
              <Typography variant="h6" component="h2">
                Applications
              </Typography>
            </Box>
            <Typography variant="h3" component="p" fontWeight="bold" sx={{ mb: 1 }}>
              {dashboardStats.totalApplications}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {dashboardStats.newApplications} new applications
              </Typography>
              <Chip 
                label="+12% this week" 
                size="small" 
                color="success" 
                sx={{ ml: 1, height: 20 }} 
              />
            </Box>
            <Divider sx={{ my: 2 }} />
            <SimpleBarChart data={applicationsData} color="success.main" />
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                <VisibilityIcon />
              </Avatar>
              <Typography variant="h6" component="h2">
                Profile Views
              </Typography>
            </Box>
            <Typography variant="h3" component="p" fontWeight="bold" sx={{ mb: 1 }}>
              {dashboardStats.profileViews}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {dashboardStats.viewsToday} views today
              </Typography>
              <Chip 
                label="+8% this week" 
                size="small" 
                color="success" 
                sx={{ ml: 1, height: 20 }} 
              />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                Response Rate
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={dashboardStats.averageResponseRate} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {dashboardStats.averageResponseRate}%
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Recent Applications */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ borderRadius: 2 }}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" component="h2" fontWeight="medium">
                Recent Applications
              </Typography>
              <Button 
                component={Link} 
                to="/employer/applications" 
                endIcon={<ArrowUpwardIcon />}
                size="small"
              >
                View All
              </Button>
            </Box>
            <Divider />
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {recentApplications.map((application) => (
                <ListItem
                  key={application.id}
                  secondaryAction={
                    <Box>
                      {renderStatusChip(application.status)}
                    </Box>
                  }
                  sx={{ px: 2, py: 1.5 }}
                >
                  <ListItemAvatar>
                    <Avatar src={application.applicantPhoto} alt={application.applicantName} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={application.applicantName}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {application.jobTitle}
                        </Typography>
                        {" — Applied on " + new Date(application.date).toLocaleDateString()}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        
        {/* Top Performing Jobs */}
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ borderRadius: 2 }}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" component="h2" fontWeight="medium">
                Top Performing Jobs
              </Typography>
              <Button 
                component={Link} 
                to="/employer/jobs" 
                endIcon={<ArrowUpwardIcon />}
                size="small"
              >
                View All Jobs
              </Button>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Job Title</TableCell>
                    <TableCell align="right">Applications</TableCell>
                    <TableCell align="right">Views</TableCell>
                    <TableCell align="right">Conv. Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topPerformingJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell component="th" scope="row">
                        {job.title}
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          {job.applications}
                          {job.trend === 'up' ? (
                            <ArrowUpwardIcon fontSize="small" color="success" sx={{ ml: 0.5 }} />
                          ) : (
                            <ArrowDownwardIcon fontSize="small" color="error" sx={{ ml: 0.5 }} />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell align="right">{job.views}</TableCell>
                      <TableCell align="right">{job.conversionRate}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmployerDashboard;
