import type { Metadata } from "next";
import { DocsSidebar, DocsRightSidebar, DocsParentTabs } from "@/app/assets/fragments/DocsUI";
import { DocsLayoutWrapper } from "./components/DocsLayoutWrapper";

export const metadata: Metadata = {
    title: {
        template: "%s | NLFTs Docs",
        default: "Documentation | NLFTs Protocol",
    },
    description: "Panduan resmi untuk Protokol NLFTs. Dibuat oleh para insinyur, untuk para insinyur",
};

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://nlfts.dev',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Documentation',
                item: 'https://nlfts.dev/docs',
            },
        ],
    };

    return (
        <DocsLayoutWrapper>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <div className="flex min-h-screen text-slate-200 selection:bg-indigo-500/30 font-sans overflow-x-hidden antialiased">
                {/* Left Navigation */}
                <DocsSidebar />

                {/* Main Content Area */}
                <main className="flex-1 lg:ml-72 xl:mr-64 min-h-screen relative z-10 pt-16">
                    {/* Sticky Parent Tabs slightly below global navbar for breathing room */}
                    <div className="sticky top-[4.5rem] z-30 border-b border-slate-900/60 bg-slate-950/85 backdrop-blur-md">
                        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-1.5">
                            <DocsParentTabs />
                        </div>
                    </div>

                    {/* Top Gradient Glow */}
                    <div className="absolute top-[5.75rem] left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>

                    <div className="max-w-3xl mx-auto pt-8 md:pt-10 pb-32 px-6 sm:px-8 lg:px-12">
                        {/* Header Accent */}
                        <div className="mb-12 flex items-center gap-3">
                            <div className="h-1 w-16 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 rounded-full"></div>
                            <div className="h-px flex-1 bg-gradient-to-r from-purple-600/20 to-transparent"></div>
                        </div>

                        {/* Content with Enhanced Typography */}
                        <article className="prose-docs">
                            {children}
                        </article>

                        {/* Separator */}
                        <div className="mt-24 mb-10 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>

                        {/* Document Meta Information */}
                        <div className="flex flex-wrap gap-6 items-center justify-between text-slate-600 py-8">
                            <div className="flex flex-wrap gap-4 items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-indigo-500/50"></div>
                                    <span className="text-[10px] font-mono tracking-wider uppercase">Last Updated</span>
                                    <span className="text-xs font-semibold text-slate-500">Feb 07, 2026</span>
                                </div>
                                <div className="w-px h-3 bg-slate-800"></div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-green-500/50"></div>
                                    <span className="text-[10px] font-mono tracking-wider uppercase">Status</span>
                                    <span className="text-xs font-semibold text-green-500/70">Final Review</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider uppercase">
                                <span className="text-slate-700">v1.0.4-LTS</span>
                            </div>
                        </div>

                        {/* Navigation Footer */}
                        <div className="mt-8 pt-8 border-t border-slate-800/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    <span>Punya pertanyaan?</span>
                                    <a href="https://github.com/nlfts/discussions" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 decoration-indigo-400/30">
                                        Tanya di GitHub Discussions
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Section */}
                    <footer className="border-t border-slate-900/50 bg-slate-950/50 backdrop-blur-sm relative overflow-hidden">
                        {/* Footer Background Pattern */}
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                            <div className="absolute inset-0"
                                style={{
                                    backgroundImage: `repeating-linear-gradient(
                                         45deg,
                                         transparent,
                                         transparent 20px,
                                         rgb(99 102 241 / 0.1) 20px,
                                         rgb(99 102 241 / 0.1) 21px
                                     )`
                                }}>
                            </div>
                        </div>

                        {/* Footer Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>

                        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-16 relative z-10">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                                {/* Brand Section */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="font-black text-3xl text-white tracking-tighter">
                                            NLFTs
                                        </span>
                                        <span className="text-3xl text-indigo-500 font-black">.</span>
                                        <span className="font-bold text-xl text-slate-400 tracking-tight uppercase">
                                            CORE
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                                        The next-generation protocol for decentralized datasets.
                                        <br />
                                        <span className="text-xs text-slate-600">Built by engineers, for engineers.</span>
                                    </p>
                                </div>

                                {/* Status & Version Info */}
                                <div className="flex flex-col items-start md:items-end gap-4">
                                    <div className="flex flex-wrap gap-4 items-center text-[10px] font-bold uppercase tracking-widest">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/5 border border-green-500/10">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
                                            </span>
                                            <span className="text-green-500">Active Node</span>
                                        </div>
                                        <div className="px-3 py-1.5 rounded-full bg-indigo-500/5 border border-indigo-500/10">
                                            <span className="text-indigo-400">v1.0.4-LTS</span>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-slate-700 font-mono tracking-wide">
                                        © 2026 NLFTs Community · All Rights Reserved
                                    </p>
                                </div>
                            </div>

                            {/* Footer Bottom Accent */}
                            <div className="mt-12 pt-8 border-t border-slate-900/50 flex justify-center">
                                <div className="flex items-center gap-2 opacity-30">
                                    <div className="w-1 h-1 rounded-full bg-indigo-500"></div>
                                    <div className="w-12 h-px bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                                    <div className="w-1 h-1 rounded-full bg-purple-500"></div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </main>

                {/* Right Sidebar */}
                <DocsRightSidebar />
            </div>
        </DocsLayoutWrapper>
    );
}