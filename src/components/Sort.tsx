import React from 'react';

interface SortListType {
  name: string;
  sortProperty: string;
}

interface SortComponentProps {
  value: SortListType;
  onClickSort: (sortProp: SortListType) => void;
}

export const sortLists: SortListType[] = [
  { name: 'популярности (убыв.)', sortProperty: 'rating' },
  { name: 'популярности (возраст.)', sortProperty: '-rating' },
  { name: 'цене (убыв.)', sortProperty: 'price' },
  { name: 'цене (возраст.)', sortProperty: '-price' },
  { name: 'алфавиту (убыв.)', sortProperty: 'title' },
  { name: 'алфавиту (возраст.)', sortProperty: '-title' },
];

const Sort: React.FC<SortComponentProps> = ({ value, onClickSort }) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const sortRef = React.useRef<HTMLDivElement | null>(null);

  const chooseSort = (sortProp: SortListType): void => {
    onClickSort(sortProp);
    setIsVisible(false);
  };

  React.useEffect(() => {
    const sortEvent = (event: any): void => {
      let path = event.path || (event.composedPath && event.composedPath());

      if (!path.includes(sortRef.current)) {
        setIsVisible(false);
      }
    };

    document.body.addEventListener('click', sortEvent);

    return () => document.body.removeEventListener('click', sortEvent);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{value.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {sortLists.map((obj: SortListType, i: number) => (
              <li
                onClick={(): void => chooseSort(obj)}
                key={i}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
