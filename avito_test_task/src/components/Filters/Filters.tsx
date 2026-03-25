import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import { setSelectedCategories, setNeedsRevision, resetFilters } from '../../features/ui/uiSlice';
import { fetchItems } from '../../features/items/itemsSlice';
import type { FiltersProps } from './types';
import styles from './Filters.module.css';
import { Collapse, Checkbox, Switch, Button } from 'antd';

const Filters: FC<FiltersProps> = () => {
  const { Panel } = Collapse;
  const dispatch = useDispatch<AppDispatch>();
  
  const selectedCategories = useSelector((state: RootState) => state.ui.selectedCategories);
  const needsRevision = useSelector((state: RootState) => state.ui.needsRevision);
  const searchQuery = useSelector((state: RootState) => state.ui.searchQuery);
  const sortOption = useSelector((state: RootState) => state.ui.sortOption);
  const layout = useSelector((state: RootState) => state.ui.layout);

  const getItemsPerPage = (layoutType: 'Appstore' | 'UnorderedList'): number => {
    return layoutType === 'Appstore' ? 10 : 4;
  };

  const handleCategoryChange = (values: string[]) => {
    dispatch(setSelectedCategories(values));
    
    const currentItemsPerPage = getItemsPerPage(layout);
    const params: any = {
      limit: currentItemsPerPage,
      skip: 0,
    };

    if (searchQuery) params.q = searchQuery;
    if (values.length > 0) params.categories = values.join(',');
    if (needsRevision) params.needsRevision = true;

    const sortParams = getSortParams(sortOption);
    Object.assign(params, sortParams);

    dispatch(fetchItems(params));
  };

  const handleNeedsRevisionChange = (checked: boolean) => {
    dispatch(setNeedsRevision(checked));
    
    const currentItemsPerPage = getItemsPerPage(layout);
    const params: any = {
      limit: currentItemsPerPage,
      skip: 0,
    };

    if (searchQuery) params.q = searchQuery;
    if (selectedCategories.length > 0) params.categories = selectedCategories.join(',');
    if (checked) params.needsRevision = true;

    const sortParams = getSortParams(sortOption);
    Object.assign(params, sortParams);

    dispatch(fetchItems(params));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    
    const currentItemsPerPage = getItemsPerPage(layout);
    dispatch(fetchItems({ limit: currentItemsPerPage, skip: 0 }));
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

  return (
    <div className={styles.filters}>
      <div className={styles.categories}>
        <h3>Фильтры</h3>
        <Collapse ghost className={styles.collapse} expandIconPlacement="end">
          <Panel header="Категория">
            <Checkbox.Group
              style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
              value={selectedCategories}
              onChange={handleCategoryChange}
            >
              <Checkbox value="auto">Авто</Checkbox>
              <Checkbox value="electronics">Электроника</Checkbox>
              <Checkbox value="real_estate">Недвижимость</Checkbox>
            </Checkbox.Group>
          </Panel>
        </Collapse>
        <div className={styles.rectangle}></div>
        <div className={styles.toggle}>
          <span className={styles.toggle__text}>Только требующие доработок</span>
          <Switch
            checked={needsRevision}
            onChange={handleNeedsRevisionChange}
            className={styles.toggle__switch}
          />
        </div>
      </div>
      <Button className={styles.clearButton} onClick={handleResetFilters}>
        Сбросить фильтры
      </Button>
    </div>
  );
};

export default Filters;