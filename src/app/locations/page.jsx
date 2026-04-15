"use client";

import { useQuery } from "@tanstack/react-query";
import LocationsComponent from "../../../components/Locations/Locations";
import styles from '../characters/styles.module.css'

/**
 * Fetch all locations from Rick and Morty API with pagination
 * @returns {Promise<Array>} Array of locations
 */
async function fetchLocations() {
    let res = await fetch("https://rickandmortyapi.com/api/location");
    let data = await res.json();

    let locations = [];
    locations = locations.concat(data.results);
    let next = data.info.next;

    while (next != null) {
        res = await fetch(next);
        data = await res.json();
        locations = locations.concat(data.results);
        next = data.info.next;
    }

    return locations;
}

function LocationsPageComponent() {
    const { data: locations, isLoading, isError, error } = useQuery({
        queryKey: ['locations'],
        queryFn: fetchLocations,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
    });

    if (isLoading) {
        return (
            <div className={styles.content__consumer}>
                <div>
                    <h2>Loading locations...</h2>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className={styles.content__consumer}>
                <div>
                    <h2>Error loading locations</h2>
                    <p>{error.message}</p>
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
