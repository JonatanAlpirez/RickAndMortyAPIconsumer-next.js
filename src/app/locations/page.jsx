import LocationsComponent from "../../../components/Locations/Locations";
import styles from '../characters/styles.module.css'

async function fetchLocations(){
    let res = await fetch("https://rickandmortyapi.com/api/location");
    let data = await res.json();

    let locations = [];
    locations = locations.concat(data.results);
    let next = data.info.next;
    

    while (next != null){
        /* console.log(next); */
        res = await fetch(next);
        data = await res.json();
        locations = locations.concat(data.results);
        next = data.info.next;


    }
    
    /* console.log(characters);  */

    return locations;
    
}

async function LocationsPageComponent() {

    const locations = await fetchLocations();

    return (  

        <div className={styles.content__consumer}>
            <div>
                <LocationsComponent locations={locations} />
            </div>
            
        </div>
    );
}

export default LocationsPageComponent;