export interface ICartItemAdd {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  type: string;
  size: number;
}

export interface ICartInitItem extends ICartItemAdd {
  count: number;
}
