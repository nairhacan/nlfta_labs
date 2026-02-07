"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DOCS_NAVIGATION, NavItem } from "@/lib/docs-config";

type SearchResult = {
    title: string;
    href: string;
    section?: string;
};

function flattenNavigation(items: NavItem[], parentTitle?: string): SearchResult[] {
    let results: SearchResult[] = [];

    items.forEach((item) => {
        if (item.href) {
            results.push({
                title: item.title,
                href: item.href,
                section: parentTitle,
            });
        }
        if (item.items) {
            results = [...results, ...flattenNavigation(item.items, item.title)];
        }
    });

    return results;
}

export function useSearchModal() {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return { isOpen, open, close };
}

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [allPages] = useState(() => flattenNavigation(DOCS_NAVIGATION));

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    const filteredResults = query.length > 0
        ? allPages.filter(page =>
            page.title.toLowerCase().includes(query.toLowerCase()) ||
            page.section?.toLowerCase().includes(query.toLowerCase())
        )
        : allPages;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % filteredResults.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + filteredResults.length) % filteredResults.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (filteredResults[selectedIndex]) {
                router.push(filteredResults[selectedIndex].href);
                onClose();
            }
        } else if (e.key === "Escape") {
            e.preventDefault();
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh] animate-in fade-in zoom-in-95 duration-200">
                {/* Search Input */}
                <div className="flex items-center px-4 h-14 border-b border-slate-800">
                    <svg className="w-5 h-5 text-slate-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search documentation..."
                        className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm h-full"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setSelectedIndex(0);
                        }}
                        onKeyDown={handleKeyDown}
                    />
                    <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-800 border border-slate-700 rounded ml-2">
                        ESC
                    </kbd>
                </div>

                {/* Results List */}
                <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                    {filteredResults.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 text-sm">
                            No results found for "{query}"
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {filteredResults.map((result, index) => (
                                <button
                                    key={result.href + index}
                                    onClick={() => {
                                        router.push(result.href);
                                        onClose();
                                    }}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-colors ${index === selectedIndex
                                            ? "bg-indigo-600/10 text-indigo-400"
                                            : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                                        }`}
                                >
                                    <div className="flex flex-col gap-0.5">
                                        <span className={`text-sm font-medium ${index === selectedIndex ? "text-indigo-300" : "text-slate-200"}`}>
                                            {result.title}
                                        </span>
                                        {result.section && (
                                            <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                                                {result.section}
                                            </span>
                                        )}
                                    </div>
                                    {index === selectedIndex && (
                                        <svg className="w-4 h-4 text-indigo-400 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800 bg-slate-900/50">
                    <div className="flex items-center gap-4 text-[10px] text-slate-500 font-mono">
                        <span className="flex items-center gap-1.5">
                            <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded">↑</kbd>
                            <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded">↓</kbd>
                            <span className="ml-1">navigasi</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                            <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded">↵</kbd>
                            <span className="ml-1">pilih</span>
                        </span>
                    </div>
                    <a
                        href="https://www.algolia.com/docsearch"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-slate-500 hover:text-indigo-400 transition-colors"
                    >
                        <span className="text-xs uppercase tracking-wider font-semibold opacity-80">Docs by</span>
                        <svg className="h-8 w-auto mb-1" viewBox="0 0 128 128" fill="currentColor">
                            <path d="M14.561 49.429C6.604 49.429.117 55.845.002 63.776C-.115 71.83 6.42 78.504 14.475 78.551a14.46 14.46 0 0 0 7.011-1.75a.34.34 0 0 0 .063-.554l-1.362-1.208a.96.96 0 0 0-1.012-.17a11.8 11.8 0 0 1-4.762.934c-6.51-.08-11.768-5.495-11.664-12.004c.102-6.426 5.362-11.622 11.812-11.622h11.813v20.998L19.67 67.22a.494.494 0 0 0-.724.076a5.49 5.49 0 0 1-4.775 2.176c-2.7-.186-4.888-2.36-5.09-5.06a5.5 5.5 0 0 1 5.478-5.916a5.5 5.5 0 0 1 5.474 5.01a.98.98 0 0 0 .321.647l1.746 1.548a.341.341 0 0 0 .561-.192c.126-.674.17-1.375.12-2.094c-.28-4.1-3.601-7.398-7.702-7.65c-4.703-.29-8.634 3.388-8.759 8c-.121 4.493 3.56 8.366 8.055 8.465a8.2 8.2 0 0 0 5.02-1.57l8.758 7.763a.582.582 0 0 0 .968-.435V49.983a.553.553 0 0 0-.553-.553zm62.026 6.104h-2.875c-2.819 0-5.299 1.485-6.746 3.736a8.43 8.43 0 0 0-1.34 4.588c0 .319.018.65.054.967a8.38 8.38 0 0 0 2.953 5.51q.256.226.542.415a4.69 4.69 0 0 0 5.402-.145c.95-.675 1.683-1.664 2.01-2.783v2.929h-.007v.646c0 1.273-.333 2.23-1.01 2.877q-1.017.968-3.395.969c-.649 0-1.678-.035-2.716-.14a.346.346 0 0 0-.366.245l-.745 2.513c-.06.202.074.41.282.439c1.254.18 2.478.273 3.185.273q4.273 0 6.346-1.878c1.252-1.131 1.932-2.85 2.052-5.159V55.877a.344.344 0 0 0-.344-.344zm0 3.736s.038 8.109 0 8.355c-.704.57-1.58.792-2.535.857l-.028.002a4 4 0 0 1-.425 0c-2.356-.123-4.344-2.171-4.344-4.626c0-.598.114-1.166.316-1.69c.654-1.696 2.26-2.898 4.142-2.898h2.875zm47.787-3.736h-2.875c-2.819 0-5.299 1.485-6.746 3.736a8.46 8.46 0 0 0-1.34 4.589a8.4 8.4 0 0 0 3.007 6.475q.256.227.542.416a4.7 4.7 0 0 0 2.81.78l.062-.004l.153-.012l.059-.007q.08-.008.16-.02l.036-.006c1.917-.295 3.588-1.796 4.132-3.66v3.37c0 .19.154.344.344.344h2.938c.19 0 .344-.154.344-.344V55.877a.344.344 0 0 0-.344-.344zm0 12.06c-.711.592-1.63.815-2.613.881q-.015 0-.029.003q-.097.006-.196.005c-2.462 0-4.495-2.091-4.495-4.626c0-.597.115-1.166.316-1.689c.654-1.697 2.26-2.899 4.142-2.899h2.875zm-72.245-12.06h-2.875c-2.819 0-5.299 1.485-6.746 3.736a8.46 8.46 0 0 0-1.34 4.589a8.4 8.4 0 0 0 3.007 6.475q.256.227.542.416a4.7 4.7 0 0 0 2.81.78l.062-.004l.153-.012l.059-.007l.16-.02l.036-.006c1.917-.295 3.588-1.796 4.132-3.66v3.37c0 .19.154.344.344.344h2.939c.19 0 .343-.154.343-.344V55.877a.344.344 0 0 0-.343-.344zm0 12.06c-.711.592-1.63.815-2.613.881q-.015 0-.029.003q-.097.006-.196.005c-2.462 0-4.495-2.091-4.495-4.626c0-.597.115-1.166.316-1.689c.654-1.697 2.26-2.899 4.142-2.899h2.875zm42.985-9.846a6.6 6.6 0 0 0-2.377-1.65q-1.39-.572-3.035-.574c-1.094 0-2.107.185-3.026.574a7 7 0 0 0-2.375 1.65q-1.003 1.068-1.56 2.567c-.372 1-.538 2.178-.538 3.4a8.6 8.6 0 0 0 .556 3.16c.372 1.01.883 1.872 1.542 2.586a6.9 6.9 0 0 0 2.366 1.659c.92.398 2.338.602 3.054.61c.714 0 2.144-.222 3.072-.61a6.8 6.8 0 0 0 2.376-1.66q.989-1.07 1.53-2.585c.363-1.01.539-1.936.539-3.16c0-1.222-.195-2.4-.585-3.4c-.372-1.001-.882-1.854-1.54-2.567zm-2.59 9.544c-.668.918-1.606 1.381-2.802 1.381c-1.198 0-2.135-.454-2.804-1.38c-.668-.919-1.003-1.983-1.003-3.568c0-1.567.326-2.864.995-3.78c.667-.919 1.605-1.371 2.801-1.371c1.198 0 2.135.453 2.803 1.37c.669.908 1.012 2.214 1.012 3.781c0 1.585-.333 2.64-1.002 3.567m10.288-1.817v-15.7a.344.344 0 0 0-.397-.34l-2.94.462a.345.345 0 0 0-.292.34l.01 15.925c0 .753 0 5.403 5.594 5.565a.345.345 0 0 0 .355-.344v-2.377a.34.34 0 0 0-.299-.34c-2.031-.234-2.031-2.773-2.03-3.19zm5.115-11.885h2.959c.19 0 .344-.153.344-.343v-3.473a.344.344 0 0 0-.398-.34l-2.959.464a.344.344 0 0 0-.29.34v3.008c0 .19.153.344.343.344zm0 1.944h2.96c.19 0 .343.153.343.344v15.509c0 .19-.153.344-.344.344h-2.96a.343.343 0 0 1-.343-.344V55.877c0-.19.153-.344.344-.344m-45.542 9.941v-15.7a.344.344 0 0 0-.398-.34l-2.94.462a.345.345 0 0 0-.292.34l.01 15.925c0 .753 0 5.403 5.594 5.565a.345.345 0 0 0 .355-.344v-2.377a.34.34 0 0 0-.299-.34c-2.03-.234-2.03-2.773-2.03-3.19z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
