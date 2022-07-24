import React from 'react';

const Category = ({ value, onClickCategory }) => {
  const categoryArray = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categoryArray.map((category, i) => (
          <li
            key={category}
            onClick={() => onClickCategory(i)}
            className={value === i ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
