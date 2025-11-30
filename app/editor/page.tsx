"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { ResumeData, ExperienceItem, EducationItem, ProjectItem } from '@/lib/types';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { ResumePreview } from '@/components/ResumePreview';
import { Sidebar } from '@/components/ui/Sidebar';
import { Toolbar } from '@/components/ui/Toolbar';
import { Button } from '@/components/ui/Button';
import { OptionalSections } from '@/components/OptionalSections';
import { ProgressBar } from '@/components/ProgressBar';
import { Plus, FileText, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateDocx } from '@/lib/docx-generator';
import { templates } from '@/lib/templates';

import { useSearchParams } from 'next/navigation';
import { sampleData } from '@/lib/sample-data';

const initialData: ResumeData = sampleData;

function EditorContent() {
    const searchParams = useSearchParams();
    const [data, setData] = useState<ResumeData>(initialData);
    const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'projects' | 'skills' | 'optional' | 'templates'>('personal');
    const [template, setTemplate] = useState<string>('minimal');
    const [font, setFont] = useState('font-sans');
    const [accentColor, setAccentColor] = useState('#8b5cf6'); // Purple default
    const [isSaving, setIsSaving] = useState(false);

    // Handle template query param
    useEffect(() => {
        const templateParam = searchParams.get('template');
        if (templateParam && templates.some(t => t.id === templateParam)) {
            setTemplate(templateParam);
        }
    }, [searchParams]);

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

    const addProject = () => {
        const newProj: ProjectItem = {
            id: Date.now().toString(),
            name: '',
            techStack: '',
            date: '',
            details: []
        };
        setData(prev => ({ ...prev, projects: [...prev.projects, newProj] }));
    };

    const updateProject = (id: string, field: string, value: string | string[]) => {
        setData(prev => ({
            ...prev,
            projects: prev.projects.map(proj =>
                proj.id === id ? { ...proj, [field]: value } : proj
            )
        }));
    };

    // Optional sections handlers
    const addCertification = () => {
        const newCert = { id: Date.now().toString(), name: '', issuer: '', date: '', credentialId: '', url: '' };
        setData(prev => ({ ...prev, certifications: [...(prev.certifications || []), newCert] }));
    };

    const updateCertification = (id: string, field: string, value: string) => {
        setData(prev => ({ ...prev, certifications: prev.certifications?.map(cert => cert.id === id ? { ...cert, [field]: value } : cert) }));
    };

    const addAward = () => {
        const newAward = { id: Date.now().toString(), title: '', issuer: '', date: '', description: '' };
        setData(prev => ({ ...prev, awards: [...(prev.awards || []), newAward] }));
    };

    const updateAward = (id: string, field: string, value: string) => {
        setData(prev => ({ ...prev, awards: prev.awards?.map(award => award.id === id ? { ...award, [field]: value } : award) }));
    };

    const addLanguage = () => {
        const newLang = { id: Date.now().toString(), language: '', proficiency: '' };
        setData(prev => ({ ...prev, languages: [...(prev.languages || []), newLang] }));
    };

    const updateLanguage = (id: string, field: string, value: string) => {
        setData(prev => ({ ...prev, languages: prev.languages?.map(lang => lang.id === id ? { ...lang, [field]: value } : lang) }));
    };

    const addVolunteer = () => {
        const newVol = { id: Date.now().toString(), organization: '', role: '', startDate: '', endDate: '', description: '' };
        setData(prev => ({ ...prev, volunteer: [...(prev.volunteer || []), newVol] }));
    };

    const updateVolunteer = (id: string, field: string, value: string) => {
        setData(prev => ({ ...prev, volunteer: prev.volunteer?.map(vol => vol.id === id ? { ...vol, [field]: value } : vol) }));
    };

    // Completion tracking
    const getCompletionStatus = () => {
        const personal = !!(data.personalInfo.fullName && data.personalInfo.email);
        const experience = data.experience.length > 0 && data.experience.some(exp => exp.company && exp.position);
        const education = data.education.length > 0 && data.education.some(edu => edu.institution && edu.degree);
        const projects = data.projects.length > 0;
        const skills = !!(data.skills.languages?.length || data.skills.frameworks?.length || data.skills.tools?.length);
        const optional = !!(data.certifications?.length || data.awards?.length || data.languages?.length || data.volunteer?.length);

        return { personal, experience, education, projects, skills, optional };
    };

    const calculateProgress = () => {
        const status = getCompletionStatus();
        const requiredSections = [status.personal, status.experience, status.education];
        const optionalSections = [status.projects, status.skills];

        const completedRequired = requiredSections.filter(Boolean).length;
        const completedOptional = optionalSections.filter(Boolean).length;

        const percentage = ((completedRequired * 20) + (completedOptional * 20));
        const completedCount = completedRequired + completedOptional;

        return { percentage, completedCount, total: 5 };
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-black text-white font-sans selection:bg-purple-500/30">
            <Toolbar
                onDownloadPdf={() => window.print()}
                onDownloadDocx={async () => {
                    try {
                        await generateDocx(data);
                    } catch (error) {
                        console.error("Failed to generate DOCX", error);
                        alert("Failed to generate DOCX. Please check the console for details.");
                    }
                }}
                isGenerating={false}
            />

            <div className="flex flex-1 overflow-hidden p-6 pt-0 gap-6">
                {/* Left Sidebar - Navigation */}
                <div className="no-print">
                    <Sidebar
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        completionStatus={getCompletionStatus()}
                    />
                </div>

                {/* Middle Pane - Editor */}
                <div className="flex-1 min-w-[450px] max-w-[650px] glass-panel flex flex-col overflow-hidden rounded-2xl border border-white/5 shadow-2xl shadow-purple-900/20 no-print">
                    {/* Sticky Header */}
                    <div className="p-5 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-10 flex justify-between items-center">
                        <h2 className="font-bold text-white text-lg tracking-tight flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span>
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                        </h2>
                    </div>

                    {/* Progress Bar */}
                    <div className="px-5 pt-4">
                        <ProgressBar
                            percentage={calculateProgress().percentage}
                            completedSections={calculateProgress().completedCount}
                            totalSections={calculateProgress().total}
                        />
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8">
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
                                        enableAI={true}
                                        aiType="summary"
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
                                                enableAI={true}
                                                aiType="experience"
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
                                    {data.projects.map((proj, index) => (
                                        <div key={proj.id} className="bg-white/5 p-6 rounded-2xl border border-white/5 relative group hover:border-purple-500/30 transition-all duration-300 hover:bg-white/10">
                                            <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-black border border-white/10 flex items-center justify-center text-xs text-gray-500 font-mono">
                                                {index + 1}
                                            </div>
                                            <Input
                                                label="Project Name"
                                                value={proj.name}
                                                onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                                            />
                                            <div className="mt-5">
                                                <Input
                                                    label="Tech Stack"
                                                    value={proj.techStack}
                                                    onChange={(e) => updateProject(proj.id, 'techStack', e.target.value)}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-5 mt-5">
                                                <Input
                                                    label="Date"
                                                    value={proj.date}
                                                    onChange={(e) => updateProject(proj.id, 'date', e.target.value)}
                                                    placeholder="e.g. Jan 2024 - Mar 2024"
                                                />
                                            </div>
                                            <div className="mt-5">
                                                <TextArea
                                                    label="Details (one per line)"
                                                    value={proj.details.join('\n')}
                                                    onChange={(e) => updateProject(proj.id, 'details', e.target.value.split('\n'))}
                                                    className="h-24"
                                                    placeholder="Enter each detail on a new line"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <Button onClick={addProject} variant="outline" className="w-full py-6 border-dashed border-white/20 hover:border-purple-500/50 hover:bg-purple-500/5 text-gray-400 hover:text-purple-300 group">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1 rounded-full bg-white/10 group-hover:bg-purple-500/20 transition-colors">
                                                <Plus size={16} />
                                            </div>
                                            Add Project
                                        </div>
                                    </Button>
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

                            {activeTab === 'optional' && (
                                <OptionalSections
                                    data={data}
                                    addCertification={addCertification}
                                    updateCertification={updateCertification}
                                    addAward={addAward}
                                    updateAward={updateAward}
                                    addLanguage={addLanguage}
                                    updateLanguage={updateLanguage}
                                    addVolunteer={addVolunteer}
                                    updateVolunteer={updateVolunteer}
                                />
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

                                    {/* Color Picker */}
                                    <div>
                                        <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                                            <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
                                            Accent Color
                                        </h3>
                                        <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/5">
                                            <div className="flex-1">
                                                <label className="text-sm font-medium text-gray-300 mb-2 block">Choose your accent color</label>
                                                <p className="text-xs text-gray-500 mb-3">This color will be used for headers, accents, and highlights in your resume</p>
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="color"
                                                        value={accentColor}
                                                        onChange={(e) => setAccentColor(e.target.value)}
                                                        className="h-12 w-24 rounded-lg cursor-pointer border-2 border-white/10 hover:border-white/20 transition-colors"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="text-xs text-gray-400 mb-1">Selected Color</div>
                                                        <div className="font-mono text-sm text-white">{accentColor.toUpperCase()}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-4 gap-2">
                                                {['#8b5cf6', '#3b82f6', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#8b5a3c'].map((color) => (
                                                    <button
                                                        key={color}
                                                        onClick={() => setAccentColor(color)}
                                                        className={cn(
                                                            "w-10 h-10 rounded-lg transition-all duration-200 border-2",
                                                            accentColor === color ? "border-white scale-110" : "border-transparent hover:scale-105"
                                                        )}
                                                        style={{ backgroundColor: color }}
                                                        title={color}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Template Selection */}
                                    <div>
                                        <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                                            <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
                                            Templates
                                        </h3>
                                        <div className="grid grid-cols-1 gap-6">
                                            {templates.map((t) => (
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
                                                    <p className="text-sm text-gray-400 mb-4">{t.description}</p>
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
                        <div className="flex bg-black/40 p-1 rounded-lg border border-white/5 overflow-x-auto max-w-[300px] custom-scrollbar">
                            {templates.map((t) => (
                                <Button
                                    key={t.id}
                                    onClick={() => setTemplate(t.id)}
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                        "capitalize text-xs h-8 px-4 rounded-md transition-all duration-300 whitespace-nowrap",
                                        template === t.id
                                            ? "bg-white/10 text-white shadow-sm border border-white/5"
                                            : "text-gray-500 hover:text-gray-300"
                                    )}
                                >
                                    {t.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-8 flex justify-center items-start print-only bg-black/40 custom-scrollbar">
                        <div className="w-[210mm] min-h-[297mm] bg-white shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition-transform duration-500 ease-out transform hover:scale-[1.01] origin-top">
                            <ResumePreview data={data} template={template} font={font} accentColor={accentColor} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function EditorPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen bg-black text-white">Loading...</div>}>
            <EditorContent />
        </Suspense>
    );
}
