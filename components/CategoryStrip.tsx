export default function CategoryStrip() {
    const categories = [
        'All',
        'Newsletters',
        'Forms',
        'Components',
        'Web Design',
        'Mobile',
        'Typography',
        'Illustration'
    ];

    return (
        <div className="border-y border-gray-100 bg-white sticky top-20 z-40">
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
                <nav className="flex items-center gap-6 overflow-x-auto py-4 scrollbar-hide">
                    {categories.map((category, index) => (
                        <button
                            key={category}
                            className={`text-sm whitespace-nowrap transition-colors ${index === 0
                                ? 'font-bold text-black'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                            disabled
                        >
                            {category}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
