"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Package, Fuel, DollarSign, TrendingUp, Truck, Eye, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const revenueData = [
  { day: "Mon", revenue: 48200 },
  { day: "Tue", revenue: 62100 },
  { day: "Wed", revenue: 55800 },
  { day: "Thu", revenue: 71400 },
  { day: "Fri", revenue: 84200 },
  { day: "Sat", revenue: 39800 },
  { day: "Sun", revenue: 28600 },
];

const pendingOrders = [
  { id: "ZF-2845", buyer: "Zimplats Holdings", fuel: "Diesel 50", volume: "25,000 L", value: "$37,000", time: "9 min ago", status: "pending" as const },
  { id: "ZF-2844", buyer: "Delta Beverages", fuel: "Petrol 93", volume: "8,000 L", value: "$12,160", time: "22 min ago", status: "pending" as const },
  { id: "ZF-2843", buyer: "ECONET Wireless", fuel: "Diesel 50", volume: "15,000 L", value: "$22,200", time: "41 min ago", status: "confirmed" as const },
  { id: "ZF-2841", buyer: "Chikwanda Mining", fuel: "Diesel 50", volume: "10,000 L", value: "$14,800", time: "3h ago", status: "in_transit" as const },
];

const inventory = [
  { product: "Diesel 50", stock: 285000, capacity: 400000, price: "$1.48/L", color: "bg-blue-500" },
  { product: "Petrol 93", stock: 142000, capacity: 200000, price: "$1.52/L", color: "bg-amber-500" },
  { product: "Paraffin", stock: 48000, capacity: 100000, price: "$0.98/L", color: "bg-emerald-500" },
];

export default function WholesalerDashboard() {
  return (
    <DashboardLayout persona="wholesaler" userName="Farai Mutasa" userRole="Msasa Energy Depot">
      <div className="space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Today's Revenue" value="$84,200" sub="22 orders fulfilled" trend={{ value: "+12% vs yesterday", up: true }} icon={<DollarSign className="h-5 w-5" />} accent />
          <StatCard label="Pending Orders" value="4" sub="Awaiting fulfilment" icon={<Package className="h-5 w-5" />} />
          <StatCard label="Active Deliveries" value="7" sub="Trucks en route" trend={{ value: "+3 since morning", up: true }} icon={<Truck className="h-5 w-5" />} />
          <StatCard label="Diesel Stock" value="285 KL" sub="71% capacity remaining" icon={<Fuel className="h-5 w-5" />} />
        </div>

        {/* Revenue Chart + Inventory */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="xl:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Revenue This Week</CardTitle>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">+18% vs last week</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1E3A5F" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#1E3A5F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]} />
                  <Area type="monotone" dataKey="revenue" stroke="#1E3A5F" strokeWidth={2} fill="url(#revGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Inventory Levels */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Inventory Levels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {inventory.map((item) => {
                const pct = Math.round((item.stock / item.capacity) * 100);
                const isLow = pct < 40;
                return (
                  <div key={item.product}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                        <span className="text-sm font-medium text-foreground">{item.product}</span>
                        {isLow && <Badge className="bg-red-50 text-red-600 border-red-200 text-[10px] px-1.5">Low</Badge>}
                      </div>
                      <span className="text-xs text-muted-foreground">{item.price}</span>
                    </div>
                    <Progress value={pct} className="h-2" />
                    <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
                      <span>{(item.stock / 1000).toFixed(0)} KL available</span>
                      <span>{pct}% of {(item.capacity / 1000).toFixed(0)} KL</span>
                    </div>
                  </div>
                );
              })}
              <button className="w-full py-2 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors">
                Manage Inventory
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Incoming Orders</CardTitle>
              <div className="flex items-center gap-2">
                <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-xs">4 require action</Badge>
                <button className="text-xs text-primary font-medium">View All</button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-xs">Order ID</TableHead>
                  <TableHead className="text-xs">Buyer</TableHead>
                  <TableHead className="text-xs">Product</TableHead>
                  <TableHead className="text-xs">Volume</TableHead>
                  <TableHead className="text-xs">Value</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="text-xs font-mono font-semibold">{order.id}</TableCell>
                    <TableCell className="text-xs">{order.buyer}</TableCell>
                    <TableCell className="text-xs">{order.fuel}</TableCell>
                    <TableCell className="text-xs font-medium">{order.volume}</TableCell>
                    <TableCell className="text-xs font-semibold text-emerald-700">{order.value}</TableCell>
                    <TableCell><StatusBadge status={order.status} /></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {order.status === "pending" && (
                          <button className="flex items-center gap-1 text-xs text-white bg-primary px-2 py-1 rounded-md">
                            <CheckCircle2 className="h-3 w-3" /> Accept
                          </button>
                        )}
                        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded-md border border-border">
                          <Eye className="h-3 w-3" /> View
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Active Deliveries */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Active Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: "ZF-2841", driver: "T. Moyo", vehicle: "ACY 2847", dest: "Chikwanda Mine", eta: "2h 15m", pct: 65 },
                { id: "ZF-2838", driver: "S. Ndlovu", vehicle: "ABI 9123", dest: "Delta Foods HQ", eta: "45m", pct: 85 },
                { id: "ZF-2836", driver: "R. Chikwanda", vehicle: "AEF 5610", dest: "Hwange Power", eta: "4h 30m", pct: 30 },
              ].map((d) => (
                <div key={d.id} className="flex items-center gap-4 p-3 rounded-xl bg-muted border border-border">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Truck className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-foreground">{d.id} — {d.driver}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{d.eta}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground mb-1.5">{d.vehicle} → {d.dest}</div>
                    <Progress value={d.pct} className="h-1.5" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-muted-foreground shrink-0" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
