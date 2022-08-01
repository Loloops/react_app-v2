import { configureStore } from '@reduxjs/toolkit';
import filterSilice from './slices/filter/filterSilice';
import cartSlice from './slices/cart/cartSlice';
import pizzasSlice from './slices/pizzasSlice';

export const store = configureStore({
  reducer: {
    filterSilice,
    cartSlice,
    pizzasSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
