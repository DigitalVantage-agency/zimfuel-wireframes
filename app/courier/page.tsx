"use client";

import Link from "next/link";
import { MobileFrame } from "@/components/layout/MobileFrame";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  Truck, MapPin, CheckCircle2, Clock, ArrowLeft, Camera,
  QrCode, Wallet, Navigation, Fuel, AlertTriangle, Star,
  Package
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const availableJobs = [
  { id: "ZF-2841", from: "Msasa Depot, Harare", to: "Chikwanda Mine, Mazowe", fuel: "Diesel 50", volume: "10,000 L", fee: "$320", distance: "148 km", eta: "2h 15m" },
  { id: "ZF-2842", from: "Graniteside Depot", to: "Delta Foods, Chitungwiza", fuel: "Petrol 93", volume: "5,000 L", fee: "$185", distance: "42 km", eta: "55m" },
];

export default function CourierPage() {
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Overview
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <Truck className="h-4 w-4 text-amber-600" />
            <span className="font-semibold text-foreground">Courier App</span>
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">Mobile</Badge>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Courier App Screens</h1>
          <p className="text-muted-foreground text-sm mt-1">Mobile app for fuel couriers — job acceptance through delivery completion with QR chain-of-custody.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

          {/* Screen 1: Courier Home */}
          <div>
            <div className="text-center mb-4">
              <Badge className="bg-amber-100 text-amber-700 border-amber-200">Screen 1</Badge>
              <h3 className="font-semibold mt-2">Courier Home</h3>
            </div>
            <MobileFrame>
              <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                <div>
                  <div className="text-xs text-muted-foreground">Welcome back,</div>
                  <div className="font-bold text-sm">Tinashe Moyo</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs text-emerald-700 font-medium">Online</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-gray-900 text-xs font-bold">TM</div>
                </div>
              </div>

              {/* Earnings Card */}
              <div className="mx-4 mt-4 p-4 rounded-2xl bg-amber-400 text-gray-900">
                <div className="flex items-center gap-2 mb-1">
                  <Wallet className="h-4 w-4" />
                  <span className="text-xs font-medium">Today&apos;s Earnings</span>
                </div>
                <div className="text-2xl font-bold">$505.00</div>
                <div className="text-xs opacity-70 mt-0.5">2 deliveries completed</div>
                <div className="flex gap-2 mt-3">
                  <div className="flex-1 bg-gray-900/10 rounded-lg p-2 text-center">
                    <div className="text-sm font-bold">4.9</div>
                    <div className="text-[10px] opacity-70">Rating</div>
                  </div>
                  <div className="flex-1 bg-gray-900/10 rounded-lg p-2 text-center">
                    <div className="text-sm font-bold">47</div>
                    <div className="text-[10px] opacity-70">Total Jobs</div>
                  </div>
                  <div className="flex-1 bg-gray-900/10 rounded-lg p-2 text-center">
                    <div className="text-sm font-bold">HAZMAT</div>
                    <div className="text-[10px] opacity-70">Certified</div>
                  </div>
                </div>
              </div>

              {/* Available Jobs */}
              <div className="px-4 mt-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-foreground">Available Jobs</span>
                  <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-[10px]">2 Near You</Badge>
                </div>
                <div className="space-y-3">
                  {availableJobs.map((job) => (
                    <div key={job.id} className="p-3 rounded-xl bg-white border border-border">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-xs font-bold text-foreground">{job.id}</div>
                          <div className="text-[10px] text-muted-foreground">{job.fuel} · {job.volume}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-emerald-600">{job.fee}</div>
                          <div className="text-[10px] text-muted-foreground">{job.distance}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-1">
                        <MapPin className="h-3 w-3 text-amber-500 shrink-0" /> {job.from}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-3">
                        <MapPin className="h-3 w-3 text-emerald-500 shrink-0" /> {job.to}
                      </div>
                      <button className="w-full py-2 rounded-lg bg-amber-400 text-gray-900 text-xs font-semibold">Accept Job</button>
                    </div>
                  ))}
                </div>
              </div>
            </MobileFrame>
          </div>

          {/* Screen 2: Depot QR Check-in */}
          <div>
            <div className="text-center mb-4">
              <Badge className="bg-amber-100 text-amber-700 border-amber-200">Screen 2</Badge>
              <h3 className="font-semibold mt-2">Depot QR Check-in</h3>
            </div>
            <MobileFrame title="Depot Check-in" backHref="/courier" statusBarDark>
              <div className="px-5 py-4 space-y-4">
                {/* Job Summary */}
                <div className="p-3 rounded-xl bg-muted border border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="h-4 w-4 text-primary" />
                    <span className="text-xs font-bold text-foreground">Order ZF-2841</span>
                    <StatusBadge status="confirmed" />
                  </div>
                  <div className="text-xs text-muted-foreground">Diesel 50 · 10,000 L · Msasa Depot</div>
                </div>

                {/* Step 1: Gate QR */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">1</div>
                    <span className="text-xs font-semibold text-foreground">Scan Gate QR Code</span>
                  </div>
                  <div className="w-full h-36 rounded-xl bg-gray-900 flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                    <div className="w-24 h-24 border-2 border-amber-400 rounded-lg relative flex items-center justify-center">
                      <QrCode className="h-8 w-8 text-amber-400/60" />
                      <div className="absolute -top-0.5 -left-0.5 w-4 h-4 border-t-4 border-l-4 border-amber-400 rounded-tl" />
                      <div className="absolute -top-0.5 -right-0.5 w-4 h-4 border-t-4 border-r-4 border-amber-400 rounded-tr" />
                      <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 border-b-4 border-l-4 border-amber-400 rounded-bl" />
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 border-b-4 border-r-4 border-amber-400 rounded-br" />
                    </div>
                    <p className="text-white/60 text-[10px]">Scan QR at depot gate</p>
                  </div>
                </div>

                {/* Step 2: OCR Meter */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-border flex items-center justify-center text-muted-foreground text-xs font-bold shrink-0">2</div>
                    <span className="text-xs font-semibold text-muted-foreground">Capture Discharge Meter (after loading)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted border border-dashed border-border flex items-center gap-3 opacity-50">
                    <Camera className="h-8 w-8 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground">Meter Photo</p>
                      <p className="text-[10px] text-muted-foreground">OCR will extract reading automatically</p>
                    </div>
                  </div>
                </div>

                {/* Step 3: e-BOL */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-border flex items-center justify-center text-muted-foreground text-xs font-bold shrink-0">3</div>
                    <span className="text-xs font-semibold text-muted-foreground">e-BOL Generated</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted border border-dashed border-border opacity-50">
                    <p className="text-xs text-muted-foreground">Digital Bill of Lading auto-generated. Wholesaler payment released.</p>
                  </div>
                </div>

                <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2">
                  <QrCode className="h-4 w-4" /> Open QR Scanner
                </button>
              </div>
            </MobileFrame>
          </div>

          {/* Screen 3: OCR Meter Capture */}
          <div>
            <div className="text-center mb-4">
              <Badge className="bg-amber-100 text-amber-700 border-amber-200">Screen 3</Badge>
              <h3 className="font-semibold mt-2">OCR Meter Capture</h3>
            </div>
            <MobileFrame title="Capture Meter Reading" backHref="/courier" statusBarDark>
              <div className="space-y-4">
                {/* Camera View */}
                <div className="relative h-56 bg-gray-800 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-28 border-2 border-amber-400 rounded-lg relative">
                      <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-amber-400" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-amber-400" />
                      <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-amber-400" />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-amber-400" />
                      {/* Fake meter display */}
                      <div className="absolute inset-2 bg-gray-900 rounded flex items-center justify-center">
                        <div className="bg-black border border-gray-600 rounded px-3 py-1">
                          <span className="text-amber-400 font-mono text-xl font-bold tracking-widest">9 9 8 7</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-3 inset-x-0 flex justify-center">
                    <div className="bg-amber-400/90 rounded-full px-3 py-1 text-gray-900 text-xs font-semibold animate-pulse">
                      OCR reading in progress...
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Fuel className="h-5 w-5 text-white/60" />
                  </div>
                </div>

                <div className="px-5 space-y-4">
                  {/* OCR Result */}
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span className="text-xs font-semibold text-emerald-800">OCR Reading Detected</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-foreground font-mono">9,987</span>
                      <span className="text-sm text-muted-foreground">Litres</span>
                    </div>
                    <div className="text-xs text-emerald-600 mt-1">Confidence: 98.4% — Auto-filled</div>
                  </div>

                  {/* Manual Override */}
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1.5 block">Manual Override (if OCR incorrect)</label>
                    <div className="flex gap-2">
                      <div className="flex-1 px-3 py-2.5 rounded-xl border border-border bg-white font-mono text-sm text-muted-foreground">9,987</div>
                      <button className="px-3 py-2.5 rounded-xl bg-muted border border-border text-xs text-muted-foreground">Edit</button>
                    </div>
                  </div>

                  {/* Warning note */}
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700">Photo is stored as evidence. Any discrepancy &gt;2% at delivery will trigger automatic dispute review.</p>
                  </div>

                  <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">Confirm & Generate e-BOL</button>
                </div>
              </div>
            </MobileFrame>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Screen 4: En Route */}
          <div>
            <div className="text-center mb-4">
              <Badge className="bg-amber-100 text-amber-700 border-amber-200">Screen 4</Badge>
              <h3 className="font-semibold mt-2">En Route Navigation</h3>
            </div>
            <MobileFrame title="En Route" backHref="/courier" statusBarDark>
              {/* Map */}
              <div className="relative h-60 bg-slate-200 overflow-hidden">
                <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 390 240">
                  <path d="M 60 200 Q 140 170 190 130 Q 250 90 330 50" stroke="#1E3A5F" strokeWidth="5" fill="none" />
                  <circle cx="190" cy="130" r="12" fill="#F59E0B" />
                  <circle cx="190" cy="130" r="22" fill="#F59E0B" fillOpacity="0.25" />
                  <circle cx="330" cy="50" r="8" fill="#10B981" />
                  <circle cx="60" cy="200" r="8" fill="#6b7280" />
                </svg>
                <div className="absolute top-3 right-3 bg-white rounded-lg px-2 py-1 shadow text-[10px] font-semibold text-foreground">
                  <Navigation className="h-3 w-3 text-primary inline mr-1" /> 148 km
                </div>
              </div>

              <div className="px-5 py-4 space-y-3">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-amber-700 font-medium">ETA to Chikwanda Mine</div>
                    <div className="text-lg font-bold text-foreground">2h 15m</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Speed</div>
                    <div className="text-sm font-bold text-foreground">87 km/h</div>
                  </div>
                </div>

                {/* Seal Check */}
                <div className="p-3 rounded-xl bg-white border border-border">
                  <div className="text-xs font-semibold text-foreground mb-2">Tanker Seal Status</div>
                  <div className="space-y-1.5">
                    {[["Inlet Seal", "SEAL-4821", "Intact"], ["Outlet Seal", "SEAL-4822", "Intact"], ["Manhole Seal", "SEAL-4823", "Intact"]].map(([seal, id, status]) => (
                      <div key={seal} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{seal}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">{id}</span>
                        <span className="text-emerald-600 font-medium">{status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Offline Banner */}
                <div className="p-2.5 rounded-lg bg-orange-50 border border-orange-200 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                  <span className="text-[10px] text-orange-700">Low connectivity — data syncing when signal improves (Offline Mode)</span>
                </div>

                <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2">
                  <Navigation className="h-4 w-4" /> Open Navigation
                </button>
              </div>
            </MobileFrame>
          </div>

          {/* Screen 5: Delivery QR */}
          <div>
            <div className="text-center mb-4">
              <Badge className="bg-amber-100 text-amber-700 border-amber-200">Screen 5</Badge>
              <h3 className="font-semibold mt-2">Delivery QR Scan</h3>
            </div>
            <MobileFrame title="Confirm Delivery" backHref="/courier" statusBarDark>
              <div className="px-5 py-4 space-y-4">
                <div className="p-3 rounded-xl bg-muted border border-border">
                  <p className="text-xs font-semibold text-foreground mb-0.5">Arrived at Chikwanda Mine</p>
                  <p className="text-xs text-muted-foreground">Show your QR code to the buyer to complete delivery.</p>
                </div>

                {/* Driver QR */}
                <div className="flex flex-col items-center py-4 gap-4">
                  <p className="text-xs text-muted-foreground">Your Driver QR Code</p>
                  <div className="w-44 h-44 bg-white border-2 border-border rounded-2xl shadow p-3">
                    {/* SVG QR pattern */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Simplified QR-like pattern */}
                      <rect x="5" y="5" width="30" height="30" rx="3" fill="none" stroke="#1E3A5F" strokeWidth="4" />
                      <rect x="12" y="12" width="16" height="16" rx="1" fill="#1E3A5F" />
                      <rect x="65" y="5" width="30" height="30" rx="3" fill="none" stroke="#1E3A5F" strokeWidth="4" />
                      <rect x="72" y="12" width="16" height="16" rx="1" fill="#1E3A5F" />
                      <rect x="5" y="65" width="30" height="30" rx="3" fill="none" stroke="#1E3A5F" strokeWidth="4" />
                      <rect x="12" y="72" width="16" height="16" rx="1" fill="#1E3A5F" />
                      {[45,50,55,60,65].map((x) => [45,50,55,60,65].map((y) => Math.random() > 0.5 ? <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" fill="#1E3A5F" /> : null))}
                      <rect x="45" y="45" width="4" height="4" fill="#1E3A5F" />
                      <rect x="55" y="45" width="4" height="4" fill="#1E3A5F" />
                      <rect x="65" y="45" width="4" height="4" fill="#1E3A5F" />
                      <rect x="45" y="55" width="4" height="4" fill="#1E3A5F" />
                      <rect x="65" y="55" width="4" height="4" fill="#1E3A5F" />
                      <rect x="45" y="65" width="4" height="4" fill="#1E3A5F" />
                      <rect x="55" y="65" width="4" height="4" fill="#1E3A5F" />
                      <rect x="65" y="65" width="4" height="4" fill="#1E3A5F" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-foreground">DRIVER: T. Moyo</div>
                    <div className="text-xs text-muted-foreground font-mono">ZF-2841 · DRV-00847</div>
                  </div>
                </div>

                {/* Payment pending */}
                <div className="p-3 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-xs font-semibold text-foreground">Payment Pending Buyer Scan</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Logistics fee</span>
                    <span className="font-bold text-emerald-600 text-base">$320.00</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">Released instantly when buyer confirms receipt</p>
                </div>
              </div>
            </MobileFrame>
          </div>

          {/* Screen 6: Payment Received */}
          <div>
            <div className="text-center mb-4">
              <Badge className="bg-amber-100 text-amber-700 border-amber-200">Screen 6</Badge>
              <h3 className="font-semibold mt-2">Payment Received</h3>
            </div>
            <MobileFrame statusBarDark>
              <div className="flex flex-col items-center justify-center px-5 py-8 text-center">
                <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <Wallet className="h-10 w-10 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-1">Payment Received!</h2>
                <p className="text-sm text-muted-foreground mb-2">$320.00 credited to your wallet</p>
                <div className="flex items-center gap-1 text-amber-500 mb-6">
                  {[1,2,3,4,5].map((s) => <Star key={s} className="h-4 w-4 fill-current" />)}
                </div>

                <div className="w-full p-4 rounded-xl bg-muted border border-border mb-4 text-left">
                  <div className="text-xs font-semibold text-foreground mb-3">Job Summary</div>
                  <div className="space-y-2 text-xs">
                    {[["Job ID", "ZF-2841"], ["Route", "Msasa → Chikwanda"], ["Volume Delivered", "9,985 L"], ["Distance", "148 km"], ["Delivery Fee", "$320.00"], ["Rating from Buyer", "★ 5.0"]].map(([k, v]) => (
                      <div key={k} className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className="font-medium text-foreground">{v}</span></div>
                    ))}
                  </div>
                </div>

                <button className="w-full py-3 rounded-xl bg-amber-400 text-gray-900 text-sm font-semibold mb-2">View Wallet</button>
                <Link href="/courier" className="w-full">
                  <button className="w-full py-3 rounded-xl border border-border text-sm font-medium text-foreground">Find Next Job</button>
                </Link>
              </div>
            </MobileFrame>
          </div>
        </div>
      </div>
    </div>
  );
}
