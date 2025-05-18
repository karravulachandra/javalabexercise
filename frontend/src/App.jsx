import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import SavedJobs from './pages/jobs/SavedJobs';
import AppliedJobs from './pages/jobs/AppliedJobs';
import Companies from './pages/Companies';
import CompanyDetail from './pages/CompanyDetail';
import CompanyReview from './pages/CompanyReview';
import Messages from './pages/Messages';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import HelpSupport from './pages/HelpSupport';
import EmployerDashboard from './pages/employer/EmployerDashboard';
import ManageJobs from './pages/employer/ManageJobs';
import ManageApplications from './pages/employer/ManageApplications';
import CreateEditJob from './pages/employer/CreateEditJob';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Chatbot from './components/chatbot/Chatbot';
import { PreloadingScreen } from './components/ui';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#4f46e5', // Updated to a more modern purple
      light: '#e0e7ff',
      dark: '#3730a3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10b981', // Updated to a teal green
      light: '#ecfdf5',
      dark: '#047857',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
    success: {
      main: '#10b981',
    },
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f59e0b',
    },
    info: {
      main: '#3b82f6',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 16px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
          },
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #10b981 30%, #34d399 90%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        },
        elevation2: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            transition: 'all 0.2s ease',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4f46e5',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function App() {
  const [loading, setLoading] = useState(true);

  // Simulate app initialization and resource loading
  useEffect(() => {
    // Remove the initial loading element from index.html
    const removeInitialLoader = () => {
      const loader = document.querySelector('.app-loader');
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.parentNode.removeChild(loader);
        }, 500);
      }
    };

    // Simulate loading resources
    const timer = setTimeout(() => {
      setLoading(false);
      removeInitialLoader();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Application preloading screen */}
      {loading && <PreloadingScreen loading={loading} />}

      <Router>
        <AuthProvider>
          {/* Chatbot component - available on all pages */}
          <Chatbot />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/jobs" element={<MainLayout><Jobs /></MainLayout>} />
            <Route path="/jobs/saved" element={<MainLayout><SavedJobs /></MainLayout>} />
            <Route path="/jobs/applied" element={<MainLayout><AppliedJobs /></MainLayout>} />
            <Route path="/jobs/:id" element={<MainLayout><JobDetail /></MainLayout>} />
            <Route path="/companies" element={<MainLayout><Companies /></MainLayout>} />
            <Route path="/companies/:id" element={<MainLayout><CompanyDetail /></MainLayout>} />
            <Route path="/companies/:id/review" element={<MainLayout><CompanyReview /></MainLayout>} />
            <Route path="/help" element={<MainLayout><HelpSupport /></MainLayout>} />

            {/* Protected routes - require authentication */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainLayout><Dashboard /></MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <MainLayout><Profile /></MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <MainLayout><Settings /></MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings/account"
              element={
                <ProtectedRoute>
                  <MainLayout><Settings /></MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings/privacy"
              element={
                <ProtectedRoute>
                  <MainLayout><Settings /></MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings/notifications"
              element={
                <ProtectedRoute>
                  <MainLayout><Settings /></MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <MainLayout><Messages /></MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <MainLayout><Notifications /></MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Employer-only routes */}
            <Route
              path="/employer/dashboard"
              element={
                <ProtectedRoute requiredRole="employer">
                  <MainLayout><EmployerDashboard /></MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/employer/jobs"
              element={
                <ProtectedRoute requiredRole="employer">
                  <MainLayout><ManageJobs /></MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/employer/jobs/new"
              element={
                <ProtectedRoute requiredRole="employer">
                  <MainLayout><CreateEditJob /></MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/employer/jobs/edit/:id"
              element={
                <ProtectedRoute requiredRole="employer">
                  <MainLayout><CreateEditJob /></MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/employer/jobs/duplicate/:id"
              element={
                <ProtectedRoute requiredRole="employer">
                  <MainLayout><CreateEditJob /></MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/employer/applications"
              element={
                <ProtectedRoute requiredRole="employer">
                  <MainLayout><ManageApplications /></MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Unauthorized access page */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
