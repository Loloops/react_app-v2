import axios from 'axios';
import React from 'react';

import { useParams } from 'react-router-dom';

const FullPizza = () => {
  const { pizzaId } = useParams();
  const [pizza, setPizza] = React.useState();

  React.useEffect(() => {
    async function getPizza() {
      try {
        const { data } = await axios.get(
          `https://62b6993542c6473c4b453c2a.mockapi.io/items/${pizzaId}`,
        );
        setPizza(data);
      } catch (error) {
        console.log('Fetch Error');
      }
    }

    getPizza();
  }, [pizzaId]);

  if (!pizza) {
    return <div>Загрузка...</div>;
  }

  const { imageUrl, title } = pizza;

  return (
    <div className="container">
      <img src={imageUrl} alt={`pizza-${pizzaId}`} />
      <h2>{title}</h2>
    </div>
  );
};

export default FullPizza;
