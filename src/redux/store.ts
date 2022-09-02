import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import filterSilice from './slices/filter/filterSilice';
import cartSlice from './slices/cart/cartSlice';
import pizzasSlice from './slices/pizzas/pizzasSlice';

export const store = configureStore({
  reducer: {
    filterSilice,
    cartSlice,
    pizzasSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
