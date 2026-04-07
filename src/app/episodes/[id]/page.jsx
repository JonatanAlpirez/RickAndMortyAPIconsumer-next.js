import styles from '../../characters/styles.module.css'

/**
 * Fetch a single episode by ID from the Rick and Morty API
 * @param {string|number} id - Episode ID
 * @returns {Promise<Object>} Episode data
 */
async function fetchOneEpisode(id) {
    const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
    
    if (!res.ok) {
        throw new Error(`Error fetching episode ${id}: ${res.status}`);
    }
    
    const data = await res.json();
    return data;
}

/**
 * Episode detail page
 * @param {Object} params - URL params containing the episode ID
 */
async function OneEpisode({ params }) {
    let episode;
    let error = null;

    try {
        episode = await fetchOneEpisode(params.id);
    } catch (e) {
        error = e.message;
        console.error('Error fetching episode:', e);
    }

    if (error) {
        return (
            <section className={styles.character__main}>
                <div className={styles.character__card}>
                    <h1>Error loading episode</h1>
                    <p>{error}</p>
                </div>
            </section>
        );
    }

    return (  
        <section className={styles.character__main}>
            <div className={styles.character__card}>
                <div className={styles.character__info}>
                    <h1>Name: {episode.name}</h1>
                    <h1>Air Date: {episode.air_date}</h1>
                    <h1>Episode Code: {episode.episode}</h1>
                    <h1>Characters: {episode.characters.length}</h1>
                </div>
            </div>
        </section>
    );
}

export default OneEpisode;
