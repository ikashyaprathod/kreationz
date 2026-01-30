import Link from 'next/link';

export default function BackLink() {
    return (
        <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-black transition-colors mb-12"
        >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to gallery
        </Link>
    );
}
