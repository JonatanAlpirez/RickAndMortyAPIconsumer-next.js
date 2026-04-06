import EpisodesComponent from '../../../components/Episodes/Episodes';
import styles from '../characters/styles.module.css'

// Force dynamic rendering to avoid build errors with external API
export const dynamic = 'force-dynamic';

/**
 * Fetch all episodes from Rick and Morty API (with error handling and rate limiting)
 * @returns {Promise<Array>} Array of episodes
 * @throws {Error} When API request fails after retries
 */
async function fetchEpisodes() {
    const API_BASE = "https://rickandmortyapi.com/api/episode";
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000;

    async function fetchWithRetry(url, retries = 0) {
        const res = await fetch(url);
        
        if (res.status === 429) {
            if (retries < MAX_RETRIES) {
                console.log(`Rate limited. Waiting ${RETRY_DELAY}ms before retry ${retries + 1}/${MAX_RETRIES}...`);
                await new Promise(r => setTimeout(r, RETRY_DELAY));
                return fetchWithRetry(url, retries + 1);
            }
            throw new Error('API rate limit exceeded. Please try again later.');
        }
        
        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }
        
        return res.json();
    }

    try {
        let data = await fetchWithRetry(API_BASE);

        let episodes = [];
        episodes = episodes.concat(data.results);
        let next = data.info.next;

        while (next != null) {
            await new Promise(r => setTimeout(r, 500));
            data = await fetchWithRetry(next);
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
