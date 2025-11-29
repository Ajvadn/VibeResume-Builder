"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Wand2 } from "lucide-react";

export default function Home() {


    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 font-sans bg-black selection:bg-purple-500/30">
            <div className="glass-panel p-12 text-center max-w-2xl border border-white/10 shadow-2xl shadow-purple-900/20 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>

                <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 tracking-tight">
                    Vibe Resume Maker
                </h1>

                <p className="text-xl mb-10 text-gray-400 leading-relaxed">
                    Create ATS-friendly resumes with the power of <span className="text-purple-400 font-semibold">Gemini AI</span>.
                    <br />
                    Professional templates, premium aesthetics.
                </p>

                <Link href="/editor">
                    <Button
                        size="lg"
                        className="text-lg px-8 py-6 rounded-xl bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] border-none"
                    >
                        <Wand2 className="mr-3 h-6 w-6" />
                        Start Creating
                    </Button>
                </Link>
            </div>
        </main>
    );
}
