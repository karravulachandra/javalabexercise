import { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  Alert,
  FormGroup,
  Chip,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  CardHeader,
  IconButton
} from '@mui/material';
import {
  Save as SaveIcon,
  Email as EmailIcon,
  Smartphone as SmartphoneIcon,
  Notifications as NotificationsIcon,
  NotificationsActive as NotificationsActiveIcon,
  NotificationsOff as NotificationsOffIcon
} from '@mui/icons-material';

const NotificationSettings = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [notificationSettings, setNotificationSettings] = useState({
    // Job Notifications
    newJobAlerts: true,
    jobRecommendations: true,
    applicationUpdates: true,
    interviewInvitations: true,
    jobDeadlineReminders: true,
    
    // Account Notifications
    securityAlerts: true,
    accountUpdates: true,
    passwordChanges: true,
    
    // Marketing Notifications
    featuredJobs: false,
    careerTips: true,
    events: false,
    surveys: false,
    
    // Delivery Preferences
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    
    // Frequency
    emailFrequency: 'daily',
    pushFrequency: 'immediate'
  });

  const handleSwitchChange = (event) => {
    setNotificationSettings({
      ...notificationSettings,
      [event.target.name]: event.target.checked
    });
  };

  const handleSelectChange = (event) => {
    setNotificationSettings({
      ...notificationSettings,
      [event.target.name]: event.target.value
    });
  };

  const handleSaveSettings = () => {
    // In a real app, this would save the settings to the backend
    console.log('Saving notification settings:', notificationSettings);
    
    // Show success message
    setSuccessMessage('Notification settings updated successfully');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleEnableAll = () => {
    setNotificationSettings({
      ...notificationSettings,
      newJobAlerts: true,
      jobRecommendations: true,
      applicationUpdates: true,
      interviewInvitations: true,
      jobDeadlineReminders: true,
      securityAlerts: true,
      accountUpdates: true,
      passwordChanges: true,
      featuredJobs: true,
      careerTips: true,
      events: true,
      surveys: true
    });
  };

  const handleDisableAll = () => {
    setNotificationSettings({
      ...notificationSettings,
      newJobAlerts: false,
      jobRecommendations: false,
      applicationUpdates: false,
      interviewInvitations: false,
      jobDeadlineReminders: false,
      featuredJobs: false,
      careerTips: false,
      events: false,
      surveys: false
    });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2" fontWeight="medium">
          Notification Settings
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<NotificationsActiveIcon />}
            onClick={handleEnableAll}
            size="small"
          >
            Enable All
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<NotificationsOffIcon />}
            onClick={handleDisableAll}
            size="small"
          >
            Disable All
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
        </Box>
      </Box>
      
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        {/* Delivery Preferences */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Delivery Preferences
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardHeader
                  avatar={<EmailIcon color="primary" />}
                  title="Email Notifications"
                  action={
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onChange={handleSwitchChange}
                      name="emailNotifications"
                      color="primary"
                    />
                  }
                />
                <CardContent>
                  <FormControl fullWidth disabled={!notificationSettings.emailNotifications}>
                    <InputLabel id="email-frequency-label">Frequency</InputLabel>
                    <Select
                      labelId="email-frequency-label"
                      id="email-frequency"
                      name="emailFrequency"
                      value={notificationSettings.emailFrequency}
                      label="Frequency"
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="immediate">Immediate</MenuItem>
                      <MenuItem value="daily">Daily Digest</MenuItem>
                      <MenuItem value="weekly">Weekly Digest</MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardHeader
                  avatar={<NotificationsIcon color="primary" />}
                  title="Push Notifications"
                  action={
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onChange={handleSwitchChange}
                      name="pushNotifications"
                      color="primary"
                    />
                  }
                />
                <CardContent>
                  <FormControl fullWidth disabled={!notificationSettings.pushNotifications}>
                    <InputLabel id="push-frequency-label">Frequency</InputLabel>
                    <Select
                      labelId="push-frequency-label"
                      id="push-frequency"
                      name="pushFrequency"
                      value={notificationSettings.pushFrequency}
                      label="Frequency"
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="immediate">Immediate</MenuItem>
                      <MenuItem value="daily">Daily Digest</MenuItem>
                      <MenuItem value="limited">Limited (Important Only)</MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardHeader
                  avatar={<SmartphoneIcon color="primary" />}
                  title="SMS Notifications"
                  action={
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onChange={handleSwitchChange}
                      name="smsNotifications"
                      color="primary"
                    />
                  }
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    SMS notifications are only sent for critical updates like interview invitations and application status changes.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        
        {/* Job Notifications */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Job Notifications
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.newJobAlerts}
                  onChange={handleSwitchChange}
                  name="newJobAlerts"
                  color="primary"
                />
              }
              label="New job alerts matching your preferences"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.jobRecommendations}
                  onChange={handleSwitchChange}
                  name="jobRecommendations"
                  color="primary"
                />
              }
              label="Job recommendations based on your profile"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.applicationUpdates}
                  onChange={handleSwitchChange}
                  name="applicationUpdates"
                  color="primary"
                />
              }
              label="Updates on your job applications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.interviewInvitations}
                  onChange={handleSwitchChange}
                  name="interviewInvitations"
                  color="primary"
                />
              }
              label="Interview invitations"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.jobDeadlineReminders}
                  onChange={handleSwitchChange}
                  name="jobDeadlineReminders"
                  color="primary"
                />
              }
              label="Job application deadline reminders"
            />
          </FormGroup>
        </Grid>
        
        {/* Account Notifications */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Account Notifications
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.securityAlerts}
                  onChange={handleSwitchChange}
                  name="securityAlerts"
                  color="primary"
                  disabled
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  Security alerts
                  <Chip size="small" label="Required" color="primary" sx={{ ml: 1 }} />
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.accountUpdates}
                  onChange={handleSwitchChange}
                  name="accountUpdates"
                  color="primary"
                />
              }
              label="Account updates and changes"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.passwordChanges}
                  onChange={handleSwitchChange}
                  name="passwordChanges"
                  color="primary"
                  disabled
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  Password changes
                  <Chip size="small" label="Required" color="primary" sx={{ ml: 1 }} />
                </Box>
              }
            />
          </FormGroup>
        </Grid>
        
        {/* Marketing Notifications */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Marketing Notifications
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.featuredJobs}
                  onChange={handleSwitchChange}
                  name="featuredJobs"
                  color="primary"
                />
              }
              label="Featured job opportunities"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.careerTips}
                  onChange={handleSwitchChange}
                  name="careerTips"
                  color="primary"
                />
              }
              label="Career tips and advice"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.events}
                  onChange={handleSwitchChange}
                  name="events"
                  color="primary"
                />
              }
              label="Career events and webinars"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.surveys}
                  onChange={handleSwitchChange}
                  name="surveys"
                  color="primary"
                />
              }
              label="Surveys and feedback requests"
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotificationSettings;
