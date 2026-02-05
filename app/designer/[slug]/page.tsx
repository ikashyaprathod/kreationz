import { elements } from "@/data/elements";
import { notFound } from "next/navigation";
import Image from "next/image";
import Grid from "@/components/Grid";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    const element = elements.find(e => e.author.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);

    if (!element) return { title: "Designer Not Found" };
    return {
        title: `${element.author} – Kreationz`,
        description: `Check out ${element.author}'s profile and design shots on Kreationz.`,
    };
}

export default async function DesignerPage({ params }: PageProps) {
    const { slug } = await params;

    // Find any element by this author to get their profile info (simulating a User DB)
    const representativeElement = elements.find(
        e => e.author.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
    );

    if (!representativeElement) {
        notFound();
    }

    const { author, avatar, location } = representativeElement;

    return (
        <main className="min-h-screen pb-20 bg-white">
            {/* Profile Header */}
            <div className="bg-white">
                <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 text-center md:text-left">
                        {/* Avatar */}
                        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-gray-100 shadow-sm shrink-0">
                            <Image
                                src={avatar}
                                alt={author}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Info */}
                        <div className="space-y-4 pt-1">
                            <div>
                                <h1 className="text-3xl md:text-[32px] font-bold text-gray-900 leading-tight">
                                    {author}
                                </h1>
                                {location && (
                                    <p className="text-[15px] text-gray-500 font-medium mt-1">
                                        {location}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-3 justify-center md:justify-start">
                                <button className="px-5 py-2.5 bg-gray-900 text-white text-[14px] font-bold rounded-full hover:bg-gray-800 transition-colors">
                                    Follow
                                </button>
                                <button className="px-5 py-2.5 bg-white text-gray-700 border border-gray-200 text-[14px] font-bold rounded-full hover:border-gray-300 hover:bg-gray-50 transition-colors">
                                    Hire Me
                                </button>
                                <button className="p-2.5 text-gray-500 border border-gray-200 rounded-full hover:border-gray-300 hover:bg-gray-50 transition-colors">
                                    <span className="sr-only">More options</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs - Profile Subpages (Visual only for now) */}
                    <div className="flex items-center justify-center md:justify-start gap-8 mt-12 border-b border-gray-100">
                        <button className="pb-4 text-[14px] font-medium text-gray-900 border-b-2 border-gray-900">
                            Work
                        </button>
                        <button className="pb-4 text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors">
                            Collections
                        </button>
                        <button className="pb-4 text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors">
                            Liked Shots
                        </button>
                        <button className="pb-4 text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors">
                            About
                        </button>
                    </div>
                </div>
            </div>

            {/* Shots Grid */}
            <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-gray-50/50 min-h-[50vh]">
                <Grid author={slug} />
            </div>
        </main>
    );
}

export async function generateStaticParams() {
    // Get unique authors
    const authors = new Set(elements.map(e => e.author.toLowerCase().replace(/[^a-z0-9]+/g, '-')));
    return Array.from(authors).map(slug => ({
        slug
    }));
}
