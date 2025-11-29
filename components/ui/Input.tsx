import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
    return (
        <div className="flex flex-col gap-2 mb-4">
            <label className="text-sm font-medium text-gray-300">{label}</label>
            <input
                className={`bg-black/40 border border-white/10 rounded-lg p-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:border-white/20 ${className}`}
                {...props}
            />
        </div>
    );
};
