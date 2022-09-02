import { ICartInitItem } from '../redux/slices/cart/cartType';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');

  return data ? JSON.parse(data) : [];
};

export const getAllPricesFromLs = () => {
  const data = localStorage.getItem('cart');

  return data
    ? JSON.parse(data).reduce(
        (sum: number, obj: ICartInitItem): number => obj.price * obj.count + sum,
        0,
      )
    : 0;
};
