import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

export const GeometricTemplate: React.FC<{ data: ResumeData; font?: string }> = ({ data, font = 'font-sans' }) => {
    return (
        <div className={cn("text-slate-800 p-0 max-w-[210mm] mx-auto bg-white h-full min-h-[297mm] flex flex-col", font)}>
            {/* Header */}
            <header className="bg-slate-900 text-white p-12">
                <h1 className="text-5xl font-bold uppercase tracking-widest mb-6">{data.personalInfo.fullName}</h1>
                <div className="flex flex-wrap gap-6 text-sm font-medium tracking-wide">
                    {data.personalInfo.email && <div className="flex items-center gap-2"><span className="w-2 h-2 bg-indigo-500"></span>{data.personalInfo.email}</div>}
                    {data.personalInfo.phone && <div className="flex items-center gap-2"><span className="w-2 h-2 bg-indigo-500"></span>{data.personalInfo.phone}</div>}
                    {data.personalInfo.location && <div className="flex items-center gap-2"><span className="w-2 h-2 bg-indigo-500"></span>{data.personalInfo.location}</div>}
                    {data.personalInfo.linkedin && <div className="flex items-center gap-2"><span className="w-2 h-2 bg-indigo-500"></span>{data.personalInfo.linkedin}</div>}
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-1/3 bg-slate-100 p-8 border-r border-slate-200">
                    {/* Skills */}
                    {(data.skills.all?.length || 0) > 0 && (
                        <section className="mb-10">
                            <h2 className="text-xl font-bold uppercase mb-6 flex items-center gap-3">
                                <span className="w-4 h-4 bg-slate-900"></span>
                                Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.all?.map((skill, i) => (
                                    <span key={i} className="bg-white px-3 py-1 text-sm font-semibold border border-slate-300 shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {data.education.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold uppercase mb-6 flex items-center gap-3">
                                <span className="w-4 h-4 bg-slate-900"></span>
                                Education
                            </h2>
                            <div className="space-y-6">
                                {data.education.map((edu) => (
                                    <div key={edu.id} className="border-l-4 border-slate-900 pl-4">
                                        <div className="font-bold text-md">{edu.institution}</div>
                                        <div className="text-sm font-medium text-indigo-600 mb-1">{edu.degree}</div>
                                        <div className="text-xs text-slate-500 font-mono">{edu.graduationDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Main Content */}
                <main className="w-2/3 p-10">
                    {/* Summary */}
                    {data.personalInfo.summary && (
                        <section className="mb-12">
                            <h2 className="text-xl font-bold uppercase mb-4 flex items-center gap-3">
                                <span className="w-4 h-4 bg-indigo-500"></span>
                                Profile
                            </h2>
                            <p className="text-md leading-relaxed text-slate-600">{data.personalInfo.summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold uppercase mb-8 flex items-center gap-3">
                                <span className="w-4 h-4 bg-indigo-500"></span>
                                Experience
                            </h2>
                            <div className="space-y-10">
                                {data.experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-xl text-slate-900">{exp.position}</h3>
                                            <span className="text-xs font-bold bg-slate-900 text-white px-2 py-1">{exp.startDate} – {exp.endDate}</span>
                                        </div>
                                        <div className="text-md font-bold text-indigo-600 mb-4 uppercase tracking-wide">{exp.company}</div>
                                        <p className="text-sm leading-relaxed text-slate-600">{exp.description}</p>
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
