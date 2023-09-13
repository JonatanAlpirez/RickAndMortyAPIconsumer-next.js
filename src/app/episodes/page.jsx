import EpisodesComponent from '../../../components/Episodes/Episodes';
import styles from '../characters/styles.module.css'

async function fetchEpisodes(){
    let res = await fetch("https://rickandmortyapi.com/api/episode");
    let data = await res.json();

    let episodes = [];
    episodes = episodes.concat(data.results);
    let next = data.info.next;
    

    while (next != null){
        /* console.log(next); */
        res = await fetch(next);
        data = await res.json();
        episodes = episodes.concat(data.results);
        next = data.info.next;


    }
    
    /* console.log(characters);  */

    return episodes;
    
}

async function EpisodesPageComponent() {

    const episodes = await fetchEpisodes();

    return (  

        <div className={styles.content__consumer}>
            <div>
                < EpisodesComponent episodes={episodes} />
            </div>
            
        </div>
    );
}

export default EpisodesPageComponent;