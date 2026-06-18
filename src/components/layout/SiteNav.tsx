import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { to: "/", label: "Product" },
  { to: "/businesses", label: "Our Partners" },
  { to: "/pricing", label: "Pricing" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed top-3 inset-x-3 sm:inset-x-6 z-50 flex justify-center">
        <nav className="w-full max-w-6xl bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-between pl-5 pr-2 py-2">
          <Link to="/" className="font-display text-2xl tracking-tight text-foreground" style={{ textDecoration: 'none' }}>
            ManageInn
          </Link>
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-foreground/80">
            {NAV_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-foreground">{l.label}</Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/signup"
              className="hidden sm:inline-flex items-center bg-foreground text-background rounded-full px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition"
            >
              Request Access
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-3 rounded-full hover:bg-muted"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-[88%] max-w-sm bg-background p-6 flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl">ManageInn</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 rounded-full hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-10 flex flex-col gap-2 text-2xl font-display">
              {NAV_LINKS.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-3 border-b border-border">
                  {l.label}
                </Link>
              ))}
            </nav>
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="mt-auto bg-foreground text-background rounded-full px-5 py-4 text-center font-semibold"
            >
              Request Access
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background px-6 py-20 mt-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-12">
        <div>
          <div className="font-display text-3xl">ManageInn</div>
          <p className="mt-4 text-background/60 text-sm max-w-xs">
            A modern, cinematic command center designed for visionary businesses.
          </p>
        </div>
        {[
          { h: "Product", l: ["PMS", "Channel Manager", "Revenue AI", "Housekeeping", "POS", "CRM"] },
          { h: "Modules", l: ["Maintenance", "Procurement", "Events", "Payroll", "Finance", "BI"] },
          { h: "Company", l: ["About", "Customers", "Careers", "Security", "Contact", "Status"] },
        ].map((c) => (
          <div key={c.h}>
            <div className="font-semibold mb-4">{c.h}</div>
            <ul className="space-y-3 text-background/60 text-sm">
              {c.l.map((x) => (
                <li key={x}><a href="#" className="hover:text-background text-background/60">{x}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4 justify-between text-sm text-background/50">
        <span>© 2026 ManageInn Elite. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '2vw' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
        </div>
      </div>
      <div className="mt-16 font-display text-[24vw] sm:text-[20vw] leading-[0.85] text-white/[0.06] text-center select-none whitespace-nowrap">
        ManageInn
      </div>
    </footer>
  );
}
