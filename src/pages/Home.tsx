import React from 'react';

import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Category from '../components/Category';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortLists } from '../components/Sort';

import { useSelector } from 'react-redux';
import {
  setCategory,
  setSort,
  setCurrentPage,
  setFilters,
  selectFilter,
} from '../redux/slices/filter/filterSilice';
import { fetchPizzas, pizzasSelector } from '../redux/slices/pizzasSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isUrlSearch = React.useRef<boolean>(false);
  const isMounted = React.useRef<boolean>(false);

  const {
    categoryValue: category,
    currentPage: page,
    sortObj: sort,
    searchValue,
  } = useSelector(selectFilter);
  const { items, status } = useSelector(pizzasSelector);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString: string = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryValue: category,
        currentPage: page,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [category, sort, page]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortObj = sortLists.find((obj) => obj.sortProperty === params.sortProperty);

      if (params && sortObj) {
        dispatch(
          setFilters({
            ...params,
            sortObj,
          }),
        );
      }

      isUrlSearch.current = true;
    }
  }, []);

  const getPizzas = async () => {
    const filterCategory: string = category !== 0 ? `category=${category}` : '';
    const sortBy: string = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const replaceSymbolSort: string = sort.sortProperty.replace('-', '');
    const search: string = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        filterCategory,
        sortBy,
        replaceSymbolSort,
        search,
        page,
      }),
    );
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isUrlSearch.current) {
      getPizzas();
    }

    isUrlSearch.current = false;
  }, [category, sort, searchValue, page]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      {status === 'fetch error' ? (
        <div className="home-error">
          <h2>Непредвиденная ошибка или пиццы не найдены 😕</h2>
          <p>попробуйте найти что то другое или зайдите на сайт позже</p>
        </div>
      ) : (
        <>
          <div className="content__top">
            <Category value={category} onClickCategory={(i) => dispatch(setCategory(i))} />
            <Sort value={sort} onClickSort={(sortObj) => dispatch(setSort(sortObj))} />
          </div>

          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
          <Pagination onChangePage={(number) => dispatch(setCurrentPage(number.toString()))} />
        </>
      )}
    </div>
  );
};
export default Home;
