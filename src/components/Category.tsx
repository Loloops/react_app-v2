import React from 'react';

interface CategoryProp {
  value: number;
  onClickCategory: (i: number) => void;
}

const categoryArray: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Category: React.FC<CategoryProp> = ({ value, onClickCategory }) => {
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
