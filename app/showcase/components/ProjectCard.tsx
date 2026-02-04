"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "../config/showcasePanel";

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const handleGetProject = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const confirmed = window.confirm(
            "Jika anda ingin menggunakan Project ini harap baca Dokumentasi yang tersedia untuk panduan lebih detail."
        );
        if (confirmed) {
            window.open(project.githubLink, "_blank");
        }
    };

    return (
        <div
            className="group relative bg-slate-900/40 border border-slate-800/50 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(79,70,229,0.15)] flex flex-col h-full"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent" />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-indigo-600/90 text-white text-[10px] font-bold uppercase tracking-wider rounded-md backdrop-blur-sm">
                        {project.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col grow">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[11px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md border border-slate-700/50"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mt-auto flex items-center gap-4">
                    <Link
                        href={project.demoLink}
                        target="_blank"
                        className="flex-1 text-center py-2 px-4 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                    >
                        View Demo
                    </Link>
                    <a
                        href={project.githubLink}
                        onClick={handleGetProject}
                        className="flex-1 text-center py-2 px-4 rounded-xl text-sm font-bold border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all active:scale-95"
                    >
                        Get
                    </a>
                </div>
            </div>
        </div>
    );
}
