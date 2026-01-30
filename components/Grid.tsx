import { elements } from '@/data/elements';
import Card from './Card';

export default function Grid() {
    return (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 gap-y-6">
            {elements.map((el) => (
                <Card key={el.slug} element={el} />
            ))}
        </section>
    );
}
