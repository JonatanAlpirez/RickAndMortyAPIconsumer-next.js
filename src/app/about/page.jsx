import styles from './styles.module.css'


function AboutComponent() {
    return (  
        
        <div className={styles.content__about}>
            <h1 className={styles.content__title}>About</h1>
            <p className={styles.content__info}>
                Hola!! <br />

                Este es un consumidor de la API Rick and Morty(https://rickandmortyapi.com/). Donde obtiene la información . <br />

                Rick and Morty es creado por Justin Roiland y Dan Harmon para Adult Swim. Los datos y las imágenes fueron usadas sin los derechos de propiedad los cuales pertenecen a sus respectivos creadores. <br />

                
            </p>
        </div>
    );
}

export default AboutComponent;