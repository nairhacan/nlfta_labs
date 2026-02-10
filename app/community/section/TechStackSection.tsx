'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as SiIcons from 'react-icons/si';

/* ============================================================
   TYPES & DATA: THE MASSIVE TECH CONSTELLATION WITH ICONS
============================================================ */
type TechIconKey = keyof typeof SiIcons;

interface TechItem {
    name: string;
    icon: TechIconKey;
    color: string;
    pos: string;
    size: 'priority-1' | 'priority-2' | 'medium' | 'small';
    cat: string;
    desc: string;
}

const CORE_TECH: TechItem[] = [
    // PRIORITY 1: CORE GIANTS (The Biggest Orbs)
    { name: 'Next.js', icon: 'SiNextdotjs', color: '#FFFFFF', pos: 'top-[22%] left-[24%]', size: 'priority-1', cat: 'Fullstack', desc: 'The elite React framework for production.' },
    { name: 'Nuxt', icon: 'SiNuxtdotjs', color: '#00DC82', pos: 'top-[12%] right-[32%]', size: 'priority-1', cat: 'Fullstack', desc: 'The intuitive Vue framework.' },
    { name: 'Flutter', icon: 'SiFlutter', color: '#02569B', pos: 'bottom-[20%] left-[45%]', size: 'priority-1', cat: 'Mobile', desc: 'Global multi-platform SDK.' },
    { name: 'Unity', icon: 'SiUnity', color: '#FFFFFF', pos: 'top-[35%] right-[8%]', size: 'priority-1', cat: 'Game Engine', desc: 'Professional real-time 3D platform.' },
    { name: 'React', icon: 'SiReact', color: '#61DAFB', pos: 'top-[5%] left-[10%]', size: 'priority-1', cat: 'Frontend', desc: 'The core for interactive UIs.' },

    // PRIORITY 2: ESSENTIALS (Large)
    { name: 'Unreal Engine', icon: 'SiUnrealengine', color: '#FFFFFF', pos: 'bottom-[35%] right-[15%]', size: 'priority-2', cat: 'Game Engine', desc: 'Advanced 3D creation tool.' },
    { name: 'TypeScript', icon: 'SiTypescript', color: '#3178C6', pos: 'bottom-[10%] left-[15%]', size: 'priority-2', cat: 'Language', desc: 'Static typing for modern JS.' },
    { name: 'Node.js', icon: 'SiNodedotjs', color: '#339933', pos: 'top-[55%] right-[25%]', size: 'priority-2', cat: 'Runtime', desc: 'Scalable network applications.' },
    { name: 'AWS', icon: 'SiAmazonwebservices', color: '#FF9900', pos: 'top-[75%] left-[8%]', size: 'priority-2', cat: 'Cloud', desc: 'Worldleading cloud platform.' },
    { name: 'Docker', icon: 'SiDocker', color: '#2496ED', pos: 'bottom-[2%] left-[58%]', size: 'priority-2', cat: 'Infra', desc: 'Standard for containerization.' },
    { name: 'Rust', icon: 'SiRust', color: '#DEA584', pos: 'top-[6%] right-[5%]', size: 'priority-2', cat: 'Systems', desc: 'Safe, fast, and concurrent code.' },

    // PRIORITY 3: SUPPORTING (Medium)
    { name: 'Vue.js', icon: 'SiVuedotjs', color: '#42b883', pos: 'bottom-[32%] left-[4%]', size: 'medium', cat: 'Frontend', desc: 'The progressive framework.' },
    { name: 'Svelte', icon: 'SiSvelte', color: '#FF3E00', pos: 'top-[45%] left-[15%]', size: 'medium', cat: 'Frontend', desc: 'Cybernetically enhanced web apps.' },
    { name: 'Go', icon: 'SiGo', color: '#00ADD8', pos: 'bottom-[42%] right-[35%]', size: 'medium', cat: 'Backend', desc: 'Simplicity and performance.' },
    { name: 'Blender', icon: 'SiBlender', color: '#E87D0D', pos: 'bottom-[18%] right-[5%]', size: 'medium', cat: '3D Modeler', desc: 'Open-source 3D suite.' },
    { name: 'Kotlin', icon: 'SiKotlin', color: '#7F52FF', pos: 'top-[65%] left-[40%]', size: 'medium', cat: 'Android', desc: 'Modern Android programming.' },
    { name: 'Swift', icon: 'SiSwift', color: '#F05138', pos: 'bottom-[8%] left-[32%]', size: 'medium', cat: 'iOS', desc: 'Fast, interactive apps for Apple.' },
    { name: 'Python', icon: 'SiPython', color: '#3776AB', pos: 'bottom-[25%] right-[28%]', size: 'medium', cat: 'AI/ML', desc: 'General purpose data core.' },
    { name: 'PostgreSQL', icon: 'SiPostgresql', color: '#4169E1', pos: 'bottom-[58%] left-[48%]', size: 'medium', cat: 'Database', desc: 'Extensible data core.' },
    { name: 'Figma', icon: 'SiFigma', color: '#F24E1E', pos: 'top-[42%] left-[55%]', size: 'medium', cat: 'Design', desc: 'Collaborative UI design.' },

    // PRIORITY 4: UTILS (Small)
    { name: 'GraphQL', icon: 'SiGraphql', color: '#E10098', pos: 'top-[65%] left-[20%]', size: 'small', cat: 'API', desc: 'Modern data query language.' },
    { name: 'Tailwind CSS', icon: 'SiTailwindcss', color: '#06B6D4', pos: 'bottom-[48%] left-[28%]', size: 'small', cat: 'Styling', desc: 'Utility-first visuals.' },
    { name: 'Redis', icon: 'SiRedis', color: '#FF4438', pos: 'top-[2%] right-[22%]', size: 'small', cat: 'Cache', desc: 'In-memory performance.' },
    { name: 'Dart', icon: 'SiDart', color: '#00B4AB', pos: 'top-[20%] right-[42%]', size: 'small', cat: 'Language', desc: 'Client-optimized language.' },
    { name: 'Bun', icon: 'SiBun', color: '#fbf0df', pos: 'top-[78%] right-[45%]', size: 'small', cat: 'Runtime', desc: 'All-in-one JS runtime.' },
    { name: 'Vercel', icon: 'SiVercel', color: '#FFFFFF', pos: 'bottom-[3%] right-[32%]', size: 'small', cat: 'Platform', desc: 'Elite frontend deployment.' },
    { name: 'GitHub', icon: 'SiGithub', color: '#FFFFFF', pos: 'bottom-[25%] left-[68%]', size: 'small', cat: 'VCS', desc: 'Global collaboration hub.' },
];

