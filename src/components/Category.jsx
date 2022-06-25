import React, { useState } from 'react';

const Category = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const categoryArray = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categoryArray.map((category, i) => (
          <li
            key={category}
            onClick={() => setActiveCategory(i)}
            className={activeCategory === i ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
