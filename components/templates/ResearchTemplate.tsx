import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

export const ResearchTemplate: React.FC<{ data: ResumeData; font?: string }> = ({ data, font = 'font-serif' }) => {
    return (
        <div className={cn("text-gray-900 p-12 max-w-[210mm] mx-auto bg-white h-full min-h-[297mm]", font)}>
            {/* Header */}
            <header className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName}</h1>
                <div className="text-md space-y-1">
                    <p>{data.personalInfo.location} • {data.personalInfo.email} • {data.personalInfo.phone}</p>
                    <p>{data.personalInfo.linkedin} {data.personalInfo.website && `• ${data.personalInfo.website}`}</p>
                </div>
            </header>

            {/* Education (Priority for Research) */}
            {data.education.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-md font-bold uppercase border-b border-gray-400 mb-4">Education</h2>
                    <div className="space-y-4">
                        {data.education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between font-bold">
                                    <span>{edu.institution}</span>
                                    <span>{edu.graduationDate}</span>
                                </div>
                                <div className="italic">{edu.degree}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Research Interests / Summary */}
            {data.personalInfo.summary && (
                <section className="mb-8">
                    <h2 className="text-md font-bold uppercase border-b border-gray-400 mb-4">Research Interests</h2>
                    <p className="text-sm leading-relaxed text-justify">{data.personalInfo.summary}</p>
                </section>
            )}

            {/* Experience (Research Experience) */}
            {data.experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-md font-bold uppercase border-b border-gray-400 mb-4">Research Experience</h2>
                    <div className="space-y-6">
                        {data.experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between font-bold">
                                    <span>{exp.company}</span>
                                    <span>{exp.startDate} – {exp.endDate}</span>
                                </div>
                                <div className="italic mb-2">{exp.position}</div>
                                <p className="text-sm leading-relaxed text-justify">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {(data.skills.all?.length || 0) > 0 && (
                <section>
                    <h2 className="text-md font-bold uppercase border-b border-gray-400 mb-4">Skills</h2>
                    <p className="text-sm leading-relaxed">
                        {data.skills.all?.join(', ')}
                    </p>
                </section>
            )}
        </div>
    );
};
