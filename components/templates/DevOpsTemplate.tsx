import React from 'react';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';

export const DevOpsTemplate: React.FC<{ data: ResumeData; font?: string }> = ({ data, font = 'font-mono' }) => {
    return (
        <div className={cn("text-green-400 p-10 max-w-[210mm] mx-auto bg-slate-900 h-full min-h-[297mm] font-mono", font)}>
            {/* Header */}
            <header className="mb-10 border-b border-green-800 pb-6">
                <h1 className="text-3xl font-bold mb-2 text-green-500">{`> ${data.personalInfo.fullName}`}</h1>
                <p className="text-green-300 mb-4">{`// ${data.experience[0]?.position || 'Engineer'}`}</p>
                <div className="text-sm text-green-600 space-y-1">
                    <p>{`const email = "${data.personalInfo.email}";`}</p>
                    <p>{`const phone = "${data.personalInfo.phone}";`}</p>
                    <p>{`const location = "${data.personalInfo.location}";`}</p>
                    <p>{`const linkedin = "${data.personalInfo.linkedin}";`}</p>
                </div>
            </header>

            {/* Skills (Terminal Style) */}
            {(data.skills.all?.length || 0) > 0 && (
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-green-500 mb-4">{`$ cat skills.txt`}</h2>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                        {data.skills.all?.map((skill, i) => (
                            <span key={i} className="text-green-300">
                                {`[${i}] ${skill}`}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-green-500 mb-6">{`$ tail -f experience.log`}</h2>
                    <div className="space-y-8">
                        {data.experience.map((exp) => (
                            <div key={exp.id} className="border-l border-green-800 pl-4">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-green-400">{exp.position}</h3>
                                    <span className="text-xs text-green-700">{exp.startDate} – {exp.endDate}</span>
                                </div>
                                <div className="text-sm text-green-600 mb-2">@{exp.company}</div>
                                <p className="text-sm leading-relaxed text-green-300 opacity-90">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold text-green-500 mb-6">{`$ cat education.json`}</h2>
                    <div className="space-y-4">
                        {data.education.map((edu) => (
                            <div key={edu.id} className="text-sm">
                                <span className="text-green-300">{`{`}</span>
                                <div className="pl-4">
                                    <p><span className="text-green-600">institution:</span> <span className="text-green-300">"{edu.institution}"</span>,</p>
                                    <p><span className="text-green-600">degree:</span> <span className="text-green-300">"{edu.degree}"</span>,</p>
                                    <p><span className="text-green-600">date:</span> <span className="text-green-300">"{edu.graduationDate}"</span></p>
                                </div>
                                <span className="text-green-300">{`}`}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};
