import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, className, ...props }) => {
    return (
        <div className="flex flex-col gap-2 mb-4">
            <label className="text-sm font-medium text-gray-300">{label}</label>
            <textarea
                className={`bg-black/40 border border-white/10 rounded-lg p-3 text-white placeholder:text-gray-600 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:border-white/20 resize-y ${className}`}
                {...props}
            />
        </div>
    );
};
