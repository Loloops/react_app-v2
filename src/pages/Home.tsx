import React from 'react';

import { SortListType } from '../utils/componentTypes';

import { useNavigate } from 'react-router-dom';

import {
  setCategory,
  setSort,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filter/filterSilice';
import { fetchPizzas } from '../redux/slices/pizzas/pizzasSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { IFilter } from '../redux/slices/filter/filterType';
import { selectFilter } from '../redux/slices/filter/filterSelector';
import { pizzasSelector } from '../redux/slices/pizzas/pizzasSelectors';

import { Category, Pagination, PizzaBlock, Skeleton, Sort, sortLists } from '../components';

import qs from 'qs';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    categoryValue: category,
    currentPage: page,
    sortObj: sort,
    searchValue,
  } = useAppSelector(selectFilter);
  const { items, status } = useAppSelector(pizzasSelector);

  const isUrlSearch = React.useRef<boolean>(false);
  const isMounted = React.useRef<boolean>(false);

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
      const params = qs.parse(window.location.search.substring(1)) as unknown as IFilter;
      const sortObj = sortLists.find((obj) => obj.sortProperty === params.sortProperty);

      if (sortObj) {
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
    const filterCategory: string = +category !== 0 ? `category=${category}` : '';
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

  const onChangeCategory = React.useCallback((i: number) => {
    dispatch(setCategory(i.toString()));
  }, []);

  const onChangeSort = React.useCallback((sortObj: SortListType) => {
    dispatch(setSort(sortObj));
  }, []);

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
            <Category value={+category} onClickCategory={onChangeCategory} />
            <Sort value={sort} onClickSort={onChangeSort} />
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
