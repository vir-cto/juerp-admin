// src/components/modules/ModuleKpiCards.tsx
import type { ModuleKpi } from "@/types/module";

interface ModuleKpiCardsProps {
  kpis: ModuleKpi[];
}

export function ModuleKpiCards({ kpis }: ModuleKpiCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="rounded-xl bg-white p-5 shadow-sm"
        >
          <p className="text-xs font-medium text-slate-500">{kpi.label}</p>
          <p
            className={`mt-2 text-2xl font-bold ${
              kpi.colorClass ?? "text-slate-900"
            }`}
          >
            {kpi.value}
          </p>
        </div>
      ))}
    </div>
  );
}