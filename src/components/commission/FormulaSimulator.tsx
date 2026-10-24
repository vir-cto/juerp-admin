"use client";

import { useMemo, useState } from "react";

type CommissionType =
  | "PERCENTAGE"
  | "FIXED";

type CommissionModule =
  | "JUCART"
  | "JURIDE"
  | "JUSTAY"
  | "JUHOME"
  | "JUSHOPPING";

interface FormulaSimulatorProps {
  module?: CommissionModule;
  commissionType?: CommissionType;
  commissionValue?: number;
}

interface SimulationResult {
  baseAmountPaise: number;
  commissionPaise: number;
  vendorAmountPaise: number;
  commissionRate: number;
}

const MODULE_LABELS: Record<
  CommissionModule,
  string
> = {
  JUCART: "JuCart",
  JURIDE: "JuRide",
  JUSTAY: "JuStay",
  JUHOME: "JuHome",
  JUSHOPPING: "JuShopping",
};

const DEFAULT_MODULE: CommissionModule =
  "JUCART";

const DEFAULT_COMMISSION_TYPE: CommissionType =
  "PERCENTAGE";

const DEFAULT_COMMISSION_VALUE = 10;

function formatCurrency(
  amountPaise: number
): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amountPaise / 100);
}

function roundPaise(value: number): number {
  return Math.round(value);
}

