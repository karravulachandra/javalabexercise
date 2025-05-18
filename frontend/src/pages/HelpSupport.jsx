import { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  TextField,
  Button,
  Divider,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Article as ArticleIcon,
  LiveHelp as LiveHelpIcon,
  School as SchoolIcon,
  Send as SendIcon
} from '@mui/icons-material';

const HelpSupport = () => {
  const [tabValue, setTabValue] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the form data to a backend
    console.log('Contact form submitted:', contactForm);
    // Reset form
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Show success message (in a real app)
    alert('Your message has been sent. We will get back to you soon!');
  };

  const faqItems = [
    {
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Sign Up" button in the top right corner of the homepage. Fill in your details including name, email, and password. You can also sign up using your Google account for faster registration.'
    },
    {
      question: 'How do I search for jobs?',
      answer: 'You can search for jobs by using the search bar on the Jobs page. Filter results by location, job type, salary range, and more. You can also browse jobs by category or company.'
    },
    {
      question: 'How do I apply for a job?',
      answer: 'To apply for a job, navigate to the job listing page and click the "Apply Now" button. You may need to upload your resume and cover letter. Some jobs allow quick apply with your JobPortal profile.'
    },
    {
      question: 'How do I save a job for later?',
      answer: 'To save a job, click the bookmark icon on any job listing. You can view all your saved jobs in the "Saved Jobs" section under your profile.'
    },
    {
      question: 'How do I post a job as an employer?',
      answer: 'To post a job, you need an employer account. Once logged in, go to your employer dashboard and click "Post a New Job". Fill in the job details including title, description, requirements, and application instructions.'
    },
    {
      question: 'What are the subscription plans for employers?',
      answer: 'We offer several subscription plans for employers: Basic (free), Standard ($49/month), and Premium ($99/month). Each plan offers different features such as number of job postings, resume database access, and featured listings.'
    },
    {
      question: 'How do I contact a job poster?',
      answer: 'If you have questions about a job posting, you can use the "Contact" button on the job listing page. This will send a message directly to the employer through our messaging system.'
    },
    {
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on "Login" and then "Forgot Password". Enter your email address and follow the instructions sent to your email to create a new password.'
    }
  ];

  const resourceItems = [
    {
      title: 'Resume Writing Guide',
      description: 'Learn how to create a professional resume that stands out to employers.',
      icon: <ArticleIcon color="primary" />
    },
    {
      title: 'Interview Preparation',
      description: 'Tips and strategies to help you ace your next job interview.',
      icon: <QuestionAnswerIcon color="primary" />
    },
    {
      title: 'Career Development',
      description: 'Resources for advancing your career and developing new skills.',
      icon: <SchoolIcon color="primary" />
    },
    {
      title: 'Job Search Strategies',
      description: 'Effective methods for finding and landing your dream job.',
      icon: <LiveHelpIcon color="primary" />
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Help & Support Center
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Find answers to common questions, access resources, or contact our support team for assistance.
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="help center tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="FAQ" id="tab-0" />
          <Tab label="Contact Us" id="tab-1" />
          <Tab label="Resources" id="tab-2" />
        </Tabs>
      </Box>
      
      {/* FAQ Tab */}
      <div role="tabpanel" hidden={tabValue !== 0}>
        {tabValue === 0 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Frequently Asked Questions
            </Typography>
            
            {faqItems.map((item, index) => (
              <Accordion key={index} sx={{ mb: 1 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Typography fontWeight="medium">{item.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
      </div>
      
      {/* Contact Us Tab */}
      <div role="tabpanel" hidden={tabValue !== 1}>
        {tabValue === 1 && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Typography variant="h5" gutterBottom>
                Get in Touch
              </Typography>
              <Typography variant="body1" paragraph>
                Have a question or need assistance? Fill out the form below and our support team will get back to you as soon as possible.
              </Typography>
              
              <Box component="form" onSubmit={handleContactSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactFormChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleContactFormChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleContactFormChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      value={contactForm.message}
                      onChange={handleContactFormChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="primary"
                      size="large"
                      endIcon={<SendIcon />}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h5" gutterBottom>
                  Contact Information
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email" 
                      secondary="support@jobportal.com" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Phone" 
                      secondary="+1 (555) 123-4567" 
                    />
                  </ListItem>
                </List>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                  Business Hours
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Monday - Friday: 9:00 AM - 6:00 PM EST
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Saturday: 10:00 AM - 2:00 PM EST
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sunday: Closed
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        )}
      </div>
      
      {/* Resources Tab */}
      <div role="tabpanel" hidden={tabValue !== 2}>
        {tabValue === 2 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Career Resources
            </Typography>
            <Typography variant="body1" paragraph>
              Explore our collection of resources to help you in your job search and career development.
            </Typography>
            
            <Grid container spacing={3}>
              {resourceItems.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        {item.icon}
                      </Box>
                      <Typography variant="h6" component="h3" align="center" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" align="center">
                        {item.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </div>
    </Container>
  );
};

export default HelpSupport;
