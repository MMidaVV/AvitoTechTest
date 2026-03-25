import { createSlice } from '@reduxjs/toolkit';

export type LayoutType = 'Appstore' | 'UnorderedList';
export type SortOption = 'default' | 'title-asc' | 'title-desc' | 'createdAt-asc' | 'createdAt-desc';

interface UiState {
  layout: LayoutType;
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
  sortOption: SortOption;
  selectedCategories: string[];
  needsRevision: boolean;
}

const getLayoutFromStorage = (): LayoutType => {
  try {
    const saved = localStorage.getItem('app-layout');
    if (saved === 'Appstore' || saved === 'UnorderedList') {
      return saved;
    }
  } catch (e) {
    console.warn('Не удалось прочитать layout из localStorage:', e);
  }
  return 'Appstore';
};

const saveLayoutToStorage = (layout: LayoutType) => {
  try {
    localStorage.setItem('app-layout', layout);
  } catch (e) {
    console.warn('Не удалось сохранить layout в localStorage:', e);
  }
};

const getItemsPerPage = (layout: LayoutType): number => {
  return layout === 'Appstore' ? 10 : 4;
};

const initialState: UiState = {
  layout: getLayoutFromStorage(),
  currentPage: 1,
  itemsPerPage: getItemsPerPage(getLayoutFromStorage()),
  searchQuery: '',
  sortOption: 'default',
  selectedCategories: [],
  needsRevision: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLayout: (state, action) => {
      state.layout = action.payload;
      state.itemsPerPage = getItemsPerPage(action.payload);
      state.currentPage = 1;
      saveLayoutToStorage(action.payload);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetPagination: (state) => {
      state.currentPage = 1;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
      state.currentPage = 1;
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
      state.currentPage = 1;
    },
    setNeedsRevision: (state, action) => {
      state.needsRevision = action.payload;
      state.currentPage = 1;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.sortOption = 'default';
      state.selectedCategories = [];
      state.needsRevision = false;
      state.currentPage = 1;
    },
  },
});

export const {
  setLayout,
  setCurrentPage,
  resetPagination,
  setSearchQuery,
  setSortOption,
  setSelectedCategories,
  setNeedsRevision,
  resetFilters,
} = uiSlice.actions;
export default uiSlice.reducer;