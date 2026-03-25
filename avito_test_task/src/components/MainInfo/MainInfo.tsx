import type { FC } from 'react'
import type { MainInfoProps } from './types'
import styles from './MainInfo.module.css'
import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'

const formatDate = (dateString?: string) => {
  if (!dateString) return ''

  const date = new Date(dateString)

  const day = date.getDate()
  const month = date.toLocaleString('ru-RU', { month: 'long' })
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day} ${month} ${hours}:${minutes}`
}

const MainInfo: FC<MainInfoProps> = ({ title, price, createdAt, updatedAt }) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const handleClick = () => {
      console.log('Click! id:', id)
  console.log('Navigate to:', `/ads/${id}/edit`)
    navigate(`/ads/${id}/edit`)
  }

  return (
    <div className={styles.mainInfo}>
      <div className={styles.title}>
        <h1>{title}</h1>
        <h2>{price} ₽</h2>
      </div>
      <div className={styles.subTitle}>
        <Button type="primary" icon={<EditOutlined />} iconPlacement={'end'} onClick={handleClick}>
          Редактировать
        </Button>
        <div className={styles.subTitle__date}>
          <span>Опубликовано: {formatDate(createdAt)}</span>
          {updatedAt && updatedAt !== createdAt && (
            <span>Отредактировано: {formatDate(updatedAt)}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainInfo