import styles from './styles.module.css'

function CharacterExpandedComponent({character}) {
    
    return ( 
        <section className={styles.character__main}>
            <div className={styles.character__card}>
                <div className={styles.character__img}>
                    <img src={character.image} alt="image-picture" />
                </div>
                <div className={styles.character__info}>
                    <h1>Name: {character.name}</h1>
                    <h1>Status: {character.status}</h1>
                    <h1>Species: {character.species}</h1>
                    <h1>Gender: {character.species}</h1>
                    <h1>Origin: {character.origin.name}</h1>
                    <h1>Location: {character.location.name}</h1>
                    <h1>Episodes: {character.episode.length}</h1>


                </div>
            </div>


        </section>
     );
}

export default CharacterExpandedComponent;