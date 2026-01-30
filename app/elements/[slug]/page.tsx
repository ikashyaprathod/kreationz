import { elements } from "@/data/elements";
import { notFound } from "next/navigation";
import Image from "next/image";
import BackLink from "@/components/BackLink";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const element = elements.find((e) => e.slug === slug);
    if (!element) return { title: "Not Found" };
    return {
        title: `${element.title} – Kreationz`,
        description: element.description,
    };
}

export default async function ElementPage({ params }: PageProps) {
    const { slug } = await params;
    const element = elements.find((e) => e.slug === slug);

    if (!element) {
        notFound();
    }

    return (
        <main className="max-w-[1000px] mx-auto px-6 py-12">
            <BackLink />

            <article>
                <div className="mb-10 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{element.category}</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-black tracking-tight">{element.title}</h1>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
                    <Image
                        src={element.previewImage}
                        alt={element.title}
                        fill
                        className="object-cover"
                        priority
                        unoptimized
                    />
                </div>

                <div className="mt-12 max-w-2xl mx-auto text-center">
                    <p className="text-lg text-gray-500 leading-relaxed font-medium">
                        {element.description}
                    </p>
                </div>
            </article>
        </main>
    );
}

export async function generateStaticParams() {
    return elements.map((e) => ({
        slug: e.slug,
    }));
}
