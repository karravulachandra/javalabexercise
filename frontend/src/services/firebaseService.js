import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword
} from "firebase/auth";
import MockDataService from './mockDataService';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpAbd6aKJyiXLEGA3YSPaUkwAJA56n4PA",
  authDomain: "chandu-823c5.firebaseapp.com",
  projectId: "chandu-823c5",
  storageBucket: "chandu-823c5.firebasestorage.app",
  messagingSenderId: "148522613841",
  appId: "1:148522613841:web:629409a643651f39cf8c70",
  measurementId: "G-ZV7R9NPBVV"
};

// Flag to use mock data instead of real Firebase
const USE_MOCK_AUTH = true;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Mock user for development
const mockUser = {
  uid: 'mock-user-id',
  email: 'user@example.com',
  displayName: 'John Doe',
  photoURL: 'https://randomuser.me/api/portraits/men/1.jpg',
  emailVerified: true
};

// Firebase Authentication Service
const FirebaseService = {
  // Get current user
  getCurrentUser: () => {
    if (USE_MOCK_AUTH) {
      return mockUser;
    }
    return auth.currentUser;
  },

  // Listen for auth state changes
  onAuthStateChanged: (callback) => {
    if (USE_MOCK_AUTH) {
      // Simulate auth state change with mock user
      setTimeout(() => {
        callback(mockUser);
      }, 500);

      // Return a fake unsubscribe function
      return () => {};
    }
    return onAuthStateChanged(auth, callback);
  },

  // Register a new user with email and password
  registerWithEmailPassword: async (email, password, userData) => {
    try {
      if (USE_MOCK_AUTH) {
        // Simulate registration with mock user
        console.log('Mock registration:', { email, password, userData });

        // Create a mock user with the provided data
        const user = {
          ...mockUser,
          email: email,
          displayName: `${userData.firstName} ${userData.lastName}`,
          photoURL: userData.photoURL || null,
          emailVerified: false
        };

        // Store user data in localStorage
        localStorage.setItem('mockUser', JSON.stringify(user));

        // Store additional user data
        const additionalData = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          company: userData.company,
          role: userData.accountType,
          emailVerified: false
        };

        // Return mock user credential
        return {
          user: user
        };
      }

      // Real Firebase registration
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with additional data
      await updateProfile(user, {
        displayName: `${userData.firstName} ${userData.lastName}`,
        photoURL: userData.photoURL || null,
      });

      // Send email verification
      await sendEmailVerification(user);

      // Store additional user data in localStorage or your backend
      const additionalData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        company: userData.company,
        role: userData.accountType,
        emailVerified: user.emailVerified
      };

      // You can store this in localStorage for now
      localStorage.setItem('userData', JSON.stringify(additionalData));

      return {
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          ...additionalData
        }
      };
    } catch (error) {
      throw error;
    }
  },

  // Sign in with email and password
  loginWithEmailPassword: async (email, password) => {
    try {
      if (USE_MOCK_AUTH) {
        // Simulate login with mock user
        console.log('Mock login:', { email, password });

        // Get stored mock user or use default
        let user = mockUser;
        const storedUser = localStorage.getItem('mockUser');
        if (storedUser) {
          user = JSON.parse(storedUser);
        }

        // Update user with provided email
        user = {
          ...user,
          email: email
        };

        // Get additional user data
        let additionalData = MockDataService.user;
        const storedData = localStorage.getItem('userData');
        if (storedData) {
          additionalData = JSON.parse(storedData);
        }

        // Store user data
        localStorage.setItem('mockUser', JSON.stringify(user));
        localStorage.setItem('userData', JSON.stringify(additionalData));

        // Return mock user data
        return {
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            emailVerified: user.emailVerified,
            ...additionalData
          }
        };
      }

      // Real Firebase login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get additional user data from localStorage or your backend
      let additionalData = {};
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        additionalData = JSON.parse(storedData);
      }

      // Update email verification status
      additionalData.emailVerified = user.emailVerified;
      localStorage.setItem('userData', JSON.stringify(additionalData));

      return {
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          ...additionalData
        }
      };
    } catch (error) {
      throw error;
    }
  },

  // Sign in with Google
  loginWithGoogle: async () => {
    try {
      if (USE_MOCK_AUTH) {
        // Simulate Google login with mock user
        console.log('Mock Google login');

        // Get stored mock user or use default
        let user = mockUser;
        const storedUser = localStorage.getItem('mockUser');
        if (storedUser) {
          user = JSON.parse(storedUser);
        }

        // Get additional user data
        let additionalData = MockDataService.user;
        const storedData = localStorage.getItem('userData');
        if (storedData) {
          additionalData = JSON.parse(storedData);
        }

        // Store user data
        localStorage.setItem('mockUser', JSON.stringify(user));
        localStorage.setItem('userData', JSON.stringify(additionalData));

        // Return mock user data
        return {
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            isNewUser: false,
            ...additionalData
          }
        };
      }

      // Real Firebase Google login
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // You might want to check if this is a new user and collect additional info
      const isNewUser = result._tokenResponse.isNewUser;

      return {
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          isNewUser
        }
      };
    } catch (error) {
      throw error;
    }
  },

  // Sign out
  logout: async () => {
    try {
      if (USE_MOCK_AUTH) {
        // Simulate logout
        console.log('Mock logout');
        localStorage.removeItem('mockUser');
        return true;
      }

      // Real Firebase logout
      await signOut(auth);
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    try {
      if (USE_MOCK_AUTH) {
        // Simulate password reset
        console.log('Mock password reset for:', email);
        return true;
      }

      // Real Firebase password reset
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Verify token (placeholder - Firebase handles this automatically)
  verifyToken: async () => {
    try {
      if (USE_MOCK_AUTH) {
        // Simulate token verification
        console.log('Mock token verification');
        const storedUser = localStorage.getItem('mockUser');
        return !!storedUser;
      }

      // Firebase handles token verification automatically
      // This is just a placeholder in case you need custom verification logic
      const currentUser = auth.currentUser;
      if (currentUser) {
        await currentUser.getIdToken(true);
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  updateUserProfile: async (profileData) => {
    try {
      if (USE_MOCK_AUTH) {
        // Simulate profile update
        console.log('Mock profile update:', profileData);

        // Get stored mock user or use default
        let user = mockUser;
        const storedUser = localStorage.getItem('mockUser');
        if (storedUser) {
          user = JSON.parse(storedUser);
        }

        // Update user with provided data
        user = {
          ...user,
          displayName: profileData.displayName || user.displayName,
          photoURL: profileData.photoURL || user.photoURL
        };

        // Get existing user data from localStorage
        let userData = MockDataService.user;
        const storedData = localStorage.getItem('userData');
        if (storedData) {
          userData = JSON.parse(storedData);
        }

        // Update additional user data
        const updatedUserData = {
          ...userData,
          phone: profileData.phone || userData.phone,
          company: profileData.company || userData.company
        };

        // Save updated data to localStorage
        localStorage.setItem('mockUser', JSON.stringify(user));
        localStorage.setItem('userData', JSON.stringify(updatedUserData));

        return {
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            ...updatedUserData
          }
        };
      }

      // Real Firebase profile update
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('No user is currently logged in');
      }

      // Update profile in Firebase Auth
      await updateProfile(currentUser, {
        displayName: profileData.displayName,
        photoURL: profileData.photoURL || currentUser.photoURL
      });

      // Get existing user data from localStorage
      let userData = {};
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        userData = JSON.parse(storedData);
      }

      // Update additional user data
      const updatedUserData = {
        ...userData,
        phone: profileData.phone || userData.phone,
        company: profileData.company || userData.company
      };

      // Save updated data to localStorage
      localStorage.setItem('userData', JSON.stringify(updatedUserData));

      return {
        user: {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          ...updatedUserData
        }
      };
    } catch (error) {
      throw error;
    }
  },

  // Change user password
  changePassword: async (currentPassword, newPassword) => {
    try {
      if (USE_MOCK_AUTH) {
        // Simulate password change
        console.log('Mock password change:', { currentPassword, newPassword });
        return { success: true };
      }

      // Real Firebase password change
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No user is currently logged in');
      }

      // Re-authenticate user before changing password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Change password
      await updatePassword(user, newPassword);

      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  // Send email verification
  sendVerificationEmail: async () => {
    try {
      if (USE_MOCK_AUTH) {
        // Simulate email verification
        console.log('Mock email verification sent');

        // Get stored mock user or use default
        let user = mockUser;
        const storedUser = localStorage.getItem('mockUser');
        if (storedUser) {
          user = JSON.parse(storedUser);
        }

        // Update user with emailVerified = true
        user = {
          ...user,
          emailVerified: true
        };

        // Store updated user
        localStorage.setItem('mockUser', JSON.stringify(user));

        return { success: true };
      }

      // Real Firebase email verification
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No user is currently logged in');
      }

      await sendEmailVerification(user);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
};

export default FirebaseService;
