import { MockDataService, JobService, ApplicationService, UserService } from './index';

// Knowledge base for the chatbot
const knowledgeBase = {
  // General information about the platform
  general: [
    {
      question: "What is this job portal?",
      answer: "This is a comprehensive job portal system that helps job seekers find opportunities and companies find talent. You can search for jobs, save favorites, apply to positions, and track your applications."
    },
    {
      question: "How do I apply for a job?",
      answer: "To apply for a job, navigate to the job listing, click on 'Apply Now', fill out the application form, attach your resume, and submit your application."
    },
    {
      question: "How do I create an account?",
      answer: "Click on the 'Sign Up' button, fill in your details including name, email, and password. You can also sign up using your Google account for faster registration."
    }
  ]
};

class ChatbotService {
  constructor() {
    this.history = [];
  }

  // Add a message to the chat history
  addMessage(role, content) {
    this.history.push({ role, content, timestamp: new Date() });
    return this.history;
  }

  // Get the chat history
  getHistory() {
    return this.history;
  }

  // Clear the chat history
  clearHistory() {
    this.history = [];
    return this.history;
  }

  // Process a user message and generate a response
  async processMessage(message) {
    // Add user message to history
    this.addMessage('user', message);

    // Lowercase message for easier matching
    const lowerMessage = message.toLowerCase();

    // Check if the message is about profile information
    if (lowerMessage.includes('profile') || lowerMessage.includes('my information') || lowerMessage.includes('my details')) {
      return await this.getProfileInformation();
    }

    // Check if the message is about application status
    if (lowerMessage.includes('application') || lowerMessage.includes('status') || lowerMessage.includes('applied')) {
      return await this.getApplicationStatus();
    }

    // Check if the message is about new jobs
    if (lowerMessage.includes('new job') || lowerMessage.includes('latest job') || lowerMessage.includes('recent job')) {
      return await this.getNewJobs();
    }

    // Check if the message is about saved jobs
    if (lowerMessage.includes('saved job') || lowerMessage.includes('bookmarked') || lowerMessage.includes('favorite')) {
      return await this.getSavedJobs();
    }

    // Check if the message is about job recommendations
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggestion')) {
      return await this.getRecommendedJobs();
    }

    // Check if the message is a greeting
    if (this.isGreeting(lowerMessage)) {
      return this.handleGreeting();
    }

    // Check if the message is a thank you
    if (this.isThankYou(lowerMessage)) {
      return this.handleThankYou();
    }

    // Check if the message is a help request
    if (this.isHelpRequest(lowerMessage)) {
      return this.handleHelpRequest();
    }

