import s from "./Pagination.module.css";
import {useState} from "react";
import classNames from "classnames";

type PaginationPropsType = {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
  onChangePage: (page: number) => void;
  portionSize?: number;
}

export const Pagination = ({
                             totalItemsCount,
                             pageSize,
                             currentPage,
                             onChangePage,
                             portionSize = 10,
                           }: PaginationPropsType) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages: number[] = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionsCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState<number>(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={s.pagination}>
      {portionNumber > 1 && (
        <button onClick={() => setPortionNumber(portionNumber - 1)}>Prev</button>
      )}
      {pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(p => {
          return (
            <span
              key={p}
              onClick={() => onChangePage(p)}
              className={classNames({
                [s.active]: currentPage === p
              }, s.pageItem)}
            >
                {p}
              </span>
          )
        })}
      {portionsCount > portionNumber && (
        <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>
      )}
    </div>
  )
};
