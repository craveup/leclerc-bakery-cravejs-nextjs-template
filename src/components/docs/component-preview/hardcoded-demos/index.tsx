"use client";

import * as React from "react";

// Import all demo components
import { OrderSummaryDemo, orderSummaryDemoCode } from "./order-summary-demo";

// Type for hardcoded component info
export interface HardcodedComponentInfo {
  component: React.ComponentType;
  code: string;
}

// Registry of all hardcoded demos
export const hardcodedDemos: Record<string, HardcodedComponentInfo> = {
  "order-summary-demo": {
    component: OrderSummaryDemo,
    code: orderSummaryDemoCode,
  },
  // More demos will be added here as we extract them
};

// Helper function to get a hardcoded demo
export function getHardcodedDemo(name: string): HardcodedComponentInfo | null {
  return hardcodedDemos[name] || null;
}

// Check if a component is hardcoded
export function isHardcodedDemo(name: string): boolean {
  return name in hardcodedDemos;
}
