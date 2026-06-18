import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard, Calendar, Bed, Users, BarChart3, MessageCircle, Settings, Search, Bell,
  Sparkles, Hotel, Wrench, Boxes, ShoppingBag, UtensilsCrossed, Heart, Bot, PartyPopper,
  Receipt, Wallet, ClipboardList, ShieldCheck, FileText, UserCog, Menu, X, ChevronDown, Globe2,
  Briefcase, BookOpen, Table2, CheckCircle2, Clock, DollarSign, Percent, ThumbsUp, Activity, 
  UserPlus, Clipboard, Smartphone, BellRing, ChefHat, AlertTriangle, Truck, Trash2, QrCode, 
  CreditCard, Banknote, Layers, ArrowUpCircle, Shirt, History, CheckSquare, BadgePercent, SplitSquareHorizontal, ListOrdered,
  PieChart, LineChart, TrendingUp,
  Landmark, ArrowRightLeft, HandCoins, Check, UserCheck
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useSite, type SiteMode } from "../../features/context/SiteContext";

type Item = { icon: any; label: string; to: string; modules: SiteMode[] };
type Group = { title: string; items: Item[] };

const GROUPS: Group[] = [
  // ==========================================
  // HOTEL ERP SIDEBAR (Only visible in 'hotel')
  // ==========================================
  {
    title: "Front Office Management",
    items: [
      { icon: LayoutDashboard, label: "Front Office Dashboard", to: "/dashboard/hotel/frontoffice", modules: ["hotel"] },
      { icon: Calendar, label: "Room Booking Management", to: "/dashboard/hotel/booking", modules: ["hotel"] },
      { icon: CheckCircle2, label: "Check-In / Check-Out", to: "/dashboard/hotel/checkin", modules: ["hotel"] },
      { icon: Calendar, label: "Reservation Calendar", to: "/dashboard/hotel/calendar", modules: ["hotel"] },
      { icon: UserPlus, label: "Walk-in Guest Management", to: "/dashboard/hotel/walkin", modules: ["hotel"] },
      { icon: Users, label: "Group Booking Management", to: "/dashboard/hotel/group-booking", modules: ["hotel"] },
      { icon: Activity, label: "Room Availability Tracker", to: "/dashboard/hotel/availability", modules: ["hotel"] },
      { icon: History, label: "Guest History & Profiles", to: "/dashboard/hotel/history", modules: ["hotel"] },
    ],
  },
  {
    title: "Room Management",
    items: [
      { icon: Bed, label: "Room Status", to: "/dashboard/hotel/rooms", modules: ["hotel"] },
      { icon: Layers, label: "Room Categories", to: "/dashboard/hotel/categories", modules: ["hotel"] },
      { icon: DollarSign, label: "Room Pricing Management", to: "/dashboard/hotel/pricing", modules: ["hotel"] },
      { icon: Sparkles, label: "Dynamic Pricing", to: "/dashboard/hotel/dynamic-pricing", modules: ["hotel"] },
      { icon: ArrowUpCircle, label: "Room Upgrade Management", to: "/dashboard/hotel/upgrades", modules: ["hotel"] },
    ],
  },
  {
    title: "Housekeeping",
    items: [
      { icon: Clock, label: "Cleaning Schedule", to: "/dashboard/hotel/housekeeping", modules: ["hotel"] },
      { icon: Users, label: "Staff Assignment", to: "/dashboard/hotel/housekeeping-staff", modules: ["hotel"] },
      { icon: Clipboard, label: "Room Inspection Reports", to: "/dashboard/hotel/inspections", modules: ["hotel"] },
      { icon: Shirt, label: "Laundry Management", to: "/dashboard/hotel/laundry", modules: ["hotel"] },
    ],
  },
  {
    title: "Billing & Payments",
    items: [
      { icon: FileText, label: "Invoice Generation", to: "/dashboard/hotel/invoices", modules: ["hotel"] },
      { icon: Receipt, label: "GST Billing", to: "/dashboard/hotel/gst", modules: ["hotel"] },
      { icon: CreditCard, label: "Online Payment Tracking", to: "/dashboard/hotel/payments", modules: ["hotel"] },
      { icon: Wallet, label: "Refund Management", to: "/dashboard/hotel/refunds", modules: ["hotel"] },
      { icon: AlertTriangle, label: "Outstanding Dues", to: "/dashboard/hotel/dues", modules: ["hotel"] },
    ],
  },
  {
    title: "Guest Management",
    items: [
      { icon: Users, label: "Guest Database", to: "/dashboard/hotel/guests", modules: ["hotel"] },
      { icon: Heart, label: "Loyalty Program", to: "/dashboard/hotel/loyalty", modules: ["hotel"] },
      { icon: MessageCircle, label: "Guest Feedback", to: "/dashboard/hotel/feedback", modules: ["hotel"] },
      { icon: BellRing, label: "Special Requests Management", to: "/dashboard/hotel/requests", modules: ["hotel"] },
    ],
  },
  {
    title: "Reports & Analytics",
    items: [
      { icon: PieChart, label: "Occupancy Rate", to: "/dashboard/hotel/reports/occupancy", modules: ["hotel"] },
      { icon: BarChart3, label: "Revenue Reports", to: "/dashboard/hotel/reports/revenue", modules: ["hotel"] },
      { icon: DollarSign, label: "Average Room Rate (ARR)", to: "/dashboard/hotel/reports/arr", modules: ["hotel"] },
      { icon: TrendingUp, label: "RevPAR", to: "/dashboard/hotel/reports/revpar", modules: ["hotel"] },
      { icon: LineChart, label: "Monthly Profit Reports", to: "/dashboard/hotel/reports/profit", modules: ["hotel"] },
    ],
  },
  {
    title: "Staff Management",
    items: [
      { icon: ClipboardList, label: "Employee Attendance", to: "/dashboard/hotel/staff/attendance", modules: ["hotel"] },
      { icon: Banknote, label: "Payroll", to: "/dashboard/hotel/staff/payroll", modules: ["hotel"] },
      { icon: Clock, label: "Shift Scheduling", to: "/dashboard/hotel/staff/shifts", modules: ["hotel"] },
      { icon: CheckSquare, label: "Task Management", to: "/dashboard/hotel/staff/tasks", modules: ["hotel"] },
    ],
  },

  // ==========================================
  // RESTAURANT ERP SIDEBAR (Only visible in 'restaurant')
  // ==========================================
  {
    title: "Order Management",
    items: [
      { icon: UtensilsCrossed, label: "Dine-In Orders", to: "/dashboard/restaurant/dinein", modules: ["restaurant"] },
      { icon: ShoppingBag, label: "Takeaway Orders", to: "/dashboard/restaurant/takeaway", modules: ["restaurant"] },
      { icon: Smartphone, label: "Online Orders", to: "/dashboard/restaurant/online", modules: ["restaurant"] },
      { icon: QrCode, label: "QR Menu Ordering", to: "/dashboard/restaurant/qr", modules: ["restaurant"] },
      { icon: Table2, label: "Table-wise Orders", to: "/dashboard/restaurant/table-orders", modules: ["restaurant"] },
    ],
  },
  {
    title: "Table Management",
    items: [
      { icon: Table2, label: "Table Availability", to: "/dashboard/restaurant/tables", modules: ["restaurant"] },
      { icon: Calendar, label: "Reservation Management", to: "/dashboard/restaurant/reservations", modules: ["restaurant"] },
      { icon: Clock, label: "Waiting List Management", to: "/dashboard/restaurant/waiting", modules: ["restaurant"] },
      { icon: CheckCircle2, label: "Table Assignment", to: "/dashboard/restaurant/assignment", modules: ["restaurant"] },
    ],
  },
  {
    title: "Kitchen Management",
    items: [
      { icon: Activity, label: "Kitchen Display System (KDS)", to: "/dashboard/restaurant/kitchen", modules: ["restaurant"] },
      { icon: ListOrdered, label: "Order Queue", to: "/dashboard/restaurant/queue", modules: ["restaurant"] },
      { icon: Clock, label: "Food Preparation Tracking", to: "/dashboard/restaurant/prep", modules: ["restaurant"] },
      { icon: ChefHat, label: "Chef Task Management", to: "/dashboard/restaurant/chef", modules: ["restaurant"] },
    ],
  },
  {
    title: "Menu Management",
    items: [
      { icon: BookOpen, label: "Menu Categories", to: "/dashboard/restaurant/menu", modules: ["restaurant"] },
      { icon: CheckSquare, label: "Item Availability", to: "/dashboard/restaurant/item-status", modules: ["restaurant"] },
      { icon: Layers, label: "Combo Management", to: "/dashboard/restaurant/combos", modules: ["restaurant"] },
      { icon: DollarSign, label: "Price Management", to: "/dashboard/restaurant/prices", modules: ["restaurant"] },
    ],
  },
  {
    title: "Inventory Management",
    items: [
      { icon: Boxes, label: "Raw Material Tracking", to: "/dashboard/restaurant/raw-materials", modules: ["restaurant"] },
      { icon: AlertTriangle, label: "Stock Alerts", to: "/dashboard/restaurant/stock-alerts", modules: ["restaurant"] },
      { icon: ClipboardList, label: "Purchase Orders", to: "/dashboard/restaurant/po", modules: ["restaurant"] },
      { icon: Truck, label: "Vendor Management", to: "/dashboard/restaurant/vendors", modules: ["restaurant"] },
      { icon: Trash2, label: "Waste Tracking", to: "/dashboard/restaurant/waste", modules: ["restaurant"] },
    ],
  },
  {
    title: "Billing & POS",
    items: [
      { icon: Banknote, label: "POS Billing", to: "/dashboard/restaurant/pos", modules: ["restaurant"] },
      { icon: Receipt, label: "GST Invoices", to: "/dashboard/restaurant/invoices", modules: ["restaurant"] },
      { icon: SplitSquareHorizontal, label: "Split Payments", to: "/dashboard/restaurant/split", modules: ["restaurant"] },
      { icon: CreditCard, label: "Multiple Payment Modes", to: "/dashboard/restaurant/payment-modes", modules: ["restaurant"] },
      { icon: BadgePercent, label: "Discount & Coupons", to: "/dashboard/restaurant/discounts", modules: ["restaurant"] },
    ],
  },
  {
    title: "Customer Management",
    items: [
      { icon: Users, label: "Customer Database", to: "/dashboard/restaurant/customers", modules: ["restaurant"] },
      { icon: Heart, label: "Loyalty Points", to: "/dashboard/restaurant/loyalty", modules: ["restaurant"] },
      { icon: MessageCircle, label: "Feedback Collection", to: "/dashboard/restaurant/feedback", modules: ["restaurant"] },
      { icon: UserPlus, label: "Repeat Customer Tracking", to: "/dashboard/restaurant/repeat", modules: ["restaurant"] },
    ],
  },
  {
    title: "Reports & Analytics",
    items: [
      { icon: TrendingUp, label: "Best Selling Items", to: "/dashboard/restaurant/reports/best-selling", modules: ["restaurant"] },
      { icon: BarChart3, label: "Daily Sales", to: "/dashboard/restaurant/reports/daily", modules: ["restaurant"] },
      { icon: Percent, label: "Profit Margin", to: "/dashboard/restaurant/reports/margin", modules: ["restaurant"] },
      { icon: Clock, label: "Peak Hours Analysis", to: "/dashboard/restaurant/reports/peak", modules: ["restaurant"] },
      { icon: DollarSign, label: "Food Cost Reports", to: "/dashboard/restaurant/reports/food-cost", modules: ["restaurant"] },
    ],
  },

  // ==========================================
  // HYBRID SIDEBAR (Only visible in 'hybrid')
  // ==========================================
  {
    title: "Revenue Section",
    items: [
      { icon: Banknote, label: "Total Revenue Today", to: "/dashboard/hybrid/revenue/today", modules: ["hybrid"] },
      { icon: Hotel, label: "Hotel Revenue", to: "/dashboard/hybrid/revenue/hotel", modules: ["hybrid"] },
      { icon: UtensilsCrossed, label: "Restaurant Revenue", to: "/dashboard/hybrid/revenue/restaurant", modules: ["hybrid"] },
      { icon: BarChart3, label: "Monthly Revenue", to: "/dashboard/hybrid/revenue/monthly", modules: ["hybrid"] },
      { icon: LineChart, label: "Profit Overview", to: "/dashboard/hybrid/revenue/profit", modules: ["hybrid"] },
    ]
  },
  {
    title: "Hotel Section",
    items: [
      { icon: Bed, label: "Occupied Rooms", to: "/dashboard/hybrid/hotel/occupied", modules: ["hybrid"] },
      { icon: CheckSquare, label: "Available Rooms", to: "/dashboard/hybrid/hotel/available", modules: ["hybrid"] },
      { icon: CheckCircle2, label: "Today's Check-Ins", to: "/dashboard/hybrid/hotel/checkins", modules: ["hybrid"] },
      { icon: ArrowRightLeft, label: "Today's Check-Outs", to: "/dashboard/hybrid/hotel/checkouts", modules: ["hybrid"] },
      { icon: Clock, label: "Pending Bookings", to: "/dashboard/hybrid/hotel/pending", modules: ["hybrid"] },
    ]
  },
  {
    title: "Restaurant Section",
    items: [
      { icon: Table2, label: "Active Tables", to: "/dashboard/hybrid/restaurant/tables", modules: ["hybrid"] },
      { icon: Activity, label: "Orders In Progress", to: "/dashboard/hybrid/restaurant/orders", modules: ["hybrid"] },
      { icon: ChefHat, label: "Kitchen Pending Orders", to: "/dashboard/hybrid/restaurant/kitchen", modules: ["hybrid"] },
      { icon: Users, label: "Today's Customers", to: "/dashboard/hybrid/restaurant/customers", modules: ["hybrid"] },
    ]
  },
  {
    title: "Inventory Section",
    items: [
      { icon: AlertTriangle, label: "Low Stock Alerts", to: "/dashboard/hybrid/inventory/alerts", modules: ["hybrid"] },
      { icon: DollarSign, label: "Inventory Value", to: "/dashboard/hybrid/inventory/value", modules: ["hybrid"] },
      { icon: ClipboardList, label: "Purchase Requests", to: "/dashboard/hybrid/inventory/purchases", modules: ["hybrid"] },
    ]
  },
  {
    title: "Staff Section",
    items: [
      { icon: UserCheck, label: "Staff On Duty", to: "/dashboard/hybrid/staff/onduty", modules: ["hybrid"] },
      { icon: ClipboardList, label: "Attendance Summary", to: "/dashboard/hybrid/staff/attendance", modules: ["hybrid"] },
      { icon: Clock, label: "Shift Status", to: "/dashboard/hybrid/staff/shifts", modules: ["hybrid"] },
    ]
  },
  {
    title: "Customer Insights",
    items: [
      { icon: Users, label: "Total Guests", to: "/dashboard/hybrid/customers/total", modules: ["hybrid"] },
      { icon: UserPlus, label: "Repeat Customers", to: "/dashboard/hybrid/customers/repeat", modules: ["hybrid"] },
      { icon: Heart, label: "Loyalty Members", to: "/dashboard/hybrid/customers/loyalty", modules: ["hybrid"] },
      { icon: MessageCircle, label: "Customer Satisfaction Score", to: "/dashboard/hybrid/customers/csat", modules: ["hybrid"] },
    ]
  },
  {
    title: "Financial Section",
    items: [
      { icon: Wallet, label: "Expenses", to: "/dashboard/hybrid/finance/expenses", modules: ["hybrid"] },
      { icon: HandCoins, label: "Income", to: "/dashboard/hybrid/finance/income", modules: ["hybrid"] },
      { icon: TrendingUp, label: "Net Profit", to: "/dashboard/hybrid/finance/profit", modules: ["hybrid"] },
      { icon: Receipt, label: "GST Summary", to: "/dashboard/hybrid/finance/gst", modules: ["hybrid"] },
    ]
  }
];

