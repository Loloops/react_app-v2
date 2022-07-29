import { createSlice } from '@reduxjs/toolkit';

const initState = {
  items: [],
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState: initState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
