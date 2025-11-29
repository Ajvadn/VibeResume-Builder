import React from 'react';
import { ResumeData } from '@/lib/types';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { ModernTemplate } from './templates/ModernTemplate';

interface ResumePreviewProps {
    data: ResumeData;
    template: 'minimal' | 'modern' | 'professional';
    zoom?: number;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template, zoom = 1 }) => {
    const renderTemplate = () => {
        switch (template) {
            case 'minimal':
                return <MinimalTemplate data={data} />;
            case 'professional':
                return <ProfessionalTemplate data={data} />;
            case 'modern':
                return <ModernTemplate data={data} />;
            default:
                return <MinimalTemplate data={data} />;
        }
    };

    return (
        <div
            className="shadow-2xl mx-auto origin-top transition-transform duration-200 bg-white"
            style={{ transform: `scale(${zoom})` }}
        >
            {renderTemplate()}
        </div>
    );
};
