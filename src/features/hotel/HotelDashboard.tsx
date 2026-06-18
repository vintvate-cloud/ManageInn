import React from 'react'
import { useHotelStore } from '../../store'
import { useAuth } from '../../features/auth/AuthContext'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts'
import { BedDouble, Users, DollarSign, AlertCircle, TrendingUp, CalendarCheck } from 'lucide-react'
import { format, differenceInDays } from 'date-fns'
import { PageHeader, Card, StatCard, SimpleTable, AIInsight } from '../../components/ui/DashboardPrimitives'
import { Link } from 'react-router-dom'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-xl p-3 shadow-lg">
        <div className="text-xs text-muted-foreground mb-1">{label}</div>
        <div className="text-base font-bold text-op-purple">
          {payload[0].name === 'revenue' ? `₹${payload[0].value.toLocaleString()}` : `${payload[0].value}%`}
        </div>
      </div>
    )
  }
  return null
}

export default function HotelDashboard() {
  const { profile } = useAuth()
  const { rooms, bookings, transactions } = useHotelStore()

  const totalRooms = rooms.length
  const bookedRooms = rooms.filter(r => r.status === 'booked').length
  const availableRooms = rooms.filter(r => r.status === 'available').length
  const maintenanceRooms = rooms.filter(r => r.status === 'maintenance' || r.status === 'cleaning').length
  const occupancyRate = totalRooms > 0 ? Math.round((bookedRooms / totalRooms) * 100) : 0

  const todayStr = format(new Date(), 'yyyy-MM-dd')
  const todayRevenue = transactions.filter(t => t.type === 'income' && t.created_at.startsWith(todayStr)).reduce((s, t) => s + t.amount, 0)
  const totalRevenue = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const pendingPayments = bookings.filter(b => b.paid_amount < b.total_amount && b.status !== 'cancelled')
  const pendingAmount = pendingPayments.reduce((s, b) => s + (b.total_amount - b.paid_amount), 0)

  const activeBookings = bookings.filter(b => b.status === 'checked-in')
  const todayCheckouts = bookings.filter(b => b.status === 'checked-in' && b.check_out === todayStr)
  const upcomingBookings = bookings.filter(b => b.status === 'confirmed')

  const REVENUE_DATA = [{ day: 'Today', revenue: todayRevenue }]
  const OCCUPANCY_DATA = [{ month: format(new Date(), 'MMM'), rate: occupancyRate }]

  const STATS = [
    { label: 'Occupancy Rate', value: `${occupancyRate}%`, sub: `${bookedRooms} of ${totalRooms} rooms`, icon: BedDouble, accent: "bg-op-purple text-foreground border-transparent" },
    { label: "Today's Revenue", value: `₹${todayRevenue.toLocaleString()}`, sub: 'Updated just now', icon: DollarSign },
    { label: 'Active Guests', value: String(activeBookings.length), sub: `${todayCheckouts.length} checking out today`, icon: Users },
    { label: 'Pending Payments', value: `₹${pendingAmount.toLocaleString()}`, sub: `${pendingPayments.length} bookings`, icon: AlertCircle, accent: "border-op-orange/30 bg-op-orange/5" },
  ]

  const recentBookingsRows = bookings.slice(0, 5).map(b => [
    <div key={`guest-${b.id}`}>
      <div className="font-semibold">{b.guest?.name ?? '—'}</div>
      <div className="text-xs text-muted-foreground">{b.type}</div>
    </div>,
    `Room ${b.room?.number ?? '—'}`,
    <div key={`dates-${b.id}`} className="text-sm">
      {b.check_in} → {b.check_out}
      <div className="text-xs text-muted-foreground">{differenceInDays(new Date(b.check_out), new Date(b.check_in))} nights</div>
    </div>,
    <div key={`amount-${b.id}`}>
      <div>₹{b.total_amount.toLocaleString()}</div>
      {b.paid_amount < b.total_amount && <div className="text-xs text-op-orange">₹{(b.total_amount - b.paid_amount).toLocaleString()} due</div>}
    </div>,
    <span key={`status-${b.id}`} className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium uppercase
      ${b.status === 'checked-in' ? 'bg-op-purple/10 text-op-purple' : 
        b.status === 'confirmed' ? 'bg-blue-500/10 text-blue-500' :
        b.status === 'cancelled' ? 'bg-red-500/10 text-red-500' :
        'bg-green-500/10 text-green-500'}`}>
      {b.status.replace('-', ' ')}
    </span>
  ])

  return (
    <div className="space-y-6">
      <PageHeader 
        eyebrow={`${format(new Date(), 'EEEE, do MMMM yyyy')} · Hotel Overview`} 
        title={`Good morning, ${profile?.name?.split(' ')[0]} 👋`} 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {STATS.map((s, i) => (
          <StatCard key={i} label={s.label} value={s.value} delta={s.sub} accent={s.accent} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold text-lg">Revenue Overview</h3>
                <p className="text-sm text-muted-foreground">Daily earnings overview</p>
              </div>
              <div className="text-2xl font-bold text-op-purple">₹{totalRevenue.toLocaleString()}</div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--op-purple))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--op-purple))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} dx={-10} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--op-purple))" strokeWidth={3} fill="url(#revenueGrad)" name="revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div>
          <AIInsight 
            title="Optimize Pricing" 
            body="Based on local events, we suggest increasing weekend rates for Delux rooms by 15%." 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <Card className="xl:col-span-1">
          <div className="mb-4">
            <h3 className="font-bold text-lg">Room Status</h3>
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground"><div className="w-2 h-2 rounded-full bg-green-500" /> Available ({availableRooms})</div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground"><div className="w-2 h-2 rounded-full bg-op-purple" /> Booked ({bookedRooms})</div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground"><div className="w-2 h-2 rounded-full bg-op-orange" /> Unavailable ({maintenanceRooms})</div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {rooms.map(r => (
              <div 
                key={r.id} 
                className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-semibold border ${
                  r.status === 'available' ? 'bg-green-500/10 border-green-500/20 text-green-600' :
                  r.status === 'booked' ? 'bg-op-purple/10 border-op-purple/20 text-op-purple' :
                  'bg-op-orange/10 border-op-orange/20 text-op-orange'
                }`}
                title={`Room ${r.number} — ${r.status}`}
              >
                <span>{r.number}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="xl:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Recent Bookings</h3>
            <Link to="/hotel/bookings" className="text-sm text-op-purple hover:underline font-medium">View all →</Link>
          </div>
          <SimpleTable 
            columns={['Guest', 'Room', 'Check-in/out', 'Amount', 'Status']} 
            rows={recentBookingsRows} 
          />
        </div>
      </div>
    </div>
  )
}
