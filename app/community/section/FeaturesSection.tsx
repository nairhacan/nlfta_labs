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

    // Clear previous GSAP states
    gsap.set('.feature-card', { clearProps: 'all' });
    gsap.set('.section-badge', { clearProps: 'all' });
    gsap.set('.section-title', { clearProps: 'all' });

    // Main timeline for entrance
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'top 30%',
        toggleActions: 'play none none none',
      },
    });

    mainTl
      .from('.section-badge', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      })
      .from(
        '.section-title',
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.3'
      )
      .from(
        '.feature-card',
        {
          opacity: 0,
          y: 40,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4'
      );

    // Simple hover effect with GSAP
    const cards = grid.querySelectorAll('.feature-card');
    const hoverHandlers: Array<{
      enter: () => void;
      leave: () => void;
    }> = [];

    cards.forEach((card) => {
      const element = card as HTMLElement;
      const border = element.querySelector('.hover-border') as HTMLElement;

      const handleEnter = () => {
        gsap.to(border, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleLeave = () => {
        gsap.to(border, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      hoverHandlers.push({ enter: handleEnter, leave: handleLeave });
      element.addEventListener('mouseenter', handleEnter);
      element.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      // Proper cleanup
      mainTl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      
      cards.forEach((card, i) => {
        card.removeEventListener('mouseenter', hoverHandlers[i].enter);
        card.removeEventListener('mouseleave', hoverHandlers[i].leave);
      });

      gsap.set('.feature-card', { clearProps: 'all' });
      gsap.set('.section-badge', { clearProps: 'all' });
      gsap.set('.section-title', { clearProps: 'all' });
    };
  }, [mounted]);

  const features = [
    {
      size: 'large',
      tag: 'Infrastructure',
      title: 'Edge Network',
      description: 'Deploy globally in seconds with our distributed edge network. Zero-config CDN with intelligent routing.',
      metrics: ['<10ms', '99.99%', '180+ regions'],
      visual: 'network',
    },
    {
      size: 'medium',
      tag: 'Performance',
      title: 'Real-time Analytics',
      description: 'Monitor every metric that matters with sub-second granularity.',
      metrics: ['Live', 'Custom Events'],
      visual: 'chart',
    },
    {
      size: 'medium',
      tag: 'Developer Experience',
      title: 'CLI Tools',
      description: 'Ship faster with developer-first tooling and automation.',
      metrics: ['TypeScript', 'Hot Reload'],
      visual: 'terminal',
    },
    {
      size: 'small',
      tag: 'Security',
      title: 'Zero Trust',
      description: 'Enterprise-grade security built-in by default.',
      visual: 'shield',
    },
    {
      size: 'small',
      tag: 'Collaboration',
      title: 'Team Workflows',
      description: 'Built for teams that ship together.',
      visual: 'users',
    },
    {
      size: 'large',
      tag: 'Integration',
      title: 'Ecosystem',
      description: 'Connect with your favorite tools and services. Extensible API with webhooks, real-time events, and custom integrations.',
      metrics: ['50+ integrations', 'REST API', 'GraphQL'],
      visual: 'grid',
    },
  ];

  // Static grid pattern for hydration safety
  const staticGridPattern = [0.7, 0.5, 0.6, 0.4, 0.8, 0.5, 0.6, 0.7, 0.4, 0.6, 0.5, 0.7, 0.6, 0.4, 0.5, 0.8, 0.6, 0.5];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0a0e27] py-20 md:py-32 px-4 md:px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27] via-[#0d1230] to-[#0a0e27]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-1/2 h-1/2 bg-blue-500/5 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="section-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm mb-6">
            <div className="w-1 h-1 bg-blue-400 rounded-full" />
            <span className="text-xs text-blue-300/80 font-mono uppercase tracking-wider">
              Platform
            </span>
          </div>
          <h2 className="section-title text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight px-4">
            Built for Scale
          </h2>
          <p className="text-base md:text-lg text-blue-100/40 max-w-2xl mx-auto px-4">
            Everything you need to build, deploy, and scale modern applications
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[240px]"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card group relative rounded-lg md:rounded-xl border border-blue-500/10 bg-gradient-to-br from-blue-500/5 to-transparent backdrop-blur-sm overflow-hidden
                ${feature.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
                ${feature.size === 'medium' ? 'md:col-span-2' : ''}
                ${feature.size === 'small' ? 'md:col-span-1' : ''}
              `}
            >
              {/* Hover border */}
              <div className="hover-border absolute inset-0 rounded-lg md:rounded-xl border-2 border-blue-400/30 opacity-0 pointer-events-none" />

              {/* Content */}
              <div className="relative h-full p-5 md:p-8 flex flex-col justify-between">
                <div>
                  {/* Tag */}
                  <div className="inline-flex items-center gap-1.5 text-[10px] md:text-xs text-blue-300/60 font-mono mb-3 md:mb-4">
                    <span>{feature.tag}</span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-sm text-blue-100/50 leading-relaxed mb-3 md:mb-4 line-clamp-3">
                    {feature.description}
                  </p>

                  {/* Metrics */}
                  {feature.metrics && (
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {feature.metrics.map((metric, i) => (
                        <span
                          key={i}
                          className="px-2 md:px-2.5 py-0.5 md:py-1 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] md:text-xs text-blue-300 font-mono"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Visual Element */}
                <div className="mt-auto pt-4">
                  {feature.visual === 'network' && (
                    <div className="relative h-16 md:h-20 flex items-center justify-center opacity-60">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1.5 md:w-2 h-1.5 md:h-2 bg-blue-400 rounded-full"
                          style={{
                            left: `${20 + i * 15}%`,
                            animation: `pulse 2s ease-in-out ${i * 0.2}s infinite`,
                          }}
                        />
                      ))}
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
                          style={{
                            left: `${20 + i * 15}%`,
                            right: `${65 - i * 15}%`,
                            top: '50%',
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {feature.visual === 'chart' && (
                    <div className="flex items-end gap-1 md:gap-1.5 h-12 md:h-16 opacity-60">
                      {[40, 65, 45, 80, 60, 75, 50, 85].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-blue-500/50 to-blue-400/30 rounded-sm"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  )}

                  {feature.visual === 'terminal' && (
                    <div className="bg-black/30 rounded border border-blue-500/20 p-2 md:p-3 opacity-70">
                      <div className="flex items-center gap-1 md:gap-1.5 mb-1.5 md:mb-2">
                        <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-red-400/50" />
                        <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-yellow-400/50" />
                        <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-green-400/50" />
                      </div>
                      <div className="font-mono text-[10px] md:text-xs text-blue-300/60">
                        <span className="text-blue-400">$</span> nexus deploy
                      </div>
                    </div>
                  )}

                  {feature.visual === 'shield' && (
                    <div className="flex justify-center opacity-60">
                      <div className="relative w-10 md:w-12 h-12 md:h-14 border-2 border-blue-400/40 rounded-lg">
                        <div className="absolute inset-2 border border-blue-400/60 rounded" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-blue-400 rounded-full" />
                      </div>
                    </div>
                  )}

                  {feature.visual === 'users' && (
                    <div className="flex -space-x-2 opacity-70">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="w-6 md:w-8 h-6 md:h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-[#0a0e27]"
                        />
                      ))}
                    </div>
                  )}

                  {feature.visual === 'grid' && (
                    <div className="grid grid-cols-6 gap-1 md:gap-1.5 opacity-50">
                      {staticGridPattern.map((opacity, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded bg-blue-500/20 border border-blue-500/30"
                          style={{ opacity }}
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
        <div className="mt-12 md:mt-16 text-center">
          <button className="group inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-sm border border-blue-500/30 hover:border-blue-400/50 text-sm text-blue-100 font-medium transition-all duration-300">
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
        </div>
      </div>
    </section>
  );
}