"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

export type ScopeSelectorType =
  | "GLOBAL"
  | "STATE"
  | "DISTRICT"
  | "PINCODE";

export interface ScopeOption {
  id: string;
  name: string;
  type: ScopeSelectorType;
  parentId?: string;
  parentName?: string;
  pincode?: string;
  active?: boolean;
}

export interface ScopeSelectorValue {
  type: ScopeSelectorType;
  id: string;
  name: string;
}

export interface ScopeSelectorProps {
  value?: ScopeSelectorValue | null;

  options?: ScopeOption[];

  allowedScopeTypes?: ScopeSelectorType[];

  onChange?: (
    value: ScopeSelectorValue
  ) => void;

  disabled?: boolean;

  loading?: boolean;

  label?: string;

  placeholder?: string;

  showHierarchy?: boolean;

  showSearch?: boolean;

  className?: string;
}

const DEFAULT_OPTIONS: ScopeOption[] = [
  {
    id: "GLOBAL",
    name: "All India",
    type: "GLOBAL",
    active: true,
  },

  {
    id: "STATE-AP",
    name: "Andhra Pradesh",
    type: "STATE",
    active: true,
  },

  {
    id: "STATE-TG",
    name: "Telangana",
    type: "STATE",
    active: true,
  },

  {
    id: "DIST-GUNTUR",
    name: "Guntur",
    type: "DISTRICT",
    parentId: "STATE-AP",
    parentName: "Andhra Pradesh",
    active: true,
  },

  {
    id: "DIST-VIJAYAWADA",
    name: "NTR",
    type: "DISTRICT",
    parentId: "STATE-AP",
    parentName: "Andhra Pradesh",
    active: true,
  },

  {
    id: "DIST-HYDERABAD",
    name: "Hyderabad",
    type: "DISTRICT",
    parentId: "STATE-TG",
    parentName: "Telangana",
    active: true,
  },

  {
    id: "PIN-522001",
    name: "522001",
    type: "PINCODE",
    parentId: "DIST-GUNTUR",
    parentName: "Guntur",
    pincode: "522001",
    active: true,
  },

  {
    id: "PIN-520001",
    name: "520001",
    type: "PINCODE",
    parentId: "DIST-VIJAYAWADA",
    parentName: "NTR",
    pincode: "520001",
    active: true,
  },
];

const TYPE_CONFIG: Record<
  ScopeSelectorType,
  {
    label: string;
    color: string;
  }
> = {
  GLOBAL: {
    label: "Global",
    color:
      "bg-slate-100 text-slate-700 border-slate-200",
  },

  STATE: {
    label: "State",
    color:
      "bg-orange-50 text-orange-700 border-orange-200",
  },

  DISTRICT: {
    label: "District",
    color:
      "bg-blue-50 text-blue-700 border-blue-200",
  },

  PINCODE: {
    label: "Pincode",
    color:
      "bg-purple-50 text-purple-700 border-purple-200",
  },
};

const TYPE_ORDER: ScopeSelectorType[] =
  [
    "GLOBAL",
    "STATE",
    "DISTRICT",
    "PINCODE",
  ];

