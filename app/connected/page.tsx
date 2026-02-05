'use client';

import Link from 'next/link';
import { FaWhatsapp, FaDiscord, FaGithub } from 'react-icons/fa6';
import { ArrowRight, Sparkles } from 'lucide-react';

const COMMUNITY_LINKS = [
    {
        id: 'whatsapp',
        name: 'WhatsApp Community',
        description: 'Diskusi real-time dan update cepat langsung di ponsel Anda.',
        href: '/connected/whatsapp',
        icon: <FaWhatsapp className="w-8 h-8" />,
        color: 'emerald',
        borderColor: 'border-emerald-500/20',
        glowColor: 'bg-emerald-500/10',
        textColor: 'text-emerald-400',
        hoverBorder: 'group-hover:border-emerald-500/50'
    },
    {
        id: 'discord',
        name: 'Discord Server',
        description: 'Dukungan teknis mendalam, showcase proyek, dan voice chat.',
        href: '/connected/discord',
        icon: <FaDiscord className="w-8 h-8" />,
        color: 'indigo',
        borderColor: 'border-indigo-500/20',
        glowColor: 'bg-indigo-500/10',
        textColor: 'text-indigo-400',
        hoverBorder: 'group-hover:border-indigo-500/50'
    },
    {
        id: 'github',
        name: 'Open Source',
        description: 'Kontribusi pada codebase, laporkan isu, dan bangun masa depan.',
        href: '/connected/github',
        icon: <FaGithub className="w-8 h-8" />,
        color: 'slate',
        borderColor: 'border-slate-500/20',
        glowColor: 'bg-slate-500/10',
        textColor: 'text-slate-400',
        hoverBorder: 'group-hover:border-slate-500/50'
    }
];

export default function ConnectedPage() {
    return (
        <main className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center px-6 py-20">
            {/* Background Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />

            {/* CSS Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />
            <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 max-w-5xl w-full">
                <div className="mb-12 flex justify-start">
                    <Link href="/community" className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors duration-300 font-mono text-[10px] uppercase tracking-widest">
                        <ArrowRight className="w-3 h-3 rotate-180" />
                        <span>Back to Community</span>
                    </Link>
                </div>

                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                        <Sparkles className="w-3 h-3 text-indigo-400" />
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-white/70 uppercase">
                            Connect with us
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-none">
                        Stay <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-blue-400 to-emerald-400">Connected</span>
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                        Pilih platform yang Anda sukai untuk bergabung dengan ekosistem NLFTs dan mulai membangun masa depan bersama.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {COMMUNITY_LINKS.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`group relative p-8 rounded-4xl bg-white/3 border ${item.borderColor} ${item.hoverBorder} backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/6 overflow-hidden`}
                        >
                            {/* Inner Glow */}
                            <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${item.glowColor} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full`} />

                            {/* Icon Container */}
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 ${item.glowColor} ${item.textColor} border ${item.borderColor}`}>
                                {item.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                                {item.name}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 min-h-[40px]">
                                {item.description}
                            </p>

                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                                <span>Gabung Sekarang</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </div>

                            {/* Decorative line */}
                            <div className={`absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r ${item.color === 'emerald' ? 'from-emerald-400 to-teal-500' : item.color === 'indigo' ? 'from-indigo-400 to-blue-500' : 'from-gray-400 to-white'} group-hover:w-full transition-all duration-700`} />
                        </Link>
                    ))}
                </div>

                {/* Footer simple */}
                <div className="mt-20 text-center">
                    <p className="text-gray-600 font-mono text-[10px] tracking-widest uppercase">
                        NLFTs Ecosystem &copy; {new Date().getFullYear()} — Built for Creators
                    </p>
                </div>
            </div>
        </main>
    );
}
