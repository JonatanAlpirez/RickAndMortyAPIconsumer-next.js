import EpisodesComponent from '../../../components/Episodes/Episodes';
import styles from '../characters/styles.module.css'

// Force dynamic rendering to avoid build errors with external API
export const dynamic = 'force-dynamic';

/**
 * Fetch all episodes from Rick and Morty API (with error handling)
 * @returns {Promise<Array>} Array of episodes
 * @throws {Error} When API request fails
 */
async function fetchEpisodes() {
    try {
        let res = await fetch("https://rickandmortyapi.com/api/episode");
        
        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }
        
        let data = await res.json();

        let episodes = [];
        episodes = episodes.concat(data.results);
        let next = data.info.next;

        while (next != null) {
            res = await fetch(next);
            
            if (!res.ok) {
                throw new Error(`API error fetching page: ${res.status}`);
            }
            
            data = await res.json();
            episodes = episodes.concat(data.results);
            next = data.info.next;
        }

        return episodes;
    } catch (error) {
        console.error('Error fetching episodes:', error);
        throw error;
    }
}

async function EpisodesPageComponent() {
    let episodes = [];
    let error = null;

    try {
        episodes = await fetchEpisodes();
    } catch (e) {
        error = e.message;
    }

    if (error) {
        return (
            <div className={styles.content__consumer}>
                <div>
                    <h2>Error loading episodes</h2>
                    <p>{error}</p>
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
