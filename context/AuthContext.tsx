'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    username: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface UserDB {
    [email: string]: {
        user: User;
        password: string; // Storing plain text for client-side demo
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Load session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('kreation_session');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error('Failed to parse user session', e);
                localStorage.removeItem('kreation_session');
            }
        }
        setIsLoading(false);
    }, []);

    // Helper to get DB
    const getUserDB = (): UserDB => {
        const db = localStorage.getItem('kreation_users_db');
        return db ? JSON.parse(db) : {};
    };

    const login = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const db = getUserDB();
        const record = db[email];

        if (!record) {
            setIsLoading(false);
            throw new Error('User not found. Please sign up.');
        }

        if (record.password !== password) {
            setIsLoading(false);
            throw new Error('Invalid password.');
        }

        setUser(record.user);
        localStorage.setItem('kreation_session', JSON.stringify(record.user));
        setIsLoading(false);
    };

    const signup = async (name: string, username: string, email: string, password: string): Promise<void> => {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const db = getUserDB();

        // Check if email exists
        if (db[email]) {
            setIsLoading(false);
            throw new Error('User with this email already exists.');
        }

        // Check if username exists (inefficient loop but fine for client-side demo)
        const usernameExists = Object.values(db).some(record => record.user.username === username);
        if (usernameExists) {
            setIsLoading(false);
            throw new Error('Username is already taken.');
        }

        const newUser: User = {
            id: `u_${Date.now()}`,
            name,
            email,
            username,
            avatar: '/kashyap.png' // Default avatar
        };

        // Save to DB
        db[email] = { user: newUser, password };
        localStorage.setItem('kreation_users_db', JSON.stringify(db));

        // Set Session
        setUser(newUser);
        localStorage.setItem('kreation_session', JSON.stringify(newUser));

        setIsLoading(false);
        router.push(`/user/${username}`);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('kreation_session');
        router.refresh();
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            login,
            signup,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