const ROLES = [
  "Super Admin", "Hotel Owner", "General Manager", "Front Desk", "Housekeeping",
  "Maintenance", "Restaurant", "Finance", "HR", "Employee",
];

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  const { activeSite } = useSite();

  return (
    <nav className="space-y-5">
      {GROUPS.map((g) => {
        // Filter items based on active module
        const visibleItems = g.items.filter((i) => i.modules.includes(activeSite));
        
        if (visibleItems.length === 0) return null;

        return (
          <div key={g.title}>
            <div className="px-3 text-[10px] uppercase tracking-widest text-background/40 mb-1.5">{g.title}</div>
            <div className="space-y-0.5">
              {visibleItems.map((i) => {
                const active = pathname === i.to;
                return (
                  <Link
                    key={i.label}
                    to={i.to}
                    onClick={onNavigate}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition ${
                      active ? "bg-op-purple text-foreground" : "text-background/70 hover:bg-white/5"
                    }`}
                  >
                    <i.icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{i.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );
}



function RoleSwitcher() {
  const [role, setRole] = useState("General Manager");
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 bg-white/5 hover:bg-white/10 rounded-xl px-3 py-2.5 text-xs"
      >
        <span className="text-background/50">Role</span>
        <span className="font-semibold flex items-center gap-1 truncate">
          {role} <ChevronDown className="h-3 w-3" />
        </span>
      </button>
      {open && (
        <div className="absolute bottom-full mb-2 left-0 right-0 bg-foreground border border-white/10 rounded-xl p-1 max-h-64 overflow-auto z-10 shadow-xl">
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => { setRole(r); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-white/10 ${
                r === role ? "text-op-purple" : "text-background/80"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarInner() {
  return (
    <div className="flex flex-col h-full">
      <Link to="/" className="font-display text-2xl px-3 py-4 shrink-0">ManageInn</Link>
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 -mr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <NavList />
      </div>
      <div className="shrink-0 pt-3 space-y-3">

        <RoleSwitcher />
        <div className="bg-white/5 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-xs text-op-purple mb-2">
            <Sparkles className="h-3.5 w-3.5" /> AI Copilot
          </div>
          <p className="text-sm text-background/70">Suggest pricing for next weekend?</p>
          <button className="mt-3 text-xs bg-op-purple text-foreground rounded-full px-3 py-1.5 font-semibold">
            Run suggestion
          </button>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-foreground text-background p-4 h-screen sticky top-0">
      <SidebarInner />
    </aside>
  );
}

function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border flex items-center gap-2 px-3 sm:px-6 py-3">
      <button onClick={onMenu} aria-label="Open menu" className="lg:hidden p-2 rounded-full hover:bg-muted">
        <Menu className="h-5 w-5" />
      </button>
      <div className="flex-1 min-w-0 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Search…"
          className="w-full bg-muted rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/10"
        />
      </div>
      <button className="p-2.5 rounded-full hover:bg-muted relative shrink-0">
        <Bell className="h-4 w-4" />
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-op-orange" />
      </button>
      <div className="h-9 w-9 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-semibold shrink-0">
        RK
      </div>
    </header>
  );
}

export function DashboardShell() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-muted/40 text-foreground flex">
      <Sidebar />
      {open && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute top-0 left-0 h-full w-[84%] max-w-xs bg-foreground text-background p-4 flex flex-col animate-slide-in-right">
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="self-end p-2 rounded-full hover:bg-white/10">
              <X className="h-5 w-5" />
            </button>
            <div className="flex-1 min-h-0">
              <SidebarInner />
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <Topbar onMenu={() => setOpen(true)} />
        <main className="p-4 sm:p-8 space-y-6"><Outlet /></main>
      </div>
    </div>
  );
}

export function PageHeader({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
      <div className="min-w-0">
        {eyebrow && <p className="text-sm text-muted-foreground">{eyebrow}</p>}
        <h1 className="font-display text-3xl sm:text-5xl truncate">{title}</h1>
      </div>
      {action}
    </div>
  );
}

// Reusable card primitives for module pages
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`bg-background rounded-3xl border border-border p-5 sm:p-6 ${className}`}>{children}</div>;
}

export function StatCard({ label, value, delta, accent }: { label: string; value: string; delta?: string; accent?: string }) {
  return (
    <Card className={accent}>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-2 font-display text-3xl sm:text-4xl">{value}</div>
      {delta && <div className="mt-1 text-xs text-foreground/60">{delta}</div>}
    </Card>
  );
}

export function AIInsight({ title, body }: { title: string; body: string }) {
  return (
    <Card className="bg-foreground text-background border-transparent">
      <div className="flex items-center gap-2 text-xs text-op-purple mb-2">
        <Sparkles className="h-3.5 w-3.5" /> AI INSIGHT
      </div>
      <div className="font-display text-xl sm:text-2xl leading-tight">{title}</div>
      <p className="mt-2 text-sm text-background/70">{body}</p>
      <button className="mt-4 bg-op-purple text-foreground rounded-full px-4 py-2 text-xs font-semibold">
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
            {columns.map((c) => <th key={c} className="px-5 py-3 font-medium">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border">
              {r.map((cell, j) => <td key={j} className="px-5 py-3">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
