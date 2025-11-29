"use client";

import React, { useState, useEffect } from 'react';
import { ResumeData, ExperienceItem, EducationItem } from '@/lib/types';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { ResumePreview } from '@/components/ResumePreview';
import { Sidebar } from '@/components/ui/Sidebar';
import { Toolbar } from '@/components/ui/Toolbar';
import { Button } from '@/components/ui/Button';
import { Plus, Wand2, FileText, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateDocx } from '@/lib/docx-generator';

const initialData: ResumeData = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        website: '',
        summary: '',
        location: '',
    },
    experience: [],
    education: [],
    projects: [],
    skills: {
        languages: [],
        frameworks: [],
        tools: [],
        technologies: [],
        all: []
    },
};

export default function EditorPage() {
    const [data, setData] = useState<ResumeData>(initialData);
    const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'projects' | 'skills' | 'templates'>('personal');
    const [template, setTemplate] = useState<'minimal' | 'modern' | 'professional'>('minimal');
    const [font, setFont] = useState('font-sans');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isParsing, setIsParsing] = useState(false);
    const [rawText, setRawText] = useState('');
    const [showParser, setShowParser] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Load data from local storage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('resumeData');
        if (savedData) {
            try {
                setData(JSON.parse(savedData));
            } catch (e) {
                console.error("Failed to load saved data", e);
            }
        }
    }, []);

    // Auto-save data when it changes
    useEffect(() => {
        const saveData = async () => {
            setIsSaving(true);
            localStorage.setItem('resumeData', JSON.stringify(data));
            // Simulate a short delay to show the "Saving..." state
            await new Promise(resolve => setTimeout(resolve, 500));
            setIsSaving(false);
        };

        const timeoutId = setTimeout(saveData, 1000);
        return () => clearTimeout(timeoutId);
    }, [data]);

    const parseResume = async () => {
        if (!rawText.trim()) return;
        setIsParsing(true);
        try {
            const response = await fetch('/api/parse-resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rawText })
            });
            const parsedData = await response.json();

            // Map parsed data to state
            setData(prev => ({
                ...prev,
                personalInfo: {
                    ...prev.personalInfo,
                    ...(parsedData.personalInfo || {}),
                    website: parsedData.personalInfo?.portfolio || prev.personalInfo.website
                },
                experience: (parsedData.experience || []).map((exp: any, i: number) => ({
                    id: Date.now().toString() + i,
                    company: exp.company,
                    position: exp.role, // Map role to position
                    startDate: exp.date?.split('-')[0]?.trim() || '', // Simple split, might need better parsing
                    endDate: exp.date?.split('-')[1]?.trim() || '',
                    description: exp.details?.join('\n') || '', // Join bullet points
                    details: exp.details || []
                })),
                education: (parsedData.education || []).map((edu: any, i: number) => ({
                    id: Date.now().toString() + i,
                    institution: edu.institution,
                    degree: edu.degree,
                    graduationDate: edu.date,
                    details: edu.details || []
                })),
                projects: (parsedData.projects || []).map((proj: any, i: number) => ({
                    id: Date.now().toString() + i,
                    name: proj.name,
                    techStack: proj.techStack,
                    date: proj.date,
                    details: proj.details || []
                })),
                skills: {
                    ...(parsedData.skills || {}),
                    all: [
                        ...(parsedData.skills?.languages || []),
                        ...(parsedData.skills?.frameworks || []),
                        ...(parsedData.skills?.tools || []),
                        ...(parsedData.skills?.technologies || [])
                    ]
                }
            }));
            setShowParser(false);
        } catch (error) {
            console.error("Parsing failed", error);
            alert("Failed to parse resume. Please try again.");
        } finally {
            setIsParsing(false);
        }
    };


    const generateSummary = async () => {
        if (!data.personalInfo.fullName && !data.experience.length) {
            alert("Please enter some details first so Gemini can generate a summary.");
            return;
        }

        setIsGenerating(true);
        try {
            const prompt = `Write a professional resume summary for ${data.personalInfo.fullName}. 
      Experience: ${data.experience.map(e => `${e.position} at ${e.company}`).join(', ')}. 
      Skills: ${data.skills.all?.join(', ') || ''}.`;

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });

            const result = await response.json();
            if (result.content) {
                updatePersonalInfo('summary', result.content);
            }
        } catch (error) {
            console.error("Failed to generate", error);
        } finally {
            setIsGenerating(false);
        }
    };


    const updatePersonalInfo = (field: string, value: string) => {
        setData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [field]: value }
        }));
    };

    const addExperience = () => {
        const newExp: ExperienceItem = {
            id: Date.now().toString(),
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            description: ''
        };
        setData(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
    };

    const updateExperience = (id: string, field: string, value: string) => {
        setData(prev => ({
            ...prev,
            experience: prev.experience.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        }));
    };

    const addEducation = () => {
        const newEdu: EducationItem = {
            id: Date.now().toString(),
            institution: '',
            degree: '',
            graduationDate: ''
        };
        setData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
    };

    const updateEducation = (id: string, field: string, value: string) => {
        setData(prev => ({
            ...prev,
            education: prev.education.map(edu =>
                edu.id === id ? { ...edu, [field]: value } : edu
            )
        }));
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-black text-white font-sans selection:bg-purple-500/30">
            <Toolbar
                onDownloadPdf={() => window.print()}
                onDownloadDocx={() => generateDocx(data)}
                onImport={() => setShowParser(!showParser)}
                isGenerating={isGenerating}
            />

            <div className="flex flex-1 overflow-hidden p-6 pt-0 gap-6">
                {/* Left Sidebar - Navigation */}
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Middle Pane - Editor */}
                <div className="flex-1 min-w-[450px] max-w-[650px] glass-panel flex flex-col overflow-hidden rounded-2xl border border-white/5 shadow-2xl shadow-purple-900/20">
                    {/* Sticky Header */}
                    <div className="p-5 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-10 flex justify-between items-center">
                        <h2 className="font-bold text-white text-lg tracking-tight flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span>
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                        </h2>
                        {activeTab === 'personal' && (
                            <Button
                                onClick={generateSummary}
                                disabled={isGenerating}
                                variant="neon"
                                size="sm"
                                className="h-8 text-xs"
                                isLoading={isGenerating}
                            >
                                {!isGenerating && <Wand2 size={12} className="mr-2" />}
                                AI Generate
                            </Button>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8">
                        {showParser && (
                            <div className="glass-panel p-6 animate-in fade-in slide-in-from-top-4 border-purple-500/30 rounded-xl bg-purple-900/10">
                                <h3 className="text-lg font-bold mb-2 text-white flex items-center gap-2">
                                    <FileText size={18} className="text-purple-400" />
                                    Import Resume
                                </h3>
                                <p className="text-sm text-gray-400 mb-4">Paste your existing resume to auto-fill details.</p>
                                <textarea
                                    className="w-full h-48 mb-4 p-4 bg-black/60 border border-white/10 rounded-xl text-sm focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none resize-none placeholder:text-gray-600"
                                    placeholder="Paste your entire resume here..."
                                    value={rawText}
                                    onChange={(e) => setRawText(e.target.value)}
                                />
                                <Button
                                    onClick={parseResume}
                                    disabled={isParsing}
                                    className="w-full"
                                    variant="neon"
                                    isLoading={isParsing}
                                >
                                    {isParsing ? 'Analyzing...' : 'Parse Text'}
                                </Button>
                            </div>
                        )}

                        <div className="space-y-8 pb-10">
                            {activeTab === 'personal' && (
                                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="grid grid-cols-2 gap-5">
                                        <Input
                                            label="Full Name"
                                            value={data.personalInfo.fullName}
                                            onChange={e => updatePersonalInfo('fullName', e.target.value)}
                                            placeholder="e.g. John Doe"
                                        />
                                        <Input
                                            label="Email"
                                            value={data.personalInfo.email}
                                            onChange={e => updatePersonalInfo('email', e.target.value)}
                                            placeholder="e.g. john@example.com"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <Input
                                            label="Phone"
                                            value={data.personalInfo.phone}
                                            onChange={e => updatePersonalInfo('phone', e.target.value)}
                                            placeholder="e.g. +1 234 567 890"
                                        />
                                        <Input
                                            label="LinkedIn"
                                            value={data.personalInfo.linkedin}
                                            onChange={e => updatePersonalInfo('linkedin', e.target.value)}
                                            placeholder="e.g. linkedin.com/in/johndoe"
                                        />
                                    </div>
                                    <TextArea
                                        label="Professional Summary"
                                        value={data.personalInfo.summary}
                                        onChange={e => updatePersonalInfo('summary', e.target.value)}
                                        placeholder="Briefly describe your professional background and goals..."
                                        className="h-32"
                                    />
                                </div>
                            )}

                            {activeTab === 'experience' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    {data.experience.map((exp, index) => (
                                        <div key={exp.id} className="bg-white/5 p-6 rounded-2xl border border-white/5 relative group hover:border-purple-500/30 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-900/10">
                                            <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-black border border-white/10 flex items-center justify-center text-xs text-gray-500 font-mono">
                                                {index + 1}
                                            </div>
                                            <div className="grid grid-cols-2 gap-5 mb-5">
                                                <Input
                                                    label="Company"
                                                    value={exp.company}
                                                    onChange={e => updateExperience(exp.id, 'company', e.target.value)}
                                                />
                                                <Input
                                                    label="Position"
                                                    value={exp.position}
                                                    onChange={e => updateExperience(exp.id, 'position', e.target.value)}
                                                />
                                                <Input
                                                    label="Start Date"
                                                    value={exp.startDate}
                                                    onChange={e => updateExperience(exp.id, 'startDate', e.target.value)}
                                                />
                                                <Input
                                                    label="End Date"
                                                    value={exp.endDate}
                                                    onChange={e => updateExperience(exp.id, 'endDate', e.target.value)}
                                                />
                                            </div>
                                            <TextArea
                                                label="Description"
                                                value={exp.description}
                                                onChange={e => updateExperience(exp.id, 'description', e.target.value)}
                                                className="h-24"
                                            />
                                        </div>
                                    ))}
                                    <Button onClick={addExperience} variant="outline" className="w-full py-6 border-dashed border-white/20 hover:border-purple-500/50 hover:bg-purple-500/5 text-gray-400 hover:text-purple-300 group">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1 rounded-full bg-white/10 group-hover:bg-purple-500/20 transition-colors">
                                                <Plus size={16} />
                                            </div>
                                            Add Experience
                                        </div>
                                    </Button>
                                </div>
                            )}

                            {activeTab === 'education' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    {data.education.map((edu, index) => (
                                        <div key={edu.id} className="bg-white/5 p-6 rounded-2xl border border-white/5 relative group hover:border-purple-500/30 transition-all duration-300 hover:bg-white/10">
                                            <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-black border border-white/10 flex items-center justify-center text-xs text-gray-500 font-mono">
                                                {index + 1}
                                            </div>
                                            <Input
                                                label="Institution"
                                                value={edu.institution}
                                                onChange={e => updateEducation(edu.id, 'institution', e.target.value)}
                                            />
                                            <div className="grid grid-cols-2 gap-5 mt-5">
                                                <Input
                                                    label="Degree"
                                                    value={edu.degree}
                                                    onChange={e => updateEducation(edu.id, 'degree', e.target.value)}
                                                />
                                                <Input
                                                    label="Graduation Date"
                                                    value={edu.graduationDate}
                                                    onChange={e => updateEducation(edu.id, 'graduationDate', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <Button onClick={addEducation} variant="outline" className="w-full py-6 border-dashed border-white/20 hover:border-purple-500/50 hover:bg-purple-500/5 text-gray-400 hover:text-purple-300 group">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1 rounded-full bg-white/10 group-hover:bg-purple-500/20 transition-colors">
                                                <Plus size={16} />
                                            </div>
                                            Add Education
                                        </div>
                                    </Button>
                                </div>
                            )}

                            {activeTab === 'projects' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    {data.projects.map(proj => (
                                        <div key={proj.id} className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:bg-white/10">
                                            <Input label="Project Name" value={proj.name} onChange={() => { }} />
                                            <div className="mt-5">
                                                <Input label="Tech Stack" value={proj.techStack} onChange={() => { }} />
                                            </div>
                                            <div className="mt-5">
                                                <TextArea label="Details" value={proj.details.join('\n')} onChange={() => { }} className="h-24" />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="text-center text-gray-500 italic text-sm py-10 bg-white/5 rounded-xl border border-dashed border-white/10">
                                        Project editing coming soon
                                    </div>
                                </div>
                            )}

                            {activeTab === 'skills' && (
                                <div className="bg-white/5 p-8 rounded-2xl border border-white/5 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <TextArea
                                        label="Languages"
                                        value={data.skills.languages?.join(', ') || ''}
                                        onChange={e => setData(prev => ({ ...prev, skills: { ...prev.skills, languages: e.target.value.split(',').map(s => s.trim()) } }))}
                                        placeholder="JavaScript, Python, TypeScript..."
                                    />
                                    <TextArea
                                        label="Frameworks"
                                        value={data.skills.frameworks?.join(', ') || ''}
                                        onChange={e => setData(prev => ({ ...prev, skills: { ...prev.skills, frameworks: e.target.value.split(',').map(s => s.trim()) } }))}
                                        placeholder="React, Next.js, Node.js..."
                                    />
                                    <TextArea
                                        label="Tools"
                                        value={data.skills.tools?.join(', ') || ''}
                                        onChange={e => setData(prev => ({ ...prev, skills: { ...prev.skills, tools: e.target.value.split(',').map(s => s.trim()) } }))}
                                        placeholder="Git, Docker, AWS..."
                                    />
                                </div>
                            )}

                            {activeTab === 'templates' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    {/* Font Selection */}
                                    <div>
                                        <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                                            <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                                            Typography
                                        </h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            {[
                                                { id: 'font-sans', name: 'Default', class: 'font-sans' },
                                                { id: 'font-inter', name: 'Inter', class: 'font-inter' },
                                                { id: 'font-roboto', name: 'Roboto', class: 'font-roboto' },
                                                { id: 'font-open-sans', name: 'Open Sans', class: 'font-open-sans' },
                                                { id: 'font-lato', name: 'Lato', class: 'font-lato' },
                                                { id: 'font-montserrat', name: 'Montserrat', class: 'font-montserrat' },
                                                { id: 'font-playfair', name: 'Playfair', class: 'font-playfair' },
                                                { id: 'font-merriweather', name: 'Merriweather', class: 'font-merriweather' },
                                                { id: 'font-lora', name: 'Lora', class: 'font-lora' },
                                                { id: 'font-roboto-mono', name: 'Roboto Mono', class: 'font-roboto-mono' },
                                                { id: 'font-fira-code', name: 'Fira Code', class: 'font-fira-code' },
                                                { id: 'font-custom', name: 'Custom', class: 'font-custom' },
                                            ].map((f) => (
                                                <div
                                                    key={f.id}
                                                    onClick={() => {
                                                        if (f.id === 'font-custom') {
                                                            document.getElementById('font-upload')?.click();
                                                        } else {
                                                            setFont(f.class);
                                                        }
                                                    }}
                                                    className={cn(
                                                        "p-4 rounded-xl border cursor-pointer transition-all duration-300 relative overflow-hidden group text-center",
                                                        font === f.class
                                                            ? "bg-purple-900/20 border-purple-500 shadow-lg shadow-purple-500/20"
                                                            : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
                                                    )}
                                                >
                                                    <span className={cn("text-2xl block mb-2", f.class)}>Aa</span>
                                                    <span className={cn("text-xs font-medium", font === f.class ? "text-purple-400" : "text-gray-400")}>{f.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <input
                                            type="file"
                                            id="font-upload"
                                            className="hidden"
                                            accept=".ttf,.otf,.woff,.woff2"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    try {
                                                        const buffer = await file.arrayBuffer();
                                                        const fontFace = new FontFace('CustomFont', buffer);
                                                        await fontFace.load();
                                                        document.fonts.add(fontFace);
                                                        setFont('font-custom');
                                                    } catch (err) {
                                                        console.error("Failed to load font", err);
                                                        alert("Failed to load font. Please try a valid TTF, OTF, or WOFF file.");
                                                    }
                                                }
                                            }}
                                        />
                                    </div>

                                    {/* Template Selection */}
                                    <div>
                                        <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                                            <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
                                            Templates
                                        </h3>
                                        <div className="grid grid-cols-1 gap-6">
                                            {[
                                                { id: 'minimal', name: 'Minimalist', desc: 'Clean and simple, perfect for corporate roles.' },
                                                { id: 'professional', name: 'Professional', desc: 'Traditional layout with a modern touch.' },
                                                { id: 'modern', name: 'Modern', desc: 'Bold and creative, stands out from the crowd.', recommended: true }
                                            ].map((t) => (
                                                <div
                                                    key={t.id}
                                                    onClick={() => setTemplate(t.id as any)}
                                                    className={cn(
                                                        "p-6 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden group",
                                                        template === t.id
                                                            ? "bg-purple-900/20 border-purple-500 shadow-lg shadow-purple-500/20"
                                                            : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
                                                    )}
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className={cn("text-xl font-bold", template === t.id ? "text-purple-400" : "text-white")}>{t.name}</h3>
                                                        {t.recommended && (
                                                            <span className="px-2 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
                                                                Recommended
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-400 mb-4">{t.desc}</p>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-purple-400 transition-colors">
                                                        <span className={cn("w-2 h-2 rounded-full", template === t.id ? "bg-green-500 animate-pulse" : "bg-gray-600")}></span>
                                                        {template === t.id ? 'Active Template' : 'Click to Apply'}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Pane - Preview */}
                <div className="flex-1 glass-panel flex flex-col relative overflow-hidden rounded-2xl border border-white/5 shadow-2xl shadow-black/50">
                    <div className="p-4 border-b border-white/5 bg-black/40 backdrop-blur-xl flex justify-between items-center z-10">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            Live Preview
                        </span>
                        <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
                            {['minimal', 'professional', 'modern'].map((t) => (
                                <Button
                                    key={t}
                                    onClick={() => setTemplate(t as any)}
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                        "capitalize text-xs h-8 px-4 rounded-md transition-all duration-300",
                                        template === t
                                            ? "bg-white/10 text-white shadow-sm border border-white/5"
                                            : "text-gray-500 hover:text-gray-300"
                                    )}
                                >
                                    {t}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-8 flex justify-center items-start print-only bg-black/40 custom-scrollbar">
                        <div className="w-[210mm] min-h-[297mm] bg-white shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition-transform duration-500 ease-out transform hover:scale-[1.01] origin-top">
                            <ResumePreview data={data} template={template} font={font} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
