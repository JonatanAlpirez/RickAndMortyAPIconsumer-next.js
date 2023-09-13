import Link from 'next/link'
import styles from './styles.module.css'
import Image from 'next/image'

function NavbarComponent() {
    return (  
        <header className={styles.navbar}>
            <ul className={styles.navbar__menu}>
              <li className={styles.navbar__option}>
                <Link className={styles.navbar__link_img} href="/">
                  <Image  
                  width={500}
                   height={500} 
                   className= {styles.navbar__img} src="/icono.png" alt="" />
                </Link>
              </li>

              <li className={styles.navbar__option}>
                <Link className={styles.navbar__link} href="/about">About</Link>
              </li>

            </ul>
          </header>
    );
}

export default NavbarComponent;