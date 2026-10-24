"use client";

import { useEffect } from "react";

export type ConfirmDialogVariant =
  | "danger"
  | "warning"
  | "success"
  | "info";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;

  confirmText?: string;
  cancelText?: string;

  variant?: ConfirmDialogVariant;

  loading?: boolean;

  onConfirm: () => void | Promise<void>;
  onCancel: () => void;

  disabled?: boolean;
}

const VARIANT_CONFIG: Record<
  ConfirmDialogVariant,
  {
    icon: string;
    iconBackground: string;
    iconColor: string;
    confirmBackground: string;
    confirmHover: string;
  }
> = {
  danger: {
    icon: "!",
    iconBackground: "bg-red-100",
    iconColor: "text-red-600",
    confirmBackground: "bg-red-600",
    confirmHover: "hover:bg-red-700",
  },

  warning: {
    icon: "!",
    iconBackground: "bg-amber-100",
    iconColor: "text-amber-600",
    confirmBackground: "bg-amber-500",
    confirmHover: "hover:bg-amber-600",
  },

  success: {
    icon: "✓",
    iconBackground: "bg-green-100",
    iconColor: "text-green-600",
    confirmBackground: "bg-green-600",
    confirmHover: "hover:bg-green-700",
  },

  info: {
    icon: "i",
    iconBackground: "bg-blue-100",
    iconColor: "text-blue-600",
    confirmBackground: "bg-blue-600",
    confirmHover: "hover:bg-blue-700",
  },
};

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
  onConfirm,
  onCancel,
  disabled = false,
}: ConfirmDialogProps) {
  const config =
    VARIANT_CONFIG[variant];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        if (!loading && !disabled) {
          onCancel();
        }
      }
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
    loading,
    disabled,
    onCancel,
  ]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  async function handleConfirm() {
    if (loading || disabled) {
      return;
    }

    await onConfirm();
  }

  function handleBackdropClick(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    if (
      event.target === event.currentTarget &&
      !loading &&
      !disabled
    ) {
      onCancel();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
      onMouseDown={handleBackdropClick}
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex items-start gap-4 px-5 pt-5 sm:px-6 sm:pt-6">

          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-black ${config.iconBackground} ${config.iconColor}`}
          >
            {config.icon}
          </div>

          <div className="min-w-0 flex-1">

            <h2
              id="confirm-dialog-title"
              className="text-base font-black text-slate-900"
            >
              {title}
            </h2>

            <p
              id="confirm-dialog-message"
              className="mt-2 text-xs leading-5 text-slate-500"
            >
              {message}
            </p>

          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={
              loading || disabled
            }
            aria-label="Close confirmation dialog"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-base font-bold text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ×
          </button>

        </div>

        {/* GOVERNANCE NOTICE */}

        <div className="mx-5 mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:mx-6">

          <div className="flex items-start gap-2">

            <span className="mt-0.5 text-[10px] font-black text-slate-500">
              ●
            </span>

            <p className="text-[10px] leading-5 text-slate-500">
              This action may change an operational
              or administrative state. Authorized
              backend validation and audit logging
              should be applied before the operation
              is executed.
            </p>

          </div>

        </div>

        {/* ACTIONS */}

        <div className="flex flex-col-reverse gap-2 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

          <button
            type="button"
            onClick={onCancel}
            disabled={
              loading || disabled
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={
              loading || disabled
            }
            className={`w-full rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow-sm transition ${config.confirmBackground} ${config.confirmHover} disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">

                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                Processing...

              </span>
            ) : (
              confirmText
            )}
          </button>

        </div>

      </div>
    </div>
  );
}