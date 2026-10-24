"use client";

import {
  useMemo,
} from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;

  onPageChange: (
    page: number
  ) => void;

  totalItems?: number;
  pageSize?: number;

  showItemCount?: boolean;

  maxVisiblePages?: number;

  disabled?: boolean;

  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = 10,
  showItemCount = true,
  maxVisiblePages = 5,
  disabled = false,
  className = "",
}: PaginationProps) {
  const safeTotalPages =
    Math.max(1, totalPages);

  const safeCurrentPage =
    Math.min(
      Math.max(1, currentPage),
      safeTotalPages
    );

  const pageNumbers = useMemo(() => {
    const pages: (
      number | "ellipsis"
    )[] = [];

    const maxPages = Math.max(
      3,
      maxVisiblePages
    );

    if (
      safeTotalPages <= maxPages
    ) {
      for (
        let page = 1;
        page <= safeTotalPages;
        page++
      ) {
        pages.push(page);
      }

      return pages;
    }

    pages.push(1);

    const middlePages =
      maxPages - 2;

    let startPage =
      safeCurrentPage -
      Math.floor(
        middlePages / 2
      );

    let endPage =
      safeCurrentPage +
      Math.floor(
        middlePages / 2
      );

    if (startPage < 2) {
      startPage = 2;
      endPage =
        startPage +
        middlePages -
        1;
    }

    if (
      endPage >
      safeTotalPages - 1
    ) {
      endPage =
        safeTotalPages - 1;

      startPage =
        endPage -
        middlePages +
        1;
    }

    if (startPage > 2) {
      pages.push("ellipsis");
    }

    for (
      let page = startPage;
      page <= endPage;
      page++
    ) {
      pages.push(page);
    }

    if (
      endPage <
      safeTotalPages - 1
    ) {
      pages.push("ellipsis");
    }

    pages.push(safeTotalPages);

    return pages;
  }, [
    safeCurrentPage,
    safeTotalPages,
    maxVisiblePages,
  ]);

  const startItem =
    totalItems !== undefined &&
    totalItems > 0
      ? (safeCurrentPage - 1) *
          pageSize +
        1
      : 0;

  const endItem =
    totalItems !== undefined &&
    totalItems > 0
      ? Math.min(
          safeCurrentPage *
            pageSize,
          totalItems
        )
      : 0;

  function handlePageChange(
    page: number
  ) {
    if (
      disabled ||
      page < 1 ||
      page > safeTotalPages ||
      page === safeCurrentPage
    ) {
      return;
    }

    onPageChange(page);
  }

  return (
    <div
      className={`flex flex-col gap-3 border-t border-slate-200 bg-slate-50/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >

      {/* ITEM COUNT */}

      {showItemCount &&
      totalItems !== undefined ? (
        <p className="text-[10px] font-medium text-slate-500">
          Showing{" "}
          <span className="font-bold text-slate-700">
            {startItem}
          </span>{" "}
          to{" "}
          <span className="font-bold text-slate-700">
            {endItem}
          </span>{" "}
          of{" "}
          <span className="font-bold text-slate-700">
            {totalItems}
          </span>{" "}
          records
        </p>
      ) : (
        <div />
      )}

      {/* PAGINATION */}

      <nav
        aria-label="Pagination"
        className="flex items-center justify-end gap-1"
      >

        {/* PREVIOUS */}

        <button
          type="button"
          aria-label="Previous page"
          onClick={() =>
            handlePageChange(
              safeCurrentPage - 1
            )
          }
          disabled={
            disabled ||
            safeCurrentPage === 1
          }
          className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-[10px] font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span aria-hidden="true">
            ←
          </span>

          <span className="sr-only">
            Previous
          </span>
        </button>

        {/* PAGE NUMBERS */}

        {pageNumbers.map(
          (page, index) => {
            if (
              page === "ellipsis"
            ) {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-8 min-w-8 items-center justify-center px-1 text-[10px] font-bold text-slate-400"
                  aria-hidden="true"
                >
                  ...
                </span>
              );
            }

            const isActive =
              page ===
              safeCurrentPage;

            return (
              <button
                key={page}
                type="button"
                aria-label={`Go to page ${page}`}
                aria-current={
                  isActive
                    ? "page"
                    : undefined
                }
                onClick={() =>
                  handlePageChange(
                    page
                  )
                }
                disabled={disabled}
                className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-[10px] font-bold transition ${
                  isActive
                    ? "bg-orange-500 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                } ${
                  disabled
                    ? "cursor-not-allowed opacity-40"
                    : ""
                }`}
              >
                {page}
              </button>
            );
          }
        )}

        {/* NEXT */}

        <button
          type="button"
          aria-label="Next page"
          onClick={() =>
            handlePageChange(
              safeCurrentPage + 1
            )
          }
          disabled={
            disabled ||
            safeCurrentPage ===
              safeTotalPages
          }
          className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-[10px] font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span aria-hidden="true">
            →
          </span>

          <span className="sr-only">
            Next
          </span>
        </button>

      </nav>

    </div>
  );
}