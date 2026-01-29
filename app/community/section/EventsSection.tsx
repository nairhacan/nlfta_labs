'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ============================================================
   TYPES & DATA
============================================================ */
type EventCategory = 'all' | 'webinar' | 'workshop' | 'meetup';

interface EventItem {
    id: string;
    title: string;
    category: Exclude<EventCategory, 'all'>;
    date: string; // ISO format for countdown logic
    displayDate: string;
    description: string;
    location: string;
    speaker?: string;
}

const EVENTS: EventItem[] = [
    {
        id: 'ev-1',
        title: 'Edge Runtime Deep Dive',
        category: 'webinar',
        date: '2026-02-15T10:00:00',
        displayDate: 'Feb 15, 2026',
        description: 'Learn how to optimize your middleware and edge functions for sub-50ms latency.',
        location: 'Stream (YouTube Live)',
        speaker: 'Alex Chen'
    },
    {
        id: 'ev-2',
        title: 'Global Infra Workshop',
        category: 'workshop',
        date: '2026-03-02T14:30:00',
        displayDate: 'Mar 02, 2026',
        description: 'Hands-on session building a multi-region deployment strategy from scratch.',
        location: 'Official Discord',
        speaker: 'Sarah Kim'
    },
    {
        id: 'ev-3',
        title: 'SF Developer Meetup',
        category: 'meetup',
        date: '2026-03-20T18:00:00',
        displayDate: 'Mar 20, 2026',
        description: 'Quarterly in-person networking event for the Bay Area developer community.',
        location: 'San Francisco, CA',
    },
    {
        id: 'ev-4',
        title: 'Serverless Patterns 2026',
        category: 'webinar',
        date: '2026-04-05T09:00:00',
        displayDate: 'Apr 05, 2026',
        description: 'Discussing the shift from traditional serverless to stateful edge computing.',
        location: 'Zoom Webinar',
        speaker: 'Mike Jones'
    },
];

