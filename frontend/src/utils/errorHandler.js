/**
 * Utility functions for handling Firebase authentication errors
 */

/**
 * Maps Firebase auth error codes to user-friendly messages
 * 
 * @param {Error} error - The error object from Firebase
 * @returns {string} A user-friendly error message
 */
export const getAuthErrorMessage = (error) => {
  if (!error || !error.code) {
    return error?.message || 'An unknown error occurred';
  }

  // Map Firebase auth error codes to user-friendly messages
  const errorMessages = {
    // Email/Password Authentication Errors
    'auth/email-already-in-use': 'This email address is already in use. Please use a different email or try logging in.',
    'auth/invalid-email': 'The email address is not valid. Please check and try again.',
    'auth/user-disabled': 'This account has been disabled. Please contact support for assistance.',
    'auth/user-not-found': 'No account found with this email address. Please check your email or sign up.',
    'auth/wrong-password': 'Incorrect password. Please try again or reset your password.',
    'auth/weak-password': 'Password is too weak. Please use a stronger password with at least 6 characters.',
    'auth/invalid-credential': 'Invalid login credentials. Please check your email and password.',
    
    // Account Errors
    'auth/account-exists-with-different-credential': 'An account already exists with the same email but different sign-in credentials. Try signing in with a different method.',
    'auth/credential-already-in-use': 'These credentials are already associated with another account.',
    
    // Email Verification Errors
    'auth/invalid-action-code': 'The action code is invalid. This can happen if the code is malformed, expired, or has already been used.',
    
    // Password Reset Errors
    'auth/expired-action-code': 'The action code has expired. Please request a new password reset link.',
    
    // Recaptcha Errors
    'auth/missing-recaptcha-token': 'The reCAPTCHA verification is missing. Please complete the reCAPTCHA verification.',
    'auth/invalid-recaptcha-token': 'The reCAPTCHA verification failed. Please try again.',
    
    // General Errors
    'auth/network-request-failed': 'A network error occurred. Please check your internet connection and try again.',
    'auth/too-many-requests': 'Too many unsuccessful login attempts. Please try again later or reset your password.',
    'auth/internal-error': 'An internal error occurred. Please try again later.',
    'auth/operation-not-allowed': 'This operation is not allowed. Please contact support.',
    
    // Password Update Errors
    'auth/requires-recent-login': 'This operation requires recent authentication. Please log in again before retrying.'
  };

  return errorMessages[error.code] || error.message || 'An error occurred during authentication';
};

/**
 * Logs authentication errors to the console with additional context
 * 
 * @param {Error} error - The error object
 * @param {string} context - The context in which the error occurred
 */
export const logAuthError = (error, context = 'Authentication') => {
  console.error(`${context} Error:`, {
    code: error?.code,
    message: error?.message,
    fullError: error
  });
};

export default {
  getAuthErrorMessage,
  logAuthError
};
