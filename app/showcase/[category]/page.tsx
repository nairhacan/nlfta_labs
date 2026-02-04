import Link from "next/link";
import { PROJECTS, CATEGORIES } from "../config/showcasePanel";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProjectCard from "../components/ProjectCard";
import ContributeSection from "../components/ContributeSection";

interface PageProps {
    params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category: categorySlug } = await params;
    const activeCategory = CATEGORIES.find(
        (c) => c.toLowerCase().replace(/\s+/g, "-") === categorySlug.toLowerCase()
    );

    return {
        title: `${activeCategory || "Category"} Projects | NLFTs Showcase`,
        description: `Explore our collection of ${activeCategory || "modern"} projects and solutions.`,
    };
}

export default async function CategoryShowcasePage({ params }: PageProps) {
    const { category: categorySlug } = await params;

    // Find the category from the slug
    const activeCategory = CATEGORIES.find(
        (c) => c.toLowerCase().replace(/\s+/g, "-") === categorySlug.toLowerCase()
    );

    if (!activeCategory) {
        notFound();
    }

    const filteredProjects = PROJECTS.filter(
        (p) => p.category.toLowerCase().replace(/\s+/g, "-") === categorySlug.toLowerCase()
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                    {activeCategory} Projects
                </h1>
                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                    Deep dive into our {activeCategory} solutions.
                </p>
            </div>

            {/* Category Filter */}
            <div className="max-w-7xl mx-auto mb-12">
                <div className="flex flex-wrap justify-center gap-3">
                    {CATEGORIES.map((category) => {
                        const isActive = category === activeCategory;
                        return (
                            <Link
                                key={category}
                                href={category === "All" ? "/showcase" : `/showcase/${category.toLowerCase().replace(/\s+/g, "-")}`}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${isActive
                                        ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                                        : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-indigo-500 hover:text-indigo-400 hover:bg-slate-900"
                                    }`}
                            >
                                {category}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Projects Grid */}
            <div className="max-w-7xl mx-auto">
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">No projects found in this category yet.</p>
                        <Link href="/showcase" className="mt-4 inline-block text-indigo-400 hover:underline">
                            View all projects
                        </Link>
                    </div>
                )}
            </div>

            {/* Contribute Section */}
            <ContributeSection />

            {/* Background Blobs */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
            </div>
        </div>
    );
}
