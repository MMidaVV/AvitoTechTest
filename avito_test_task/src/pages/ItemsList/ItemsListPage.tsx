import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import { fetchItems } from '../../features/items/itemsSlice';

import SellerInfo from '../../components/SellerInfo/SellerInfo';
import Search from '../../components/Search/Search';
import Feed from '../../components/Feed/Feed';

const ItemsListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const items = useSelector((state: RootState) => state.items.items);
  const total = useSelector((state: RootState) => state.items.total);
  const itemsPerPage = useSelector((state: RootState) => state.ui.itemsPerPage);
  const searchQuery = useSelector((state: RootState) => state.ui.searchQuery);
  const sortOption = useSelector((state: RootState) => state.ui.sortOption);
  const selectedCategories = useSelector((state: RootState) => state.ui.selectedCategories);
  const needsRevision = useSelector((state: RootState) => state.ui.needsRevision);

  useEffect(() => {
    const params: any = {
      limit: itemsPerPage,
      skip: 0,
    };

    if (searchQuery) params.q = searchQuery;
    if (selectedCategories.length > 0) params.categories = selectedCategories.join(',');
    if (needsRevision) params.needsRevision = true;

    const sortParams = getSortParams(sortOption);
    Object.assign(params, sortParams);

    dispatch(fetchItems(params));
  }, [dispatch, itemsPerPage, searchQuery, selectedCategories, needsRevision, sortOption]);

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
    <>
      <SellerInfo total={total}/>
      <Search />
      <Feed items={items} />
    </>
  );
};

export default ItemsListPage;