/* ============================================================
   HELPER: COUNTDOWN COMPONENT
============================================================ */
function Countdown({ targetDate }: { targetDate: string }) {
    const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

    useEffect(() => {
        const calculate = () => {
            const difference = +new Date(targetDate) - +new Date();
            if (difference > 0) {
                setTimeLeft({
                    d: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    h: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    m: Math.floor((difference / 1000 / 60) % 60),
                    s: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
            }
        };

        calculate();
        const interval = setInterval(calculate, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    if (!timeLeft) return null;

    return (
        <div className="flex gap-3 font-mono text-[10px] font-bold">
            <div className="flex flex-col items-center p-1 rounded bg-white/5 border border-white/5 min-w-[32px]">
                <span className="text-white">{timeLeft.d}</span>
                <span className="text-slate-500 text-[8px] uppercase">d</span>
            </div>
            <div className="flex flex-col items-center p-1 rounded bg-white/5 border border-white/5 min-w-[32px]">
                <span className="text-white">{timeLeft.h}</span>
                <span className="text-slate-500 text-[8px] uppercase">h</span>
            </div>
            <div className="flex flex-col items-center p-1 rounded bg-white/5 border border-white/5 min-w-[32px]">
                <span className="text-white">{timeLeft.m}</span>
                <span className="text-slate-500 text-[8px] uppercase">m</span>
            </div>
        </div>
    );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */
export default function EventsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeFilter, setActiveFilter] = useState<EventCategory>('all');
    const [mounted, setMounted] = useState(false);

    const filteredEvents = useMemo(() => {
        if (activeFilter === 'all') return EVENTS;
        return EVENTS.filter(e => e.category === activeFilter);
    }, [activeFilter]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const timer = setTimeout(() => {
            gsap.registerPlugin(ScrollTrigger);
            const section = sectionRef.current;
            if (!section) return;

            const ctx = gsap.context(() => {
                // Header
                gsap.fromTo('.events-header',
                    { y: 30, opacity: 0 },
                    {
                        scrollTrigger: { trigger: '.events-header', start: 'top 90%' },
                        y: 0, opacity: 1, duration: 0.8
                    }
                );

                // Filter Bar
                gsap.fromTo('.filter-bar',
                    { y: 20, opacity: 0 },
                    {
                        scrollTrigger: { trigger: '.filter-bar', start: 'top 95%' },
                        y: 0, opacity: 1, duration: 0.6, delay: 0.2
                    }
                );

                // Global BG movement
                gsap.to('.events-bg-orb', {
                    x: 'random(-50, 50)',
                    y: 'random(-50, 50)',
                    duration: 8,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });

            }, section);

            return () => ctx.revert();
        }, 100);

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [mounted]);

    // Handle filter animations
    useEffect(() => {
        if (!mounted) return;
        gsap.fromTo('.event-card-wrapper',
            { opacity: 0, scale: 0.95, y: 20 },
            { opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out', clearProps: 'all' }
        );
    }, [activeFilter, mounted]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen bg-slate-950 py-32 px-6 overflow-hidden flex flex-col items-center"
        >
            {/* Background Decorative Elem */}
            <div className="events-bg-orb absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="events-bg-orb absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                {/* HEADER */}
                <div className="events-header mb-16 text-center md:text-left">
                    <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-indigo-500/5 border border-indigo-500/10 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-indigo-400 uppercase">
                            Upcoming Schedule
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Community <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">Events</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
                        Expand your knowledge, meet the architects, and stay ahead with our curated developer sessions.
                    </p>
                </div>

                {/* FILTER BAR */}
                <div className="filter-bar flex flex-wrap gap-2 mb-12 p-1.5 bg-black/30 rounded-2xl w-fit border border-white/5 backdrop-blur-xl mx-auto md:mx-0">
                    {(['all', 'webinar', 'workshop', 'meetup'] as EventCategory[]).map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${activeFilter === cat
                                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                                : 'text-slate-500 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* TIMELINE GRID */}
                <div className="relative grid gap-8">
                    {/* Vertical Line Decoration */}
                    <div className="absolute left-[39px] top-0 bottom-0 w-px bg-white/5 hidden md:block" />

                    {filteredEvents.map((event, idx) => (
                        <div key={event.id} className="event-card-wrapper group relative flex flex-col md:flex-row gap-8 items-start">
                            {/* DATE MARKER */}
                            <div className="relative z-10 w-20 shrink-0 pt-2 hidden md:block">
                                <div className="w-4 h-4 rounded-full border-4 border-slate-950 bg-indigo-500 absolute left-[31px] top-4 shadow-[0_0_0_4px_rgba(99,102,241,0.1)] group-hover:scale-125 transition-transform" />
                                <p className="text-[10px] font-mono font-bold text-slate-500 group-hover:text-indigo-400 text-right pr-2">
                                    {event.displayDate.split(',')[0]}
                                </p>
                            </div>

                            {/* EVENT CARD */}
                            <div className="flex-1 w-full harmonized-card relative p-8 md:p-10 rounded-[2rem] border border-white/5 bg-white-[0.01] backdrop-blur-xl transition-all duration-500 hover:bg-white-[0.03] hover:border-white/10 group-hover:-translate-y-1 ring-1 ring-white/5 overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-indigo-500/5 to-transparent blur-3xl rounded-full" />

                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
                                    <div className="space-y-4 max-w-xl">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-tighter ${event.category === 'webinar' ? 'bg-blue-500/10 text-blue-400' :
                                                event.category === 'workshop' ? 'bg-violet-500/10 text-violet-400' :
                                                    'bg-emerald-500/10 text-emerald-400'
                                                }`}>
                                                {event.category}
                                            </span>
                                            <span className="text-[10px] font-mono text-slate-600 sm:hidden">{event.displayDate}</span>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                                            {event.title}
                                        </h3>
                                        <p className="text-slate-400 text-sm md:text-base leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                                            {event.description}
                                        </p>

                                        <div className="flex flex-wrap gap-6 pt-2">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="text-[11px] font-medium text-slate-500">{event.location}</span>
                                            </div>
                                            {event.speaker && (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 rounded-full bg-slate-800 border border-white/10" />
                                                    <span className="text-[11px] font-medium text-slate-500">{event.speaker}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* COUNTDOWN & CTA */}
                                    <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-t-0 border-white/5 lg:pl-8">
                                        <Countdown targetDate={event.date} />
                                        <button className="w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-white text-white hover:text-black font-bold text-[11px] uppercase tracking-widest rounded-xl transition-all duration-300 border border-white/5">
                                            Register Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* BOTTOM DECORATION */}
                <div className="mt-20 flex justify-center">
                    <p className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-[0.3em]">
                        More sessions coming very soon
                    </p>
                </div>
            </div>
        </section>
    );
}
