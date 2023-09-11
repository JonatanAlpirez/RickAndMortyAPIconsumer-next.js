'use client';

import styles from './styles.module.css'
import { useRouter } from 'next/navigation';

function CharactersComponent({characters}) {

    const router = useRouter();

    return ( 
        <ul className= {styles.characters__main}>
                {
                    characters.map((character) => (
                        <li className= {styles.characters__card} key={character.id} onClick={()=>{
                            router.push(`/consumer/${character.id}`);      
                        }}>
                            <div className= {styles.characters__img}>
                                <img src={character.image} alt="" />
                            </div>
                            <div className= {styles.characters__description}>
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