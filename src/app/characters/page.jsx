import CharactersComponent from "../../../components/Characters/Characters";
import styles from './styles.module.css'

// Force dynamic rendering to avoid build errors with external API
export const dynamic = 'force-dynamic';

/**
 * Fetch all characters from Rick and Morty API (with error handling)
 * @returns {Promise<Array>} Array of characters
 * @throws {Error} When API request fails
 */
async function fetchCharacters() {
    try {
        let res = await fetch("https://rickandmortyapi.com/api/character");
        
        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }
        
        let data = await res.json();

        let characters = [];
        characters = characters.concat(data.results);
        let next = data.info.next;

        while (next != null) {
            res = await fetch(next);
            
            if (!res.ok) {
                throw new Error(`API error fetching page: ${res.status}`);
            }
            
            data = await res.json();
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
