import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

export const ElegantTemplate: React.FC<{ data: ResumeData; font?: string }> = ({ data, font = 'font-serif' }) => {
    return (
        <div className={cn("text-slate-800 p-10 max-w-[210mm] mx-auto bg-white h-full min-h-[297mm]", font)}>
            {/* Header */}
            <header className="text-center mb-10">
                <h1 className="text-5xl font-light tracking-wide text-slate-900 mb-4 uppercase">{data.personalInfo.fullName}</h1>
                <div className="flex justify-center items-center gap-3 text-sm text-slate-500 font-medium tracking-widest uppercase">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span className="w-1 h-1 bg-slate-400 rounded-full"></span>}
                    {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                    {data.personalInfo.location && <span className="w-1 h-1 bg-slate-400 rounded-full"></span>}
                    {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                </div>
            </header>

            <div className="grid grid-cols-[1fr_2fr] gap-10">
                {/* Left Column */}
                <aside className="space-y-10">
                    {/* Education */}
                    {data.education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-2 mb-4">Education</h2>
                            <div className="space-y-6">
                                {data.education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className="font-bold text-slate-800">{edu.institution}</div>
                                        <div className="text-xs text-slate-500 italic mb-1">{edu.graduationDate}</div>
                                        <div className="text-sm text-slate-600">{edu.degree}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {(data.skills.all?.length || 0) > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-2 mb-4">Expertise</h2>
                            <ul className="space-y-2">
                                {data.skills.all?.map((skill, i) => (
                                    <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                                        <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Links */}
                    {(data.personalInfo.linkedin || data.personalInfo.website) && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-2 mb-4">Connect</h2>
                            <div className="space-y-2 text-sm text-slate-600">
                                {data.personalInfo.linkedin && <div className="break-words">{data.personalInfo.linkedin}</div>}
                                {data.personalInfo.website && <div className="break-words">{data.personalInfo.website}</div>}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Right Column */}
                <main className="space-y-10">
                    {/* Summary */}
                    {data.personalInfo.summary && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-2 mb-4">Profile</h2>
                            <p className="text-sm leading-7 text-slate-600 text-justify">{data.personalInfo.summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-2 mb-6">Experience</h2>
                            <div className="space-y-8">
                                {data.experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="font-bold text-lg text-slate-800">{exp.position}</h3>
                                            <span className="text-xs font-medium text-slate-500">{exp.startDate} – {exp.endDate}</span>
                                        </div>
                                        <div className="text-sm font-medium text-slate-700 mb-3 uppercase tracking-wide">{exp.company}</div>
                                        <p className="text-sm leading-relaxed text-slate-600 text-justify">{exp.description}</p>
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
