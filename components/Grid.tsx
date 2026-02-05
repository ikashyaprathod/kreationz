import { elements } from '@/data/elements';
import Card from './Card';

interface GridProps {
    category?: string;
    sort?: string;
    author?: string; // New prop for filtering by author slug
}

export default function Grid({ category = 'All', sort = 'Popular', author }: GridProps) {
    const filteredElements = elements.filter((el) => {
        // Filter by Author if provided (slug matching)
        if (author) {
            const elAuthorSlug = el.author.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            if (elAuthorSlug !== author) return false;
        }

        if (category === 'All') return true;

        // Map UI categories to Data categories
        if (category === 'Mobile') return el.category === 'App Design';
        if (category === 'Components') return el.category === 'UI Blocks' || el.category === 'Elements';
        if (category === 'Typography') return el.category === 'Editorial'; // Approximate match

        return el.category === category;
    });

    // Sort elements based on sort prop
    const sortedElements = [...filteredElements].sort((a, b) => {
        if (sort === 'Popular') {
            return b.likes - a.likes; // Sort by likes descending
        }
        // For "New & Noteworthy", we could sort by date if available, or randomize/default
        // Since we don't have dates, we'll assume the array order is "Newest" or specific curation
        return 0;
    });

    return (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-8">
            {sortedElements.map((el) => (
                <Card key={el.slug} element={el} />
            ))}
            {sortedElements.length === 0 && (
                <div className="col-span-full py-20 text-center text-gray-500">
                    <p>No shots found for {category}.</p>
                </div>
            )}
        </section>
    );
}
