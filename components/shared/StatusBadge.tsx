import { cn } from "@/lib/utils";

type Status = "pending" | "confirmed" | "loading" | "in_transit" | "delivered" | "disputed" | "approved" | "rejected" | "active";

const styles: Record<Status, string> = {
  pending:    "bg-amber-50 text-amber-700 border-amber-200",
  confirmed:  "bg-blue-50 text-blue-700 border-blue-200",
  loading:    "bg-purple-50 text-purple-700 border-purple-200",
  in_transit: "bg-sky-50 text-sky-700 border-sky-200",
  delivered:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  disputed:   "bg-red-50 text-red-700 border-red-200",
  approved:   "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected:   "bg-red-50 text-red-700 border-red-200",
  active:     "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const labels: Record<Status, string> = {
  pending:    "Pending",
  confirmed:  "Confirmed",
  loading:    "Loading",
  in_transit: "In Transit",
  delivered:  "Delivered",
  disputed:   "Disputed",
  approved:   "Approved",
  rejected:   "Rejected",
  active:     "Active",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-md border text-xs font-medium", styles[status], className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", {
        "bg-amber-500": status === "pending",
        "bg-blue-500": status === "confirmed",
        "bg-purple-500": status === "loading",
        "bg-sky-500": status === "in_transit",
        "bg-emerald-500": status === "delivered" || status === "approved" || status === "active",
        "bg-red-500": status === "disputed" || status === "rejected",
      })} />
      {labels[status]}
    </span>
  );
}
