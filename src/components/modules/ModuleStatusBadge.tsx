const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  PAID: "bg-green-100 text-green-700",
  DELIVERED: "bg-green-100 text-green-700",
  PENDING: "bg-amber-100 text-amber-700",
  PAYMENT_PENDING: "bg-amber-100 text-amber-700",
  CREATED: "bg-slate-100 text-slate-600",
  ACCEPTED: "bg-blue-100 text-blue-700",
  PREPARING: "bg-blue-100 text-blue-700",
  READY: "bg-indigo-100 text-indigo-700",
  ASSIGNED: "bg-purple-100 text-purple-700",
  PICKED_UP: "bg-purple-100 text-purple-700",
  OUT_FOR_DELIVERY: "bg-purple-100 text-purple-700",
  CANCELLED: "bg-red-100 text-red-700",
  REJECTED: "bg-red-100 text-red-700",
  REFUNDED: "bg-red-100 text-red-700",
  SUSPENDED: "bg-red-100 text-red-700",
  BLOCKED: "bg-red-100 text-red-700",
  DRAFT: "bg-slate-100 text-slate-500",
  SUBMITTED: "bg-amber-100 text-amber-700",
};

interface ModuleStatusBadgeProps {
  status: string;
  className?: string;
}

export function ModuleStatusBadge({ status, className = "" }: ModuleStatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? "bg-slate-100 text-slate-600";
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${style} ${className}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}