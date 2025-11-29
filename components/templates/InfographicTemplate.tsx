import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

export const InfographicTemplate: React.FC<{ data: ResumeData; font?: string }> = ({ data, font = 'font-sans' }) => {
    return (
        <div className={cn("text-slate-800 p-0 max-w-[210mm] mx-auto bg-white h-full min-h-[297mm]", font)}>
            <div className="grid grid-cols-[1fr_2fr] h-full min-h-[297mm]">
                {/* Left Column */}
                <aside className="bg-slate-900 text-white p-8 flex flex-col items-center text-center">
                    <div className="w-32 h-32 bg-slate-800 rounded-full mb-6 flex items-center justify-center text-5xl font-bold border-4 border-slate-700">
                        {data.personalInfo.fullName.charAt(0)}
                    </div>
                    <h1 className="text-2xl font-bold uppercase tracking-wider mb-2">{data.personalInfo.fullName}</h1>
                    <p className="text-slate-400 text-sm mb-10">{data.experience[0]?.position || 'Professional'}</p>

                    <div className="w-full space-y-6 text-sm text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                                <Mail size={14} />
                            </div>
                            <span className="text-slate-300 text-xs break-all">{data.personalInfo.email}</span>
                        </div>
                        {data.personalInfo.phone && (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                                    <Phone size={14} />
                                </div>
                                <span className="text-slate-300 text-xs">{data.personalInfo.phone}</span>
                            </div>
                        )}
                        {data.personalInfo.location && (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                                    <MapPin size={14} />
                                </div>
                                <span className="text-slate-300 text-xs">{data.personalInfo.location}</span>
                            </div>
                        )}
                        {data.personalInfo.linkedin && (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                                    <Linkedin size={14} />
                                </div>
                                <span className="text-slate-300 text-xs break-all">{data.personalInfo.linkedin}</span>
                            </div>
                        )}
                        {data.personalInfo.website && (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                                    <Globe size={14} />
                                </div>
                                <span className="text-slate-300 text-xs break-all">{data.personalInfo.website}</span>
                            </div>
                        )}
                    </div>

                    <div className="w-full mt-12">
                        <h2 className="text-left text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 border-b border-slate-800 pb-2">Skills</h2>
                        <div className="space-y-4 w-full">
                            {data.skills.all?.slice(0, 8).map((skill, i) => (
                                <div key={i} className="w-full">
                                    <div className="flex justify-between text-xs mb-1 text-slate-300">
                                        <span>{skill}</span>
                                        <span>{Math.floor(Math.random() * 20) + 80}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-indigo-500 rounded-full"
                                            style={{ width: `${Math.floor(Math.random() * 20) + 80}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Right Column */}
                <main className="p-10 bg-slate-50">
                    {data.personalInfo.summary && (
                        <section className="mb-10 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                            <h2 className="text-lg font-bold uppercase text-slate-800 mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                                Profile
                            </h2>
                            <p className="text-sm leading-relaxed text-slate-600">{data.personalInfo.summary}</p>
                        </section>
                    )}

                    {data.experience.length > 0 && (
                        <section className="mb-10">
                            <h2 className="text-lg font-bold uppercase text-slate-800 mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                                Experience
                            </h2>
                            <div className="space-y-6">
                                {data.experience.map((exp) => (
                                    <div key={exp.id} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 relative overflow-hidden group hover:border-indigo-200 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg text-slate-800">{exp.position}</h3>
                                            <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">{exp.startDate} – {exp.endDate}</span>
                                        </div>
                                        <div className="text-sm font-bold text-indigo-600 mb-3 uppercase tracking-wide">{exp.company}</div>
                                        <p className="text-sm leading-relaxed text-slate-600">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.education.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase text-slate-800 mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                                Education
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                {data.education.map((edu) => (
                                    <div key={edu.id} className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                                        <div className="font-bold text-slate-800">{edu.institution}</div>
                                        <div className="text-xs text-slate-400 mb-2">{edu.graduationDate}</div>
                                        <div className="text-sm text-indigo-600 font-medium">{edu.degree}</div>
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
