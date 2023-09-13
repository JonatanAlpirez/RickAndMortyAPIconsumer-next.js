'use client';

import styles from '../Characters/styles.module.css'
import { useRouter } from 'next/navigation';

function EpisodesComponent({episodes}) {

    const router = useRouter();

    return (  
        <ul className= {styles.mosaic__main}>
                {
                    episodes.map((episode) => (
                        <li className= {styles.mosaic__card} key={episode.id} onClick={()=>{
                            router.push(`/consumer/${episode.id}`);      
                        }}>
                            <div className= {styles.mosaic__img}>
                                <img src={episode.image} alt="" />
                            </div>
                            <div className= {styles.mosaic__description}>
                                <h4>Nombre: {episode.name}</h4>
                                <h4>Air date: {episode.air_date}</h4>
                                <h4>Episode: {episode.episode}</h4>
                                <br />
                            </div>
                        </li>

                    ))
                }
            </ul>
    );
}

export default EpisodesComponent;