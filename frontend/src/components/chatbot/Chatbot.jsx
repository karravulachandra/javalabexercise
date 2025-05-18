import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Fab,
  Collapse,
  Divider,
  CircularProgress,
  useTheme,
  Link
} from '@mui/material';
import {
  Send as SendIcon,
  Close as CloseIcon,
  Chat as ChatIcon,
  SmartToy as BotIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import chatbotService from '../../services/chatbotService';

const Chatbot = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize with a welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = {
        role: 'bot',
        content: `Hi${currentUser ? ' ' + currentUser.firstName : ''}! I'm your job portal assistant. I can help you with:\n\n- Your [profile](/profile) information\n- [Application status](/jobs/applied)\n- [New job listings](/jobs)\n- [Saved jobs](/jobs/saved)\n\nHow can I help you today?`,
        timestamp: new Date(),
        links: [
          { text: 'profile', url: '/profile' },
          { text: 'Application status', url: '/jobs/applied' },
          { text: 'New job listings', url: '/jobs' },
          { text: 'Saved jobs', url: '/jobs/saved' }
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [currentUser]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Toggle chatbot open/closed
  const toggleChatbot = () => {
    setOpen(!open);
  };

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Add user message to chat
    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setLoading(true);

    try {
      // Process message and get response
      const response = await chatbotService.processMessage(message);

      // Extract links from the response
      const links = response.links || chatbotService.extractLinks(response.text || response);

      // Add bot response to chat
      const botMessage = {
        role: 'bot',
        content: response.text || response,
        timestamp: new Date(),
        links: links
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error processing message:', error);

      // Add error message
      const errorMessage = {
        role: 'bot',
        content: "I'm sorry, I encountered an error. Please try again later.",
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Handle link click
  const handleLinkClick = (url) => {
    // Close the chatbot
    setOpen(false);

    // Navigate to the URL
    navigate(url);
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000
        }}
        onClick={toggleChatbot}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </Fab>

      {/* Chatbot dialog */}
      <Collapse
        in={open}
        timeout="auto"
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 20,
          zIndex: 1000,
          maxWidth: 350,
          width: '100%',
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <Paper
          elevation={3}
          sx={{
            height: 450,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: 2
          }}
        >
          {/* Chatbot header */}
          <Box
            sx={{
              p: 2,
              bgcolor: 'primary.main',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8
            }}
          >
            <BotIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Job Assistant
            </Typography>
            <IconButton
              size="small"
              edge="end"
              color="inherit"
              onClick={toggleChatbot}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          {/* Messages container */}
          <Box
            sx={{
              flexGrow: 1,
              p: 2,
              overflowY: 'auto',
              bgcolor: '#f5f5f5'
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  mb: 2
                }}
              >
                {msg.role === 'bot' && (
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 32,
                      height: 32,
                      mr: msg.role === 'user' ? 0 : 1,
                      ml: msg.role === 'user' ? 1 : 0
                    }}
                  >
                    <BotIcon fontSize="small" />
                  </Avatar>
                )}

                {msg.role === 'user' && (
                  <Avatar
                    src={currentUser?.photoURL}
                    sx={{
                      width: 32,
                      height: 32,
                      mr: msg.role === 'user' ? 0 : 1,
                      ml: msg.role === 'user' ? 1 : 0,
                      bgcolor: 'secondary.main'
                    }}
                  >
                    {currentUser?.firstName?.charAt(0) || 'U'}
                  </Avatar>
                )}

                <Box
                  sx={{
                    maxWidth: '70%',
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: msg.role === 'user' ? 'primary.main' : 'white',
                    color: msg.role === 'user' ? 'white' : 'text.primary',
                    boxShadow: 1,
                    ...(msg.isError && {
                      bgcolor: '#ffebee',
                      color: 'error.main'
                    })
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ whiteSpace: 'pre-line' }}
                  >
                    {msg.content.split(/(\[[^\]]+\]\([^)]+\))/).map((part, i) => {
                      // Check if this part is a link
                      const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
                      if (linkMatch) {
                        const [, text, url] = linkMatch;
                        return (
                          <Link
                            key={i}
                            component="button"
                            onClick={() => handleLinkClick(url)}
                            sx={{
                              color: msg.role === 'user' ? 'inherit' : 'primary.main',
                              textDecoration: 'underline',
                              cursor: 'pointer',
                              fontWeight: 'medium',
                              '&:hover': {
                                textDecoration: 'underline'
                              }
                            }}
                          >
                            {text}
                          </Link>
                        );
                      }
                      return part;
                    })}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      textAlign: 'right',
                      mt: 0.5,
                      color: msg.role === 'user' ? 'rgba(255,255,255,0.7)' : 'text.secondary'
                    }}
                  >
                    {formatTime(msg.timestamp)}
                  </Typography>
                </Box>
              </Box>
            ))}

            {loading && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    width: 32,
                    height: 32,
                    mr: 1
                  }}
                >
                  <BotIcon fontSize="small" />
                </Avatar>
                <CircularProgress size={20} />
              </Box>
            )}

            <div ref={messagesEndRef} />
          </Box>

          <Divider />

          {/* Message input */}
          <Box
            component="form"
            onSubmit={handleSendMessage}
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'background.paper'
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant="outlined"
              autoComplete="off"
              disabled={loading}
              sx={{ mr: 1 }}
            />
            <IconButton
              color="primary"
              type="submit"
              disabled={!message.trim() || loading}
              aria-label="send message"
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Collapse>
    </>
  );
};

export default Chatbot;
