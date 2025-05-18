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
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormGroup,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel
} from '@mui/material';
import {
  Save as SaveIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon
} from '@mui/icons-material';

const PrivacySettings = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: true,
    showPhone: false,
    showResume: true,
    allowMessaging: true,
    allowEmployersToContact: true,
    showJobApplicationHistory: false,
    showSalaryExpectations: false,
    activityTracking: true,
    dataCollection: true,
    marketingEmails: true,
    partnerEmails: false
  });

  const handleSwitchChange = (event) => {
    setPrivacySettings({
      ...privacySettings,
      [event.target.name]: event.target.checked
    });
  };

  const handleRadioChange = (event) => {
    setPrivacySettings({
      ...privacySettings,
      [event.target.name]: event.target.value
    });
  };

  const handleSaveSettings = () => {
    // In a real app, this would save the settings to the backend
    console.log('Saving privacy settings:', privacySettings);
    
    // Show success message
    setSuccessMessage('Privacy settings updated successfully');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleDownloadData = () => {
    // In a real app, this would trigger a data export
    console.log('Downloading user data');
    alert('Your data export has been initiated. You will receive an email with download instructions shortly.');
  };

  const handleDeleteAccount = () => {
    // In a real app, this would show a confirmation dialog and then delete the account
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Account deletion requested');
      alert('Account deletion process initiated. You will receive a confirmation email.');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2" fontWeight="medium">
          Privacy Settings
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleSaveSettings}
        >
          Save Settings
        </Button>
      </Box>
      
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        {/* Profile Visibility */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Profile Visibility
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <FormControl component="fieldset">
            <FormLabel component="legend">Who can see your profile?</FormLabel>
            <RadioGroup
              name="profileVisibility"
              value={privacySettings.profileVisibility}
              onChange={handleRadioChange}
            >
              <FormControlLabel 
                value="public" 
                control={<Radio />} 
                label="Public - Anyone can view your profile" 
              />
              <FormControlLabel 
                value="employers" 
                control={<Radio />} 
                label="Employers Only - Only registered employers can view your profile" 
              />
              <FormControlLabel 
                value="private" 
                control={<Radio />} 
                label="Private - Only you can view your profile" 
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        
        {/* Contact Information Privacy */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Contact Information Privacy
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.showEmail}
                  onChange={handleSwitchChange}
                  name="showEmail"
                  color="primary"
                />
              }
              label="Show email address on profile"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.showPhone}
                  onChange={handleSwitchChange}
                  name="showPhone"
                  color="primary"
                />
              }
              label="Show phone number on profile"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.showResume}
                  onChange={handleSwitchChange}
                  name="showResume"
                  color="primary"
                />
              }
              label="Allow employers to download your resume"
            />
          </FormGroup>
        </Grid>
        
        {/* Communication Preferences */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Communication Preferences
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.allowMessaging}
                  onChange={handleSwitchChange}
                  name="allowMessaging"
                  color="primary"
                />
              }
              label="Allow other users to message you"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.allowEmployersToContact}
                  onChange={handleSwitchChange}
                  name="allowEmployersToContact"
                  color="primary"
                />
              }
              label="Allow employers to contact you about job opportunities"
            />
          </FormGroup>
        </Grid>
        
        {/* Job Application Privacy */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Job Application Privacy
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.showJobApplicationHistory}
                  onChange={handleSwitchChange}
                  name="showJobApplicationHistory"
                  color="primary"
                />
              }
              label="Show job application history on profile"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.showSalaryExpectations}
                  onChange={handleSwitchChange}
                  name="showSalaryExpectations"
                  color="primary"
                />
              }
              label="Show salary expectations on profile"
            />
          </FormGroup>
        </Grid>
        
        {/* Data Collection & Marketing */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Data Collection & Marketing
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.activityTracking}
                  onChange={handleSwitchChange}
                  name="activityTracking"
                  color="primary"
                />
              }
              label="Allow activity tracking to improve job recommendations"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.dataCollection}
                  onChange={handleSwitchChange}
                  name="dataCollection"
                  color="primary"
                />
              }
              label="Allow data collection for service improvement"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.marketingEmails}
                  onChange={handleSwitchChange}
                  name="marketingEmails"
                  color="primary"
                />
              }
              label="Receive marketing emails from JobPortal"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={privacySettings.partnerEmails}
                  onChange={handleSwitchChange}
                  name="partnerEmails"
                  color="primary"
                />
              }
              label="Receive emails from JobPortal partners"
            />
          </FormGroup>
        </Grid>
        
        {/* Data Management */}
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Data Management
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadData}
            >
              Download My Data
            </Button>
            
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteAccount}
            >
              Delete My Account
            </Button>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Deleting your account will permanently remove all your data from our systems. This action cannot be undone.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PrivacySettings;
