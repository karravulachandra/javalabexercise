import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  IconButton,
  Divider,
  Badge,
  InputAdornment,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Send as SendIcon,
  Search as SearchIcon,
  AttachFile as AttachFileIcon,
  MoreVert as MoreVertIcon,
  ArrowBack as ArrowBackIcon,
  Circle as CircleIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { MessageService } from '../services';

// Message service is used instead of mock data

const Messages = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { from: '/messages' } });
    }
  }, [currentUser, navigate]);

  // Load conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const conversationsData = await MessageService.getConversations();
        setConversations(conversationsData);
      } catch (error) {
        console.error('Error fetching conversations:', error);
        setError('Failed to load conversations');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  // Load messages when active conversation changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (activeConversation) {
        try {
          setLoading(true);
          const messagesData = await MessageService.getMessages(activeConversation.id);
          setMessages(messagesData);

          // Mark messages as read
          if (activeConversation.unreadCount > 0) {
            await MessageService.markAsRead(activeConversation.id);

            // Update conversations list
            setConversations(prevConversations =>
              prevConversations.map(conv =>
                conv.id === activeConversation.id
                  ? { ...conv, unreadCount: 0, lastMessage: { ...conv.lastMessage, isRead: true } }
                  : conv
              )
            );
          }
        } catch (error) {
          console.error('Error fetching messages:', error);
          setError('Failed to load messages');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMessages();
  }, [activeConversation]);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeConversation) return;

    try {
      // Send message using MessageService
      const sentMessage = await MessageService.sendMessage(activeConversation.id, newMessage);

      // Add message to current conversation
      setMessages([...messages, sentMessage]);

      // Update last message in conversations list
      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.id === activeConversation.id
            ? {
                ...conv,
                lastMessage: {
                  text: newMessage,
                  timestamp: new Date(),
                  isRead: false,
                  sender: 'currentUser'
                }
              }
            : conv
        )
      );

      setNewMessage('');

      // Simulate response (for demo purposes)
      if (activeConversation.id === 1) {
        setTimeout(async () => {
          const responseText = "Perfect! I'll send you the calendar invite shortly.";

          // In a real app, this would come from a websocket or polling
          const responseMsg = {
            id: messages.length + 2,
            text: responseText,
            timestamp: new Date(),
            sender: activeConversation.recipient.id,
            isRead: false
          };

          setMessages(prevMessages => [...prevMessages, responseMsg]);

          setConversations(prevConversations =>
            prevConversations.map(conv =>
              conv.id === activeConversation.id
                ? {
                    ...conv,
                    lastMessage: {
                      text: responseMsg.text,
                      timestamp: new Date(),
                      isRead: false,
                      sender: activeConversation.recipient.id
                    },
                    unreadCount: conv.unreadCount + 1
                  }
                : conv
            )
          );
        }, 5000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date) => {
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Mobile view handlers
  const handleBackToList = () => {
    setActiveConversation(null);
  };

  if (loading && conversations.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 3 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        Messages
      </Typography>

      <Paper sx={{ height: 'calc(100vh - 200px)', display: 'flex', overflow: 'hidden' }}>
        {/* Conversations List */}
        {(!isMobile || !activeConversation) && (
          <Box sx={{
            width: isMobile ? '100%' : 320,
            borderRight: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
              <TextField
                fullWidth
                placeholder="Search messages"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                size="small"
              />
            </Box>

            <List sx={{ overflow: 'auto', flexGrow: 1 }}>
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <ListItem
                    key={conversation.id}
                    button
                    selected={activeConversation?.id === conversation.id}
                    onClick={() => setActiveConversation(conversation)}
                    sx={{
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      position: 'relative',
                      py: 1.5
                    }}
                  >
                    <ListItemAvatar>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        color="success"
                        invisible={!conversation.recipient.isOnline}
                      >
                        <Avatar src={conversation.recipient.avatar}>
                          {conversation.recipient.name.charAt(0)}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle2" noWrap sx={{ fontWeight: 'medium' }}>
                            {conversation.recipient.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatTime(conversation.lastMessage.timestamp)}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary" noWrap sx={{
                            fontWeight: conversation.unreadCount > 0 ? 'bold' : 'regular',
                            color: conversation.unreadCount > 0 ? 'text.primary' : 'text.secondary'
                          }}>
                            {conversation.lastMessage.sender === 'currentUser' ? 'You: ' : ''}
                            {conversation.lastMessage.text}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" noWrap>
                            {conversation.job.title}
                          </Typography>
                        </Box>
                      }
                    />
                    {conversation.unreadCount > 0 && (
                      <Badge
                        badgeContent={conversation.unreadCount}
                        color="primary"
                        sx={{ position: 'absolute', top: 12, right: 12 }}
                      />
                    )}
                  </ListItem>
                ))
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    No conversations found
                  </Typography>
                </Box>
              )}
            </List>
          </Box>
        )}

        {/* Messages */}
        {(!isMobile || activeConversation) && (
          <Box sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'grey.50'
          }}>
            {activeConversation ? (
              <>
                {/* Conversation Header */}
                <Box sx={{
                  p: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: 'white'
                }}>
                  {isMobile && (
                    <IconButton edge="start" onClick={handleBackToList} sx={{ mr: 1 }}>
                      <ArrowBackIcon />
                    </IconButton>
                  )}
                  <Avatar
                    src={activeConversation.recipient.avatar}
                    sx={{ mr: 2 }}
                  >
                    {activeConversation.recipient.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                        {activeConversation.recipient.name}
                      </Typography>
                      {activeConversation.recipient.isOnline && (
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                          <CircleIcon sx={{ color: 'success.main', fontSize: 10, mr: 0.5 }} />
                          <Typography variant="caption" color="text.secondary">
                            Online
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {activeConversation.job.title} • {activeConversation.recipient.company}
                    </Typography>
                  </Box>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                {/* Messages List */}
                <Box sx={{
                  flexGrow: 1,
                  overflow: 'auto',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    messages.map((message) => (
                      <Box
                        key={message.id}
                        sx={{
                          display: 'flex',
                          justifyContent: message.sender === 'currentUser' ? 'flex-end' : 'flex-start',
                          mb: 2
                        }}
                      >
                        {message.sender !== 'currentUser' && (
                          <Avatar
                            src={activeConversation.recipient.avatar}
                            sx={{ width: 32, height: 32, mr: 1, mt: 0.5 }}
                          >
                            {activeConversation.recipient.name.charAt(0)}
                          </Avatar>
                        )}
                        <Box
                          sx={{
                            maxWidth: '70%',
                            p: 2,
                            borderRadius: 2,
                            bgcolor: message.sender === 'currentUser' ? 'primary.main' : 'white',
                            color: message.sender === 'currentUser' ? 'white' : 'text.primary',
                            boxShadow: 1
                          }}
                        >
                          <Typography variant="body1">
                            {message.text}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              display: 'block',
                              textAlign: 'right',
                              mt: 0.5,
                              color: message.sender === 'currentUser' ? 'rgba(255,255,255,0.7)' : 'text.secondary'
                            }}
                          >
                            {formatTime(message.timestamp)}
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </Box>

                {/* Message Input */}
                <Box sx={{
                  p: 2,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'white',
                  display: 'flex'
                }}>
                  <IconButton sx={{ mr: 1 }}>
                    <AttachFileIcon />
                  </IconButton>
                  <TextField
                    fullWidth
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    variant="outlined"
                    size="small"
                  />
                  <IconButton
                    color="primary"
                    sx={{ ml: 1 }}
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </>
            ) : (
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                flexDirection: 'column',
                p: 3
              }}>
                <Typography variant="h6" gutterBottom>
                  Select a conversation
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Choose a conversation from the list to start messaging
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Messages;