export default function ScopeSelector({
  value,
  options = DEFAULT_OPTIONS,
  allowedScopeTypes = TYPE_ORDER,
  onChange,
  disabled = false,
  loading = false,
  label = "Administrative Scope",
  placeholder = "Select scope",
  showHierarchy = true,
  showSearch = true,
  className = "",
}: ScopeSelectorProps) {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    selectedType,
    setSelectedType,
  ] =
    useState<ScopeSelectorType | "ALL">(
      "ALL"
    );

  const availableOptions =
    useMemo(() => {
      return options
        .filter(
          (option) =>
            allowedScopeTypes.includes(
              option.type
            )
        )
        .filter(
          (option) =>
            option.active !== false
        );
    }, [
      options,
      allowedScopeTypes,
    ]);

  const filteredOptions =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      return availableOptions
        .filter((option) => {
          if (
            selectedType ===
              "ALL"
          ) {
            return true;
          }

          return (
            option.type ===
            selectedType
          );
        })
        .filter((option) => {
          if (
            !normalizedSearch
          ) {
            return true;
          }

          return (
            option.name
              .toLowerCase()
              .includes(
                normalizedSearch
              ) ||
            option.id
              .toLowerCase()
              .includes(
                normalizedSearch
              ) ||
            option.parentName
              ?.toLowerCase()
              .includes(
                normalizedSearch
              ) ||
            option.pincode
              ?.toLowerCase()
              .includes(
                normalizedSearch
              )
          );
        });
    }, [
      availableOptions,
      search,
      selectedType,
    ]);

  const groupedOptions =
    useMemo(() => {
      const groups =
        new Map<
          ScopeSelectorType,
          ScopeOption[]
        >();

      TYPE_ORDER.forEach(
        (type) => {
          groups.set(
            type,
            []
          );
        }
      );

      filteredOptions.forEach(
        (option) => {
          const current =
            groups.get(
              option.type
            );

          if (current) {
            current.push(
              option
            );
          }
        }
      );

      return Array.from(
        groups.entries()
      ).filter(
        ([, items]) =>
          items.length > 0
      );
    }, [
      filteredOptions,
    ]);

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setSelectedType(
        "ALL"
      );
    }
  }, [isOpen]);

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      const target =
        event.target as HTMLElement;

      if (
        !target.closest(
          "[data-scope-selector]"
        )
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener(
        "mousedown",
        handleOutsideClick
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, [isOpen]);

  function handleSelect(
    option: ScopeOption
  ) {
    const nextValue: ScopeSelectorValue =
      {
        type: option.type,
        id: option.id,
        name: option.name,
      };

    onChange?.(
      nextValue
    );

    setIsOpen(false);
  }

  function clearSelection() {
    setIsOpen(false);
  }

  const selectedConfig =
    value
      ? TYPE_CONFIG[
          value.type
        ]
      : null;

  return (
    <div
      data-scope-selector
      className={`relative ${className}`}
    >
      {/* LABEL */}

      {label && (
        <label className="mb-1.5 block text-[8px] font-black uppercase tracking-wider text-slate-500">
          {label}
        </label>
      )}

      {/* SELECTOR BUTTON */}

      <button
        type="button"
        disabled={
          disabled ||
          loading
        }
        onClick={() =>
          setIsOpen(
            (current) =>
              !current
          )
        }
        aria-haspopup="listbox"
        aria-expanded={
          isOpen
        }
        className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border bg-white px-3 py-2.5 text-left transition ${
          isOpen
            ? "border-orange-400 ring-2 ring-orange-100"
            : "border-slate-200 hover:border-orange-300"
        } ${
          disabled ||
          loading
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer"
        }`}
      >
        <div className="flex min-w-0 items-center gap-2.5">

          {value ? (
            <>
              <ScopeIcon
                type={
                  value.type
                }
              />

              <div className="min-w-0">

                <div className="flex items-center gap-2">

                  <span className="truncate text-[10px] font-black text-slate-800">
                    {value.name}
                  </span>

                  {selectedConfig && (
                    <span
                      className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[6px] font-black uppercase ${selectedConfig.color}`}
                    >
                      {
                        selectedConfig.label
                      }
                    </span>
                  )}

                </div>

                <p className="truncate text-[7px] font-medium text-slate-400">
                  {value.id}
                </p>

              </div>
            </>
          ) : (
            <>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                <ScopeIcon
                  type="GLOBAL"
                />
              </div>

              <span className="text-[10px] font-bold text-slate-400">
                {loading
                  ? "Loading scopes..."
                  : placeholder}
              </span>
            </>
          )}

        </div>

        <ChevronIcon
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
            isOpen
              ? "rotate-180"
              : ""
          }`}
        />

      </button>

      {/* DROPDOWN */}

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-[140] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

          {/* SEARCH */}

          {showSearch && (
            <div className="border-b border-slate-100 p-3">

              <div className="relative">

                <SearchIcon />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search scope..."
                  autoFocus
                  className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-[9px] font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-300 focus:bg-white focus:ring-2 focus:ring-orange-100"
                />

              </div>

            </div>
          )}

          {/* TYPE FILTERS */}

          {showHierarchy &&
            allowedScopeTypes.length >
              1 && (
              <div className="flex gap-1 overflow-x-auto border-b border-slate-100 px-3 py-2">

                <TypeFilter
                  label="All"
                  active={
                    selectedType ===
                    "ALL"
                  }
                  onClick={() =>
                    setSelectedType(
                      "ALL"
                    )
                  }
                />

                {TYPE_ORDER.filter(
                  (type) =>
                    allowedScopeTypes.includes(
                      type
                    )
                ).map(
                  (type) => (
                    <TypeFilter
                      key={
                        type
                      }
                      label={
                        TYPE_CONFIG[
                          type
                        ].label
                      }
                      active={
                        selectedType ===
                        type
                      }
                      onClick={() =>
                        setSelectedType(
                          type
                        )
                      }
                    />
                  )
                )}

              </div>
            )}

          {/* OPTIONS */}

          <div className="max-h-[360px] overflow-y-auto p-2">

            {groupedOptions.length ===
            0 ? (
              <EmptyState
                search={
                  search
                }
              />
            ) : (
              groupedOptions.map(
                ([
                  type,
                  items,
                ]) => (
                  <div
                    key={
                      type
                    }
                    className="mb-2 last:mb-0"
                  >

                    {showHierarchy &&
                      selectedType ===
                        "ALL" && (
                        <div className="px-2 pb-1.5 pt-2">

                          <span className="text-[7px] font-black uppercase tracking-wider text-slate-400">
                            {
                              TYPE_CONFIG[
                                type
                              ].label
                            }
                          </span>

                        </div>
                      )}

                    {items.map(
                      (
                        option
                      ) => (
                        <ScopeOptionRow
                          key={
                            option.id
                          }
                          option={
                            option
                          }
                          selected={
                            value?.id ===
                            option.id
                          }
                          onSelect={() =>
                            handleSelect(
                              option
                            )
                          }
                        />
                      )
                    )}

                  </div>
                )
              )
            )}

          </div>

          {/* CLEAR */}

          {value && (
            <div className="border-t border-slate-100 bg-slate-50/70 p-2">

              <button
                type="button"
                onClick={
                  clearSelection
                }
                className="w-full rounded-xl px-3 py-2 text-[8px] font-black text-slate-500 transition hover:bg-white hover:text-red-500"
              >
                Clear Current Selection
              </button>

            </div>
          )}

        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* OPTION ROW */
/* -------------------------------------------------------------------------- */

function ScopeOptionRow({
  option,
  selected,
  onSelect,
}: {
  option: ScopeOption;

  selected: boolean;

  onSelect: () => void;
}) {
  const config =
    TYPE_CONFIG[
      option.type
    ];

  return (
    <button
      type="button"
      role="option"
      aria-selected={
        selected
      }
      onClick={
        onSelect
      }
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
        selected
          ? "bg-orange-50"
          : "hover:bg-slate-50"
      }`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${config.color}`}
      >
        <ScopeIcon
          type={
            option.type
          }
        />
      </div>

      <div className="min-w-0 flex-1">

        <div className="flex items-center gap-2">

          <span className="truncate text-[9px] font-black text-slate-800">
            {option.name}
          </span>

          <span
            className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[6px] font-black uppercase ${config.color}`}
          >
            {
              config.label
            }
          </span>

        </div>

        <div className="mt-0.5 flex min-w-0 items-center gap-1.5">

          <span className="truncate font-mono text-[7px] text-slate-400">
            {option.id}
          </span>

          {option.parentName && (
            <>
              <span className="text-[7px] text-slate-300">
                •
              </span>

              <span className="truncate text-[7px] text-slate-400">
                {option.parentName}
              </span>
            </>
          )}

        </div>

      </div>

      {selected && (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white">
          <CheckIcon />
        </div>
      )}

    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* TYPE FILTER */
