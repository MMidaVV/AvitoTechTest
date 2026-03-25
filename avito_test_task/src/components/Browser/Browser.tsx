import type { FC } from 'react'
import type { BrowserProps } from './types' 
import styles from './Browser.module.css'

const Browser: FC<BrowserProps> = ({ children }) => {
  return (
  <div className={styles.browser}>
    <div className={styles.addressBar}>
        <div className={styles.trafficLights}>
            <div className={styles.control}></div>
            <div className={styles.control}></div>
            <div className={styles.control}></div>
        </div>
        <div className={styles.tabRow}>
            <div className={styles.website}>
                <div className={styles.icon}>
                    <img  src="/avito_icon.png" alt="avito_icon" />
                </div>
                <span className={styles.url}>avito.ru</span>
            </div>
        </div>
    </div>
    <div className={styles.content}>
        {children}
    </div>
  </div>
  )
}

export default Browser