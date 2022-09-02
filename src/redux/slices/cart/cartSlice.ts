import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllPricesFromLs, getCartFromLS } from '../../../utils/getItemsFromLS';
import { ICartInitItem, ICartInitState, ICartItemAdd } from './cartType';

const initialState: ICartInitState = {
  totalPrice: getAllPricesFromLs(),
  items: getCartFromLS(),
};

const totalPrice = (sum: number, obj: ICartInitItem): number => {
  return obj.price * obj.count + sum;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICartItemAdd>) => {
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
    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) findItem.count--;

      if (findItem && findItem.count < 1) {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
      }

      state.totalPrice = state.items.reduce(totalPrice, 0);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      state.totalPrice = state.items.reduce(totalPrice, 0);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
