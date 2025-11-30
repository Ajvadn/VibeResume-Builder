import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

export const ModernTemplate: React.FC<{ data: ResumeData; font?: string; accentColor?: string }> = ({ data, font = 'font-sans', accentColor = '#6366f1' }) => {
    return (
        <div className={cn("text-slate-800 p-0 max-w-[210mm] mx-auto bg-white h-full flex min-h-[297mm]", font)}>
            {/* Sidebar */}
            <aside className="w-1/3 bg-slate-100 p-6 border-r border-slate-200">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-4">{data.personalInfo.fullName}</h1>
                    <div className="text-sm space-y-2 text-slate-600">
                        {data.personalInfo.email && <div className="break-words">{data.personalInfo.email}</div>}
                        {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
                        {data.personalInfo.linkedin && <div className="break-words">{data.personalInfo.linkedin}</div>}
                        {data.personalInfo.website && <div className="break-words">{data.personalInfo.website}</div>}
                    </div>
                </div>

                {(data.skills.languages?.length > 0 || data.skills.frameworks?.length > 0 || data.skills.tools?.length > 0 || data.skills.technologies?.length > 0 || (data.skills.all?.length || 0) > 0) && (
                    <section className="mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {[
                                ...(data.skills.languages || []),
                                ...(data.skills.frameworks || []),
                                ...(data.skills.tools || []),
                                ...(data.skills.technologies || []),
                                ...(data.skills.all || [])
                            ].map((skill, i) => (
                                <span key={i} className="bg-white px-2 py-1 rounded text-xs font-medium shadow-sm border border-slate-200">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {data.education.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Education</h2>
                        <div className="space-y-4">
                            {data.education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="font-bold text-sm">{edu.institution}</div>
                                    <div className="text-xs text-slate-500 mb-1">{edu.graduationDate}</div>
                                    <div className="text-sm">{edu.degree}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </aside>

            {/* Main Content */}
            <main className="w-2/3 p-8">
                {data.personalInfo.summary && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-slate-800 mb-3 inline-block pb-1" style={{ borderBottom: `2px solid ${accentColor}` }}>Profile</h2>
                        <p className="text-sm leading-relaxed text-slate-600">{data.personalInfo.summary}</p>
                    </section>
                )}

                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-6 inline-block pb-1" style={{ borderBottom: `2px solid ${accentColor}` }}>Experience</h2>
                        <div className="space-y-6">
                            {data.experience.map((exp) => (
                                <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200">
                                    <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-lg text-slate-800">{exp.position}</h3>
                                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">{exp.startDate} – {exp.endDate}</span>
                                    </div>
                                    <div className="text-sm font-medium text-indigo-600 mb-2">{exp.company}</div>
                                    <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};
