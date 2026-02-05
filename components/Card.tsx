'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Element } from '@/data/elements';
import { useState } from 'react';
import { useSaved } from '@/context/SavedContext';
import { useAuth } from '@/context/AuthContext';
import AuthModal from './AuthModal';

interface CardProps {
    element: Element;
}

export default function Card({ element }: CardProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(element.likes);
    const [viewCount, setViewCount] = useState(parseInt(element.views.replace('k', '000'), 10) || 0);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    const { isSaved, toggleSaved } = useSaved();
    const { user } = useAuth();
    const saved = isSaved(element.slug);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            setShowAuthModal(true);
            return;
        }

        if (isLiked) {
            setLikeCount(prev => prev - 1);
        } else {
            setLikeCount(prev => prev + 1);
        }
        setIsLiked(!isLiked);
    };

    const handleFollow = () => {
        if (!user) {
            setShowAuthModal(true);
            return;
        }
        setIsFollowing(!isFollowing);
    };

    const handleVisit = () => {
        // Simulate view increment logic locally
        setViewCount(prev => prev + 1);
    };

    // Format view count for display
    const displayViews = viewCount >= 1000 ? (viewCount / 1000).toFixed(1).replace('.0', '') + 'k' : viewCount.toString();

    return (
        <div className="group block relative">
            <Link href={`/elements/${element.slug}`} onClick={handleVisit} className="block">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                        src={element.previewImage}
                        alt={element.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        unoptimized
                    />

                    {/* Overlay Gradient & Content */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute bottom-0 left-0 w-full p-4 flex items-end justify-between translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                        {/* Title */}
                        <div className="flex-1 min-w-0 mr-3">
                            <p className="text-white font-semibold text-base truncate drop-shadow-sm">{element.title}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (!user) {
                                        setShowAuthModal(true);
                                        return;
                                    }
                                    toggleSaved(element.slug);
                                }}
                                className={`h-9 w-9 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-colors shadow-sm ${saved ? 'text-black fill-black' : 'text-gray-900'}`}
                            >
                                <svg className={`w-5 h-5 ${saved ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                            </button>
                            <button
                                onClick={(e) => {
                                    handleLike(e);
                                }}
                                className={`h-9 w-9 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-colors shadow-sm ${isLiked ? 'text-pink-500' : 'text-gray-900'}`}
                            >
                                <svg className={`w-5 h-5 ${isLiked ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </Link>

            {/* Footer / Meta Info */}
            <div className="mt-3 flex items-center justify-between">
                {/* Left: Author Info with Hover Card */}
                <div className="relative group/author">
                    <Link href={`/designer/${element.author.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden relative">
                            <Image src={element.avatar} alt={element.author} width={20} height={20} className="object-cover" unoptimized />
                        </div>
                        <span className="text-sm font-medium text-gray-900 group-hover:text-black transition-colors">{element.author}</span>
                        {element.isTeam && (
                            <span className="px-1 py-[1px] text-[9px] font-bold text-white bg-gray-400 rounded">TEAM</span>
                        )}
                        {element.isPro && !element.isTeam && (
                            <span className="px-1 py-[1px] text-[9px] font-bold text-white bg-gray-400 rounded">PRO</span>
                        )}
                    </Link>

                    {/* Profile Hover Card */}
                    <div className="absolute bottom-full left-0 pb-4 w-[480px] opacity-0 invisible group-hover/author:opacity-100 group-hover/author:visible transition-all duration-300 z-50 -translate-x-4 translate-y-2 group-hover/author:translate-y-0 pointer-events-none group-hover/author:pointer-events-auto">
                        <div className="bg-white rounded-xl shadow-2xl p-5 border border-gray-100">
                            <div className="flex items-center justify-between mb-5">
                                {/* Left: User Info */}
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full overflow-hidden relative border border-gray-100">
                                        <Image src={element.avatar} alt={element.author} fill className="object-cover" unoptimized />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-base text-gray-900 leading-tight">{element.author}</h4>
                                            {element.isTeam && <span className="px-1.5 py-0.5 text-[10px] font-bold text-white bg-gray-900 rounded-md">TEAM</span>}
                                        </div>
                                        <p className="text-sm text-gray-500">{element.location || 'New York City, NY'}</p>
                                    </div>
                                </div>

                                {/* Right: Buttons */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleFollow}
                                        className={`px-4 py-2 border font-medium rounded-lg text-sm transition-colors ${isFollowing
                                            ? 'bg-gray-50 border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50'
                                            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {isFollowing ? 'Following' : 'Follow'}
                                    </button>
                                    <a
                                        href="mailto:hello@kreationz.com"
                                        className="px-4 py-2 bg-gray-900 text-white font-medium rounded-lg text-sm hover:bg-gray-800 transition-colors"
                                    >
                                        Get in touch
                                    </a>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                {/* Mock Recent Shots with Links */}
                                {[1, 2, 3].map((i) => (
                                    <Link key={i} href={`/elements/shot-${i}`} className="aspect-[4/3] rounded-md bg-gray-100 overflow-hidden relative block hover:opacity-90 transition-opacity">
                                        <Image src={`/previews/shot-${i}.png`} fill className="object-cover" alt={`Shot ${i}`} unoptimized />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Stats */}
                <div className="flex items-center gap-3 text-gray-400 text-xs font-medium">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-1.5 transition-colors ${isLiked ? 'text-pink-500 hover:text-pink-600' : 'hover:text-gray-600'}`}
                    >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span>{likeCount}</span>
                    </button>
                    <div className="flex items-center gap-1.5 hover:text-gray-600 transition-colors">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                        <span>{displayViews}</span>
                    </div>
                </div>
            </div>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                initialMode="login"
            />
        </div>
    );
}
