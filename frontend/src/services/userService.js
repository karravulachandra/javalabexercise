import api from './api';
import MockDataService from './mockDataService';

// Flag to use mock data instead of real API calls
const USE_MOCK_DATA = true;

const UserService = {
  // Get current user profile
  getCurrentUser: async () => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getCurrentUser');
        return MockDataService.user;
      }
      
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Update user profile
  updateProfile: async (profileData) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for updateProfile:', profileData);
        
        // Update the mock user data
        const updatedUser = {
          ...MockDataService.user,
          ...profileData
        };
        
        // Update the user in mock data
        Object.assign(MockDataService.user, updatedUser);
        
        return { success: true, user: updatedUser };
      }
      
      const response = await api.put('/users/profile', profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Update user resume
  updateResume: async (resumeFile) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for updateResume');
        
        // In a real app, we would upload the file to a server
        // For mock data, we'll just pretend we did and return a placeholder URL
        const mockResumeUrl = 'https://example.com/resume.pdf';
        
        // Update the user's resume
        MockDataService.user.resume = mockResumeUrl;
        
        return { 
          success: true, 
          resumeUrl: mockResumeUrl
        };
      }
      
      const formData = new FormData();
      formData.append('resume', resumeFile);
      
      const response = await api.post('/users/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating resume:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Update profile picture
  updateProfilePicture: async (imageFile) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for updateProfilePicture');
        
        // In a real app, we would upload the file to a server
        // For mock data, we'll just pretend we did and return a placeholder URL
        const mockImageUrl = 'https://randomuser.me/api/portraits/men/1.jpg';
        
        // Update the user's profile picture
        MockDataService.user.profilePicture = mockImageUrl;
        
        return { 
          success: true, 
          imageUrl: mockImageUrl
        };
      }
      
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await api.post('/users/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating profile picture:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Add work experience
  addExperience: async (experienceData) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for addExperience:', experienceData);
        
        // Create a new experience entry with a unique ID
        const newExperience = {
          id: MockDataService.user.experience.length + 1,
          ...experienceData
        };
        
        // Add the experience to the user's experience array
        MockDataService.user.experience.push(newExperience);
        
        return { success: true, experience: newExperience };
      }
      
      const response = await api.post('/users/experience', experienceData);
      return response.data;
    } catch (error) {
      console.error('Error adding experience:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Update work experience
  updateExperience: async (experienceId, experienceData) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for updateExperience:', { experienceId, experienceData });
        
        // Find the experience in the user's experience array
        const experienceIndex = MockDataService.user.experience.findIndex(exp => exp.id === parseInt(experienceId));
        
        if (experienceIndex === -1) {
          throw new Error('Experience not found');
        }
        
        // Update the experience
        const updatedExperience = {
          ...MockDataService.user.experience[experienceIndex],
          ...experienceData,
          id: parseInt(experienceId) // Ensure ID doesn't change
        };
        
        // Replace the experience in the user's experience array
        MockDataService.user.experience[experienceIndex] = updatedExperience;
        
        return { success: true, experience: updatedExperience };
      }
      
      const response = await api.put(`/users/experience/${experienceId}`, experienceData);
      return response.data;
    } catch (error) {
      console.error(`Error updating experience with ID ${experienceId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Delete work experience
  deleteExperience: async (experienceId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for deleteExperience:', experienceId);
        
        // Find the experience in the user's experience array
        const experienceIndex = MockDataService.user.experience.findIndex(exp => exp.id === parseInt(experienceId));
        
        if (experienceIndex === -1) {
          throw new Error('Experience not found');
        }
        
        // Remove the experience from the user's experience array
        MockDataService.user.experience.splice(experienceIndex, 1);
        
        return { success: true };
      }
      
      const response = await api.delete(`/users/experience/${experienceId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting experience with ID ${experienceId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Add education
  addEducation: async (educationData) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for addEducation:', educationData);
        
        // Create a new education entry with a unique ID
        const newEducation = {
          id: MockDataService.user.education.length + 1,
          ...educationData
        };
        
        // Add the education to the user's education array
        MockDataService.user.education.push(newEducation);
        
        return { success: true, education: newEducation };
      }
      
      const response = await api.post('/users/education', educationData);
      return response.data;
    } catch (error) {
      console.error('Error adding education:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Update education
  updateEducation: async (educationId, educationData) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for updateEducation:', { educationId, educationData });
        
        // Find the education in the user's education array
        const educationIndex = MockDataService.user.education.findIndex(edu => edu.id === parseInt(educationId));
        
        if (educationIndex === -1) {
          throw new Error('Education not found');
        }
        
        // Update the education
        const updatedEducation = {
          ...MockDataService.user.education[educationIndex],
          ...educationData,
          id: parseInt(educationId) // Ensure ID doesn't change
        };
        
        // Replace the education in the user's education array
        MockDataService.user.education[educationIndex] = updatedEducation;
        
        return { success: true, education: updatedEducation };
      }
      
      const response = await api.put(`/users/education/${educationId}`, educationData);
      return response.data;
    } catch (error) {
      console.error(`Error updating education with ID ${educationId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Delete education
  deleteEducation: async (educationId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for deleteEducation:', educationId);
        
        // Find the education in the user's education array
        const educationIndex = MockDataService.user.education.findIndex(edu => edu.id === parseInt(educationId));
        
        if (educationIndex === -1) {
          throw new Error('Education not found');
        }
        
        // Remove the education from the user's education array
        MockDataService.user.education.splice(educationIndex, 1);
        
        return { success: true };
      }
      
      const response = await api.delete(`/users/education/${educationId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting education with ID ${educationId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Update job preferences
  updatePreferences: async (preferencesData) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for updatePreferences:', preferencesData);
        
        // Update the user's preferences
        MockDataService.user.preferences = {
          ...MockDataService.user.preferences,
          ...preferencesData
        };
        
        return { success: true, preferences: MockDataService.user.preferences };
      }
      
      const response = await api.put('/users/preferences', preferencesData);
      return response.data;
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  }
};

export default UserService;
