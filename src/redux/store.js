import { configureStore } from '@reduxjs/toolkit';
import filterSilice from './slices/filterSilice';

export const store = configureStore({
  reducer: {
    filterSilice,
  },
});
