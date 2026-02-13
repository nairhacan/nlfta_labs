'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const templates = [
  {
    id: 1,
    title: 'Website Launch',
    description:
      'Paket lengkap untuk meluncurkan website modern yang cepat, responsif, dan siap SEO — dari desain hingga deploy.',
    tag: 'Website Modern',
  },
  {
    id: 2,
    title: 'Web3 Launchpad',
    description:
      'Pendampingan integrasi blockchain/Web3 yang terarah dengan dokumentasi jelas agar tim Anda mudah melanjutkan.',
    tag: 'Web3 & Blockchain',
  },
  {
    id: 3,
    title: 'DX Partnership',
    description:
      'Kerja sama jangka panjang untuk merapikan arsitektur, tooling, dan dokumentasi agar tim developer bekerja lebih tenang.',
    tag: 'Developer Experience',
  },
];

const categories = [
  { name: 'Pelajar & Mahasiswa' },
  { name: 'Guru & Pengajar' },
  { name: 'Karyawan & Profesional' },
  { name: 'Pebisnis & Founder' },
  { name: 'Pengembang & Tim Tech' },
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
    <section
      ref={sectionRef}
      id="mulai-bersama-nlfts"
      aria-labelledby="get-started-heading"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-10 md:mb-12 opacity-0">
          <h2
            id="get-started-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4"
          >
            Cara mulai bersama NLFTs
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl">
            Dari ide hingga deploy, kami dampingi Anda lewat alur yang jelas, dokumentasi rapi, dan komunitas yang
            selalu bisa diajak diskusi.
          </p>
        </div>

        {/* Audience Pills - Who we help */}
        <div
          ref={categoriesRef}
          className="flex flex-wrap gap-3 mb-12 md:mb-16 pb-6 md:pb-8 border-b border-white/[0.06]"
          aria-label="Kelompok yang biasa kami bantu"
        >
          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              className="group px-4 sm:px-5 py-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] rounded-full transition-all duration-300 opacity-0"
            >
              <span className="text-xs sm:text-sm font-medium text-gray-400 group-hover:text-white transition-colors text-left">
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Text Content - 3-step process */}
          <div ref={contentRef} className="opacity-0">
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                Kami menggabungkan konsultasi, eksekusi teknis, dan pendampingan komunitas dalam satu alur yang
                mudah diikuti — cocok untuk pelajar, pengajar, tim internal perusahaan, maupun pemilik bisnis.
              </p>

              <ol className="space-y-4 text-sm sm:text-base">
                <li className="flex gap-3">
                  <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/20 text-xs font-semibold text-blue-300">
                    1
                  </span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Konsultasi kebutuhan & audit awal</h3>
                    <p className="text-gray-500 leading-relaxed">
                      Kami pahami konteks Anda: siapa audiensnya, stack yang digunakan, serta kendala saat ini —
                      lalu kami usulkan pendekatan teknis dan desain yang realistis.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/20 text-xs font-semibold text-blue-300">
                    2
                  </span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Rancang arsitektur, UI, & dokumentasi</h3>
                    <p className="text-gray-500 leading-relaxed">
                      Kami susun struktur halaman, komponen, integrasi Web3 (jika perlu), serta dokumentasi yang
                      rapi agar website mudah dirawat dan dikembangkan.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/20 text-xs font-semibold text-blue-300">
                    3
                  </span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Implementasi, review, & pendampingan</h3>
                    <p className="text-gray-500 leading-relaxed">
                      Proses build dilakukan dengan review berkala, uji performa, dan akses ke komunitas Discord
                      untuk tanya jawab teknis setelah project berjalan.
                    </p>
                  </div>
                </li>
              </ol>

              <div className="pt-4">
                <a
                  href="#beranda"
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition-all duration-200 group text-sm sm:text-base"
                >
                  <span>Diskusikan proyek dengan tim NLFTs</span>
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

          {/* Right: Service Packages Stack */}
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

                    <div className="relative p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
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
                          href="#mulai-bersama-nlfts"
                          className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1.5 group/link"
                        >
                          <span>Lihat detail paket</span>
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
    </section>
  );
}