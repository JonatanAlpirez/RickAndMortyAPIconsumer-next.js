import styles from './styles.module.css'


function AboutComponent() {
    return (  
        
        <div className={styles.content__about}>
            <h1 className={styles.content__title}>About</h1>
            <p className={styles.content__info}>
                Hola!! <br />

                Esta aplicación despliega los datos de los personajes, ubicaciones y episodios del famoso programa de television 
                <a className={styles.content__link} href="https://www.adultswim.com/videos/rick-and-morty" target="_blank" rel="noopener noreferrer">Rick and Morty</a>. 
                <br /> 
                Los datos son obtenidos por el consumo de la API Rick and Morty 
                <a className={styles.content__link} href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer">(https://rickandmortyapi.com/)</a>.
                <br /> 

                Rick and Morty es creado por Justin Roiland y Dan Harmon para Adult Swim. Los datos y las imágenes fueron usadas sin los derechos de propiedad los cuales pertenecen a sus respectivos creadores. <br />

                
            </p>
        </div>
    );
}

export default AboutComponent;