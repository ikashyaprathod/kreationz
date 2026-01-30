export interface Element {
    slug: string;
    title: string;
    category: string;
    previewImage: string;
    description: string;
}

export const elements: Element[] = [
    {
        slug: "the-weekly-edit",
        title: "Aesthete – The Weekly Edit",
        category: "Newsletters",
        previewImage: "/previews/shot-1.png",
        description: "A premium, minimal UI design for a newsletter subscription form with elegant typography and whitespace."
    },
    {
        slug: "analytics-dashboard",
        title: "Glassmorphic Analytics Dashboard",
        category: "UI Blocks",
        previewImage: "/previews/shot-2.png",
        description: "A sleek dashboard UI element showing analytics charts with a glassmorphism effect and soft shadows."
    },
    {
        slug: "form-function",
        title: "Form & Function Landing Page",
        category: "Web Design",
        previewImage: "/previews/shot-3.png",
        description: "A modern hero section for a design agency website featuring bold typography and a minimalist grid."
    },
    {
        slug: "design-system-v1",
        title: "Aurora Design System v1.2",
        category: "Elements",
        previewImage: "/previews/shot-4.png",
        description: "A set of custom UI buttons and input fields with subtle gradients and crisp borders."
    },
    {
        slug: "find-balance",
        title: "Find Your Balance Mobile App",
        category: "App Design",
        previewImage: "/previews/shot-5.png",
        description: "A creative landing page design for a mobile app with vibrant but balanced colors."
    },
    {
        slug: "slow-living-blog",
        title: "The Art of Slow Living",
        category: "Editorial",
        previewImage: "/previews/shot-6.png",
        description: "A minimalist blog post layout with large imagery and clean serif typography."
    },
    {
        slug: "contact-form-minimal",
        title: "Minimalist Contact Form",
        category: "Forms",
        previewImage: "/previews/shot-7.png",
        description: "A minimalist contact form UI with elegant serif typography and clean lines."
    },
    {
        slug: "mobile-nav-glass",
        title: "Premium Mobile Navigation",
        category: "App Design",
        previewImage: "/previews/shot-8.png",
        description: "A premium mobile UI navigation menu with smooth typography and subtle glassmorphism effects."
    }
];
