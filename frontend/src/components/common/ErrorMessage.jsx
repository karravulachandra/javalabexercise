import { useState, useEffect } from 'react';
import { Alert, Collapse, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

/**
 * A reusable error message component with auto-dismiss functionality
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - The error message to display
 * @param {string} props.severity - The severity level (error, warning, info, success)
 * @param {number} props.autoDismiss - Time in ms after which the message should auto-dismiss (0 for no auto-dismiss)
 * @param {Function} props.onClose - Function to call when the message is closed
 */
const ErrorMessage = ({ 
  message, 
  severity = 'error', 
  autoDismiss = 0, 
  onClose = () => {} 
}) => {
  const [open, setOpen] = useState(!!message);

  // Reset open state when message changes
  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  // Auto-dismiss functionality
  useEffect(() => {
    if (autoDismiss > 0 && message) {
      const timer = setTimeout(() => {
        setOpen(false);
        onClose();
      }, autoDismiss);
      
      return () => clearTimeout(timer);
    }
  }, [message, autoDismiss, onClose]);

  // Don't render anything if there's no message
  if (!message) {
    return null;
  }

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {message}
      </Alert>
    </Collapse>
  );
};

export default ErrorMessage;
