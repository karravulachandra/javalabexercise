import api from './api';
import MockDataService from './mockDataService';

// Flag to use mock data instead of real API calls
const USE_MOCK_DATA = true;

const ApplicationService = {
  // Get all applications for the current user
  getUserApplications: async () => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getUserApplications');
        
        // Get all applications for the current user (userId = 1)
        const applications = MockDataService.applications.filter(app => app.userId === 1);
        
        // Enhance applications with job details
        const enhancedApplications = applications.map(app => {
          const job = MockDataService.getJobById(app.jobId);
          return {
            ...app,
            job: job ? {
              id: job.id,
              title: job.title,
              company: job.company,
              companyLogo: job.companyLogo,
              location: job.location
            } : null
          };
        });
        
        return enhancedApplications;
      }
      
      const response = await api.get('/applications');
      return response.data;
    } catch (error) {
      console.error('Error fetching user applications:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Get a single application by ID
  getApplicationById: async (applicationId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getApplicationById:', applicationId);
        
        // Find the application in mock data
        const application = MockDataService.applications.find(app => app.id === parseInt(applicationId));
        
        if (!application) {
          throw new Error('Application not found');
        }
        
        // Enhance application with job details
        const job = MockDataService.getJobById(application.jobId);
        const enhancedApplication = {
          ...application,
          job: job ? {
            id: job.id,
            title: job.title,
            company: job.company,
            companyLogo: job.companyLogo,
            location: job.location,
            description: job.description,
            requirements: job.requirements
          } : null
        };
        
        return enhancedApplication;
      }
      
      const response = await api.get(`/applications/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching application with ID ${applicationId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Apply for a job
  applyForJob: async (jobId, applicationData) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for applyForJob:', { jobId, applicationData });
        
        // Create a new application
        const newApplication = {
          id: MockDataService.applications.length + 1,
          jobId: parseInt(jobId),
          userId: 1, // Current user ID
          status: 'Applied',
          appliedDate: new Date().toISOString().split('T')[0],
          coverLetter: applicationData.coverLetter || '',
          resume: applicationData.resume || 'https://example.com/resume.pdf',
          isRead: false,
          notes: '',
          lastUpdated: new Date().toISOString().split('T')[0]
        };
        
        // Add the application to mock data
        MockDataService.applications.push(newApplication);
        
        return { success: true, application: newApplication };
      }
      
      const response = await api.post(`/jobs/${jobId}/apply`, applicationData);
      return response.data;
    } catch (error) {
      console.error(`Error applying for job with ID ${jobId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Withdraw an application
  withdrawApplication: async (applicationId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for withdrawApplication:', applicationId);
        
        // Find the application in mock data
        const applicationIndex = MockDataService.applications.findIndex(app => app.id === parseInt(applicationId));
        
        if (applicationIndex === -1) {
          throw new Error('Application not found');
        }
        
        // Update the application status
        MockDataService.applications[applicationIndex].status = 'Withdrawn';
        MockDataService.applications[applicationIndex].lastUpdated = new Date().toISOString().split('T')[0];
        
        return { success: true };
      }
      
      const response = await api.put(`/applications/${applicationId}/withdraw`);
      return response.data;
    } catch (error) {
      console.error(`Error withdrawing application with ID ${applicationId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Get applications for a job (for employers)
  getJobApplications: async (jobId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getJobApplications:', jobId);
        
        // Filter applications by job ID
        const applications = MockDataService.applications.filter(app => app.jobId === parseInt(jobId));
        
        return applications;
      }
      
      const response = await api.get(`/jobs/${jobId}/applications`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching applications for job ${jobId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Update application status (for employers)
  updateApplicationStatus: async (applicationId, status) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for updateApplicationStatus:', { applicationId, status });
        
        // Find the application in mock data
        const applicationIndex = MockDataService.applications.findIndex(app => app.id === parseInt(applicationId));
        
        if (applicationIndex === -1) {
          throw new Error('Application not found');
        }
        
        // Update the application status
        MockDataService.applications[applicationIndex].status = status;
        MockDataService.applications[applicationIndex].lastUpdated = new Date().toISOString().split('T')[0];
        
        return { success: true, application: MockDataService.applications[applicationIndex] };
      }
      
      const response = await api.put(`/applications/${applicationId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating status for application ${applicationId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Add notes to an application (for employers)
  addApplicationNotes: async (applicationId, notes) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for addApplicationNotes:', { applicationId, notes });
        
        // Find the application in mock data
        const applicationIndex = MockDataService.applications.findIndex(app => app.id === parseInt(applicationId));
        
        if (applicationIndex === -1) {
          throw new Error('Application not found');
        }
        
        // Update the application notes
        MockDataService.applications[applicationIndex].notes = notes;
        MockDataService.applications[applicationIndex].lastUpdated = new Date().toISOString().split('T')[0];
        
        return { success: true, application: MockDataService.applications[applicationIndex] };
      }
      
      const response = await api.put(`/applications/${applicationId}/notes`, { notes });
      return response.data;
    } catch (error) {
      console.error(`Error adding notes to application ${applicationId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  }
};

export default ApplicationService;
