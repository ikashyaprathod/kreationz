'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSaved } from '@/context/SavedContext';
import { useAuth } from '@/context/AuthContext';
import AuthModal from './AuthModal';

interface MegaMenuItem {
    title: string;
    description: string;
    href: string;
}

interface MegaMenuSection {
    leftItems: MegaMenuItem[];
    rightItems?: { title: string; href: string }[];
}

const megaMenuData: Record<string, MegaMenuSection> = {
    inspiration: {
        leftItems: [
            { title: 'Blog', description: 'Design inspiration, stories, and tips', href: '/' },
            { title: 'Playoffs', description: 'Join creative challenges and show your skills', href: '/' },
            { title: 'Help Center', description: 'Get quick answers and learn how to use Dribbble', href: '/' },
            { title: 'Follow Us', description: 'social', href: '/' },
        ],
    },
    findWork: {
        leftItems: [
            { title: 'Browse Project Briefs', description: 'Send proposals to clients', href: '/' },
            { title: 'Add a Service', description: 'Let clients purchase your services', href: '/' },
            { title: 'Apply to Full-Time Jobs', description: 'View open design roles', href: '/' },
        ],
        rightItems: [
            { title: 'Upgrade to Pro →', href: '/' },
            { title: 'Advertise with Us →', href: '/' },
        ],
    },
    learnDesign: {
        leftItems: [
            { title: 'Popular', description: 'trending', href: '/' },
            { title: 'New and Noteworthy', description: 'featured', href: '/' },
            { title: 'Product Design', description: 'category', href: '/' },
            { title: 'Web Design', description: 'category', href: '/' },
            { title: 'Animation', description: 'category', href: '/' },
            { title: 'Branding', description: 'category', href: '/' },
        ],
    },
};

