import React from 'react';
import { PageHeader, Card, SimpleTable, StatCard } from '../../components/ui/dashboard-shell';
import { Plus, Download, Filter, Search, MoreHorizontal, Edit, Trash2, CreditCard } from 'lucide-react';

export default function HotelPaymentsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Payment Tracking" 
        eyebrow="Billing & Payments > Payments"
        action={
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-background border border-border rounded-xl text-sm font-semibold hover:bg-muted flex items-center gap-2">
              <Download className="h-4 w-4" /> Export
            </button>
            <button className="px-4 py-2 bg-op-purple text-foreground rounded-xl text-sm font-semibold hover:bg-op-purple/90 flex items-center gap-2 shadow-lg shadow-op-purple/20">
              <Plus className="h-4 w-4" /> Add New
            </button>
          </div>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Card Payments" value="$4,200" delta="Today" />
        <StatCard label="Cash/UPI" value="$850" delta="Today" />
      </div>
      
      <Card className="p-0 overflow-hidden border-border">
        <div className="p-4 border-b border-border flex flex-wrap gap-4 justify-between items-center bg-muted/20">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input placeholder="Search records..." className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-op-purple transition-colors" />
          </div>
          <button className="px-3 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>
        
        <SimpleTable 
          columns={['Transaction ID', 'Guest', 'Amount', 'Method', 'Time', 'Actions']}
          rows={[
      ['TXN-4482', 'John Smith', '$450.00', 'Credit Card (Visa)', '10:45 AM', <ActionButtons />],
      ['TXN-4483', 'Sarah Lee', '$120.00', 'UPI', '11:15 AM', <ActionButtons />],
    ]}
        />
        
        <div className="p-4 border-t border-border flex justify-between items-center text-sm text-muted-foreground bg-muted/10">
          <div>Showing 1 to 2 of 48 results</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-border rounded hover:bg-muted disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-border bg-op-purple text-foreground rounded">1</button>
            <button className="px-3 py-1 border border-border rounded hover:bg-muted">2</button>
            <button className="px-3 py-1 border border-border rounded hover:bg-muted">Next</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <button className="p-1.5 hover:bg-muted rounded-md hover:text-foreground transition-colors" title="Edit"><Edit className="h-4 w-4" /></button>
      <button className="p-1.5 hover:bg-red-500/10 rounded-md hover:text-red-500 transition-colors" title="Delete"><Trash2 className="h-4 w-4" /></button>
      <button className="p-1.5 hover:bg-muted rounded-md hover:text-foreground transition-colors"><MoreHorizontal className="h-4 w-4" /></button>
    </div>
  );
}
