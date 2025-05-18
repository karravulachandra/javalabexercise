import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  AccountCircle as AccountIcon,
  Lock as PrivacyIcon,
  Notifications as NotificationsIcon,
  Payment as PaymentIcon,
  Security as SecurityIcon,
  Language as LanguageIcon
} from '@mui/icons-material';
import AccountSettings from './settings/AccountSettings';
import PrivacySettings from './settings/PrivacySettings';
import NotificationSettings from './settings/NotificationSettings';

const Settings = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSetting, setActiveSetting] = useState('account');

  // Extract the current settings page from the URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/settings/privacy')) {
      setActiveSetting('privacy');
    } else if (path.includes('/settings/notifications')) {
      setActiveSetting('notifications');
    } else {
      setActiveSetting('account');
    }
  }, [location.pathname]);

  const handleSettingClick = (setting) => {
    setActiveSetting(setting);
    navigate(`/settings/${setting === 'account' ? '' : setting}`);
  };

  const settingsMenu = [
    {
      id: 'account',
      label: 'Account Settings',
      icon: <AccountIcon />,
      path: '/settings'
    },
    {
      id: 'privacy',
      label: 'Privacy Settings',
      icon: <PrivacyIcon />,
      path: '/settings/privacy'
    },
    {
      id: 'notifications',
      label: 'Notification Settings',
      icon: <NotificationsIcon />,
      path: '/settings/notifications'
    },
    {
      id: 'payment',
      label: 'Payment Methods',
      icon: <PaymentIcon />,
      path: '/settings/payment',
      disabled: true
    },
    {
      id: 'security',
      label: 'Security',
      icon: <SecurityIcon />,
      path: '/settings/security',
      disabled: true
    },
    {
      id: 'language',
      label: 'Language & Region',
      icon: <LanguageIcon />,
      path: '/settings/language',
      disabled: true
    }
  ];

  // Render the appropriate settings component based on the active setting
  const renderSettingsContent = () => {
    switch (activeSetting) {
      case 'privacy':
        return <PrivacySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'account':
      default:
        return <AccountSettings />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Settings
      </Typography>
      
      <Grid container spacing={3}>
        {/* Settings Navigation */}
        <Grid item xs={12} md={3}>
          <Paper elevation={1} sx={{ borderRadius: 2 }}>
            <List component="nav" aria-label="settings navigation">
              {settingsMenu.map((item) => (
                <ListItem
                  button
                  key={item.id}
                  selected={activeSetting === item.id}
                  onClick={() => !item.disabled && handleSettingClick(item.id)}
                  disabled={item.disabled}
                  sx={{
                    borderRadius: 1,
                    m: 0.5,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.50',
                      '&:hover': {
                        backgroundColor: 'primary.100',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: activeSetting === item.id ? 'primary.main' : 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label} 
                    primaryTypographyProps={{ 
                      fontWeight: activeSetting === item.id ? 'medium' : 'regular' 
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        
        {/* Settings Content */}
        <Grid item xs={12} md={9}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            {renderSettingsContent()}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;
