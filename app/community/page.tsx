import HeroSection from "./section/HeroSection";
import FeaturesSection from "./section/FeaturesSection";
import CommunitySection from "./section/CommunitySection";
import HighlightSection from "./section/HighlightSection";
import EventsSection from "./section/EventsSection";
import JoinSection from "./section/JoinSection";
import TechStackSection from "./section/TechStackSection";

export default function CommunityPage() {
    return (
        <main className="relative min-h-screen">
            {/* FIXED GLOBAL BACKGROUND FOR COMMUNITY PAGE */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* 1. Global Gradient Base (Deep) */}
                <div className="absolute inset-0 bg-transparent" />

                {/* 2. Global Noise Texture (Seamless) */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                {/* 3. Global Ambient Glows (Fixed positions giving depth) */}
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 blur-[130px] rounded-full mix-blend-screen" />
                <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-violet-600/10 blur-[130px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-indigo-600/10 blur-[130px] rounded-full mix-blend-screen" />
            </div>

            {/* SECTIONS (Floating above) */}
            <div className="relative z-10 w-full overflow-hidden">
                <HeroSection />
                <FeaturesSection />
                <CommunitySection />
                <HighlightSection />
                <EventsSection />
                <JoinSection />
                <TechStackSection />
            </div>
        </main>
    );
}