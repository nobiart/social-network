import s from "./Pagination.module.css";

interface IPaginationProps {
  totalCount: number,
  pageSize: number,
  currentPage: number,
  onChangePage: (page: number) => void,
}

export const Pagination = ({
                             totalCount,
                             pageSize,
                             currentPage,
                             onChangePage,
                           }: IPaginationProps) => {
  const pagesCount = Math.ceil(totalCount / pageSize);
  const pages: number[] = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={s.pagination}>
      {pages.map(p => {
        return (
          <span
            key={p}
            onClick={() => onChangePage(p)}
            className={currentPage === p ? s.active : ''}
          >
                {p}
              </span>
        )
      })}
    </div>
  )
};
