export interface TemplateConfig {
    id: string;
    name: string;
    description: string;
    category: 'classic' | 'modern' | 'creative' | 'technical' | 'academic';
    recommended?: boolean;
}

export const templates: TemplateConfig[] = [
    // Modern (Existing & New)
    { id: 'modern', name: 'Modern', description: 'Bold and creative, stands out from the crowd.', category: 'modern', recommended: true },
    { id: 'minimal', name: 'Minimalist', description: 'Clean and simple, perfect for corporate roles.', category: 'modern' },
    { id: 'professional', name: 'Professional', description: 'Traditional layout with a modern touch.', category: 'modern' },
    { id: 'swiss', name: 'Swiss', description: 'Helvetica style, bold headers, grid layout.', category: 'modern' },
    { id: 'geometric', name: 'Geometric', description: 'Square bullets, blocky headers, modern feel.', category: 'modern' },
    { id: 'clean', name: 'Clean', description: 'Lots of whitespace, subtle gray accents.', category: 'modern' },
    { id: 'corporate', name: 'Corporate', description: 'Blue/Navy accents, professional header.', category: 'modern' },

    // Classic
    { id: 'classic-serif', name: 'Classic Serif', description: 'Times New Roman style, centered header.', category: 'classic' },
    { id: 'elegant', name: 'Elegant', description: 'Bordered sections, refined typography.', category: 'classic' },
    { id: 'timeless', name: 'Timeless', description: 'Minimalist, single column, traditional spacing.', category: 'classic' },
    { id: 'executive', name: 'Executive', description: 'Authoritative, strong headers, conservative.', category: 'classic' },

    // Creative
    { id: 'designer', name: 'Designer', description: 'Left sidebar with dark background, bold name.', category: 'creative' },
    { id: 'portfolio', name: 'Portfolio', description: 'Focus on projects, colorful headers.', category: 'creative' },
    { id: 'vibrant', name: 'Vibrant', description: 'Gradient accents and dynamic spacing.', category: 'creative' },
    { id: 'infographic', name: 'Infographic', description: 'Icons for contacts, visual skill bars.', category: 'creative' },

    // Technical
    { id: 'devops', name: 'DevOps', description: 'Terminal-like font headers, dense layout.', category: 'technical' },
    { id: 'engineering', name: 'Engineering', description: 'Two columns, focus on technical skills list.', category: 'technical' },
    { id: 'stack', name: 'Stack', description: 'Highlighted tech stack section, compact.', category: 'technical' },

    // Academic
    { id: 'research', name: 'Research', description: 'Focus on publications/research, simple list.', category: 'academic' },
    { id: 'scholar', name: 'Scholar', description: 'Latex-style look, very clean and dense.', category: 'academic' },
];
