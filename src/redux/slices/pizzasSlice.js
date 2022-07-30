import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const { filterCategory, sortBy, replaceSymbolSort, search, page } = params;
    const { data } = await axios.get(
      `https://62b6993542c6473c4b453c2a.mockapi.io/items?page=${page}&limit=4&${filterCategory}&sortBy=${replaceSymbolSort}&order=${sortBy}${search}`,
    );

    if (data.length === 0) return thunkAPI.rejectWithValue('empty array');

    // return thunkAPI.fulfillWithValue(data);
    return data;
  },
);

const initState = {
  items: [],
  status: 'loading', // loading | success | error
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState: initState,
  reducers: {
    // setItems: (state, action) => {
    //   state.items = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      console.log('fetch error!');
      state.status = 'error';
      state.items = [];
    });
  },
});

export const pizzasSelector = (state) => state.pizzasSlice;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
