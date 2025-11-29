import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

export const SwissTemplate: React.FC<{ data: ResumeData; font?: string }> = ({ data, font = 'font-sans' }) => {
    return (
        <div className={cn("text-black p-12 max-w-[210mm] mx-auto bg-white h-full min-h-[297mm]", font)}>
            <div className="grid grid-cols-[1fr_3fr] gap-12 h-full">
                {/* Sidebar */}
                <aside className="border-r-2 border-black pr-8 h-full">
                    <h1 className="text-4xl font-black uppercase leading-none mb-8 break-words">{data.personalInfo.fullName}</h1>

                    <div className="space-y-8 text-sm font-medium">
                        <div>
                            <h2 className="font-bold uppercase mb-2">Contact</h2>
                            <div className="space-y-1">
                                <p>{data.personalInfo.email}</p>
                                <p>{data.personalInfo.phone}</p>
                                <p>{data.personalInfo.location}</p>
                                <p className="break-words">{data.personalInfo.linkedin}</p>
                                <p className="break-words">{data.personalInfo.website}</p>
                            </div>
                        </div>

                        {(data.skills.all?.length || 0) > 0 && (
                            <div>
                                <h2 className="font-bold uppercase mb-2">Skills</h2>
                                <ul className="space-y-1">
                                    {data.skills.all?.map((skill, i) => (
                                        <li key={i}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {data.education.length > 0 && (
                            <div>
                                <h2 className="font-bold uppercase mb-2">Education</h2>
                                <div className="space-y-4">
                                    {data.education.map((edu) => (
                                        <div key={edu.id}>
                                            <div className="font-bold">{edu.institution}</div>
                                            <div className="text-xs">{edu.graduationDate}</div>
                                            <div>{edu.degree}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="pt-2">
                    {data.personalInfo.summary && (
                        <section className="mb-12">
                            <p className="text-lg font-medium leading-relaxed">{data.personalInfo.summary}</p>
                        </section>
                    )}

                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black uppercase mb-8">Experience</h2>
                            <div className="space-y-10">
                                {data.experience.map((exp) => (
                                    <div key={exp.id} className="grid grid-cols-[1fr_3fr] gap-4">
                                        <div className="text-sm font-bold pt-1">
                                            {exp.startDate} –<br />{exp.endDate}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">{exp.position}</h3>
                                            <div className="text-md font-medium mb-3">{exp.company}</div>
                                            <p className="text-sm leading-relaxed">{exp.description}</p>
                                        </div>
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
