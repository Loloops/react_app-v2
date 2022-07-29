import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { SearchContext } from '../App';

import Category from '../components/Category';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortLists } from '../components/Sort';

import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setSort, setCurrentPage, setFilters } from '../redux/slices/filterSilice';
import { setItems } from '../redux/slices/pizzasSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isUrlSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const filter = useSelector((state) => ({
    category: state.filterSilice.categoryValue,
    sort: state.filterSilice.sortObj,
    page: state.filterSilice.currentPage,
  }));
  const pizzasItems = useSelector((state) => ({
    items: state.pizzasSlice.items,
  }));

  // const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { searchValue } = React.useContext(SearchContext);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: filter.sort.sortProperty,
        categoryValue: filter.category,
        currentPage: filter.page,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [filter.category, filter.sort, filter.page]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortObj = sortLists.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sortObj,
        }),
      );

      isUrlSearch.current = true;
    }
  }, []);

  const fetchPizzas = async () => {
    setIsLoading(true);

    const filterCategory = filter.category !== 0 ? `category=${filter.category}` : '';
    const sortBy = filter.sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const replaceSymbolSort = filter.sort.sortProperty.replace('-', '');
    const search = searchValue ? `&search=${searchValue}` : '';

    try {
      const { data } = await axios.get(
        `https://62b6993542c6473c4b453c2a.mockapi.io/items?page=${filter.page}&limit=4&${filterCategory}&sortBy=${replaceSymbolSort}&order=${sortBy}${search}`,
      );

      dispatch(setItems(data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isUrlSearch.current) {
      fetchPizzas();
    }

    isUrlSearch.current = false;
  }, [filter.category, filter.sort, searchValue, filter.page]);

  const pizzas = pizzasItems.items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Category value={filter.category} onClickCategory={(i) => dispatch(setCategory(i))} />
        <Sort value={filter.sort} onClickSort={(sortObj) => dispatch(setSort(sortObj))} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => dispatch(setCurrentPage(number))} />
    </div>
  );
};
export default Home;
