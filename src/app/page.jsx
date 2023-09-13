
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {

  return (
    
      <div className={styles.content__main}>

        <section className={styles.content__options}>
       
              <Link className={styles.content__link} href="/characters">
                <h1 className={styles.content__title}>
                    Characters
                </h1>
              </Link>
               
              <Link className={styles.content__link} href="/locations">
                <h1 className={styles.content__title}>
                    Locations
                </h1> 
              </Link>
           
              <Link className={styles.content__link} href="/episodes">
                <h1 className={styles.content__title}>
                    Episodes
                </h1>
              </Link>
           
        </section>

        


      </div>
    
  )
}
