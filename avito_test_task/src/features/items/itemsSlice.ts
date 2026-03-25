import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Item, ItemPreview, ItemsGetOut } from '../../types/api';

export type ItemsQueryParams = {
  q?: string;
  limit?: number;
  skip?: number;
  needsRevision?: boolean;
  categories?: string;
  sortColumn?: 'title' | 'createdAt';
  sortDirection?: 'asc' | 'desc';
};

export const fetchItems = createAsyncThunk<ItemsGetOut, ItemsQueryParams>(
  'items/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get<ItemsGetOut>(
        'http://127.0.0.1:8080/items',
        { params }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchItemById = createAsyncThunk<Item, string>(
  'items/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<Item>(`http://127.0.0.1:8080/items/${id}`)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

interface ItemsState {
  items: ItemPreview[];
  currentItem: Item | null;
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  currentItem: null,
  total: 0,
  loading: false,
  error: null,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearCurrentItem: (state) => {
      state.currentItem = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = [];
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload; 
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentItem, clearError } = itemsSlice.actions;
export default itemsSlice.reducer;