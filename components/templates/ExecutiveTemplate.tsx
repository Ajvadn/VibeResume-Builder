import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

export const ExecutiveTemplate: React.FC<{ data: ResumeData; font?: string }> = ({ data, font = 'font-serif' }) => {
    return (
        <div className={cn("text-gray-900 p-12 max-w-[210mm] mx-auto bg-white h-full min-h-[297mm]", font)}>
            {/* Header */}
            <header className="border-b-4 border-gray-900 pb-6 mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-extrabold uppercase tracking-tight mb-2">{data.personalInfo.fullName}</h1>
                    <p className="text-xl text-gray-600 font-light">{data.experience[0]?.position || 'Professional'}</p>
                </div>
                <div className="text-right text-sm space-y-1 font-medium text-gray-600">
                    <p>{data.personalInfo.email}</p>
                    <p>{data.personalInfo.phone}</p>
                    <p>{data.personalInfo.location}</p>
                    <p>{data.personalInfo.linkedin}</p>
                </div>
            </header>

            {/* Summary */}
            {data.personalInfo.summary && (
                <section className="mb-10">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-4 text-gray-500">Executive Profile</h2>
                    <p className="text-md leading-relaxed font-medium text-gray-800">{data.personalInfo.summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-6 text-gray-500">Professional Experience</h2>
                    <div className="space-y-8">
                        {data.experience.map((exp) => (
                            <div key={exp.id} className="border-l-4 border-gray-200 pl-6">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="font-bold text-xl">{exp.position}</h3>
                                    <span className="text-sm font-bold text-gray-500">{exp.startDate} – {exp.endDate}</span>
                                </div>
                                <div className="text-md font-semibold text-gray-700 mb-3 uppercase">{exp.company}</div>
                                <p className="text-sm leading-relaxed text-gray-700">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div className="grid grid-cols-2 gap-10">
                {/* Education */}
                {data.education.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-wider mb-6 text-gray-500">Education</h2>
                        <div className="space-y-4">
                            {data.education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="font-bold text-md">{edu.institution}</div>
                                    <div className="text-sm text-gray-600">{edu.degree}</div>
                                    <div className="text-sm text-gray-500 italic">{edu.graduationDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {(data.skills.all?.length || 0) > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-wider mb-6 text-gray-500">Core Competencies</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.all?.map((skill, i) => (
                                <span key={i} className="bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-800 border border-gray-200">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};
