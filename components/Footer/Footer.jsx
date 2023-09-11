import styles from './styles.module.css'

function FooterComponent() {
    return ( 

        <footer className={styles.footer__main}>
            <div>
                <h1 className={styles.footer__title}>by.  
                    <a className={styles.footer__link} href="https://jonatan.netlify.app/" target="_blank" rel="noopener noreferrer">Jonatan Alpirez</a>
                      2023
                </h1>
            </div>
        </footer>

     );
}

export default FooterComponent;