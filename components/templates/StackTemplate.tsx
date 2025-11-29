import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

export const StackTemplate: React.FC<{ data: ResumeData; font?: string }> = ({ data, font = 'font-sans' }) => {
    return (
        <div className={cn("text-slate-800 p-8 max-w-[210mm] mx-auto bg-white h-full min-h-[297mm]", font)}>
            {/* Header */}
            <header className="mb-8 bg-slate-100 p-6 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-slate-900">{data.personalInfo.fullName}</h1>
                    <span className="text-lg font-medium text-slate-500">{data.experience[0]?.position || 'Developer'}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    {data.personalInfo.email && <span className="bg-white px-2 py-1 rounded border border-slate-200">{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span className="bg-white px-2 py-1 rounded border border-slate-200">{data.personalInfo.phone}</span>}
                    {data.personalInfo.linkedin && <span className="bg-white px-2 py-1 rounded border border-slate-200">{data.personalInfo.linkedin}</span>}
                    {data.personalInfo.website && <span className="bg-white px-2 py-1 rounded border border-slate-200">{data.personalInfo.website}</span>}
                </div>
            </header>

            {/* Tech Stack (Highlighted) */}
            {(data.skills.all?.length || 0) > 0 && (
                <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Tech Stack</h2>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.all?.map((skill, i) => (
                            <span key={i} className="bg-slate-900 text-white px-3 py-1.5 rounded text-sm font-mono">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            <div className="grid grid-cols-1 gap-8">
                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 border-b border-slate-200 pb-2">Experience</h2>
                        <div className="space-y-6">
                            {data.experience.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-lg text-slate-900">{exp.position}</h3>
                                        <span className="text-sm font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded">{exp.startDate} – {exp.endDate}</span>
                                    </div>
                                    <div className="text-md font-medium text-indigo-600 mb-2">{exp.company}</div>
                                    <p className="text-sm leading-relaxed text-slate-600">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.projects.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 border-b border-slate-200 pb-2">Projects</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {data.projects.map((proj) => (
                                <div key={proj.id} className="border border-slate-200 rounded p-4 bg-slate-50">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="font-bold text-md text-slate-900">{proj.name}</h3>
                                        <span className="text-xs text-slate-500">{proj.date}</span>
                                    </div>
                                    <div className="text-xs font-mono text-indigo-600 mb-2">{proj.techStack}</div>
                                    <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                                        {proj.details.slice(0, 2).map((detail, i) => ( // Limit details for compact view
                                            <li key={i} className="truncate">{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 border-b border-slate-200 pb-2">Education</h2>
                        <div className="space-y-3">
                            {data.education.map((edu) => (
                                <div key={edu.id} className="flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-slate-900">{edu.institution}</div>
                                        <div className="text-sm text-slate-600">{edu.degree}</div>
                                    </div>
                                    <div className="text-sm font-mono text-slate-500">{edu.graduationDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};
