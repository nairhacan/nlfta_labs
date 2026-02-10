import { Metadata } from 'next';

export const siteConfig = {
    name: 'NLFTs',
    description: 'Menciptakan ekosistem open source yang berfokus pada developer experience(DX) dan kualitas kode.',
    url: 'https://nlfts.dev', // Placeholder, should be updated with real domain
    ogImage: '/api/og', // Dynamic Open Graph Image
    links: {
        twitter: 'https://x.com/nlfts',
        github: 'https://github.com/nlfts',
    },
    keywords: [
        'NLFTs',
        'Protocol',
        'Decentralized Dataset',
        'Web3',
        'Blockchain',
        'Developer Tools',
        'Open Source',
        'Documentation',
        'API',
        'SDK',
        'Community Open Source',
        'Developer Experience',
        'DX',
        'UI/UX',
        'React BITS',
        'VUE BITS',

    ],
    authors: [
        {
            name: 'Naihra',
            url: 'https://github.com/nairhacan',
        },
        {
            name: 'NLFTs Community',
            url: 'https://github.com/nlfts',
        },
    ],
    creator: 'NLFTs Creator Naihra',
};

export const defaultMetadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
        type: 'website',
        locale: 'id_ID',
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: '@nlfts',
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export function constructMetadata({
    title = siteConfig.name,
    description = siteConfig.description,
    image,
    icons = '/favicon.ico',
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
} = {}): Metadata {
    const ogImage = image || `${siteConfig.url}/api/og?title=${encodeURIComponent(title)}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: ogImage,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
            creator: '@nlfts',
        },
        icons,
        metadataBase: new URL(siteConfig.url),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
