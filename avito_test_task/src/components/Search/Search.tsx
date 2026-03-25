import type { FC, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import { setSearchQuery, setSortOption, resetPagination, setLayout } from '../../features/ui/uiSlice';
import { fetchItems } from '../../features/items/itemsSlice';
import type { SearchProps } from './types';
import styles from './Search.module.css';
import { Button, Input, Select } from 'antd';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';

const Search: FC<SearchProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const layout = useSelector((state: RootState) => state.ui.layout);
  const itemsPerPage = useSelector((state: RootState) => state.ui.itemsPerPage);
  const searchQuery = useSelector((state: RootState) => state.ui.searchQuery);
  const sortOption = useSelector((state: RootState) => state.ui.sortOption);
  const selectedCategories = useSelector((state: RootState) => state.ui.selectedCategories);
  const needsRevision = useSelector((state: RootState) => state.ui.needsRevision);

  const getItemsPerPage = (layoutType: 'Appstore' | 'UnorderedList'): number => {
    return layoutType === 'Appstore' ? 10 : 4;
  };

  const handleLayoutChange = async (newLayout: 'Appstore' | 'UnorderedList') => {
    const newItemsPerPage = getItemsPerPage(newLayout);
    dispatch(setLayout(newLayout));
    dispatch(resetPagination());
    
    const params: any = {
      limit: newItemsPerPage,
      skip: 0,
    };

    if (searchQuery) params.q = searchQuery;
    if (selectedCategories.length > 0) params.categories = selectedCategories.join(',');
    if (needsRevision) params.needsRevision = true;

    const sortParams = getSortParams(sortOption);
    Object.assign(params, sortParams);

    await dispatch(fetchItems(params));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSearchSubmit = () => {
    dispatch(resetPagination());
    
    const params: any = {
      q: searchQuery || undefined,
      limit: itemsPerPage,
      skip: 0,
    };

    if (selectedCategories.length > 0) params.categories = selectedCategories.join(',');
    if (needsRevision) params.needsRevision = true;

    const sortParams = getSortParams(sortOption);
    Object.assign(params, sortParams);

    dispatch(fetchItems(params));
  };

  const handleSortChange = (value: string) => {
    dispatch(setSortOption(value as any));
    
    const sortParams = getSortParams(value);
    dispatch(resetPagination());
    
    const params: any = {
      ...sortParams,
      limit: itemsPerPage,
      skip: 0,
    };

    if (searchQuery) params.q = searchQuery;
    if (selectedCategories.length > 0) params.categories = selectedCategories.join(',');
    if (needsRevision) params.needsRevision = true;

    dispatch(fetchItems(params));
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
    <div className={styles.search}>
      <Input.Search
        placeholder="Найти объявление...."
        variant="filled"
        className={styles.input}
        value={searchQuery}
        onChange={handleSearchChange}
        onSearch={handleSearchSubmit}
      />
      <div className={styles.actions}>
        <div className={styles.layouts}>
          <Button
            icon={<AppstoreOutlined />}
            type={layout === 'Appstore' ? 'primary' : 'text'}
            className={styles.button}
            onClick={() => handleLayoutChange('Appstore')}
          />
          <div className={styles.line}></div>
          <Button
            icon={<UnorderedListOutlined />}
            type={layout === 'UnorderedList' ? 'primary' : 'text'}
            className={styles.button}
            onClick={() => handleLayoutChange('UnorderedList')}
          />
        </div>
        <div className={styles.dropdownTrigger}>
          <Select
            value={sortOption}
            className={styles.select}
            onChange={handleSortChange}
            options={[
              { value: 'default', label: 'Без сортировки' },
              { value: 'title-asc', label: 'По названию(А → Я)' },
              { value: 'title-desc', label: 'По названию(Я → А)' },
              { value: 'createdAt-desc', label: 'По новизне(сначала новые)' },
              { value: 'createdAt-asc', label: 'По новизне(сначала старые)' },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;