'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    // GSAP only for small detail animations
    const ctx = gsap.context(() => {
      // Animate chart bars
      gsap.to('.chart-bar', {
        scaleY: (i) => gsap.utils.random(0.4, 1),
        duration: 2,
        stagger: 0.1,
        repeat: -1,
        repeatDelay: 1,
        ease: 'power1.inOut',
      });

      // Animate network nodes
      gsap.to('.network-node', {
        scale: (i) => gsap.utils.random(0.8, 1.2),
        duration: 2,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Animate grid cells
      gsap.to('.grid-cell', {
        opacity: (i) => gsap.utils.random(0.2, 0.8),
        duration: 1.5,
        stagger: {
          amount: 2,
          from: 'random',
        },
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Terminal cursor blink
      gsap.to('.terminal-cursor', {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [mounted]);

  const features = [
    {
      size: 'large',
      tag: 'Community',
      title: 'Open Collaboration',
      description:
        'Ruang terbuka untuk berdiskusi, membangun proyek bersama, dan saling review karya antar member. Kolaborasi tanpa batas dengan tools modern.',
      metrics: ['Weekly Sessions', 'Open Repositories', 'Code Reviews', 'Live Discussion'],
      visual: 'network',
      stats: { value: '150+', label: 'Active Members' },
    },
    {
      size: 'medium',
      tag: 'Activity',
      title: 'Build Sessions',
      description:
        'Sesi rutin untuk ngoding bareng, eksplor ide, dan menyelesaikan problem nyata dengan pendekatan hands-on dan praktis.',
      metrics: ['Live Coding', 'Pair Programming', 'Real Projects'],
      visual: 'terminal',
      stats: { value: '3x', label: 'Per Week' },
    },
    {
      size: 'medium',
      tag: 'Growth',
      title: 'Knowledge Sharing',
      description:
        'Berbagi insight, pengalaman, dan pembelajaran dari project & eksperimen member. Platform untuk dokumentasi dan pembelajaran kolektif.',
      metrics: ['Tech Talks', 'Documentation', 'Best Practices'],
      visual: 'chart',
      stats: { value: '50+', label: 'Resources' },
    },
    {
      size: 'small',
      tag: 'Support',
      title: 'Peer Help',
      description:
        'Saling bantu debugging, code review, dan problem solving tanpa ego. Komunitas yang supportive untuk semua level.',
      visual: 'chat',
      stats: { value: '24/7', label: 'Support' },
    },
    {
      size: 'small',
      tag: 'People',
      title: 'Active Members',
      description:
        'Komunitas yang aktif, terbuka, dan terus bertambah setiap minggunya. Networking dengan developer dari berbagai background.',
      visual: 'users',
      stats: { value: '85%', label: 'Active Rate' },
    },
    {
      size: 'large',
      tag: 'Ecosystem',
      title: 'Project Playground',
      description:
        'Tempat eksperimen ide, kolaborasi lintas skill, dan membangun produk nyata bersama. Dari MVP hingga production-ready applications.',
      metrics: ['Open Source', 'Shared Stack', 'CI/CD Ready', 'Cloud Deploy'],
      visual: 'grid',
      stats: { value: '30+', label: 'Live Projects' },
    },
  ];

  const communityStats = [
    { value: '150+', label: 'Active Members', icon: '👥' },
    { value: '50+', label: 'Projects Built', icon: '🚀' },
    { value: '100+', label: 'Weekly Sessions', icon: '💻' },
    { value: '24/7', label: 'Community Support', icon: '🛟' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0b1220] py-20 md:py-32 px-4 md:px-6 overflow-hidden"

    >
      {/* Dark Background with subtle gradients */}
      <div className="absolute inset-0 bg-gradient-to-b bg-gradient-to-b from-[#0b1220] via-[#0e1a33] to-[#050814]" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
                            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Gradient blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with CSS animations */}
        <div className="text-center mb-16 md:mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-6 animate-slide-down">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-xs text-blue-300 font-mono uppercase tracking-wider">
              Community Platform
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight px-4 animate-slide-up animation-delay-100">
            Dibangun untuk Skala Besar
          </h2>
          
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto px-4 mb-12 animate-fade-in animation-delay-200">
            Semua yang kamu butuhkan untuk membangun, berkolaborasi, dan berkembang bersama dalam satu ekosistem terintegrasi
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-8">
            {communityStats.map((stat, index) => (
              <div
                key={index}
                className="group relative p-4 md:p-6 rounded-lg border border-gray-800 bg-gradient-to-br from-gray-900/50 to-transparent backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="text-3xl md:text-4xl mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bento Grid with CSS animations */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[220px] md:auto-rows-[280px]"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 animate-fade-in-up
                ${feature.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
                ${feature.size === 'medium' ? 'md:col-span-2' : ''}
                ${feature.size === 'small' ? 'md:col-span-1' : ''}
              `}
              style={{ animationDelay: `${700 + index * 80}ms` }}
            >
              {/* Hover border */}
              <div className="absolute inset-0 rounded-xl border-2 border-blue-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Content */}
              <div className="relative h-full p-6 md:p-8 flex flex-col">
                <div className="flex-1">
                  {/* Tag */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                    <div className="w-1 h-1 bg-blue-400 rounded-full" />
                    <span className="text-xs text-blue-400 font-mono uppercase tracking-wider">
                      {feature.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Stats Badge */}
                  {feature.stats && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800 mb-4">
                      <span className="text-lg font-bold text-blue-400">{feature.stats.value}</span>
                      <span className="text-xs text-gray-500">{feature.stats.label}</span>
                    </div>
                  )}

                  {/* Metrics */}
                  {feature.metrics && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {feature.metrics.map((metric, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-md bg-gray-900/80 border border-gray-800 text-xs text-gray-400 font-mono hover:border-blue-500/30 hover:text-blue-400 transition-all duration-300"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Visual Element */}
                <div className="mt-auto group-hover:scale-105 transition-transform duration-400">
                  {feature.visual === 'network' && (
                    <div className="relative h-24 md:h-32 flex items-center justify-center">
                      {/* Network nodes */}
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="network-node absolute w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
                          style={{
                            left: `${15 + (i % 3) * 35}%`,
                            top: `${i < 3 ? 20 : 60}%`,
                          }}
                        />
                      ))}
                      {/* Connection lines */}
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
                          style={{
                            left: `${15 + (i % 3) * 35}%`,
                            right: `${50 - (i % 2) * 35}%`,
                            top: `${35 + (i % 2) * 10}%`,
                            transform: `rotate(${i * 15}deg)`,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {feature.visual === 'chart' && (
                    <div className="relative">
                      <div className="flex items-end gap-2 h-20 md:h-28">
                        {[55, 75, 45, 85, 60, 80, 50, 90, 65, 70].map((height, i) => (
                          <div
                            key={i}
                            className="chart-bar flex-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-sm origin-bottom shadow-lg shadow-blue-500/20"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
                        <span>Jan</span>
                        <span>Dec</span>
                      </div>
                    </div>
                  )}

                  {feature.visual === 'terminal' && (
                    <div className="bg-black/60 rounded-lg border border-gray-800 p-4 shadow-xl">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        <span className="ml-2 text-xs text-gray-600">terminal</span>
                      </div>
                      <div className="font-mono text-sm space-y-2">
                        <div className="text-gray-500">
                          <span className="text-green-400">$</span> nexus build --production
                        </div>
                        <div className="text-blue-400">✓ Building application...</div>
                        <div className="text-cyan-400">✓ Optimizing bundles...</div>
                        <div className="flex items-center text-green-400">
                          <span>✓ Build completed</span>
                          <span className="terminal-cursor ml-1 inline-block w-2 h-4 bg-green-400" />
                        </div>
                      </div>
                    </div>
                  )}

                  {feature.visual === 'chat' && (
                    <div className="space-y-2">
                      {[
                        { side: 'left', text: 'Butuh bantuan fix bug di auth?', width: '75%' },
                        { side: 'right', text: 'Sure, share code-nya', width: '60%' },
                        { side: 'left', text: 'Thanks! Solved 🎉', width: '50%' },
                      ].map((msg, i) => (
                        <div
                          key={i}
                          className={`flex ${msg.side === 'right' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`px-4 py-2 rounded-lg text-xs ${
                              msg.side === 'right'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                : 'bg-gray-800 text-gray-400 border border-gray-700'
                            }`}
                            style={{ width: msg.width }}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {feature.visual === 'users' && (
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-[#0a0a0a] shadow-lg"
                            style={{
                              background: `linear-gradient(135deg, hsl(${200 + i * 30}, 70%, 50%), hsl(${180 + i * 30}, 70%, 60%))`,
                            }}
                          />
                        ))}
                      </div>
                      <div className="text-sm">
                        <div className="text-white font-semibold">+145 more</div>
                        <div className="text-gray-500 text-xs">Active this week</div>
                      </div>
                    </div>
                  )}

                  {feature.visual === 'grid' && (
                    <div className="grid grid-cols-8 gap-1.5">
                      {[...Array(32)].map((_, i) => (
                        <div
                          key={i}
                          className="grid-cell aspect-square rounded bg-blue-500/20 border border-blue-500/30 shadow-sm shadow-blue-500/10"
                          style={{ opacity: Math.random() * 0.6 + 0.2 }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-20 text-center space-y-6 animate-fade-in animation-delay-1400">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50">
              <span>Explore All Features</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
            <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-800 hover:border-blue-500/50 bg-gray-900/50 text-gray-300 hover:text-white font-medium transition-all duration-300">
              <span>Join Community</span>
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Bergabung dengan <span className="text-blue-400 font-semibold">150+ developers</span> yang sudah aktif membangun bersama
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slide-down {
          animation: slideDown 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-100 {
          animation-delay: 100ms;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-1400 {
          animation-delay: 1400ms;
        }
      `}</style>
    </section>
  );
}