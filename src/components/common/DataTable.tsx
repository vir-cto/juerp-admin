"use client";

import {
  Fragment,
  ReactNode,
  useMemo,
  useState,
} from "react";

export interface DataTableColumn<T> {
  key: string;
  title: string;
  render?: (
    row: T,
    index: number
  ) => ReactNode;
  className?: string;
  headerClassName?: string;
  sortable?: boolean;
  sortValue?: (
    row: T
  ) => string | number | Date | null | undefined;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];

  rowKey: (
    row: T,
    index: number
  ) => string;

  title?: string;
  description?: string;

  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: (
    keyof T
  )[];

  loading?: boolean;
  loadingMessage?: string;

  emptyTitle?: string;
  emptyMessage?: string;

  pageSize?: number;
  pagination?: boolean;

  onRowClick?: (
    row: T
  ) => void;

  selectedRowKey?: string;

  actions?: (
    row: T,
    index: number
  ) => ReactNode;

  toolbar?: ReactNode;

  mobileCard?: (
    row: T,
    index: number
  ) => ReactNode;

  className?: string;

  striped?: boolean;
}

export default function DataTable<
  T extends Record<string, unknown>
>({
  columns,
  data,
  rowKey,
  title,
  description,
  searchable = false,
  searchPlaceholder = "Search...",
  searchKeys,
  loading = false,
  loadingMessage = "Loading data...",
  emptyTitle = "No records found",
  emptyMessage = "There are no records to display.",
  pageSize = 10,
  pagination = true,
  onRowClick,
  selectedRowKey,
  actions,
  toolbar,
  mobileCard,
  className = "",
  striped = false,
}: DataTableProps<T>) {
  const [search, setSearch] =
    useState("");

  const [sortKey, setSortKey] =
    useState<string | null>(null);

  const [sortDirection, setSortDirection] =
    useState<"asc" | "desc">("asc");

  const [currentPage, setCurrentPage] =
    useState(1);

  const filteredData = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) {
      return data;
    }

    return data.filter((row) => {
      if (searchKeys?.length) {
        return searchKeys.some((key) => {
          const value = row[key];

          if (
            value === null ||
            value === undefined
          ) {
            return false;
          }

          return String(value)
            .toLowerCase()
            .includes(query);
        });
      }

      return Object.values(row).some(
        (value) => {
          if (
            value === null ||
            value === undefined
          ) {
            return false;
          }

          if (
            typeof value === "object"
          ) {
            return false;
          }

          return String(value)
            .toLowerCase()
            .includes(query);
        }
      );
    });
  }, [
    data,
    search,
    searchKeys,
  ]);

  const sortedData = useMemo(() => {
    if (!sortKey) {
      return filteredData;
    }

    const column = columns.find(
      (item) =>
        item.key === sortKey
    );

    if (!column) {
      return filteredData;
    }

    const sorted = [
      ...filteredData,
    ].sort((a, b) => {
      const first = column.sortValue
        ? column.sortValue(a)
        : a[sortKey];

      const second = column.sortValue
        ? column.sortValue(b)
        : b[sortKey];

      if (
        first === null ||
        first === undefined
      ) {
        return 1;
      }

      if (
        second === null ||
        second === undefined
      ) {
        return -1;
      }

      const firstValue =
        first instanceof Date
          ? first.getTime()
          : typeof first === "number"
          ? first
          : String(first).toLowerCase();

      const secondValue =
        second instanceof Date
          ? second.getTime()
          : typeof second === "number"
          ? second
          : String(second).toLowerCase();

      if (
        firstValue < secondValue
      ) {
        return sortDirection === "asc"
          ? -1
          : 1;
      }

      if (
        firstValue > secondValue
      ) {
        return sortDirection === "asc"
          ? 1
          : -1;
      }

      return 0;
    });

    return sorted;
  }, [
    filteredData,
    columns,
    sortKey,
    sortDirection,
  ]);

  const totalPages =
    pagination && pageSize > 0
      ? Math.max(
          1,
          Math.ceil(
            sortedData.length /
              pageSize
          )
        )
      : 1;

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages
    );

  const paginatedData =
    pagination && pageSize > 0
      ? sortedData.slice(
          (safeCurrentPage - 1) *
            pageSize,
          safeCurrentPage *
            pageSize
        )
      : sortedData;

  function handleSearch(
    value: string
  ) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleSort(
    column: DataTableColumn<T>
  ) {
    if (!column.sortable) {
      return;
    }

    if (sortKey === column.key) {
      setSortDirection(
        (previous) =>
          previous === "asc"
            ? "desc"
            : "asc"
      );
    } else {
      setSortKey(column.key);
      setSortDirection("asc");
    }

    setCurrentPage(1);
  }

  function goToPage(
    page: number
  ) {
    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);
  }

  function getPageNumbers() {
    const pages: number[] = [];

    if (totalPages <= 5) {
      for (
        let page = 1;
        page <= totalPages;
        page++
      ) {
        pages.push(page);
      }

      return pages;
    }

    pages.push(1);

    if (safeCurrentPage > 3) {
      pages.push(-1);
    }

    const start = Math.max(
      2,
      safeCurrentPage - 1
    );

    const end = Math.min(
      totalPages - 1,
      safeCurrentPage + 1
    );

    for (
      let page = start;
      page <= end;
      page++
    ) {
      pages.push(page);
    }

    if (
      safeCurrentPage <
      totalPages - 2
    ) {
      pages.push(-1);
    }

    pages.push(totalPages);

    return pages;
  }

  const startRecord =
    sortedData.length === 0
      ? 0
      : (safeCurrentPage - 1) *
          pageSize +
        1;

  const endRecord =
    pagination && pageSize > 0
      ? Math.min(
          safeCurrentPage * pageSize,
          sortedData.length
        )
      : sortedData.length;

  return (
    <div
      className={`w-full ${className}`}
    >

      {/* HEADER */}

      {(title ||
        description ||
        searchable ||
        toolbar) && (
        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

          <div>
            {title && (
              <h2 className="text-base font-black text-slate-900">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {description}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

            {searchable && (
              <div className="relative">

                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                  ⌕
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    handleSearch(
                      event.target.value
                    )
                  }
                  placeholder={
                    searchPlaceholder
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-8 pr-3 text-xs font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 sm:w-64"
                />

              </div>
            )}

            {toolbar && (
              <div className="flex items-center gap-2">
                {toolbar}
              </div>
            )}

          </div>

        </div>
      )}

      {/* MOBILE CARDS */}

      {mobileCard && (
        <div className="space-y-3 md:hidden">

          {loading ? (
            <LoadingState
              message={loadingMessage}
            />
          ) : paginatedData.length ===
            0 ? (
            <EmptyState
              title={emptyTitle}
              message={emptyMessage}
            />
          ) : (
            paginatedData.map(
              (row, index) => {
                const key =
                  rowKey(
                    row,
                    index
                  );

                return (
                  <Fragment
                    key={key}
                  >
                    <div
                      className={`rounded-2xl border border-slate-200 bg-white shadow-sm transition ${
                        onRowClick
                          ? "cursor-pointer hover:border-orange-300 hover:shadow-md"
                          : ""
                      } ${
                        selectedRowKey ===
                        key
                          ? "border-orange-400 ring-2 ring-orange-100"
                          : ""
                      }`}
                      onClick={() =>
                        onRowClick?.(
                          row
                        )
                      }
                    >
                      {mobileCard(
                        row,
                        index
                      )}
                    </div>
                  </Fragment>
                );
              }
            )
          )}

        </div>
      )}

      {/* DESKTOP TABLE */}

      <div
        className={`${
          mobileCard
            ? "hidden md:block"
            : "block"
        } overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm`}
      >

        <div className="overflow-x-auto">

          <table className="w-full min-w-[720px] border-collapse">

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">

                {columns.map(
                  (column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className={`px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-500 ${
                        column.headerClassName ??
                        ""
                      } ${
                        column.sortable
                          ? "cursor-pointer select-none hover:bg-slate-100"
                          : ""
                      }`}
                      onClick={() =>
                        handleSort(
                          column
                        )
                      }
                    >

                      <div className="flex items-center gap-2">

                        <span>
                          {
                            column.title
                          }
                        </span>

                        {column.sortable && (
                          <span className="text-[9px] text-slate-400">
                            {sortKey ===
                            column.key
                              ? sortDirection ===
                                "asc"
                                ? "▲"
                                : "▼"
                              : "↕"}
                          </span>
                        )}

                      </div>

                    </th>
                  )
                )}

                {actions && (
                  <th
                    scope="col"
                    className="w-[1%] whitespace-nowrap px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-slate-500"
                  >
                    Actions
                  </th>
                )}

              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan={
                      columns.length +
                      (actions
                        ? 1
                        : 0)
                    }
                    className="px-4 py-10"
                  >
                    <LoadingState
                      message={
                        loadingMessage
                      }
                    />
                  </td>
                </tr>
              ) : paginatedData.length ===
                0 ? (
                <tr>
                  <td
                    colSpan={
                      columns.length +
                      (actions
                        ? 1
                        : 0)
                    }
                    className="px-4 py-10"
                  >
                    <EmptyState
                      title={
                        emptyTitle
                      }
                      message={
                        emptyMessage
                      }
                    />
                  </td>
                </tr>
              ) : (
                paginatedData.map(
                  (row, index) => {
                    const key =
                      rowKey(
                        row,
                        index
                      );

                    const actualIndex =
                      (safeCurrentPage -
                        1) *
                        pageSize +
                      index;

                    return (
                      <tr
                        key={key}
                        className={`border-b border-slate-100 transition last:border-b-0 ${
                          striped &&
                          index %
                            2 ===
                            1
                            ? "bg-slate-50/50"
                            : "bg-white"
                        } ${
                          onRowClick
                            ? "cursor-pointer hover:bg-orange-50/40"
                            : "hover:bg-slate-50/60"
                        } ${
                          selectedRowKey ===
                          key
                            ? "bg-orange-50"
                            : ""
                        }`}
                        onClick={() =>
                          onRowClick?.(
                            row
                          )
                        }
                      >

                        {columns.map(
                          (
                            column
                          ) => (
                            <td
                              key={
                                column.key
                              }
                              className={`px-4 py-3 text-xs text-slate-700 ${
                                column.className ??
                                ""
                              }`}
                            >
                              {column.render
                                ? column.render(
                                    row,
                                    actualIndex
                                  )
                                : String(
                                    row[
                                      column.key
                                    ] ??
                                      "—"
                                  )}
                            </td>
                          )
                        )}

                        {actions && (
                          <td
                            className="px-4 py-3 text-right"
                            onClick={(
                              event
                            ) =>
                              event.stopPropagation()
                            }
                          >
                            {actions(
                              row,
                              actualIndex
                            )}
                          </td>
                        )}

                      </tr>
                    );
                  }
                )
              )}

            </tbody>

          </table>

        </div>

        {/* PAGINATION */}

        {pagination &&
          !loading &&
          sortedData.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50/50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-[10px] font-medium text-slate-500">
                Showing{" "}
                <span className="font-bold text-slate-700">
                  {startRecord}
                </span>{" "}
                to{" "}
                <span className="font-bold text-slate-700">
                  {endRecord}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-700">
                  {sortedData.length}
                </span>{" "}
                records
              </p>

              {totalPages > 1 && (
                <div className="flex items-center gap-1">

                  <button
                    type="button"
                    onClick={() =>
                      goToPage(
                        safeCurrentPage -
                          1
                      )
                    }
                    disabled={
                      safeCurrentPage ===
                      1
                    }
                    className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-[10px] font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ←
                  </button>

                  {getPageNumbers().map(
                    (
                      page,
                      index
                    ) =>
                      page === -1 ? (
                        <span
                          key={`ellipsis-${index}`}
                          className="flex h-8 min-w-8 items-center justify-center text-[10px] text-slate-400"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          type="button"
                          onClick={() =>
                            goToPage(
                              page
                            )
                          }
                          className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-[10px] font-bold transition ${
                            safeCurrentPage ===
                            page
                              ? "bg-orange-500 text-white shadow-sm"
                              : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {page}
                        </button>
                      )
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      goToPage(
                        safeCurrentPage +
                          1
                      )
                    }
                    disabled={
                      safeCurrentPage ===
                      totalPages
                    }
                    className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-[10px] font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    →
                  </button>

                </div>
              )}

            </div>
          )}

      </div>

    </div>
  );
}

function LoadingState({
  message,
}: {
  message: string;
}) {
  return (
    <div className="flex min-h-[180px] flex-col items-center justify-center">

      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-orange-500" />

      <p className="mt-3 text-xs font-semibold text-slate-600">
        {message}
      </p>

    </div>
  );
}

function EmptyState({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="flex min-h-[180px] flex-col items-center justify-center px-5 text-center">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-lg font-black text-slate-400">
        —
      </div>

      <h3 className="mt-3 text-sm font-black text-slate-800">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-[10px] leading-5 text-slate-500">
        {message}
      </p>

    </div>
  );
}