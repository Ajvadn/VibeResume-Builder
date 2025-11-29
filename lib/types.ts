export interface ResumeData {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location?: string;
        linkedin: string;
        website: string; // Maps to 'portfolio' in new schema
        summary: string;
    };
    experience: ExperienceItem[];
    education: EducationItem[];
    projects: ProjectItem[];
    skills: SkillsData;
}

export interface ExperienceItem {
    id: string;
    company: string;
    position: string; // Renamed from role to match usage
    location?: string;
    startDate: string;
    endDate: string;
    description: string;
    details?: string[];
}

export interface EducationItem {
    id: string;
    institution: string;
    degree: string;
    location?: string;
    graduationDate: string; // Maps to 'date'
    details?: string[];
}

export interface ProjectItem {
    id: string;
    name: string;
    techStack: string;
    date: string;
    details: string[]; // Array of bullet points
}

export interface SkillsData {
    languages: string[];
    frameworks: string[];
    tools: string[];
    technologies: string[];
    // Legacy support for flat list if needed, or we can compute it
    all?: string[];
}
