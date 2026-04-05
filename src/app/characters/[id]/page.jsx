import CharacterExpandedComponent from "../../../../components/CharacterExpanded/CharacterExpanded";
import styles from '../styles.module.css"

// Force dynamic rendering to avoid build errors with external API
export const dynamic = 'force-dynamic';

/**
 * Fetch a single character by ID from the Rick and Morty API
 * @param {string|number} id - Character ID
 * @returns {Promise<Object>} Character data
 * @throws {Error} When API request fails
 */
async function fetchOneCharacter(id) {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    
    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }
    
    const data = await res.json();
    return data;
}

async function OneCharacter({ params }) {
    let character;
    let error = null;

    try {
        character = await fetchOneCharacter(params.id);
    } catch (e) {
        error = e.message;
        console.error('Error fetching character:', e);
    }

    if (error) {
        return (  
            <section className={styles.character__main}>
                <div className={styles.character__card}>
                    <h1>Error loading character</h1>
                    <p>{error}</p>
                </div>
            </section>
        );
    }

    return (  
        <section>
            <CharacterExpandedComponent character={character} />
        </section>
    );
}

export default OneCharacter;