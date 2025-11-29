import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

export const PortfolioTemplate: React.FC<{ data: ResumeData; font?: string }> = ({ data, font = 'font-sans' }) => {
    return (
        <div className={cn("text-gray-800 p-0 max-w-[210mm] mx-auto bg-white h-full min-h-[297mm]", font)}>
            {/* Header */}
            <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-12 text-center">
                <h1 className="text-5xl font-bold mb-4">{data.personalInfo.fullName}</h1>
                <p className="text-xl opacity-90 mb-6">{data.experience[0]?.position || 'Creative Professional'}</p>
                <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                    {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                    {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
                    {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
                </div>
            </header>

            <div className="p-12">
                {/* Summary */}
                {data.personalInfo.summary && (
                    <section className="mb-12 text-center max-w-3xl mx-auto">
                        <p className="text-lg leading-relaxed text-gray-600">{data.personalInfo.summary}</p>
                    </section>
                )}

                {/* Projects (Highlighted for Portfolio) */}
                {data.projects.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-center mb-8 text-purple-700">Featured Projects</h2>
                        <div className="grid grid-cols-2 gap-6">
                            {data.projects.map((proj) => (
                                <div key={proj.id} className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg text-gray-900">{proj.name}</h3>
                                        <span className="text-xs font-medium bg-purple-100 text-purple-700 px-2 py-1 rounded">{proj.date}</span>
                                    </div>
                                    <div className="text-sm font-medium text-indigo-600 mb-3">{proj.techStack}</div>
                                    <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                                        {proj.details.map((detail, i) => (
                                            <li key={i}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-12">
                    {/* Experience */}
                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold mb-6 text-purple-700 border-b-2 border-purple-100 pb-2">Experience</h2>
                            <div className="space-y-8">
                                {data.experience.map((exp) => (
                                    <div key={exp.id}>
                                        <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
                                        <div className="text-sm font-medium text-gray-500 mb-2">{exp.company} | {exp.startDate} – {exp.endDate}</div>
                                        <p className="text-sm leading-relaxed text-gray-600">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Right Column */}
                    <div className="space-y-10">
                        {/* Skills */}
                        {(data.skills.all?.length || 0) > 0 && (
                            <section>
                                <h2 className="text-xl font-bold mb-6 text-purple-700 border-b-2 border-purple-100 pb-2">Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.all?.map((skill, i) => (
                                        <span key={i} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {data.education.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold mb-6 text-purple-700 border-b-2 border-purple-100 pb-2">Education</h2>
                                <div className="space-y-4">
                                    {data.education.map((edu) => (
                                        <div key={edu.id}>
                                            <div className="font-bold text-gray-900">{edu.institution}</div>
                                            <div className="text-sm text-indigo-600">{edu.degree}</div>
                                            <div className="text-xs text-gray-500">{edu.graduationDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
