'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Particles animation
      const particles = particlesRef.current?.children;
      if (particles) {
        gsap.fromTo(
          particles,
          { opacity: 0, scale: 0 },
          {
            opacity: 0.6,
            scale: 1,
            duration: 2,
            stagger: 0.1,
            ease: 'power2.out'
          }
        );
      }

      // Title reveal animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 80, rotateX: -20 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.4,
          delay: 0.2,
          ease: 'power4.out'
        }
      );

      // Content stagger
      const contentItems = contentRef.current?.children;
      if (contentItems) {
        gsap.fromTo(
          contentItems,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            delay: 0.6,
            stagger: 0.15,
            ease: 'power3.out'
          }
        );
      }

      // Visual elements
      gsap.fromTo(
        visualRef.current?.children || [],
        { opacity: 0, scale: 0.8, y: 100 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          delay: 0.8,
          stagger: 0.12,
          ease: 'power3.out'
        }
      );

      // Continuous floating animation
      gsap.to('.float-1', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.float-2', {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });

      gsap.to('.float-3', {
        y: -25,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#050510]" />

      {/* Particle effects */}
      <div ref={particlesRef} className="absolute inset-0">
        <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-blue-500/40 rounded-full blur-sm" />
        <div className="absolute top-[40%] left-[25%] w-1 h-1 bg-blue-400/30 rounded-full blur-sm" />
        <div className="absolute top-[60%] left-[15%] w-1 h-1 bg-blue-500/40 rounded-full blur-sm" />
        <div className="absolute top-[30%] right-[20%] w-1 h-1 bg-blue-400/30 rounded-full blur-sm" />
        <div className="absolute top-[70%] right-[30%] w-1 h-1 bg-blue-500/40 rounded-full blur-sm" />
        <div className="absolute top-[50%] right-[10%] w-1 h-1 bg-blue-400/30 rounded-full blur-sm" />
      </div>

      {/* Subtle blue accent glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">

          {/* Left content */}
          <div>
            <div ref={titleRef} className="mb-12 opacity-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.05] rounded-full mb-8 backdrop-blur-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-400 tracking-wide">High-End Programming Community</span>
              </div>

              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-black mb-6 leading-[1.1]">
                <span className="text-white">Welcome to</span>
                <br />
                <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                  NLFTs
                </span>
              </h1>
            </div>

            <div ref={contentRef} className="space-y-8">
              <p className="text-xl text-gray-400 leading-relaxed max-w-xl opacity-0">
                Platform eksklusif untuk developer yang telah melewati tahap beginner. Komunitas profesional dengan teknologi next-generation untuk development yang lebih efisien.
              </p>

              <div className="space-y-4 opacity-0">
                <div className="flex items-start gap-4 group">
                  <div className="mt-1 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:border-blue-400/40 transition-colors">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">FTS Format API</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">Revolusi komunikasi data dengan format .FTS - interaksi Frontend-Backend yang lebih bebas dengan passive data inclusion</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="mt-1 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:border-blue-400/40 transition-colors">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">React & Vue Pixel</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">Rumah bagi Frontend Developer dengan 1000+ komponen premium untuk React & Vue yang siap pakai di era web modern</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4 opacity-0">
                <button className="px-7 py-3.5 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200 hover:scale-[1.02] active:scale-95">
                  Get Started
                </button>
                <button className="px-7 py-3.5 bg-white/[0.03] text-white font-semibold rounded-lg border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-200">
                  View Documentation
                </button>
              </div>

              <div className="flex items-center gap-12 pt-8 opacity-0">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">500+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest">Active Developers</div>
                </div>
                <div className="w-px h-12 bg-white/5" />
                <div>
                  <div className="text-3xl font-bold text-white mb-1">1K+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest">Components</div>
                </div>
                <div className="w-px h-12 bg-white/5" />
                <div>
                  <div className="text-3xl font-bold text-white mb-1">2x</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest">Faster Build</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div ref={visualRef} className="relative hidden lg:block">
            {/* Main card */}
            <div className="float-1 relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/[0.08] shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>

                <div className="space-y-3 font-mono text-sm">
                  <div className="text-gray-500">// FTS Format Example</div>
                  <div>
                    <span className="text-blue-400">const</span>{' '}
                    <span className="text-white">data</span>{' '}
                    <span className="text-gray-500">=</span>{' '}
                    <span className="text-blue-400">await</span>{' '}
                    <span className="text-yellow-400">fetch</span>
                    <span className="text-gray-400">(</span>
                    <span className="text-green-400">'api.fts'</span>
                    <span className="text-gray-400">)</span>
                  </div>
                  <div className="pl-4 text-gray-500">// Passive data included automatically</div>
                  <div className="pl-4">
                    <span className="text-gray-500">{'{'}</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-blue-300">user</span>
                    <span className="text-gray-500">:</span>{' '}
                    <span className="text-green-400">"active"</span>
                    <span className="text-gray-500">,</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-blue-300">theme</span>
                    <span className="text-gray-500">:</span>{' '}
                    <span className="text-green-400">"dark"</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-500">{'}'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating accent cards */}
            <div className="float-2 absolute -bottom-8 -left-12 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/[0.08] shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">React Pixel</div>
                  <div className="text-gray-500 text-xs">500+ Components</div>
                </div>
              </div>
            </div>

            <div className="float-3 absolute -top-8 -right-12 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/[0.08] shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">Vue Pixel</div>
                  <div className="text-gray-500 text-xs">500+ Components</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}