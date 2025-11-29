import React from 'react';
import { User, Briefcase, GraduationCap, Code, LayoutTemplate, Layers } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/lib/utils';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    const navItems = [
        { id: 'personal', icon: User, label: 'Personal' },
        { id: 'experience', icon: Briefcase, label: 'Experience' },
        { id: 'education', icon: GraduationCap, label: 'Education' },
        { id: 'projects', icon: Code, label: 'Projects' },
        { id: 'skills', icon: Layers, label: 'Skills' },
        { id: 'templates', icon: LayoutTemplate, label: 'Templates' },
    ];

    return (
        <div className="w-20 flex flex-col items-center py-6 gap-4 glass-panel rounded-2xl border border-white/5 shadow-2xl shadow-purple-900/10 z-20">
            {navItems.map((item) => (
                <Button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "w-12 h-12 rounded-xl transition-all duration-300 relative group",
                        activeTab === item.id
                            ? "bg-purple-600 text-white shadow-lg shadow-purple-500/40 scale-110"
                            : "text-gray-400 hover:text-white hover:bg-white/10"
                    )}
                    title={item.label}
                >
                    <item.icon size={20} className={cn("transition-transform duration-300", activeTab === item.id ? "scale-110" : "group-hover:scale-110")} />
                    {activeTab === item.id && (
                        <span className="absolute -right-1 -top-1 w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]"></span>
                    )}
                </Button>
            ))}
        </div>
    );
};
