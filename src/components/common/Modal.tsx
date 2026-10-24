"use client";

import {
  ReactNode,
  useEffect,
} from "react";

export type ModalSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "full";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;

  title?: string;
  description?: string;

  children: ReactNode;

  size?: ModalSize;

  showCloseButton?: boolean;

  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;

  footer?: ReactNode;

  className?: string;

  loading?: boolean;

  preventClose?: boolean;
}

const SIZE_CLASSES: Record<
  ModalSize,
  string
> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-[95vw]",
};

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  footer,
  className = "",
  loading = false,
  preventClose = false,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (!closeOnEscape) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key !== "Escape") {
        return;
      }

      if (
        loading ||
        preventClose
      ) {
        return;
      }

      onClose();
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    isOpen,
    closeOnEscape,
    loading,
    preventClose,
    onClose,
  ]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  function handleBackdropClick(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    if (
      event.target !==
      event.currentTarget
    ) {
      return;
    }

    if (
      !closeOnBackdrop ||
      loading ||
      preventClose
    ) {
      return;
    }

    onClose();
  }

  function handleClose() {
    if (
      loading ||
      preventClose
    ) {
      return;
    }

    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={
        title
          ? "modal-title"
          : undefined
      }
      aria-describedby={
        description
          ? "modal-description"
          : undefined
      }
      onMouseDown={
        handleBackdropClick
      }
    >
      <div
        className={`flex max-h-[92vh] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ${SIZE_CLASSES[size]} ${className}`}
      >

        {/* HEADER */}

        {(title ||
          description ||
          showCloseButton) && (
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-6">

            <div className="min-w-0 flex-1">

              {title && (
                <h2
                  id="modal-title"
                  className="text-base font-black text-slate-900"
                >
                  {title}
                </h2>
              )}

              {description && (
                <p
                  id="modal-description"
                  className="mt-1 text-xs leading-5 text-slate-500"
                >
                  {description}
                </p>
              )}

            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={handleClose}
                disabled={
                  loading ||
                  preventClose
                }
                aria-label="Close modal"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg font-bold text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ×
              </button>
            )}

          </div>
        )}

        {/* BODY */}

        <div className="min-h-0 flex-1 overflow-y-auto bg-white px-5 py-5 sm:px-6">

          {children}

        </div>

        {/* FOOTER */}

        {footer && (
          <div className="shrink-0 border-t border-slate-200 bg-slate-50/70 px-5 py-4 sm:px-6">
            {footer}
          </div>
        )}

      </div>
    </div>
  );
}