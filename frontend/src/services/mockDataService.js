// Mock data service to provide consistent data across the application
// This service simulates backend API responses

// Mock Jobs Data
const mockJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Google',
    companyId: 1,
    companyLogo: 'https://logo.clearbit.com/google.com',
    location: 'Mountain View, CA',
    salary: '$120K - $150K',
    jobType: 'Full-time',
    postedDate: '2023-06-10',
    description: 'We are looking for a Senior Frontend Developer to join our team. You will be responsible for developing and implementing user interface components using React.js and other frontend technologies.',
    requirements: 'At least 5 years of experience with React, JavaScript, and CSS. Experience with TypeScript, Redux, and modern frontend build tools.',
    skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML'],
    isSaved: true,
    isNew: true,
    isFeatured: true,
    applicationDeadline: '2023-07-10',
    employmentType: 'Full-time',
    experienceLevel: 'Senior',
    educationLevel: 'Bachelor\'s Degree',
    category: 'Software Development'
  },
  {
    id: 2,
    title: 'UX Designer',
    company: 'Microsoft',
    companyId: 2,
    companyLogo: 'https://logo.clearbit.com/microsoft.com',
    location: 'Redmond, WA',
    salary: '$90K - $120K',
    jobType: 'Full-time',
    postedDate: '2023-06-08',
    description: 'Microsoft is seeking a talented UX Designer to create amazing user experiences for our products. You will work closely with product managers, engineers, and other designers.',
    requirements: 'At least 3 years of experience in UX design. Proficiency in design tools like Figma or Sketch. Strong portfolio demonstrating your design process.',
    skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
    isSaved: false,
    isNew: true,
    isFeatured: false,
    applicationDeadline: '2023-07-08',
    employmentType: 'Full-time',
    experienceLevel: 'Mid-level',
    educationLevel: 'Bachelor\'s Degree',
    category: 'Design'
  },
  {
    id: 3,
    title: 'Product Manager',
    company: 'Amazon',
    companyId: 3,
    companyLogo: 'https://logo.clearbit.com/amazon.com',
    location: 'Seattle, WA',
    salary: '$110K - $140K',
    jobType: 'Full-time',
    postedDate: '2023-06-05',
    description: 'Amazon is looking for a Product Manager to drive the strategy and execution of our products. You will work with cross-functional teams to deliver products that customers love.',
    requirements: 'At least 4 years of experience in product management. Strong analytical skills and experience with agile methodologies.',
    skills: ['Product Management', 'Agile', 'Roadmapping', 'Analytics'],
    isSaved: false,
    isNew: false,
    isFeatured: false,
    applicationDeadline: '2023-07-05',
    employmentType: 'Full-time',
    experienceLevel: 'Mid-level',
    educationLevel: 'Master\'s Degree',
    category: 'Product Management'
  },
  {
    id: 4,
    title: 'Full Stack Developer',
    company: 'Facebook',
    companyId: 4,
    companyLogo: 'https://logo.clearbit.com/facebook.com',
    location: 'Menlo Park, CA',
    salary: '$130K - $160K',
    jobType: 'Full-time',
    postedDate: '2023-06-11',
    description: 'Facebook is seeking a Full Stack Developer to build and maintain our web applications. You will work on both frontend and backend development.',
    requirements: 'At least 4 years of experience with React, Node.js, and databases. Experience with GraphQL and RESTful APIs.',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript'],
    isSaved: true,
    isNew: true,
    isFeatured: true,
    applicationDeadline: '2023-07-11',
    employmentType: 'Full-time',
    experienceLevel: 'Mid-level',
    educationLevel: 'Bachelor\'s Degree',
    category: 'Software Development'
  },
  {
    id: 5,
    title: 'Frontend Engineer',
    company: 'Netflix',
    companyId: 5,
    companyLogo: 'https://logo.clearbit.com/netflix.com',
    location: 'Los Gatos, CA',
    salary: '$120K - $150K',
    jobType: 'Full-time',
    postedDate: '2023-06-10',
    description: 'Netflix is looking for a Frontend Engineer to join our team. You will be responsible for building and maintaining our web applications.',
    requirements: 'At least 3 years of experience with React, JavaScript, and CSS. Experience with state management libraries like Redux.',
    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Redux'],
    isSaved: false,
    isNew: true,
    isFeatured: false,
    applicationDeadline: '2023-07-10',
    employmentType: 'Full-time',
    experienceLevel: 'Mid-level',
    educationLevel: 'Bachelor\'s Degree',
    category: 'Software Development'
  },
  {
    id: 6,
    title: 'React Developer',
    company: 'Airbnb',
    companyId: 6,
    companyLogo: 'https://logo.clearbit.com/airbnb.com',
    location: 'San Francisco, CA',
    salary: '$110K - $140K',
    jobType: 'Contract',
    postedDate: '2023-06-09',
    description: 'Airbnb is seeking a React Developer to join our team. You will be responsible for building and maintaining our web applications.',
    requirements: 'At least 3 years of experience with React, JavaScript, and TypeScript. Experience with Redux and modern frontend build tools.',
    skills: ['React', 'JavaScript', 'TypeScript', 'Redux'],
    isSaved: false,
    isNew: false,
    isFeatured: false,
    isUrgent: true,
    applicationDeadline: '2023-07-09',
    employmentType: 'Contract',
    experienceLevel: 'Mid-level',
    educationLevel: 'Bachelor\'s Degree',
    category: 'Software Development'
  }
];

