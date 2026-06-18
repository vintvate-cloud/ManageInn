import { useEffect, useState } from "react";
import {
  Bot, Sparkles, TrendingUp, TrendingDown, CheckCircle2, Clock, Bed, Hotel,
  MessageCircle, DollarSign, ArrowUpRight, Plus, UtensilsCrossed
} from "lucide-react";
import { PageHeader } from "../../components/ui/dashboard-shell";
import { useSite } from "../../features/context/SiteContext";
import RestaurantDashboard from "../restaurant/RestaurantDashboard";

function Overview() {
  const { activeSite } = useSite();

  return (
    <div className="space-y-12">
      {activeSite === "hotel" && <HotelOverview />}

      {activeSite === "hybrid" && <HybridOverview />}

      {activeSite === "restaurant" && (
        <div className="space-y-6">
          <RestaurantDashboard />
        </div>
      )}
    </div>
  );
}

function HotelOverview() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Hotel Operations View"
        title="Hotel Dashboard"
        action={
          <div className="flex gap-2">
            <button className="bg-op-purple text-foreground rounded-full px-5 py-2.5 text-sm font-semibold">
              Generate Report
            </button>
          </div>
        }
      />

      {/* FRONT OFFICE & ROOM MANAGEMENT */}
      <div className="grid lg:grid-cols-2 gap-8">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Hotel className="h-5 w-5 text-op-purple" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Front Office</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-op-purple/10 border border-op-purple/20 rounded-2xl p-4">
              <div className="text-xs text-op-purple font-medium">Today's Check-Ins</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Today's Check-Outs</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Walk-in Guests</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Pending Bookings</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Bed className="h-5 w-5 text-op-orange" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Room Management</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Available Rooms</div>
              <div className="text-2xl font-display mt-1 text-emerald-500">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Occupied Rooms</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Cleaning / Maintenance</div>
              <div className="text-2xl font-display mt-1 text-rose-500">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Room Upgrades</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
          </div>
        </section>
      </div>

      {/* HOUSEKEEPING & STAFF */}
      <div className="grid lg:grid-cols-2 gap-8">
        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Housekeeping</h3>
          <div className="space-y-3">
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">Rooms Pending Cleaning</div>
              <div className="text-xl font-bold">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">Pending Inspections</div>
              <div className="text-xl font-bold">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">Laundry Status</div>
              <div className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-md">Cleared</div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Staff Management</h3>
          <div className="space-y-3">
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">Staff On Duty</div>
              <div className="text-xl font-bold">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">Pending Payroll</div>
              <div className="text-xl font-bold">$0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">Active Tasks</div>
              <div className="text-xl font-bold">0</div>
            </div>
          </div>
        </section>
      </div>

      {/* BILLING, GUESTS & REPORTS */}
      <div className="grid lg:grid-cols-3 gap-8">
        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Billing & Payments</h3>
          <div className="bg-card border border-border rounded-3xl p-6 h-[200px] flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="text-sm text-muted-foreground">GST Billed</span>
                <span className="font-semibold">$0</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Online Payments</span>
                <span className="font-semibold text-emerald-500">$0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Outstanding Dues</span>
                <span className="font-semibold text-rose-500">$0</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Guest Management</h3>
          <div className="bg-card border border-border rounded-3xl p-6 h-[200px] flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Loyalty Members</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Special Requests</span>
                <span className="font-semibold text-op-orange">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg Feedback Score</span>
                <span className="font-semibold text-emerald-500">0.0</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Reports & Analytics</h3>
          <div className="bg-card border border-border rounded-3xl p-6 h-[200px] flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Occupancy Rate</span>
                <span className="font-semibold">0%</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Average Room Rate</span>
                <span className="font-semibold">$0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">RevPAR</span>
                <span className="font-semibold">$0</span>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}

