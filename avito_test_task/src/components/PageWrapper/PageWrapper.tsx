import type { FC } from 'react'
import type { PageWrapperProps } from './types' 
import styles from './PageWrapper.module.css'

const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  return (
  <div className={styles.wrapper}>
    {children}
    
  </div>
  )
}

export default PageWrapper