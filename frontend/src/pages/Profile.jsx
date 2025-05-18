import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserService } from '../services';
import ErrorMessage from '../components/common/ErrorMessage';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  PhotoCamera as PhotoCameraIcon
} from '@mui/icons-material';

const Profile = () => {
  const {
    currentUser,
    updateProfile,
    changePassword,
    sendVerificationEmail,
    error: authError,
    loading: authLoading
  } = useAuth();

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize profile data from current user
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser) {
        try {
          // Get user profile data from UserService
          const userData = await UserService.getCurrentUser();

          // Split name into first and last name
          const names = userData.displayName ? userData.displayName.split(' ') : ['', ''];

          setProfileData({
            firstName: names[0] || '',
            lastName: names.slice(1).join(' ') || '',
            email: userData.email || currentUser.email || '',
            phone: userData.phone || '',
            company: userData.company || '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Fallback to current user data from auth context
          const names = currentUser.displayName ? currentUser.displayName.split(' ') : ['', ''];
          setProfileData({
            firstName: names[0] || '',
            lastName: names.slice(1).join(' ') || '',
            email: currentUser.email || '',
            phone: currentUser.phone || '',
            company: currentUser.company || '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
        }
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  // Handle auth errors
  useEffect(() => {
    if (authError) {
      setErrorMessage(authError);
      setIsSubmitting(false);
    }
  }, [authError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateProfileForm = () => {
    const newErrors = {};

    if (!profileData.firstName) {
      newErrors.firstName = 'First name is required';
    }

    if (!profileData.lastName) {
      newErrors.lastName = 'Last name is required';
    }

    if (!profileData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(profileData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!profileData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!profileData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (profileData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!profileData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (profileData.newPassword !== profileData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (validateProfileForm()) {
      setIsSubmitting(true);
      try {
        // Update profile using UserService
        const profileUpdateData = {
          displayName: `${profileData.firstName} ${profileData.lastName}`,
          phone: profileData.phone,
          company: profileData.company
        };

        await UserService.updateProfile(profileUpdateData);

        // Also update in Firebase Auth
        await updateProfile(profileUpdateData);

        setSuccessMessage('Profile updated successfully');
        setEditMode(false);
      } catch (error) {
        console.error('Error updating profile:', error);
        setErrorMessage(error.message || 'Failed to update profile');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (validatePasswordForm()) {
      setIsSubmitting(true);
      try {
        await changePassword(profileData.currentPassword, profileData.newPassword);

        setSuccessMessage('Password updated successfully');
        setPasswordEditMode(false);
        setProfileData({
          ...profileData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } catch (error) {
        setErrorMessage(error.message || 'Failed to update password');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSendVerificationEmail = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      await sendVerificationEmail();
      setSuccessMessage('Verification email sent. Please check your inbox.');
    } catch (error) {
      setErrorMessage(error.message || 'Failed to send verification email');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            src={currentUser?.photoURL}
            alt={currentUser?.displayName}
            sx={{ width: 100, height: 100, mr: 3 }}
          />
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              My Profile
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your personal information and account settings
            </Typography>

            {/* Email verification status */}
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
              {currentUser?.emailVerified ? (
                <Alert severity="success" sx={{ py: 0 }}>
                  Email verified
                </Alert>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Alert severity="warning" sx={{ py: 0, mr: 2 }}>
                    Email not verified
                  </Alert>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleSendVerificationEmail}
                    disabled={isSubmitting}
                  >
                    Send verification email
                  </Button>
                </Box>
              )}
            </Box>

            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              sx={{ mt: 1 }}
            >
              <input hidden accept="image/*" type="file" />
              <PhotoCameraIcon />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Change Photo
              </Typography>
            </IconButton>
          </Box>
        </Box>

        <ErrorMessage
          message={successMessage}
          severity="success"
          autoDismiss={3000}
          onClose={() => setSuccessMessage('')}
        />

        <ErrorMessage
          message={errorMessage}
          severity="error"
          autoDismiss={5000}
          onClose={() => setErrorMessage('')}
        />

        <Box component="form" onSubmit={handleProfileUpdate}>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            Personal Information
            {!editMode ? (
              <Button
                startIcon={<EditIcon />}
                onClick={() => setEditMode(true)}
                disabled={isSubmitting || authLoading}
              >
                Edit
              </Button>
            ) : (
              <Box>
                <Button
                  color="error"
                  onClick={() => {
                    setEditMode(false);
                    // Reset form data
                    const names = currentUser.displayName ? currentUser.displayName.split(' ') : ['', ''];
                    setProfileData({
                      ...profileData,
                      firstName: names[0] || '',
                      lastName: names.slice(1).join(' ') || '',
                      phone: currentUser.phone || '',
                      company: currentUser.company || ''
                    });
                  }}
                  sx={{ mr: 1 }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              </Box>
            )}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={profileData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                disabled={!editMode || isSubmitting}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={profileData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                disabled={!editMode || isSubmitting}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={profileData.email}
                disabled={true}
                helperText="Email cannot be changed"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone || "Format: 1234567890"}
                disabled={!editMode || isSubmitting}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company/Institute"
                name="company"
                value={profileData.company}
                onChange={handleChange}
                error={!!errors.company}
                helperText={errors.company}
                disabled={!editMode || isSubmitting}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Password Change Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            Security
            {!passwordEditMode ? (
              <Button
                startIcon={<EditIcon />}
                onClick={() => setPasswordEditMode(true)}
                disabled={isSubmitting || authLoading}
              >
                Change Password
              </Button>
            ) : (
              <Box>
                <Button
                  color="error"
                  onClick={() => {
                    setPasswordEditMode(false);
                    setProfileData({
                      ...profileData,
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                  }}
                  sx={{ mr: 1 }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
                  onClick={handlePasswordUpdate}
                  disabled={isSubmitting}
                >
                  Update Password
                </Button>
              </Box>
            )}
          </Typography>

          {passwordEditMode && (
            <Box component="form" onSubmit={handlePasswordUpdate}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    name="currentPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={profileData.currentPassword}
                    onChange={handleChange}
                    error={!!errors.currentPassword}
                    helperText={errors.currentPassword}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
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
                    label="New Password"
                    name="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={profileData.newPassword}
                    onChange={handleChange}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={profileData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    required
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
