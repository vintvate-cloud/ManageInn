import React from 'react';
import { Search, Star, MessageSquare, Clock, MapPin, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';

const GUESTS = [
  { id: 'GST-001', name: 'Eleanor Vance', status: 'In-House', loyalty: 'Platinum', stays: 14, spent: '$12,450', room: '202', phone: '+1 (555) 019-2834', email: 'eleanor.v@example.com', location: 'New York, USA' },
  { id: 'GST-002', name: 'David Patel', status: 'Arriving', loyalty: 'Gold', stays: 8, spent: '$5,200', room: '301', phone: '+44 7700 900077', email: 'd.patel@example.com', location: 'London, UK' },
  { id: 'GST-003', name: 'Sarah Connor', status: 'Reserved', loyalty: 'Silver', stays: 3, spent: '$1,850', room: 'TBD', phone: '+1 (555) 834-9021', email: 's.connor@example.com', location: 'Los Angeles, USA' },
];

export default function GuestProfiles() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-display font-semibold">Guest History & Profiles</h2>
          <p className="text-sm text-muted-foreground">Comprehensive records, loyalty status, and preferences.</p>
        </div>
        
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by name, phone, or email..." 
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:border-op-purple transition-colors shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Guest List */}
        <div className="xl:col-span-1 space-y-3">
          {GUESTS.map((guest, idx) => (
            <div key={guest.id} className={`p-4 rounded-xl border cursor-pointer transition-all ${idx === 0 ? 'bg-op-purple/5 border-op-purple shadow-sm ring-1 ring-op-purple/20' : 'bg-background border-border hover:bg-muted/50'}`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-display font-bold text-lg text-foreground">
                    {guest.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{guest.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Award className={`h-3 w-3 ${guest.loyalty === 'Platinum' ? 'text-purple-500' : guest.loyalty === 'Gold' ? 'text-yellow-500' : 'text-slate-400'}`} />
                      {guest.loyalty} Member
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs">
                <span className={`px-2 py-0.5 rounded-full font-semibold ${guest.status === 'In-House' ? 'bg-emerald-500/10 text-emerald-600' : guest.status === 'Arriving' ? 'bg-blue-500/10 text-blue-600' : 'bg-orange-500/10 text-orange-600'}`}>
                  {guest.status}
                </span>
                <span className="text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {guest.stays} Stays</span>
              </div>
            </div>
          ))}
        </div>

        {/* Guest Detail View */}
        <div className="xl:col-span-2 bg-background rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
          {/* Header */}
          <div className="p-6 border-b border-border bg-gradient-to-r from-op-purple/10 to-background flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="h-20 w-20 rounded-full bg-op-purple text-white flex items-center justify-center font-display font-bold text-3xl shadow-md shrink-0">
              E
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-display font-bold text-foreground">Eleanor Vance</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 border border-purple-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" /> Platinum
                </span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mt-3">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> New York, USA</span>
                <span className="flex items-center gap-1.5"><Phone className="h-4 w-4" /> +1 (555) 019-2834</span>
                <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> eleanor.v@example.com</span>
              </div>
            </div>
            <button className="px-4 py-2 bg-foreground text-background text-sm font-semibold rounded-xl shadow-sm hover:bg-foreground/90 shrink-0">
              Edit Profile
            </button>
          </div>

          <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Col */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Stay Statistics</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-muted/30 border border-border rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">Total Stays</p>
                    <p className="text-2xl font-display font-semibold">14</p>
                  </div>
                  <div className="p-4 bg-muted/30 border border-border rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">Lifetime Value</p>
                    <p className="text-2xl font-display font-semibold text-emerald-600">$12,450</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Preferences</h4>
                <div className="flex flex-wrap gap-2">
                  {['High Floor', 'Extra Pillows', 'Late Check-out', 'Allergic to Peanuts', 'Morning Newspaper'].map(pref => (
                    <span key={pref} className="px-3 py-1 bg-background border border-border rounded-lg text-sm flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-op-purple" /> {pref}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Recent Notes</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <p className="text-sm font-medium text-foreground">Requested Champagne on arrival</p>
                    <p className="text-xs text-muted-foreground mt-1">Added by Front Desk • Today at 10:45 AM</p>
                  </div>
                  <div className="p-3 bg-muted/30 border border-border rounded-xl">
                    <p className="text-sm font-medium text-foreground">Complained about AC noise in room 402</p>
                    <p className="text-xs text-muted-foreground mt-1">Added by Manager • Oct 15, 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
