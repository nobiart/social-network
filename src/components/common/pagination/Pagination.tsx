import s from "./Pagination.module.css";
import {useState} from "react";

interface IPaginationProps {
  totalItemsCount: number,
  pageSize: number,
  currentPage: number,
  onChangePage: (page: number) => void,
  portionSize: number,
}

export const Pagination = ({
                             totalItemsCount,
                             pageSize,
                             currentPage,
                             onChangePage,
                             portionSize = 10,
                           }: IPaginationProps) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages: number[] = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionsCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
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
              className={s.pageItem + " " + (currentPage === p ? s.active : '')}
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
