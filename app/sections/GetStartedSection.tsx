'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const templates = [
  {
    id: 1,
    title: 'Next.js Commerce',
    description: 'An all-in-one starter kit for high-performance e-commerce sites',
    tag: 'E-commerce',
  },
  {
    id: 2,
    title: 'Image Gallery',
    description: 'An image gallery built with Next.js and Cloudinary',
    tag: 'Media',
  },
  {
    id: 3,
    title: 'Next.js Boilerplate',
    description: 'A Next.js starter from create-next-app',
    tag: 'Starter',
  },
];

const categories = [
  { name: 'Starter', href: '/templates/starter' },
  { name: 'Ecommerce', href: '/templates/ecommerce' },
  { name: 'Blog', href: '/templates/blog' },
  { name: 'AI', href: '/templates/ai' },
  { name: 'Portfolio', href: '/templates/portfolio' },
  { name: 'SaaS', href: '/templates/saas' },
  { name: 'Multi-tenant', href: '/templates/multi-tenant' },
];

export default function GetStartedSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const templatesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Categories pills stagger
      const pills = categoriesRef.current?.children;
      if (pills) {
        gsap.fromTo(
          pills,
          { opacity: 0, scale: 0.8, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Content box
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Templates cards
      const cards = templatesRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: 60, rotateY: -15 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: templatesRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-black py-32 overflow-hidden">
      {/* Minimal background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(29,78,216,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.02),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-12 opacity-0">
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-3">
            Mulai dalam hitungan detik
          </h2>
          <p className="text-xl text-gray-500">
            Buat keinginmu jadi nyata
          </p>
        </div>

        {/* Categories Pills - Navigation */}
        <div ref={categoriesRef} className="flex flex-wrap gap-3 mb-16 pb-8 border-b border-white/[0.06]">
          {categories.map((category) => (
            <a
              key={category.name}
              href={category.href}
              className="group px-5 py-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] rounded-full transition-all duration-300 opacity-0"
            >
              <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                {category.name}
              </span>
            </a>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Text Content */}
          <div ref={contentRef} className="opacity-0">
            <div className="space-y-6">
              <p className="text-lg text-gray-400 leading-relaxed">
                NLFTs is a community-driven frontend library platform that makes it easy to get started with<span className="text-white font-semibold"> web development</span> quickly.
              </p>
              
              <p className="text-lg text-gray-400 leading-relaxed">
                Jumpstart your Next.js development with pre-built solutions from Vercel and 
                our community.
              </p>

              <div className="pt-6">
                <a
                  href="/templates"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition-all duration-200 group"
                >
                  <span>Deploy a Template on Vercel</span>
                  <svg 
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Template Cards Stack */}
          <div ref={templatesRef} className="relative">
            <div className="space-y-4">
              {templates.map((template, index) => (
                <div
                  key={template.id}
                  className="group relative opacity-0"
                  style={{ 
                    transform: `translateX(${index * 12}px) translateY(${index * -8}px)`,
                  }}
                >
                  <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-sm rounded-xl border border-white/[0.08] overflow-hidden hover:border-white/[0.15] transition-all duration-300">
                    {/* Subtle hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-transparent transition-all duration-500" />
                    
                    <div className="relative p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                          {template.title}
                        </h3>
                        <span className="px-3 py-1 bg-black/40 border border-white/[0.08] text-gray-400 text-xs font-medium rounded-full whitespace-nowrap">
                          {template.tag}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-500 leading-relaxed mb-4">
                        {template.description}
                      </p>

                      <div className="flex items-center gap-3">
                        <a
                          href={`/templates/${template.id}`}
                          className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1.5 group/link"
                        >
                          <span>View Template</span>
                          <svg 
                            className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </div>
  );
}