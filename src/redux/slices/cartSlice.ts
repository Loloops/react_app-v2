import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type CartInitItems = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  type: string;
  size: number;
  count: number;
};

interface CartInitState {
  totalPrice: number;
  items: CartInitItems[];
}

const initialState: CartInitState = {
  totalPrice: 0,
  items: [],
};

const totalPrice = (sum: number, obj: CartInitItems): number => {
  return obj.price * obj.count + sum;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce(totalPrice, 0);
    },
    minusItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) findItem.count--;

      if (findItem && findItem.count < 1) {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
      }

      state.totalPrice = state.items.reduce(totalPrice, 0);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      state.totalPrice = state.items.reduce(totalPrice, 0);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cartSlice;

export const selectTotalItems = (state: RootState) =>
  state.cartSlice.items.reduce((sum: number, obj): number => obj.count + sum, 0);

export const selectItemById = (id: string) => (state: RootState) =>
  state.cartSlice.items.find((obj) => obj.id === id); //первое значение идет от функции selectItemById потом useSelector передает state

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
