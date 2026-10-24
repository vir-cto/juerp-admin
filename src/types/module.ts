import type { CustomerModuleId } from "@/lib/constants/modules";

export type { CustomerModuleId };

export type ModuleStatus = "ACTIVE" | "INACTIVE" | "COMING_SOON";

export interface ModuleConfig {
  moduleId: CustomerModuleId;
  enabled: boolean;
  displayOrder: number;
  status: ModuleStatus;
  featureFlags?: Record<string, boolean>;
}

export interface ModuleKpi {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "flat";
  colorClass?: string;
}