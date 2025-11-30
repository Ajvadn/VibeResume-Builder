import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

export const MinimalTemplate: React.FC<{ data: ResumeData; font?: string; accentColor?: string }> = ({ data, font = 'font-sans', accentColor = '#000000' }) => {
    return (
        <div className={cn("text-black p-8 max-w-[210mm] mx-auto bg-white h-full", font)}>
            <header className="pb-4 mb-6" style={{ borderBottom: `2px solid ${accentColor}` }}>
                <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">{data.personalInfo.fullName}</h1>
                <div className="text-sm flex flex-wrap gap-4 text-gray-700">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                    {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
                    {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
                </div>
            </header>

            {data.personalInfo.summary && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase mb-2">Summary</h2>
                    <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
                </section>
            )}

            {data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase mb-4">Experience</h2>
                    <div className="space-y-4">
                        {data.experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-md">{exp.position}</h3>
                                    <span className="text-sm text-gray-600">{exp.startDate} – {exp.endDate}</span>
                                </div>
                                <div className="text-sm font-semibold italic mb-1">{exp.company}</div>
                                <p className="text-sm whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase mb-4">Education</h2>
                    <div className="space-y-2">
                        {data.education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold">{edu.institution}</h3>
                                    <span className="text-sm text-gray-600">{edu.graduationDate}</span>
                                </div>
                                <div className="text-sm">{edu.degree}</div>
                                {edu.details && edu.details.length > 0 && (
                                    <ul className="list-disc list-inside text-sm mt-1 text-gray-700">
                                        {edu.details.map((detail, i) => <li key={i}>{detail}</li>)}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.projects && data.projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase mb-4">Projects</h2>
                    <div className="space-y-4">
                        {data.projects.map((proj) => (
                            <div key={proj.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-md">{proj.name}</h3>
                                    <span className="text-sm text-gray-600">{proj.date}</span>
                                </div>
                                <div className="text-sm font-semibold italic mb-1">{proj.techStack}</div>
                                {proj.details && (
                                    <ul className="list-disc list-inside text-sm text-gray-700">
                                        {proj.details.map((detail, i) => <li key={i}>{detail}</li>)}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.skills && (
                <section>
                    <h2 className="text-lg font-bold uppercase mb-2">Skills</h2>
                    <div className="text-sm leading-relaxed">
                        {data.skills.languages && data.skills.languages.length > 0 && (
                            <div className="mb-1"><span className="font-semibold">Languages:</span> {data.skills.languages.join(', ')}</div>
                        )}
                        {data.skills.frameworks && data.skills.frameworks.length > 0 && (
                            <div className="mb-1"><span className="font-semibold">Frameworks:</span> {data.skills.frameworks.join(', ')}</div>
                        )}
                        {data.skills.tools && data.skills.tools.length > 0 && (
                            <div className="mb-1"><span className="font-semibold">Tools:</span> {data.skills.tools.join(', ')}</div>
                        )}
                        {/* Fallback or 'all' if categories are empty but 'all' has items */}
                        {(!data.skills.languages?.length && !data.skills.frameworks?.length && data.skills.all?.length) ? (
                            <div>{data.skills.all.join(', ')}</div>
                        ) : null}
                    </div>
                </section>
            )}
        </div>
    );
};

