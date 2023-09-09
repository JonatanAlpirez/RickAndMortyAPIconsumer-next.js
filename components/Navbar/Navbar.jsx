import Link from 'next/link'
import styles from './styles.module.css'

function NavbarComponent() {
    return (  
        <header className={styles.navbar}>
            <ul className={styles.navbar__menu}>
              <li className={styles.navbar__option}>
                <Link  href="/">
                  <img className= {styles.navbar__img} src="https://e1.pxfuel.com/desktop-wallpaper/80/926/desktop-wallpaper-rick-and-morty-logo-png-for-computer-supreme-rick-and-morty.jpg" alt="" />
                </Link>
              </li>

              <li className={styles.navbar__option}>
                <Link className={styles.navbar__link} href="/about">About</Link>
              </li>

              <li className={styles.navbar__option}>
                <Link className={styles.navbar__link} href="/consumer">Consumer</Link>
              </li>

            </ul>

            <section className={styles.navbar__banner}>
                <img src="https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/1/AmazonStores/A1AM78C64UM0Y8/98703b33d9d6579765f3fa2cad228a8d.w3000.h600._CR0%2C0%2C3000%2C600_SX1500_.jpg" alt="banner" />
            </section>
          </header>
    );
}

export default NavbarComponent;