import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
    percentage: number;
    completedSections: number;
    totalSections: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, completedSections, totalSections }) => {
    const getMessage = () => {
        if (percentage < 25) return "Just getting started! 🚀";
        if (percentage < 50) return "Making progress! 💪";
        if (percentage < 75) return "Looking good! ⭐";
        if (percentage < 100) return "Almost there! 🎯";
        return "Resume complete! 🎉";
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Resume Progress</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium">
                        {completedSections}/{totalSections} sections
                    </span>
                </div>
                <span className="text-sm font-bold text-purple-400">{Math.round(percentage)}%</span>
            </div>
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden mb-2">
                <div
                    className={cn(
                        "h-full transition-all duration-500 ease-out rounded-full",
                        percentage < 50 ? "bg-gradient-to-r from-orange-500 to-amber-500" :
                            percentage < 100 ? "bg-gradient-to-r from-purple-500 to-pink-500" :
                                "bg-gradient-to-r from-green-500 to-emerald-500"
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <p className="text-xs text-gray-400">{getMessage()}</p>
        </div>
    );
};
