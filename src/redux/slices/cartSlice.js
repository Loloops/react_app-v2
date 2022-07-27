import { createSlice } from '@reduxjs/toolkit';

const initState = {
  totalPrice: 0,
  items: [],
};

const totalPrice = (sum, obj) => {
  return obj.price * obj.count + sum;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initState,
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

      if (findItem.count < 1) {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
      }

      state.totalPrice = state.items.reduce(totalPrice, 0);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      state.totalPrice = state.items.reduce(totalPrice, 0);
    },
    clearItems: (state, action) => {
      state.items = [];

      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
