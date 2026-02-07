"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface DocsNavbarProps {
    onSearchClick: () => void;
}

export function DocsNavbar({ onSearchClick }: DocsNavbarProps) {
    const pathname = usePathname();


    return (
        <header className="fixed top-0 right-0 h-16 bg-slate-950/90 backdrop-blur-xl border-b border-slate-900/50 z-[90] left-0 lg:left-72 transition-all duration-300">
            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>

            <div className="h-full flex items-center justify-between px-6 xl:pr-64 relative">
                {/* Left Section - Mobile Logo */}
                <div className="flex items-center gap-6 lg:hidden">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center font-black italic text-sm shadow-[0_0_12px_rgba(79,70,229,0.3)] group-hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transition-shadow">
                            N
                        </div>
                        <span className="font-black text-lg tracking-tighter text-white italic">
                            NLFTs
                        </span>
                    </Link>
                </div>

                {/* Center - Search Bar */}
                <div className="hidden sm:flex flex-1 max-w-xl mx-auto lg:mx-0 lg:ml-8">
                    <button
                        onClick={onSearchClick}
                        className="w-full flex items-center gap-3 px-4 py-2.5 bg-slate-900/50 hover:bg-slate-800/60 border border-slate-800/50 hover:border-indigo-500/30 rounded-lg text-left transition-all group relative overflow-hidden"
                    >
                        {/* Subtle hover glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <svg
                            className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors relative z-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>

                        <span className="flex-1 text-sm text-slate-500 group-hover:text-slate-300 transition-colors relative z-10">
                            Search documentation...
                        </span>

                        <kbd className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono font-bold text-slate-500 bg-slate-800/80 border border-slate-700/50 rounded shadow-sm relative z-10">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </button>
                </div>

                {/* Right Section - Nav Links & Actions */}
                <div className="flex items-center gap-2">
                    {/* Mobile Search Button */}
                    <button
                        onClick={onSearchClick}
                        className="sm:hidden p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
                        aria-label="Search"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>

                    {/* Divider */}
                    <div className="hidden md:block w-px h-6 bg-slate-800/50 mx-2" />

                    {/* GitHub Link */}
                    <a
                        href="https://github.com/nlfts"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all group relative"
                        title="View on GitHub"
                    >
                        <svg
                            className="w-5 h-5 relative z-10"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                            />
                        </svg>
                        {/* Hover effect */}
                        <span className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/10 rounded-lg transition-colors"></span>
                    </a>

                    {/* Theme Toggle */}
                    <button
                        className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all group relative"
                        title="Toggle theme (coming soon)"
                    >
                        <svg
                            className="w-5 h-5 relative z-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                        </svg>
                        {/* Hover effect */}
                        <span className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 rounded-lg transition-colors"></span>
                    </button>
                </div>
            </div>

            {/* Bottom Progress/Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
        </header>
    );
}