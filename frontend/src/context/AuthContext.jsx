import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient, FirebaseService, MockDataService } from '../services';
import { getAuthErrorMessage, logAuthError } from '../utils/errorHandler';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Initialize auth state on component mount
  useEffect(() => {
    const unsubscribe = FirebaseService.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          // User is signed in
          // Get additional user data from localStorage or your backend
          let additionalData = {};
          const storedData = localStorage.getItem('userData');
          if (storedData) {
            additionalData = JSON.parse(storedData);
          } else {
            // If no stored data, use mock data for development
            additionalData = MockDataService.user;
          }

          setCurrentUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            ...additionalData
          });
        } else {
          // User is signed out
          setCurrentUser(null);
        }
      } catch (err) {
        logAuthError(err, 'Auth Initialization');
        // If there's an error, log the user out
        FirebaseService.logout();
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Register a new user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const { email, password, ...otherData } = userData;
      const data = await FirebaseService.registerWithEmailPassword(email, password, otherData);
      // Don't set current user here - it will be set by the auth state listener
      return data;
    } catch (err) {
      logAuthError(err, 'Registration');
      setError(getAuthErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login a user with email and password
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const { email, password } = credentials;
      const data = await FirebaseService.loginWithEmailPassword(email, password);
      // Don't set current user here - it will be set by the auth state listener
      return data;
    } catch (err) {
      logAuthError(err, 'Login');
      setError(getAuthErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await FirebaseService.loginWithGoogle();
      // Don't set current user here - it will be set by the auth state listener
      return data;
    } catch (err) {
      logAuthError(err, 'Google Login');
      setError(getAuthErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout the current user
  const logout = async () => {
    try {
      await FirebaseService.logout();
      // Don't set current user here - it will be set by the auth state listener
      navigate('/login');
    } catch (err) {
      logAuthError(err, 'Logout');
      setError(getAuthErrorMessage(err));
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await FirebaseService.updateUserProfile(userData);
      // Don't set current user here - it will be set by the auth state listener
      return data;
    } catch (err) {
      logAuthError(err, 'Profile Update');
      setError(getAuthErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Request password reset
  const requestPasswordReset = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await FirebaseService.requestPasswordReset(email);
      return { success: true };
    } catch (err) {
      logAuthError(err, 'Password Reset Request');
      setError(getAuthErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      await FirebaseService.changePassword(currentPassword, newPassword);
      return { success: true };
    } catch (err) {
      logAuthError(err, 'Password Change');
      setError(getAuthErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Send verification email
  const sendVerificationEmail = async () => {
    setLoading(true);
    setError(null);
    try {
      await FirebaseService.sendVerificationEmail();
      return { success: true };
    } catch (err) {
      logAuthError(err, 'Email Verification');
      setError(getAuthErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!currentUser;
  };

  // Context value
  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    loginWithGoogle,
    logout,
    updateProfile,
    requestPasswordReset,
    changePassword,
    sendVerificationEmail,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
