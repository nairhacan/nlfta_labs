import Link from "next/link";
import { PROJECTS, CATEGORIES } from "./config/showcasePanel";
import { Metadata } from "next";
import ProjectCard from "./components/ProjectCard";
import ContributeSection from "./components/ContributeSection";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Showcase | NLFTs Projects",
        description: "Discover the amazing projects and solutions built by the NLFTs team, including Ecommerce, AI, and SaaS platforms.",
    };
}

export default function ShowcasePage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                    NLFTs Project Showcase
                </h1>
                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                Jelajahi koleksi solusi mutakhir kami, mulai dari paket pemula hingga platform SaaS kelas perusahaan.
                </p>
            </div>

            {/* Category Filter */}
            <div className="max-w-7xl mx-auto mb-12">
                <div className="flex flex-wrap justify-center gap-3">
                    {CATEGORIES.map((category) => (
                        <Link
                            key={category}
                            href={category === "All" ? "/showcase" : `/showcase/${category.toLowerCase().replace(/\s+/g, "-")}`}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${category === "All"
                                    ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                                    : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-indigo-500 hover:text-indigo-400 hover:bg-slate-900"
                                }`}
                        >
                            {category}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Projects Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>

            {/* Contribute Section */}
            <ContributeSection />

            {/* Background Blobs */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
            </div>
        </div>
    );
}
