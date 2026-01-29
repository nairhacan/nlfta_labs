import type { Metadata } from "next";
import { DocsSidebar } from "@/app/assets/fragments/DocsUI";

export const metadata: Metadata = {
    title: {
        template: "%s | NLFTs Docs",
        default: "Documentation | NLFTs Protocol",
    },
    description: "Official guide for the NLFTs Protocol. Built by engineers, for engineers.",
};

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
            {/* Premium Navigation */}
            <DocsSidebar />

            {/* Content Area */}
            <main className="flex-1 lg:ml-72 min-h-screen relative">
                {/* Glow Aura */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

                <div className="max-w-4xl mx-auto pt-32 pb-24 lg:pt-24 px-6 lg:px-16">
                    <div className="animate-in fade-in slide-in-from-bottom-5 duration-1000 fill-mode-both">
                        {children}
                    </div>
                </div>

                {/* Footer Area */}
                <footer className="max-w-4xl mx-auto px-6 lg:px-16 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col gap-2">
                        <span className="font-black text-white tracking-tighter italic">NLFTs Protocol</span>
                        <span className="text-xs text-slate-500 italic">Built for the next generation of decentralized intelligence.</span>
                    </div>
                    <div className="flex gap-8 text-[10px] font-mono uppercase tracking-widest text-slate-500">
                        <span className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                            Network: Active
                        </span>
                        <span>v1.0.4-LTS</span>
                    </div>
                </footer>
            </main>
        </div>
    );
}
