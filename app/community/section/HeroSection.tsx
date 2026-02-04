'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-item', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
      });

      // ambient floating glow
      gsap.to('.ambient-glow', {
        y: -30,
        duration: 6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="HeroSection"
    >
      {/* BASE */}
      <div className="absolute inset-0 bg-[#070914]" />

      {/* AMBIENT GLOW */}
      <div className="ambient-glow absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/20 blur-[160px]" />

      {/* GRADIENT DEPTH */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070914]/50 to-[#070914]" />

      {/* NOISE */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45Ii8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* COMMUNITY BADGE */}
      {/* COMMUNITY BADGE */}
<div className="hero-item inline-flex items-center gap-4 px-6 py-2 mb-10 text-sm text-blue-200 border border-blue-500/20 rounded-full backdrop-blur">
  
  {/* AVATAR STACK */}
  <div className="flex -space-x-3">
    <img
      src="https://avatars.githubusercontent.com/u/226198461?v=4"
      alt="member"
      className="w-8 h-8 rounded-full border border-[#070914] object-cover"
    />
    <img
      src="https://avatars.githubusercontent.com/u/228851591?v=4"
      alt="member"
      className="w-8 h-8 rounded-full border border-[#070914] object-cover"
    />
    <img
      src="https://avatars.githubusercontent.com/u/228840381?s=130&v=4"
      alt="member"
      className="w-8 h-8 rounded-full border border-[#070914] object-cover"
    />
    <div className="w-8 h-8 rounded-full bg-blue-600/80 text-[11px] flex items-center justify-center text-white border border-[#070914]">
      +21
    </div>
  </div>

  {/* TEXT */}
  <span>24+ builders aktif minggu ini</span>
</div>



        {/* TITLE */}
        <h1 className="hero-item text-[14vw] md:text-[8vw] lg:text-[7vw] font-extrabold tracking-tight leading-[0.95] mb-10">
          <span className="block text-white">FTs</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
            Community
          </span>
        </h1>

        {/* COMMUNITY MESSAGE */}
        <p className="hero-item max-w-3xl mx-auto text-lg md:text-xl text-blue-200/70 mb-14 leading-relaxed">
          Komunitas developer & builder yang fokus membangun produk nyata,
          berbagi eksperimen, dan tumbuh bersama melalui teknologi.
        </p>

        {/* CTA */}
        <div className="hero-item flex flex-col sm:flex-row gap-5 justify-center">
          <Link href="#JoinSection">
            <button className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white text-base font-semibold rounded-md transition shadow-lg shadow-blue-600/30">
              Join the Community
            </button>
          </Link>

          <Link href="/Docs">
            <button className="px-10 py-4 border border-white/15 text-white/80 hover:text-white hover:border-white/30 text-base font-medium rounded-md transition backdrop-blur">
              Explore Docs
            </button>
          </Link>
        </div>

        {/* ACTIVITY LINE */}
        <div className="hero-item mt-16 flex flex-wrap justify-center gap-8 text-xs text-white/40">
          <span>⚡ Weekly Build Session</span>
          <span>🧠 Knowledge Sharing</span>
          <span>🚀 Open Collaboration</span>
        </div>
      </div>
    </section>
  );
}
