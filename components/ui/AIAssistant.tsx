'use client';

import React, { useState } from 'react';
import { Sparkles, Loader2, Check, X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { generateContent } from '@/app/actions';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface AIAssistantProps {
    currentValue: string;
    onAccept: (value: string) => void;
    type: 'summary' | 'experience' | 'general';
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ currentValue, onAccept, type }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [suggestion, setSuggestion] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!currentValue || currentValue.length < 10) {
            setError("Please enter at least 10 characters to generate a suggestion.");
            setIsOpen(true);
            return;
        }

        setIsLoading(true);
        setError(null);
        setIsOpen(true);

        try {
            const result = await generateContent(currentValue, type);
            if (result.success && result.text) {
                setSuggestion(result.text);
            } else {
                setError(result.error || "Failed to generate content");
            }
        } catch (e) {
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAccept = () => {
        if (suggestion) {
            onAccept(suggestion);
            setIsOpen(false);
            setSuggestion(null);
        }
    };

    return (
        <div className="relative inline-block">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleGenerate}
                className="h-8 px-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 transition-colors"
                title="Improve with AI"
            >
                <Sparkles size={16} />
                <span className="ml-2 text-xs font-medium">Improve with AI</span>
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 z-50 w-80 md:w-96 bg-slate-900 border border-purple-500/30 rounded-xl shadow-2xl shadow-purple-900/50 overflow-hidden"
                    >
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                    <Sparkles size={14} className="text-purple-400" />
                                    AI Suggestion
                                </h4>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-500 hover:text-white transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            {isLoading ? (
                                <div className="py-8 flex flex-col items-center justify-center text-purple-400">
                                    <Loader2 size={24} className="animate-spin mb-2" />
                                    <span className="text-xs">Generating magic...</span>
                                </div>
                            ) : error ? (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
                                    {error}
                                </div>
                            ) : suggestion ? (
                                <div className="space-y-4">
                                    <div className="p-3 bg-black/40 rounded-lg border border-white/5 text-sm text-gray-300 leading-relaxed max-h-60 overflow-y-auto custom-scrollbar">
                                        {suggestion}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={handleAccept}
                                            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white h-8 text-xs"
                                        >
                                            <Check size={14} className="mr-1.5" />
                                            Accept
                                        </Button>
                                        <Button
                                            onClick={handleGenerate}
                                            variant="outline"
                                            className="flex-1 border-white/10 hover:bg-white/5 text-gray-300 h-8 text-xs"
                                        >
                                            <RefreshCw size={14} className="mr-1.5" />
                                            Try Again
                                        </Button>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
