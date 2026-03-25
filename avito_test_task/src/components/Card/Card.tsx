import type { FC } from 'react'
import type { CardProps } from './types'
import { useNavigate } from 'react-router-dom'
import styles from './Card.module.css'

const Card: FC<CardProps> = ({ item, layout }) => {
    const navigate = useNavigate()
    const PLACEHOLDER_IMAGE = "/placeholder-image.png"

    const containerClass = layout === 'Appstore' ? styles.appstore : styles.unorderedList
    const isAppstore = layout === 'Appstore'
    let category = ""

    switch (item.category) {
        case ("auto"):
            category = "Авто"
            break;
        case ("real_estate"):
            category = "Недвижимость"
            break;
        case ("electronics"):
            category = "Электроника"
            break;
    }

    const handleClick = () => {
        navigate(`/ads/${item.id}`)
    }

    return (
        <div className={containerClass} onClick={handleClick}>
            <div className={styles.cover}>
                <img
                    src={PLACEHOLDER_IMAGE}
                    alt={item.title || 'Undefined title'}
                />
            </div>

            {isAppstore && (
                <div className={styles.label}>
                    {category || 'Undefined label'}
                </div>
            )}

            <div className={styles.body}>
                {!isAppstore && (
                    <span>{category || 'Undefined label'}</span>
                )}
                <span>{item.title || 'Undefined title'}</span>
                <span>{item.price || 'Undefined price'} ₽</span>
                {item.needsRevision && (
                    <div className={styles.notification}>
                        <div className={styles.dot}></div>
                        <span>Требует доработок</span>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Card