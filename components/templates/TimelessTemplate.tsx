import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

export const TimelessTemplate: React.FC<{ data: ResumeData; font?: string }> = ({ data, font = 'font-serif' }) => {
    return (
        <div className={cn("text-black p-16 max-w-[210mm] mx-auto bg-white h-full min-h-[297mm]", font)}>
            {/* Header */}
            <header className="text-center mb-12">
                <h1 className="text-3xl font-bold uppercase tracking-widest mb-4">{data.personalInfo.fullName}</h1>
                <div className="text-sm space-y-1">
                    <p>{data.personalInfo.location}</p>
                    <p>
                        {data.personalInfo.phone} • {data.personalInfo.email}
                    </p>
                    <p>
                        {data.personalInfo.linkedin} {data.personalInfo.website && `• ${data.personalInfo.website}`}
                    </p>
                </div>
            </header>

            {/* Summary */}
            {data.personalInfo.summary && (
                <section className="mb-10">
                    <h2 className="text-center text-sm font-bold uppercase tracking-widest mb-4">Summary</h2>
                    <p className="text-sm leading-relaxed text-center max-w-2xl mx-auto">{data.personalInfo.summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-center text-sm font-bold uppercase tracking-widest mb-6 border-b border-black pb-2">Experience</h2>
                    <div className="space-y-8">
                        {data.experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline font-bold text-sm mb-1">
                                    <h3>{exp.company}</h3>
                                    <span>{exp.startDate} – {exp.endDate}</span>
                                </div>
                                <div className="text-sm italic mb-2">{exp.position}</div>
                                <p className="text-sm leading-relaxed">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-center text-sm font-bold uppercase tracking-widest mb-6 border-b border-black pb-2">Education</h2>
                    <div className="space-y-4">
                        {data.education.map((edu) => (
                            <div key={edu.id} className="flex justify-between items-baseline text-sm">
                                <div>
                                    <span className="font-bold">{edu.institution}</span>, {edu.degree}
                                </div>
                                <span>{edu.graduationDate}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {(data.skills.all?.length || 0) > 0 && (
                <section>
                    <h2 className="text-center text-sm font-bold uppercase tracking-widest mb-4 border-b border-black pb-2">Skills</h2>
                    <div className="text-center text-sm leading-loose">
                        {data.skills.all?.join(' • ')}
                    </div>
                </section>
            )}
        </div>
    );
};
