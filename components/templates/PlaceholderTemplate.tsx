import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TemplateProps {
    data: ResumeData;
    font?: string;
}

export const PlaceholderTemplate: React.FC<TemplateProps & { name: string }> = ({ data, font = 'font-sans', name }) => {
    return (
        <div className={cn("p-10 max-w-[210mm] mx-auto bg-white h-full min-h-[297mm] flex flex-col items-center justify-center text-center", font)}>
            <h1 className="text-4xl font-bold mb-4">{name} Template</h1>
            <p className="text-gray-500 mb-8">This template is currently under construction.</p>
            <div className="p-6 border border-dashed border-gray-300 rounded-lg bg-gray-50 w-full max-w-md">
                <h2 className="text-xl font-bold mb-2">{data.personalInfo.fullName}</h2>
                <p>{data.personalInfo.email}</p>
            </div>
        </div>
    );
};
