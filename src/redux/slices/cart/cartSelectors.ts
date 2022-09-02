import { RootState } from '../../store';

export const selectCart = (state: RootState) => state.cartSlice;

export const selectTotalItems = (state: RootState) =>
  state.cartSlice.items.reduce((sum: number, obj): number => obj.count + sum, 0);

export const selectItemById = (id: string) => (state: RootState) =>
  state.cartSlice.items.find((obj) => obj.id === id); //первое значение идет от функции selectItemById потом useSelector передает state
