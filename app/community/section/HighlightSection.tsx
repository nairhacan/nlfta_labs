'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TESTIMONIALS from '../config/TestimonailasPanel';
import Link from 'next/link';

/* ============================================================
   DATA
============================================================ */


/* ============================================================
   COMPONENT
============================================================ */
export default function HighlightSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const timer = setTimeout(() => {
            gsap.registerPlugin(ScrollTrigger);
            const section = sectionRef.current;
            const slider = sliderRef.current;
            if (!section || !slider) return;

            const ctx = gsap.context(() => {
                // 1. Header Entrance
                gsap.fromTo('.highlight-header',
                    { y: 60, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: '.highlight-header',
                            start: 'top 85%',
                        },
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: 'power4.out',
                    }
                );

                // 2. Parallax Effect on Background
                gsap.to('.highlight-bg-glow', {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                    },
                    y: 100,
                    scale: 1.2,
                });

                // 3. Carousel Logic (Infinite Loop)
                const carouselWidth = slider.scrollWidth / 2;
                const tl = gsap.to(slider, {
                    x: -carouselWidth,
                    duration: 40,
                    repeat: -1,
                    ease: 'none',
                    paused: false,
                });

                // Pause on Hover
                slider.addEventListener('mouseenter', () => tl.pause());
                slider.addEventListener('mouseleave', () => tl.play());

                // 4. Parallax Quotes
                gsap.utils.toArray('.highlight-card').forEach((card: any) => {
                    gsap.to(card.querySelector('.parallax-icon'), {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                        y: -40,
                        rotate: 15,
                    });
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
            className="relative min-h-[90vh] bg-slate-950 py-32 overflow-hidden flex flex-col justify-center"
        >
            {/* Background Parallax Patterns */}
            <div className="highlight-bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 mb-20 text-center">
                <div className="highlight-header">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 mb-6">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-violet-400 uppercase">
                            Member Highlights
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Loved by the <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-violet-500 italic">Best Architects</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Join thousands of developers building the next generation of global infrastructure.
                    </p>
                </div>
            </div>

            {/* INFINITE CAROUSEL CONTAINER */}
            <div className="relative w-full overflow-hidden select-none">
                {/* Shadow Overlays for fade effect */}
                <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-slate-950 to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-slate-950 to-transparent z-20 pointer-events-none" />

                <div
                    ref={sliderRef}
                    className="flex gap-6 w-max px-6"
                >
                    {/* Double the cards for seamless loop */}
                    {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                        <div
                            key={i}
                            className="highlight-card group relative w-[350px] md:w-[450px] p-8 md:p-10 rounded-3xl border border-white/5 bg-white/2 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/30 hover:bg-white/5 ring-1 ring-white/5"
                        >
                            <div className="parallax-icon absolute top-8 right-8 opacity-10 group-hover:opacity-30 transition-opacity">
                                <svg className="w-12 h-12 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14H17.017C15.3601 14 14.017 12.6569 14.017 11V8H20.017V14H22.017V21H14.017ZM2.01697 21L2.01697 18C2.01697 16.8954 2.91241 16 4.01697 16H7.01697V14H5.01697C3.36012 14 2.01697 12.6569 2.01697 11V8H8.01697V14H10.017V21H2.01697Z" />
                                </svg>
                            </div>

                            <blockquote className="relative z-10 mb-8">
                                <p className="text-lg md:text-xl text-slate-100 font-medium leading-relaxed italic">
                                    "{t.quote}"
                                </p>
                            </blockquote>

                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-violet-500/50 transition-colors shadow-xl">
                                    <Image
                                        src={t.image}
                                        alt={t.name}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                                        {t.name}
                                    </h4>
                                    <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                                        {t.role} @ <span className="text-slate-300">{t.company}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Card Glow Effect */}
                            <div className="absolute -inset-px rounded-3xl bg-linear-to-br from-blue-500/20 via-transparent to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>

            {/* BOTTOM CTA (Parallax floating) */}
            <div className="mt-20 text-center">
                <Link
                    href="#JoinSection"
                    className="group relative inline-block px-10 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-transform active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                >
                    <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                        Start Growing with Us
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </Link>
            </div>
        </section>
    );
}
