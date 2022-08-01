export interface IPizza {
  category: number;
  id: string;
  imageUrl: string;
  price: number;
  rating: string;
  sizes: number[];
  title: string;
  types: number[];
}

export interface ICartItemAdd {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  type: string;
  size: number;
}

export interface ICartItemProps extends ICartItemAdd {
  count: number;
}
