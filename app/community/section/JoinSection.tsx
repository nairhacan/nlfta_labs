'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ============================================================
   DATA
============================================================ */
const CHANNELS = [
    {
        id: 'whatsapp',
        title: 'WhatsApp Group',
        description: 'Real-time discussions and quick updates for local developer communities.',
        cta: 'Join Group',
        color: 'emerald',
        icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ),
    },
    {
        id: 'discord',
        title: 'Discord Server',
        description: 'The main hub for deep tech support, project showcases, and voice hangouts.',
        cta: 'Connect Now',
        color: 'indigo',
        icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.069.069 0 00-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
        ),
    },
    {
        id: 'github',
        title: 'Open Source',
        description: 'Contribute to our core tools, report issues, and shape the platform roadmap.',
        cta: 'View Repo',
        color: 'slate',
        icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
        ),
    },
];

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
            className="relative min-h-[80vh] bg-slate-950 py-32 px-6 overflow-hidden flex flex-col justify-center border-t border-white/5"
            id='JoinSection'
        >
            {/* Background Ornaments */}
            <div className="join-bg-glow absolute -top-24 -left-24 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="join-bg-glow absolute -bottom-24 -right-24 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

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
                        Whether you want real-time chat, technical support, or to contribute to the future of the web, we have a place for you.
                    </p>
                </div>

                {/* GRID CHANNELS */}
                <div className="join-grid grid md:grid-cols-3 gap-6">
                    {CHANNELS.map((channel) => (
                        <div
                            key={channel.id}
                            className="join-card group relative p-8 md:p-10 rounded-[2.5rem] border border-white/5 bg-white-[0.02] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white-[0.04] ring-1 ring-white/5 overflow-hidden"
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

                            <button className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white group-hover:gap-3 transition-all duration-300">
                                <span>{channel.cta}</span>
                                <svg className="w-4 h-4 translate-y-[0.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>

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
