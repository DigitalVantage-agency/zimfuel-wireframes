"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  Users, Package, DollarSign, ShieldCheck, AlertTriangle,
  CheckCircle2, XCircle, Eye, TrendingUp, Clock, Fuel, FileText
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend
} from "recharts";

const volumeData = [
  { month: "Jan", diesel: 420, petrol: 185 },
  { month: "Feb", diesel: 510, petrol: 210 },
  { month: "Mar", diesel: 480, petrol: 195 },
  { month: "Apr", diesel: 620, petrol: 240 },
  { month: "May", diesel: 390, petrol: 162 },
];

const kycQueue = [
  { name: "Zimplats Holdings Ltd", type: "Buyer", docs: 3, submitted: "2h ago", risk: "Low" },
  { name: "FastFuel Couriers", type: "Courier", docs: 4, submitted: "5h ago", risk: "Low" },
  { name: "Eagle Transport Pvt", type: "Courier", docs: 3, submitted: "1d ago", risk: "Medium" },
  { name: "Manica Farmers Co-op", type: "Buyer", docs: 3, submitted: "2d ago", risk: "Low" },
  { name: "Chrome Logistics Ltd", type: "Courier", docs: 2, submitted: "3d ago", risk: "High" },
];

const disputes = [
  { id: "DSP-041", order: "ZF-2819", parties: "Bindura Nickel vs. J.Moyo", issue: "Volume short 180L (1.8%)", raised: "Yesterday", held: "$420", priority: "Medium" },
  { id: "DSP-040", order: "ZF-2801", parties: "ZISCO vs. FastFuel", issue: "Delivery 3h late — damages claimed", raised: "3 days ago", held: "$2,100", priority: "High" },
  { id: "DSP-038", order: "ZF-2788", parties: "Delta Beverages vs. Sunrise Oil", issue: "Wrong fuel grade delivered", raised: "5 days ago", held: "$9,800", priority: "High" },
];

