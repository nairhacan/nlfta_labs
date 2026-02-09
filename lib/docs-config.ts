export type NavItem = {
    title: string;
    href?: string;
    items?: NavItem[];
    isSeparator?: boolean;
};

export const DOCS_NAVIGATION: NavItem[] = [
    { title: "Introduction", href: "/docs" },
    { title: "Permulaan", isSeparator: true },
    {
        title: "Kebijakan & Privasi",
        items: [
            { title: "Kode Etik Komunitas", href: "/docs/getting-started/kode_etik" },
            { title: "Kebijakan Hak Kekayaan Intelektual & Penggunaan", href: "/docs/getting-started/kebijakan" },
            { title: "Lisensi NLFTs", href: "/docs/getting-started/perizinan" },
        ],
    },
    {
        title: "Contribution",
        items: [
            { title: "Panduan Berkontribusi", href: "/docs/contribution/panduan_berkontribusi" },
            { title: "Persyaratan Teknis", href: "/docs/contribution/persyaratan_teknis" },
        ],
    }

];
