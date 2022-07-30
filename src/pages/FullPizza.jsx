import axios from 'axios';
import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';

const FullPizza = () => {
  const { pizzaId } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState();

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

  const { imageUrl, title } = pizza;

  return (
    <div className="container">
      <img src={imageUrl} alt={`pizza-${pizzaId}`} />
      <h2>{title}</h2>
    </div>
  );
};

export default FullPizza;
