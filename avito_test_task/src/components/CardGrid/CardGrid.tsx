import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import { setCurrentPage } from '../../features/ui/uiSlice';
import { fetchItems } from '../../features/items/itemsSlice';
import type { CardGridProps } from './types';
import styles from './CardGrid.module.css';
import Card from '../Card/Card';
import { Pagination, Spin } from 'antd';

const CardGrid: FC<CardGridProps> = ({ items }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const layout = useSelector((state: RootState) => state.ui.layout);
  const currentPage = useSelector((state: RootState) => state.ui.currentPage);
  const itemsPerPage = useSelector((state: RootState) => state.ui.itemsPerPage);
  const total = useSelector((state: RootState) => state.items.total);
  const loading = useSelector((state: RootState) => state.items.loading);
  const searchQuery = useSelector((state: RootState) => state.ui.searchQuery);
  const sortOption = useSelector((state: RootState) => state.ui.sortOption);
  const selectedCategories = useSelector((state: RootState) => state.ui.selectedCategories);
  const needsRevision = useSelector((state: RootState) => state.ui.needsRevision);

  const handlePageChange = async (page: number) => {
    dispatch(setCurrentPage(page));
    const skip = (page - 1) * itemsPerPage;
    
    const params: any = {
      limit: itemsPerPage,
      skip,
    };

    if (searchQuery) params.q = searchQuery;
    if (selectedCategories.length > 0) params.categories = selectedCategories.join(',');
    if (needsRevision) params.needsRevision = true;

    const sortParams = getSortParams(sortOption);
    Object.assign(params, sortParams);

    await dispatch(fetchItems(params));
  };

  const getSortParams = (option: string) => {
    switch (option) {
      case 'title-asc':
        return { sortColumn: 'title' as const, sortDirection: 'asc' as const };
      case 'title-desc':
        return { sortColumn: 'title' as const, sortDirection: 'desc' as const };
      case 'createdAt-asc':
        return { sortColumn: 'createdAt' as const, sortDirection: 'asc' as const };
      case 'createdAt-desc':
        return { sortColumn: 'createdAt' as const, sortDirection: 'desc' as const };
      default:
        return {};
    }
  };

  if (loading) {
    return (
      <div className={styles.cardBox}>
        <div className={styles.loading}>
          <Spin size="large" tip="Загрузка объявлений..." />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cardBox} key={layout}>
      <div className={layout === 'Appstore' ? styles.appstore : styles.unorderedList}>
        {items.map((card) => (
          <Card key={card.id} item={card} layout={layout} />
        ))}
      </div>
      <Pagination 
        className={styles.pagination} 
        current={currentPage}
        pageSize={itemsPerPage}
        total={total}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default CardGrid;