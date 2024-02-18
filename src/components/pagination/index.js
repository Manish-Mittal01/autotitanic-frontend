import React, { useMemo } from "react";

export const usePagination = ({
  totalCount = 0,
  pageSize = 10,
  siblingCount = 1,
  currentPage = 1,
}) => {
  const DOTS = "...";
  const range = (start, end) => {
    let length = end - start + 1;
    /*
      Create an array of certain length and set the elements within it from
      start value to end value.
    */
    return Array.from({ length }, (_, idx) => idx + start);
  };
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    /*
    	Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
    	Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

const MyPagination = ({
  paginationDetails,
  setPaginationDetails,
  totalPosts,
  siblingCount = 1,
}) => {
  // paginationDetails, setPaginationDetails, totalPosts
  const currentPage = paginationDetails.page;
  const DOTS = "...";
  const totalPage = Math.ceil(totalPosts / paginationDetails.limit);

  const paginationRange = usePagination({
    currentPage,
    totalCount: totalPosts,
    siblingCount,
    pageSize: paginationDetails.limit,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onPageChange = (page) => {
    setPaginationDetails((prev) => ({ ...prev, page: page }));
    window.scrollTo(0, 0);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <>
      <div className="d-flex align-items-center justify-content-center paginationWrp mt-3">
        {/* <p className="mb-0">
          Showing {(currentPage - 1) * paginationDetails.limit + 1} -{" "}
          {Math.min(
            (currentPage - 1) * paginationDetails.limit + paginationDetails.limit,
            totalPosts
          )}{" "}
          of {totalPosts} data
        </p> */}
        <ul className={` rounded-pill pagination mb-0`}>
          {/* Left navigation arrow  */}
          {totalPage > 10 && (
            <li
              className={`page-item ${currentPage <= 10 ? "disabled" : ""}`}
              onClick={() => currentPage > 10 && onPageChange(currentPage - 10)}
            >
              <a className="mb-0 page-link">{"<<"}</a>
            </li>
          )}
          <li
            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => currentPage > 2 && onPageChange(currentPage - 1)}
          >
            <a className="mb-0 page-link">{"<"}</a>
          </li>
          {paginationRange.map((pageNumber) => {
            // If the pageItem is a DOT, render the DOTS unicode character
            if (pageNumber === DOTS) {
              return (
                <li key={pageNumber} className="page-item dots">
                  <a className="page-link">&#8230;</a>
                </li>
              );
            }

            // Render our Page Pills
            return (
              <li
                key={pageNumber}
                className={`page-item ${pageNumber === currentPage ? "active" : ""}`}
                onClick={() => onPageChange(pageNumber)}
              >
                <span className={`page-link ${pageNumber === currentPage ? "mainDarkColor" : ""}`}>
                  {" "}
                  {pageNumber}
                </span>
              </li>
            );
          })}
          {/* Right Navigation arrow */}
          <li
            className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}
            onClick={() => currentPage < lastPage && onPageChange(currentPage + 1)}
          >
            {/* <div className="arrow right" />  */}
            <a className="page-link">{">"}</a>
          </li>
          {totalPage > 10 && (
            <li
              className={`page-item ${currentPage >= lastPage - 10 ? "disabled" : ""}`}
              onClick={() => currentPage < lastPage - 10 && onPageChange(currentPage + 10)}
            >
              <a className="page-link mb-0">{">>"}</a>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default MyPagination;
