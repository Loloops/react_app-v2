import { configureStore } from '@reduxjs/toolkit';
import filterSilice from './slices/filterSilice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    filterSilice,
    cartSlice,
  },
});
