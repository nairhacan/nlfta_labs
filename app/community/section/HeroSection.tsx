'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const container = containerRef.current;
    const title = titleRef.current;
    const canvas = canvasRef.current;
    if (!container || !title || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas setup
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(0, 150, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(0, 150, 255, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Reset GSAP state sebelum animasi baru
    gsap.set('.char', { clearProps: 'all' });
    gsap.set('.line', { clearProps: 'all' });
    gsap.set('.cta-group', { clearProps: 'all' });
    gsap.set('.stat-item', { clearProps: 'all' });

    // GSAP Animations dengan delay untuk ensure DOM ready
    const tl = gsap.timeline({ 
      defaults: { ease: 'power3.out' },
      delay: 0.1 
    });

    const chars = title.querySelectorAll('.char');
    const lines = title.querySelectorAll('.line');

    tl.from(chars, {
      opacity: 0,
      y: 120,
      rotationX: -90,
      transformOrigin: '50% 50%',
      stagger: {
        amount: 0.8,
        from: 'start',
      },
      duration: 1.4,
      ease: 'back.out(1.4)',
    })
      .from(
        lines,
        {
          opacity: 0,
          y: 40,
          stagger: 0.2,
          duration: 1,
        },
        '-=0.8'
      )
      .from(
        '.cta-group',
        {
          opacity: 0,
          y: 50,
          duration: 1,
        },
        '-=0.6'
      )
      .from(
        '.stat-item',
        {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.8,
        },
        '-=0.4'
      );

    // Magnetic button effect
    const buttons = container.querySelectorAll('.magnetic-btn');
    const magneticHandlers: Map<Element, { move: (e: MouseEvent) => void; leave: () => void }> = new Map();

    buttons.forEach((btn) => {
      const element = btn as HTMLElement;
      
      const handleMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(element, {
          x: x * 0.4,
          y: y * 0.4,
          duration: 0.4,
          ease: 'power2.out',
        });
      };

      const handleLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
        });
      };

      magneticHandlers.set(element, { move: handleMove, leave: handleLeave });
      element.addEventListener('mousemove', handleMove);
      element.addEventListener('mouseleave', handleLeave);
    });

    // Parallax effect on scroll
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
      onUpdate: (self) => {
        gsap.to(title, {
          y: self.progress * 200,
          opacity: 1 - self.progress * 0.7,
          duration: 0.1,
        });
      },
    });

    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      
      // Kill semua GSAP animations dan ScrollTriggers
      tl.kill();
      scrollTrigger.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      
      // Remove event listeners
      magneticHandlers.forEach((handlers, element) => {
        element.removeEventListener('mousemove', handlers.move);
        element.removeEventListener('mouseleave', handlers.leave);
      });
      
      // Clear GSAP properties
      gsap.set('.char', { clearProps: 'all' });
      gsap.set('.line', { clearProps: 'all' });
      gsap.set('.cta-group', { clearProps: 'all' });
      gsap.set('.stat-item', { clearProps: 'all' });
    };
  }, [isMounted]);

  const mainTitle = 'NEXUS LABS';
  const subtitle = 'Building the Future of Collaborative Innovation';

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a0e27]"
    >
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0e27]/40 to-[#0a0e27] z-[1]" />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.015] z-[2] pointer-events-none mix-blend-overlay">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 max-w-7xl mx-auto">
        
        {/* Main Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h1 className="text-[11vw] md:text-[7.5vw] lg:text-[6.5vw] font-bold leading-none tracking-tighter mb-8">
            {mainTitle.split('').map((char, i) => (
              <span
                key={i}
                className="char inline-block text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-50 to-blue-400"
                style={{
                  textShadow: '0 0 100px rgba(59, 130, 246, 0.4)',
                  filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.3))',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          <div className="space-y-3">
            <p className="line text-lg md:text-xl lg:text-2xl text-blue-100/50 font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
            <div className="line flex items-center justify-center gap-3 text-xs md:text-sm text-blue-300/30 font-mono">
              <span>Protocol v2.0</span>
              <span className="w-1 h-1 bg-blue-400/40 rounded-full" />
              <span>Mainnet Q2 2026</span>
            </div>
          </div>
        </div>

        {/* CTA Group */}
        <div className="cta-group flex flex-col sm:flex-row gap-5 items-center mb-20">
          <button className="magnetic-btn group relative px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium tracking-wide rounded-sm transition-colors duration-300 overflow-hidden">
            <span className="relative z-10">Enter Platform</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-400" />
          </button>

          <button className="magnetic-btn group relative px-10 py-4 border border-blue-500/20 hover:border-blue-400/40 text-blue-100 text-sm font-medium tracking-wide rounded-sm transition-all duration-300 backdrop-blur-sm">
            <span className="relative z-10">Documentation</span>
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Minimalist Stats */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden md:flex gap-20 text-center">
          <div className="stat-item group cursor-default">
            <div className="text-4xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
              50K
            </div>
            <div className="text-xs text-blue-300/40 uppercase tracking-[0.2em] font-medium">
              Members
            </div>
          </div>
          <div className="w-px h-14 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
          <div className="stat-item group cursor-default">
            <div className="text-4xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
              12K
            </div>
            <div className="text-xs text-blue-300/40 uppercase tracking-[0.2em] font-medium">
              Projects
            </div>
          </div>
          <div className="w-px h-14 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
          <div className="stat-item group cursor-default">
            <div className="text-4xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
              500
            </div>
            <div className="text-xs text-blue-300/40 uppercase tracking-[0.2em] font-medium">
              Events
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-8 hidden md:flex items-center gap-4 text-blue-300/30 text-xs">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-blue-400/40 to-transparent" />
        <span className="uppercase tracking-[0.3em] font-mono">Scroll</span>
      </div>
    </section>
  );
}