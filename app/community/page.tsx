import HeroSection from "./section/HeroSection";
import FeaturesSection from "./section/FeaturesSection";
import CommunitySection from "./section/CommunitySection";
import HighlightSection from "./section/HighlightSection";
import EventsSection from "./section/EventsSection";
import JoinSection from "./section/JoinSection";
import TechStackSection from "./section/TechStackSection";

export default function CommunityPage() {
    return (
        <main className="overflow-hidden bg-slate-950">
            <HeroSection />
            <FeaturesSection />
            <CommunitySection />
            <HighlightSection />
            <EventsSection />
            <JoinSection />
            <TechStackSection />
        </main>
    );
}