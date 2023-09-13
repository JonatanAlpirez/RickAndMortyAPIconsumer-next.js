'use client';

import styles from './styles.module.css'
import { useRouter } from 'next/navigation';
import Image from 'next/image'

function CharactersComponent({characters}) {

    const router = useRouter();

    return ( 
        <ul className= {styles.mosaic__main}>
                {
                    characters.map((character) => (
                        <li className= {styles.mosaic__card} key={character.id} onClick={()=>{
                            router.push(`/characters/${character.id}`);      
                        }}>
                            <div className= {styles.mosaic__img}>
                                <Image width={300} height={300} src={character.image} alt="" />
                            </div>
                            <div className= {styles.mosaic__description}>
                                <h4>Nombre: {character.name}</h4>
                                <h4>Status: {character.status}</h4>
                                <h4>Especie: {character.species}</h4>
                                <h4>Genero: {character.gender}</h4>
                                <h4>Origen: {character.origin.name}</h4>
                                <br />
                            </div>
                        </li>

                    ))
                }
            </ul>
     );
}

export default CharactersComponent;