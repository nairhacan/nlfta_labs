"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const navLinks = [
  { name: "ShowCase", href: "/showcase" },
  { name: "Docs", href: "/docs" },
  { name: "Teams", href: "/teams" },
  { name: "Community", href: "/community" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  useEffect(() => {
    const tl = gsap.timeline();
    if (isOpen) {
      tl.to(overlayRef.current, {
        y: 0,
        duration: 0.7,
        ease: "power4.inOut",
      });
      tl.fromTo(
        linksRef.current,
        { y: 100, skewY: 7, opacity: 0 },
        { y: 0, skewY: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power4.out" },
        "-=0.4"
      );
      // Animasi X Button
      gsap.to(line1Ref.current, { rotate: 45, y: 4, backgroundColor: "#6366f1", duration: 0.4 });
      gsap.to(line2Ref.current, { rotate: -45, y: -4, backgroundColor: "#6366f1", duration: 0.4 });
    } else {
      gsap.to(overlayRef.current, {
        y: "-100%",
        duration: 0.6,
        ease: "power4.inOut",
      });
      // Kembali ke Burger
      gsap.to(line1Ref.current, { rotate: 0, y: 0, backgroundColor: "#ffffff", duration: 0.4 });
      gsap.to(line2Ref.current, { rotate: 0, y: 0, backgroundColor: "#ffffff", duration: 0.4 });
    }
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-20 z-[100] flex items-center justify-between px-6 md:px-16 bg-black/40 backdrop-blur-md border-b border-white/[0.05]">
        {/* LOGO */}
        <Link href="/" className="text-lg font-bold tracking-tighter z-[110] mix-blend-difference">
          NLFTs<span className="text-indigo-500">.</span>
        </Link>

        {/* DESKTOP MENU - "Kurus", Mono, Lowercase */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-mono text-[13px] tracking-[0.15em] lowercase transition-all duration-500 hover:text-indigo-400 ${pathname === link.href ? "text-white font-medium" : "text-gray-400 font-extralight"
                }`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/connected">
            <button className="ml-4 px-6 py-1.5 border border-white/20 font-mono text-[11px] lowercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
              start up
            </button>
          </Link>
        </div>

        {/* MOBILE TOGGLE - Animating Burger to X */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-[110] flex flex-col items-end gap-2 p-2"
          aria-label="Toggle Menu"
        >
          <span ref={line1Ref} className="w-8 h-[1px] bg-white transition-colors" />
          <span ref={line2Ref} className="w-8 h-[1px] bg-white transition-colors" />
        </button>
      </nav>

      {/* MOBILE OVERLAY - Brutalist & Bold */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[105] bg-neutral-950 flex flex-col justify-center px-8 md:hidden -translate-y-full"
      >
        <div className="flex flex-col gap-4">
          <span className="font-mono text-indigo-500 text-[10px] tracking-[0.5em] uppercase mb-4 opacity-50">
            Menu Selection
          </span>
          {navLinks.map((link, i) => (
            <div key={link.name} className="overflow-hidden">
              <Link
                href={link.href}
                ref={(el) => {
                  linksRef.current[i] = el;
                }}
                onClick={() => setIsOpen(false)}
                className="text-7xl font-black tracking-tighter text-white block hover:text-indigo-500 active:scale-95 transition-transform origin-left"
              >
                {link.name}
              </Link>
            </div>
          ))}
        </div>

        <div className="absolute bottom-10 left-8 right-8 flex justify-between items-end">
          <div className="font-mono text-[9px] text-gray-600 tracking-widest leading-relaxed">
            SYSTEM STATUS: ONLINE<br />
            LOC: 106.8456° E
          </div>
          <div className="text-indigo-500 font-bold text-xs uppercase tracking-tighter">
            Gen.Lab © 26
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;