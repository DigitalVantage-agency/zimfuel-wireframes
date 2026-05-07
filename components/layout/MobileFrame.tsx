"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronLeft, Wifi, Battery, Signal } from "lucide-react";

interface MobileFrameProps {
  children: React.ReactNode;
  title?: string;
  backHref?: string;
  className?: string;
  statusBarDark?: boolean;
}

export function MobileFrame({
  children,
  title,
  backHref,
  className,
  statusBarDark = false,
}: MobileFrameProps) {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div
      className={cn(
        "relative mx-auto w-[390px] overflow-hidden rounded-[44px] shadow-2xl",
        "border-[8px] border-gray-900",
        "bg-white",
        className
      )}
      style={{ minHeight: 844 }}
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 w-36 h-7 bg-gray-900 rounded-b-2xl flex items-center justify-center">
        <div className="w-16 h-1.5 bg-gray-800 rounded-full" />
      </div>

      {/* Status Bar */}
      <div
        className={cn(
          "flex items-center justify-between px-8 pt-4 pb-1 text-xs font-semibold",
          statusBarDark ? "bg-primary text-white" : "bg-white text-gray-900"
        )}
      >
        <span className="tabular-nums">{time}</span>
        <div className="flex items-center gap-1.5">
          <Signal className="h-3 w-3" />
          <Wifi className="h-3 w-3" />
          <Battery className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* App Header */}
      {title && (
        <div
          className={cn(
            "flex items-center gap-3 px-5 py-3 border-b border-border",
            statusBarDark
              ? "bg-primary text-primary-foreground"
              : "bg-white text-foreground"
          )}
        >
          {backHref && (
            <Link href={backHref}>
              <ChevronLeft className="h-5 w-5" />
            </Link>
          )}
          <span className="font-semibold text-base">{title}</span>
        </div>
      )}

      {/* Screen Content */}
      <div className="overflow-y-auto" style={{ maxHeight: 750 }}>
        {children}
      </div>
    </div>
  );
}
