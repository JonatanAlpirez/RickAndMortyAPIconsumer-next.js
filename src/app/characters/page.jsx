"use client";

import { useQuery } from "@tanstack/react-query";
import CharactersComponent from "../../../components/Characters/Characters";
import styles from './styles.module.css'

/**
 * Fetch all characters from Rick and Morty API with pagination
 * @returns {Promise<Array>} Array of characters
 */
async function fetchCharacters() {
    let res = await fetch("https://rickandmortyapi.com/api/character");
    let data = await res.json();

    let characters = [];
    characters = characters.concat(data.results);
    let next = data.info.next;

    while (next != null) {
        res = await fetch(next);
        data = await res.json();
        characters = characters.concat(data.results);
        next = data.info.next;
    }

    return characters;
}

function CharactersPageComponent() {
    const { data: characters, isLoading, isError, error } = useQuery({
        queryKey: ['characters'],
        queryFn: fetchCharacters,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
    });

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
                <CharactersComponent characters={characters} />
            </div>
        </div>
    );
}

export default CharactersPageComponent;
