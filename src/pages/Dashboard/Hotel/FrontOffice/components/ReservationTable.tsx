import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Download, Eye, Edit, Trash, Calendar, CheckCircle2, Clock, XCircle, CreditCard, Building } from 'lucide-react';

const MOCK_RESERVATIONS = [
  { id: 'RES-001', guest: 'Eleanor Vance', roomType: 'Deluxe Suite', checkIn: '2023-10-25', checkOut: '2023-10-28', guests: 2, source: 'Direct', payment: 'Paid', status: 'Confirmed' },
  { id: 'RES-002', guest: 'Jackson Miller', roomType: 'Standard King', checkIn: '2023-10-25', checkOut: '2023-10-27', guests: 1, source: 'Booking.com', payment: 'Pending', status: 'Checked-In' },
  { id: 'RES-003', guest: 'Sarah Connor', roomType: 'Presidential', checkIn: '2023-10-26', checkOut: '2023-10-30', guests: 4, source: 'Expedia', payment: 'Paid', status: 'Confirmed' },
  { id: 'RES-004', guest: 'Michael Chang', roomType: 'Standard Twin', checkIn: '2023-10-24', checkOut: '2023-10-26', guests: 2, source: 'Direct', payment: 'Refunded', status: 'Cancelled' },
  { id: 'RES-005', guest: 'Emma Watson', roomType: 'Ocean View', checkIn: '2023-10-25', checkOut: '2023-11-02', guests: 2, source: 'Direct', payment: 'Paid', status: 'Checked-In' },
  { id: 'RES-006', guest: 'David Patel', roomType: 'Deluxe Suite', checkIn: '2023-10-28', checkOut: '2023-10-31', guests: 3, source: 'Airbnb', payment: 'Pending', status: 'Pending' },
  { id: 'RES-007', guest: 'Olivia Smith', roomType: 'Standard King', checkIn: '2023-10-23', checkOut: '2023-10-25', guests: 2, source: 'Direct', payment: 'Paid', status: 'Completed' },
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Confirmed': 'bg-blue-500/10 text-blue-600',
    'Checked-In': 'bg-emerald-500/10 text-emerald-600',
    'Pending': 'bg-orange-500/10 text-orange-600',
    'Cancelled': 'bg-red-500/10 text-red-600',
    'Completed': 'bg-slate-500/10 text-slate-600',
  };
  const icon = status === 'Checked-In' || status === 'Completed' ? <CheckCircle2 className="h-3 w-3" /> : 
               status === 'Pending' ? <Clock className="h-3 w-3" /> : 
               status === 'Cancelled' ? <XCircle className="h-3 w-3" /> : 
               <Calendar className="h-3 w-3" />;
               
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {icon} {status}
    </span>
  );
};

const PaymentBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Paid': 'bg-emerald-500/10 text-emerald-600',
    'Pending': 'bg-orange-500/10 text-orange-600',
    'Refunded': 'bg-slate-500/10 text-slate-600',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      <CreditCard className="h-3 w-3" /> {status}
    </span>
  );
};

export default function ReservationTable() {
  const [search, setSearch] = useState('');
  
  // Basic filter for mockup
  const filtered = MOCK_RESERVATIONS.filter(r => 
    r.guest.toLowerCase().includes(search.toLowerCase()) || 
    r.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-display font-semibold">Reservation Management</h2>
          <p className="text-sm text-muted-foreground">Manage all current, upcoming, and past bookings.</p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search guest or ID..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-background border border-border rounded-lg outline-none focus:border-op-purple transition-colors shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted shadow-sm transition-colors">
            <Filter className="h-4 w-4" /> Filters
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted shadow-sm transition-colors">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      {/* Advanced Filters Bar */}
      <div className="flex flex-wrap gap-2">
        {['All Bookings', 'Checked-In', 'Confirmed', 'Pending', 'Cancelled'].map(f => (
          <button key={f} className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${f === 'All Bookings' ? 'bg-op-purple text-white border-op-purple' : 'bg-background text-muted-foreground border-border hover:bg-muted'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Data Table */}
      <div className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold">Booking ID</th>
                <th className="px-6 py-4 font-semibold">Guest Name</th>
                <th className="px-6 py-4 font-semibold">Room Type</th>
                <th className="px-6 py-4 font-semibold">Dates</th>
                <th className="px-6 py-4 font-semibold">Source</th>
                <th className="px-6 py-4 font-semibold">Payment</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((res) => (
                <tr key={res.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{res.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-op-purple/10 text-op-purple flex items-center justify-center font-bold text-xs">
                        {res.guest.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{res.guest}</p>
                        <p className="text-xs text-muted-foreground">{res.guests} Guests</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground/80">{res.roomType}</td>
                  <td className="px-6 py-4">
                    <p className="text-foreground">{res.checkIn}</p>
                    <p className="text-xs text-muted-foreground">to {res.checkOut}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Building className="h-3 w-3" /> {res.source}
                    </span>
                  </td>
                  <td className="px-6 py-4"><PaymentBadge status={res.payment} /></td>
                  <td className="px-6 py-4"><StatusBadge status={res.status} /></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-muted-foreground hover:text-op-purple hover:bg-op-purple/10 rounded-md transition-colors"><Eye className="h-4 w-4" /></button>
                      <button className="p-1.5 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-md transition-colors"><Edit className="h-4 w-4" /></button>
                      <button className="p-1.5 text-muted-foreground hover:text-foreground rounded-md transition-colors"><MoreVertical className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground bg-muted/20">
          <span>Showing 1 to {filtered.length} of 142 entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-border rounded-md hover:bg-background bg-muted text-muted-foreground/50 cursor-not-allowed">Prev</button>
            <button className="px-3 py-1 border border-border rounded-md bg-op-purple text-white">1</button>
            <button className="px-3 py-1 border border-border rounded-md hover:bg-background bg-background">2</button>
            <button className="px-3 py-1 border border-border rounded-md hover:bg-background bg-background">3</button>
            <button className="px-3 py-1 border border-border rounded-md hover:bg-background bg-background">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
