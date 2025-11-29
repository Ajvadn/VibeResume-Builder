import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

export const ScholarTemplate: React.FC<{ data: ResumeData; font?: string }> = ({ data, font = 'font-serif' }) => {
    return (
        <div className={cn("text-black p-12 max-w-[210mm] mx-auto bg-white h-full min-h-[297mm]", font)}>
            {/* Header */}
            <header className="text-center mb-8">
                <h1 className="text-2xl font-bold uppercase mb-2">{data.personalInfo.fullName}</h1>
                <div className="text-sm">
                    <span>{data.personalInfo.location}</span>
                    <span className="mx-2">|</span>
                    <span>{data.personalInfo.email}</span>
                    <span className="mx-2">|</span>
                    <span>{data.personalInfo.phone}</span>
                </div>
                <div className="text-sm mt-1">
                    <span>{data.personalInfo.linkedin}</span>
                    {data.personalInfo.website && (
                        <>
                            <span className="mx-2">|</span>
                            <span>{data.personalInfo.website}</span>
                        </>
                    )}
                </div>
            </header>

            {/* Education */}
            {data.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-md font-bold uppercase border-b border-black mb-3">Education</h2>
                    <div className="space-y-2">
                        {data.education.map((edu) => (
                            <div key={edu.id} className="flex justify-between text-sm">
                                <div>
                                    <span className="font-bold">{edu.institution}</span>
                                    <span>, {edu.degree}</span>
                                </div>
                                <span>{edu.graduationDate}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-md font-bold uppercase border-b border-black mb-3">Experience</h2>
                    <div className="space-y-4">
                        {data.experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between text-sm font-bold">
                                    <span>{exp.company}</span>
                                    <span>{exp.startDate} – {exp.endDate}</span>
                                </div>
                                <div className="text-sm italic mb-1">{exp.position}</div>
                                <ul className="list-disc list-outside ml-5 text-sm space-y-0.5">
                                    {exp.description.split('\n').map((line, i) => (
                                        <li key={i} className="pl-1">{line}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-md font-bold uppercase border-b border-black mb-3">Projects</h2>
                    <div className="space-y-3">
                        {data.projects.map((proj) => (
                            <div key={proj.id}>
                                <div className="flex justify-between text-sm font-bold">
                                    <span>{proj.name}</span>
                                    <span>{proj.date}</span>
                                </div>
                                <div className="text-sm italic mb-1">Tech Stack: {proj.techStack}</div>
                                <ul className="list-disc list-outside ml-5 text-sm space-y-0.5">
                                    {proj.details.map((detail, i) => (
                                        <li key={i} className="pl-1">{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {(data.skills.all?.length || 0) > 0 && (
                <section>
                    <h2 className="text-md font-bold uppercase border-b border-black mb-3">Skills</h2>
                    <div className="text-sm">
                        <span className="font-bold">Technical Skills: </span>
                        {data.skills.all?.join(', ')}
                    </div>
                </section>
            )}
        </div>
    );
};
