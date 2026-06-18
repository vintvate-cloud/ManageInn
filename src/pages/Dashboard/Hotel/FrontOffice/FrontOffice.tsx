import React, { useState } from 'react';
import { 
  CalendarCheck, UserPlus, Users, LogOut, ArrowUpRight, 
  ArrowDownRight, BedDouble, UserCheck, CalendarDays, 
  Map, BellRing, UserCircle, Briefcase, CreditCard
} from 'lucide-react';

// Tab components (will be implemented next)
import ReservationTable from './components/ReservationTable';
import ReservationCalendar from './components/ReservationCalendar';
import OperationsPanel from './components/OperationsPanel';
import RoomTracker from './components/RoomTracker';
import GuestProfiles from './components/GuestProfiles';

type Tab = 'reservations' | 'calendar' | 'operations' | 'floormap' | 'guests';

const KPICard = ({ title, value, trend, isPositive, subtitle, icon: Icon }: any) => (
  <div className="bg-background rounded-2xl border border-border p-5 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2.5 bg-muted rounded-xl text-muted-foreground">
        <Icon className="h-5 w-5" />
      </div>
      {trend && (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${isPositive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>
          {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {trend}
        </span>
      )}
    </div>
    <div>
      <h4 className="text-3xl font-display font-semibold text-foreground tracking-tight">{value}</h4>
      <p className="text-sm font-medium text-foreground/80 mt-1">{title}</p>
      {subtitle && <p className="text-xs text-muted-foreground mt-1.5">{subtitle}</p>}
    </div>
  </div>
);

const ActionButton = ({ label, icon: Icon, primary = false }: any) => (
  <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${primary ? 'bg-op-purple text-white shadow-md shadow-op-purple/20 hover:bg-op-purple/90' : 'bg-background border border-border text-foreground hover:bg-muted shadow-sm'}`}>
    <Icon className="h-4 w-4" /> {label}
  </button>
);

export default function FrontOffice() {
  const [activeTab, setActiveTab] = useState<Tab>('reservations');
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-background rounded-3xl p-6 lg:p-8 border border-border shadow-sm">
        <div>
          <span className="text-xs font-semibold tracking-wider text-op-purple uppercase bg-op-purple/10 px-3 py-1 rounded-full">Front Desk Command Center</span>
          <h1 className="text-3xl lg:text-4xl font-display font-semibold mt-4">The Grand Aurora</h1>
          <p className="text-muted-foreground mt-1">{today} • 84% Occupancy</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <ActionButton label="New Booking" icon={CalendarCheck} primary />
          <ActionButton label="Check-In" icon={UserCheck} />
          <ActionButton label="Walk-In" icon={UserPlus} />
          <ActionButton label="Group Reservation" icon={Users} />
          <ActionButton label="Check-Out" icon={LogOut} />
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Today's Arrivals" value="42" trend="+12%" isPositive={true} subtitle="15 already checked in" icon={ArrowDownRight} />
        <KPICard title="Today's Departures" value="28" trend="-5%" isPositive={false} subtitle="10 remaining check-outs" icon={ArrowUpRight} />
        <KPICard title="Occupied Rooms" value="126" trend="84% Occ." isPositive={true} subtitle="Out of 150 total rooms" icon={BedDouble} />
        <KPICard title="Available Rooms" value="24" subtitle="18 clean, 6 cleaning" icon={CalendarCheck} />
      </div>

      {/* Main Content Area */}
      <div className="bg-background rounded-3xl border border-border shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        {/* Tab Navigation */}
        <div className="flex border-b border-border overflow-x-auto custom-scrollbar bg-muted/20">
          <button onClick={() => setActiveTab('reservations')} className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${activeTab === 'reservations' ? 'border-op-purple text-op-purple bg-background' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
            <Briefcase className="h-4 w-4" /> Reservations
          </button>
          <button onClick={() => setActiveTab('calendar')} className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${activeTab === 'calendar' ? 'border-op-purple text-op-purple bg-background' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
            <CalendarDays className="h-4 w-4" /> Calendar
          </button>
          <button onClick={() => setActiveTab('operations')} className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${activeTab === 'operations' ? 'border-op-purple text-op-purple bg-background' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
            <BellRing className="h-4 w-4" /> Walk-ins & Alerts
          </button>
          <button onClick={() => setActiveTab('floormap')} className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${activeTab === 'floormap' ? 'border-op-purple text-op-purple bg-background' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
            <Map className="h-4 w-4" /> Floor Map
          </button>
          <button onClick={() => setActiveTab('guests')} className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${activeTab === 'guests' ? 'border-op-purple text-op-purple bg-background' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
            <UserCircle className="h-4 w-4" /> Guest Profiles
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-6 lg:p-8 bg-muted/10">
          {activeTab === 'reservations' && <ReservationTable />}
          {activeTab === 'calendar' && <ReservationCalendar />}
          {activeTab === 'operations' && <OperationsPanel />}
          {activeTab === 'floormap' && <RoomTracker />}
          {activeTab === 'guests' && <GuestProfiles />}
        </div>
      </div>
    </div>
  );
}
