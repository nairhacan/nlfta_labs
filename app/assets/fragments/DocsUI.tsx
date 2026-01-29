"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_NAVIGATION } from "@/lib/docs-config";
import { gsap } from "gsap";

export function DocsSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<HTMLElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Close sidebar on navigation (mobile)
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (isOpen) {
            gsap.to(sidebarRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: "auto" });
            document.body.style.overflow = "hidden";
        } else {
            gsap.to(sidebarRef.current, { x: "-100%", duration: 0.3, ease: "power3.in" });
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, pointerEvents: "none" });
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    const NavContent = () => (
        <nav className="flex-1 px-6 py-8 space-y-8 overflow-y-auto custom-scrollbar">
            {DOCS_NAVIGATION.map((section, idx) => (
                <div key={idx}>
                    {section.isSeparator ? (
                        <h4 className="px-3 mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                            {section.title}
                        </h4>
                    ) : section.items ? (
                        <div className="space-y-3">
                            <h4 className="px-3 text-sm font-bold text-slate-200">{section.title}</h4>
                            <div className="grid gap-1">
                                {section.items.map((item, idy) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={idy}
                                            href={item.href || "#"}
                                            className={`px-4 py-2 text-sm rounded-xl transition-all flex items-center gap-3 ${isActive
                                                    ? "bg-indigo-500/10 text-white font-bold border-l-2 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                                }`}
                                        >
                                            <div className={`w-1 h-1 rounded-full ${isActive ? "bg-indigo-400" : "bg-slate-700"}`}></div>
                                            {item.title}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <Link
                            href={section.href || "#"}
                            className={`flex items-center gap-3 px-3 py-2 text-sm font-bold transition-all ${pathname === section.href ? "text-indigo-400 translate-x-1" : "text-slate-200 hover:text-indigo-400 hover:translate-x-1"
                                }`}
                        >
                            <div className={`w-1.5 h-1.5 rounded-sm rotate-45 ${pathname === section.href ? "bg-indigo-500" : "bg-slate-600"}`}></div>
                            {section.title}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );

    return (
        <>
            {/* Mobile Trigger */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950/90 backdrop-blur-xl border-b border-white/5 z-[100] flex items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="p-1.5 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <span className="font-black text-sm uppercase italic tracking-tighter text-white">Docs Menu</span>
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 space-y-1.5 bg-indigo-600/10 rounded-lg border border-indigo-500/20 active:scale-95 transition-all"
                >
                    <div className={`w-6 h-0.5 bg-indigo-400 transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`}></div>
                    <div className={`w-6 h-0.5 bg-indigo-400 transition-all ${isOpen ? "opacity-0" : ""}`}></div>
                    <div className={`w-6 h-0.5 bg-indigo-400 transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
                </button>
            </div>

            {/* Mobile Sidebar */}
            <div
                ref={overlayRef}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] lg:hidden opacity-0 pointer-events-none"
            />
            <aside
                ref={sidebarRef}
                className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-slate-950 border-r border-white/10 z-[120] lg:hidden -translate-x-full flex flex-col shadow-2xl overflow-hidden"
            >
                <div className="p-8 border-b border-white/5 bg-slate-900/50">
                    <span className="font-black text-xl tracking-tighter text-white uppercase italic">Navigation</span>
                </div>
                <NavContent />
            </aside>

            {/* Desktop Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-72 border-r border-white/5 bg-slate-950/50 backdrop-blur-3xl hidden lg:flex flex-col">
                <div className="p-10">
                    <Link href="/" className="flex items-center gap-3 select-none group">
                        <div className="p-2 bg-indigo-600 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-xl shadow-indigo-500/20">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div className="flex flex-col -gap-1">
                            <span className="font-black text-2xl tracking-tighter leading-none text-white italic">NLFTs</span>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-500">Documentation</span>
                        </div>
                    </Link>
                </div>
                <NavContent />
            </aside>
        </>
    );
}
