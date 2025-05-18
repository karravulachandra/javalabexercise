import api from './api';

// Flag to use mock data instead of real API calls
const USE_MOCK_DATA = true;

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    userId: 1,
    type: 'application_status',
    title: 'Application Status Update',
    message: 'Your application for Senior Frontend Developer at Google has been viewed.',
    isRead: false,
    createdAt: '2023-06-18T10:30:00Z',
    data: {
      applicationId: 1,
      jobId: 1,
      status: 'Viewed'
    }
  },
  {
    id: 2,
    userId: 1,
    type: 'interview_invitation',
    title: 'Interview Invitation',
    message: 'You have been invited to an interview for Full Stack Developer at Facebook.',
    isRead: true,
    createdAt: '2023-06-17T14:45:00Z',
    data: {
      applicationId: 2,
      jobId: 4,
      interviewDate: '2023-06-25T13:00:00Z',
      interviewType: 'Video'
    }
  },
  {
    id: 3,
    userId: 1,
    type: 'job_recommendation',
    title: 'New Job Recommendation',
    message: 'We found a new job that matches your profile: React Developer at Airbnb.',
    isRead: false,
    createdAt: '2023-06-16T09:15:00Z',
    data: {
      jobId: 6
    }
  },
  {
    id: 4,
    userId: 1,
    type: 'application_rejected',
    title: 'Application Update',
    message: 'Your application for UX Designer at Microsoft has been rejected.',
    isRead: true,
    createdAt: '2023-06-15T16:20:00Z',
    data: {
      applicationId: 3,
      jobId: 2,
      status: 'Rejected'
    }
  },
  {
    id: 5,
    userId: 1,
    type: 'profile_view',
    title: 'Profile Viewed',
    message: 'Your profile was viewed by a recruiter from Amazon.',
    isRead: false,
    createdAt: '2023-06-14T11:10:00Z',
    data: {
      companyId: 3
    }
  }
];

const NotificationService = {
  // Get all notifications for the current user
  getNotifications: async () => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getNotifications');
        return mockNotifications;
      }
      
      const response = await api.get('/notifications');
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Get unread notifications count
  getUnreadCount: async () => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getUnreadCount');
        return mockNotifications.filter(notification => !notification.isRead).length;
      }
      
      const response = await api.get('/notifications/unread/count');
      return response.data.count;
    } catch (error) {
      console.error('Error fetching unread notifications count:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Mark a notification as read
  markAsRead: async (notificationId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for markAsRead:', notificationId);
        
        // Find the notification in mock data
        const notificationIndex = mockNotifications.findIndex(notification => notification.id === parseInt(notificationId));
        
        if (notificationIndex === -1) {
          throw new Error('Notification not found');
        }
        
        // Mark the notification as read
        mockNotifications[notificationIndex].isRead = true;
        
        return { success: true };
      }
      
      const response = await api.put(`/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      console.error(`Error marking notification ${notificationId} as read:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Mark all notifications as read
  markAllAsRead: async () => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for markAllAsRead');
        
        // Mark all notifications as read
        mockNotifications.forEach(notification => {
          notification.isRead = true;
        });
        
        return { success: true };
      }
      
      const response = await api.put('/notifications/read-all');
      return response.data;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Delete a notification
  deleteNotification: async (notificationId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for deleteNotification:', notificationId);
        
        // Find the notification in mock data
        const notificationIndex = mockNotifications.findIndex(notification => notification.id === parseInt(notificationId));
        
        if (notificationIndex === -1) {
          throw new Error('Notification not found');
        }
        
        // Remove the notification from mock data
        mockNotifications.splice(notificationIndex, 1);
        
        return { success: true };
      }
      
      const response = await api.delete(`/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting notification ${notificationId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Delete all notifications
  deleteAllNotifications: async () => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for deleteAllNotifications');
        
        // Remove all notifications
        mockNotifications.length = 0;
        
        return { success: true };
      }
      
      const response = await api.delete('/notifications');
      return response.data;
    } catch (error) {
      console.error('Error deleting all notifications:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  }
};

export default NotificationService;
