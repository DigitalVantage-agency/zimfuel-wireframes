"use client";

import { Fuel, Users, Server, Shield, TrendingUp, DollarSign, Clock, CheckCircle2, AlertTriangle, ArrowUpRight, Printer, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

// ─── DATA ────────────────────────────────────────────────────────────────────

const devPhases = [
  {
    phase: 1,
    title: "MVP — Core Transactional Loop",
    duration: "8 Weeks",
    description: "End-to-end order flow: buyer places order, wholesaler accepts, courier is assigned, QR depot check-in, delivery confirmation, manual escrow release. No OCR automation yet.",
    deliverables: ["Buyer mobile app (React Native)", "Courier mobile app (React Native)", "Wholesaler web dashboard", "Admin dashboard (basic)", "PostgreSQL schema + API layer", "Manual escrow payment flow"],
    team: [
      { role: "Tech Lead / Architect", rate: 5500, months: 2, total: 11000 },
      { role: "Senior Full-Stack Developer", rate: 4200, months: 2, total: 8400 },
      { role: "Senior Full-Stack Developer", rate: 4200, months: 2, total: 8400 },
      { role: "Mobile Developer (React Native)", rate: 4500, months: 2, total: 9000 },
      { role: "UI/UX Designer", rate: 3000, months: 2, total: 6000 },
      { role: "Project Manager", rate: 3000, months: 2, total: 6000 },
    ],
    subtotal: 48800,
  },
  {
    phase: 2,
    title: "Trust & Verification Layer",
    duration: "6 Weeks",
    description: "KYC document processing pipeline, automated OCR for discharge meters, digital Bill of Lading (e-BOL) generation, dispute state machine with tolerance thresholds, HAZMAT courier certification checks.",
    deliverables: ["KYC document upload + admin review queue", "OCR integration (Google Cloud Vision)", "e-BOL auto-generation", "Dispute logic + tolerance threshold (±2%)", "Offline-first sync for Courier app", "Push notification system"],
    team: [
      { role: "Tech Lead / Architect", rate: 5500, months: 1.5, total: 8250 },
      { role: "Senior Full-Stack Developer", rate: 4200, months: 1.5, total: 6300 },
      { role: "Senior Full-Stack Developer", rate: 4200, months: 1.5, total: 6300 },
      { role: "Mobile Developer (React Native)", rate: 4500, months: 1.5, total: 6750 },
      { role: "QA Engineer", rate: 2500, months: 1.5, total: 3750 },
      { role: "Project Manager", rate: 3000, months: 1.5, total: 4500 },
    ],
    subtotal: 35850,
  },
  {
    phase: 3,
    title: "Marketplace Dynamics & Financial Layer",
    duration: "8 Weeks",
    description: "Real-time ZERA pricing engine, dynamic delivery fee calculator, courier bidding/availability dispatch, full escrow integration with local bank or Paynow API, wallet top-up and withdrawal, dual-currency (USD/ZWG) support.",
    deliverables: ["ZERA real-time pricing engine", "Dynamic delivery pricing formula", "Courier real-time dispatch / bidding", "Escrow integration (Paynow / bank API)", "USD + ZWG dual-currency wallet", "Invoice & receipt PDF generation"],
    team: [
      { role: "Tech Lead / Architect", rate: 5500, months: 2, total: 11000 },
      { role: "Senior Full-Stack Developer", rate: 4200, months: 2, total: 8400 },
      { role: "Senior Full-Stack Developer", rate: 4200, months: 2, total: 8400 },
      { role: "Mobile Developer (React Native)", rate: 4500, months: 1.5, total: 6750 },
      { role: "DevOps / Infrastructure Engineer", rate: 3500, months: 1, total: 3500 },
      { role: "QA Engineer", rate: 2500, months: 2, total: 5000 },
      { role: "Project Manager", rate: 3000, months: 2, total: 6000 },
    ],
    subtotal: 49050,
  },
  {
    phase: 4,
    title: "Security Hardening, UAT & Launch",
    duration: "4 Weeks",
    description: "Independent security audit, penetration testing, ZERA and Reserve Bank of Zimbabwe regulatory review, end-to-end User Acceptance Testing with pilot wholesalers and courier partners, App Store / Google Play submissions.",
    deliverables: ["Independent security audit + pen test", "Regulatory compliance review (ZERA, RBZ)", "App Store & Google Play submissions", "Pilot UAT with real users", "Runbook, SLA docs, and go-live checklist", "Staff training materials"],
    team: [
      { role: "Tech Lead / Architect", rate: 5500, months: 1, total: 5500 },
      { role: "Senior Full-Stack Developer", rate: 4200, months: 1, total: 4200 },
      { role: "Senior Full-Stack Developer", rate: 4200, months: 1, total: 4200 },
      { role: "DevOps / Infrastructure Engineer", rate: 3500, months: 1, total: 3500 },
      { role: "QA Engineer", rate: 2500, months: 1, total: 2500 },
      { role: "Project Manager", rate: 3000, months: 1, total: 3000 },
    ],
    subtotal: 22900,
  },
];

const oneTimeCosts = [
  { item: "Third-party API setup & integration credits", amount: 8000, note: "OCR, Maps, SMS, KYC — first 6 months covered" },
  { item: "Independent security audit & penetration testing", amount: 15000, note: "Recommended pre-launch for financial platforms" },
  { item: "Legal & regulatory compliance review", amount: 12000, note: "ZERA licensing, RBZ fintech, HAZMAT verification" },
  { item: "App Store & Google Play developer accounts", amount: 400, note: "Apple $99/yr + Google $25 one-time" },
  { item: "Device testing lab (iOS & Android handsets)", amount: 4000, note: "Essential for offline-first rural scenarios" },
  { item: "Branding, logo & design assets", amount: 5000, note: "Brand identity beyond wireframe prototype" },
  { item: "Project tooling & software licences (6 months)", amount: 3000, note: "GitHub, Figma, Linear, monitoring tools" },
];

const monthlyInfra = [
  { item: "Hosting — Vercel Pro (web dashboards + API)", low: 150, high: 400 },
  { item: "Database — Supabase Pro (PostgreSQL + Realtime)", low: 25, high: 100 },
  { item: "Message queue — Upstash Redis (BullMQ)", low: 20, high: 60 },
  { item: "File storage + CDN — Cloudflare R2 (KYC docs, OCR photos)", low: 30, high: 80 },
  { item: "Application monitoring — Sentry + Uptime", low: 40, high: 80 },
  { item: "Email service — Resend (receipts, alerts)", low: 20, high: 50 },
];

const monthlyAPIs = [
  { item: "OCR — Google Cloud Vision (meter photos)", low: 50, high: 250, note: "~$0.0015/image; scales with order volume" },
  { item: "Maps & GPS tracking — Mapbox", low: 50, high: 300, note: "Generous free tier, then per 1000 tile loads" },
  { item: "SMS notifications — Africa's Talking", low: 200, high: 600, note: "~$0.04/SMS; 5,000–15,000 SMS/month estimated" },
  { item: "Push notifications — Firebase Cloud Messaging", low: 0, high: 0, note: "Free up to 500k/month" },
  { item: "KYC verification — Smile Identity", low: 50, high: 200, note: "~$1/verification; scales with new user growth" },
  { item: "Payment gateway fees — Paynow / EcoCash", low: 0, high: 0, note: "1–2% per transaction; recovered via platform fee" },
];

const monthlyStaff = [
  { role: "Full-Stack Developer (features, bug fixes)", low: 3500, high: 5000 },
  { role: "DevOps / Infrastructure (part-time)", low: 1500, high: 2500 },
  { role: "Platform Administrator / Ops", low: 1000, high: 1500 },
  { role: "Customer Support Lead", low: 600, high: 1000 },
];

const monthlyOther = [
  { item: "Platform liability insurance", low: 300, high: 600 },
  { item: "Legal retainer (disputes, compliance)", low: 400, high: 800 },
  { item: "Accounting & financial reporting", low: 200, high: 400 },
];

const revenueScenarios = [
  { label: "Conservative", gmv: 500000, orders: 85, description: "10 active wholesalers, ~85 orders/month", fee: 1.0 },
  { label: "Base Case", gmv: 2000000, orders: 340, description: "25 wholesalers, ~340 orders/month", fee: 1.0 },
  { label: "Growth", gmv: 8000000, orders: 1350, description: "60+ wholesalers, nationwide scale", fee: 1.0 },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const usd = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const totalDevStaff = devPhases.reduce((s, p) => s + p.subtotal, 0);
const totalOneTime = oneTimeCosts.reduce((s, c) => s + c.amount, 0);
const contingency = Math.round((totalDevStaff + totalOneTime) * 0.15);
const totalDevelopment = totalDevStaff + totalOneTime + contingency;

const monthlyInfraLow = monthlyInfra.reduce((s, i) => s + i.low, 0);
const monthlyInfraHigh = monthlyInfra.reduce((s, i) => s + i.high, 0);
const monthlyAPILow = monthlyAPIs.reduce((s, i) => s + i.low, 0);
const monthlyAPIHigh = monthlyAPIs.reduce((s, i) => s + i.high, 0);
const monthlyStaffLow = monthlyStaff.reduce((s, i) => s + i.low, 0);
const monthlyStaffHigh = monthlyStaff.reduce((s, i) => s + i.high, 0);
const monthlyOtherLow = monthlyOther.reduce((s, i) => s + i.low, 0);
const monthlyOtherHigh = monthlyOther.reduce((s, i) => s + i.high, 0);
const monthlyTotalLow = monthlyInfraLow + monthlyAPILow + monthlyStaffLow + monthlyOtherLow;
const monthlyTotalHigh = monthlyInfraHigh + monthlyAPIHigh + monthlyStaffHigh + monthlyOtherHigh;

const phaseColors = ["bg-blue-600", "bg-emerald-600", "bg-amber-500", "bg-primary"];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function CostsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Print / nav bar — hidden on print */}
      <div className="print:hidden sticky top-0 z-10 bg-white border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Overview
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-400">
              <Fuel className="h-3.5 w-3.5 text-gray-900" />
            </div>
            <span className="font-bold text-sm text-foreground">ZimFuel</span>
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm text-muted-foreground">Cost & Investment Document</span>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 text-sm font-medium text-primary border border-primary/20 bg-primary/5 px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors"
        >
          <Printer className="h-4 w-4" /> Print / Export PDF
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12 print:py-8 print:px-6">

        {/* Document Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-400 print:w-10 print:h-10">
                <Fuel className="h-6 w-6 text-gray-900" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground tracking-tight">ZimFuel Platform</div>
                <div className="text-xs text-amber-600 uppercase tracking-widest font-semibold">Zimbabwe National Fuel Logistics Marketplace</div>
              </div>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              <div className="font-semibold text-foreground">Confidential</div>
              <div>Investment Proposal</div>
              <div>May 2026</div>
            </div>
          </div>

          <div className="border-l-4 border-primary pl-5 py-1">
            <h1 className="text-3xl font-bold text-foreground leading-tight mb-2">
              Development & Operational Cost Analysis
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              A comprehensive breakdown of investment required to build, launch, and sustain
              Zimbabwe&apos;s first regulated digital fuel logistics marketplace — covering
              development costs, infrastructure, third-party services, staffing, and a
              phased investment timeline.
            </p>
          </div>
        </div>

        {/* Executive Summary */}
        <section className="mb-12">
          <SectionHeader icon={<TrendingUp className="h-5 w-5" />} title="Executive Summary" />
          <div className="grid grid-cols-3 gap-4 mb-6">
            <SummaryBox
              label="Total Development Investment"
              value={usd(totalDevelopment)}
              sub="One-time, across 26 weeks"
              highlight
            />
            <SummaryBox
              label="Monthly Operating Cost"
              value={`${usd(monthlyTotalLow)} – ${usd(monthlyTotalHigh)}`}
              sub="Post-launch, Year 1 estimate"
            />
            <SummaryBox
              label="Break-Even GMV"
              value="~$1M/month"
              sub="At 1% platform fee model"
            />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            ZimFuel requires a single up-front development investment of approximately{" "}
            <strong className="text-foreground">{usd(totalDevelopment)}</strong> to build a
            fully production-ready platform across 26 weeks (approximately 6 months). Post-launch
            operational costs range from{" "}
            <strong className="text-foreground">{usd(monthlyTotalLow)}</strong> to{" "}
            <strong className="text-foreground">{usd(monthlyTotalHigh)}</strong> per month,
            depending on user growth and transaction volume. The platform reaches financial
            break-even when monthly Gross Merchandise Value (GMV) reaches approximately
            $1 million — a realistic target given Zimbabwe&apos;s estimated $300M+ annual
            commercial fuel market.
          </p>
        </section>

        {/* Development Costs */}
        <section className="mb-12">
          <SectionHeader icon={<Users className="h-5 w-5" />} title="Development Investment (One-Time)" />
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Development is structured across four phases over 26 weeks. Rates reflect
            professional market rates for a skilled regional team (Zimbabwe / Southern Africa).
            All rates are in USD per calendar month, full-time equivalent.
          </p>

          <div className="space-y-6">
            {devPhases.map((phase, idx) => (
              <Card key={phase.phase} className="overflow-hidden border-border">
                <div className={`${phaseColors[idx]} px-5 py-3 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Phase {phase.phase}</span>
                    <span className="text-white font-bold">{phase.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-white/20 text-white border-white/30 text-xs">
                      <Clock className="h-3 w-3 mr-1" />{phase.duration}
                    </Badge>
                    <span className="text-white font-bold text-sm">{usd(phase.subtotal)}</span>
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{phase.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Team */}
                    <div>
                      <div className="text-xs font-semibold text-foreground mb-2">Team & Rates</div>
                      <div className="space-y-1">
                        {phase.team.map((m) => (
                          <div key={m.role} className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">{m.role}</span>
                            <span className="font-medium text-foreground tabular-nums">{usd(m.total)}</span>
                          </div>
                        ))}
                        <div className="border-t border-border pt-1 flex justify-between text-xs font-bold">
                          <span className="text-foreground">Phase {phase.phase} Total</span>
                          <span className="text-foreground">{usd(phase.subtotal)}</span>
                        </div>
                      </div>
                    </div>
                    {/* Deliverables */}
                    <div>
                      <div className="text-xs font-semibold text-foreground mb-2">Key Deliverables</div>
                      <div className="space-y-1">
                        {phase.deliverables.map((d) => (
                          <div key={d} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                            {d}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Staff total */}
          <div className="mt-4 p-4 rounded-xl bg-muted border border-border flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Total Staff & Development Costs</span>
            <span className="text-lg font-bold text-foreground tabular-nums">{usd(totalDevStaff)}</span>
          </div>

          {/* One-time additional */}
          <div className="mt-6">
            <div className="text-sm font-semibold text-foreground mb-3">Additional One-Time Costs</div>
            <div className="space-y-2">
              {oneTimeCosts.map((c) => (
                <div key={c.item} className="flex items-center justify-between text-sm py-2 border-b border-border/50">
                  <div>
                    <span className="text-foreground">{c.item}</span>
                    <span className="text-muted-foreground text-xs ml-2">— {c.note}</span>
                  </div>
                  <span className="font-medium text-foreground tabular-nums shrink-0 ml-4">{usd(c.amount)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between text-sm py-2 font-semibold">
                <span className="text-foreground">Additional Costs Subtotal</span>
                <span className="text-foreground tabular-nums">{usd(totalOneTime)}</span>
              </div>
            </div>
          </div>

          {/* Contingency + Grand Total */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm py-2 border-t border-border">
              <div>
                <span className="text-foreground">Contingency Reserve (15%)</span>
                <span className="text-muted-foreground text-xs ml-2">— Recommended for financial platform projects</span>
              </div>
              <span className="font-medium text-foreground tabular-nums">{usd(contingency)}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-primary text-primary-foreground">
              <div>
                <div className="font-bold text-lg">Total Development Investment</div>
                <div className="text-primary-foreground/70 text-xs">One-time cost · 26 weeks to production-ready platform</div>
              </div>
              <div className="text-2xl font-bold tabular-nums">{usd(totalDevelopment)}</div>
            </div>
          </div>
        </section>

        {/* Running Costs */}
        <section className="mb-12">
          <SectionHeader icon={<Server className="h-5 w-5" />} title="Operational Running Costs (Monthly)" />
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Post-launch costs are divided into four categories. Infrastructure and API costs
            scale directly with transaction volume — estimates below are based on Year 1
            projections (50–500 orders per month). All costs are in USD per month.
          </p>

          {/* Infrastructure */}
          <CostTable
            title="1. Cloud Infrastructure"
            icon={<Server className="h-4 w-4" />}
            rows={monthlyInfra}
            note="Infrastructure scales with usage. Estimated on Vercel Pro — Vercel Enterprise pricing applies at high scale."
          />

          {/* APIs */}
          <CostTable
            title="2. Third-Party APIs & Services"
            icon={<Shield className="h-4 w-4" />}
            rows={monthlyAPIs.map(r => ({ item: r.item, low: r.low, high: r.high, note: r.note }))}
            note="API costs grow proportionally with order volume. Payment gateway fees (1–2%) are recovered through the platform fee model."
          />

          {/* Staff */}
          <CostTable
            title="3. Post-Launch Staffing"
            icon={<Users className="h-4 w-4" />}
            rows={monthlyStaff.map(r => ({ item: r.role, low: r.low, high: r.high }))}
            note="Minimum viable operations team. Additional developers required as feature development continues in Year 2."
          />

          {/* Other */}
          <CostTable
            title="4. Legal, Compliance & Insurance"
            icon={<Shield className="h-4 w-4" />}
            rows={monthlyOther}
            note="Essential for a regulated financial platform handling escrow funds on behalf of third parties."
          />

          {/* Monthly Total */}
          <div className="mt-4 p-4 rounded-xl bg-primary text-primary-foreground">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-bold text-lg">Total Monthly Operating Cost</div>
                <div className="text-primary-foreground/70 text-xs">Year 1 estimate · scales with volume in Year 2+</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold tabular-nums">{usd(monthlyTotalLow)} – {usd(monthlyTotalHigh)}</div>
                <div className="text-primary-foreground/60 text-xs">per month</div>
              </div>
            </div>
            <Separator className="bg-white/20 my-2" />
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-primary-foreground/60 text-xs">Year 1 Annual Total</div>
                <div className="font-bold">{usd(monthlyTotalLow * 12)} – {usd(monthlyTotalHigh * 12)}</div>
              </div>
              <div>
                <div className="text-primary-foreground/60 text-xs">Year 2+ (estimated)</div>
                <div className="font-bold">$15,000 – $25,000/mo</div>
              </div>
              <div>
                <div className="text-primary-foreground/60 text-xs">Infrastructure at Scale</div>
                <div className="font-bold">Grows ~30% YoY</div>
              </div>
            </div>
          </div>
        </section>

        {/* Revenue & ROI */}
        <section className="mb-12">
          <SectionHeader icon={<DollarSign className="h-5 w-5" />} title="Revenue Model & Return on Investment" />
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            ZimFuel operates on a <strong className="text-foreground">1% platform fee</strong> applied
            to the total value of every fuel transaction processed through the platform. This is
            collected automatically at the point of escrow release and is in addition to — not instead
            of — the fuel price and delivery fee. The model is transparent, ZERA-compliant, and standard
            for digital logistics marketplaces.
          </p>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Zimbabwe imports approximately <strong className="text-foreground">200 million litres</strong> of
            fuel annually (≈ $300M+ market value). Commercial buyers — mines, farms, manufacturers, and
            utilities — account for the majority of volume. Capturing just <strong className="text-foreground">5%
            of commercial transactions</strong> places ZimFuel well into profitability within 18 months
            of launch.
          </p>

          <div className="space-y-3 mb-6">
            {revenueScenarios.map((s) => {
              const revenue = Math.round(s.gmv * (s.fee / 100));
              const profit = revenue - monthlyTotalHigh;
              const isProfit = profit > 0;
              const months = Math.ceil(totalDevelopment / (revenue - monthlyTotalHigh));
              return (
                <Card key={s.label} className={`border ${s.label === "Base Case" ? "border-primary/30 bg-primary/5" : "border-border"}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-foreground">{s.label} Scenario</span>
                          {s.label === "Base Case" && <Badge className="bg-primary text-primary-foreground text-[10px]">Target Year 1</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{s.description}</p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-muted-foreground">Monthly GMV: <strong className="text-foreground">{usd(s.gmv)}</strong></span>
                          <span className="text-muted-foreground">Platform Revenue: <strong className="text-foreground">{usd(revenue)}/mo</strong></span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className={`text-base font-bold ${isProfit ? "text-emerald-600" : "text-red-500"}`}>
                          {isProfit ? "+" : ""}{usd(profit)}/mo
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {isProfit ? `ROI in ~${months} months` : "Subsidy required"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 3-Year Investment Summary */}
        <section className="mb-12">
          <SectionHeader icon={<Clock className="h-5 w-5" />} title="3-Year Investment Summary" />
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left px-4 py-3 text-xs font-semibold">Period</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold">Activity</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold">Investment</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold">Cumulative</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { period: "Months 1–6", activity: "Platform development, security audit, regulatory review, launch", cost: totalDevelopment, cum: totalDevelopment },
                  { period: "Months 7–12", activity: "Post-launch operations (Year 1 running costs × 6 months)", cost: monthlyTotalHigh * 6, cum: totalDevelopment + monthlyTotalHigh * 6 },
                  { period: "Year 2", activity: "Ongoing operations + feature expansion + team growth", cost: 18000 * 12, cum: totalDevelopment + monthlyTotalHigh * 6 + 18000 * 12 },
                  { period: "Year 3", activity: "Scale operations, multi-province expansion, API ecosystem", cost: 22000 * 12, cum: totalDevelopment + monthlyTotalHigh * 6 + 18000 * 12 + 22000 * 12 },
                ].map((row, i) => (
                  <tr key={row.period} className={i % 2 === 0 ? "bg-white" : "bg-muted/30"}>
                    <td className="px-4 py-3 text-xs font-semibold text-foreground">{row.period}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{row.activity}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-right tabular-nums">{usd(row.cost)}</td>
                    <td className="px-4 py-3 text-xs font-bold text-right tabular-nums text-primary">{usd(row.cum)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-primary/10 border-t-2 border-primary/30">
                  <td colSpan={2} className="px-4 py-3 text-sm font-bold text-foreground">Total 3-Year Investment</td>
                  <td colSpan={2} className="px-4 py-3 text-lg font-bold text-right text-primary tabular-nums">
                    {usd(totalDevelopment + monthlyTotalHigh * 6 + 18000 * 12 + 22000 * 12)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            * Year 2–3 figures are planning estimates assuming moderate platform growth. Revenue generated from platform fees begins offsetting operational costs from approximately Month 10–14.
          </p>
        </section>

        {/* Risk & Assumptions */}
        <section className="mb-12">
          <SectionHeader icon={<AlertTriangle className="h-5 w-5" />} title="Key Assumptions & Risk Factors" />
          <div className="grid grid-cols-2 gap-4">
            {[
              { type: "assumption", label: "Staffing rates", text: "All development rates are in USD and reflect mid-market professional rates for Southern Africa. Rates may vary 20–30% depending on final team composition and location." },
              { type: "assumption", label: "Payment integration", text: "Escrow integration with Paynow or a local bank is assumed to be achievable within 8–12 weeks. RBZ fintech licensing timelines may affect this." },
              { type: "risk", label: "Regulatory approval", text: "ZERA and RBZ regulatory approvals are outside the project team's control. A 4–8 week buffer is built into Phase 4, but delays here could extend the timeline." },
              { type: "risk", label: "Connectivity", text: "Offline-first architecture is included in Phase 2. However, extremely remote locations may require a satellite uplink solution (Starlink) which is not included in this estimate." },
              { type: "assumption", label: "Transaction volume", text: "GMV projections assume organic growth driven by 10–25 committed wholesaler partners at launch. Government backing would significantly accelerate adoption." },
              { type: "risk", label: "Currency volatility", text: "ZWG exchange rate volatility may affect ZWG-denominated running costs and platform fee calculations. USD pricing is recommended as primary." },
            ].map((r) => (
              <div key={r.label} className={`p-4 rounded-xl border ${r.type === "risk" ? "border-amber-200 bg-amber-50/50" : "border-blue-100 bg-blue-50/50"}`}>
                <div className="flex items-center gap-2 mb-1">
                  {r.type === "risk"
                    ? <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                    : <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />}
                  <span className={`text-xs font-bold uppercase tracking-wide ${r.type === "risk" ? "text-amber-700" : "text-blue-700"}`}>
                    {r.type === "risk" ? "Risk" : "Assumption"} — {r.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-border pt-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-400">
              <Fuel className="h-4 w-4 text-gray-900" />
            </div>
            <span className="font-bold text-foreground">ZimFuel</span>
            <span className="text-muted-foreground text-sm">— Zimbabwe&apos;s Fuel Logistics Platform</span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">
            This document is confidential and prepared for government presentation purposes.
            All cost estimates are indicative and subject to formal scope confirmation.
          </p>
          <p className="text-xs text-muted-foreground">
            Prepared by Vantage Digital · May 2026 · Version 1.0
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 print:hidden">
            <Link href="/" className="text-xs text-primary hover:underline flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3" /> View Interactive Wireframes
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-5 pb-2 border-b-2 border-primary">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground shrink-0">
        {icon}
      </div>
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
    </div>
  );
}

function SummaryBox({ label, value, sub, highlight }: { label: string; value: string; sub: string; highlight?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border ${highlight ? "border-amber-200 bg-amber-50" : "border-border bg-muted/40"}`}>
      <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${highlight ? "text-amber-700" : "text-muted-foreground"}`}>{label}</div>
      <div className={`text-xl font-bold leading-tight ${highlight ? "text-amber-700" : "text-foreground"}`}>{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
    </div>
  );
}

function CostTable({ title, icon, rows, note }: {
  title: string;
  icon: React.ReactNode;
  rows: { item: string; low: number; high: number; note?: string }[];
  note?: string;
}) {
  const low = rows.reduce((s, r) => s + r.low, 0);
  const high = rows.reduce((s, r) => s + r.high, 0);
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-muted-foreground">{icon}</span>
        <span className="text-sm font-semibold text-foreground">{title}</span>
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="text-left px-4 py-2 font-semibold text-foreground">Item</th>
              <th className="text-right px-4 py-2 font-semibold text-foreground w-28">Low (USD/mo)</th>
              <th className="text-right px-4 py-2 font-semibold text-foreground w-28">High (USD/mo)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.item} className={i % 2 === 0 ? "bg-white" : "bg-muted/20"}>
                <td className="px-4 py-2 text-foreground">
                  {r.item}
                  {r.note && <span className="text-muted-foreground ml-1">— {r.note}</span>}
                </td>
                <td className="px-4 py-2 text-right tabular-nums text-muted-foreground">
                  {r.low === 0 ? "Free" : `$${r.low.toLocaleString()}`}
                </td>
                <td className="px-4 py-2 text-right tabular-nums font-medium text-foreground">
                  {r.high === 0 ? "Free" : `$${r.high.toLocaleString()}`}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-muted/50 border-t border-border font-semibold">
              <td className="px-4 py-2 text-foreground">Subtotal</td>
              <td className="px-4 py-2 text-right tabular-nums text-muted-foreground">${low.toLocaleString()}</td>
              <td className="px-4 py-2 text-right tabular-nums text-foreground">${high.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      {note && <p className="text-[11px] text-muted-foreground mt-1.5 italic">{note}</p>}
    </div>
  );
}
