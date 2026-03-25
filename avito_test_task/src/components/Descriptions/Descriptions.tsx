import type { FC } from 'react'
import type { DescriptionsProps } from './types'
import styles from './Descriptions.module.css'


const Descriptions: FC<DescriptionsProps> = ({description}) => {

    return (
        <div className={styles.descriptions}>
            <h3>Описание</h3>
            <span>{description ? description : 'Отсутствует'}</span>
        </div>
    )
}

export default Descriptions