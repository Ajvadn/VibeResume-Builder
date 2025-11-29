import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

export const VibrantTemplate: React.FC<{ data: ResumeData; font?: string }> = ({ data, font = 'font-sans' }) => {
    return (
        <div className={cn("text-slate-800 p-0 max-w-[210mm] mx-auto bg-white h-full min-h-[297mm]", font)}>
            <div className="flex h-full">
                {/* Left Column (Gradient) */}
                <aside className="w-[35%] bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500 text-white p-8 flex flex-col h-full min-h-[297mm]">
                    <div className="mb-12">
                        <div className="w-24 h-24 bg-white/20 rounded-full mb-6 flex items-center justify-center text-4xl font-bold border-2 border-white/50">
                            {data.personalInfo.fullName.charAt(0)}
                        </div>
                        <h1 className="text-3xl font-bold leading-tight mb-2">{data.personalInfo.fullName}</h1>
                        <p className="text-pink-100 font-medium">{data.experience[0]?.position || 'Professional'}</p>
                    </div>

                    <div className="space-y-10 flex-1">
                        <div>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-pink-200 mb-4 border-b border-white/20 pb-2">Contact</h2>
                            <div className="space-y-3 text-sm font-medium">
                                <p className="flex items-center gap-2 opacity-90">{data.personalInfo.email}</p>
                                <p className="flex items-center gap-2 opacity-90">{data.personalInfo.phone}</p>
                                <p className="flex items-center gap-2 opacity-90">{data.personalInfo.location}</p>
                                <p className="flex items-center gap-2 opacity-90 break-words">{data.personalInfo.linkedin}</p>
                            </div>
                        </div>

                        {(data.skills.all?.length || 0) > 0 && (
                            <div>
                                <h2 className="text-xs font-bold uppercase tracking-widest text-pink-200 mb-4 border-b border-white/20 pb-2">Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.all?.map((skill, i) => (
                                        <span key={i} className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.education.length > 0 && (
                            <div>
                                <h2 className="text-xs font-bold uppercase tracking-widest text-pink-200 mb-4 border-b border-white/20 pb-2">Education</h2>
                                <div className="space-y-4">
                                    {data.education.map((edu) => (
                                        <div key={edu.id}>
                                            <div className="font-bold">{edu.institution}</div>
                                            <div className="text-xs opacity-80">{edu.graduationDate}</div>
                                            <div className="text-sm">{edu.degree}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Right Column */}
                <main className="w-[65%] p-10">
                    {data.personalInfo.summary && (
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">Profile</h2>
                            <p className="text-md leading-relaxed text-slate-600">{data.personalInfo.summary}</p>
                        </section>
                    )}

                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-8">Experience</h2>
                            <div className="space-y-10">
                                {data.experience.map((exp) => (
                                    <div key={exp.id} className="relative pl-6 border-l-2 border-purple-100">
                                        <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500"></div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-xl text-slate-800">{exp.position}</h3>
                                        </div>
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="text-md font-bold text-purple-600">{exp.company}</div>
                                            <span className="text-xs font-bold text-slate-400">{exp.startDate} – {exp.endDate}</span>
                                        </div>
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