export default function TechStackSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const universeRef = useRef<HTMLDivElement>(null);
    const [activeTech, setActiveTech] = useState<TechItem | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            // 1. Mouse Parallax
            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const xPos = (clientX / window.innerWidth - 0.5) * 100;
                const yPos = (clientY / window.innerHeight - 0.5) * 100;

                gsap.to('.universe-layer-main', { x: xPos, y: yPos, duration: 3, ease: 'power2.out' });
            };

            window.addEventListener('mousemove', handleMouseMove);

            // 2. Entrance
            gsap.fromTo('.tech-atom',
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    stagger: { amount: 1.5, from: "random" },
                    duration: 1.2,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 60%',
                    }
                }
            );

            // 3. Floating
            gsap.to('.tech-atom', {
                y: 'random(-40, 40)',
                x: 'random(-40, 40)',
                duration: 'random(6, 12)',
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

        }, section);

        return () => {
            ctx.revert();
            window.removeEventListener('mousemove', () => { });
        };
    }, [mounted]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[180vh] bg-transparent overflow-hidden py-40 flex flex-col items-center justify-center select-none"
            id="tech-stack"
        >
            <div className="absolute inset-0 z-0">
                {/* BACKGROUND - Removed for seamless bg */}
            </div>

            {/* HEADER */}
            <div className="relative z-30 text-center mb-40 max-w-6xl px-6">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl mb-12 shadow-2xl">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_15px_#3b82f6]" />
                    <span className="text-[11px] font-mono font-black tracking-[0.5em] text-blue-400 uppercase">Engine Matrix v3.0</span>
                </div>
                <h2 className="text-5xl md:text-7xl lg:text-[7.5vw] font-black text-white tracking-widest leading-[0.9] mb-10 drop-shadow-2xl">
                    TECH <br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-rose-500">
                        NLFTs.
                    </span>
                </h2>
                <p className="text-slate-400 text-lg md:text-xl font-medium max-w-4xl mx-auto leading-relaxed opacity-90 tracking-tight italic">
                    Powering the next generation of digital infrastructure with world-class engineering.
                </p>
            </div>

            {/* ICON CONSTELLATION */}
            <div ref={universeRef} className="relative w-full h-[120vh] z-20 overflow-visible">
                <div className="universe-layer-main absolute inset-0">
                    {CORE_TECH.map((tech, i) => {
                        const IconComponent = SiIcons[tech.icon];
                        return (
                            <div
                                key={i}
                                onMouseEnter={() => setActiveTech(tech)}
                                onMouseLeave={() => setActiveTech(null)}
                                className={`tech-atom absolute ${tech.pos} group cursor-pointer perspective-[1000px]`}
                            >
                                {/* Glass Orb Shell */}
                                <div className={`
                    relative flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-3xl transition-all duration-700 
                    group-hover:border-white/40 group-hover:bg-white/15 group-hover:shadow-[0_0_80px_rgba(59,130,246,0.4)] group-hover:-translate-y-8
                    ${tech.size === 'priority-1' ? 'w-32 h-32 md:w-56 md:h-56 ring-2 ring-white/10' :
                                        tech.size === 'priority-2' ? 'w-24 h-24 md:w-44 md:h-44' :
                                            tech.size === 'medium' ? 'w-20 h-20 md:w-32 md:h-32' :
                                                'w-16 h-16'}
                  `}>
                                    {/* The Dynamic Icon */}
                                    {IconComponent && (
                                        <IconComponent
                                            className="transition-all duration-700 group-hover:scale-125 group-hover:rotate-360 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                            style={{ color: activeTech?.name === tech.name ? tech.color : 'rgba(255,255,255,0.4)' }}
                                            size={tech.size === 'priority-1' ? 80 : tech.size === 'priority-2' ? 50 : 35}
                                        />
                                    )}

                                    {/* Sync Ring */}
                                    {(tech.size === 'priority-1' || tech.size === 'priority-2') && (
                                        <svg className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)] -rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 scale-105">
                                            <circle
                                                cx="50%" cy="50%" r="48%"
                                                stroke={tech.color}
                                                strokeWidth="2.5"
                                                fill="transparent"
                                                strokeDasharray="80, 40"
                                                className="animate-[spin_10s_linear_infinite]"
                                            />
                                        </svg>
                                    )}
                                    <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/10 to-transparent pointer-events-none" />
                                </div>

                                {/* Emerald Mastery Dot */}
                                {tech.size === 'priority-1' && (
                                    <div className="absolute top-0 right-1/4 w-3 h-3 bg-emerald-500 rounded-full blur-[6px] animate-pulse" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* THE IMMERSIVE HUD */}
            <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 px-10 py-6 z-50 pointer-events-none transition-all duration-1000 bg-slate-900/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-[0_40px_120px_rgba(0,0,0,0.8)] min-w-[300px] md:min-w-[650px] ${activeTech ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-24 scale-90 blur-xl'}`}>
                {activeTech && (() => {
                    const HudIcon = SiIcons[activeTech.icon];
                    return (
                        <div className="flex items-center gap-12">
                            <div className="relative p-6 rounded-[2rem] bg-white/5 border border-white/10 shadow-2xl transition-all duration-700">
                                {HudIcon && <HudIcon size={60} style={{ color: activeTech.color }} className="drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] animate-pulse" />}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                    <h4 className="text-white font-black text-3xl uppercase tracking-tighter leading-none">{activeTech.name}</h4>
                                    <span className="px-3 py-0.5 rounded-lg bg-blue-500/20 border border-blue-500/30 text-[10px] font-mono font-black text-blue-400 uppercase tracking-widest">{activeTech.cat}</span>
                                </div>
                                <p className="text-slate-400 text-lg font-medium tracking-tight leading-relaxed max-w-xl">{activeTech.desc}</p>
                            </div>

                            <div className="hidden lg:block h-16 w-px bg-white/10 mx-6" />

                            <div className="hidden lg:flex flex-col text-right">
                                <p className="text-[10px] font-mono font-black text-blue-500 uppercase tracking-[0.4em] leading-none mb-4 text-nowrap">Integrity</p>
                                <div className="flex items-center justify-end gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse" />
                                    <p className="text-emerald-400 font-black text-xs tracking-widest uppercase">OK</p>
                                </div>
                            </div>
                        </div>
                    );
                })()}
            </div>

            {/* FOOTER STATS */}
            <div className="relative z-30 mt-56 pt-24 w-full max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-12 opacity-80 hover:opacity-100 transition-opacity duration-1000">
                {[
                    { label: 'Compute Cycle', val: 'Zen-4', desc: 'Kernel processing' },
                    { label: 'Latency Map', val: 'Edge-V', desc: 'Global sub-ms hop' },
                    { label: 'Redundancy', val: 'N+10', desc: 'Fault tolerance' },
                    { label: 'Architecture', val: 'Hyper', desc: 'Ecosystem core' }
                ].map((stat, i) => (
                    <div key={i} className="flex flex-col gap-3 group">
                        <p className="text-[10px] font-mono font-black text-blue-400 uppercase tracking-[0.5em] group-hover:text-blue-300 transition-colors">{stat.label}</p>
                        <p className="text-4xl font-black text-white italic tracking-tighter uppercase group-hover:scale-105 origin-left transition-transform duration-700">{stat.val}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{stat.desc}</p>
                    </div>
                ))}
            </div>

            <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </section>
    );
}
