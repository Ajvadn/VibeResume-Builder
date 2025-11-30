import React from 'react';
import Link from 'next/link';
import { ResumeData } from '@/lib/types';
import { TemplateConfig } from '@/lib/templates';
import { cn } from '@/lib/utils';
import { ModernTemplate } from '../templates/ModernTemplate';
import { ProfessionalTemplate } from '../templates/ProfessionalTemplate';
import { MinimalTemplate } from '../templates/MinimalTemplate';
import { SwissTemplate } from '../templates/SwissTemplate';
import { GeometricTemplate } from '../templates/GeometricTemplate';
import { CleanTemplate } from '../templates/CleanTemplate';
import { CorporateTemplate } from '../templates/CorporateTemplate';
import { ClassicSerifTemplate } from '../templates/ClassicSerifTemplate';
import { ElegantTemplate } from '../templates/ElegantTemplate';
import { TimelessTemplate } from '../templates/TimelessTemplate';
import { ExecutiveTemplate } from '../templates/ExecutiveTemplate';
import { DesignerTemplate } from '../templates/DesignerTemplate';
import { PortfolioTemplate } from '../templates/PortfolioTemplate';
import { VibrantTemplate } from '../templates/VibrantTemplate';
import { InfographicTemplate } from '../templates/InfographicTemplate';
import { DevOpsTemplate } from '../templates/DevOpsTemplate';
import { EngineeringTemplate } from '../templates/EngineeringTemplate';
import { StackTemplate } from '../templates/StackTemplate';
import { ResearchTemplate } from '../templates/ResearchTemplate';
import { ScholarTemplate } from '../templates/ScholarTemplate';

interface TemplateCardProps {
    template: TemplateConfig;
    data: ResumeData;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, data }) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [scale, setScale] = React.useState(0.2);

    React.useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                // 210mm is approx 794px at 96dpi
                const newScale = containerWidth / 794;
                setScale(newScale);
            }
        };

        // Initial calculation
        updateScale();

        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const renderTemplate = () => {
        switch (template.id) {
            case 'modern': return <ModernTemplate data={data} />;
            case 'professional': return <ProfessionalTemplate data={data} />;
            case 'minimal': return <MinimalTemplate data={data} />;
            case 'swiss': return <SwissTemplate data={data} />;
            case 'geometric': return <GeometricTemplate data={data} />;
            case 'clean': return <CleanTemplate data={data} />;
            case 'corporate': return <CorporateTemplate data={data} />;
            case 'classic-serif': return <ClassicSerifTemplate data={data} />;
            case 'elegant': return <ElegantTemplate data={data} />;
            case 'timeless': return <TimelessTemplate data={data} />;
            case 'executive': return <ExecutiveTemplate data={data} />;
            case 'designer': return <DesignerTemplate data={data} />;
            case 'portfolio': return <PortfolioTemplate data={data} />;
            case 'vibrant': return <VibrantTemplate data={data} />;
            case 'infographic': return <InfographicTemplate data={data} />;
            case 'devops': return <DevOpsTemplate data={data} />;
            case 'engineering': return <EngineeringTemplate data={data} />;
            case 'stack': return <StackTemplate data={data} />;
            case 'research': return <ResearchTemplate data={data} />;
            case 'scholar': return <ScholarTemplate data={data} />;
            default: return <ModernTemplate data={data} />;
        }
    };

    return (
        <Link href={`/editor?template=${template.id}`} className="group block">
            <div ref={containerRef} className="relative aspect-[210/297] bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-purple-500/30 group-hover:scale-[1.02] border border-white/10">
                {/* Scaled Preview Container */}
                <div
                    className="absolute top-0 left-0 w-[210mm] h-[297mm] origin-top-left pointer-events-none select-none"
                    style={{ transform: `scale(${scale})` }}
                >
                    {renderTemplate()}
                </div>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/80 backdrop-blur-sm border-t border-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-white font-bold text-sm">{template.name}</h3>
                            <p className="text-gray-400 text-xs truncate">{template.description}</p>
                        </div>
                        {template.recommended && (
                            <span className="bg-yellow-500/20 text-yellow-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-yellow-500/30 flex items-center gap-1">
                                ★
                            </span>
                        )}
                    </div>
                </div>

                {/* Recommended Badge (Always Visible) */}
                {template.recommended && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded-full shadow-lg shadow-yellow-500/20 z-10 flex items-center gap-1">
                        ★ Recommended
                    </div>
                )}
            </div>
        </Link>
    );
};
