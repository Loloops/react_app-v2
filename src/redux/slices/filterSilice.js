import { createSlice } from '@reduxjs/toolkit';

const initState = {
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
  },
});

export const { setCategory, setSort, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
