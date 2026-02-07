import { CodeBlock, InlineCode } from "./CodeBlock";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

// Enhanced MDX Components for NLFTs Documentation
export function useMDXComponents(): MDXComponents {
    return {
        // Code blocks with copy functionality
        pre: ({ children, ...props }) => {
            // Extract code element and its props
            const codeElement = children as React.ReactElement<{ className?: string; children?: React.ReactNode }>;
            const className = codeElement?.props?.className || "";
            const codeChildren = codeElement?.props?.children;

            return (
                <CodeBlock className={className} language={className.replace("language-", "")}>
                    {codeChildren}
                </CodeBlock>
            );
        },

        // Inline code with click-to-copy
        code: ({ children, className, ...props }) => {
            // If it's inside a pre (code block), render as-is
            if (className?.includes("language-")) {
                return <code className={className} {...props}>{children}</code>;
            }
            // Otherwise, render with copy functionality
            return <InlineCode>{children}</InlineCode>;
        },

        // Enhanced links
        a: ({ href, children, ...props }) => {
            const isExternal = href?.startsWith("http");

            if (isExternal) {
                return (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 underline decoration-indigo-400/30 underline-offset-2 transition-colors"
                        {...props}
                    >
                        {children}
                        <svg className="inline-block w-3 h-3 ml-1 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                );
            }

            return (
                <Link
                    href={href || "#"}
                    className="text-indigo-400 hover:text-indigo-300 underline decoration-indigo-400/30 underline-offset-2 transition-colors"
                    {...props}
                >
                    {children}
                </Link>
            );
        },

        // Callout/Admonition components
        blockquote: ({ children, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
            <blockquote
                className="my-6 pl-6 pr-4 py-4 border-l-4 border-indigo-500 bg-indigo-500/5 rounded-r-xl text-slate-300 relative"
                {...props}
            >
                <div className="absolute top-4 left-4 opacity-20">
                    <svg className="w-6 h-6 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                </div>
                {children}
            </blockquote>
        ),

        // Tables with modern styling
        table: ({ children, ...props }: ComponentPropsWithoutRef<"table">) => (
            <div className="my-8 overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-sm" {...props}>
                    {children}
                </table>
            </div>
        ),

        thead: ({ children, ...props }: ComponentPropsWithoutRef<"thead">) => (
            <thead className="bg-slate-900/50 border-b border-slate-800" {...props}>
                {children}
            </thead>
        ),

        th: ({ children, ...props }: ComponentPropsWithoutRef<"th">) => (
            <th
                className="px-4 py-3 text-left font-semibold text-slate-200 text-xs uppercase tracking-wider"
                {...props}
            >
                {children}
            </th>
        ),

        td: ({ children, ...props }: ComponentPropsWithoutRef<"td">) => (
            <td className="px-4 py-3 text-slate-300 border-t border-slate-800/50" {...props}>
                {children}
            </td>
        ),

        // Horizontal rule
        hr: (props: ComponentPropsWithoutRef<"hr">) => (
            <hr
                className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"
                {...props}
            />
        ),

        // Images with enhanced styling
        img: ({ src, alt, ...props }: ComponentPropsWithoutRef<"img">) => (
            <figure className="my-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt={alt || ""}
                    className="rounded-xl border border-slate-800 shadow-2xl w-full"
                    loading="lazy"
                    {...props}
                />
                {alt && (
                    <figcaption className="mt-3 text-center text-sm text-slate-500 italic">
                        {alt}
                    </figcaption>
                )}
            </figure>
        ),
    };
}

export { CodeBlock, InlineCode } from "./CodeBlock";
