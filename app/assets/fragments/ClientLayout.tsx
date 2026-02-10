"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackgroundAnimation from "../components/BackgroundAnimation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isDocs = pathname?.startsWith("/docs");

    return (
        <>
            <BackgroundAnimation />
            {!isDocs && <Navbar />}
            <main>
                {children}
            </main>
            {!isDocs && <Footer />}
        </>
    );
}