// Mock Companies Data
const mockCompanies = [
  // Technology Sector
  {
    id: 1,
    name: 'Google',
    logo: 'https://logo.clearbit.com/google.com',
    industry: 'Technology',
    location: 'Mountain View, CA',
    website: 'https://www.google.com',
    size: '10,000+ employees',
    founded: 1998,
    description: 'Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.',
    mission: 'To organize the world\'s information and make it universally accessible and useful.',
    culture: 'Google\'s culture is based on openness, innovation, and a focus on the user.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Free meals', 'Gym membership'],
    openPositions: 15,
    rating: 4.5,
    reviews: 1200,
    isVerified: true,
    isFeatured: true
  },
  {
    id: 2,
    name: 'Microsoft',
    logo: 'https://logo.clearbit.com/microsoft.com',
    industry: 'Technology',
    location: 'Redmond, WA',
    website: 'https://www.microsoft.com',
    size: '10,000+ employees',
    founded: 1975,
    description: 'Microsoft Corporation is an American multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.',
    mission: 'To empower every person and every organization on the planet to achieve more.',
    culture: 'Microsoft\'s culture is based on growth mindset, diversity and inclusion, and making a difference.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Employee stock purchase plan'],
    openPositions: 20,
    rating: 4.3,
    reviews: 950,
    isVerified: true,
    isFeatured: false
  },
  {
    id: 3,
    name: 'Amazon',
    logo: 'https://logo.clearbit.com/amazon.com',
    industry: 'E-commerce, Technology',
    location: 'Seattle, WA',
    website: 'https://www.amazon.com',
    size: '10,000+ employees',
    founded: 1994,
    description: 'Amazon.com, Inc. is an American multinational technology company based in Seattle, Washington, which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
    mission: 'To be Earth\'s most customer-centric company.',
    culture: 'Amazon\'s culture is guided by its leadership principles, including customer obsession, ownership, and high standards.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Employee discounts'],
    openPositions: 25,
    rating: 3.9,
    reviews: 1100,
    isVerified: true,
    isFeatured: true
  },
  {
    id: 4,
    name: 'Apple',
    logo: 'https://logo.clearbit.com/apple.com',
    industry: 'Technology',
    location: 'Cupertino, CA',
    website: 'https://www.apple.com',
    size: '10,000+ employees',
    founded: 1976,
    description: 'Apple Inc. is an American multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services.',
    mission: 'To bring the best user experience to customers through innovative hardware, software, and services.',
    culture: 'Apple\'s culture emphasizes excellence, innovation, and secrecy.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Employee discounts'],
    openPositions: 18,
    rating: 4.2,
    reviews: 1300,
    isVerified: true,
    isFeatured: true
  },
  {
    id: 5,
    name: 'Meta',
    logo: 'https://logo.clearbit.com/meta.com',
    industry: 'Technology',
    location: 'Menlo Park, CA',
    website: 'https://www.meta.com',
    size: '10,000+ employees',
    founded: 2004,
    description: 'Meta Platforms, Inc., doing business as Meta, is an American multinational technology conglomerate that owns Facebook, Instagram, and WhatsApp, among other products and services.',
    mission: 'To give people the power to build community and bring the world closer together.',
    culture: 'Meta\'s culture is fast-moving and focuses on making an impact.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Free meals'],
    openPositions: 22,
    rating: 4.1,
    reviews: 950,
    isVerified: true,
    isFeatured: false
  },

  // Finance Sector
  {
    id: 6,
    name: 'JPMorgan Chase',
    logo: 'https://logo.clearbit.com/jpmorganchase.com',
    industry: 'Finance',
    location: 'New York, NY',
    website: 'https://www.jpmorganchase.com',
    size: '10,000+ employees',
    founded: 1799,
    description: 'JPMorgan Chase & Co. is an American multinational investment bank and financial services holding company headquartered in New York City.',
    mission: 'To be the most respected financial services firm in the world.',
    culture: 'JPMorgan Chase\'s culture emphasizes excellence, integrity, and client service.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Tuition assistance'],
    openPositions: 30,
    rating: 3.8,
    reviews: 850,
    isVerified: true,
    isFeatured: false
  },
  {
    id: 7,
    name: 'Goldman Sachs',
    logo: 'https://logo.clearbit.com/goldmansachs.com',
    industry: 'Finance',
    location: 'New York, NY',
    website: 'https://www.goldmansachs.com',
    size: '10,000+ employees',
    founded: 1869,
    description: 'The Goldman Sachs Group, Inc. is an American multinational investment bank and financial services company.',
    mission: 'To advance sustainable economic growth and financial opportunity.',
    culture: 'Goldman Sachs\' culture values teamwork, integrity, and client service.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Wellness programs'],
    openPositions: 25,
    rating: 3.9,
    reviews: 780,
    isVerified: true,
    isFeatured: false
  },
  {
    id: 8,
    name: 'Bank of America',
    logo: 'https://logo.clearbit.com/bankofamerica.com',
    industry: 'Finance',
    location: 'Charlotte, NC',
    website: 'https://www.bankofamerica.com',
    size: '10,000+ employees',
    founded: 1998,
    description: 'Bank of America Corporation is an American multinational investment bank and financial services holding company.',
    mission: 'To help make financial lives better through the power of every connection.',
    culture: 'Bank of America\'s culture emphasizes responsible growth and client focus.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Career development'],
    openPositions: 35,
    rating: 3.7,
    reviews: 920,
    isVerified: true,
    isFeatured: false
  },

  // Healthcare Sector
  {
    id: 9,
    name: 'Johnson & Johnson',
    logo: 'https://logo.clearbit.com/jnj.com',
    industry: 'Healthcare',
    location: 'New Brunswick, NJ',
    website: 'https://www.jnj.com',
    size: '10,000+ employees',
    founded: 1886,
    description: 'Johnson & Johnson is an American multinational corporation that develops medical devices, pharmaceuticals, and consumer packaged goods.',
    mission: 'To help people everywhere live longer, healthier, happier lives.',
    culture: 'Johnson & Johnson\'s culture is guided by its Credo, emphasizing responsibility to patients, employees, communities, and shareholders.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Wellness programs'],
    openPositions: 40,
    rating: 4.0,
    reviews: 830,
    isVerified: true,
    isFeatured: true
  },
  {
    id: 10,
    name: 'Pfizer',
    logo: 'https://logo.clearbit.com/pfizer.com',
    industry: 'Healthcare',
    location: 'New York, NY',
    website: 'https://www.pfizer.com',
    size: '10,000+ employees',
    founded: 1849,
    description: 'Pfizer Inc. is an American multinational pharmaceutical and biotechnology corporation.',
    mission: 'To innovate to bring therapies to patients that significantly improve their lives.',
    culture: 'Pfizer\'s culture emphasizes courage, excellence, equity, and joy.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Career development'],
    openPositions: 35,
    rating: 3.9,
    reviews: 760,
    isVerified: true,
    isFeatured: false
  },
  {
    id: 11,
    name: 'UnitedHealth Group',
    logo: 'https://logo.clearbit.com/unitedhealthgroup.com',
    industry: 'Healthcare',
    location: 'Minnetonka, MN',
    website: 'https://www.unitedhealthgroup.com',
    size: '10,000+ employees',
    founded: 1977,
    description: 'UnitedHealth Group Incorporated is an American multinational managed healthcare and insurance company.',
    mission: 'To help people live healthier lives and help make the health system work better for everyone.',
    culture: 'UnitedHealth Group\'s culture emphasizes integrity, compassion, relationships, innovation, and performance.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Wellness programs'],
    openPositions: 50,
    rating: 3.8,
    reviews: 890,
    isVerified: true,
    isFeatured: false
  },

  // Education Sector
  {
    id: 12,
    name: 'Pearson',
    logo: 'https://logo.clearbit.com/pearson.com',
    industry: 'Education',
    location: 'London, UK',
    website: 'https://www.pearson.com',
    size: '5,000-10,000 employees',
    founded: 1844,
    description: 'Pearson plc is a British multinational publishing and education company headquartered in London, England.',
    mission: 'To help people make progress in their lives through learning.',
    culture: 'Pearson\'s culture emphasizes learning, inclusion, and innovation.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Education assistance'],
    openPositions: 20,
    rating: 3.7,
    reviews: 650,
    isVerified: true,
    isFeatured: false
  },
  {
    id: 13,
    name: 'Chegg',
    logo: 'https://logo.clearbit.com/chegg.com',
    industry: 'Education',
    location: 'Santa Clara, CA',
    website: 'https://www.chegg.com',
    size: '1,000-5,000 employees',
    founded: 2005,
    description: 'Chegg, Inc. is an American education technology company that provides digital and physical textbook rentals, online tutoring, and other student services.',
    mission: 'To help students save time, save money, and get smarter.',
    culture: 'Chegg\'s culture emphasizes innovation, student focus, and work-life balance.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Remote work options'],
    openPositions: 15,
    rating: 3.9,
    reviews: 420,
    isVerified: true,
    isFeatured: false
  },

  // Retail Sector
  {
    id: 14,
    name: 'Walmart',
    logo: 'https://logo.clearbit.com/walmart.com',
    industry: 'Retail',
    location: 'Bentonville, AR',
    website: 'https://www.walmart.com',
    size: '10,000+ employees',
    founded: 1962,
    description: 'Walmart Inc. is an American multinational retail corporation that operates a chain of hypermarkets, discount department stores, and grocery stores.',
    mission: 'To save people money so they can live better.',
    culture: 'Walmart\'s culture emphasizes service to the customer, respect for the individual, and striving for excellence.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Employee discounts'],
    openPositions: 100,
    rating: 3.5,
    reviews: 1500,
    isVerified: true,
    isFeatured: false
  },
  {
    id: 15,
    name: 'Target',
    logo: 'https://logo.clearbit.com/target.com',
    industry: 'Retail',
    location: 'Minneapolis, MN',
    website: 'https://www.target.com',
    size: '10,000+ employees',
    founded: 1902,
    description: 'Target Corporation is an American retail corporation that operates a chain of discount department stores and hypermarkets.',
    mission: 'To help all families discover the joy of everyday life.',
    culture: 'Target\'s culture emphasizes diversity, inclusion, and innovation.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Employee discounts'],
    openPositions: 80,
    rating: 3.7,
    reviews: 1200,
    isVerified: true,
    isFeatured: false
  },

  // Manufacturing Sector
  {
    id: 16,
    name: 'General Electric',
    logo: 'https://logo.clearbit.com/ge.com',
    industry: 'Manufacturing',
    location: 'Boston, MA',
    website: 'https://www.ge.com',
    size: '10,000+ employees',
    founded: 1892,
    description: 'General Electric Company is an American multinational conglomerate operating in aviation, healthcare, power, renewable energy, and more.',
    mission: 'To build a world that works.',
    culture: 'GE\'s culture emphasizes integrity, performance, and innovation.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Education assistance'],
    openPositions: 45,
    rating: 3.8,
    reviews: 950,
    isVerified: true,
    isFeatured: false
  },
  {
    id: 17,
    name: 'Boeing',
    logo: 'https://logo.clearbit.com/boeing.com',
    industry: 'Manufacturing',
    location: 'Chicago, IL',
    website: 'https://www.boeing.com',
    size: '10,000+ employees',
    founded: 1916,
    description: 'The Boeing Company is an American multinational corporation that designs, manufactures, and sells airplanes, rotorcraft, rockets, satellites, and telecommunications equipment.',
    mission: 'To connect, protect, explore and inspire the world through aerospace innovation.',
    culture: 'Boeing\'s culture emphasizes safety, quality, integrity, and sustainability.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Education assistance'],
    openPositions: 60,
    rating: 3.7,
    reviews: 880,
    isVerified: true,
    isFeatured: false
  },

  // Media & Entertainment Sector
  {
    id: 18,
    name: 'Disney',
    logo: 'https://logo.clearbit.com/disney.com',
    industry: 'Media & Entertainment',
    location: 'Burbank, CA',
    website: 'https://www.disney.com',
    size: '10,000+ employees',
    founded: 1923,
    description: 'The Walt Disney Company is an American multinational entertainment and media conglomerate.',
    mission: 'To entertain, inform and inspire people around the globe through the power of unparalleled storytelling.',
    culture: 'Disney\'s culture emphasizes creativity, innovation, and quality entertainment.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Park discounts'],
    openPositions: 70,
    rating: 4.0,
    reviews: 1100,
    isVerified: true,
    isFeatured: true
  },
  {
    id: 19,
    name: 'Netflix',
    logo: 'https://logo.clearbit.com/netflix.com',
    industry: 'Media & Entertainment',
    location: 'Los Gatos, CA',
    website: 'https://www.netflix.com',
    size: '5,000-10,000 employees',
    founded: 1997,
    description: 'Netflix, Inc. is an American subscription streaming service and production company.',
    mission: 'To entertain the world.',
    culture: 'Netflix\'s culture emphasizes freedom and responsibility, with a focus on high performance.',
    benefits: ['Health insurance', 'Retirement plans', 'Unlimited vacation', 'Parental leave'],
    openPositions: 40,
    rating: 4.2,
    reviews: 780,
    isVerified: true,
    isFeatured: false
  },

  // Hospitality & Tourism Sector
  {
    id: 20,
    name: 'Marriott International',
    logo: 'https://logo.clearbit.com/marriott.com',
    industry: 'Hospitality & Tourism',
    location: 'Bethesda, MD',
    website: 'https://www.marriott.com',
    size: '10,000+ employees',
    founded: 1927,
    description: 'Marriott International, Inc. is an American multinational company that operates, franchises, and licenses lodging including hotel, residential, and timeshare properties.',
    mission: 'To enhance the lives of our customers by creating and enabling unsurpassed vacation and leisure experiences.',
    culture: 'Marriott\'s culture emphasizes putting people first and pursuing excellence.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Hotel discounts'],
    openPositions: 90,
    rating: 3.9,
    reviews: 950,
    isVerified: true,
    isFeatured: false
  },
  {
    id: 21,
    name: 'Airbnb',
    logo: 'https://logo.clearbit.com/airbnb.com',
    industry: 'Hospitality & Tourism',
    location: 'San Francisco, CA',
    website: 'https://www.airbnb.com',
    size: '5,000-10,000 employees',
    founded: 2008,
    description: 'Airbnb, Inc. is an American company that operates an online marketplace for lodging, primarily homestays for vacation rentals, and tourism activities.',
    mission: 'To create a world where anyone can belong anywhere.',
    culture: 'Airbnb\'s culture emphasizes belonging, innovation, and adventure.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Travel credits'],
    openPositions: 35,
    rating: 4.1,
    reviews: 680,
    isVerified: true,
    isFeatured: false
  },

  // Energy & Utilities Sector
  {
    id: 22,
    name: 'ExxonMobil',
    logo: 'https://logo.clearbit.com/exxonmobil.com',
    industry: 'Energy & Utilities',
    location: 'Irving, TX',
    website: 'https://www.exxonmobil.com',
    size: '10,000+ employees',
    founded: 1870,
    description: 'Exxon Mobil Corporation is an American multinational oil and gas corporation.',
    mission: 'To be the world\'s premier petroleum and chemical manufacturing company.',
    culture: 'ExxonMobil\'s culture emphasizes safety, integrity, and excellence.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Education assistance'],
    openPositions: 55,
    rating: 3.7,
    reviews: 780,
    isVerified: true,
    isFeatured: false
  },
  {
    id: 23,
    name: 'Tesla',
    logo: 'https://logo.clearbit.com/tesla.com',
    industry: 'Energy & Utilities, Technology',
    location: 'Palo Alto, CA',
    website: 'https://www.tesla.com',
    size: '10,000+ employees',
    founded: 2003,
    description: 'Tesla, Inc. is an American electric vehicle and clean energy company.',
    mission: 'To accelerate the world\'s transition to sustainable energy.',
    culture: 'Tesla\'s culture emphasizes innovation, sustainability, and high performance.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Stock options'],
    openPositions: 65,
    rating: 3.9,
    reviews: 890,
    isVerified: true,
    isFeatured: true
  },

  // Transportation & Logistics Sector
  {
    id: 24,
    name: 'FedEx',
    logo: 'https://logo.clearbit.com/fedex.com',
    industry: 'Transportation & Logistics',
    location: 'Memphis, TN',
    website: 'https://www.fedex.com',
    size: '10,000+ employees',
    founded: 1971,
    description: 'FedEx Corporation is an American multinational conglomerate holding company focused on transportation, e-commerce, and business services.',
    mission: 'To connect people and possibilities around the world.',
    culture: 'FedEx\'s culture emphasizes safety, integrity, and customer focus.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Tuition assistance'],
    openPositions: 75,
    rating: 3.8,
    reviews: 920,
    isVerified: true,
    isFeatured: false
  },
  {
    id: 25,
    name: 'Uber',
    logo: 'https://logo.clearbit.com/uber.com',
    industry: 'Transportation & Logistics',
    location: 'San Francisco, CA',
    website: 'https://www.uber.com',
    size: '10,000+ employees',
    founded: 2009,
    description: 'Uber Technologies, Inc. is an American mobility as a service provider, allowing users to book rides, order food delivery, and more.',
    mission: 'To create opportunity through movement.',
    culture: 'Uber\'s culture emphasizes innovation, customer obsession, and diversity.',
    benefits: ['Health insurance', 'Retirement plans', 'Paid time off', 'Uber credits'],
    openPositions: 50,
    rating: 3.9,
    reviews: 850,
    isVerified: true,
    isFeatured: false
  }
];

