import Link from "next/link";

export default function ContributeSection() {
    return (
        <div className="max-w-7xl mx-auto mt-32 px-4 sm:px-6 lg:px-8">
            <div className="relative group overflow-hidden rounded-3xl bg-slate-900/50 border border-slate-800/50 p-8 md:p-12 lg:p-16">
                {/* Animated Background Decoration */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-700" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors duration-700" />

                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Build the Future of <br />
                            <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                NLFTs Together
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 max-w-xl line-relaxed">
                            Proyek-proyek kami bersifat open-source dan berkembang berkat kolaborasi komunitas. Baik Anda seorang pengembang, desainer, atau penulis teknis, selalu ada tempat untuk Anda di ekosistem NLFTs.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="https://github.com/nlfts"
                                target="_blank"
                                className="inline-flex items-center px-8 py-4 rounded-full bg-white text-slate-950 font-bold hover:bg-slate-100 transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                            >
                                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                </svg>
                                Join NLFTs on GitHub
                            </Link>
                            <Link
                                href="/docs/contributing"
                                className="inline-flex items-center px-8 py-4 rounded-full border border-slate-700 text-white font-bold hover:bg-slate-800 transition-all active:scale-95"
                            >
                                Baca Panduan
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "Code", desc: "Berkontribusi pada mesin inti", icon: "🛠️" },
                            { label: "Design", desc: "Bantu dengan UI/UX", icon: "🎨" },
                            { label: "Docs", desc: "Tingkatkan dokumentasi", icon: "✍️" },
                            { label: "Idea", desc: "Sarankan fitur baru", icon: "💡" },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800/50 hover:border-indigo-500/30 transition-all duration-300 hover:translate-y-[-4px]"
                            >
                                <div className="text-3xl mb-3">{item.icon}</div>
                                <h4 className="text-white font-bold mb-1">{item.label}</h4>
                                <p className="text-slate-500 text-xs">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
