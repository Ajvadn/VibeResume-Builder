import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

export const CleanTemplate: React.FC<{ data: ResumeData; font?: string }> = ({ data, font = 'font-sans' }) => {
    return (
        <div className={cn("text-gray-700 p-16 max-w-[210mm] mx-auto bg-white h-full min-h-[297mm]", font)}>
            {/* Header */}
            <header className="mb-16">
                <h1 className="text-4xl font-light text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 font-light">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                    {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                    {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
                </div>
            </header>

            <div className="grid grid-cols-[1fr_3fr] gap-16">
                {/* Sidebar */}
                <aside className="space-y-12">
                    {/* Skills */}
                    {(data.skills.all?.length || 0) > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Skills</h2>
                            <ul className="space-y-3 text-sm">
                                {data.skills.all?.map((skill, i) => (
                                    <li key={i} className="text-gray-600">{skill}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Education */}
                    {data.education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Education</h2>
                            <div className="space-y-6">
                                {data.education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className="font-medium text-gray-900 mb-1">{edu.institution}</div>
                                        <div className="text-sm text-gray-500 mb-1">{edu.degree}</div>
                                        <div className="text-xs text-gray-400">{edu.graduationDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Main Content */}
                <main className="space-y-12">
                    {/* Summary */}
                    {data.personalInfo.summary && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">About</h2>
                            <p className="text-md leading-loose text-gray-600 font-light">{data.personalInfo.summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Experience</h2>
                            <div className="space-y-12">
                                {data.experience.map((exp) => (
                                    <div key={exp.id} className="relative">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="font-medium text-xl text-gray-900">{exp.position}</h3>
                                            <span className="text-sm text-gray-400 font-light">{exp.startDate} – {exp.endDate}</span>
                                        </div>
                                        <div className="text-sm font-medium text-gray-500 mb-4">{exp.company}</div>
                                        <p className="text-sm leading-relaxed text-gray-600 font-light">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};
