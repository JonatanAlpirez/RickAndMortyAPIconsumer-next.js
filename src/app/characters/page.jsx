import CharactersComponent from "../../../components/Characters/Characters";
import styles from './styles.module.css'

// Force dynamic rendering to avoid build errors with external API
export const dynamic = 'force-dynamic';

/**
 * Fetch all characters from Rick and Morty API (with error handling and rate limiting)
 * @returns {Promise<Array>} Array of characters
 * @throws {Error} When API request fails after retries
 */
async function fetchCharacters() {
    const API_BASE = "https://rickandmortyapi.com/api/character";
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000; // 2 seconds
    
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

        let characters = [];
        characters = characters.concat(data.results);
        let next = data.info.next;

        while (next != null) {
            // Small delay to avoid rate limiting
            await new Promise(r => setTimeout(r, 500));
            
            data = await fetchWithRetry(next);
            characters = characters.concat(data.results);
            next = data.info.next;
        }

        return characters;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
}

async function CharactersPageComponent() {
    let characters = [];
    let error = null;

    try {
        characters = await fetchCharacters();
    } catch (e) {
        error = e.message;
    }

    if (error) {
        return (
            <div className={styles.content__consumer}>
                <div>
                    <h2>Error loading characters</h2>
                    <p>{error}</p>
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
