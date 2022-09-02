export interface iFetchQ {
  [filters: string]: string;
}

export type PizzaInitItems = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export interface IPizzaInitState {
  items: PizzaInitItems[];
  status: FetchStatus;
}

export enum FetchStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'fetch error',
}
