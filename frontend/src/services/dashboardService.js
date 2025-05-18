import apiClient from './apiClient';
import MockDataService from './mockDataService';

// Flag to use mock data instead of real API calls
const USE_MOCK_DATA = true;

const DashboardService = {
  // Get dashboard data for job seekers
  getJobSeekerDashboard: async () => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getJobSeekerDashboard');
        
        // Get applications from mock data
        const applications = MockDataService.applications;
        
        // Calculate stats
        const totalApplications = applications.length;
        const profileViews = 45; // Mock value
        const interviews = applications.filter(app => app.status === 'Interview').length;
        const offers = applications.filter(app => app.status === 'Offer').length;
        
        // Get application status counts
        const applied = applications.filter(app => app.status === 'Applied').length;
        const viewed = applications.filter(app => app.status === 'Viewed').length;
        const interview = interviews;
        const offer = offers;
        const rejected = applications.filter(app => app.status === 'Rejected').length;
        
        // Get recent applications with job details
        const recentApplications = applications.slice(0, 3).map(app => {
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
        
        // Get recommended jobs
        const recommendedJobs = MockDataService.getJobs().slice(0, 3);
        
        // Mock application trends data
        const applicationTrends = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          applications: [5, 8, 12, 7, 10, 15],
          interviews: [2, 3, 5, 3, 4, 6]
        };
        
        return {
          stats: {
            totalApplications,
            profileViews,
            interviews,
            offers
          },
          recentApplications,
          recommendedJobs,
          applicationStatus: {
            applied,
            viewed,
            interview,
            offer,
            rejected
          },
          applicationTrends
        };
      }
      
      const response = await apiClient.get('/dashboard/jobseeker');
      return response.data;
    } catch (error) {
      console.error('Error fetching job seeker dashboard:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },
  
  // Get dashboard data for employers
  getEmployerDashboard: async () => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getEmployerDashboard');
        
        // Mock employer dashboard data
        const jobs = MockDataService.getJobs().slice(0, 5);
        const totalJobs = jobs.length;
        const activeJobs = jobs.filter(job => !job.isExpired).length;
        const totalApplications = MockDataService.applications.length;
        const newApplications = MockDataService.applications.filter(app => !app.isRead).length;
        
        // Mock application stats
        const applicationStats = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          applications: [15, 20, 25, 18, 30, 35]
        };
        
        // Mock job stats
        const jobStats = {
          active: activeJobs,
          expired: totalJobs - activeJobs,
          draft: 2 // Mock value
        };
        
        // Mock recent applications
        const recentApplications = MockDataService.applications.slice(0, 5).map(app => {
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
        
        return {
          stats: {
            totalJobs,
            activeJobs,
            totalApplications,
            newApplications
          },
          applicationStats,
          jobStats,
          recentJobs: jobs,
          recentApplications
        };
      }
      
      const response = await apiClient.get('/dashboard/employer');
      return response.data;
    } catch (error) {
      console.error('Error fetching employer dashboard:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  }
};

export default DashboardService;
