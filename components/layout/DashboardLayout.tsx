"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, Truck, Users, ShieldCheck,
  TrendingUp, AlertTriangle, Settings, ChevronRight, Fuel, Bell
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  persona: "wholesaler" | "admin";
  userName: string;
  userRole: string;
}

const wholesalerNav: NavItem[] = [
  { label: "Overview", href: "/wholesaler", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Orders", href: "/wholesaler/orders", icon: <Package className="h-4 w-4" />, badge: 4 },
  { label: "Inventory", href: "/wholesaler/inventory", icon: <Fuel className="h-4 w-4" /> },
  { label: "Couriers", href: "/wholesaler/couriers", icon: <Truck className="h-4 w-4" /> },
  { label: "Release Notes", href: "/wholesaler/releases", icon: <ShieldCheck className="h-4 w-4" /> },
  { label: "Reports", href: "/wholesaler/reports", icon: <TrendingUp className="h-4 w-4" /> },
  { label: "Settings", href: "/wholesaler/settings", icon: <Settings className="h-4 w-4" /> },
];

const adminNav: NavItem[] = [
  { label: "Overview", href: "/admin", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "KYC Queue", href: "/admin/kyc", icon: <Users className="h-4 w-4" />, badge: 7 },
  { label: "Disputes", href: "/admin/disputes", icon: <AlertTriangle className="h-4 w-4" />, badge: 3 },
  { label: "ZERA Pricing", href: "/admin/pricing", icon: <TrendingUp className="h-4 w-4" /> },
  { label: "Analytics", href: "/admin/analytics", icon: <TrendingUp className="h-4 w-4" /> },
  { label: "Couriers", href: "/admin/couriers", icon: <Truck className="h-4 w-4" /> },
  { label: "Platform Fees", href: "/admin/fees", icon: <ShieldCheck className="h-4 w-4" /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings className="h-4 w-4" /> },
];

export function DashboardLayout({ children, persona, userName, userRole }: DashboardLayoutProps) {
  const pathname = usePathname();
  const nav = persona === "wholesaler" ? wholesalerNav : adminNav;
  const accentColor = persona === "wholesaler" ? "text-amber-400" : "text-emerald-400";

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="flex flex-col w-60 shrink-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-sidebar-border">
          <div className={cn("flex items-center justify-center w-8 h-8 rounded-lg bg-amber-400")}>
            <Fuel className="h-4 w-4 text-gray-900" />
          </div>
          <div>
            <div className="font-bold text-white text-sm leading-none">ZimFuel</div>
            <div className={cn("text-[10px] uppercase tracking-wider mt-0.5", accentColor)}>
              {persona === "wholesaler" ? "Wholesaler Portal" : "Admin Console"}
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent text-white font-medium"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-white"
                )}
              >
                <span className={active ? "text-amber-400" : ""}>{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <Badge className="bg-amber-400 text-gray-900 text-[10px] h-4 min-w-4 px-1">
                    {item.badge}
                  </Badge>
                )}
                {active && <ChevronRight className="h-3 w-3 text-amber-400" />}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-amber-400 text-gray-900 text-xs font-bold">
                {userName.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-white truncate">{userName}</div>
              <div className="text-[10px] text-sidebar-foreground/50 truncate">{userRole}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-border shrink-0">
          <div>
            <h1 className="text-base font-semibold text-foreground">
              {nav.find(n => n.href === pathname)?.label ?? "Dashboard"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-500" />
            </button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                {userName.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
