import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

export const ClassicSerifTemplate: React.FC<{ data: ResumeData; font?: string }> = ({ data, font = 'font-serif' }) => {
    return (
        <div className={cn("text-gray-900 p-12 max-w-[210mm] mx-auto bg-white h-full min-h-[297mm]", font)}>
            {/* Header */}
            <header className="text-center border-b-2 border-gray-800 pb-6 mb-8">
                <h1 className="text-4xl font-bold uppercase tracking-wider mb-3">{data.personalInfo.fullName}</h1>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
                    {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
                    {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
                </div>
            </header>

            {/* Summary */}
            {data.personalInfo.summary && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Professional Summary</h2>
                    <p className="text-sm leading-relaxed text-justify">{data.personalInfo.summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Experience</h2>
                    <div className="space-y-6">
                        {data.experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-md">{exp.position}</h3>
                                    <span className="text-sm italic">{exp.startDate} – {exp.endDate}</span>
                                </div>
                                <div className="text-sm font-semibold mb-2">{exp.company}</div>
                                <p className="text-sm leading-relaxed text-justify">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Education</h2>
                    <div className="space-y-4">
                        {data.education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-md">{edu.institution}</h3>
                                    <span className="text-sm italic">{edu.graduationDate}</span>
                                </div>
                                <div className="text-sm">{edu.degree}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {(data.skills.all?.length || 0) > 0 && (
                <section>
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Skills</h2>
                    <p className="text-sm leading-relaxed">
                        {data.skills.all?.join(' • ')}
                    </p>
                </section>
            )}
        </div>
    );
};
