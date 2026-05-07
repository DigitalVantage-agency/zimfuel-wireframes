import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  trend?: { value: string; up: boolean };
  icon?: React.ReactNode;
  accent?: boolean;
  className?: string;
}

export function StatCard({ label, value, sub, trend, icon, accent, className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", accent && "border-amber-200 bg-gradient-to-br from-amber-50 to-white", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
            <p className={cn("text-2xl font-bold mt-1 leading-none", accent ? "text-amber-600" : "text-foreground")}>{value}</p>
            {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
            {trend && (
              <div className={cn("flex items-center gap-1 mt-2 text-xs font-medium", trend.up ? "text-emerald-600" : "text-red-500")}>
                {trend.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {trend.value}
              </div>
            )}
          </div>
          {icon && (
            <div className={cn("flex items-center justify-center w-10 h-10 rounded-xl", accent ? "bg-amber-100 text-amber-600" : "bg-primary/10 text-primary")}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
