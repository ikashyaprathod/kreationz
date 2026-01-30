import Image from 'next/image';
import Link from 'next/link';
import { Element } from '@/data/elements';

interface CardProps {
    element: Element;
}

export default function Card({ element }: CardProps) {
    return (
        <Link href={`/elements/${element.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-50">
                <Image
                    src={element.previewImage}
                    alt={element.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    unoptimized
                />
            </div>
            <div className="mt-2">
                <h3 className="text-xs font-semibold text-black truncate">{element.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{element.category}</p>
            </div>
        </Link>
    );
}
