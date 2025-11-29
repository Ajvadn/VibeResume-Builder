import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

export const CorporateTemplate: React.FC<{ data: ResumeData; font?: string }> = ({ data, font = 'font-sans' }) => {
    return (
        <div className={cn("text-slate-800 p-0 max-w-[210mm] mx-auto bg-white h-full min-h-[297mm]", font)}>
            {/* Header */}
            <header className="bg-blue-900 text-white p-10 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold mb-2">{data.personalInfo.fullName}</h1>
                    <p className="text-blue-200 text-lg font-medium">{data.experience[0]?.position || 'Professional'}</p>
                </div>
                <div className="text-right text-sm text-blue-100 space-y-1">
                    <p>{data.personalInfo.email}</p>
                    <p>{data.personalInfo.phone}</p>
                    <p>{data.personalInfo.location}</p>
                    <p>{data.personalInfo.linkedin}</p>
                </div>
            </header>

            <div className="p-10">
                {/* Summary */}
                {data.personalInfo.summary && (
                    <section className="mb-10 bg-blue-50 p-6 rounded-lg border border-blue-100">
                        <h2 className="text-blue-900 font-bold uppercase text-sm mb-3">Professional Summary</h2>
                        <p className="text-slate-700 leading-relaxed">{data.personalInfo.summary}</p>
                    </section>
                )}

                <div className="grid grid-cols-[2fr_1fr] gap-10">
                    {/* Main Column */}
                    <main>
                        {/* Experience */}
                        {data.experience.length > 0 && (
                            <section className="mb-10">
                                <h2 className="text-blue-900 font-bold uppercase text-sm mb-6 border-b-2 border-blue-900 pb-2">Experience</h2>
                                <div className="space-y-8">
                                    {data.experience.map((exp) => (
                                        <div key={exp.id}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-bold text-lg text-slate-900">{exp.position}</h3>
                                                <span className="text-sm font-semibold text-blue-600">{exp.startDate} – {exp.endDate}</span>
                                            </div>
                                            <div className="text-md font-medium text-slate-600 mb-2">{exp.company}</div>
                                            <p className="text-sm leading-relaxed text-slate-600">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </main>

                    {/* Sidebar Column */}
                    <aside className="space-y-10">
                        {/* Education */}
                        {data.education.length > 0 && (
                            <section>
                                <h2 className="text-blue-900 font-bold uppercase text-sm mb-6 border-b-2 border-blue-900 pb-2">Education</h2>
                                <div className="space-y-4">
                                    {data.education.map((edu) => (
                                        <div key={edu.id}>
                                            <div className="font-bold text-slate-900">{edu.institution}</div>
                                            <div className="text-sm text-blue-600 mb-1">{edu.degree}</div>
                                            <div className="text-xs text-slate-500">{edu.graduationDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Skills */}
                        {(data.skills.all?.length || 0) > 0 && (
                            <section>
                                <h2 className="text-blue-900 font-bold uppercase text-sm mb-6 border-b-2 border-blue-900 pb-2">Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.all?.map((skill, i) => (
                                        <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-xs font-semibold">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    );
};
