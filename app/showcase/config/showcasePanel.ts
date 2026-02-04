export interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    demoLink: string;
    githubLink: string;
    tags: string[];
}

export const CATEGORIES = [
    "All",
    // "Starter Kit",
    // "Ecommerce",
    // "Blog",
    // "Chat AI",
    // "Portofolio",
    // "SaaS",
    // "Multi-tenant",
];

export const PROJECTS: Project[] = [
    {
        id: "1",
        title: "NLFTs Starter Kit",
        description: "A comprehensive starter kit for modern web applications using Next.js and Tailwind CSS.",
        category: "Starter Kit",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
        demoLink: "https://demo.nlfts.org/starter-kit",
        githubLink: "https://github.com/nlfts/starter-kit",
        tags: ["Next.js", "Tailwind", "TypeScript"],
    },
    // {
    //     id: "2",
    //     title: "EcoMart Deluxe",
    //     description: "High-performance e-commerce platform with integrated payment gateway and inventory management.",
    //     category: "Ecommerce",
    //     image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop",
    //     demoLink: "https://demo.nlfts.org/ecomart",
    //     githubLink: "https://github.com/nlfts/ecomart",
    //     tags: ["Prisma", "Stripe", "NextAuth"],
    // },
    // {
    //     id: "3",
    //     title: "ZenBlog",
    //     description: "Minimalist blog engine with MDX support and ultra-fast page loads.",
    //     category: "Blog",
    //     image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
    //     demoLink: "https://zenblog.nlfts.org",
    //     githubLink: "https://github.com/nlfts/zenblog",
    //     tags: ["MDX", "Contentful", "Vercel"],
    // },
    // {
    //     id: "4",
    //     title: "Naihra AI Chat",
    //     description: "Advanced AI chatbot powered by LLM for personalized user interactions.",
    //     category: "Chat AI",
    //     image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    //     demoLink: "https://chat.naihra.com",
    //     githubLink: "https://github.com/naihra/chat-ai",
    //     tags: ["OpenAI", "WebSockets", "Redis"],
    // },
    // {
    //     id: "5",
    //     title: "Creative Portfolio",
    //     description: "Stunning portfolio template for designers and developers to showcase their work.",
    //     category: "Portofolio",
    //     image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2070&auto=format&fit=crop",
    //     demoLink: "https://portfolio.nlfts.org",
    //     githubLink: "https://github.com/nlfts/portfolio",
    //     tags: ["GSAP", "Framer Motion", "Three.js"],
    // },
    // {
    //     id: "6",
    //     title: "SaaS Rocket",
    //     description: "Ready-to-use SaaS boilerplate with subscription billing and team collaboration.",
    //     category: "SaaS",
    //     image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    //     demoLink: "https://rocket.nlfts.org",
    //     githubLink: "https://github.com/nlfts/saas-rocket",
    //     tags: ["Subscription", "Multi-tenant", "Database"],
    // },
    // {
    //     id: "7",
    //     title: "TenantHub",
    //     description: "Enterprise-grade multi-tenant architecture for scalable business solutions.",
    //     category: "Multi-tenant",
    //     image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    //     demoLink: "https://hub.nlfts.org",
    //     githubLink: "https://github.com/nlfts/tenanthub",
    //     tags: ["Subdomains", "RBAC", "PostgreSQL"],
    // },
    // {
    //     id: "8",
    //     title: "Shopify Starter",
    //     description: "Fast track your Shopify storefront with this headless commerce starter.",
    //     category: "Starter Kit",
    //     image: "https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=2050&auto=format&fit=crop",
    //     demoLink: "https://shopify-demo.nlfts.org",
    //     githubLink: "https://github.com/nlfts/shopify-starter",
    //     tags: ["Headless", "Shopify", "React"],
    // },
];
