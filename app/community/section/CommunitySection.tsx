'use client';

import {
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Conf_Stats from '../config/StatsPanel';
import ACTIVITY from '../config/ActivityPanel';
import Image from 'next/image';
import Link from 'next/link';

/* ============================================================
   TYPES & CONSTANTS
 ============================================================ */
type Tab = 'all' | 'Frontend' | 'Backend' | 'Full Stack';

type Stat = {
  label: string;
  value: number | string;
  change: string;
  trend: 'up' | 'down';
  color: string;
};

const STATS: Stat[] = Conf_Stats as Stat[];

/* ============================================================
   COMPONENT
 ============================================================ */
export default function CommunitySection() {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [mounted, setMounted] = useState(false);

  /* ------------------------------------------------------------
     Sparkline Data (hydration-safe)
  ------------------------------------------------------------ */
  const [sparklines, setSparklines] = useState<number[][]>(() =>
    Array.from({ length: 4 }, () => Array(12).fill(40))
  );

  useEffect(() => {
    setMounted(true);
    setSparklines(
      Array.from({ length: 4 }, () =>
        Array.from({ length: 12 }, () => Math.random() * 50 + 30)
      )
    );
  }, []);

  /* ------------------------------------------------------------
     Filtered Activity
  ------------------------------------------------------------ */
  const filteredActivity = useMemo(() => {
    if (activeTab === 'all') return ACTIVITY;
    return ACTIVITY.filter(item => item.type === activeTab);
  }, [activeTab]);

  /* ============================================================
     GSAP ANIMATIONS (ROUTE-SAFE)
  ============================================================ */
  useEffect(() => {
    if (!mounted) return;

    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Header Entrance
      gsap.fromTo('.section-title-group',
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.section-title-group',
            start: 'top 90%',
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        }
      );

      // 2. Unified Cards Entrance
      const cards = gsap.utils.toArray('.harmonized-card');
      gsap.fromTo(cards,
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.main-grid-container',
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      // 3. Global live pulse
      gsap.to('.live-dot-pulse', {
        scale: 2,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: 'power2.out',
      });
    }, section);

    return () => ctx.revert();
  }, [mounted, pathname]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-transparent py-24 md:py-32 px-4 md:px-8 overflow-hidden"
    >
      {/* Background Decorative Elements - Removed */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="section-title-group mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="live-dot-pulse absolute h-full w-full rounded-full bg-emerald-400" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.1em] text-emerald-400 uppercase">
              Live Network Status
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-500">Pulse</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-base md:text-lg leading-relaxed">
            Real-time platform activity and network performance metrics monitored from across our global edge infrastructure.
          </p>
        </div>

        {/* TOP ROW: STATS */}
        <div className="main-grid-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="harmonized-card relative group rounded-2xl border border-white/5 bg-white/2 p-7 backdrop-blur-xl hover:bg-white/4 transition-all duration-300 ring-1 ring-white/5"
            >
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                    {stat.label}
                  </p>
                  <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-bold ${stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {stat.change}
                  </div>
                </div>

                <div className="mb-8">
                  <span className="text-3xl md:text-4xl font-bold text-white tracking-tighter">
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </span>
                </div>

                {/* Enhanced Sparkline */}
                <div className="flex items-end h-10 gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                  {sparklines[i].map((h, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 rounded-t-sm transition-all duration-700 ease-out ${idx > 8 ? 'bg-indigo-400' : 'bg-slate-700'}`}
                      style={{
                        height: `${h.toFixed(2)}%`,
                        opacity: (0.2 + (idx / 12) * 0.8).toFixed(2)
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM ROW: CHART & ACTIVITY */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT: PERFORMANCE CHART */}
          <div className="lg:col-span-12 xl:col-span-8 flex flex-col">
            <div className="harmonized-card flex-1 min-h-[450px] flex flex-col rounded-2xl border border-white/5 bg-white/2 p-7 backdrop-blur-xl ring-1 ring-white/5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Network Traffic</h3>
                  <p className="text-xs text-slate-500 font-mono">Aggregated data across all regions</p>
                </div>
                <div className="flex gap-4 p-1 rounded-lg bg-black/20 backdrop-blur-sm self-stretch sm:self-auto justify-center">
                  <div className="flex items-center gap-2 px-3 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Inbound</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 border-l border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.5)]" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Outbound</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex items-end justify-between gap-1.5 sm:gap-2.5 pb-2">
                {mounted && [...Array(24)].map((_, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end gap-1.5 h-full group/bar relative">
                    <div
                      className="w-full bg-violet-500/20 rounded-t-lg hover:bg-violet-500/40 transition-all duration-300"
                      style={{ height: `${(30 + Math.sin(i * 0.5) * 20).toFixed(2)}%` }}
                    />
                    <div
                      className="w-full bg-blue-500/40 rounded-t-lg hover:bg-blue-500/60 transition-all duration-300"
                      style={{ height: `${(20 + Math.cos(i * 0.5) * 15).toFixed(2)}%` }}
                    />
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                      <span className="text-[8px] font-mono text-slate-600">{i}:00</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: ACTIVITY FEED */}
          <div className="lg:col-span-12 xl:col-span-4 flex">
            <div className="harmonized-card activity-card-enhanced w-full flex flex-col rounded-2xl border border-white/5 bg-white/2 backdrop-blur-xl overflow-hidden ring-1 ring-white/5">
              <div className="p-7 border-b border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Latest Activity</h3>
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-[10px] font-bold text-blue-400 uppercase tracking-tight">Active</span>
                </div>

                {/* TABS */}
                <div className="flex gap-1 p-1 bg-black/30 rounded-xl">
                  {['all', 'Frontend', 'Backend', 'Full Stack'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as Tab)}
                      className={`flex-1 py-2 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === tab
                        ? 'bg-blue-600/90 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                        : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="activity-container flex-1 overflow-y-auto custom-scrollbar p-3 max-h-[450px]">
                <div className="space-y-2">
                  {filteredActivity.map((item, i) => (
                    <div
                      key={i}
                      className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/4 transition-all duration-200 border border-transparent hover:border-white/5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500/20 to-violet-600/20 border border-white/5 flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-lg group-hover:scale-105 group-hover:from-blue-500/40 transition-all duration-300 overflow-hidden">
                        {item.avatar.startsWith('http') ? (
                          <Image
                            src={item.avatar}
                            alt={item.user}
                            width={40}
                            height={40}
                            className="rounded-xl object-cover"
                            unoptimized
                          />
                        ) : (
                          <span className="text-slate-300 font-mono tracking-tighter uppercase">{item.avatar}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors truncate pr-2">
                            {item.user}
                          </span>
                          <span className="text-[9px] font-mono font-medium text-slate-600 shrink-0">
                            {item.time}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-500 leading-relaxed truncate">
                          <span className="capitalize">{item.action}</span> <span className="text-slate-400 font-medium">{item.target}</span>
                        </p>
                      </div>

                      <div className="shrink-0">
                        <div className={`w-1.5 h-1.5 rounded-full ${item.type.toLowerCase().includes('frontend') ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]' : 'bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.5)]'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-black/10 ">
                <Link href="/teams" className="w-full block text-center py-3.5 text-[10px] font-bold text-slate-400 hover:text-white transition-all duration-300 font-mono uppercase tracking-[0.2em] bg-white/5 hover:bg-white/10 rounded-xl border border-white/5">
                  View All Teams
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
}
