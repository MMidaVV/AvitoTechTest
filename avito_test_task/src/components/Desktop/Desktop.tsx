import type { FC } from 'react'
import type { DescktopProps } from './types' 
import styles from './Desktop.module.css'

const Desktop: FC<DescktopProps> = ({ children }) => {
  return (
  <div className={styles.desktop}>
    <div className={styles.menuBar}>
      <div className={styles.menus}>
        <div className={styles.item}><img src="/apple.svg" alt="icon_apple"/></div>
        <div className={styles.item}>Safari</div>
        <div className={styles.item}>File</div>
        <div className={styles.item}>Edit</div>
        <div className={styles.item}>View</div>
        <div className={styles.item}>History</div>
        <div className={styles.item}>Window</div>
        <div className={styles.item}>help</div>
      </div>
      <div className={styles.items}>
        <div className={styles.icon}><img src="/wifi.svg" alt="icon_wifi"/></div>
        <div className={styles.icon}><img src="/battery.100.svg" alt="icon_battery"/></div>
        <div className={styles.icon}><img src="/switch.svg" alt="icon_switch"/></div>
        <div className={styles.data}>Mon Jun 22</div>
        <div className={styles.time}>9:41 AM</div>
      </div>
    </div>
    <div className={styles.content}>
      {children}
    </div>
    <div className={styles.dock}>
      <div className={styles.appIcons}>
        <div className={styles.icon}><img src="/finder.app.svg" alt="icon_finder" /></div>
        <div className={styles.icon}><img src="/safari.svg" alt="icon_safari" /></div>
        <div className={styles.icon}><img src="/books.app.svg" alt="icon_books" /></div>
        <div className={styles.icon}><img src="/calendar.app.svg" alt="icon_calendar" /></div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.trash}><img src="/Trash.svg" alt="icon_trash" /></div>
    </div>
  </div>
  )
}

export default Desktop