"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function CopyCodeEnhancer() {
    const pathname = usePathname();

    useEffect(() => {
        // Function to clean up buttons
        const cleanup = () => {
            document.querySelectorAll(".copy-btn-enhanced").forEach(btn => btn.remove());
        };

        const addCopyButtons = () => {
            const preElements = document.querySelectorAll(".prose-docs pre");

            preElements.forEach((pre) => {
                // Skip if already has a copy button
                if (pre.querySelector(".copy-btn-enhanced")) return;

                // Ensure pre has relative positioning for absolute child backup
                if (!pre.classList.contains("relative")) {
                    pre.classList.add("relative");
                }

                // Create copy button
                const button = document.createElement("button");
                // Use absolute positioning - safe and robust
                button.className = "copy-btn-enhanced absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 transition-all duration-200 opacity-70 hover:opacity-100 z-10 shadow-lg";

                button.innerHTML = `
                    <svg class="w-3.5 h-3.5 copy-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <svg class="w-3.5 h-3.5 check-icon hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="btn-text">Salin</span>
                `;

                button.addEventListener("click", async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Clean up text content to get only code
                    let code = pre.textContent || "";
                    code = code.replace(/SalinTersalin!$/, "").trim(); // Remove button text if accidentally captured

                    try {
                        await navigator.clipboard.writeText(code);
                    } catch {
                        const textArea = document.createElement("textarea");
                        textArea.value = code;
                        textArea.style.position = "fixed";
                        textArea.style.left = "-9999px";
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textArea);
                    }

                    const copyIcon = button.querySelector(".copy-icon");
                    const checkIcon = button.querySelector(".check-icon");
                    const btnText = button.querySelector(".btn-text");

                    copyIcon?.classList.add("hidden");
                    checkIcon?.classList.remove("hidden");
                    if (btnText) btnText.textContent = "Tersalin!";
                    button.classList.add("bg-green-600", "border-green-500", "text-white");
                    button.classList.remove("bg-slate-800", "border-slate-700");

                    setTimeout(() => {
                        copyIcon?.classList.remove("hidden");
                        checkIcon?.classList.add("hidden");
                        if (btnText) btnText.textContent = "Salin";
                        button.classList.remove("bg-green-600", "border-green-500", "text-white");
                        button.classList.add("bg-slate-800", "border-slate-700");
                    }, 2000);
                });

                // Append button directly to PRE
                pre.appendChild(button);
            });

            // Inline code enhancement logic
            const inlineCodeElements = document.querySelectorAll(".prose-docs code:not(pre code)");
            inlineCodeElements.forEach((codeEl) => {
                const code = codeEl as HTMLElement;
                if (code.hasAttribute("data-copy-enabled")) return;

                code.setAttribute("data-copy-enabled", "true");
                code.classList.add("cursor-pointer", "hover:bg-indigo-500/10", "hover:border-indigo-500/30", "transition-colors");
                code.setAttribute("title", "Klik untuk menyalin");

                code.addEventListener("click", async () => {
                    const text = code.textContent || "";
                    try {
                        await navigator.clipboard.writeText(text);
                    } catch {
                        // Fallback
                    }

                    // Visual feedback
                    const originalBg = code.style.backgroundColor;
                    code.classList.add("bg-green-600/20", "border-green-500/30");

                    // Tooltip
                    const tooltip = document.createElement("span");
                    tooltip.textContent = "Tersalin!";
                    tooltip.className = "absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-green-600 text-white text-[10px] font-medium rounded whitespace-nowrap z-50 animate-fade-in pointer-events-none";

                    const codeRect = code.getBoundingClientRect();
                    tooltip.style.position = "fixed";
                    tooltip.style.top = `${codeRect.top - 30}px`;
                    tooltip.style.left = `${codeRect.left + codeRect.width / 2}px`;
                    document.body.appendChild(tooltip);

                    setTimeout(() => {
                        code.classList.remove("bg-green-600/20", "border-green-500/30");
                        code.style.backgroundColor = originalBg;
                        tooltip.remove();
                    }, 1500);
                });
            });
        };

        // Initial run
        const timer = setTimeout(addCopyButtons, 100);

        // Observer to handle client-side navigation updates
        const observer = new MutationObserver(() => {
            addCopyButtons();
        });

        const docsContent = document.querySelector(".prose-docs");
        if (docsContent) {
            observer.observe(docsContent, { childList: true, subtree: true });
        }

        return () => {
            clearTimeout(timer);
            observer.disconnect();
            cleanup();
        };
    }, [pathname]);

    return null;
}
