'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import CHANNELS from '../config/ChanelPanel';


/* ============================================================
   DATA
============================================================ */


/* ============================================================
   COMPONENT
============================================================ */
export default function JoinSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // GSAP Initialization with delay for stable route transitions
        const timer = setTimeout(() => {
            gsap.registerPlugin(ScrollTrigger);
            const section = sectionRef.current;
            if (!section) return;

            const ctx = gsap.context(() => {
                // 1. Entrance Title
                gsap.fromTo('.join-header',
                    { y: 40, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: '.join-header',
                            start: 'top 90%',
                        },
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: 'power3.out',
                    }
                );

                // 2. Stagger Cards
                gsap.fromTo('.join-card',
                    { y: 60, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: '.join-grid',
                            start: 'top 85%',
                        },
                        y: 0,
                        opacity: 1,
                        stagger: 0.15,
                        duration: 1,
                        ease: 'power4.out',
                        clearProps: 'transform'
                    }
                );

                // 3. Floating Glow Movement
                gsap.to('.join-bg-glow', {
                    y: 100,
                    x: 50,
                    duration: 10,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                });

                // 🧹 Logic Refresh
                ScrollTrigger.refresh();
            }, section);

            return () => ctx.revert();
        }, 150);

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [mounted]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[80vh] bg-transparent py-32 px-6 overflow-hidden flex flex-col justify-center"
            id='JoinSection'
        >
            {/* Background Ornaments */}
            {/* Background Ornaments - Removed for seamless bg */}

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                {/* HEADER */}
                <div className="join-header mb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 mb-6 backdrop-blur-sm">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-blue-400 uppercase">
                            Join the Ecosystem
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Connect with <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-violet-500">Global Developers</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Baik Anda menginginkan obrolan waktu nyata, dukungan teknis, atau ingin berkontribusi pada masa depan web, kami memiliki tempat untuk Anda.
                    </p>
                </div>

                {/* GRID CHANNELS */}
                <div className="join-grid grid md:grid-cols-3 gap-6">
                    {CHANNELS.map((channel: any) => (
                        <div
                            key={channel.id}
                            className="join-card group relative p-8 md:p-10 rounded-[2.5rem] border border-white/5 bg-white/2 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/4 ring-1 ring-white/5 overflow-hidden"
                        >
                            {/* Animated Border/Glow on card bottom */}
                            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${channel.color === 'emerald' ? 'from-emerald-500 to-teal-400' :
                                channel.color === 'indigo' ? 'from-indigo-500 to-blue-400' :
                                    'from-slate-400 to-white'
                                } opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)]`} />

                            {/* Icon Container */}
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 ${channel.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                channel.color === 'indigo' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                    'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                } border`}>
                                {channel.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                                {channel.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-10 min-h-[60px]">
                                {channel.description}
                            </p>

                            <Link
                                href={channel.link || '#'}
                                target="_blank"
                                className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white group-hover:gap-3 transition-all duration-300"
                            >
                                <span>{channel.cta}</span>
                                <svg className="w-4 h-4 translate-y-[0.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>

                            {/* Inner ambient glow */}
                            <div className={`absolute -right-8 -bottom-8 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity rounded-full ${channel.color === 'emerald' ? 'bg-emerald-500' :
                                channel.color === 'indigo' ? 'bg-indigo-500' :
                                    'bg-white'
                                }`} />
                        </div>
                    ))}
                </div>

                {/* STATS SUMMARY (Optional but adds credibility) */}
                <div className="mt-20 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-12 md:gap-24 opacity-60">
                    <div className="text-center">
                        <p className="text-white font-bold text-2xl mb-1">50k+</p>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Global Members</p>
                    </div>
                    <div className="text-center">
                        <p className="text-white font-bold text-2xl mb-1">2.4k</p>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Open Source OS</p>
                    </div>
                    <div className="text-center">
                        <p className="text-white font-bold text-2xl mb-1">100%</p>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Free Forever</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
