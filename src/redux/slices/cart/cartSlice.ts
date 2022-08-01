import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ICartInitItem, ICartItemAdd } from './cartType';

interface ICartInitState {
  totalPrice: number;
  items: ICartInitItem[];
}

const initialState: ICartInitState = {
  totalPrice: 0,
  items: [],
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

export const selectCart = (state: RootState) => state.cartSlice;

export const selectTotalItems = (state: RootState) =>
  state.cartSlice.items.reduce((sum: number, obj): number => obj.count + sum, 0);

export const selectItemById = (id: string) => (state: RootState) =>
  state.cartSlice.items.find((obj) => obj.id === id); //первое значение идет от функции selectItemById потом useSelector передает state

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
