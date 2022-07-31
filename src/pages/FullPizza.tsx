import axios from 'axios';
import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';

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

const FullPizza: React.FC = () => {
  const { pizzaId } = useParams<string>();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState<IPizza>();

  React.useEffect(() => {
    async function getPizza() {
      try {
        const { data } = await axios.get(
          `https://62b6993542c6473c4b453c2a.mockapi.io/items/${pizzaId}`,
        );
        setPizza(data);
      } catch (error) {
        alert(`Ошибка страницы ${error}`);
        navigate('/');
      }
    }

    getPizza();
  }, [pizzaId]);

  if (!pizza) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt={`pizza-${pizzaId}`} />
      <h2>{pizza.title}</h2>
    </div>
  );
};

export default FullPizza;
