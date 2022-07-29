import { configureStore } from '@reduxjs/toolkit';
import filterSilice from './slices/filterSilice';
import cartSlice from './slices/cartSlice';
import pizzasSlice from './slices/pizzasSlice';

export const store = configureStore({
  reducer: {
    filterSilice,
    cartSlice,
    pizzasSlice,
  },
});