// Mock Applications Data
const mockApplications = [
  {
    id: 1,
    jobId: 1,
    userId: 1,
    status: 'Applied',
    appliedDate: '2023-06-15',
    coverLetter: 'I am excited to apply for the Senior Frontend Developer position at Google...',
    resume: 'https://example.com/resume.pdf',
    isRead: true,
    notes: 'Strong candidate with relevant experience',
    lastUpdated: '2023-06-15'
  },
  {
    id: 2,
    jobId: 4,
    userId: 1,
    status: 'Interview',
    appliedDate: '2023-06-12',
    coverLetter: 'I am writing to express my interest in the Full Stack Developer position at Facebook...',
    resume: 'https://example.com/resume.pdf',
    isRead: true,
    notes: 'Scheduled for first interview on June 20',
    lastUpdated: '2023-06-16'
  },
  {
    id: 3,
    jobId: 2,
    userId: 1,
    status: 'Rejected',
    appliedDate: '2023-06-10',
    coverLetter: 'I am applying for the UX Designer position at Microsoft...',
    resume: 'https://example.com/resume.pdf',
    isRead: true,
    notes: 'Not enough experience in the required tools',
    lastUpdated: '2023-06-17'
  }
];

// Mock User Data
const mockUser = {
  id: 1,
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'jobseeker',
  phone: '123-456-7890',
  location: 'San Francisco, CA',
  title: 'Senior Software Engineer',
  bio: 'Experienced software engineer with a passion for building great products.',
  skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'CSS'],
  experience: [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Tech Company',
      location: 'San Francisco, CA',
      startDate: '2020-01',
      endDate: null,
      current: true,
      description: 'Leading frontend development for a SaaS product.'
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Another Tech',
      location: 'San Francisco, CA',
      startDate: '2018-03',
      endDate: '2019-12',
      current: false,
      description: 'Developed and maintained frontend applications using React.'
    }
  ],
  education: [
    {
      id: 1,
      school: 'University of California',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2014-09',
      endDate: '2018-05',
      description: 'Graduated with honors.'
    }
  ],
  resume: 'https://example.com/resume.pdf',
  profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
  socialLinks: {
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    portfolio: 'https://johndoe.com'
  },
  preferences: {
    jobTypes: ['Full-time', 'Contract'],
    locations: ['San Francisco, CA', 'Remote'],
    salary: '$120K - $150K',
    industries: ['Technology', 'Finance']
  }
};

