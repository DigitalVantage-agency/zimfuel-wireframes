import Link from "next/link";
import {
  Fuel, Smartphone, LayoutDashboard, ShieldCheck, ArrowRight,
  CheckCircle2, Truck, Users, TrendingUp, Package, FileText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const personas = [
  {
    id: "buyer",
    label: "Buyer App",
    subtitle: "Mobile — iOS & Android",
    description: "Order bulk fuel, track deliveries in real time, and manage escrow payments.",
    icon: <Smartphone className="h-6 w-6" />,
    href: "/buyer",
    color: "bg-blue-600",
    textColor: "text-blue-700",
    lightColor: "bg-blue-50 text-blue-700 border-blue-200",
    features: ["KYC Onboarding", "Place Orders", "Live Tracking", "Escrow Payments", "Delivery Confirmation"],
  },
  {
    id: "courier",
    label: "Courier App",
    subtitle: "Mobile — iOS & Android",
    description: "Accept fuel runs, complete QR chain-of-custody, and receive instant payment.",
    icon: <Truck className="h-6 w-6" />,
    href: "/courier",
    color: "bg-amber-500",
    textColor: "text-amber-700",
    lightColor: "bg-amber-50 text-amber-700 border-amber-200",
    features: ["Job Dispatch", "Depot QR Check-in", "OCR Meter Capture", "Route Tracking", "Payment Release"],
  },
  {
    id: "wholesaler",
    label: "Wholesaler Portal",
    subtitle: "Web Dashboard",
    description: "Manage fuel inventory, fulfil orders, and generate digital bills of lading.",
    icon: <LayoutDashboard className="h-6 w-6" />,
    href: "/wholesaler",
    color: "bg-emerald-600",
    textColor: "text-emerald-700",
    lightColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    features: ["Inventory Management", "Order Fulfilment", "e-BOL Generation", "Revenue Reports", "Courier Assignment"],
  },
  {
    id: "admin",
    label: "Admin Console",
    subtitle: "Web Dashboard",
    description: "System oversight, KYC approvals, dispute resolution, and ZERA pricing.",
    icon: <ShieldCheck className="h-6 w-6" />,
    href: "/admin",
    color: "bg-primary",
    textColor: "text-primary",
    lightColor: "bg-primary/10 text-primary border-primary/20",
    features: ["KYC Approval Queue", "Dispute Resolution", "ZERA Pricing Engine", "Platform Analytics", "Fee Management"],
  },
];

const platformStats = [
  { label: "Platform Personas", value: "4", icon: <Users className="h-4 w-4" /> },
  { label: "Core Screens", value: "24+", icon: <Smartphone className="h-4 w-4" /> },
  { label: "Workflow Phases", value: "6", icon: <Package className="h-4 w-4" /> },
  { label: "Payment Security", value: "Escrow", icon: <ShieldCheck className="h-4 w-4" /> },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-400">
              <Fuel className="h-6 w-6 text-gray-900" />
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight">ZimFuel</div>
              <div className="text-xs text-amber-400 uppercase tracking-widest">Platform Prototype</div>
            </div>
          </div>

          <div className="max-w-3xl">
            <Badge className="bg-amber-400/20 text-amber-300 border-amber-400/30 mb-4">
              Interactive Wireframe — Government Presentation Demo
            </Badge>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Zimbabwe&apos;s National Fuel Logistics Platform
            </h1>
            <p className="text-lg text-primary-foreground/70 leading-relaxed mb-8">
              A secure, end-to-end marketplace connecting fuel buyers, licensed wholesalers, and
              vetted couriers — with QR chain-of-custody, escrow payment protection, and
              real-time ZERA pricing compliance.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {platformStats.map((s) => (
                <div key={s.label} className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-amber-400 mb-1">{s.icon}</div>
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-xs text-primary-foreground/60 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Banner */}
      <div className="bg-amber-400 text-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 flex-wrap text-sm font-medium">
            <TrendingUp className="h-4 w-4" />
            <span>Platform Workflow:</span>
            {["KYC & Onboarding", "Order Placement", "Escrow Lock", "Depot Loading", "In-Transit Tracking", "Delivery & Release"].map((phase, i, arr) => (
              <span key={phase} className="flex items-center gap-2">
                <span className="bg-gray-900/10 px-2 py-0.5 rounded-md">{phase}</span>
                {i < arr.length - 1 && <ArrowRight className="h-3 w-3 opacity-60" />}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Persona Cards */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-2">Explore the Platform</h2>
          <p className="text-muted-foreground">Select a user persona below to view their interactive screens and flows.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personas.map((p) => (
            <Link key={p.id} href={p.href} className="group block">
              <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${p.color} text-white shrink-0`}>
                      {p.icon}
                    </div>
                    <div>
                      <div className="font-bold text-lg leading-tight">{p.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{p.subtitle}</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.description}</p>
                  <div className="space-y-1.5 mb-5">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className={`inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-lg border ${p.lightColor} group-hover:gap-3 transition-all`}>
                    View Screens <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Cost Document CTA */}
        <Link href="/costs" className="group block mt-8">
          <div className="p-5 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10 transition-all flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-foreground">Development & Cost Analysis Document</div>
                <div className="text-sm text-muted-foreground">Full investment breakdown — development, infrastructure, staffing, ROI projections. Print-ready for government presentation.</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary shrink-0 ml-4 group-hover:gap-3 transition-all">
              View Document <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Link>

        <div className="mt-6 p-5 rounded-xl bg-muted/50 border border-border">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-sm text-foreground mb-1">Built for Zimbabwe</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                ZimFuel is designed with Zimbabwe-specific constraints: offline-first architecture for
                remote mines and farms, dual-currency support (USD / ZWG), local payment rails
                (EcoCash, Paynow, Innbucks), ZERA regulatory compliance, and HAZMAT courier
                certification management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
