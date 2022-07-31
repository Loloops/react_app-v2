import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type InitSortObject = {
  name: string;
  sortProperty: string;
};

interface IFilterInitState {
  searchValue: string;
  categoryValue: number;
  currentPage: number;
  sortObj: InitSortObject;
}

const initState: IFilterInitState = {
  searchValue: '',
  categoryValue: 0, //
  currentPage: 1, //
  sortObj: {
    name: 'популярности (убыв.)',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initState,
  reducers: {
    setCategory: (state, action) => {
      state.categoryValue = action.payload;
    },
    setSort: (state, action) => {
      state.sortObj = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.sortObj = action.payload.sortObj;
      state.categoryValue = +action.payload.categoryValue;
      state.currentPage = +action.payload.currentPage;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const selectFilter = (state: RootState) => state.filterSilice;

export const { setCategory, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
