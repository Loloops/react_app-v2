import React from 'react';

interface CategoryProp {
  value: number;
  onClickCategory: (i: number) => void;
}

const categoryArray: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Category: React.FC<CategoryProp> = React.memo(({ value, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categoryArray.map((category, i) => (
          <li
            key={category}
            onClick={() => onClickCategory(i)}
            className={+value === i ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
});
