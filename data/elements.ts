export interface Element {
    slug: string;
    title: string;
    category: string;
    previewImage: string;
    description: string;
    // New fields for sorting and display
    author: string;
    avatar: string;
    location?: string;
    likes: number;
    views: string;
    isTeam?: boolean;
    isPro?: boolean;
}

export const elements: Element[] = [
    {
        slug: "the-weekly-edit",
        title: "Aesthete – The Weekly Edit",
        category: "Newsletters",
        previewImage: "/previews/shot-1.png",
        description: "A premium, minimal UI design for a newsletter subscription form with elegant typography and whitespace.",
        author: "Kashyap Rathod",
        avatar: "/kashyap.png",
        location: "New York City, NY",
        likes: 141,
        views: "4k",
        isTeam: true
    },
    {
        slug: "analytics-dashboard",
        title: "Glassmorphic Analytics Dashboard",
        category: "UI Blocks",
        previewImage: "/previews/shot-2.png",
        description: "A sleek dashboard UI element showing analytics charts with a glassmorphism effect and soft shadows.",
        author: "Kashyap Rathod",
        avatar: "/kashyap.png",
        location: "San Francisco, CA",
        likes: 89,
        views: "1.2k",
        isPro: true
    },
    {
        slug: "form-function",
        title: "Form & Function Landing Page",
        category: "Web Design",
        previewImage: "/previews/shot-3.png",
        description: "A modern hero section for a design agency website featuring bold typography and a minimalist grid.",
        author: "Kashyap Rathod",
        avatar: "/kashyap.png",
        likes: 230,
        views: "12k",
        isTeam: true
    },
    {
        slug: "design-system-v1",
        title: "Aurora Design System v1.2",
        category: "Elements",
        previewImage: "/previews/shot-4.png",
        description: "A set of custom UI buttons and input fields with subtle gradients and crisp borders.",
        author: "Kashyap Rathod",
        avatar: "/kashyap.png",
        likes: 45,
        views: "800",
        isPro: true
    },
    {
        slug: "find-balance",
        title: "Find Your Balance Mobile App",
        category: "App Design",
        previewImage: "/previews/shot-5.png",
        description: "A creative landing page design for a mobile app with vibrant but balanced colors.",
        author: "Kashyap Rathod",
        avatar: "/kashyap.png",
        likes: 189,
        views: "5.5k",
        isTeam: true
    },
    {
        slug: "slow-living-blog",
        title: "The Art of Slow Living",
        category: "Editorial",
        previewImage: "/previews/shot-6.png",
        description: "A minimalist blog post layout with large imagery and clean serif typography.",
        author: "Kashyap Rathod",
        avatar: "/kashyap.png",
        likes: 67,
        views: "2.1k"
    },
    {
        slug: "contact-form-minimal",
        title: "Minimalist Contact Form",
        category: "Forms",
        previewImage: "/previews/shot-7.png",
        description: "A minimalist contact form UI with elegant serif typography and clean lines.",
        author: "Kashyap Rathod",
        avatar: "/kashyap.png",
        likes: 112,
        views: "3.4k",
        isTeam: true
    },
    {
        slug: "mobile-nav-glass",
        title: "Premium Mobile Navigation",
        category: "App Design",
        previewImage: "/previews/shot-8.png",
        description: "A premium mobile UI navigation menu with smooth typography and subtle glassmorphism effects.",
        author: "Kashyap Rathod",
        avatar: "/kashyap.png",
        likes: 24,
        views: "450"
    }
];
