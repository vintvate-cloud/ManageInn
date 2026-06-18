import React, { type ReactNode } from "react";
import { Sparkles } from "lucide-react";

export function PageHeader({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
      <div>
        {eyebrow && <div className="text-sm font-medium text-muted-foreground mb-1">{eyebrow}</div>}
        <h1 className="font-display text-4xl sm:text-5xl leading-none">{title}</h1>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`bg-background rounded-3xl border border-border p-5 sm:p-6 ${className}`}>{children}</div>;
}

export function StatCard({ label, value, delta, accent }: { label: string; value: string; delta?: ReactNode; accent?: string }) {
  return (
    <Card className={`${accent} hover-lift`}>
      <div className="text-sm font-medium opacity-80">{label}</div>
      <div className="mt-6 font-display text-5xl">{value}</div>
      {delta && <div className="mt-2 text-xs opacity-70">{delta}</div>}
    </Card>
  );
}

export function AIInsight({ title, body, onApply }: { title: string; body: string; onApply?: () => void }) {
  return (
    <Card className="bg-foreground text-background border-transparent">
      <div className="flex items-center gap-2 text-xs text-op-purple mb-2">
        <Sparkles className="h-3.5 w-3.5" /> AI INSIGHT
      </div>
      <div className="font-display text-xl sm:text-2xl leading-tight">{title}</div>
      <p className="mt-2 text-sm text-background/70">{body}</p>
      <button 
        onClick={onApply}
        className="mt-4 bg-op-purple text-foreground rounded-full px-4 py-2 text-xs font-semibold hover:opacity-90 transition"
      >
        Apply recommendation
      </button>
    </Card>
  );
}

export function SimpleTable({ columns, rows }: { columns: string[]; rows: (string | ReactNode)[][] }) {
  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full text-sm min-w-[560px]">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            {columns.map((c, i) => <th key={i} className="px-5 py-3 font-medium">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border">
              {r.map((cell, j) => <td key={j} className="px-5 py-3">{cell}</td>)}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-5 py-8 text-center text-muted-foreground border-t border-border">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}
