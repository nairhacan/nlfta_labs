import { MetadataRoute } from 'next';
import { siteConfig } from '@/app/lib/seo-config';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        '/about',
        '/community',
        '/connected',
        '/docs',
        '/docs/getting-started/kebijakan',
        '/docs/getting-started/kode_etik',
        '/docs/getting-started/perizinan',
        '/showcase',
        '/teams',
    ].map((route) => ({
        url: `${siteConfig.url}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : route.startsWith('/docs') ? 0.9 : 0.8,
    }));

    return routes;
}
