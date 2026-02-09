'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ACTIVITY from '../community/config/ActivityPanel';

export default function TeamsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // 3 columns * 4 rows or similar, much more spacious

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMembers = ACTIVITY.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(ACTIVITY.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <main className="min-h-screen bg-slate-950 text-white py-24 px-4 md:px-8 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-20 text-center">
                    <Link
                        href="/community"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400 hover:text-white transition-all mb-8"
                    >
                        ← Back to Community
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
                        Our <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">Teams</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Meet the brilliant minds behind the NLFTs ecosystem. A global team of innovators, engineers, and creatives.
                    </p>
                </div>

                {/* Teams Grid - 3 Columns for maximum clarity and presence */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {currentMembers.map((member, idx) => (
                        <div
                            key={idx}
                            className="group relative flex flex-col h-full"
                        >
                            {/* Card Background Bloom */}
                            <div className="absolute -inset-2 bg-linear-to-r from-indigo-500/20 to-purple-500/20 rounded-[40px] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />

                            <div className="relative flex flex-col h-full rounded-[32px] border border-white/10 bg-slate-900/40 backdrop-blur-2xl p-8 overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:translate-y-[-8px]">
                                {/* Profile Head */}
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="relative shrink-0">
                                        <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-2xl">
                                            <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-950">
                                                {member.avatar.startsWith('http') ? (
                                                    <Image
                                                        src={member.avatar}
                                                        alt={member.user}
                                                        width={80}
                                                        height={80}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white/20 lowercase">
                                                        {member.avatar}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {/* Status indicator */}
                                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center border-2 border-slate-950">
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                                        </div>
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="text-2xl font-bold text-white truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                                            {member.user}
                                        </h3>
                                        <p className="text-sm text-indigo-400/80 font-mono font-medium truncate uppercase tracking-wider">
                                            {member.action.replace('|', '').trim()}
                                        </p>
                                    </div>
                                </div>

                                {/* Details Section */}
                                <div className="space-y-6 flex-grow">
                                    <div className="flex flex-wrap gap-2">
                                        <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{member.type}</span>
                                        </div>
                                        <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{member.target}</span>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 italic text-sm text-slate-500 leading-relaxed">
                                        "Dedicated to pushing the boundaries of web protocol and decentralized systems."
                                    </div>
                                </div>

                                {/* Activity Timestamp */}
                                <div className="mt-8 flex items-center gap-2 text-[10px] text-slate-600 font-mono uppercase tracking-[0.2em] mb-6">
                                    <span className="w-8 h-px bg-white/10" />
                                    <span>Last Active {member.time}</span>
                                </div>

                                {/* Links Section */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Link
                                        href={member.github || '#'}
                                        target="_blank"
                                        className="flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-slate-800/50 border border-white/5 text-xs font-bold text-white hover:bg-white hover:text-black hover:border-white transition-all duration-500 shadow-lg"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                        GitHub
                                    </Link>
                                    {member.website ? (
                                        <Link
                                            href={member.website}
                                            target="_blank"
                                            className="flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 hover:shadow-[0_10px_30px_rgba(79,70,229,0.3)] transition-all duration-500"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" /></svg>
                                            Site
                                        </Link>
                                    ) : (
                                        <div className="flex items-center justify-center py-3.5 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-bold text-slate-600 cursor-not-allowed uppercase tracking-widest">
                                            Q.E.D
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Section */}
                {totalPages > 1 && (
                    <div className="mt-24 flex flex-col items-center gap-6">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`group flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 border ${currentPage === 1
                                    ? 'bg-white/5 border-white/5 text-slate-700 cursor-not-allowed'
                                    : 'bg-slate-900 border-white/10 text-white hover:border-indigo-500 group-hover:text-indigo-400'
                                    }`}
                            >
                                <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </button>

                            <div className="flex gap-3">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`w-14 h-14 rounded-2xl text-sm font-bold transition-all duration-500 border ${currentPage === number
                                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_15px_30px_rgba(79,70,229,0.3)]'
                                            : 'bg-slate-900/50 border-white/5 text-slate-400 hover:border-white/30 hover:text-white'
                                            }`}
                                    >
                                        {number}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`group flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 border ${currentPage === totalPages
                                    ? 'bg-white/5 border-white/5 text-slate-700 cursor-not-allowed'
                                    : 'bg-slate-900 border-white/10 text-white hover:border-indigo-500 group-hover:text-indigo-400'
                                    }`}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                        <p className="text-xs text-slate-600 font-mono uppercase tracking-[0.3em]">
                            Page {currentPage} of {totalPages}
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
