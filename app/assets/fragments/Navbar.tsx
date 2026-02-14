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
] as const;

const dropdownContent = {
  ShowCase: {
    items: ["Show case", "Starter kit", "Starter Template", "Platform support"],
    image: "/images/showcase.jpg",
  },
  Docs: {
    items: ["Contribution", "Introduction", "License", "Docs"],
    image: "/images/docs.jpg",
  },
  Teams: {
    items: ["About", "All Team", "GitHub", "Get One"],
    image: "/images/team.jpg",
  },
  Community: {
    items: ["Dashboard", "Events", "Tech Stack"],
    image: "/images/global.jpg",
  },
} as const;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<keyof typeof dropdownContent | null>(null);
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
        <Link href="/" className="text-2xl font-extrabold tracking-tight z-[110] text-white">
          NLFTs<span className="text-yellow-400">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
              onMouseEnter={() => setHoveredMenu(link.name)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                href={link.href}
                className={`font-mono text-[13px] tracking-[0.15em] lowercase transition-all duration-500 hover:text-indigo-400 ${pathname === link.href ? "text-white font-medium" : "text-gray-400 font-extralight"}`}
              >
                {link.name}
              </Link>
              {hoveredMenu === link.name && (
                <>
                  <div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-black/40 backdrop-blur-md border border-white/[0.05] shadow-2xl rounded-xl p-6 z-50 group-hover:block transition-transform transform scale-95 hover:scale-100 duration-300 ease-in-out"
                    onMouseEnter={() => setHoveredMenu(link.name)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    <div className="mb-6">
                      <img src={dropdownContent[link.name].image} alt={`${link.name} image`} className="w-full h-40 object-cover rounded-lg shadow-md" />
                    </div>
                    <ul className="flex flex-col gap-4">
                      {dropdownContent[link.name].items.map((item) => (
                        <li key={item}>
                          <Link
                            href={`/${link.name.toLowerCase()}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                            className="block text-base font-medium text-gray-200 bg-black/50 hover:bg-black/70 hover:text-white rounded-lg shadow-md p-3 transition-all duration-200"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-0.5 w-96 h-2 z-40"
                    onMouseEnter={() => setHoveredMenu(link.name)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  ></div>
                </>
              )}
            </div>
          ))}
          <Link href="/connected">
            <button className="ml-4 px-6 py-2 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-600 transition-all duration-300">
              Get Started
            </button>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-[110] flex flex-col items-end gap-2 p-2"
          aria-label="Toggle Menu"
        >
          <span ref={line1Ref} className="w-8 h-[2px] bg-white transition-colors" />
          <span ref={line2Ref} className="w-8 h-[2px] bg-white transition-colors" />
        </button>
      </nav>

      {/* MOBILE OVERLAY - Unchanged */}
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