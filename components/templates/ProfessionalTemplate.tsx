import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

export const ProfessionalTemplate: React.FC<{ data: ResumeData; font?: string }> = ({ data, font = 'font-serif' }) => {
    return (
        <div className={cn("text-black p-8 max-w-[210mm] mx-auto bg-white h-full", font)}>
            <header className="text-center border-b border-gray-400 pb-6 mb-6">
                <h1 className="text-4xl font-bold mb-3">{data.personalInfo.fullName}</h1>
                <div className="text-sm flex justify-center gap-4 text-gray-800">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
                    {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
                </div>
            </header>

            {data.personalInfo.summary && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3">Professional Summary</h2>
                    <p className="text-sm leading-relaxed text-justify">{data.personalInfo.summary}</p>
                </section>
            )}

            {data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4">Work Experience</h2>
                    <div className="space-y-5">
                        {data.experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between font-bold text-md">
                                    <h3>{exp.company}</h3>
                                    <span>{exp.startDate} – {exp.endDate}</span>
                                </div>
                                <div className="italic text-sm mb-2">{exp.position}</div>
                                <p className="text-sm text-justify">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4">Education</h2>
                    <div className="space-y-3">
                        {data.education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between font-bold">
                                    <h3>{edu.institution}</h3>
                                    <span>{edu.graduationDate}</span>
                                </div>
                                <div className="text-sm">{edu.degree}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {(data.skills.languages?.length > 0 || data.skills.frameworks?.length > 0 || data.skills.tools?.length > 0 || data.skills.technologies?.length > 0 || (data.skills.all?.length || 0) > 0) && (
                <section>
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3">Skills</h2>
                    <div className="text-sm flex flex-wrap gap-x-6 gap-y-2">
                        {[
                            ...(data.skills.languages || []),
                            ...(data.skills.frameworks || []),
                            ...(data.skills.tools || []),
                            ...(data.skills.technologies || []),
                            ...(data.skills.all || [])
                        ].map((skill, i) => (
                            <span key={i} className="list-item list-inside">{skill}</span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};
