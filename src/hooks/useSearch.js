'use client';

import { useEffect } from 'react';
import { useState, useCallback } from 'react';
import { useDebounce } from 'use-debounce';

export function useSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [debouncedQuery] = useDebounce(query, 300); // 300ms debounce

    const performSearch = useCallback(async (searchQuery) => {
        if (!searchQuery || searchQuery.length < 2) {
            setResults([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=8`);
            if (!response.ok) throw new Error('Search failed');

            const data = await response.json();
            
            setResults(data);
        } catch (err) {
            console.error('error in search hook', err);

            setError(err.message);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Effect to trigger search when debounced query changes
    useEffect(() => {
        performSearch(debouncedQuery);

    }, [debouncedQuery, performSearch])

    return {
        query,
        setQuery,
        results,
        isLoading,
        error,
    };
}