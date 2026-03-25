import type { FC } from 'react'
import { pluralize } from '../../utils/pluralize';
import type { SellerInfoProps } from './types'
import styles from './SellerInfo.module.css'

const SellerInfo: FC<SellerInfoProps> = ({total}) => {
    return (
        <div className={styles.info}>
            <div className={styles.text}>
                <h1>Мои объявления</h1>
                <span>{total} {pluralize(total, ['объявление', 'объявления', 'объявлений'])}</span>
            </div>
        </div>
    )
}

export default SellerInfo