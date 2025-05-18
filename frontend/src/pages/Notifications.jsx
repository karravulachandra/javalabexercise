import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Button,
  IconButton,
  Chip,
  Tabs,
  Tab,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
  Paper
} from '@mui/material';
import {
  Work as WorkIcon,
  Business as BusinessIcon,
  Notifications as NotificationsIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  NotificationsActive as NotificationsActiveIcon,
  NotificationsOff as NotificationsOffIcon
} from '@mui/icons-material';
import { format, formatDistanceToNow } from 'date-fns';

const Notifications = () => {
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);
  
  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'job',
      title: 'New job match: Senior React Developer',
      message: 'A new job matching your skills has been posted by Tech Solutions Inc.',
      company: 'Tech Solutions Inc.',
      link: '/jobs/123',
      read: false,
      date: new Date(2023, 4, 15, 9, 30)
    },
    {
      id: 2,
      type: 'application',
      title: 'Application status update',
      message: 'Your application for Frontend Developer at Innovate Labs has been reviewed.',
      company: 'Innovate Labs',
      link: '/applications/456',
      read: false,
      date: new Date(2023, 4, 14, 14, 45)
    },
    {
      id: 3,
      type: 'message',
      title: 'New message from Sarah Johnson',
      message: 'Hello! I saw your profile and would like to discuss a job opportunity at our company.',
      sender: 'Sarah Johnson',
      senderRole: 'HR Manager',
      link: '/messages/789',
      read: true,
      date: new Date(2023, 4, 13, 11, 20)
    },
    {
      id: 4,
      type: 'interview',
      title: 'Interview invitation',
      message: 'You have been invited to an interview for the position of UX Designer at Creative Designs.',
      company: 'Creative Designs',
      link: '/interviews/101',
      read: false,
      date: new Date(2023, 4, 12, 16, 0)
    },
    {
      id: 5,
      type: 'company',
      title: 'Company you follow has posted a new job',
      message: 'Google has posted a new job: Machine Learning Engineer.',
      company: 'Google',
      link: '/jobs/112',
      read: true,
      date: new Date(2023, 4, 11, 10, 15)
    },
    {
      id: 6,
      type: 'system',
      title: 'Profile strength update',
      message: 'Your profile is 85% complete. Add your certifications to improve visibility to employers.',
      link: '/profile',
      read: true,
      date: new Date(2023, 4, 10, 9, 0)
    },
    {
      id: 7,
      type: 'job',
      title: 'Job alert: 5 new jobs match your preferences',
      message: 'We found 5 new jobs that match your search criteria in the last 24 hours.',
      link: '/jobs?source=alert',
      read: true,
      date: new Date(2023, 4, 9, 8, 30)
    },
    {
      id: 8,
      type: 'application',
      title: 'Application deadline reminder',
      message: 'The application for Product Manager at TechCorp closes tomorrow.',
      company: 'TechCorp',
      link: '/jobs/234',
      read: false,
      date: new Date(2023, 4, 8, 15, 45)
    }
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event, notification) => {
    setAnchorEl(event.currentTarget);
    setSelectedNotification(notification);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedNotification(null);
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId ? { ...notification, read: true } : notification
    ));
    handleMenuClose();
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const handleDeleteNotification = (notificationId) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
    handleMenuClose();
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  // Filter notifications based on tab
  const getFilteredNotifications = () => {
    switch (tabValue) {
      case 0: // All
        return notifications;
      case 1: // Unread
        return notifications.filter(notification => !notification.read);
      case 2: // Jobs
        return notifications.filter(notification => notification.type === 'job' || notification.type === 'application' || notification.type === 'interview');
      case 3: // Messages
        return notifications.filter(notification => notification.type === 'message');
      default:
        return notifications;
    }
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'job':
        return <WorkIcon />;
      case 'application':
        return <WorkIcon />;
      case 'interview':
        return <WorkIcon />;
      case 'company':
        return <BusinessIcon />;
      case 'message':
        return <EmailIcon />;
      case 'system':
        return <NotificationsIcon />;
      default:
        return <NotificationsIcon />;
    }
  };

  // Get avatar color based on notification type
  const getAvatarColor = (type) => {
    switch (type) {
      case 'job':
        return 'primary.main';
      case 'application':
        return 'success.main';
      case 'interview':
        return 'info.main';
      case 'company':
        return 'secondary.main';
      case 'message':
        return 'warning.main';
      case 'system':
        return 'grey.500';
      default:
        return 'primary.main';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Notifications
          {unreadCount > 0 && (
            <Badge 
              badgeContent={unreadCount} 
              color="error" 
              sx={{ ml: 2 }}
            />
          )}
        </Typography>
        
        <Box>
          {unreadCount > 0 && (
            <Button
              startIcon={<CheckCircleIcon />}
              onClick={handleMarkAllAsRead}
              sx={{ mr: 1 }}
            >
              Mark All as Read
            </Button>
          )}
          
          <Button
            startIcon={<DeleteIcon />}
            onClick={handleClearAllNotifications}
            disabled={notifications.length === 0}
          >
            Clear All
          </Button>
        </Box>
      </Box>
      
      <Paper elevation={1} sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab 
            label="All" 
            icon={<Badge badgeContent={notifications.length} color="primary" max={99} />} 
            iconPosition="end"
          />
          <Tab 
            label="Unread" 
            icon={<Badge badgeContent={unreadCount} color="error" max={99} />} 
            iconPosition="end"
            disabled={unreadCount === 0}
          />
          <Tab label="Jobs" />
          <Tab label="Messages" />
        </Tabs>
      </Paper>
      
      {filteredNotifications.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <NotificationsOffIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No notifications to display
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tabValue === 0 ? 
              "You don't have any notifications yet." : 
              "You don't have any notifications in this category."}
          </Typography>
        </Box>
      ) : (
        <Paper elevation={1} sx={{ borderRadius: 2 }}>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {filteredNotifications.map((notification, index) => (
              <Box key={notification.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    py: 2,
                    backgroundColor: notification.read ? 'inherit' : 'primary.50',
                    '&:hover': { backgroundColor: notification.read ? 'grey.50' : 'primary.100' }
                  }}
                  secondaryAction={
                    <IconButton edge="end" onClick={(e) => handleMenuOpen(e, notification)}>
                      <MoreVertIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: getAvatarColor(notification.type) }}>
                      {getNotificationIcon(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                        <Typography
                          variant="subtitle1"
                          component={Link}
                          to={notification.link}
                          sx={{ 
                            textDecoration: 'none', 
                            color: 'text.primary',
                            fontWeight: notification.read ? 'regular' : 'medium',
                            '&:hover': { color: 'primary.main' }
                          }}
                        >
                          {notification.title}
                        </Typography>
                        {!notification.read && (
                          <Chip 
                            label="New" 
                            size="small" 
                            color="primary" 
                            sx={{ height: 20 }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          sx={{ display: 'block', mb: 0.5 }}
                        >
                          {notification.message}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {notification.company && (
                            <Chip
                              icon={<BusinessIcon fontSize="small" />}
                              label={notification.company}
                              size="small"
                              variant="outlined"
                              sx={{ height: 24 }}
                            />
                          )}
                          <Typography
                            component="span"
                            variant="caption"
                            color="text.secondary"
                          >
                            {formatDistanceToNow(notification.date, { addSuffix: true })}
                          </Typography>
                        </Box>
                      </>
                    }
                  />
                </ListItem>
                {index < filteredNotifications.length - 1 && <Divider component="li" />}
              </Box>
            ))}
          </List>
        </Paper>
      )}
      
      {/* Notification Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {selectedNotification && !selectedNotification.read && (
          <MenuItem onClick={() => handleMarkAsRead(selectedNotification.id)}>
            <ListItemIcon>
              <CheckCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Mark as read</ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={() => handleDeleteNotification(selectedNotification?.id)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default Notifications;
