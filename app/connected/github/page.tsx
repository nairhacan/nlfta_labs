'use client';
import { useEffect } from 'react';

export default function GitHubRedirect() {
    useEffect(() => {
        window.location.href = 'https://github.com/NLFTs';
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
            {/* Background pattern to match theme */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 border-2 border-slate-500/20 border-t-white rounded-full animate-spin mb-8"></div>
                <h2 className="text-white font-mono text-[10px] tracking-[0.4em] uppercase animate-pulse">
                    Wait for minute
                </h2>
                <p className="text-slate-500/50 font-mono text-[8px] mt-4 uppercase tracking-widest">
                    Redirecting to GitHub...
                </p>
            </div>
        </div>
    );
}
