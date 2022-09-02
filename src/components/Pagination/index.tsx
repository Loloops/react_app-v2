import React from 'react';

import styles from './Pagination.module.scss';

import ReactPaginate from 'react-paginate';

interface PaginationProps {
  onChangePage: (param: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3} //бэк не возвращает кол-во страниц => hardcode
      />
    </>
  );
};
