import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface iFetchQ {
  [filters: string]: string;
}

type PizzaInitItems = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

interface IPizzaInitState {
  items: PizzaInitItems[];
  status: FetchStatus;
}

enum FetchStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'fetch error',
}

export const fetchPizzas = createAsyncThunk<
  PizzaInitItems[],
  iFetchQ,
  {
    rejectValue: string;
    fulfilledMeta: any;
  }
>('pizzas/fetchPizzasStatus', async (params, thunkAPI) => {
  const { filterCategory, sortBy, replaceSymbolSort, search, page } = params;
  const { data } = await axios.get<PizzaInitItems[]>(
    `https://62b6993542c6473c4b453c2a.mockapi.io/items?page=${page}&limit=4&${filterCategory}&sortBy=${replaceSymbolSort}&order=${sortBy}${search}`,
  );

  if (data.length === 0) return thunkAPI.rejectWithValue('empty array');

  return thunkAPI.fulfillWithValue(data, null);
});

const initialState: IPizzaInitState = {
  items: [],
  status: FetchStatus.LOADING,
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    // setItems: (state, action) => {
    //   state.items = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = FetchStatus.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = FetchStatus.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      console.log(FetchStatus.ERROR);
      state.status = FetchStatus.ERROR;
      state.items = [];
    });
  },
});

export const pizzasSelector = (state: RootState) => state.pizzasSlice;

// export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
