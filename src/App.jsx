import React from 'react';

import './scss/app.scss';

import Category from './components/Category';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';

import pizzas from './assets/pizzas.json';

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Category />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((item, i) => (
              <PizzaBlock
                key={item.id}
                pizzaImage={item.imageUrl}
                pizzaTitle={item.title}
                pizzaPrice={item.price}
                pizzaType={item.types}
                pizzaSize={item.sizes}
                pizzaCategory={item.category}
                pizzaRating={item.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
