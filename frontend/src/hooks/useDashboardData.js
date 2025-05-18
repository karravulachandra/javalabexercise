import { useState, useEffect } from 'react';
import JobService from '../services/jobService';
import { useAuth } from '../context/AuthContext';

const useDashboardData = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    applications: [],
    recommendedJobs: [],
    savedJobs: [],
    stats: {
      totalApplications: 0,
      profileViews: 0,
      interviews: 0,
      offers: 0
    },
    applicationStatus: {
      applied: 0,
      viewed: 0,
      interview: 0,
      offer: 0,
      rejected: 0
    },
    applicationTrends: {
      labels: [],
      applications: [],
      interviews: []
    }
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!isAuthenticated()) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch user's job applications
        const applications = await JobService.getUserApplications();
        
        // Fetch recommended jobs
        const recommendedJobs = await JobService.getRecommendedJobs();
        
        // Fetch saved jobs
        const savedJobs = await JobService.getSavedJobs();
        
        // Calculate application status counts
        const statusCounts = {
          applied: 0,
          viewed: 0,
          interview: 0,
          offer: 0,
          rejected: 0
        };
        
        applications.forEach(app => {
          statusCounts[app.status.toLowerCase()] = (statusCounts[app.status.toLowerCase()] || 0) + 1;
        });
        
        // Generate application trends data (last 6 months)
        const trends = generateTrendsData(applications);
        
        // Update dashboard data
        setDashboardData({
          applications: applications.slice(0, 3), // Most recent 3 applications
          recommendedJobs: recommendedJobs.slice(0, 3), // Top 3 recommended jobs
          savedJobs: savedJobs.slice(0, 3), // First 3 saved jobs
          stats: {
            totalApplications: applications.length,
            profileViews: Math.floor(Math.random() * 200) + 50, // Mock data
            interviews: statusCounts.interview || 0,
            offers: statusCounts.offer || 0
          },
          applicationStatus: statusCounts,
          applicationTrends: trends
        });
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated, currentUser]);

  // Helper function to generate trends data
  const generateTrendsData = (applications) => {
    const months = [];
    const applicationsData = [];
    const interviewsData = [];
    
    // Get last 6 months
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push(month.toLocaleString('default', { month: 'short' }));
      
      // Count applications for this month
      const monthApplications = applications.filter(app => {
        const appDate = new Date(app.appliedDate);
        return appDate.getMonth() === month.getMonth() && 
               appDate.getFullYear() === month.getFullYear();
      });
      
      applicationsData.push(monthApplications.length);
      
      // Count interviews for this month
      const monthInterviews = monthApplications.filter(app => 
        app.status.toLowerCase() === 'interview' || 
        app.status.toLowerCase() === 'offer'
      );
      
      interviewsData.push(monthInterviews.length);
    }
    
    return {
      labels: months,
      applications: applicationsData,
      interviews: interviewsData
    };
  };

  return { loading, error, dashboardData };
};

export default useDashboardData;
