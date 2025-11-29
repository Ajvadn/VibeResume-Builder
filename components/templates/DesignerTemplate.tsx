import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

export const DesignerTemplate: React.FC<{ data: ResumeData; font?: string }> = ({ data, font = 'font-sans' }) => {
    return (
        <div className={cn("text-white p-0 max-w-[210mm] mx-auto bg-white h-full min-h-[297mm] flex", font)}>
            {/* Sidebar */}
            <aside className="w-1/3 bg-gray-900 p-8 flex flex-col justify-between">
                <div>
                    <h1 className="text-4xl font-black uppercase leading-none mb-2 text-yellow-400">{data.personalInfo.fullName.split(' ')[0]}</h1>
                    <h1 className="text-4xl font-black uppercase leading-none mb-10 text-white">{data.personalInfo.fullName.split(' ').slice(1).join(' ')}</h1>

                    <div className="space-y-8 text-sm text-gray-300">
                        <div>
                            <h2 className="font-bold uppercase text-white mb-4 border-b border-gray-700 pb-2">Contact</h2>
                            <div className="space-y-2">
                                <p>{data.personalInfo.email}</p>
                                <p>{data.personalInfo.phone}</p>
                                <p>{data.personalInfo.location}</p>
                                <p className="break-words">{data.personalInfo.linkedin}</p>
                                <p className="break-words">{data.personalInfo.website}</p>
                            </div>
                        </div>

                        {(data.skills.all?.length || 0) > 0 && (
                            <div>
                                <h2 className="font-bold uppercase text-white mb-4 border-b border-gray-700 pb-2">Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.all?.map((skill, i) => (
                                        <span key={i} className="bg-gray-800 px-2 py-1 text-xs rounded border border-gray-700">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {data.education.length > 0 && (
                    <div className="text-sm text-gray-300 mt-8">
                        <h2 className="font-bold uppercase text-white mb-4 border-b border-gray-700 pb-2">Education</h2>
                        <div className="space-y-4">
                            {data.education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="font-bold text-white">{edu.institution}</div>
                                    <div className="text-xs">{edu.graduationDate}</div>
                                    <div>{edu.degree}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="w-2/3 p-12 text-gray-800">
                {data.personalInfo.summary && (
                    <section className="mb-12">
                        <h2 className="text-4xl font-black uppercase text-gray-900 mb-6">Profile</h2>
                        <p className="text-lg leading-relaxed font-medium text-gray-600">{data.personalInfo.summary}</p>
                    </section>
                )}

                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-4xl font-black uppercase text-gray-900 mb-8">Experience</h2>
                        <div className="space-y-12">
                            {data.experience.map((exp) => (
                                <div key={exp.id} className="relative pl-8 border-l-4 border-yellow-400">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="font-bold text-2xl text-gray-900">{exp.position}</h3>
                                    </div>
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="text-lg font-bold text-gray-500 uppercase">{exp.company}</div>
                                        <span className="text-sm font-bold bg-yellow-400 text-black px-2 py-1">{exp.startDate} – {exp.endDate}</span>
                                    </div>
                                    <p className="text-md leading-relaxed text-gray-600">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};
