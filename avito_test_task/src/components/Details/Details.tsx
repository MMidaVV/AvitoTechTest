import type { FC } from 'react'
import type { Category, ItemParams } from '../../types/api'
import type { DetailsProps } from './types'
import styles from './Details.module.css'

const Details: FC<DetailsProps> = ({ category, params, needsRevision }) => {
  const PLACEHOLDER_IMAGE = '/placeholder-image.png'

  const getMissingFields = (cat: Category, p: ItemParams) => {
    const missing: string[] = ["тип", 'type']

    if (cat === 'auto') {
      const auto = p as Extract<ItemParams, { mileage?: number }>
      if (!auto.brand) missing.push('Бренд')
      if (!auto.model) missing.push('Модель')
      if (!auto.yearOfManufacture) missing.push('Год выпуска')
      if (!auto.transmission) missing.push('КПП')
      if (!auto.mileage) missing.push('Пробег')
      if (!auto.enginePower) missing.push('Мощность')
    }

    if (cat === 'real_estate') {
      const realEstate = p as Extract<ItemParams, { area?: number }>
      if (!realEstate.type) missing.push('Тип недвижимости')
      if (!realEstate.address) missing.push('Адрес')
      if (!realEstate.area) missing.push('Площадь')
      if (!realEstate.floor) missing.push('Этаж')
    }

    if (cat === 'electronics') {
      const electronics = p as Extract<ItemParams, { condition?: string }>
      if (!electronics.type) missing.push('Тип техники')
      if (!electronics.brand) missing.push('Бренд')
      if (!electronics.model) missing.push('Модель')
      if (!electronics.condition) missing.push('Состояние')
      if (!electronics.color) missing.push('Цвет')
    }

    return missing
  }

  const renderParams = (cat: Category, p: ItemParams) => {
    if (cat === 'auto') {
      const auto = p as Extract<ItemParams, { mileage?: number }>
      return (
        <>
          {auto.brand && (
            <div className={styles.sections}>
              <span className={styles.section__name}>Бренд</span>
              <span className={styles.section__value}>{auto.brand}</span>
            </div>
          )}
          {auto.model && (
            <div className={styles.sections}>
              <span className={styles.section__name}>Модель</span>
              <span className={styles.section__value}>{auto.model}</span>
            </div>
          )}
          {auto.yearOfManufacture && (
            <div className={styles.sections}>
              <span className={styles.section__name}>Год</span>
              <span className={styles.section__value}>{auto.yearOfManufacture}</span>
            </div>
          )}
          {auto.transmission && (
            <div className={styles.sections}>
              <span className={styles.section__name}>КПП</span>
              <span className={styles.section__value}>{auto.transmission === 'automatic' ? 'Автомат' : 'Механика'}</span>
            </div>
          )}
          {auto.mileage && (
            <div className={styles.sections}>
              <span className={styles.section__name}>Пробег</span>
              <span className={styles.section__value}>{auto.mileage} км</span>
            </div>
          )}
          {auto.enginePower && (
            <div className={styles.sections}>
              <span className={styles.section__name}>Мощность</span>
              <span className={styles.section__value}>{auto.enginePower} л.с.</span>
            </div>
          )}
        </>
      )
    }

    if (cat === 'real_estate') {
      const realEstate = p as Extract<ItemParams, { area?: number }>
      return (
        <>
          {realEstate.type && (
            <div className={styles.sections}>
              <span className={styles.section__name}>Тип</span>
              <span className={styles.section__value}>{realEstate.type === 'flat' ? 'Квартира' : realEstate.type === 'house' ? 'Дом' : 'Комната'}</span>
            </div>
          )}
          {realEstate.address && (
            <div className={styles.sections}>
              <span className={styles.section__name}>Адрес</span>
              <span className={styles.section__value}>{realEstate.address}</span>
            </div>
          )}
          {realEstate.area && (
            <div className={styles.sections}>
              <span className={styles.section__name}>Площадь</span>
              <span className={styles.section__value}>{realEstate.area} м²</span>
            </div>
          )}
          {realEstate.floor && (
            <div className={styles.sections}>
              <span className={styles.section__name}>Этаж</span>
              <span className={styles.section__value}>{realEstate.floor}</span>
            </div>
          )}
        </>
      )
    }

    if (cat === 'electronics') {
      const electronics = p as Extract<ItemParams, { condition?: string }>
      return (
        <>
          {electronics.type && (
            <div className={styles.sections}>
              <span className={styles.section__name}>Тип</span>
              <span className={styles.section__value}>{electronics.type === 'phone' ? 'Телефон' : electronics.type === 'laptop' ? 'Ноутбук' : 'Другое'}</span>
            </div>
          )}
          {electronics.brand && (
            <div className={styles.sections}>
              <span className={styles.section__name}>Бренд</span>
              <span className={styles.section__value}>{electronics.brand}</span>
            </div>
          )}
          {electronics.model && (
            <div className={styles.sections}>
              <span className={styles.section__name}>Модель</span>
              <span className={styles.section__value}>{electronics.model}</span>
            </div>
          )}
          {electronics.condition && (
            <div className={styles.sections}>
              <span className={styles.section__name}>Состояние</span>
              <span className={styles.section__value}>{electronics.condition === 'new' ? 'Новое' : 'Б/у'}</span>
            </div>
          )}
          {electronics.color && (
            <div className={styles.sections}>
              <span className={styles.section__name}>Цвет</span>
              <span className={styles.section__value}>{electronics.color}</span>
            </div>
          )}
        </>
      )
    }

    return null
  }

  const missingFields = category && params ? getMissingFields(category, params) : []

  return (
    <div className={styles.details}>
      <div className={styles.photo}>
        <img src={PLACEHOLDER_IMAGE} alt="Изображение товара" />
      </div>
      <div className={styles.section}>
        {needsRevision && missingFields.length > 0 && (
          <div className={styles.revision}>
            <div className={styles.revision__icon}>
              <img src="/exclamation-circle.svg" alt="Warning" />
            </div>
            <div className={styles.revision__text}>
              <span>Требуются доработки</span>
              <span>У объявления не заполнены поля:</span>
              <ul className={styles.revision__list}>
                {missingFields.map((field, index) => (
                  <li key={index}>{field}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className={styles.specifications}>
          <h4 className={styles.specifications__name}>Характеристики</h4>
          {params && renderParams(category!, params)}
        </div>
      </div>
    </div>
  )
}

export default Details