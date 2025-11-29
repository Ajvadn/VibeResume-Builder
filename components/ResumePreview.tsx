import React from 'react';
import { ResumeData } from '@/lib/types';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { ModernTemplate } from './templates/ModernTemplate';

interface ResumePreviewProps {
    data: ResumeData;
    template: 'minimal' | 'modern' | 'professional';
    zoom?: number;
    font?: string;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template, zoom = 1, font = 'font-sans' }) => {
    const renderTemplate = () => {
        switch (template) {
            case 'minimal':
                return <MinimalTemplate data={data} font={font} />;
            case 'professional':
                return <ProfessionalTemplate data={data} font={font} />;
            case 'modern':
                return <ModernTemplate data={data} font={font} />;
            default:
                return <MinimalTemplate data={data} font={font} />;
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