    // If no specific intent is matched, provide a general response
    return this.handleGeneralQuery(message);
  }

  // Extract links from a message
  extractLinks(text) {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const links = [];
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      links.push({
        text: match[1],
        url: match[2]
      });
    }

    return links;
  }

  // Check if the message is a greeting
  isGreeting(message) {
    const greetings = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
    return greetings.some(greeting => message.includes(greeting));
  }

  // Handle greeting messages
  handleGreeting() {
    const responses = [
      "Hello! How can I help you with your job search today?",
      "Hi there! I can help you with your profile, applications, or finding new jobs. What would you like to know?",
      "Hey! I'm your job portal assistant. Ask me about your applications, saved jobs, or new opportunities!"
    ];
    const response = responses[Math.floor(Math.random() * responses.length)];
    this.addMessage('bot', response);
    return response;
  }

  // Check if the message is a thank you
  isThankYou(message) {
    const thankYouPhrases = ['thank you', 'thanks', 'appreciate it', 'thank'];
    return thankYouPhrases.some(phrase => message.includes(phrase));
  }

  // Handle thank you messages
  handleThankYou() {
    const responses = [
      "You're welcome! Is there anything else I can help you with?",
      "Happy to help! Let me know if you need anything else.",
      "No problem! Feel free to ask if you have more questions."
    ];
    const response = responses[Math.floor(Math.random() * responses.length)];
    this.addMessage('bot', response);
    return response;
  }

  // Check if the message is a help request
  isHelpRequest(message) {
    const helpPhrases = ['help', 'assist', 'support', 'what can you do', 'how do you work'];
    return helpPhrases.some(phrase => message.includes(phrase));
  }

  // Handle help requests
  handleHelpRequest() {
    const response = {
      text: "I can help you with several things:\n\n" +
        "- View your [profile](/profile) information\n" +
        "- Check the status of your [job applications](/jobs/applied)\n" +
        "- Find [new job opportunities](/jobs)\n" +
        "- View your [saved jobs](/jobs/saved)\n" +
        "- Get job [recommendations](/dashboard)\n\n" +
        "Just ask me about any of these topics!",
      links: [
        { text: 'profile', url: '/profile' },
        { text: 'job applications', url: '/jobs/applied' },
        { text: 'new job opportunities', url: '/jobs' },
        { text: 'saved jobs', url: '/jobs/saved' },
        { text: 'recommendations', url: '/dashboard' }
      ]
    };
    this.addMessage('bot', response.text);
    return response;
  }

  // Handle general queries by searching the knowledge base
  handleGeneralQuery(message) {
    // Simple implementation - in a real system, this would use more sophisticated NLP
    const response = {
      text: "I'm not sure I understand. You can ask me about:\n\n" +
        "- Your [profile](/profile) information\n" +
        "- Your [application status](/jobs/applied)\n" +
        "- [New job listings](/jobs)\n" +
        "- Your [saved jobs](/jobs/saved)\n" +
        "- [Job recommendations](/dashboard)",
      links: [
        { text: 'profile', url: '/profile' },
        { text: 'application status', url: '/jobs/applied' },
        { text: 'New job listings', url: '/jobs' },
        { text: 'saved jobs', url: '/jobs/saved' },
        { text: 'Job recommendations', url: '/dashboard' }
      ]
    };
    this.addMessage('bot', response.text);
    return response;
  }

  // Get user profile information
  async getProfileInformation() {
    try {
      const user = await UserService.getCurrentUser();

      const response = {
        text: `Here's your profile information:\n\n` +
          `Name: ${user.firstName} ${user.lastName}\n` +
          `Email: ${user.email}\n` +
          `Phone: ${user.phone || 'Not provided'}\n` +
          `Location: ${user.location || 'Not provided'}\n` +
          `Current Title: ${user.title || 'Not provided'}\n` +
          `Skills: ${user.skills ? user.skills.join(', ') : 'None listed'}\n\n` +
          `You can update your profile information in the [Profile](/profile) section.`,
        links: [
          { text: 'Profile', url: '/profile' }
        ]
      };

      this.addMessage('bot', response.text);
      return response;
    } catch (error) {
      console.error('Error fetching profile information:', error);
      const errorResponse = {
        text: "I'm sorry, I couldn't retrieve your profile information at the moment. Please try again later.",
        links: []
      };
      this.addMessage('bot', errorResponse.text);
      return errorResponse;
    }
  }

  // Get application status
  async getApplicationStatus() {
    try {
      const applications = await ApplicationService.getUserApplications();

      if (!applications || applications.length === 0) {
        const noApplicationsResponse = {
          text: "You haven't applied to any jobs yet. Browse our [job listings](/jobs) to find opportunities that match your skills and interests.",
          links: [
            { text: 'job listings', url: '/jobs' }
          ]
        };
        this.addMessage('bot', noApplicationsResponse.text);
        return noApplicationsResponse;
      }

      // Get the most recent applications (up to 3)
      const recentApplications = applications.slice(0, 3);

      let responseText = `Here are your recent job applications:\n\n`;

      recentApplications.forEach((app, index) => {
        const job = MockDataService.getJobById(app.jobId);
        responseText += `${index + 1}. ${job.title} at ${job.company}\n` +
          `   Status: ${app.status}\n` +
          `   Applied: ${app.appliedDate}\n` +
          `   Last Updated: ${app.lastUpdated}\n\n`;
      });

      responseText += `You have ${applications.length} total application(s). View all in the [Applied Jobs](/jobs/applied) section.`;

      const response = {
        text: responseText,
        links: [
          { text: 'Applied Jobs', url: '/jobs/applied' }
        ]
      };

      this.addMessage('bot', response.text);
      return response;
    } catch (error) {
      console.error('Error fetching application status:', error);
      const errorResponse = {
        text: "I'm sorry, I couldn't retrieve your application status at the moment. Please try again later.",
        links: []
      };
      this.addMessage('bot', errorResponse.text);
      return errorResponse;
    }
  }

  // Get new jobs
  async getNewJobs() {
    try {
      const allJobs = await JobService.getJobs();

      // Filter for new jobs (posted in the last 7 days)
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const newJobs = allJobs.jobs.filter(job => {
        const postedDate = new Date(job.postedDate);
        return postedDate >= oneWeekAgo || job.isNew;
      }).slice(0, 5); // Get top 5 new jobs

      if (newJobs.length === 0) {
        const noJobsResponse = {
          text: "There are no new job postings in the last 7 days. Check back later for updates!",
          links: []
        };
        this.addMessage('bot', noJobsResponse.text);
        return noJobsResponse;
      }

      let responseText = `Here are the latest job postings:\n\n`;

      newJobs.forEach((job, index) => {
        responseText += `${index + 1}. [${job.title}](/jobs/${job.id}) at ${job.company}\n` +
          `   Location: ${job.location}\n` +
          `   Salary: ${job.salary}\n` +
          `   Posted: ${job.postedDate}\n\n`;
      });

      responseText += `View all jobs in the [Jobs](/jobs) section.`;

      const response = {
        text: responseText,
        links: [
          { text: 'Jobs', url: '/jobs' },
          ...newJobs.map(job => ({ text: job.title, url: `/jobs/${job.id}` }))
        ]
      };

      this.addMessage('bot', response.text);
      return response;
    } catch (error) {
      console.error('Error fetching new jobs:', error);
      const errorResponse = {
        text: "I'm sorry, I couldn't retrieve the latest job listings at the moment. Please try again later.",
        links: []
      };
      this.addMessage('bot', errorResponse.text);
      return errorResponse;
    }
  }

  // Get saved jobs
  async getSavedJobs() {
    try {
      const savedJobs = await JobService.getSavedJobs();

      if (!savedJobs || savedJobs.length === 0) {
        const noSavedJobsResponse = {
          text: "You don't have any saved jobs yet. You can save jobs by clicking the bookmark icon on [job listings](/jobs).",
          links: [
            { text: 'job listings', url: '/jobs' }
          ]
        };
        this.addMessage('bot', noSavedJobsResponse.text);
        return noSavedJobsResponse;
      }

      let responseText = `Here are your saved jobs:\n\n`;

      const jobs = savedJobs.jobs || savedJobs;

      jobs.slice(0, 5).forEach((job, index) => {
        responseText += `${index + 1}. [${job.title}](/jobs/${job.id}) at ${job.company}\n` +
          `   Location: ${job.location}\n` +
          `   Salary: ${job.salary}\n` +
          `   Posted: ${job.postedDate}\n\n`;
      });

      if (jobs.length > 5) {
        responseText += `And ${jobs.length - 5} more. View all in the [Saved Jobs](/jobs/saved) section.`;
      }

      const response = {
        text: responseText,
        links: [
          { text: 'Saved Jobs', url: '/jobs/saved' },
          ...jobs.slice(0, 5).map(job => ({ text: job.title, url: `/jobs/${job.id}` }))
        ]
      };

      this.addMessage('bot', response.text);
      return response;
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      const errorResponse = {
        text: "I'm sorry, I couldn't retrieve your saved jobs at the moment. Please try again later.",
        links: []
      };
      this.addMessage('bot', errorResponse.text);
      return errorResponse;
    }
  }

  // Get recommended jobs
  async getRecommendedJobs() {
    try {
      const recommendedJobs = await JobService.getRecommendedJobs();

      if (!recommendedJobs || recommendedJobs.length === 0) {
        const noRecommendationsResponse = {
          text: "I don't have any job recommendations for you at the moment. Complete your [profile](/profile) to get personalized recommendations.",
          links: [
            { text: 'profile', url: '/profile' }
          ]
        };
        this.addMessage('bot', noRecommendationsResponse.text);
        return noRecommendationsResponse;
      }

      let responseText = `Here are some job recommendations based on your profile:\n\n`;

      recommendedJobs.slice(0, 3).forEach((job, index) => {
        responseText += `${index + 1}. [${job.title}](/jobs/${job.id}) at ${job.company}\n` +
          `   Location: ${job.location}\n` +
          `   Salary: ${job.salary}\n` +
          `   Match: ${job.matchPercentage || '90'}%\n\n`;
      });

      responseText += `View more recommendations on your [dashboard](/dashboard).`;

      const response = {
        text: responseText,
        links: [
          { text: 'dashboard', url: '/dashboard' },
          ...recommendedJobs.slice(0, 3).map(job => ({ text: job.title, url: `/jobs/${job.id}` }))
        ]
      };

      this.addMessage('bot', response.text);
      return response;
    } catch (error) {
      console.error('Error fetching recommended jobs:', error);
      const errorResponse = {
        text: "I'm sorry, I couldn't retrieve job recommendations at the moment. Please try again later.",
        links: []
      };
      this.addMessage('bot', errorResponse.text);
      return errorResponse;
    }
  }
}

export default new ChatbotService();
