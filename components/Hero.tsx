'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    const [activeTab, setActiveTab] = useState<'shots' | 'designers' | 'services'>('shots');
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e?: FormEvent) => {
        e?.preventDefault();
        if (searchQuery.trim()) {
            console.log('Search query:', searchQuery);
            // Uncomment when search page exists:
            // router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const popularTags = ['dashboard', 'landing page', 'e-commerce', 'logo', 'card', 'icons'];

    return (
        <section className="w-full overflow-hidden bg-white">
            {/* Hero Content - Responsive layout */}
            <div className="max-w-wide mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-12">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                    {/* Left Column - Content */}
                    <div className="space-y-6 sm:space-y-8">
                        {/* Headline */}
                        <div>
                            <h1 className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-bold text-gray-900 leading-[1.1] mb-4 sm:mb-6 tracking-tight">
                                Discover the World's Top Designers
                            </h1>
                            <p className="text-[16px] sm:text-[18px] md:text-[20px] text-gray-600 leading-[1.6] max-w-2xl">
                                Explore work from the most talented and accomplished designers ready to take on your next project.
                            </p>
                        </div>

                        {/* Functional Category Tabs */}
                        <div className="flex gap-3 flex-wrap">
                            <button
                                onClick={() => setActiveTab('shots')}
                                className={`px-4 sm:px-6 py-2 sm:py-2.5 text-[14px] sm:text-[15px] font-semibold rounded-full flex items-center gap-2 transition-all duration-200 ${activeTab === 'shots'
                                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/10'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                                Shots
                            </button>
                            <button
                                onClick={() => setActiveTab('designers')}
                                className={`px-4 sm:px-6 py-2 sm:py-2.5 text-[14px] sm:text-[15px] font-semibold rounded-full flex items-center gap-2 transition-all duration-200 ${activeTab === 'designers'
                                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/10'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                                Designers
                            </button>
                            <button
                                onClick={() => setActiveTab('services')}
                                className={`px-4 sm:px-6 py-2 sm:py-2.5 text-[14px] sm:text-[15px] font-semibold rounded-full flex items-center gap-2 transition-all duration-200 ${activeTab === 'services'
                                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/10'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                </svg>
                                Services
                            </button>
                        </div>

                        {/* Functional Search Input */}
                        <form onSubmit={handleSearch} className="relative group">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="What type of design are you interested in?"
                                className="w-full px-8 py-5 pr-16 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 focus:border-pink-300 text-[16px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all duration-300"
                            />
                            <button
                                type="submit"
                                onClick={handleSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                            >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </form>

                        {/* Popular Tags */}
                        <div className="flex items-center gap-3 flex-wrap pt-2">
                            <span className="text-[14px] text-gray-500">Popular:</span>
                            {popularTags.map((tag, idx) => (
                                <button
                                    key={idx}
                                    className="px-4 py-1.5 text-[13px] text-gray-600 bg-white border border-gray-200 rounded-full hover:border-gray-900 hover:text-black transition-colors"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Robot Image - Hidden on mobile */}
                    <div className="relative w-full hidden lg:flex items-center justify-center">
                        <div className="w-full h-[480px] xl:h-[540px] rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl bg-gray-900 transform transition-transform duration-500 hover:scale-[1.01]">
                            <video
                                src="/SM.webm"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="object-cover w-full h-full opacity-90"
                            />
                        </div>
                        {/* Designer Credit */}
                        <Link href="/designer/kashyap-rathod" className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center gap-3 hover:bg-white transition-all cursor-pointer group">
                            <div className="w-8 h-8 relative rounded-full overflow-hidden border border-gray-100">
                                <Image
                                    src="/kashyap.png"
                                    alt="Kashyap Rathod"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[13px] font-bold text-gray-900 leading-tight group-hover:text-pink-600 transition-colors">Kashyap Rathod</span>
                                <span className="text-[10px] font-medium text-gray-500 leading-tight">Pro Designer</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Full-Width Project Brief Section */}
            <div className="max-w-wide mx-auto px-4 sm:px-6 pb-6 sm:pb-8">
                <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-200 w-full">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div className="flex items-center gap-2 flex-wrap text-[13px] sm:text-[14px]">
                        <span className="font-bold text-gray-900">Start a Project Brief</span>
                        <span className="px-2 py-0.5 bg-pink-100 text-pink-600 text-[10px] sm:text-xs font-bold rounded uppercase">New</span>
                        <span className="text-gray-600 hidden sm:inline">
                            Tell us what you need and instantly connect with world-class talent ready to work on your project.
                        </span>
                        <span className="text-gray-600 sm:hidden">
                            Connect with world-class talent for your project.
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
