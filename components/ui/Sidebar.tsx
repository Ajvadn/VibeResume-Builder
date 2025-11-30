import React from 'react';
import { User, Briefcase, GraduationCap, Code, LayoutTemplate, Layers, PlusCircle, Check } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/lib/utils';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
    completionStatus?: {
        personal: boolean;
        experience: boolean;
        education: boolean;
        projects: boolean;
        skills: boolean;
        optional: boolean;
    };
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, completionStatus }) => {
    const navItems = [
        { id: 'personal', icon: User, label: 'Personal' },
        { id: 'experience', icon: Briefcase, label: 'Experience' },
        { id: 'education', icon: GraduationCap, label: 'Education' },
        { id: 'projects', icon: Code, label: 'Projects' },
        { id: 'skills', icon: Layers, label: 'Skills' },
        { id: 'optional', icon: PlusCircle, label: 'Optional' },
        { id: 'templates', icon: LayoutTemplate, label: 'Templates' },
    ];

    return (
        <div className="w-32 flex flex-col items-stretch py-6 px-3 gap-3 glass-panel rounded-2xl border border-white/5 shadow-2xl shadow-purple-900/10 z-20">
            {navItems.map((item) => {
                const isComplete = completionStatus?.[item.id as keyof typeof completionStatus];
                const isActive = activeTab === item.id;

                return (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                            "relative flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl transition-all duration-300 group",
                            isActive
                                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/40"
                                : "text-gray-400 hover:text-white hover:bg-white/10"
                        )}
                        title={item.label}
                    >
                        <div className="relative">
                            <item.icon size={20} className={cn("transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-110")} />
                            {isComplete && !isActive && (
                                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full flex items-center justify-center">
                                    <Check size={10} className="text-white" strokeWidth={3} />
                                </div>
                            )}
                        </div>
                        <span className={cn(
                            "text-[10px] font-medium text-center leading-tight transition-colors",
                            isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300"
                        )}>
                            {item.label}
                        </span>
                        {isActive && (
                            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                        )}
                    </button>
                );
            })}
        </div>
    );
};
