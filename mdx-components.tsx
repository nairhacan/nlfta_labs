import type { MDXComponents } from "nextra/mdx-components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => (
            <h1 className="text-4xl lg:text-6xl font-black mb-10 tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-500">
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-2xl lg:text-3xl font-bold mt-16 mb-6 text-white border-b border-white/5 pb-4">
                {children}
            </h2>
        ),
        p: ({ children }) => (
            <p className="text-lg lg:text-xl leading-relaxed text-slate-400 mb-6 font-medium">
                {children}
            </p>
        ),
        strong: ({ children }) => (
            <strong className="text-indigo-400 font-bold">{children}</strong>
        ),
        code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 font-mono text-sm border border-indigo-500/20">
                {children}
            </code>
        ),
        pre: ({ children }) => (
            <pre className="p-6 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl my-8 overflow-x-auto custom-scrollbar">
                {children}
            </pre>
        ),
        ...components,
    };
}
