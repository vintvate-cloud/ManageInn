import React from 'react';
import { UserPlus, BellRing, AlertCircle, Clock, CreditCard, ChevronRight } from 'lucide-react';

const NOTIFICATIONS = [
  { id: 1, type: 'alert', title: 'Late Check-out Request', desc: 'Room 204 requested late check-out at 2:00 PM', time: '10 mins ago', icon: Clock },
  { id: 2, type: 'warning', title: 'Payment Failed', desc: 'Auto-charge failed for Room 301. Card declined.', time: '25 mins ago', icon: CreditCard },
  { id: 3, type: 'info', title: 'VIP Arrival', desc: 'Mr. David Patel arriving in 1 hour. Prep Room 301.', time: '1 hr ago', icon: AlertCircle },
];

export default function OperationsPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Walk-in Registration */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-display font-semibold flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-op-purple" /> Fast Walk-In Registration
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Quickly onboard guests arriving without a reservation.</p>
        </div>

        <div className="bg-background rounded-2xl border border-border p-6 shadow-sm space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground mb-1 block">First Name</span>
              <input type="text" className="w-full p-2.5 bg-muted/50 border border-border rounded-lg text-sm outline-none focus:border-op-purple" placeholder="John" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground mb-1 block">Last Name</span>
              <input type="text" className="w-full p-2.5 bg-muted/50 border border-border rounded-lg text-sm outline-none focus:border-op-purple" placeholder="Doe" />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground mb-1 block">Phone Number</span>
              <input type="tel" className="w-full p-2.5 bg-muted/50 border border-border rounded-lg text-sm outline-none focus:border-op-purple" placeholder="+1..." />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground mb-1 block">ID Verification</span>
              <select className="w-full p-2.5 bg-muted/50 border border-border rounded-lg text-sm outline-none focus:border-op-purple">
                <option>Passport</option>
                <option>Driver's License</option>
                <option>National ID</option>
              </select>
            </label>
          </div>

          <div className="border-t border-border pt-5">
            <h3 className="text-sm font-semibold mb-3">Room Selection</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs font-semibold text-muted-foreground mb-1 block">Room Category</span>
                <select className="w-full p-2.5 bg-muted/50 border border-border rounded-lg text-sm outline-none focus:border-op-purple">
                  <option>Standard King (2 Available)</option>
                  <option>Deluxe Suite (1 Available)</option>
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-muted-foreground mb-1 block">Duration (Nights)</span>
                <input type="number" defaultValue="1" className="w-full p-2.5 bg-muted/50 border border-border rounded-lg text-sm outline-none focus:border-op-purple" />
              </label>
            </div>
          </div>

          <button className="w-full bg-op-purple text-white font-semibold py-3 rounded-xl mt-4 hover:bg-op-purple/90 transition-colors shadow-md shadow-op-purple/20">
            Process Walk-in & Generate Key
          </button>
        </div>
      </div>

      {/* Notification Center */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-display font-semibold flex items-center gap-2">
            <BellRing className="h-5 w-5 text-op-purple" /> Notification Center
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Real-time alerts for front desk staff.</p>
        </div>

        <div className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="flex border-b border-border text-sm font-semibold">
            <button className="flex-1 py-3 text-center border-b-2 border-op-purple text-op-purple bg-op-purple/5">Action Required</button>
            <button className="flex-1 py-3 text-center border-b-2 border-transparent text-muted-foreground hover:bg-muted/50">System Logs</button>
          </div>
          
          <div className="p-4 space-y-3">
            {NOTIFICATIONS.map(n => (
              <div key={n.id} className="flex gap-4 p-4 rounded-xl border border-border bg-muted/20 hover:bg-muted/50 transition-colors cursor-pointer group">
                <div className={`mt-1 p-2 rounded-full h-fit ${n.type === 'alert' ? 'bg-orange-500/10 text-orange-600' : n.type === 'warning' ? 'bg-red-500/10 text-red-600' : 'bg-blue-500/10 text-blue-600'}`}>
                  <n.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-foreground">{n.title}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{n.desc}</p>
                </div>
                <div className="flex items-center text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="h-5 w-5" />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border text-center">
            <button className="text-sm text-op-purple font-semibold hover:underline">View All Notifications</button>
          </div>
        </div>
      </div>
    </div>
  );
}
