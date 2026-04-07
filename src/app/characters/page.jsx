"use client";

import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import CharactersComponent from "../../../components/Characters/Characters";
import styles from './styles.module.css'

/**
 * Fetch characters page by page from Rick and Morty API
 * @returns {Promise<Object>} Paginated characters data
 */
async function fetchCharacters({ pageParam = 1 }) {
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${pageParam}`);
    
    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }
    
    return res.json();
}

function CharactersPageComponent() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Debounce search term by 300ms
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['characters'],
        queryFn: fetchCharacters,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.info.next ? lastPage.info.next.split('?page=')[1] : undefined,
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });

    // Flatten all pages into a single array of characters
    const allCharacters = data?.pages.flatMap(page => page.results) ?? [];

    // Filter characters locally based on debounced search term
    const characters = debouncedSearch
        ? allCharacters.filter(char => 
            char.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            char.species.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
        : allCharacters;

    if (isLoading) {
        return (
            <div className={styles.content__consumer}>
                <div>
                    <h2>Loading characters...</h2>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className={styles.content__consumer}>
                <div>
                    <h2>Error loading characters</h2>
                    <p>{error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.content__consumer}>
            <div style={{ padding: '10px', textAlign: 'center' }}>
                <input
                    type="text"
                    placeholder="Search characters by name or species..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: '10px 15px',
                        fontSize: '16px',
                        width: '80%',
                        maxWidth: '400px',
                        borderRadius: '8px',
                        border: '1px solid #ccc'
                    }}
                />
                {debouncedSearch && (
                    <p style={{ marginTop: '10px' }}>
                        Found {characters.length} of {allCharacters.length} characters
                    </p>
                )}
            </div>
            <CharactersComponent 
                characters={characters} 
                onLoadMore={fetchNextPage}
                hasMore={hasNextPage && !debouncedSearch}
                isLoadingMore={isFetchingNextPage}
            />
        </div>
    );
}

export default CharactersPageComponent;