/* -------------------------------------------------------------------------- */

function TypeFilter({
  label,
  active,
  onClick,
}: {
  label: string;

  active: boolean;

  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={
        onClick
      }
      className={`shrink-0 rounded-lg border px-2.5 py-1.5 text-[7px] font-black transition ${
        active
          ? "border-orange-200 bg-orange-50 text-orange-700"
          : "border-transparent bg-slate-50 text-slate-500 hover:border-slate-200 hover:bg-white"
      }`}
    >
      {label}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* EMPTY STATE */
/* -------------------------------------------------------------------------- */

function EmptyState({
  search,
}: {
  search: string;
}) {
  return (
    <div className="px-5 py-8 text-center">

      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <SearchIcon
          className="relative left-0 top-0 h-4 w-4"
        />
      </div>

      <p className="mt-3 text-[9px] font-black text-slate-600">
        No scopes found
      </p>

      <p className="mt-1 text-[7px] text-slate-400">
        {search
          ? `No scope matches "${search}".`
          : "No authorized scopes are available."}
      </p>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ICONS */
/* -------------------------------------------------------------------------- */

function ScopeIcon({
  type,
}: {
  type: ScopeSelectorType;
}) {
  const className =
    "h-4 w-4";

  if (
    type ===
    "GLOBAL"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={
          className
        }
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
        />

        <path
          strokeLinecap="round"
          d="M3 12h18"
        />

        <path
          strokeLinecap="round"
          d="M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3Z"
        />
      </svg>
    );
  }

  if (
    type ===
    "STATE"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={
          className
        }
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          d="M4 19V5"
        />

        <path
          strokeLinecap="round"
          d="M4 19h16"
        />

        <path
          strokeLinecap="round"
          d="M7 15l4-5 3 3 5-7"
        />
      </svg>
    );
  }

  if (
    type ===
    "DISTRICT"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={
          className
        }
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 21h18"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 21V7l7-4 7 4v14"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 21v-5h6v5"
        />

        <path
          strokeLinecap="round"
          d="M9 9h.01M15 9h.01M9 12h.01M15 12h.01"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={
        className
      }
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"
      />

      <circle
        cx="12"
        cy="10"
        r="2.5"
      />
    </svg>
  );
}

function SearchIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 ${className}`}
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="7"
      />

      <path
        strokeLinecap="round"
        d="m20 20-4-4"
      />
    </svg>
  );
}

function ChevronIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={
        className
      }
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m6 9 6 6 6-6"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      className="h-3 w-3"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m5 12 4 4L19 6"
      />
    </svg>
  );
}