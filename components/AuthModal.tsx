'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
    const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const { login, signup, isLoading } = useAuth();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (mode === 'signup' && (!name || !username)) {
            setError('Please fill in all fields');
            return;
        }

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            if (mode === 'login') {
                await login(email, password);
            } else {
                await signup(name, username, email, password);
            }
            onClose();
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-white rounded-2xl w-full max-w-[400px] p-8 shadow-2xl relative animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {mode === 'login' ? 'Welcome back' : 'Create an account'}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {mode === 'login' ? 'Enter your details to sign in.' : 'Join the community of top designers.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'signup' && (
                        <>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5 ml-1">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 focus:bg-white transition-all font-medium"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5 ml-1">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 focus:bg-white transition-all font-medium"
                                    placeholder="johndoe"
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5 ml-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 focus:bg-white transition-all font-medium"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5 ml-1">
                            <label className="block text-xs font-bold uppercase text-gray-700">Password</label>
                            {mode === 'login' && (
                                <button type="button" className="text-xs font-medium text-gray-500 hover:text-black">
                                    Forgot?
                                </button>
                            )}
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 focus:bg-white transition-all font-medium"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                    >
                        {isLoading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    {mode === 'login' ? (
                        <>
                            Don't have an account?{' '}
                            <button
                                onClick={() => { setMode('signup'); setError(''); }}
                                className="font-bold text-gray-900 hover:underline"
                            >
                                Sign up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <button
                                onClick={() => { setMode('login'); setError(''); }}
                                className="font-bold text-gray-900 hover:underline"
                            >
                                Sign in
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
