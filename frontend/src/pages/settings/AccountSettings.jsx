import { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const AccountSettings = () => {
  const { currentUser, updateProfile } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || 'John',
    lastName: currentUser?.lastName || 'Doe',
    email: currentUser?.email || 'john.doe@example.com',
    phone: currentUser?.phone || '+1 (555) 123-4567',
    jobTitle: currentUser?.jobTitle || 'Software Developer',
    company: currentUser?.company || 'Tech Company Inc.',
    location: currentUser?.location || 'New York, NY',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode) {
      // Reset form data to current user data when entering edit mode
      setFormData({
        firstName: currentUser?.firstName || 'John',
        lastName: currentUser?.lastName || 'Doe',
        email: currentUser?.email || 'john.doe@example.com',
        phone: currentUser?.phone || '+1 (555) 123-4567',
        jobTitle: currentUser?.jobTitle || 'Software Developer',
        company: currentUser?.company || 'Tech Company Inc.',
        location: currentUser?.location || 'New York, NY',
        password: '',
        confirmPassword: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords if they are provided
    if (formData.password && formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    
    // In a real app, this would update the user profile in the backend
    try {
      // Simulate API call
      setTimeout(() => {
        setSuccessMessage('Profile updated successfully');
        setEditMode(false);
        setErrorMessage('');
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }, 1000);
    } catch (error) {
      setErrorMessage('Failed to update profile. Please try again.');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, this would upload the file to storage
      console.log('File selected:', file.name);
      // You would then update the user's avatar URL
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2" fontWeight="medium">
          Account Settings
        </Typography>
        <Button
          variant={editMode ? "outlined" : "contained"}
          color={editMode ? "secondary" : "primary"}
          startIcon={editMode ? <CancelIcon /> : <EditIcon />}
          onClick={handleToggleEditMode}
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </Button>
      </Box>
      
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}
      
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          {/* Profile Picture */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={currentUser?.photoURL || "https://randomuser.me/api/portraits/men/1.jpg"}
                alt="Profile Picture"
                sx={{ width: 100, height: 100 }}
              />
              {editMode && (
                <Box sx={{ position: 'absolute', bottom: 0, right: 0 }}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="avatar-upload"
                    type="file"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="avatar-upload">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      sx={{ 
                        backgroundColor: 'white',
                        '&:hover': { backgroundColor: 'grey.100' }
                      }}
                    >
                      <CloudUploadIcon />
                    </IconButton>
                  </label>
                </Box>
              )}
            </Box>
          </Grid>
          
          {/* Personal Information */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Personal Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={!editMode}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={!editMode}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!editMode}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </Grid>
          
          {/* Professional Information */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Professional Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Company/Organization"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </Grid>
          
          {/* Password Section - Only shown in edit mode */}
          {editMode && (
            <>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Change Password
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="New Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </Grid>
            </>
          )}
          
          {/* Submit Button - Only shown in edit mode */}
          {editMode && (
            <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                size="large"
              >
                Save Changes
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default AccountSettings;
