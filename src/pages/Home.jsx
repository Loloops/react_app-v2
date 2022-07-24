import React from 'react';

import { SearchContext } from '../App';

import Category from '../components/Category';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../redux/slices/filterSilice';

const Home = () => {
  //redux-toolkit
  const category = useSelector((state) => state.filterSilice.categoryValue);
  const dispatch = useDispatch();
  //
  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  //for pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  //for sorting
  const [sort, setSort] = React.useState({
    name: 'популярности (убыв.)',
    sortProperty: 'rating',
  });
  //const [category, setCategory] = React.useState(0);

  React.useEffect(() => {
    setIsLoading(true);

    const filterCategory = category !== 0 ? `category=${category}` : '';
    const sortBy = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const replaceSymbolSort = sort.sortProperty.replace('-', '');
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://62b6993542c6473c4b453c2a.mockapi.io/items?page=${currentPage}&limit=4&${filterCategory}&sortBy=${replaceSymbolSort}&order=${sortBy}${search}`,
    )
      .then((resp) => resp.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [category, sort, searchValue, currentPage]);

  const pizzas = items
    //for static elem
    // .filter((obj) => {
    //   return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    // })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Category value={category} onClickCategory={(i) => dispatch(setCategory(i))} />
        <Sort value={sort} onClickSort={(sortObj) => setSort(sortObj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};
export default Home;
