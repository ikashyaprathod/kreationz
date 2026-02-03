'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function CategoryStrip() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get('category') || 'All';
    const activeSort = searchParams.get('sort') || 'Popular';

    const categories = [
        'Discover',
        'Animation',
        'Branding',
        'Illustration',
        'Mobile',
        'Print',
        'Product Design',
        'Typography',
        'Web Design'
    ];

    const activeMap = activeCategory === 'All' ? 'Discover' : activeCategory;

    const handleCategoryClick = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === 'Discover') {
            params.delete('category');
        } else {
            params.set('category', category);
        }
        router.push(`/?${params.toString()}`);
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleFilterSelect = (type: string) => {
        setIsDropdownOpen(false);
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', type);
        router.push(`/?${params.toString()}`);
    };

    return (
        <div className="w-full bg-white sticky top-20 z-40 py-4 border-b border-gray-100/50">
            <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col md:flex-row items-center justify-center">

                {/* Left: Popular Filter Dropdown */}
                <div className="w-full md:w-auto md:absolute md:left-6 z-50 mb-4 md:mb-0">
                    <div className="relative group">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center justify-between w-full md:w-auto gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors"
                        >
                            {activeSort}
                            <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 p-1.5 overflow-hidden z-50">
                                <button
                                    onClick={() => handleFilterSelect('Popular')}
                                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors ${activeSort === 'Popular' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    Popular
                                    {activeSort === 'Popular' && <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                                </button>
                                <button
                                    onClick={() => handleFilterSelect('New & Noteworthy')}
                                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors ${activeSort === 'New & Noteworthy' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    New & Noteworthy
                                    {activeSort === 'New & Noteworthy' && <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Center: Category List */}
                <nav className="flex items-center justify-start md:justify-center gap-1 overflow-x-auto w-full md:w-auto scrollbar-hide pb-2 md:pb-0 px-1">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                            className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-200 ${activeMap === category
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-500 hover:text-gray-900 bg-transparent'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
