'use client';

import { useAuth } from '@/context/AuthContext';
import { useSaved } from '@/context/SavedContext';
import { elements } from '@/data/elements';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Added for internal use if needed
import Card from '@/components/Card';

export default function UserProfilePage({ params }: { params: { username: string } }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const { savedIds } = useSaved();
    const [activeTab, setActiveTab] = useState<'saved' | 'collections' | 'likes'>('saved');

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/');
        }
    }, [user, isLoading, router]);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user) return null; // Will redirect via useEffect

    // Verify username matches (optional security check if profiles are private-ish)
    // For now, if logged in, we let them see their own profile. 
    // If we want public viewer profiles, we'd fetch that user's data. 
    // Given requirements say "User profile is personal space", we assume we show the logged-in user's view.

    const savedElements = elements.filter(el => savedIds.includes(el.slug));

    // Mock data for other tabs
    const likedElements = elements.slice(0, 4);

    return (
        <main className="min-h-screen pt-24 pb-20 bg-white">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="flex flex-col items-center justify-center text-center mb-12">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 relative">
                        <Image
                            src={user.avatar || '/kashyap.png'}
                            alt={user.name}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{user.name}</h1>
                    <p className="text-gray-500 text-sm sm:text-base mb-6">@{user.username}</p>

                    {/* Tabs */}
                    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full">
                        <button
                            onClick={() => setActiveTab('saved')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'saved'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Saved
                        </button>
                        <button
                            onClick={() => setActiveTab('collections')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'collections'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Collections
                        </button>
                        <button
                            onClick={() => setActiveTab('likes')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'likes'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Likes
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                {/* Content Grid */}
                {activeTab === 'saved' && (
                    <>
                        {savedElements.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-8">
                                {savedElements.map((element) => (
                                    <Card key={element.slug} element={element} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-gray-400">
                                <p>No saved items yet. Explore the gallery to save some.</p>
                                <button
                                    onClick={() => router.push('/')}
                                    className="mt-4 px-6 py-2 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-colors"
                                >
                                    Browse Inspiration
                                </button>
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'likes' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-8">
                        {likedElements.map((element) => (
                            <Card key={element.slug} element={element} />
                        ))}
                    </div>
                )}

                {activeTab === 'collections' && (
                    <div className="text-center py-20 text-gray-400">
                        <p>Collections coming soon.</p>
                    </div>
                )}
            </div>
        </main>
    );
} 
