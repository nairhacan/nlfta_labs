'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ACTIVITY from '../community/config/ActivityPanel';

export default function TeamsPage() {
    return (
        <main className="min-h-screen bg-[#020617] text-white py-24 px-4 md:px-8 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-16 text-center">
                    <Link
                        href="/community"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400 hover:text-white transition-all mb-8"
                    >
                        ← Back to Community
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
                        Our <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-violet-500">Teams</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        The talented individuals driving innovation and building the future of our network infrastructure.
                    </p>
                </div>

                {/* Teams Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ACTIVITY.map((member, idx) => (
                        <div
                            key={idx}
                            className="group relative rounded-3xl border border-white/5 bg-white/2 p-1 backdrop-blur-xl transition-all duration-500 hover:border-white/10 hover:bg-white/5"
                        >
                            <div className="relative overflow-hidden rounded-[22px] bg-slate-900/50 p-6 h-full flex flex-col">
                                {/* Profile Section */}
                                <div className="flex items-start gap-5 mb-6">
                                    <div className="relative">
                                        <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-blue-500 to-violet-600 p-[1px]">
                                            <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-950">
                                                {member.avatar.startsWith('http') ? (
                                                    <Image
                                                        src={member.avatar}
                                                        alt={member.user}
                                                        width={80}
                                                        height={80}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white/20">
                                                        {member.avatar}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {/* Status Dot */}
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0 pt-1">
                                        <h3 className="text-xl font-bold truncate group-hover:text-blue-400 transition-colors">
                                            {member.user}
                                        </h3>
                                        <p className="text-sm text-slate-400 font-mono mb-1 truncate">
                                            {member.action.replace('|', '').trim()}
                                        </p>
                                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
                                            <span className="w-1 h-1 rounded-full bg-indigo-400" />
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{member.target}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Info Section */}
                                <div className="mt-auto space-y-4">
                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/10">
                                            {member.type}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-white/5 text-slate-500 text-[10px] font-bold uppercase tracking-wider border border-white/10">
                                            Active {member.time}
                                        </span>
                                    </div>

                                    {/* Links */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <Link
                                            href={member.github || '#'}
                                            target="_blank"
                                            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800/50 border border-white/5 text-[11px] font-bold hover:bg-white hover:text-black transition-all duration-300"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                            Github
                                        </Link>
                                        {member.website ? (
                                            <Link
                                                href={member.website}
                                                target="_blank"
                                                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-bold hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all duration-300"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" /></svg>
                                                Website
                                            </Link>
                                        ) : (
                                            <div className="flex items-center justify-center py-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] font-bold text-slate-600 cursor-not-allowed">
                                                Postfolio N/A
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Hover Decoration */}
                            <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity blur-xl -z-10" />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
        </main>
    );
}
