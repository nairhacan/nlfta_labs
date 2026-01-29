"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const container = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    // Refresh ScrollTrigger and reset animations on route change
    ScrollTrigger.refresh();

    // Reveal animation: Footer muncul seperti blok yang naik
    gsap.from(".footer-block", {
      y: 150,
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.inOut",
      immediateRender: false, // Ensure fallback: don't move until triggered
      scrollTrigger: {
        trigger: container.current,
        start: "top 95%",
        toggleActions: "play none none reverse"
      }
    });
  }, { scope: container, dependencies: [pathname] });

  return (
    <footer ref={container} className="relative w-full bg-[#050505] pt-40 pb-10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">

        {/* BIG HEADLINE SECTION */}
        <div className="footer-block border-b border-white/10 pb-20 mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
          <h2 className="text-[12vw] md:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase italic">
            Next Gen <br />
            <span className="text-blue-600">.FTS Protocol</span>
          </h2>
          <div className="max-w-[300px] text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Architecture</p>
            <p className="text-sm font-light text-white/70 leading-relaxed">
              Rumah bagi Senior Developer yang muak dengan limitasi JSON.
              Selamat datang di era manipulasi data pasif.
            </p>
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">

          {/* Column 1: Pixels */}
          <div className="md:col-span-3 footer-block">
            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-8">// PIXEL ECOSYSTEM</p>
            <nav className="flex flex-col gap-4">
              {["React Pixel", "Vue Pixel", "Svelte Pixel", "Core Engine"].map((item) => (
                <Link key={item} href="#" className="text-2xl font-medium hover:italic hover:translate-x-2 transition-all duration-300 w-fit">
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 2: Tech Stack */}
          <div className="md:col-span-3 footer-block">
            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-8">// DOCUMENTATION</p>
            <nav className="flex flex-col gap-4">
              {["FTS Formatting", "Passive API", "High-End CLI", "Web Components"].map((item) => (
                <Link key={item} href="#" className="text-white/50 hover:text-white transition-colors">
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Big CTA / Social */}
          <div className="md:col-span-6 footer-block flex flex-col justify-between items-end">
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Join the elite</p>
              <Link href="mailto:dev@nlfts.com" className="text-3xl md:text-5xl font-black border-b-4 border-blue-600 pb-2">
                LET&apos;S_CODE@NLFTS.COM
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="footer-block flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8">
          <div className="flex gap-8 mb-4 md:mb-0">
            <span className="text-[10px] tracking-widest opacity-30">©2026 NLFTS CORE</span>
            <span className="text-[10px] tracking-widest opacity-30">EST. 22:04:11</span>
          </div>

          {/* Kinetic Status Bar */}
          <div className="flex items-center gap-4 bg-white/5 px-6 py-2 rounded-full border border-white/10">
            <div className="relative w-2 h-2">
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-blue-500 w-2 h-2 rounded-full"></div>
            </div>
            <span className="text-[10px] font-mono tracking-[0.2em]">FTS_SERVER_ENCRYPTED_OK</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;