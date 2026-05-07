"use client";

import Link from "next/link";
import { MobileFrame } from "@/components/layout/MobileFrame";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  Droplets, MapPin, Plus, Bell, Wallet, ChevronRight,
  Package, Truck, CheckCircle2, Clock, ArrowLeft, Smartphone
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const recentOrders = [
  { id: "ZF-2841", fuel: "Diesel 50", volume: "10,000 L", status: "in_transit" as const, eta: "2h 15m", depot: "Msasa Depot" },
  { id: "ZF-2790", fuel: "Petrol 93", volume: "5,000 L", status: "delivered" as const, eta: "Delivered", depot: "Graniteside" },
  { id: "ZF-2751", fuel: "Diesel 50", volume: "20,000 L", status: "delivered" as const, eta: "Delivered", depot: "Msasa Depot" },
];

export default function BuyerPage() {
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Overview
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <Smartphone className="h-4 w-4 text-blue-600" />
            <span className="font-semibold text-foreground">Buyer App</span>
            <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">Mobile</Badge>
          </div>
        </div>

        {/* Screen title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Buyer App Screens</h1>
          <p className="text-muted-foreground text-sm mt-1">Mobile app for fuel buyers — showing key flows from KYC through delivery confirmation.</p>
        </div>

        {/* 3-column layout: KYC, Home, Order */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

          {/* Screen 1: KYC Onboarding */}
          <div>
            <div className="text-center mb-4">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">Screen 1</Badge>
              <h3 className="font-semibold mt-2">KYC Onboarding</h3>
            </div>
            <MobileFrame title="Verify Your Account" statusBarDark>
              <div className="bg-primary px-5 pb-6 pt-2">
                <p className="text-primary-foreground/70 text-sm">Complete verification to start ordering fuel</p>
                {/* Progress */}
                <div className="flex items-center gap-2 mt-4">
                  {["ID Upload", "Company Reg", "Tax Clear", "Bank Verify"].map((step, i) => (
                    <div key={step} className="flex-1 flex flex-col items-center gap-1">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i < 2 ? "bg-amber-400 text-gray-900" : i === 2 ? "bg-white/30 text-white border-2 border-white/50" : "bg-white/10 text-white/40"}`}>
                        {i < 2 ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                      </div>
                      <span className="text-[8px] text-primary-foreground/60 text-center leading-tight">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-5 py-5 space-y-4">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div><p className="text-xs font-semibold text-emerald-800">National ID</p><p className="text-xs text-emerald-600">Verified ✓</p></div>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div><p className="text-xs font-semibold text-emerald-800">Company Registration</p><p className="text-xs text-emerald-600">CR No. 12847/2019 ✓</p></div>
                </div>
                <div className="p-4 rounded-xl bg-white border-2 border-dashed border-primary/30">
                  <p className="text-xs font-semibold text-foreground mb-2">Tax Clearance Certificate</p>
                  <p className="text-xs text-muted-foreground mb-3">Upload your ZIMRA Tax Clearance</p>
                  <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium">Upload Document</button>
                </div>
                <div className="p-3 rounded-xl bg-muted border border-border flex items-center gap-3 opacity-50">
                  <Clock className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div><p className="text-xs font-semibold text-muted-foreground">Bank Verification</p><p className="text-xs text-muted-foreground">Unlocks after Tax step</p></div>
                </div>
                <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">Continue</button>
              </div>
            </MobileFrame>
          </div>

          {/* Screen 2: Home Dashboard */}
          <div>
            <div className="text-center mb-4">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">Screen 2</Badge>
              <h3 className="font-semibold mt-2">Home Dashboard</h3>
            </div>
            <MobileFrame>
              {/* Top Bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                <div>
                  <div className="text-xs text-muted-foreground">Good morning,</div>
                  <div className="font-bold text-sm">Chikwanda Mining Co.</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">CM</div>
                </div>
              </div>

              {/* Wallet Card */}
              <div className="mx-4 mt-4 p-4 rounded-2xl bg-primary text-primary-foreground">
                <div className="flex items-center gap-2 mb-1">
                  <Wallet className="h-4 w-4 text-amber-400" />
                  <span className="text-xs text-primary-foreground/70">Escrow Wallet</span>
                </div>
                <div className="text-2xl font-bold">$24,500.00</div>
                <div className="text-xs text-primary-foreground/60 mt-0.5">Available Balance</div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 py-2 rounded-lg bg-amber-400 text-gray-900 text-xs font-semibold">Top Up</button>
                  <button className="flex-1 py-2 rounded-lg bg-white/10 text-white text-xs font-semibold">History</button>
                </div>
              </div>

              {/* Quick Order */}
              <div className="px-4 mt-4">
                <Link href="/buyer/order">
                  <button className="w-full py-3.5 rounded-xl bg-amber-400 text-gray-900 font-semibold text-sm flex items-center justify-center gap-2">
                    <Plus className="h-5 w-5" /> Order Fuel
                  </button>
                </Link>
              </div>

              {/* Fuel Prices */}
              <div className="px-4 mt-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-foreground">ZERA Prices (Today)</span>
                  <span className="text-xs text-muted-foreground">Updated 06:00</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[["Diesel 50", "$1.48/L"], ["Petrol 93", "$1.52/L"]].map(([name, price]) => (
                    <div key={name} className="p-3 rounded-xl bg-muted border border-border">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Droplets className="h-3.5 w-3.5 text-blue-500" />
                        <span className="text-xs font-medium text-foreground">{name}</span>
                      </div>
                      <div className="text-base font-bold text-foreground">{price}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Orders */}
              <div className="px-4 mt-5 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-foreground">Recent Orders</span>
                  <span className="text-xs text-primary cursor-pointer">View all</span>
                </div>
                <div className="space-y-2">
                  {recentOrders.slice(0, 2).map((order) => (
                    <div key={order.id} className="p-3 rounded-xl bg-white border border-border flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-foreground">{order.id}</span>
                          <StatusBadge status={order.status} />
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">{order.fuel} · {order.volume}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </MobileFrame>
          </div>

          {/* Screen 3: Place Order */}
          <div>
            <div className="text-center mb-4">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">Screen 3</Badge>
              <h3 className="font-semibold mt-2">Place Order</h3>
            </div>
            <MobileFrame title="New Fuel Order" backHref="/buyer" statusBarDark>
              <div className="px-5 py-5 space-y-4">
                {/* Fuel Type */}
                <div>
                  <label className="text-xs font-semibold text-foreground mb-2 block">Fuel Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Diesel 50", "Petrol 93"].map((f, i) => (
                      <button key={f} className={`py-3 rounded-xl border-2 text-sm font-medium flex items-center justify-center gap-2 ${i === 0 ? "border-primary bg-primary text-white" : "border-border bg-white text-foreground"}`}>
                        <Droplets className="h-4 w-4" /> {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Volume */}
                <div>
                  <label className="text-xs font-semibold text-foreground mb-2 block">Volume (Litres)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["5,000", "10,000", "20,000"].map((v, i) => (
                      <button key={v} className={`py-2.5 rounded-xl border-2 text-xs font-semibold ${i === 1 ? "border-amber-400 bg-amber-50 text-amber-700" : "border-border bg-white text-foreground"}`}>{v} L</button>
                    ))}
                  </div>
                </div>

                {/* Delivery */}
                <div>
                  <label className="text-xs font-semibold text-foreground mb-2 block">Delivery Method</label>
                  <div className="space-y-2">
                    <button className="w-full p-3 rounded-xl border-2 border-primary bg-primary/5 flex items-center gap-3 text-left">
                      <Truck className="h-5 w-5 text-primary shrink-0" />
                      <div><div className="text-xs font-semibold text-foreground">Deliver to My Site</div><div className="text-xs text-muted-foreground">Courier dispatched to your location</div></div>
                      <div className="ml-auto w-4 h-4 rounded-full border-2 border-primary bg-primary" />
                    </button>
                    <button className="w-full p-3 rounded-xl border-2 border-border bg-white flex items-center gap-3 text-left">
                      <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                      <div><div className="text-xs font-semibold text-foreground">Self-Collect</div><div className="text-xs text-muted-foreground">Pick up from wholesaler depot</div></div>
                      <div className="ml-auto w-4 h-4 rounded-full border-2 border-border" />
                    </button>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="text-xs font-semibold text-foreground mb-2 block">Delivery Date</label>
                  <div className="p-3 rounded-xl border-2 border-border bg-white flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Thursday, 8 May 2026</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="p-4 rounded-xl bg-muted border border-border">
                  <div className="text-xs font-semibold text-foreground mb-3">Order Summary</div>
                  <div className="space-y-1.5 text-xs">
                    {[["Diesel 50 × 10,000 L", "$14,800.00"], ["Delivery Fee", "$320.00"], ["Platform Fee (1%)", "$148.00"]].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-muted-foreground"><span>{k}</span><span>{v}</span></div>
                    ))}
                    <div className="border-t border-border pt-1.5 flex justify-between font-bold text-foreground"><span>Total</span><span>$15,268.00</span></div>
                  </div>
                </div>

                <Link href="/buyer/tracking">
                  <button className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
                    Confirm & Lock Escrow
                  </button>
                </Link>
              </div>
            </MobileFrame>
          </div>
        </div>

        {/* Row 2: Tracking + Confirmation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Screen 4: Live Tracking */}
          <div>
            <div className="text-center mb-4">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">Screen 4</Badge>
              <h3 className="font-semibold mt-2">Live Tracking</h3>
            </div>
            <MobileFrame title="Order ZF-2841" backHref="/buyer" statusBarDark>
              {/* Map Placeholder */}
              <div className="relative h-64 bg-slate-200 overflow-hidden">
                <div className="absolute inset-0" style={{
                  backgroundImage: "linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)",
                  backgroundSize: "32px 32px"
                }} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20" />
                {/* Road */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 390 256">
                  <path d="M 40 200 Q 150 180 200 140 Q 260 100 320 60" stroke="#94a3b8" strokeWidth="6" fill="none" strokeDasharray="12 4" />
                  <circle cx="200" cy="140" r="10" fill="#1E3A5F" />
                  <circle cx="200" cy="140" r="18" fill="#1E3A5F" fillOpacity="0.2" />
                  <circle cx="320" cy="60" r="8" fill="#F59E0B" />
                  <circle cx="40" cy="200" r="8" fill="#10B981" />
                </svg>
                {/* Labels */}
                <div className="absolute top-3 left-3 bg-white rounded-lg px-2 py-1 shadow text-[10px] font-semibold text-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-amber-500" /> Msasa Depot (Origin)
                </div>
                <div className="absolute bottom-4 left-3 bg-white rounded-lg px-2 py-1 shadow text-[10px] font-semibold text-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-emerald-500" /> Chikwanda Mine (Yours)
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white rounded-lg px-2 py-1 shadow text-[10px] font-semibold flex items-center gap-1">
                  <Truck className="h-3 w-3" /> Driver en route
                </div>
              </div>

              <div className="px-5 py-4 space-y-4">
                {/* ETA Card */}
                <div className="p-4 rounded-xl bg-primary text-primary-foreground flex items-center justify-between">
                  <div>
                    <div className="text-xs text-primary-foreground/70">Estimated Arrival</div>
                    <div className="text-2xl font-bold">2h 15m</div>
                    <div className="text-xs text-primary-foreground/60">~148 km remaining</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-primary-foreground/70">Driver</div>
                    <div className="text-sm font-semibold">T. Moyo</div>
                    <div className="text-xs text-amber-400">★ 4.9</div>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="space-y-3">
                  {[
                    { label: "Order Confirmed", sub: "08:14 AM", done: true },
                    { label: "Escrow Locked", sub: "$15,268.00 held", done: true },
                    { label: "Loaded at Depot", sub: "10,000 L loaded · OCR ✓", done: true },
                    { label: "En Route", sub: "Driver en route to your site", done: true, active: true },
                    { label: "Delivered", sub: "Awaiting arrival", done: false },
                  ].map((s) => (
                    <div key={s.label} className={`flex items-center gap-3 ${!s.done ? "opacity-40" : ""}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${s.active ? "bg-amber-400" : s.done ? "bg-emerald-500" : "bg-border"}`}>
                        {s.done && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                      </div>
                      <div><div className="text-xs font-semibold text-foreground">{s.label}</div><div className="text-xs text-muted-foreground">{s.sub}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </MobileFrame>
          </div>

          {/* Screen 5: Delivery Confirmation */}
          <div>
            <div className="text-center mb-4">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">Screen 5</Badge>
              <h3 className="font-semibold mt-2">Delivery Confirmation</h3>
            </div>
            <MobileFrame title="Confirm Delivery" backHref="/buyer" statusBarDark>
              <div className="px-5 py-5 space-y-4">
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="text-xs font-semibold text-amber-800 mb-1">Action Required</div>
                  <p className="text-xs text-amber-700">Inspect physical seals, check meter reading, then scan driver QR to confirm receipt and release payment.</p>
                </div>

                {/* Meter Comparison */}
                <div>
                  <div className="text-xs font-semibold text-foreground mb-2">Meter Verification</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 rounded-xl bg-muted border border-border">
                      <div className="text-[10px] text-muted-foreground mb-1">At Depot (OCR)</div>
                      <div className="text-lg font-bold text-foreground font-mono">9,987 L</div>
                      <div className="text-[10px] text-emerald-600">Loaded reading</div>
                    </div>
                    <div className="p-3 rounded-xl bg-muted border border-border">
                      <div className="text-[10px] text-muted-foreground mb-1">At Site (Photo)</div>
                      <div className="text-lg font-bold text-foreground font-mono">9,985 L</div>
                      <div className="text-[10px] text-emerald-600">Δ 2 L (within tolerance)</div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="text-xs text-emerald-700 font-medium">Volume discrepancy within 0.02% tolerance ✓</span>
                  </div>
                </div>

                {/* QR Scanner */}
                <div>
                  <div className="text-xs font-semibold text-foreground mb-2">Scan Driver QR Code</div>
                  <div className="w-full h-40 rounded-xl bg-gray-900 flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                    <div className="w-28 h-28 border-2 border-amber-400 rounded-xl relative flex items-center justify-center">
                      <div className="absolute -top-0.5 -left-0.5 w-5 h-5 border-t-4 border-l-4 border-amber-400 rounded-tl" />
                      <div className="absolute -top-0.5 -right-0.5 w-5 h-5 border-t-4 border-r-4 border-amber-400 rounded-tr" />
                      <div className="absolute -bottom-0.5 -left-0.5 w-5 h-5 border-b-4 border-l-4 border-amber-400 rounded-bl" />
                      <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 border-b-4 border-r-4 border-amber-400 rounded-br" />
                      <span className="text-white/60 text-xs">Align QR here</span>
                    </div>
                    <p className="text-white/60 text-xs">Point camera at driver&apos;s QR code</p>
                  </div>
                </div>

                {/* Payment Release */}
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="text-xs font-semibold text-foreground mb-2">Payment on Confirmation</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-muted-foreground"><span>Fuel payment → Msasa Depot</span><span className="font-semibold text-foreground">$14,800.00</span></div>
                    <div className="flex justify-between text-muted-foreground"><span>Logistics fee → T. Moyo</span><span className="font-semibold text-foreground">$320.00</span></div>
                    <div className="flex justify-between text-muted-foreground"><span>Platform fee</span><span className="font-semibold text-foreground">$148.00</span></div>
                  </div>
                </div>

                <button className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-5 w-5" /> Confirm Receipt & Release Payment
                </button>
                <button className="w-full py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm font-medium">
                  Raise Dispute
                </button>
              </div>
            </MobileFrame>
          </div>

          {/* Screen 6: Success */}
          <div>
            <div className="text-center mb-4">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">Screen 6</Badge>
              <h3 className="font-semibold mt-2">Order Complete</h3>
            </div>
            <MobileFrame statusBarDark>
              <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-1">Delivery Complete!</h2>
                <p className="text-sm text-muted-foreground mb-6">Order ZF-2841 has been confirmed. Payments released to all parties.</p>

                <div className="w-full p-4 rounded-xl bg-muted border border-border mb-4 text-left">
                  <div className="text-xs font-semibold text-foreground mb-3">Transaction Receipt</div>
                  <div className="space-y-2 text-xs">
                    {[["Order ID", "ZF-2841"], ["Fuel", "Diesel 50 · 9,985 L"], ["Total Paid", "$15,268.00"], ["Date", "07 May 2026"], ["Verified By", "QR + OCR ✓"]].map(([k, v]) => (
                      <div key={k} className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className="font-medium text-foreground">{v}</span></div>
                    ))}
                  </div>
                </div>

                <button className="w-full py-3 rounded-xl bg-primary text-white text-sm font-semibold mb-2">Download Invoice</button>
                <Link href="/buyer" className="w-full">
                  <button className="w-full py-3 rounded-xl border border-border text-sm font-medium text-foreground">Back to Home</button>
                </Link>
              </div>
            </MobileFrame>
          </div>
        </div>
      </div>
    </div>
  );
}