function HybridOverview() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Hybrid Operations View"
        title="Command Center"
        action={
          <div className="flex gap-2">
            <button className="bg-op-purple text-foreground rounded-full px-5 py-2.5 text-sm font-semibold">
              Generate Report
            </button>
          </div>
        }
      />

      {/* REVENUE SECTION */}
      <section>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Revenue Overview</h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Total Revenue Today", value: "$0" },
            { label: "Hotel Revenue", value: "$0", text: "text-op-purple" },
            { label: "Restaurant Revenue", value: "$0", text: "text-op-orange" },
            { label: "Monthly Revenue", value: "$0" },
            { label: "Profit Overview", value: "0%" },
          ].map((k) => (
            <div key={k.label} className="bg-card border border-border rounded-3xl p-5 hover-lift">
              <div className="text-xs text-muted-foreground">{k.label}</div>
              <div className={`mt-3 font-display text-3xl ${k.text || ""}`}>{k.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOTEL & RESTAURANT SECTIONS */}
      <div className="grid lg:grid-cols-2 gap-8">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Hotel className="h-5 w-5 text-op-purple" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Hotel Operations</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-op-purple/10 border border-op-purple/20 rounded-2xl p-4">
              <div className="text-xs text-op-purple font-medium">Occupied Rooms</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Available Rooms</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Today's Check-Ins</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Today's Check-Outs</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
            <div className="col-span-2 bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">Pending Bookings</div>
              <div className="bg-muted px-3 py-1 rounded-full text-xs font-semibold">0</div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <UtensilsCrossed className="h-5 w-5 text-op-orange" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Restaurant Operations</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-op-orange/10 border border-op-orange/20 rounded-2xl p-4">
              <div className="text-xs text-op-orange font-medium">Active Tables</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Orders In Progress</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Kitchen Pending</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Today's Customers</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
          </div>
        </section>
      </div>

      {/* STAFF & INVENTORY SECTIONS */}
      <div className="grid lg:grid-cols-2 gap-8">
        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Inventory & Stock</h3>
          <div className="space-y-3">
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div>
                <div className="text-sm font-medium">Low Stock Alerts</div>
                <div className="text-xs text-rose-500 mt-1">Action required</div>
              </div>
              <div className="text-xl font-bold">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">Total Inventory Value</div>
              <div className="text-xl font-bold">$0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">Pending Purchase Requests</div>
              <div className="text-xl font-bold">0</div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Staff & Workforce</h3>
          <div className="space-y-3">
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">Staff On Duty</div>
              <div className="text-xl font-bold">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">Attendance Summary</div>
              <div className="text-xl font-bold">0%</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">Shift Status</div>
              <div className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-md">Optimal</div>
            </div>
          </div>
        </section>
      </div>

      {/* CUSTOMER INSIGHTS & FINANCIAL */}
      <div className="grid lg:grid-cols-2 gap-8">
        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Customer Insights</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Total Guests</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Repeat Customers</div>
              <div className="text-2xl font-display mt-1">0%</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Loyalty Members</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Satisfaction Score</div>
              <div className="text-2xl font-display mt-1 text-emerald-500">0.0</div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Financial Overview</h3>
          <div className="bg-card border border-border rounded-3xl p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Total Income</span>
                <span className="font-semibold text-emerald-500">+$0</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Total Expenses</span>
                <span className="font-semibold text-rose-500">-$0</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Net Profit</span>
                <span className="font-semibold">$0</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm text-muted-foreground">GST Summary</span>
                <span className="font-semibold">$0</span>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}

function KPIs() {
  const kpis = [
    { label: "Occupancy", value: "0%", delta: "0%", up: true, sub: "vs last week", bg: "bg-op-purple" },
    { label: "ADR", value: "$0", delta: "$0", up: true, sub: "average daily rate", bg: "bg-op-pink" },
    { label: "RevPAR", value: "$0", delta: "0%", up: true, sub: "revenue per room", bg: "bg-op-peach" },
    { label: "Arrivals", value: "0", delta: "0", up: true, sub: "today", bg: "bg-op-beige" },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((k) => (
        <div key={k.label} className={`${k.bg} rounded-3xl p-5 hover-lift`}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium opacity-80">{k.label}</span>
            <span className={`text-xs font-semibold inline-flex items-center gap-1 ${k.up ? "text-emerald-700" : "text-rose-700"}`}>
              {k.delta}
            </span>
          </div>
          <div className="mt-6 font-display text-5xl">{k.value}</div>
          <div className="mt-2 text-xs opacity-70">{k.sub}</div>
        </div>
      ))}
    </div>
  );
}

