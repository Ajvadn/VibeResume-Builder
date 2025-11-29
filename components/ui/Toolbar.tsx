import React from 'react';
import { Download, Play, ZoomIn, ZoomOut, FileUp, Home, FileText } from 'lucide-react';
import { Button } from './Button';
import Link from 'next/link';

interface ToolbarProps {
    onDownloadPdf: () => void;
    onDownloadDocx: () => void;
    onImport: () => void;
    isGenerating: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onDownloadPdf, onDownloadDocx, onImport, isGenerating }) => {
    return (
        <div className="h-20 flex items-center justify-between px-8 no-print border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-white hover:bg-white/5 mr-2">
                        <Home size={20} />
                    </Button>
                </Link>
                <div className="flex items-center gap-2 mr-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <FileUp size={18} className="text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Vibe<span className="text-purple-500">Maker</span>
                    </span>
                </div>

                <div className="h-8 w-px bg-white/10 mx-2"></div>

                <Button
                    onClick={() => { }}
                    variant="neon"
                    className="shadow-lg shadow-purple-500/20"
                >
                    <Play size={16} className="mr-2 fill-current" />
                    Recompile
                </Button>
                <Button onClick={onImport} variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/5">
                    <FileUp size={16} className="mr-2" />
                    Import
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center bg-black/40 rounded-lg p-1 border border-white/10 backdrop-blur-sm shadow-inner shadow-black/50">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 text-gray-400 hover:text-white rounded-md">
                        <ZoomOut size={14} />
                    </Button>
                    <span className="px-3 text-xs font-mono text-purple-400 font-bold">100%</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 text-gray-400 hover:text-white rounded-md">
                        <ZoomIn size={14} />
                    </Button>
                </div>

                <Button onClick={onDownloadDocx} variant="outline" className="border-blue-500/30 hover:bg-blue-500/10 hover:border-blue-500/50 text-blue-300 hover:text-blue-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-300">
                    <FileText size={16} className="mr-2" />
                    DOCX
                </Button>

                <Button onClick={onDownloadPdf} variant="outline" className="border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500/50 text-purple-300 hover:text-purple-200 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300">
                    <Download size={16} className="mr-2" />
                    PDF
                </Button>
            </div>
        </div>
    );
};
