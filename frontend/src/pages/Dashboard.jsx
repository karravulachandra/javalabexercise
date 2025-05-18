import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DashboardService, JobService, ApplicationService } from '../services';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Chip,
  LinearProgress,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Work as WorkIcon,
  Business as BusinessIcon,
  Description as DescriptionIcon,
  Visibility as VisibilityIcon,
  ThumbUp as ThumbUpIcon,
  AccessTime as TimeIcon,
  ArrowForward as ArrowForwardIcon,
  MoreVert as MoreVertIcon,
  LocationOn as LocationIcon,
  AttachMoney as SalaryIcon
} from '@mui/icons-material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalApplications: 0,
      profileViews: 0,
      interviews: 0,
      offers: 0
    },
    recentApplications: [],
    recommendedJobs: [],
    applicationStatus: {
      applied: 0,
      viewed: 0,
      interview: 0,
      offer: 0,
      rejected: 0
    },
    applicationTrends: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      applications: [5, 8, 12, 7, 10, 15],
      interviews: [2, 3, 5, 3, 4, 6]
    }
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        console.log('Fetching dashboard data...');

        // Get dashboard data using DashboardService
        const dashboardResult = await DashboardService.getJobSeekerDashboard();
        console.log('Dashboard data:', dashboardResult);

        // Update state with the fetched data
        setDashboardData(dashboardResult);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { from: '/dashboard' } });
    }
  }, [currentUser, navigate]);

  // Prepare chart data from dashboard data
  const applicationStatusData = {
    labels: ['Applied', 'Viewed', 'Interview', 'Offer', 'Rejected'],
    datasets: [
      {
        data: [
          dashboardData.applicationStatus.applied || 0,
          dashboardData.applicationStatus.viewed || 0,
          dashboardData.applicationStatus.interview || 0,
          dashboardData.applicationStatus.offer || 0,
          dashboardData.applicationStatus.rejected || 0
        ],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.info.main,
          theme.palette.warning.main,
          theme.palette.success.main,
          theme.palette.error.main,
        ],
        borderWidth: 0,
      },
    ],
  };

  const applicationTrendsData = {
    labels: dashboardData.applicationTrends.labels,
    datasets: [
      {
        label: 'Applications',
        data: dashboardData.applicationTrends.applications,
        borderColor: theme.palette.primary.main,
        backgroundColor: 'rgba(0, 115, 230, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Interviews',
        data: dashboardData.applicationTrends.interviews,
        borderColor: theme.palette.success.main,
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Use data from the dashboard state
  const recentApplications = dashboardData.recentApplications || [];
  const recommendedJobs = dashboardData.recommendedJobs || [];

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return 'primary';
      case 'Viewed':
        return 'info';
      case 'Interview':
        return 'warning';
      case 'Offer':
        return 'success';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Show loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Box sx={{ py: 3 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      {/* Welcome Section */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Welcome back, {currentUser?.firstName || 'User'}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Here's what's happening with your job search today.
            </Typography>
          </Box>
          <Button variant="contained" color="primary" startIcon={<DescriptionIcon />}>
            Update Resume
          </Button>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                  <WorkIcon />
                </Avatar>
                <Typography variant="h6" component="div">
                  Applications
                </Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {dashboardData.stats.totalApplications}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {dashboardData.applicationTrends.applications[5] - dashboardData.applicationTrends.applications[4] > 0 ?
                  `+${dashboardData.applicationTrends.applications[5] - dashboardData.applicationTrends.applications[4]} this month` :
                  'No new applications this month'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'info.light', mr: 2 }}>
                  <VisibilityIcon />
                </Avatar>
                <Typography variant="h6" component="div">
                  Profile Views
                </Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {dashboardData.stats.profileViews}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                +12% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.light', mr: 2 }}>
                  <BusinessIcon />
                </Avatar>
                <Typography variant="h6" component="div">
                  Interviews
                </Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {dashboardData.stats.interviews}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {dashboardData.stats.interviews > 0 ?
                  `${Math.min(3, dashboardData.stats.interviews)} upcoming this week` :
                  'No upcoming interviews'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.light', mr: 2 }}>
                  <ThumbUpIcon />
                </Avatar>
                <Typography variant="h6" component="div">
                  Offers
                </Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                {dashboardData.stats.offers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {dashboardData.stats.offers > 0 ? 'Pending response' : 'No offers yet'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} lg={8}>
          {/* Recent Applications */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                  Recent Applications
                </Typography>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  size="small"
                  component="a"
                  href="/applications"
                >
                  View All
                </Button>
              </Box>

              <List sx={{ width: '100%' }}>
                {recentApplications.map((application, index) => (
                  <Box key={application.id}>
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={
                        <IconButton edge="end" aria-label="more">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      sx={{ px: 0 }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={application.job?.companyLogo}
                          alt={application.job?.company}
                          variant="rounded"
                          sx={{ width: 50, height: 50 }}
                        >
                          {application.job?.company?.charAt(0) || 'J'}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
                            {application.job?.title}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="body2" component="span" color="text.primary">
                              {application.job?.company}
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocationIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {application.job?.location}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TimeIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                                <Typography variant="body2" color="text.secondary">
                                  Applied {formatDate(application.appliedDate)}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        }
                      />
                      <Chip
                        label={application.status}
                        color={getStatusColor(application.status)}
                        size="small"
                        sx={{ ml: 2, alignSelf: 'flex-start', mt: 1 }}
                      />
                    </ListItem>
                    {index < recentApplications.length - 1 && <Divider variant="inset" component="li" />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Recommended Jobs */}
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                  Recommended for You
                </Typography>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  size="small"
                  component="a"
                  href="/jobs"
                >
                  View All
                </Button>
              </Box>

              <List sx={{ width: '100%' }}>
                {recommendedJobs.map((job, index) => (
                  <Box key={job.id}>
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                        >
                          Apply
                        </Button>
                      }
                      sx={{ px: 0 }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={job.companyLogo}
                          alt={job.company}
                          variant="rounded"
                          sx={{ width: 50, height: 50 }}
                        >
                          {job.company.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
                            {job.title}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="body2" component="span" color="text.primary">
                              {job.company}
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocationIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {job.location}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <SalaryIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {job.salary}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TimeIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                                <Typography variant="body2" color="text.secondary">
                                  Posted {formatDate(job.postedDate)}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                              <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                                Match:
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={job.matchPercentage || 85}
                                sx={{
                                  width: 100,
                                  height: 8,
                                  borderRadius: 5,
                                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: (job.matchPercentage || 85) >= 90 ? 'success.main' : 'primary.main',
                                    borderRadius: 5,
                                  }
                                }}
                              />
                              <Typography variant="body2" color="text.secondary" sx={{ ml: 1, fontWeight: 'bold' }}>
                                {job.matchPercentage || 85}%
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recommendedJobs.length - 1 && <Divider variant="inset" component="li" />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} lg={4}>
          {/* Profile Completion */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                Profile Completion
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body1" sx={{ mr: 1 }}>
                  85%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={85}
                  sx={{
                    flexGrow: 1,
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'success.main',
                      borderRadius: 5,
                    }
                  }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Complete your profile to increase visibility to employers
              </Typography>

              <Button variant="outlined" color="primary" fullWidth>
                Complete Profile
              </Button>
            </CardContent>
          </Card>

          {/* Application Status Chart */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
                Application Status
              </Typography>

              <Box sx={{ height: 250, display: 'flex', justifyContent: 'center' }}>
                <Doughnut
                  data={applicationStatusData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          boxWidth: 12,
                          padding: 15,
                        }
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Application Trends Chart */}
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
                Application Trends
              </Typography>

              <Box sx={{ height: 250 }}>
                <Line
                  data={applicationTrendsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          boxWidth: 12,
                          padding: 15,
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 5,
                        }
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
