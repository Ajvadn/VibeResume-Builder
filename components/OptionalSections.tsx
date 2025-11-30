import React, { useState } from 'react';
import { Input } from './ui/Input';
import { TextArea } from './ui/TextArea';
import { Button } from './ui/Button';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OptionalSectionsProps {
    data: any;
    addCertification: () => void;
    updateCertification: (id: string, field: string, value: string) => void;
    addAward: () => void;
    updateAward: (id: string, field: string, value: string) => void;
    addLanguage: () => void;
    updateLanguage: (id: string, field: string, value: string) => void;
    addVolunteer: () => void;
    updateVolunteer: (id: string, field: string, value: string) => void;
}

export const OptionalSections: React.FC<OptionalSectionsProps> = ({
    data,
    addCertification,
    updateCertification,
    addAward,
    updateAward,
    addLanguage,
    updateLanguage,
    addVolunteer,
    updateVolunteer
}) => {
    const [expandedSection, setExpandedSection] = useState<string>('');

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? '' : section);
    };

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Certifications */}
            <div className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
                <button
                    onClick={() => toggleSection('certifications')}
                    className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-white">Certifications</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-400">Optional</span>
                    </div>
                    {expandedSection === 'certifications' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSection === 'certifications' && (
                    <div className="p-6 pt-0 space-y-4">
                        {data.certifications?.map((cert: any) => (
                            <div key={cert.id} className="p-4 bg-black/20 rounded-xl space-y-3">
                                <Input label="Certificate Name" value={cert.name} onChange={(e) => updateCertification(cert.id, 'name', e.target.value)} />
                                <Input label="Issuer" value={cert.issuer} onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)} />
                                <div className="grid grid-cols-2 gap-3">
                                    <Input label="Date" value={cert.date} onChange={(e) => updateCertification(cert.id, 'date', e.target.value)} placeholder="e.g. Jan 2024" />
                                    <Input label="Credential ID" value={cert.credentialId || ''} onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)} />
                                </div>
                                <Input label="URL (Optional)" value={cert.url || ''} onChange={(e) => updateCertification(cert.id, 'url', e.target.value)} placeholder="https://..." />
                            </div>
                        ))}
                        <Button onClick={addCertification} variant="outline" className="w-full border-dashed">
                            <Plus size={16} className="mr-2" /> Add Certification
                        </Button>
                    </div>
                )}
            </div>

            {/* Awards */}
            <div className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
                <button
                    onClick={() => toggleSection('awards')}
                    className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-white">Awards & Honors</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-400">Optional</span>
                    </div>
                    {expandedSection === 'awards' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSection === 'awards' && (
                    <div className="p-6 pt-0 space-y-4">
                        {data.awards?.map((award: any) => (
                            <div key={award.id} className="p-4 bg-black/20 rounded-xl space-y-3">
                                <Input label="Award Title" value={award.title} onChange={(e) => updateAward(award.id, 'title', e.target.value)} />
                                <div className="grid grid-cols-2 gap-3">
                                    <Input label="Issuer" value={award.issuer} onChange={(e) => updateAward(award.id, 'issuer', e.target.value)} />
                                    <Input label="Date" value={award.date} onChange={(e) => updateAward(award.id, 'date', e.target.value)} placeholder="e.g. 2024" />
                                </div>
                                <TextArea label="Description (Optional)" value={award.description || ''} onChange={(e) => updateAward(award.id, 'description', e.target.value)} className="h-20" />
                            </div>
                        ))}
                        <Button onClick={addAward} variant="outline" className="w-full border-dashed">
                            <Plus size={16} className="mr-2" /> Add Award
                        </Button>
                    </div>
                )}
            </div>

            {/* Languages */}
            <div className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
                <button
                    onClick={() => toggleSection('languages')}
                    className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-white">Languages</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-400">Optional</span>
                    </div>
                    {expandedSection === 'languages' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSection === 'languages' && (
                    <div className="p-6 pt-0 space-y-4">
                        {data.languages?.map((lang: any) => (
                            <div key={lang.id} className="p-4 bg-black/20 rounded-xl grid grid-cols-2 gap-3">
                                <Input label="Language" value={lang.language} onChange={(e) => updateLanguage(lang.id, 'language', e.target.value)} />
                                <Input label="Proficiency" value={lang.proficiency} onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)} placeholder="e.g. Native, Fluent" />
                            </div>
                        ))}
                        <Button onClick={addLanguage} variant="outline" className="w-full border-dashed">
                            <Plus size={16} className="mr-2" /> Add Language
                        </Button>
                    </div>
                )}
            </div>

            {/* Volunteer Work */}
            <div className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
                <button
                    onClick={() => toggleSection('volunteer')}
                    className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-white">Volunteer Work</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-400">Optional</span>
                    </div>
                    {expandedSection === 'volunteer' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSection === 'volunteer' && (
                    <div className="p-6 pt-0 space-y-4">
                        {data.volunteer?.map((vol: any) => (
                            <div key={vol.id} className="p-4 bg-black/20 rounded-xl space-y-3">
                                <Input label="Organization" value={vol.organization} onChange={(e) => updateVolunteer(vol.id, 'organization', e.target.value)} />
                                <Input label="Role" value={vol.role} onChange={(e) => updateVolunteer(vol.id, 'role', e.target.value)} />
                                <div className="grid grid-cols-2 gap-3">
                                    <Input label="Start Date" value={vol.startDate} onChange={(e) => updateVolunteer(vol.id, 'startDate', e.target.value)} placeholder="e.g. Jan 2023" />
                                    <Input label="End Date" value={vol.endDate} onChange={(e) => updateVolunteer(vol.id, 'endDate', e.target.value)} placeholder="Present or Month Year" />
                                </div>
                                <TextArea label="Description" value={vol.description} onChange={(e) => updateVolunteer(vol.id, 'description', e.target.value)} className="h-20" />
                            </div>
                        ))}
                        <Button onClick={addVolunteer} variant="outline" className="w-full border-dashed">
                            <Plus size={16} className="mr-2" /> Add Volunteer Work
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
