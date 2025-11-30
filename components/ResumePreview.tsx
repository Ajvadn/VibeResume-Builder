import React from 'react';
import { ResumeData } from '@/lib/types';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicSerifTemplate } from './templates/ClassicSerifTemplate';
import { ElegantTemplate } from './templates/ElegantTemplate';
import { TimelessTemplate } from './templates/TimelessTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { SwissTemplate } from './templates/SwissTemplate';
import { GeometricTemplate } from './templates/GeometricTemplate';
import { CleanTemplate } from './templates/CleanTemplate';
import { CorporateTemplate } from './templates/CorporateTemplate';
import { DesignerTemplate } from './templates/DesignerTemplate';
import { PortfolioTemplate } from './templates/PortfolioTemplate';
import { VibrantTemplate } from './templates/VibrantTemplate';
import { InfographicTemplate } from './templates/InfographicTemplate';
import { DevOpsTemplate } from './templates/DevOpsTemplate';
import { EngineeringTemplate } from './templates/EngineeringTemplate';
import { StackTemplate } from './templates/StackTemplate';
import { ResearchTemplate } from './templates/ResearchTemplate';
import { ScholarTemplate } from './templates/ScholarTemplate';
import { PlaceholderTemplate } from './templates/PlaceholderTemplate';

interface ResumePreviewProps {
    data: ResumeData;
    template: string;
    zoom?: number;
    font?: string;
    accentColor?: string;
}

const TEMPLATE_COMPONENTS: Record<string, React.FC<any>> = {
    'minimal': MinimalTemplate,
    'professional': ProfessionalTemplate,
    'modern': ModernTemplate,
    'classic-serif': ClassicSerifTemplate,
    'elegant': ElegantTemplate,
    'timeless': TimelessTemplate,
    'executive': ExecutiveTemplate,
    'swiss': SwissTemplate,
    'geometric': GeometricTemplate,
    'clean': CleanTemplate,
    'corporate': CorporateTemplate,
    'designer': DesignerTemplate,
    'portfolio': PortfolioTemplate,
    'vibrant': VibrantTemplate,
    'infographic': InfographicTemplate,
    'devops': DevOpsTemplate,
    'engineering': EngineeringTemplate,
    'stack': StackTemplate,
    'research': ResearchTemplate,
    'scholar': ScholarTemplate,
    // Add other templates here as they are implemented
};

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template, zoom = 1, font = 'font-sans', accentColor = '#8b5cf6' }) => {
    const TemplateComponent = TEMPLATE_COMPONENTS[template] || ((props: any) => <PlaceholderTemplate {...props} name={template} />);

    return (
        <div
            className="shadow-2xl mx-auto origin-top transition-transform duration-200 bg-white"
            style={{ transform: `scale(${zoom})` }}
        >
            <TemplateComponent data={data} font={font} accentColor={accentColor} />
        </div>
    );
};
