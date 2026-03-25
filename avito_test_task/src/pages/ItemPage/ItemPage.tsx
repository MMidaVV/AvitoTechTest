import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../app/store'
import { fetchItemById, clearCurrentItem } from '../../features/items/itemsSlice'
import styles from './ItemPage.module.css'

import MainInfo from '../../components/MainInfo/MainInfo'
import Details from '../../components/Details/Details'
import Descriptions from '../../components/Descriptions/Descriptions'

const ItemPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  
  const currentItem = useSelector((state: RootState) => state.items.currentItem)

  useEffect(() => {
    if (id) {
      dispatch(fetchItemById(id))
    }
    return () => {
      dispatch(clearCurrentItem())
    }
  }, [dispatch, id])

  return (
    <>
      <MainInfo
        title={currentItem?.title}
        price={currentItem?.price}
        createdAt={currentItem?.createdAt}
        updatedAt={currentItem?.updatedAt}
      />

      <div className={styles.rectangle}></div>

      <Details
        category={currentItem?.category}
        params={currentItem?.params}
        needsRevision={currentItem?.needsRevision}
      />
      <Descriptions
        description={currentItem?.description}
      />
    </>
  )
}

export default ItemPage