"use client";

import { useState, useRef, useEffect } from "react";

interface CodeBlockProps {
    children: React.ReactNode;
    className?: string;
    language?: string;
}

export function CodeBlock({ children, className, language }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const preRef = useRef<HTMLPreElement>(null);

    // Extract language from className (e.g., "language-js" -> "js")
    const lang = language || className?.replace(/language-/, "") || "";

    const copyToClipboard = async () => {
        if (preRef.current) {
            const code = preRef.current.textContent || "";
            try {
                await navigator.clipboard.writeText(code);
                setCopied(true);
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement("textarea");
                textArea.value = code;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
                setCopied(true);
            }
        }
    };

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [copied]);

    return (
        <div className="group relative my-6">
            {/* Language Badge */}
            {lang && (
                <div className="absolute top-0 left-4 -translate-y-1/2 px-3 py-1 bg-slate-800 border border-slate-700 rounded-full">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider">
                        {lang}
                    </span>
                </div>
            )}

            {/* Copy Button */}
            <button
                onClick={copyToClipboard}
                className={`absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${copied
                        ? "bg-green-600 text-white"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600"
                    } opacity-0 group-hover:opacity-100 focus:opacity-100`}
            >
                {copied ? (
                    <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Tersalin!</span>
                    </>
                ) : (
                    <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Salin</span>
                    </>
                )}
            </button>

            {/* Code Block */}
            <pre
                ref={preRef}
                className={`p-5 pt-8 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto text-sm leading-relaxed ${className || ""}`}
                style={{
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3), inset 0 1px 0 0 rgb(255 255 255 / 0.03)"
                }}
            >
                <code className="font-mono text-slate-300">{children}</code>
            </pre>

            {/* Bottom Glow */}
            <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    );
}

// Inline code component with copy on click
export function InlineCode({ children }: { children: React.ReactNode }) {
    const [copied, setCopied] = useState(false);

    const handleClick = async () => {
        const text = typeof children === "string" ? children : "";
        if (text) {
            try {
                await navigator.clipboard.writeText(text);
                setCopied(true);
            } catch {
                // Fallback
                const textArea = document.createElement("textarea");
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
                setCopied(true);
            }
        }
    };

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [copied]);

    return (
        <code
            onClick={handleClick}
            className={`relative px-1.5 py-0.5 rounded-md font-mono text-[0.9em] cursor-pointer select-all transition-all duration-200 ${copied
                    ? "bg-green-600/20 text-green-400 border border-green-500/30"
                    : "bg-slate-800/80 text-indigo-300 border border-slate-700/50 hover:bg-indigo-500/10 hover:border-indigo-500/30"
                }`}
            title={copied ? "Tersalin!" : "Klik untuk menyalin"}
        >
            {children}
            {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-green-600 text-white text-[10px] font-medium rounded whitespace-nowrap animate-fade-in">
                    Tersalin!
                </span>
            )}
        </code>
    );
}
