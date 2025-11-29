import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

export const EngineeringTemplate: React.FC<{ data: ResumeData; font?: string }> = ({ data, font = 'font-sans' }) => {
    return (
        <div className={cn("text-slate-900 p-10 max-w-[210mm] mx-auto bg-white h-full min-h-[297mm]", font)}>
            {/* Header */}
            <header className="border-b-2 border-slate-300 pb-6 mb-8">
                <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">{data.personalInfo.fullName}</h1>
                <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
                    {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
                    {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
                </div>
            </header>

            <div className="grid grid-cols-[2fr_1fr] gap-10">
                {/* Main Content */}
                <main>
                    {/* Summary */}
                    {data.personalInfo.summary && (
                        <section className="mb-8">
                            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-3 pb-1">Professional Summary</h2>
                            <p className="text-sm leading-relaxed text-justify">{data.personalInfo.summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-4 pb-1">Experience</h2>
                            <div className="space-y-6">
                                {data.experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-md">{exp.position}</h3>
                                            <span className="text-sm font-medium text-slate-500">{exp.startDate} – {exp.endDate}</span>
                                        </div>
                                        <div className="text-sm font-semibold text-slate-700 mb-2">{exp.company}</div>
                                        <ul className="list-disc list-outside ml-4 text-sm space-y-1 text-slate-700">
                                            {exp.description.split('\n').map((line, i) => (
                                                <li key={i}>{line}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.projects.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-4 pb-1">Projects</h2>
                            <div className="space-y-4">
                                {data.projects.map((proj) => (
                                    <div key={proj.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-md">{proj.name}</h3>
                                            <span className="text-xs font-medium text-slate-500">{proj.date}</span>
                                        </div>
                                        <div className="text-sm font-medium text-slate-600 mb-1">{proj.techStack}</div>
                                        <ul className="list-disc list-outside ml-4 text-sm space-y-1 text-slate-700">
                                            {proj.details.map((detail, i) => (
                                                <li key={i}>{detail}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                {/* Sidebar */}
                <aside className="space-y-8">
                    {/* Skills */}
                    {(data.skills.all?.length || 0) > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-3 pb-1">Technical Skills</h2>
                            <div className="flex flex-col gap-2">
                                {data.skills.languages?.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-700 mb-1">Languages</h3>
                                        <p className="text-sm text-slate-600">{data.skills.languages.join(', ')}</p>
                                    </div>
                                )}
                                {data.skills.frameworks?.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-700 mb-1">Frameworks</h3>
                                        <p className="text-sm text-slate-600">{data.skills.frameworks.join(', ')}</p>
                                    </div>
                                )}
                                {data.skills.tools?.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-700 mb-1">Tools</h3>
                                        <p className="text-sm text-slate-600">{data.skills.tools.join(', ')}</p>
                                    </div>
                                )}
                                {data.skills.technologies?.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-700 mb-1">Technologies</h3>
                                        <p className="text-sm text-slate-600">{data.skills.technologies.join(', ')}</p>
                                    </div>
                                )}
                                {/* Fallback if categorized skills are empty but 'all' has items */}
                                {(!data.skills.languages?.length && !data.skills.frameworks?.length && !data.skills.tools?.length && !data.skills.technologies?.length) && (
                                    <p className="text-sm text-slate-600">{data.skills.all?.join(', ')}</p>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {data.education.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-3 pb-1">Education</h2>
                            <div className="space-y-4">
                                {data.education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className="font-bold text-sm">{edu.institution}</div>
                                        <div className="text-sm text-slate-600">{edu.degree}</div>
                                        <div className="text-xs text-slate-500">{edu.graduationDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>
            </div>
        </div>
    );
};
