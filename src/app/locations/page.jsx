import LocationsComponent from "../../../components/Locations/Locations";
import styles from '../characters/styles.module.css'

// Force dynamic rendering to avoid build errors with external API
export const dynamic = 'force-dynamic';

/**
 * Fetch all locations from Rick and Morty API (with error handling and rate limiting)
 * @returns {Promise<Array>} Array of locations
 * @throws {Error} When API request fails after retries
 */
async function fetchLocations() {
    const API_BASE = "https://rickandmortyapi.com/api/location";
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

        let locations = [];
        locations = locations.concat(data.results);
        let next = data.info.next;

        while (next != null) {
            await new Promise(r => setTimeout(r, 500));
            data = await fetchWithRetry(next);
            locations = locations.concat(data.results);
            next = data.info.next;
        }

        return locations;
    } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
    }
}

async function LocationsPageComponent() {
    let locations = [];
    let error = null;

    try {
        locations = await fetchLocations();
    } catch (e) {
        error = e.message;
    }

    if (error) {
        return (
            <div className={styles.content__consumer}>
                <div>
                    <h2>Error loading locations</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (  
        <div className={styles.content__consumer}>
            <div>
                <LocationsComponent locations={locations} />
            </div>
        </div>
    );
}

export default LocationsPageComponent;
