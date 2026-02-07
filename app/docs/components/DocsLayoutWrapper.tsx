"use client";

import { ReactNode } from "react";
import { SearchModal, useSearchModal } from "./SearchModal";
import { DocsNavbar } from "./DocsNavbar";
import { CopyCodeEnhancer } from "./CopyCodeEnhancer";

interface DocsLayoutWrapperProps {
    children: ReactNode;
}

export function DocsLayoutWrapper({ children }: DocsLayoutWrapperProps) {
    const search = useSearchModal();

    return (
        <>
            <DocsNavbar onSearchClick={search.open} />
            <SearchModal isOpen={search.isOpen} onClose={search.close} />
            <CopyCodeEnhancer />
            {children}
        </>
    );
}
