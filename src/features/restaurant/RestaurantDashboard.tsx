import React from 'react';
import {
  UtensilsCrossed, Table2, Activity, BookOpen, Boxes, Banknote, Users, BarChart3,
  Clock, ChefHat, Smartphone, QrCode, ShoppingBag, ListOrdered, Layers, AlertTriangle,
  ClipboardList, Truck, Trash2, Receipt, SplitSquareHorizontal, CreditCard, BadgePercent,
  Heart, MessageCircle, UserPlus, TrendingUp, Percent, DollarSign
} from 'lucide-react';
import { PageHeader } from '../../components/ui/dashboard-shell';

export default function RestaurantDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Restaurant Operations View"
        title="Restaurant Dashboard 🍽️"
        action={
          <div className="flex gap-2">
            <button className="bg-op-orange text-foreground rounded-full px-5 py-2.5 text-sm font-semibold">
              New POS Order
            </button>
          </div>
        }
      />

      {/* ORDER & TABLE MANAGEMENT */}
      <div className="grid lg:grid-cols-2 gap-8">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <UtensilsCrossed className="h-5 w-5 text-op-orange" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Order Management</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-op-orange/10 border border-op-orange/20 rounded-2xl p-4">
              <div className="text-xs text-op-orange font-medium">Dine-In Orders</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Takeaway Orders</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Online Orders</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">QR Menu Ordering</div>
              <div className="text-2xl font-display mt-1 text-emerald-500">0</div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Table2 className="h-5 w-5 text-emerald-500" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Table Management</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Table Availability</div>
              <div className="text-2xl font-display mt-1">0/0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Upcoming Reservations</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex flex-col justify-center">
              <div className="text-xs text-muted-foreground">Waiting List</div>
              <div className="text-xl font-display mt-1 text-rose-500">0 Waiting</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex flex-col justify-center">
              <div className="text-xs text-muted-foreground">Table Assignment</div>
              <div className="text-sm font-semibold mt-1 text-op-purple">Active</div>
            </div>
          </div>
        </section>
      </div>

      {/* KITCHEN & MENU MANAGEMENT */}
      <div className="grid lg:grid-cols-2 gap-8">
        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Kitchen Management</h3>
          <div className="space-y-3">
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">KDS Active Orders</div>
              <div className="text-xl font-bold">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">Order Queue Depth</div>
              <div className="text-xl font-bold">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">Food Prep Tracking</div>
              <div className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-md">Optimal time</div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Menu Management</h3>
          <div className="space-y-3">
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">Active Menu Categories</div>
              <div className="text-xl font-bold">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">Out of Stock Items</div>
              <div className="text-xl font-bold text-rose-500">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">Combo Performance</div>
              <div className="text-xs px-2 py-1 bg-op-purple/10 text-op-purple rounded-md">Monitoring</div>
            </div>
          </div>
        </section>
      </div>

      {/* INVENTORY & BILLING */}
      <div className="grid lg:grid-cols-2 gap-8">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Boxes className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Inventory Tracking</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Raw Material Tracking</div>
              <div className="text-2xl font-display mt-1">Active</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-rose-500 font-medium">Stock Alerts</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Purchase Orders</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Waste Tracking</div>
              <div className="text-2xl font-display mt-1">0%</div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Banknote className="h-5 w-5 text-emerald-500" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Billing & POS</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm text-emerald-500 font-medium">POS Billing Total</div>
              <div className="text-2xl font-display text-emerald-500">₹0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">GST Collected</div>
              <div className="text-2xl font-display mt-1">₹0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Split Payments</div>
              <div className="text-2xl font-display mt-1">0</div>
            </div>
          </div>
        </section>
      </div>

      {/* CUSTOMERS & REPORTS */}
      <div className="grid lg:grid-cols-2 gap-8">
        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Customer Management</h3>
          <div className="space-y-3">
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">Total Customer Database</div>
              <div className="text-xl font-bold">0</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">Loyalty Points Issued</div>
              <div className="text-xl font-bold">0 pts</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 flex justify-between items-center">
              <div className="text-sm font-medium">Repeat Customers Today</div>
              <div className="text-xl font-bold text-op-orange">0</div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Reports & Analytics</h3>
          <div className="bg-card border border-border rounded-3xl p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Daily Sales Volume</span>
                <span className="font-semibold text-emerald-500">₹0</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Profit Margin Estimate</span>
                <span className="font-semibold">0%</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Peak Hours Analysis</span>
                <span className="font-semibold">N/A</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm text-muted-foreground">Food Cost Report</span>
                <span className="font-semibold text-op-purple">Pending</span>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