export default function Header() {
    const { savedIds } = useSaved();
    const { user, logout } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
    const navItems = [
        { label: 'Explore', key: 'learnDesign' }, // Maps 'Explore' label to existing 'learnDesign' data
        { label: 'Find Work', key: 'findWork' },
        { label: 'Inspiration', key: 'inspiration' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 lg:h-21 py-4 sm:py-5 flex items-center justify-between">
                {/* Left Group: Logo + Navigation */}
                <div className="flex items-center gap-8 lg:gap-16">
                    {/* Brand */}
                    <Link
                        href="/"
                        className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold italic text-black leading-none hover:opacity-70 transition-opacity"
                    >
                        Kreationz
                    </Link>

                    {/* Primary Navigation - Hidden on mobile/tablet */}
                    <nav className="hidden xl:flex items-center gap-8">
                        {navItems.map((item) => (
                            <div key={item.key} className="relative group">
                                {/* Nav Button */}
                                <button className="flex items-center gap-2 text-[16px] font-semibold text-black leading-[1.2] transition-colors hover:text-gray-600">
                                    {item.label}
                                    <svg
                                        className="w-5 h-5 text-gray-700 transition-all duration-200 ease-out group-hover:rotate-180 group-hover:-translate-y-px group-focus-within:rotate-180"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Mega Menu - Pure CSS Hover */}
                                <div className={`absolute top-full pt-4 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-200 ease-out z-50 ${item.key === 'findWork' ? '-left-10' : '-left-5'}`}>
                                    <div className="max-w-[1280px]">
                                        <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 ${item.key === 'findWork' ? 'py-6 px-7 min-w-[420px] max-w-[540px]' : 'py-6 px-0 w-[260px]'}`}>
                                            {/* Two-column layout for Find Work, single column for others */}
                                            {item.key === 'findWork' && megaMenuData[item.key].rightItems ? (
                                                // Two-column layout for Find Work
                                                <div className="grid grid-cols-[1.5fr_1fr] gap-8">
                                                    {/* Left column - main items */}
                                                    <div className="space-y-4">
                                                        {megaMenuData[item.key].leftItems.map((menuItem, idx) => (
                                                            <Link key={idx} href={menuItem.href} className="block group/item">
                                                                <div className="rounded-lg px-3 py-3 hover:bg-gray-50 transition-colors flex gap-3.5 items-start">
                                                                    {/* Icons for Find Work items */}
                                                                    {menuItem.title === 'Browse Project Briefs' && (
                                                                        <svg className="w-5 h-5 text-gray-800 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                        </svg>
                                                                    )}
                                                                    {menuItem.title === 'Add a Service' && (
                                                                        <svg className="w-5 h-5 text-gray-800 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                                        </svg>
                                                                    )}
                                                                    {menuItem.title === 'Apply to Full-Time Jobs' && (
                                                                        <svg className="w-5 h-5 text-gray-800 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                                        </svg>
                                                                    )}

                                                                    <div className="flex-1">
                                                                        <h4 className="text-[16px] leading-none font-semibold text-gray-900 group-hover/item:text-black">
                                                                            {menuItem.title}
                                                                        </h4>
                                                                        <p className="text-[14px] text-gray-500 leading-tight mt-1">
                                                                            {menuItem.description}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>

                                                    {/* Right column - quick links for Find Work */}
                                                    <div className="space-y-2.5 pt-1">
                                                        {megaMenuData[item.key].rightItems!.map((rightItem, idx) => (
                                                            <Link
                                                                key={idx}
                                                                href={rightItem.href}
                                                                className="block text-[15px] font-medium text-gray-700 hover:text-black transition-colors py-1.5"
                                                            >
                                                                {rightItem.title}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                // Single column layout for other menus
                                                <div className="space-y-2">
                                                    {megaMenuData[item.key].leftItems.map((menuItem, idx) => {
                                                        const isFeatured = menuItem.description === 'trending' || menuItem.description === 'featured';
                                                        const isCategory = menuItem.description === 'category';
                                                        const isSocial = menuItem.description === 'social';
                                                        const hasDescription = menuItem.description && !isFeatured && !isCategory && !isSocial;
                                                        const showSeparator = item.key === 'learnDesign' && idx === 1;
                                                        const showInspirationSeparator = item.key === 'inspiration' && idx === 2;

                                                        return (
                                                            <div key={idx}>
                                                                {isSocial ? (
                                                                    // Social Media Section for Inspiration
                                                                    <div className="px-3 py-4">
                                                                        <p className="text-[13px] text-gray-500 mb-3">Follow Us</p>
                                                                        <div className="flex items-center gap-3 flex-wrap">
                                                                            <a href="/" className="text-gray-600 hover:text-black transition-colors">
                                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                                                            </a>
                                                                            <a href="/" className="text-gray-600 hover:text-black transition-colors">
                                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                                                            </a>
                                                                            <a href="/" className="text-gray-600 hover:text-black transition-colors">
                                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" /></svg>
                                                                            </a>
                                                                            <a href="/" className="text-gray-600 hover:text-black transition-colors">
                                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                                                            </a>
                                                                            <a href="/" className="text-gray-600 hover:text-black transition-colors">
                                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    // Regular menu item
                                                                    <Link href={menuItem.href} className="block group/item">
                                                                        <div className={`px-5 hover:bg-gray-50 transition-colors flex gap-3 ${hasDescription ? 'py-2.5 items-start' : 'py-2 items-center'}`}>
                                                                            {/* Icons */}
                                                                            {menuItem.description === 'trending' && (
                                                                                <svg className="w-[18px] h-[18px] text-black flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                                                </svg>
                                                                            )}
                                                                            {menuItem.description === 'featured' && (
                                                                                <svg className="w-[18px] h-[18px] text-black flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                                                                </svg>
                                                                            )}
                                                                            {menuItem.title === 'Blog' && (
                                                                                <svg className="w-5 h-5 text-gray-800 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                                                                </svg>
                                                                            )}
                                                                            {menuItem.title === 'Playoffs' && (
                                                                                <svg className="w-5 h-5 text-gray-800 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                                                </svg>
                                                                            )}
                                                                            {menuItem.title === 'Help Center' && (
                                                                                <svg className="w-5 h-5 text-gray-800 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                                                                </svg>
                                                                            )}

                                                                            <div className="flex-1">
                                                                                <h4 className={`text-[15px] leading-none group-hover/item:text-black ${isFeatured || hasDescription ? 'font-semibold text-gray-900' : 'font-normal text-gray-900'}`}>
                                                                                    {menuItem.title}
                                                                                </h4>
                                                                                {hasDescription && (
                                                                                    <p className="text-[13px] text-gray-500 leading-tight mt-1.5">
                                                                                        {menuItem.description}
                                                                                    </p>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                )}

                                                                {/* Separators */}
                                                                {showSeparator && <div className="my-4 mx-5 border-t border-gray-100"></div>}
                                                                {showInspirationSeparator && <div className="my-4 mx-3 border-t border-gray-200"></div>}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}

                                            {/* Bottom Helper - Hide for Explore/LearnDesign */}
                                            {item.key !== 'learnDesign' && (
                                                <div className="mt-3 pt-3 border-t border-gray-100">
                                                    <Link
                                                        href="/"
                                                        className="block px-2 py-1 text-[12px] text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
                                                    >
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                        {item.key === 'findWork' ? 'Learn more about getting hired on Dribbble →' : `View all in ${item.label} →`}
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Right Group: Auth & Actions */}
                <div className="flex items-center gap-3 sm:gap-4">
                    {/* Search - Visible on Mobile only */}
                    <button className="sm:hidden p-2 text-gray-900">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    {user ? (
                        <>
                            {/* Saved Items Button */}
                            <button className="relative p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-50 group">
                                <span className="sr-only">Saved Items</span>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                {savedIds.length > 0 && (
                                    <span className="absolute top-1 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white ring-2 ring-white">
                                        {savedIds.length}
                                    </span>
                                )}
                                {/* Tooltip */}
                                <div className="absolute top-full right-0 mt-2 w-max px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    {savedIds.length} Saved {savedIds.length === 1 ? 'Shot' : 'Shots'}
                                </div>
                            </button>

                            {/* User Menu */}
                            <div className="relative group/user z-50">
                                <button className="flex items-center gap-2">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 overflow-hidden relative">
                                        <Image
                                            src={user.avatar || '/kashyap.png'}
                                            alt={user.name}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                    <svg className="w-4 h-4 text-gray-400 group-hover/user:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown */}
                                <div className="absolute top-full right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all duration-200 transform origin-top-right">
                                    <div className="p-4 border-b border-gray-100">
                                        <p className="font-bold text-gray-900 truncate">{user.name}</p>
                                        <p className="text-sm text-gray-500 truncate">@{user.username}</p>
                                    </div>
                                    <div className="py-2">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black">Profile</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black">Edit Profile</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black">Account Settings</a>
                                    </div>
                                    <div className="py-2 border-t border-gray-100">
                                        <button
                                            onClick={logout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                                className="inline-flex items-center justify-center h-10 px-6 text-sm font-bold text-white transition-all duration-200 bg-gray-900 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                            >
                                Log in
                            </button>
                        </>
                    )}

                    {/* Mobile Menu Button - Keeping placeholder for now */}
                    <button className="xl:hidden p-2 text-gray-900 ml-1">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                initialMode={authMode}
            />
        </header>
    );
}
