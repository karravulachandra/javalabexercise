import api from './api';

// Flag to use mock data instead of real API calls
const USE_MOCK_DATA = true;

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    recipient: {
      id: 101,
      name: 'Google Recruiting',
      avatar: 'https://logo.clearbit.com/google.com',
      company: 'Google',
      isOnline: true,
      lastSeen: new Date()
    },
    lastMessage: {
      text: 'Thank you for your application. We would like to schedule an interview.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isRead: false,
      sender: 101
    },
    unreadCount: 1,
    job: {
      id: 201,
      title: 'Senior Frontend Developer'
    }
  },
  {
    id: 2,
    recipient: {
      id: 102,
      name: 'Microsoft HR',
      avatar: 'https://logo.clearbit.com/microsoft.com',
      company: 'Microsoft',
      isOnline: false,
      lastSeen: new Date(Date.now() - 1000 * 60 * 120) // 2 hours ago
    },
    lastMessage: {
      text: "We've reviewed your application and would like to move forward.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      isRead: true,
      sender: 102
    },
    unreadCount: 0,
    job: {
      id: 202,
      title: 'UX Designer'
    }
  },
  {
    id: 3,
    recipient: {
      id: 103,
      name: 'Amazon Recruiting',
      avatar: 'https://logo.clearbit.com/amazon.com',
      company: 'Amazon',
      isOnline: false,
      lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
    },
    lastMessage: {
      text: "I've sent your resume to the hiring manager. They're interested in your background.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      isRead: true,
      sender: 103
    },
    unreadCount: 0,
    job: {
      id: 203,
      title: 'Product Manager'
    }
  }
];

// Mock data for messages in a conversation
const mockMessages = {
  1: [
    {
      id: 1,
      text: "Hello! Thank you for applying to the Senior Frontend Developer position at Google.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      sender: 101,
      isRead: true
    },
    {
      id: 2,
      text: "We were impressed with your experience and would like to schedule an initial interview.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      sender: 101,
      isRead: true
    },
    {
      id: 3,
      text: "Hi, thank you for considering my application. I'm very interested in the position.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      sender: 'currentUser',
      isRead: true
    },
    {
      id: 4,
      text: "I'm available for an interview any day next week in the afternoon.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      sender: 'currentUser',
      isRead: true
    },
    {
      id: 5,
      text: "Great! How about next Tuesday at 2:00 PM PST? We'll send you a Google Meet link.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      sender: 101,
      isRead: false
    }
  ],
  2: [
    {
      id: 1,
      text: "Hello! We've received your application for the UX Designer position.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      sender: 102,
      isRead: true
    },
    {
      id: 2,
      text: "Could you please share your portfolio with us?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      sender: 102,
      isRead: true
    },
    {
      id: 3,
      text: "Of course! Here's a link to my portfolio: https://myportfolio.design",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20), // 20 hours ago
      sender: 'currentUser',
      isRead: true
    },
    {
      id: 4,
      text: "Thank you. We've reviewed your portfolio and would like to move forward with your application.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      sender: 102,
      isRead: true
    }
  ],
  3: [
    {
      id: 1,
      text: "Hello! Thank you for your interest in the Product Manager role at Amazon.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      sender: 103,
      isRead: true
    },
    {
      id: 2,
      text: "I have a few questions about your experience with agile methodologies.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      sender: 103,
      isRead: true
    },
    {
      id: 3,
      text: "I've been working with Scrum and Kanban for over 5 years. I've led multiple teams using these frameworks.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      sender: 'currentUser',
      isRead: true
    },
    {
      id: 4,
      text: "I've sent your resume to the hiring manager. They're interested in your background.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      sender: 103,
      isRead: true
    }
  ]
};

const MessageService = {
  // Get all conversations for the current user
  getConversations: async () => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getConversations');
        return mockConversations;
      }
      
      const response = await api.get('/messages/conversations');
      return response.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Get messages for a specific conversation
  getMessages: async (conversationId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getMessages:', conversationId);
        return mockMessages[conversationId] || [];
      }
      
      const response = await api.get(`/messages/conversations/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching messages for conversation ${conversationId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Send a message
  sendMessage: async (conversationId, message) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for sendMessage:', { conversationId, message });
        
        // Create a new message
        const newMessage = {
          id: (mockMessages[conversationId]?.length || 0) + 1,
          text: message,
          timestamp: new Date(),
          sender: 'currentUser',
          isRead: false
        };
        
        // Add message to conversation
        if (!mockMessages[conversationId]) {
          mockMessages[conversationId] = [];
        }
        mockMessages[conversationId].push(newMessage);
        
        // Update last message in conversation
        const conversationIndex = mockConversations.findIndex(conv => conv.id === parseInt(conversationId));
        if (conversationIndex !== -1) {
          mockConversations[conversationIndex].lastMessage = {
            text: message,
            timestamp: new Date(),
            isRead: false,
            sender: 'currentUser'
          };
        }
        
        return newMessage;
      }
      
      const response = await api.post(`/messages/conversations/${conversationId}`, { message });
      return response.data;
    } catch (error) {
      console.error(`Error sending message to conversation ${conversationId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Mark messages as read
  markAsRead: async (conversationId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for markAsRead:', conversationId);
        
        // Mark all messages as read
        if (mockMessages[conversationId]) {
          mockMessages[conversationId].forEach(message => {
            message.isRead = true;
          });
        }
        
        // Update unread count in conversation
        const conversationIndex = mockConversations.findIndex(conv => conv.id === parseInt(conversationId));
        if (conversationIndex !== -1) {
          mockConversations[conversationIndex].unreadCount = 0;
          mockConversations[conversationIndex].lastMessage.isRead = true;
        }
        
        return { success: true };
      }
      
      const response = await api.put(`/messages/conversations/${conversationId}/read`);
      return response.data;
    } catch (error) {
      console.error(`Error marking messages as read for conversation ${conversationId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  }
};

export default MessageService;
