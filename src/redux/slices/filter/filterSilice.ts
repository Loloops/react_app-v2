import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IFilterInitState, TInitSortObject } from './filterType';

const initialState: IFilterInitState = {
  searchValue: '',
  categoryValue: 0, //
  currentPage: '1', //
  sortObj: {
    name: 'популярности (убыв.)',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.categoryValue = action.payload;
    },
    setSort: (state, action: PayloadAction<TInitSortObject>) => {
      state.sortObj = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.sortObj = action.payload.sortObj;
      state.categoryValue = +action.payload.categoryValue;
      state.currentPage = action.payload.currentPage;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const selectFilter = (state: RootState) => state.filterSilice;

export const { setCategory, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
