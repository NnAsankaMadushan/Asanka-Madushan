
import { Skill, Experience, Project, Certification, Education } from './types';

export const SKILLS: Skill[] = [
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Machine Learning', icon: '🤖' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'n8n Automation', icon: '⚡' },
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'Web Developer',
    company: 'Sri Lanka Ports Authority as an intern',
    period: '2023 Oct - 2024 Jan',
  },
  {
    role: 'React Native and Flutter Mobile App Developer',
    company: 'BotCalm Private Limited as an intern',
    period: '2024 MAR - 2024 Aug',
  },
  {
    role: 'Associate Mobile App Developer (React Native and Flutter Mobile App Developer)',
    company: 'BotCalm Private Limited',
    period: '2024 Aug - Present',
  },
  {
    role: 'Videographer and Photographer',
    company: 'REF Media, Faculty of Engineering, University of Ruhuna',
    period: '2021 - 2024',
  }
];

export const EDUCATION: Education = {
  degree: "B.Sc.Eng. in Electrical and Information Engineering",
  university: "University of Ruhuna"
};

export const SPECIALIZATIONS: string[] = [
  "Web Development",
  "Mobile Development",
  "UI/UX Designing",
  "Machine Learning",
  "Power Systems Engineering",
  "Electronic Engineering",
  "Telecommunication Engineering"
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Fuel Management System',
    category: 'Web Application',
    description: 'Fuel Management System with four type of users (Vehicle, Station Owner, Operator and Admin).',
    longDescription: 'Fuel Management System with four type of users (Vehicle, Station Owner, Operator and Admin). Showing available fuel quota and creating the QR code for each vehicle. Operator have the access to scan the QR code and check the available fuel quota and give supply whether it\'s possible.',
    image: '/projects/Fuel Management System/fuel.png',
    tags: ['React', 'Node.js', 'MongoDB', 'React Native', 'QR Code'],
    link: 'https://github.com/Pradeep717/FuelQuotaManagementSystem',
    stats: [
      { label: 'Users', value: '4 Types' },
      { label: 'Features', value: 'QR System' },
      { label: 'Tech', value: 'MERN Stack' }
    ],
    video: '/projects/Fuel Management System/fmq.mp4'
  },
  {
    id: '2',
    title: 'Job Portal System',
    category: 'Web Application',
    description: 'This project aims to create a job bank website that connects three primary user roles: companies, students, and lecturers.',
    longDescription: 'This software project aims to create a job bank website that connects three primary user roles: companies, students, and lecturers. Companies will be able to post job opportunities, students can apply for those jobs, and lecturers can provide recommendations for students. Built using React, Node.js, and PostgreSQL with modern authentication and authorization mechanisms.',
    image: '/projects/Job Portal System/job.png',
    tags: ['React', 'Node.js', 'PostgreSQL', 'JWT'],
    link: 'https://github.com/Malkith99/Job-Portal-System-FRONTEND.git',
    stats: [
      { label: 'Users', value: '3 Roles' },
      { label: 'Features', value: 'Job Matching' },
      { label: 'Security', value: 'JWT Auth' }
    ],
    video: '/projects/Job Portal System/job.mp4'
  },
  {
    id: '3',
    title: 'Enhanced IoT Security through Zero Trust Architecture Implementation',
    category: 'IoT Security',
    description: 'This project implements a cutting-edge Zero Trust Architecture (ZTA) to ensure that no device is trusted by default, enhancing IoT network security with real-time, dynamic controls.',
    longDescription: 'This project implements a cutting-edge Zero Trust Architecture (ZTA) to ensure that no device is trusted by default, enhancing IoT network security with real-time, dynamic controls. Machine Learning Model Development: Trained and implemented an autoencoder-based anomaly detection model to identify unusual network patterns. Built a React-based interface to display real-time data on connected devices, trust scores, and security statuses.',
    image: '/projects/Enhanced IoT Security through Zero Trust Architecture Implementation/anomaly.png',
    tags: ['Python', 'Machine Learning', 'React', 'Flask', 'Raspberry Pi'],
    link: 'https://github.com/NnAsankaMadushan/Anomaly-Detection',
    stats: [
      { label: 'Security', value: 'Zero Trust' },
      { label: 'Detection', value: 'Real-time' },
      { label: 'ML Model', value: 'Autoencoder' }
    ]
  },
  {
    id: '8',
    title: 'Reminder Buddy',
    category: 'Mobile App',
    description: 'A voice-based smart reminder app that turns natural-language text or speech into structured reminders with offline parsing and calendar-aware workflows.',
    longDescription: 'Reminder Buddy is a Flutter mobile app that converts natural-language text and voice inputs into structured reminders using an offline rule-based NLP parser for date, time, and location extraction. It uses BLoC for modular state management, Hive for local persistence, and supports full reminder lifecycle flows including create, edit, delete, and reschedule with real-time calendar updates. The app also integrates timezone-aware local notifications and optional Google Calendar sync for upcoming-event fetches and in-app event creation.',
    image: '/projects/Reminder Buddy/Reminder Buddy.png',
    tags: ['Flutter', 'BLoC', 'Hive', 'Offline NLP', 'Local Notifications', 'Google Calendar API'],
    link: '#',
    stats: [
      { label: 'Platform', value: 'Mobile' },
      { label: 'Parsing', value: 'Offline NLP' },
      { label: 'Sync', value: 'Calendar Ready' }
    ],
    video: '/projects/Reminder Buddy/Reminder Buddy.mp4'
  },
  {
    id: '4',
    title: 'Money Mate App',
    category: 'Mobile App',
    description: 'This project implements platform with see the bills and online bill paying system.',
    longDescription: 'This project implements platform with see the bills and online bill paying system. A comprehensive financial management application that helps users track their expenses, manage bills, and make online payments securely.',
    image: '/projects/Money Mate App/money.png',
    tags: ['React Native', 'Node.js', 'MongoDB'],
    link: 'https://github.com/NnAsankaMadushan/MoneyMate-frontend',
    stats: [
      { label: 'Platform', value: 'Mobile' },
      { label: 'Features', value: 'Bill Payment' },
      { label: 'Type', value: 'FinTech' }
    ],
    video: '/projects/Money Mate App/moneymate.mp4'
  },
  {
    id: '5',
    title: 'Job Seek App',
    category: 'Mobile App',
    description: 'This project implements platform with job seeking for employees easily.',
    longDescription: 'QuickHire - A mobile application that makes job seeking easy for employees. This platform connects job seekers with employers, providing a seamless experience for finding and applying to jobs.',
    image: '/projects/Job Seek App/Job.png',
    tags: ['Flutter', 'Firebase'],
    link: 'https://github.com/NnAsankaMadushan/QuickHireApp',
    stats: [
      { label: 'Platform', value: 'Mobile' },
      { label: 'Features', value: 'Job Search' },
      { label: 'Type', value: 'Employment' }
    ],
    video: '/projects/Job Seek App/Quickhire.mp4'
  },
  {
    id: '6',
    title: 'Train App',
    category: 'UI/UX Design',
    description: 'Prototype of a train App using Figma.',
    longDescription: 'Prototype of a train app with including train tracking, tickets booking and time of the train using Figma. A comprehensive design showcasing modern UI/UX principles for a transportation application.',
    image: '/projects/Train App/train App.png',
    tags: ['Figma', 'UI/UX', 'Prototyping'],
    link: '#',
    stats: [
      { label: 'Tool', value: 'Figma' },
      { label: 'Type', value: 'Prototype' },
      { label: 'Features', value: 'Booking' }
    ],
    video: '/projects/Train App/train.mp4'
  },
  {
    id: '7',
    title: 'Driver App',
    category: 'Mobile App',
    description: 'This project implements platform drivers to find hires easily.',
    longDescription: 'This project implements a platform for drivers to find hires easily. A mobile application that connects drivers with customers, making it easy to find and manage ride requests.',
    image: '/projects/Driver App/Driving.png',
    tags: ['React Native', 'Node.js', 'Google Maps API'],
    link: 'https://github.com/Waverista/Driver-App.git',
    video: '/projects/Driver App/driver app.mp4',
    stats: [
      { label: 'Platform', value: 'Mobile' },
      { label: 'Features', value: 'Ride Matching' },
      { label: 'Type', value: 'Transportation' }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'c1',
    title: 'Python for Data Science, AI & Development',
    issuer: 'IBM',
    date: '2023',
    image: '/certificates/8.png',
    description: 'This certification validates proficiency in Python programming for data science, artificial intelligence, and development. Covers data structures, libraries like NumPy and Pandas, and practical applications in AI and data analysis.'
  },
  {
    id: 'c2',
    title: 'Lens-Kubernetes IDE',
    issuer: 'KodeKloud',
    date: '2023',
    image: '/certificates/9.png',
    description: 'Certification demonstrating expertise in using Lens, the Kubernetes IDE. Covers cluster management, resource monitoring, and efficient Kubernetes workflow optimization for container orchestration.'
  },
  {
    id: 'c3',
    title: 'Web Design for Beginners',
    issuer: 'University of Moratuwa',
    date: '2022',
    image: '/certificates/7.png',
    description: 'Comprehensive introduction to web design principles, covering HTML, CSS, responsive design, and modern web development best practices. Focuses on creating user-friendly and visually appealing websites.'
  },
  {
    id: 'c4',
    title: 'Introduction to HTML',
    issuer: 'Coursera',
    date: '2022',
    image: '/certificates/4.png',
    description: 'Foundational course covering HTML5 fundamentals, semantic markup, document structure, and best practices for creating well-structured web pages. Essential for web development beginners.'
  },
  {
    id: 'c5',
    title: 'Introduction to Back-End Development',
    issuer: 'Coursera',
    date: '2022',
    image: '/certificates/3.png',
    description: 'Introduction to server-side programming, databases, APIs, and back-end frameworks. Covers the fundamentals of building robust and scalable web applications from the server perspective.'
  },
  {
    id: 'c6',
    title: 'Introduction to Front-End Development',
    issuer: 'Coursera',
    date: '2022',
    image: '/certificates/5.png',
    description: 'Comprehensive overview of front-end development technologies including HTML, CSS, JavaScript, and modern frameworks. Focuses on creating interactive and responsive user interfaces.'
  },
  {
    id: 'c7',
    title: 'Supervised Machine Learning: Regression and Classification',
    issuer: 'Coursera',
    date: '2023',
    image: '/certificates/6.png',
    description: 'Advanced machine learning course covering supervised learning algorithms, regression models, classification techniques, and practical applications. Includes hands-on projects with real-world datasets.'
  }
];
