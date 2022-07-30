import { createSlice } from '@reduxjs/toolkit';

const initState = {
  searchValue: '',
  categoryValue: 0,
  currentPage: 1,
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
      state.categoryValue = Number(action.payload.categoryValue);
      state.currentPage = Number(action.payload.currentPage);
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const selectFilter = (state) => state.filterSilice;

export const { setCategory, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
