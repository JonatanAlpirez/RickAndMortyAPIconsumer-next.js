import CharactersComponent from "../../../components/Characters/Characters";
import styles from './styles.module.css'

async function fetchCharacters(){
    let res = await fetch("https://rickandmortyapi.com/api/character");
    let data = await res.json();

    let characters = [];
    characters = characters.concat(data.results);
    let next = data.info.next;
    

    while (next != null){
        /* console.log(next); */
        res = await fetch(next);
        data = await res.json();
        characters = characters.concat(data.results);
        next = data.info.next;


    }
    
    /* console.log(characters);  */

    return characters;
    
}

async function CharactersPageComponent() {

    const characters = await fetchCharacters();

    return (  

        <div className={styles.content__consumer}>
            <div>
                <CharactersComponent characters={characters} />
            </div>
            
        </div>
    );
}

export default CharactersPageComponent;