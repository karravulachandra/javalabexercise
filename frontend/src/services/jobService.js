import api from './api';
import MockDataService from './mockDataService';

// Flag to use mock data instead of real API calls
const USE_MOCK_DATA = true;

const JobService = {
  // Get all jobs with optional filters
  getJobs: async (filters = {}) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getJobs with filters:', filters);
        const jobs = MockDataService.getJobs(filters);

        // Simulate API response format
        return {
          jobs: jobs,
          total: jobs.length,
          page: filters.page || 1,
          limit: filters.limit || 10
        };
      }

      const response = await api.get('/jobs', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get a single job by ID
  getJobById: async (jobId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getJobById:', jobId);
        const job = MockDataService.getJobById(parseInt(jobId));

        if (!job) {
          throw new Error('Job not found');
        }

        return job;
      }

      const response = await api.get(`/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching job with ID ${jobId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get recommended jobs for the current user
  getRecommendedJobs: async () => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getRecommendedJobs');
        // Return first 3 jobs as recommended
        return MockDataService.getJobs().slice(0, 3);
      }

      const response = await api.get('/jobs/recommended');
      return response.data;
    } catch (error) {
      console.error('Error fetching recommended jobs:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Search jobs by keyword and location
  searchJobs: async (params = {}) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for searchJobs with params:', params);

        // Filter jobs by params
        let filteredJobs = MockDataService.getJobs();

        if (params.keyword) {
          const keywordLower = params.keyword.toLowerCase();
          filteredJobs = filteredJobs.filter(job =>
            job.title.toLowerCase().includes(keywordLower) ||
            job.company.toLowerCase().includes(keywordLower) ||
            job.description.toLowerCase().includes(keywordLower) ||
            (job.skills && job.skills.some(skill => skill.toLowerCase().includes(keywordLower)))
          );
        }

        if (params.location) {
          const locationLower = params.location.toLowerCase();
          filteredJobs = filteredJobs.filter(job =>
            job.location.toLowerCase().includes(locationLower)
          );
        }

        // Apply additional filters
        if (params.jobType && params.jobType.length > 0) {
          filteredJobs = filteredJobs.filter(job =>
            params.jobType.includes(job.jobType)
          );
        }

        if (params.experienceLevel && params.experienceLevel.length > 0) {
          filteredJobs = filteredJobs.filter(job =>
            params.experienceLevel.includes(job.experienceLevel)
          );
        }

        if (params.category && params.category.length > 0) {
          filteredJobs = filteredJobs.filter(job =>
            params.category.includes(job.category)
          );
        }

        // Pagination
        const page = params.page || 1;
        const limit = params.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

        return {
          jobs: paginatedJobs,
          total: filteredJobs.length,
          page: page,
          limit: limit,
          totalPages: Math.ceil(filteredJobs.length / limit)
        };
      }

      const response = await api.get('/jobs/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching jobs:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get jobs by category
  getJobsByCategory: async (categoryId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getJobsByCategory:', categoryId);

        // Filter jobs by category
        const filteredJobs = MockDataService.getJobs().filter(job =>
          job.category && job.category.toLowerCase() === categoryId.toLowerCase()
        );

        return {
          jobs: filteredJobs,
          total: filteredJobs.length
        };
      }

      const response = await api.get(`/jobs/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching jobs for category ${categoryId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get jobs posted by a company
  getJobsByCompany: async (companyId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getJobsByCompany:', companyId);

        // Filter jobs by company ID
        const filteredJobs = MockDataService.getJobs().filter(job =>
          job.companyId === parseInt(companyId)
        );

        return {
          jobs: filteredJobs,
          total: filteredJobs.length
        };
      }

      const response = await api.get(`/jobs/company/${companyId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching jobs for company ${companyId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get saved jobs for the current user
  getSavedJobs: async () => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getSavedJobs');
        // Filter jobs where isSaved is true
        const savedJobs = MockDataService.getJobs().filter(job => job.isSaved);

        return {
          jobs: savedJobs,
          total: savedJobs.length
        };
      }

      const response = await api.get('/jobs/saved');
      return response.data;
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Save a job
  saveJob: async (jobId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for saveJob:', jobId);
        // Find the job in mock data
        const jobs = MockDataService.jobs;
        const jobIndex = jobs.findIndex(job => job.id === parseInt(jobId));

        if (jobIndex === -1) {
          throw new Error('Job not found');
        }

        // Update the job's isSaved property
        jobs[jobIndex].isSaved = true;

        return { success: true, job: jobs[jobIndex] };
      }

      const response = await api.post(`/jobs/${jobId}/save`);
      return response.data;
    } catch (error) {
      console.error(`Error saving job with ID ${jobId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Unsave a job
  unsaveJob: async (jobId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for unsaveJob:', jobId);
        // Find the job in mock data
        const jobs = MockDataService.jobs;
        const jobIndex = jobs.findIndex(job => job.id === parseInt(jobId));

        if (jobIndex === -1) {
          throw new Error('Job not found');
        }

        // Update the job's isSaved property
        jobs[jobIndex].isSaved = false;

        return { success: true, job: jobs[jobIndex] };
      }

      const response = await api.delete(`/jobs/${jobId}/save`);
      return response.data;
    } catch (error) {
      console.error(`Error unsaving job with ID ${jobId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Toggle save status of a job
  toggleSaveJob: async (jobId, isSaved) => {
    try {
      if (isSaved) {
        return await JobService.saveJob(jobId);
      } else {
        return await JobService.unsaveJob(jobId);
      }
    } catch (error) {
      console.error(`Error toggling save status for job with ID ${jobId}:`, error);
      throw error;
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

  // Get applications for a job (for employers)
  getJobApplications: async (jobId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getJobApplications:', jobId);

        // Filter applications by job ID
        const applications = MockDataService.applications.filter(app =>
          app.jobId === parseInt(jobId)
        );

        return applications;
      }

      const response = await api.get(`/jobs/${jobId}/applications`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching applications for job ${jobId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get user's job applications
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

  // Create a new job (for employers)
  createJob: async (jobData) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for createJob:', jobData);

        // Create a new job with a unique ID
        const newJob = {
          id: MockDataService.jobs.length + 1,
          ...jobData,
          postedDate: new Date().toISOString().split('T')[0],
          isNew: true,
          isSaved: false
        };

        // Add the job to mock data
        MockDataService.jobs.push(newJob);

        return { success: true, job: newJob };
      }

      const response = await api.post('/jobs', jobData);
      return response.data;
    } catch (error) {
      console.error('Error creating job:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Update a job (for employers)
  updateJob: async (jobId, jobData) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for updateJob:', { jobId, jobData });

        // Find the job in mock data
        const jobs = MockDataService.jobs;
        const jobIndex = jobs.findIndex(job => job.id === parseInt(jobId));

        if (jobIndex === -1) {
          throw new Error('Job not found');
        }

        // Update the job
        const updatedJob = {
          ...jobs[jobIndex],
          ...jobData,
          id: parseInt(jobId) // Ensure ID doesn't change
        };

        // Replace the job in mock data
        jobs[jobIndex] = updatedJob;

        return { success: true, job: updatedJob };
      }

      const response = await api.put(`/jobs/${jobId}`, jobData);
      return response.data;
    } catch (error) {
      console.error(`Error updating job with ID ${jobId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Delete a job (for employers)
  deleteJob: async (jobId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for deleteJob:', jobId);

        // Find the job in mock data
        const jobs = MockDataService.jobs;
        const jobIndex = jobs.findIndex(job => job.id === parseInt(jobId));

        if (jobIndex === -1) {
          throw new Error('Job not found');
        }

        // Remove the job from mock data
        jobs.splice(jobIndex, 1);

        return { success: true };
      }

      const response = await api.delete(`/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting job with ID ${jobId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  }
};

export default JobService;
