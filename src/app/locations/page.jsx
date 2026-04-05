import LocationsComponent from "../../../components/Locations/Locations";
import styles from '../characters/styles.module.css'

// Force dynamic rendering to avoid build errors with external API
export const dynamic = 'force-dynamic';

/**
 * Fetch all locations from Rick and Morty API (with error handling)
 * @returns {Promise<Array>} Array of locations
 * @throws {Error} When API request fails
 */
async function fetchLocations() {
    try {
        let res = await fetch("https://rickandmortyapi.com/api/location");
        
        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }
        
        let data = await res.json();

        let locations = [];
        locations = locations.concat(data.results);
        let next = data.info.next;

        while (next != null) {
            res = await fetch(next);
            
            if (!res.ok) {
                throw new Error(`API error fetching page: ${res.status}`);
            }
            
            data = await res.json();
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
