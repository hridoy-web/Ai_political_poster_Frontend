"use client";

import React, { memo } from "react";
import { cn } from "cn";
import type { PaymentGateway } from "../types";

interface PaymentGatewaySelectorProps {
  gateways: PaymentGateway[];
  selectedPayment: string;
  onSelectPayment: (id: string) => void;
}

export const PaymentGatewaySelector = memo(function PaymentGatewaySelector({
  gateways,
  selectedPayment,
  onSelectPayment,
}: PaymentGatewaySelectorProps) {
  return (
    <div className="space-y-2.5 pt-2">
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        পেমেন্ট মাধ্যম বেছে নিন:
      </div>
      <div role="radiogroup" aria-label="পেমেন্ট মাধ্যম বেছে নিন" className="grid grid-cols-3 gap-3">
        {gateways.map((gateway) => {
          const isChecked = selectedPayment === gateway.id;
          return (
            <button
              key={gateway.id}
              type="button"
              role="radio"
              aria-checked={isChecked}
              onClick={() => onSelectPayment(gateway.id)}
              className={cn(
                "p-3.5 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer",
                isChecked
                  ? "border-primary bg-accent text-accent-foreground ring-2 ring-primary/30 shadow-md scale-[1.02]"
                  : "border-border bg-background text-muted-foreground hover:bg-muted hover:border-primary/40 hover:-translate-y-0.5"
              )}
            >
              <div className="text-xs sm:text-sm font-bold text-foreground">
                {gateway.name}
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">
                {gateway.badge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
});
