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
    // Optional sections
    certifications?: CertificationItem[];
    awards?: AwardItem[];
    languages?: LanguageItem[];
    volunteer?: VolunteerItem[];
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

export interface CertificationItem {
    id: string;
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
    url?: string;
}

export interface AwardItem {
    id: string;
    title: string;
    issuer: string;
    date: string;
    description?: string;
}

export interface LanguageItem {
    id: string;
    language: string;
    proficiency: string; // e.g., Native, Fluent, Professional, Conversational
}

export interface VolunteerItem {
    id: string;
    organization: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
}
