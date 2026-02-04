"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_NAVIGATION } from "@/lib/docs-config";

export function DocsSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const NavContent = () => (
        <nav className="flex-1 px-6 py-8 space-y-8 overflow-y-auto custom-scrollbar relative z-10">
            {DOCS_NAVIGATION.map((section, idx) => (
                <div key={idx}>
                    {section.isSeparator ? (
                        <h4 className="px-3 mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 border-l border-white/10 ml-1 pl-4">
                            {section.title}
                        </h4>
                    ) : section.items ? (
                        <div className="space-y-3">
                            <h4 className="px-3 text-sm font-bold text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-indigo-500 block"></span>
                                {section.title}
                            </h4>
                            <div className="grid gap-1 pl-3 border-l border-white/5 ml-3.5">
                                {section.items.map((item, idy) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={idy}
                                            href={item.href || "#"}
                                            className={`px-4 py-2 text-sm rounded-lg transition-colors flex items-center justify-between group ${isActive
                                                ? "bg-indigo-600 text-white font-bold"
                                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                                }`}
                                        >
                                            <span>{item.title}</span>
                                            {isActive && <div className="w-1 h-4 bg-white rounded-full"></div>}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <Link
                            href={section.href || "#"}
                            className={`flex items-center gap-3 px-3 py-2 text-sm font-bold transition-all border-l-2 ${pathname === section.href
                                ? "text-white border-indigo-500 bg-indigo-500/10"
                                : "text-slate-400 border-transparent hover:text-white hover:border-white/20"
                                }`}
                        >
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
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950 border-b border-white/10 z-[100] flex items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-2">
                    <span className="font-black text-sm uppercase italic tracking-tighter text-white">Docs</span>
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 bg-indigo-600 rounded text-white font-bold text-xs"
                >
                    {isOpen ? "CLOSE" : "MENU"}
                </button>
            </div>

            {/* Mobile Sidebar (Snappy, no animations) */}
            {isOpen && (
                <div className="fixed inset-0 z-[110] lg:hidden">
                    <div onClick={() => setIsOpen(false)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
                    <aside className="absolute inset-y-0 left-0 w-[280px] bg-slate-950 border-r border-indigo-500/30 flex flex-col shadow-2xl">
                        <div className="p-6 border-b border-white/5">
                            <span className="font-black text-lg tracking-tighter text-white uppercase italic">Navigation</span>
                        </div>
                        <NavContent />
                    </aside>
                </div>
            )}

            {/* Desktop Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-72 border-r border-white/10 bg-slate-950 hidden lg:flex flex-col">
                <div className="p-10 border-b border-white/5 relative overflow-hidden">
                    {/* Decorative Line */}
                    <div className="absolute top-0 right-0 w-[1px] h-full bg-linear-to-b from-transparent via-indigo-500/50 to-transparent"></div>

                    <Link href="/" className="flex items-center gap-3 select-none">
                        <div className="w-10 h-10 bg-indigo-600 flex items-center justify-center font-black italic text-xl shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                            N
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-2xl tracking-tighter leading-none text-white italic">NLFTs</span>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-500">Core_Docs</span>
                        </div>
                    </Link>
                </div>
                <NavContent />

                {/* Visual Line at bottom */}
                <div className="p-6 border-t border-white/5">
                    <div className="h-1 w-full bg-linear-to-r from-indigo-500 to-transparent opacity-30"></div>
                </div>
            </aside>
        </>
    );
}

export function DocsRightSidebar() {
    const pathname = usePathname();
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // Small delay to ensure content is rendered after navigation
        const timer = setTimeout(() => {
            const elements = Array.from(document.querySelectorAll("h2, h3"))
                .map((el) => {
                    const id = el.id || el.textContent?.toLowerCase().replace(/\s+/g, "-") || "";
                    if (!el.id && id) el.id = id;
                    return {
                        id,
                        text: el.textContent || "",
                        level: parseInt(el.tagName.replace("H", ""))
                    };
                });
            setHeadings(elements);

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveId(entry.target.id);
                        }
                    });
                },
                { rootMargin: "-100px 0% -80% 0%" }
            );

            document.querySelectorAll("h2, h3").forEach((h) => observer.observe(h));
            return () => observer.disconnect();
        }, 100);

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <aside className="fixed top-0 bottom-0 right-0 w-64 pt-24 hidden xl:flex flex-col border-l border-white/5 bg-slate-950/20 backdrop-blur-sm z-5">
            {/* Scrollable Navigation Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-8 py-2">
                <div className="mb-10 relative">
                    <div className="absolute top-0 right-[-8px] h-full w-[2px] bg-linear-to-b from-indigo-500/0 via-indigo-500/40 to-indigo-500/0"></div>

                    <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-6 flex items-center gap-2">
                        <span className="w-4 h-px bg-indigo-500/50"></span>
                        On this page
                    </h5>
                    <nav className="space-y-4 border-r border-white/5 pr-4">
                        {headings.length > 0 ? (
                            headings.map((heading, i) => (
                                <a
                                    key={i}
                                    href={`#${heading.id}`}
                                    className={`block text-xs font-medium transition-all duration-200 ${activeId === heading.id
                                        ? "text-indigo-400 translate-x-1"
                                        : "text-slate-500 hover:text-white"
                                        } ${heading.level === 3 ? "pl-4 text-[11px]" : ""
                                        }`}
                                >
                                    {heading.text}
                                </a>
                            ))
                        ) : (
                            <p className="text-[10px] text-slate-600 italic">No headings found</p>
                        )}
                    </nav>
                </div>
            </div>

            {/* Fixed Sponsor Section at Bottom */}
            <div className="px-8 pb-12 mt-auto bg-slate-950/50 backdrop-blur-md pt-6 border-t border-white/5">
                <div className="p-5 rounded-2xl bg-linear-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 group hover:border-indigo-500/40 transition-colors relative overflow-hidden text-center">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-indigo-500/40 to-transparent"></div>

                    <h6 className="text-xs font-bold text-indigo-400 mb-2 tracking-wide justify-center flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-pink-500 fill-pink-500" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                        Support NLFTs
                    </h6>
                    <p className="text-[10px] text-slate-400 leading-relaxed mb-4 font-medium">
                        We depend on community support to maintain this protocol.
                    </p>
                    <Link
                        href="https://github.com/sponsors/nlfts"
                        target="_blank"
                        className="block w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest text-center transition-colors shadow-lg shadow-indigo-600/20"
                    >
                        Become a Sponsor
                    </Link>
                </div>
            </div>
        </aside>
    );
}