export default function FormulaSimulator({
  module = DEFAULT_MODULE,
  commissionType = DEFAULT_COMMISSION_TYPE,
  commissionValue = DEFAULT_COMMISSION_VALUE,
}: FormulaSimulatorProps) {
  const [selectedModule, setSelectedModule] =
    useState<CommissionModule>(module);

  const [selectedType, setSelectedType] =
    useState<CommissionType>(
      commissionType
    );

  const [value, setValue] =
    useState<number>(commissionValue);

  const [baseAmount, setBaseAmount] =
    useState<number>(1000);

  const [packingCharge, setPackingCharge] =
    useState<number>(0);

  const [taxAmount, setTaxAmount] =
    useState<number>(0);

  const [showAdvanced, setShowAdvanced] =
    useState(false);

  const [hasSimulated, setHasSimulated] =
    useState(true);

  const simulation = useMemo<SimulationResult>(
    () => {
      const safeBaseAmount = Math.max(
        0,
        Number(baseAmount) || 0
      );

      const safePackingCharge = Math.max(
        0,
        Number(packingCharge) || 0
      );

      const safeTaxAmount = Math.max(
        0,
        Number(taxAmount) || 0
      );

      const taxableTransactionAmount =
        safeBaseAmount +
        safePackingCharge +
        safeTaxAmount;

      let commissionAmount = 0;

      if (
        selectedType === "PERCENTAGE"
      ) {
        commissionAmount =
          (taxableTransactionAmount *
            Math.max(0, Number(value) || 0)) /
          100;
      } else {
        commissionAmount =
          Math.max(0, Number(value) || 0);
      }

      const commissionPaise =
        roundPaise(commissionAmount * 100);

      const totalPaise =
        roundPaise(
          taxableTransactionAmount * 100
        );

      const vendorAmountPaise = Math.max(
        0,
        totalPaise - commissionPaise
      );

      return {
        baseAmountPaise:
          roundPaise(
            taxableTransactionAmount * 100
          ),
        commissionPaise,
        vendorAmountPaise,
        commissionRate:
          selectedType === "PERCENTAGE"
            ? Number(value) || 0
            : 0,
      };
    },
    [
      baseAmount,
      packingCharge,
      taxAmount,
      selectedType,
      value,
    ]
  );

  function handleSimulate() {
    setHasSimulated(false);

    window.setTimeout(() => {
      setHasSimulated(true);
    }, 150);
  }

  function handleReset() {
    setSelectedModule(module);
    setSelectedType(commissionType);
    setValue(commissionValue);
    setBaseAmount(1000);
    setPackingCharge(0);
    setTaxAmount(0);
    setShowAdvanced(false);
    setHasSimulated(true);
  }

  const totalAmount =
    simulation.baseAmountPaise;

  const commissionPercentage =
    selectedType === "PERCENTAGE"
      ? value
      : totalAmount > 0
        ? (simulation.commissionPaise /
            totalAmount) *
          100
        : 0;

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div>
        <h2 className="text-lg font-black text-slate-900">
          Formula Simulator
        </h2>

        <p className="mt-1 max-w-3xl text-xs leading-5 text-slate-500">
          Preview how a commission rule would affect
          a transaction. This simulator is for
          administrative testing only. Production
          financial calculations must be performed
          by the trusted backend.
        </p>
      </div>

      {/* GOVERNANCE NOTICE */}

      <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
        <div className="flex items-start gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-sm font-black text-orange-700">
            !
          </div>

          <div>
            <p className="text-xs font-black text-orange-900">
              Simulation Only
            </p>

            <p className="mt-1 text-[10px] leading-5 text-orange-800">
              The values shown here are a preview and
              must not be treated as authoritative
              settlement, payout, ledger, or refund
              values. The trusted backend and JUERP
              rules remain the financial authority.
            </p>
          </div>

        </div>
      </div>

      {/* INPUT SECTION */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5">

        <div className="mb-5">
          <h3 className="text-sm font-black text-slate-900">
            Simulation Inputs
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Enter the transaction values you want to
            test.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {/* MODULE */}

          <div>
            <label
              htmlFor="simulator-module"
              className="mb-2 block text-xs font-bold text-slate-700"
            >
              Module
            </label>

            <select
              id="simulator-module"
              value={selectedModule}
              onChange={(event) =>
                setSelectedModule(
                  event.target
                    .value as CommissionModule
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            >
              {(
                Object.keys(
                  MODULE_LABELS
                ) as CommissionModule[]
              ).map((moduleId) => (
                <option
                  key={moduleId}
                  value={moduleId}
                >
                  {MODULE_LABELS[moduleId]} (
                  {moduleId})
                </option>
              ))}
            </select>
          </div>

          {/* COMMISSION TYPE */}

          <div>
            <label
              htmlFor="simulator-type"
              className="mb-2 block text-xs font-bold text-slate-700"
            >
              Commission Type
            </label>

            <select
              id="simulator-type"
              value={selectedType}
              onChange={(event) =>
                setSelectedType(
                  event.target
                    .value as CommissionType
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            >
              <option value="PERCENTAGE">
                Percentage
              </option>

              <option value="FIXED">
                Fixed Amount
              </option>
            </select>
          </div>

          {/* COMMISSION VALUE */}

          <div>
            <label
              htmlFor="simulator-value"
              className="mb-2 block text-xs font-bold text-slate-700"
            >
              Commission Value
            </label>

            <div className="relative">

              <input
                id="simulator-value"
                type="number"
                min="0"
                max={
                  selectedType ===
                  "PERCENTAGE"
                    ? 100
                    : undefined
                }
                step="0.01"
                value={value}
                onChange={(event) =>
                  setValue(
                    Number(
                      event.target.value
                    )
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 pr-12 text-xs font-semibold text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                {selectedType ===
                "PERCENTAGE"
                  ? "%"
                  : "₹"}
              </span>

            </div>
          </div>

          {/* BASE AMOUNT */}

          <div>
            <label
              htmlFor="simulator-base"
              className="mb-2 block text-xs font-bold text-slate-700"
            >
              Base Amount
            </label>

            <div className="relative">

              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                ₹
              </span>

              <input
                id="simulator-base"
                type="number"
                min="0"
                step="0.01"
                value={baseAmount}
                onChange={(event) =>
                  setBaseAmount(
                    Number(
                      event.target.value
                    )
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-8 pr-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />

            </div>
          </div>

        </div>

        {/* ADVANCED INPUTS */}

        <div className="mt-5 border-t border-slate-100 pt-5">

          <button
            type="button"
            onClick={() =>
              setShowAdvanced(
                (previous) => !previous
              )
            }
            className="flex w-full items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-left transition hover:bg-slate-100"
          >
            <div>
              <p className="text-xs font-bold text-slate-800">
                Additional Charges
              </p>

              <p className="mt-1 text-[10px] text-slate-500">
                Packing and tax values for simulation.
              </p>
            </div>

            <span className="text-xs font-black text-slate-500">
              {showAdvanced ? "−" : "+"}
            </span>
          </button>

          {showAdvanced && (
            <div className="mt-4 grid gap-5 md:grid-cols-2">

              {/* PACKING */}

              <div>
                <label
                  htmlFor="simulator-packing"
                  className="mb-2 block text-xs font-bold text-slate-700"
                >
                  Packing Charge
                </label>

                <div className="relative">

                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    ₹
                  </span>

                  <input
                    id="simulator-packing"
                    type="number"
                    min="0"
                    step="0.01"
                    value={packingCharge}
                    onChange={(event) =>
                      setPackingCharge(
                        Number(
                          event.target.value
                        )
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-8 pr-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />

                </div>
              </div>

              {/* TAX */}

              <div>
                <label
                  htmlFor="simulator-tax"
                  className="mb-2 block text-xs font-bold text-slate-700"
                >
                  Tax Amount
                </label>

                <div className="relative">

                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    ₹
                  </span>

                  <input
                    id="simulator-tax"
                    type="number"
                    min="0"
                    step="0.01"
                    value={taxAmount}
                    onChange={(event) =>
                      setTaxAmount(
                        Number(
                          event.target.value
                        )
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-8 pr-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />

                </div>
              </div>

            </div>
          )}

        </div>

        {/* BUTTONS */}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">

          <button
            type="button"
            onClick={handleSimulate}
            className="rounded-xl bg-orange-500 px-5 py-3 text-xs font-bold text-white transition hover:bg-orange-600"
          >
            Simulate Formula
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Reset
          </button>

        </div>

      </div>

      {/* FORMULA */}

      <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5">

        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Formula Preview
          </p>

          <h3 className="mt-1 text-sm font-black text-white">
            {selectedModule} Commission
          </h3>
        </div>

        <div className="overflow-x-auto rounded-xl bg-slate-800 p-4">
          <code className="whitespace-nowrap text-xs text-slate-200">
            {selectedType ===
            "PERCENTAGE"
              ? `Commission = Transaction Amount × (${value}% ÷ 100)`
              : `Commission = Fixed Amount (${formatCurrency(
                  Math.round(
                    value * 100
                  )
                )})`}
          </code>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">

          <div className="rounded-xl bg-slate-800 p-4">
            <p className="text-[10px] text-slate-400">
              Transaction
            </p>

            <p className="mt-1 text-sm font-black text-white">
              {formatCurrency(
                totalAmount
              )}
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-4">
            <p className="text-[10px] text-slate-400">
              Commission
            </p>

            <p className="mt-1 text-sm font-black text-white">
              {formatCurrency(
                simulation.commissionPaise
              )}
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-4">
            <p className="text-[10px] text-slate-400">
              Vendor Share
            </p>

            <p className="mt-1 text-sm font-black text-white">
              {formatCurrency(
                simulation.vendorAmountPaise
              )}
            </p>
          </div>

        </div>

      </div>

      {/* RESULT */}

      {hasSimulated && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h3 className="text-sm font-black text-slate-900">
                Simulation Result
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Preview for{" "}
                {MODULE_LABELS[selectedModule]}.
              </p>
            </div>

            <span className="w-fit rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-bold text-green-700">
              Simulation Complete
            </span>

          </div>

          <div className="grid gap-4 md:grid-cols-4">

            {/* TRANSACTION */}

            <ResultCard
              label="Transaction Amount"
              value={formatCurrency(
                simulation.baseAmountPaise
              )}
            />

            {/* RATE */}

            <ResultCard
              label="Effective Rate"
              value={
                selectedType ===
                "PERCENTAGE"
                  ? `${commissionPercentage.toFixed(
                      2
                    )}%`
                  : formatCurrency(
                      Math.round(
                        value * 100
                      )
                    )
              }
            />

            {/* COMMISSION */}

            <ResultCard
              label="Commission"
              value={formatCurrency(
                simulation.commissionPaise
              )}
            />

            {/* VENDOR */}

            <ResultCard
              label="Remaining Amount"
              value={formatCurrency(
                simulation.vendorAmountPaise
              )}
            />

          </div>

          {/* BREAKDOWN */}

          <div className="mt-5 rounded-xl bg-slate-50 p-4">

            <h4 className="text-xs font-black text-slate-800">
              Calculation Breakdown
            </h4>

            <div className="mt-3 space-y-2">

              <BreakdownRow
                label="Base amount"
                value={formatCurrency(
                  Math.round(
                    baseAmount * 100
                  )
                )}
              />

              <BreakdownRow
                label="Packing charge"
                value={formatCurrency(
                  Math.round(
                    packingCharge * 100
                  )
                )}
              />

              <BreakdownRow
                label="Tax"
                value={formatCurrency(
                  Math.round(
                    taxAmount * 100
                  )
                )}
              />

              <div className="my-2 border-t border-slate-200" />

              <BreakdownRow
                label="Transaction amount"
                value={formatCurrency(
                  simulation.baseAmountPaise
                )}
                strong
              />

              <BreakdownRow
                label="Commission"
                value={`- ${formatCurrency(
                  simulation.commissionPaise
                )}`}
              />

              <div className="my-2 border-t border-slate-200" />

              <BreakdownRow
                label="Remaining amount"
                value={formatCurrency(
                  simulation.vendorAmountPaise
                )}
                strong
              />

            </div>

          </div>

        </div>
      )}

      {/* ARCHITECTURE NOTE */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5">

        <h3 className="text-sm font-black text-slate-900">
          Production Financial Flow
        </h3>

        <div className="mt-4 grid gap-3 md:grid-cols-5">

          <FlowStep
            number="1"
            title="Rule"
            description="Commission rule configured"
          />

          <FlowStep
            number="2"
            title="Backend"
            description="Trusted calculation"
          />

          <FlowStep
            number="3"
            title="Snapshot"
            description="Financial snapshot"
          />

          <FlowStep
            number="4"
            title="Ledger"
            description="Ledger entry"
          />

          <FlowStep
            number="5"
            title="Settlement"
            description="Settlement and payout"
          />

        </div>

        <p className="mt-4 text-[10px] leading-5 text-slate-500">
          This simulator represents only a preview.
          The production calculation must use the
          authoritative commission rule, effective
          date, rule precedence and calculation version
          from the trusted backend/JUERP governance
          layer.
        </p>

      </div>
    </div>
  );
}

interface ResultCardProps {
  label: string;
  value: string;
}

function ResultCard({
  label,
  value,
}: ResultCardProps) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-[10px] font-semibold text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-base font-black text-slate-900">
        {value}
      </p>
    </div>
  );
}

interface BreakdownRowProps {
  label: string;
  value: string;
  strong?: boolean;
}

function BreakdownRow({
  label,
  value,
  strong = false,
}: BreakdownRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span
        className={`text-xs ${
          strong
            ? "font-black text-slate-900"
            : "font-medium text-slate-600"
        }`}
      >
        {label}
      </span>

      <span
        className={`text-xs ${
          strong
            ? "font-black text-slate-900"
            : "font-semibold text-slate-700"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

interface FlowStepProps {
  number: string;
  title: string;
  description: string;
}

function FlowStep({
  number,
  title,
  description,
}: FlowStepProps) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

      <div className="flex items-center gap-3">

        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[10px] font-black text-orange-700">
          {number}
        </span>

        <div>
          <p className="text-xs font-black text-slate-800">
            {title}
          </p>

          <p className="mt-1 text-[10px] leading-4 text-slate-500">
            {description}
          </p>
        </div>

      </div>

    </div>
  );
}