"use client";

import { useQuery } from "@tanstack/react-query";
import EpisodesComponent from '../../../components/Episodes/Episodes';
import styles from '../characters/styles.module.css'

/**
 * Fetch all episodes from Rick and Morty API with pagination
 * @returns {Promise<Array>} Array of episodes
 */
async function fetchEpisodes() {
    let res = await fetch("https://rickandmortyapi.com/api/episode");
    let data = await res.json();

    let episodes = [];
    episodes = episodes.concat(data.results);
    let next = data.info.next;

    while (next != null) {
        res = await fetch(next);
        data = await res.json();
        episodes = episodes.concat(data.results);
        next = data.info.next;
    }

    return episodes;
}

function EpisodesPageComponent() {
    const { data: episodes, isLoading, isError, error } = useQuery({
        queryKey: ['episodes'],
        queryFn: fetchEpisodes,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
    });

    if (isLoading) {
        return (
            <div className={styles.content__consumer}>
                <div>
                    <h2>Loading episodes...</h2>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className={styles.content__consumer}>
                <div>
                    <h2>Error loading episodes</h2>
                    <p>{error.message}</p>
                </div>
            </div>
        );
    }

    return (  
        <div className={styles.content__consumer}>
            <div>
                <EpisodesComponent episodes={episodes} />
            </div>
        </div>
    );
}

export default EpisodesPageComponent;
