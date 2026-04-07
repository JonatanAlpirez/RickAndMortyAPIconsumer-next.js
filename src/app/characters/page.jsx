"use client";

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
    const characters = data?.pages.flatMap(page => page.results) ?? [];

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
            <div>
                <CharactersComponent 
                    characters={characters} 
                    onLoadMore={fetchNextPage}
                    hasMore={hasNextPage}
                    isLoadingMore={isFetchingNextPage}
                />
            </div>
        </div>
    );
}

export default CharactersPageComponent;
