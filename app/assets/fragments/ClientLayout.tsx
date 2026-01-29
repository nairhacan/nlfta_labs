"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isDocs = pathname?.startsWith("/docs");

    return (
        <>
            {!isDocs && <Navbar />}
            <main>
                {children}
            </main>
            {!isDocs && <Footer />}
        </>
    );
}