// Export all mock data
const MockDataService = {
  jobs: mockJobs,
  companies: mockCompanies,
  applications: mockApplications,
  user: mockUser,

  // Helper methods to simulate API calls
  getJobs: (filters = {}) => {
    // Apply filters if needed
    let filteredJobs = [...mockJobs];

    // Example filtering logic
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword) ||
        job.description.toLowerCase().includes(keyword)
      );
    }

    if (filters.location) {
      const location = filters.location.toLowerCase();
      filteredJobs = filteredJobs.filter(job =>
        job.location.toLowerCase().includes(location)
      );
    }

    return filteredJobs;
  },

  getJobById: (jobId) => {
    return mockJobs.find(job => job.id === parseInt(jobId));
  },

  getCompanies: (filters = {}) => {
    // Apply filters if needed
    let filteredCompanies = [...mockCompanies];

    // Example filtering logic
    if (filters.industry) {
      filteredCompanies = filteredCompanies.filter(company =>
        company.industry.includes(filters.industry)
      );
    }

    return filteredCompanies;
  },

  getCompanyById: (companyId) => {
    return mockCompanies.find(company => company.id === parseInt(companyId));
  },

  getApplications: () => {
    return mockApplications;
  },

  getCurrentUser: () => {
    return mockUser;
  }
};

export default MockDataService;
