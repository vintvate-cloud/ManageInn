import React from 'react';
import { PageHeader, Card, SimpleTable, StatCard } from '../../components/ui/dashboard-shell';
import { Plus, Download, Filter, Search, MoreHorizontal, Edit, Trash2, BarChart3 } from 'lucide-react';

export default function HotelReportsRevenuePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Revenue Reports" 
        eyebrow="Reports & Analytics > Revenue"
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
        <StatCard label="MTD Revenue" value="$84,500" delta="+12%" />
        <StatCard label="Room Revenue" value="$62,000" delta="73% of total" />
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
          columns={['Date', 'Room Rev', 'F&B Rev', 'Other Rev', 'Total Rev', 'Actions']}
          rows={[
      ['Today', '$4,200', '$1,100', '$300', '$5,600', <ActionButtons />],
      ['Yesterday', '$3,800', '$950', '$200', '$4,950', <ActionButtons />],
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