function RevenueChart() {
  const bars = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const labels = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  return (
    <div className="lg:col-span-2 bg-card rounded-3xl p-6 sm:p-8 border border-border">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-sm text-muted-foreground">Revenue, last 12 months</div>
          <div className="text-3xl font-semibold">$0</div>
        </div>
        <div className="flex gap-2">
          {["1M","3M","6M","12M","All"].map((t, i) => (
            <button key={t} className={`text-xs px-3 py-1.5 rounded-full ${i === 3 ? "bg-foreground text-background" : "bg-muted"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-end gap-2 sm:gap-3 h-56">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full rounded-t-2xl bg-foreground hover:bg-op-purple transition" style={{ height: `${h}%` }} />
            <span className="text-[10px] text-muted-foreground">{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Copilot() {
  const suggestions: string[] = [];
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (suggestions.length === 0) return;
    const t = setInterval(() => setActive((a) => (a + 1) % suggestions.length), 2500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-op-purple rounded-3xl p-6 sm:p-8">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Bot className="h-4 w-4" /> AI Copilot
        <span className="ml-auto inline-flex items-center gap-1.5 text-xs">
          <span className="h-2 w-2 rounded-full bg-op-success animate-pulse-dot" /> Live
        </span>
      </div>
      <h3 className="mt-6 font-display text-3xl">Today's suggestions</h3>
      {suggestions.length > 0 ? (
        <>
          <ul className="mt-6 space-y-2">
            {suggestions.map((s, i) => (
              <li key={s} className={`flex items-start gap-3 rounded-2xl px-4 py-3 text-sm transition ${i === active ? "bg-foreground text-background" : "bg-white/40"}`}>
                <Sparkles className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="font-medium">{s}</span>
              </li>
            ))}
          </ul>
          <button className="mt-6 w-full bg-foreground text-background rounded-full py-3 text-sm font-semibold inline-flex items-center justify-center gap-2">
            Apply all <ArrowUpRight className="h-4 w-4" />
          </button>
        </>
      ) : (
        <div className="mt-6 py-8 text-center bg-white/20 rounded-2xl">
          <p className="text-sm font-medium">No new suggestions yet.</p>
          <p className="text-xs mt-1 opacity-70">Copilot is analyzing your data.</p>
        </div>
      )}
    </div>
  );
}

function Arrivals() {
  const rows: any[] = [];
  return (
    <div className="bg-card rounded-3xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Arrivals today</h3>
        <button className="text-xs text-muted-foreground">View all</button>
      </div>
      {rows.length > 0 ? (
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.room} className="flex items-center justify-between rounded-2xl bg-muted/60 px-3 py-2.5">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-semibold shrink-0">
                  {r.name.split(" ").map((n: string) => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{r.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{r.room}</div>
                </div>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-1 rounded-full whitespace-nowrap ${r.color}`}>{r.status}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-sm text-muted-foreground">
          No arrivals scheduled for today.
        </div>
      )}
    </div>
  );
}

function Housekeeping() {
  const stats = [
    { label: "Clean", count: 0, icon: CheckCircle2, color: "text-emerald-700 bg-op-success/20" },
    { label: "In progress", count: 0, icon: Clock, color: "text-rose-700 bg-op-pink/30" },
    { label: "Dirty", count: 0, icon: Bed, color: "text-foreground bg-muted" },
  ];
  return (
    <div className="bg-card rounded-3xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Housekeeping</h3>
        <button className="text-xs text-muted-foreground">Open board</button>
      </div>
      <div className="space-y-3">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className={`h-8 w-8 rounded-full inline-flex items-center justify-center ${s.color}`}>
                <s.icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium">{s.label}</span>
            </div>
            <span className="text-xl font-semibold">{s.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Messages() {
  const msgs: any[] = [];
  return (
    <div className="bg-card rounded-3xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Inbox</h3>
        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-semibold">0 new</span>
      </div>
      {msgs.length > 0 ? (
        <div className="space-y-3">
          {msgs.map((m) => (
            <div key={m.from} className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-op-purple flex items-center justify-center shrink-0">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold truncate">{m.from}</span>
                  <span className="text-[10px] text-muted-foreground">{m.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-sm text-muted-foreground">
          You're all caught up!
        </div>
      )}
    </div>
  );
}

function Properties() {
  const props: any[] = [];
  return (
    <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-lg">Your properties</h3>
          <p className="text-xs text-muted-foreground">0 active</p>
        </div>
        <button className="text-xs bg-muted px-3 py-1.5 rounded-full font-semibold">Manage</button>
      </div>
      {props.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {props.map((p) => (
            <div key={p.name} className="rounded-2xl overflow-hidden bg-muted/60 hover-lift">
              <div className={`${p.img} h-24 flex items-end p-3`}>
                <Hotel className="h-5 w-5" />
              </div>
              <div className="p-4">
                <div className="font-semibold">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.rooms} rooms</div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="font-semibold">{p.occ}% occ</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700"><DollarSign className="h-3 w-3" />{p.rev}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 flex flex-col items-center justify-center text-center bg-muted/50 rounded-2xl border border-dashed border-border">
          <Hotel className="h-8 w-8 text-muted-foreground mb-3" />
          <p className="text-sm font-medium">No properties added yet.</p>
          <button className="mt-4 bg-foreground text-background px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-2 hover:bg-foreground/90 transition-colors">
            <Plus className="h-4 w-4" /> Add property
          </button>
        </div>
      )}
    </div>
  );
}

export default Overview;
