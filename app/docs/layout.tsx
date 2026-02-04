import type { Metadata } from "next";
import { DocsSidebar, DocsRightSidebar } from "@/app/assets/fragments/DocsUI";

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
        <div className="flex min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30 font-sans overflow-x-hidden">
            {/* Background Decorative Lines - Energetic Look */}
            <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
                <div className="absolute top-0 left-72 w-px h-full bg-linear-to-b from-transparent via-indigo-500 to-transparent"></div>
                <div className="absolute top-1/4 left-0 w-full h-px bg-linear-to-r from-transparent via-indigo-500/30 to-transparent"></div>
                <div className="absolute top-[60%] right-64 w-px h-[400px] bg-linear-to-b from-indigo-500/20 to-transparent lg:block hidden"></div>
            </div>

            {/* Left Navigation */}
            <DocsSidebar />

            {/* Content Area */}
            <main className="flex-1 lg:ml-72 xl:mr-64 min-h-screen relative z-10">
                {/* Glow Aura - Static */}
                <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-500/[0.03] blur-[100px] rounded-full pointer-events-none -z-10"></div>

                <div className="max-w-3xl mx-auto pt-32 pb-24 lg:pt-20 px-8 lg:px-12">
                    {/* Header Decorative Border */}
                    <div className="mb-10 w-24 h-1 bg-linear-to-r from-indigo-600 to-purple-600"></div>

                    {/* No animations here per user request */}
                    <div>
                        {children}
                    </div>

                    {/* Meta Info Lines */}
                    <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between opacity-40">
                        <div className="flex gap-4">
                            <span className="text-[10px] font-mono tracking-widest uppercase">Last Rev: 2026.02.04</span>
                            <span className="text-[10px] font-mono tracking-widest uppercase">Status: Final_Review</span>
                        </div>
                        <div className="w-12 h-px bg-indigo-500/40"></div>
                    </div>
                </div>

                {/* Footer Area */}
                <footer className="max-w-3xl mx-auto px-8 lg:px-12 py-16 border-t-2 border-indigo-500/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
                    {/* Energetic Corner Detail */}
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-linear-to-br from-indigo-500/10 to-transparent rotate-45 translate-x-10 translate-y-10"></div>

                    <div className="flex flex-col gap-3">
                        <span className="font-black text-2xl text-white tracking-tighter italic flex items-center gap-2">
                            NLFTs<span className="text-indigo-500">.</span>CORE
                        </span>
                        <span className="text-xs text-slate-500 max-w-xs font-medium">
                            The standard protocol for next-generation decentralized datasets.
                        </span>
                    </div>

                    <div className="flex flex-col items-end gap-3 text-right">
                        <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-600">
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
                                ACTIVE_NODE
                            </span>
                            <span>VER_1.0.4-LTS</span>
                        </div>
                        <p className="text-[10px] text-slate-700 font-mono">©2026 NLFTs Community. All Rights Reserved.</p>
                    </div>
                </footer>
            </main>

            {/* Right Side Info & Sponsorship */}
            <DocsRightSidebar />
        </div>
    );
}
