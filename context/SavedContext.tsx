'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SavedContextType {
    savedIds: string[];
    toggleSaved: (id: string) => void;
    isSaved: (id: string) => boolean;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export function SavedProvider({ children }: { children: ReactNode }) {
    const [savedIds, setSavedIds] = useState<string[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem('kreation_saved_items');
        if (stored) {
            setSavedIds(JSON.parse(stored));
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('kreation_saved_items', JSON.stringify(savedIds));
    }, [savedIds]);

    const toggleSaved = (id: string) => {
        setSavedIds(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const isSaved = (id: string) => savedIds.includes(id);

    return (
        <SavedContext.Provider value={{ savedIds, toggleSaved, isSaved }}>
            {children}
        </SavedContext.Provider>
    );
}

export function useSaved() {
    const context = useContext(SavedContext);
    if (context === undefined) {
        throw new Error('useSaved must be used within a SavedProvider');
    }
    return context;
}
