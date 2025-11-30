import React from 'react';
import { AIAssistant } from './AIAssistant';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    enableAI?: boolean;
    onAiContent?: (content: string) => void;
    aiType?: 'summary' | 'experience' | 'general';
}

export const TextArea: React.FC<TextAreaProps> = ({
    label,
    className,
    enableAI = false,
    onAiContent,
    aiType = 'general',
    value,
    onChange,
    ...props
}) => {
    const handleAiAccept = (content: string) => {
        if (onAiContent) {
            onAiContent(content);
        } else if (onChange) {
            // Create a synthetic event if onAiContent is not provided
            const event = {
                target: { value: content }
            } as React.ChangeEvent<HTMLTextAreaElement>;
            onChange(event);
        }
    };

    return (
        <div className="flex flex-col gap-2 mb-4">
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300">{label}</label>
                {enableAI && (
                    <AIAssistant
                        currentValue={String(value || '')}
                        onAccept={handleAiAccept}
                        type={aiType}
                    />
                )}
            </div>
            <textarea
                className={`bg-black/40 border border-white/10 rounded-lg p-3 text-white placeholder:text-gray-600 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:border-white/20 resize-y ${className}`}
                value={value}
                onChange={onChange}
                {...props}
            />
        </div>
    );
};
