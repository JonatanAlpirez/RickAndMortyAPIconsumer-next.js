'use client';

import styles from '../Characters/styles.module.css'
import { useRouter } from 'next/navigation';

function LocationsComponent({locations}) {

    const router = useRouter();

    return ( 

        <ul className= {styles.mosaic__main}>
                {
                    locations.map((location) => (
                        <li className= {styles.mosaic__card} key={location.id} onClick={()=>{
                            router.push(`/characters/${location.id}`);      
                        }}>
                            <div className= {styles.mosaic__img}>
                                <img src={location.image} alt="" />
                            </div>
                            <div className= {styles.mosaic__description}>
                                <h4>Nombre: {location.name}</h4>
                                <h4>Type	: {location.type	}</h4>
                                <h4>Dimension: {location.dimension}</h4>
                                <br />
                            </div>
                        </li>

                    ))
                }
            </ul>
     );
}

export default LocationsComponent;