const zeraRates = [
  { product: "Diesel 50", current: "$1.480", proposed: "$1.510", change: "+$0.030", effective: "08 May 2026" },
  { product: "Petrol 93", current: "$1.520", proposed: "$1.545", change: "+$0.025", effective: "08 May 2026" },
  { product: "Paraffin", current: "$0.980", proposed: "$0.980", change: "No change", effective: "—" },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout persona="admin" userName="Chipo Nhema" userRole="Platform Administrator">
      <Tabs defaultValue="overview">
        <TabsList className="mb-6 h-9">
          <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
          <TabsTrigger value="kyc" className="text-xs">
            KYC Queue
            <Badge className="ml-1.5 bg-amber-400 text-gray-900 text-[10px] h-4 px-1">7</Badge>
          </TabsTrigger>
          <TabsTrigger value="disputes" className="text-xs">
            Disputes
            <Badge className="ml-1.5 bg-red-500 text-white text-[10px] h-4 px-1">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="pricing" className="text-xs">ZERA Pricing</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-6 mt-0">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard label="Platform Volume (May)" value="390 KL" sub="Diesel + Petrol" trend={{ value: "+8% vs April", up: true }} icon={<Fuel className="h-5 w-5" />} accent />
            <StatCard label="Total Orders (May)" value="284" sub="Across all depots" trend={{ value: "+22 this week", up: true }} icon={<Package className="h-5 w-5" />} />
            <StatCard label="Platform Revenue" value="$12,840" sub="Fees collected (May)" trend={{ value: "+15% vs April", up: true }} icon={<DollarSign className="h-5 w-5" />} />
            <StatCard label="Active Users" value="143" sub="Buyers, Couriers, Depots" icon={<Users className="h-5 w-5" />} />
          </div>

          {/* Volume Chart */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Monthly Volume (KL)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={volumeData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} unit="KL" />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="diesel" name="Diesel 50" fill="#1E3A5F" radius={[3,3,0,0]} />
                    <Bar dataKey="petrol" name="Petrol 93" fill="#F59E0B" radius={[3,3,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Platform Health */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Platform Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "KYC Approval Rate", value: 94, color: "bg-emerald-500" },
                  { label: "On-Time Delivery Rate", value: 97, color: "bg-emerald-500" },
                  { label: "Dispute Resolution Rate", value: 88, color: "bg-amber-500" },
                  { label: "Escrow Release Success", value: 100, color: "bg-emerald-500" },
                  { label: "OCR Accuracy (Meters)", value: 96, color: "bg-emerald-500" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-foreground font-medium">{item.label}</span>
                      <span className={`font-bold ${item.value >= 95 ? "text-emerald-600" : item.value >= 85 ? "text-amber-600" : "text-red-600"}`}>{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Live Activity Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />, text: "Order ZF-2841 delivered — escrow released ($15,268)", time: "2m ago", type: "success" },
                  { icon: <Users className="h-4 w-4 text-blue-500" />, text: "New KYC submission: Zimplats Holdings Ltd (Buyer)", time: "18m ago", type: "info" },
                  { icon: <AlertTriangle className="h-4 w-4 text-amber-500" />, text: "Dispute DSP-041 opened — ZF-2819 volume discrepancy 1.8%", time: "1h ago", type: "warning" },
                  { icon: <TrendingUp className="h-4 w-4 text-primary" />, text: "ZERA price update approved — Diesel $1.51/L effective 08 May", time: "3h ago", type: "info" },
                  { icon: <ShieldCheck className="h-4 w-4 text-emerald-500" />, text: "FastFuel Couriers KYC approved — 3 new couriers onboarded", time: "5h ago", type: "success" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/50">
                    <div className="shrink-0 mt-0.5">{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-foreground">{item.text}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* KYC TAB */}
        <TabsContent value="kyc" className="space-y-4 mt-0">
          <div className="grid grid-cols-3 gap-4">
            <StatCard label="Pending Review" value="7" icon={<Clock className="h-5 w-5" />} />
            <StatCard label="Approved (May)" value="28" trend={{ value: "+5 this week", up: true }} icon={<CheckCircle2 className="h-5 w-5" />} />
            <StatCard label="Rejected (May)" value="3" icon={<XCircle className="h-5 w-5" />} />
          </div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">KYC Review Queue</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-xs">Applicant</TableHead>
                    <TableHead className="text-xs">Type</TableHead>
                    <TableHead className="text-xs">Documents</TableHead>
                    <TableHead className="text-xs">Submitted</TableHead>
                    <TableHead className="text-xs">Risk</TableHead>
                    <TableHead className="text-xs">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kycQueue.map((app) => (
                    <TableRow key={app.name}>
                      <TableCell className="text-xs font-semibold">{app.name}</TableCell>
                      <TableCell>
                        <Badge className={app.type === "Buyer" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-amber-50 text-amber-700 border-amber-200"} variant="outline">
                          {app.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs">{app.docs} docs uploaded</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{app.submitted}</TableCell>
                      <TableCell>
                        <Badge className={app.risk === "Low" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : app.risk === "Medium" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-red-50 text-red-700 border-red-200"} variant="outline">
                          {app.risk}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <button className="flex items-center gap-1 text-xs text-white bg-emerald-600 px-2 py-1 rounded-md">
                            <CheckCircle2 className="h-3 w-3" /> Approve
                          </button>
                          <button className="flex items-center gap-1 text-xs text-red-600 bg-red-50 border border-red-200 px-2 py-1 rounded-md">
                            <XCircle className="h-3 w-3" /> Reject
                          </button>
                          <button className="flex items-center gap-1 text-xs text-muted-foreground border border-border px-2 py-1 rounded-md">
                            <Eye className="h-3 w-3" /> Review
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* DISPUTES TAB */}
        <TabsContent value="disputes" className="space-y-4 mt-0">
          <div className="grid grid-cols-3 gap-4">
            <StatCard label="Open Disputes" value="3" icon={<AlertTriangle className="h-5 w-5" />} />
            <StatCard label="Funds on Hold" value="$12,320" sub="Pending resolution" icon={<DollarSign className="h-5 w-5" />} />
            <StatCard label="Avg Resolution" value="2.4 days" icon={<Clock className="h-5 w-5" />} />
          </div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Active Disputes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {disputes.map((d) => (
                <div key={d.id} className={`p-4 rounded-xl border ${d.priority === "High" ? "border-red-200 bg-red-50/50" : "border-amber-200 bg-amber-50/50"}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-foreground">{d.id}</span>
                        <span className="text-xs text-muted-foreground font-mono">{d.order}</span>
                        <Badge className={d.priority === "High" ? "bg-red-100 text-red-700 border-red-200 text-[10px]" : "bg-amber-100 text-amber-700 border-amber-200 text-[10px]"} variant="outline">
                          {d.priority} Priority
                        </Badge>
                      </div>
                      <div className="text-xs font-medium text-foreground mb-1">{d.parties}</div>
                      <div className="text-xs text-muted-foreground">{d.issue}</div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <div className="text-xs text-muted-foreground">Held</div>
                      <div className="text-sm font-bold text-foreground">{d.held}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{d.raised}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <button className="flex items-center gap-1 text-xs text-white bg-emerald-600 px-3 py-1.5 rounded-lg">
                      <CheckCircle2 className="h-3 w-3" /> Resolve — Release Full
                    </button>
                    <button className="flex items-center gap-1 text-xs text-primary border border-primary/20 bg-primary/5 px-3 py-1.5 rounded-lg">
                      <FileText className="h-3 w-3" /> View Audit Trail
                    </button>
                    <button className="flex items-center gap-1 text-xs text-muted-foreground border border-border px-3 py-1.5 rounded-lg">
                      Partial Release
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ZERA PRICING TAB */}
        <TabsContent value="pricing" className="space-y-4 mt-0">
          <div className="grid grid-cols-3 gap-4">
            <StatCard label="Current Diesel Price" value="$1.480/L" sub="ZERA official rate" icon={<Fuel className="h-5 w-5" />} accent />
            <StatCard label="Last Updated" value="06 May 2026" sub="06:00 AM" icon={<Clock className="h-5 w-5" />} />
            <StatCard label="Pending Update" value="08 May 2026" sub="Awaiting approval" icon={<TrendingUp className="h-5 w-5" />} />
          </div>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">ZERA Rate Update — 08 May 2026</CardTitle>
                <Badge className="bg-amber-50 text-amber-700 border-amber-200">Pending Approval</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-xs">Product</TableHead>
                    <TableHead className="text-xs">Current Rate</TableHead>
                    <TableHead className="text-xs">Proposed Rate</TableHead>
                    <TableHead className="text-xs">Change</TableHead>
                    <TableHead className="text-xs">Effective Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {zeraRates.map((rate) => (
                    <TableRow key={rate.product}>
                      <TableCell className="text-xs font-semibold">{rate.product}</TableCell>
                      <TableCell className="text-xs font-mono">{rate.current}</TableCell>
                      <TableCell className="text-xs font-mono font-semibold">{rate.proposed}</TableCell>
                      <TableCell>
                        <span className={`text-xs font-semibold ${rate.change.startsWith("+") ? "text-amber-600" : "text-muted-foreground"}`}>{rate.change}</span>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{rate.effective}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-amber-800">Rate Change Impact</div>
                    <p className="text-xs text-amber-700 mt-0.5">Approving this update will automatically reprice all pending orders that have not yet entered escrow. 12 orders currently affected (estimated additional cost: +$3,240).</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1.5 text-xs text-white bg-primary px-4 py-2 rounded-lg font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Approve Rate Update
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border px-4 py-2 rounded-lg">
                    <XCircle className="h-3.5 w-3.5" /> Reject & Request Revision
                  </button>
                </div>
              </div>

              {/* Price History Chart */}
              <div>
                <div className="text-xs font-semibold text-foreground mb-3">Diesel 50 — 6-Month Price History</div>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={[
                    { m: "Dec", price: 1.38 }, { m: "Jan", price: 1.40 }, { m: "Feb", price: 1.43 },
                    { m: "Mar", price: 1.45 }, { m: "Apr", price: 1.48 }, { m: "May*", price: 1.51 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="m" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[1.3, 1.6]} tickFormatter={(v) => `$${v.toFixed(2)}`} />
                    <Tooltip formatter={(v) => [`$${Number(v).toFixed(3)}/L`, "Diesel 50"]} />
                    <Line type="monotone" dataKey="price" stroke="#1E3A5F" strokeWidth={2} dot={{ r: 4, fill: "#F59E0B" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
