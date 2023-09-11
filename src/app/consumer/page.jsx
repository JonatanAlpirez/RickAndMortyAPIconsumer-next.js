import CharactersComponent from "../../../components/Characters/Characters";
import styles from './styles.module.css'

async function fetchCharacters(){
    const res = await fetch("https://rickandmortyapi.com/api/character/?name=morty&status=dead");
    const data = await res.json();
    /* console.log(data); */
    return data.results
    
}

async function ConsumerComponent() {

    const characters = await fetchCharacters();

    return (  

        <div className={styles.content__consumer}>
            <div>
                <CharactersComponent characters={characters} />
            </div>
            
        </div>
    );
}

export default ConsumerComponent;