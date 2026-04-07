import styles from '../../characters/styles.module.css'

/**
 * Fetch a single location by ID from the Rick and Morty API
 * @param {string|number} id - Location ID
 * @returns {Promise<Object>} Location data
 */
async function fetchOneLocation(id) {
    const res = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
    
    if (!res.ok) {
        throw new Error(`Error fetching location ${id}: ${res.status}`);
    }
    
    const data = await res.json();
    return data;
}

/**
 * Location detail page
 * @param {Object} params - URL params containing the location ID
 */
async function OneLocation({ params }) {
    let location;
    let error = null;

    try {
        location = await fetchOneLocation(params.id);
    } catch (e) {
        error = e.message;
        console.error('Error fetching location:', e);
    }

    if (error) {
        return (
            <section className={styles.character__main}>
                <div className={styles.character__card}>
                    <h1>Error loading location</h1>
                    <p>{error}</p>
                </div>
            </section>
        );
    }

    return (  
        <section className={styles.character__main}>
            <div className={styles.character__card}>
                <div className={styles.character__info}>
                    <h1>Name: {location.name}</h1>
                    <h1>Type: {location.type}</h1>
                    <h1>Dimension: {location.dimension}</h1>
                    <h1>Residents: {location.residents.length}</h1>
                </div>
            </div>
        </section>
    );
}

export default OneLocation;
