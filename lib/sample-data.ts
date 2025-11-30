import { ResumeData } from './types';

export const sampleData: ResumeData = {
    personalInfo: {
        fullName: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/alexmorgan',
        website: 'alexmorgan.dev',
        summary: 'Creative and detail-oriented Full Stack Developer with 5+ years of experience building scalable web applications. Passionate about user experience and clean code. Proven track record of delivering high-quality software solutions in agile environments.',
    },
    experience: [
        {
            id: '1',
            company: 'TechFlow Solutions',
            position: 'Senior Frontend Engineer',
            location: 'San Francisco, CA',
            startDate: '2021-03',
            endDate: 'Present',
            description: 'Leading the frontend development of the company\'s flagship SaaS product. Improved application performance by 40% through code optimization and lazy loading.',
            details: [
                'Architected and implemented a new component library using React and Tailwind CSS.',
                'Mentored junior developers and conducted code reviews to ensure best practices.',
                'Collaborated with UX/UI designers to implement responsive and accessible designs.'
            ]
        },
        {
            id: '2',
            company: 'Innovate Corp',
            position: 'Software Developer',
            location: 'Austin, TX',
            startDate: '2018-06',
            endDate: '2021-02',
            description: 'Developed and maintained multiple client-facing web applications using the MERN stack. Participated in the full software development lifecycle from requirements gathering to deployment.',
            details: [
                'Implemented secure authentication and authorization systems using JWT and OAuth.',
                'Integrated third-party APIs for payment processing and data visualization.',
                'Reduced server response time by 25% by optimizing database queries.'
            ]
        }
    ],
    education: [
        {
            id: '1',
            institution: 'University of Technology',
            degree: 'Bachelor of Science in Computer Science',
            location: 'Austin, TX',
            graduationDate: '2018-05',
            details: [
                'Graduated with Honors (GPA 3.8/4.0)',
                'President of the Computer Science Society',
                'Relevant Coursework: Data Structures, Algorithms, Web Development, Database Systems'
            ]
        },
        {
            id: '2',
            institution: 'Cloud Academy',
            degree: 'AWS Certified Solutions Architect – Associate',
            location: 'Online',
            graduationDate: '2022-08',
            details: [
                'Comprehensive understanding of AWS services and architectural best practices.',
                'Validated expertise in designing and deploying scalable, highly available systems.'
            ]
        }
    ],
    projects: [
        {
            id: '1',
            name: 'E-commerce Dashboard',
            techStack: 'React, Node.js, MongoDB, Chart.js',
            date: '2023',
            details: [
                'Built a comprehensive analytics dashboard for e-commerce store owners.',
                'Visualized sales data, customer demographics, and inventory levels using interactive charts.',
                'Implemented real-time data updates using WebSockets.'
            ]
        },
        {
            id: '2',
            name: 'Task Management App',
            techStack: 'Vue.js, Firebase, Tailwind CSS',
            date: '2022',
            details: [
                'Developed a collaborative task management application with real-time updates.',
                'Features include drag-and-drop task organization, team collaboration, and deadline reminders.',
                'Deployed the application using Vercel and configured CI/CD pipelines.'
            ]
        }
    ],
    skills: {
        languages: ['JavaScript', 'TypeScript', 'Python'],
        frameworks: ['React', 'Next.js', 'Node.js', 'Express'],
        tools: ['Git', 'Docker', 'AWS', 'MongoDB'],
        technologies: ['REST APIs', 'GraphQL', 'CI/CD', 'Microservices'],
        all: []
    },
    // Optional sections (initially empty)
    certifications: [],
    awards: [],
    languages: [],
    volunteer: []
};
