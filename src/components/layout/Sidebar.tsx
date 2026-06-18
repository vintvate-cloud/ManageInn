import React, { useState } from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../features/auth/AuthContext'
import {
  LayoutDashboard, BedDouble, CalendarCheck, Users, DollarSign,
  UtensilsCrossed, Table2, ClipboardList, ChefHat, Receipt,
  BarChart3, Settings, Building2, ChevronDown, Sparkles
} from 'lucide-react'
import type { UserRole } from '../../types'

interface NavItem {
  label: string
  to: string
  icon: React.ElementType
  roles: UserRole[]
  section?: string
}

const NAV_ITEMS: NavItem[] = [
  // Overview
  { label: 'Command Center', to: '/hybrid', icon: Building2, roles: ['hybrid_admin'], section: 'Overview' },
  // Hotel
  { label: 'Hotel Admin', to: '/hotel', icon: LayoutDashboard, roles: ['hotel_admin', 'hybrid_admin'], section: 'Hotel Operations' },
  { label: 'Rooms', to: '/hotel/rooms', icon: BedDouble, roles: ['hotel_admin', 'hybrid_admin'] },
  { label: 'Bookings', to: '/hotel/bookings', icon: CalendarCheck, roles: ['hotel_admin', 'hybrid_admin'] },
  { label: 'Guests', to: '/hotel/guests', icon: Users, roles: ['hotel_admin', 'hybrid_admin'] },
  { label: 'Finance', to: '/hotel/finance', icon: DollarSign, roles: ['hotel_admin', 'hybrid_admin'] },
  // Restaurant
  { label: 'Restaurant Admin', to: '/restaurant', icon: LayoutDashboard, roles: ['restaurant_admin', 'hybrid_admin'], section: 'Restaurant Dining' },
  { label: 'Tables', to: '/restaurant/tables', icon: Table2, roles: ['restaurant_admin', 'hybrid_admin'] },
  { label: 'Orders', to: '/restaurant/orders', icon: ClipboardList, roles: ['restaurant_admin', 'hybrid_admin'] },
  { label: 'Kitchen View', to: '/restaurant/kitchen', icon: ChefHat, roles: ['restaurant_admin', 'hybrid_admin'] },
  { label: 'Menu', to: '/restaurant/menu', icon: UtensilsCrossed, roles: ['restaurant_admin', 'hybrid_admin'] },
  { label: 'Billing', to: '/restaurant/billing', icon: Receipt, roles: ['restaurant_admin', 'hybrid_admin'] },
  // Shared
  { label: 'Analytics', to: '/analytics', icon: BarChart3, roles: ['hotel_admin', 'restaurant_admin', 'hybrid_admin'], section: 'Reports & Settings' },
  { label: 'Settings', to: '/settings', icon: Settings, roles: ['hotel_admin', 'restaurant_admin', 'hybrid_admin'] },
]

export function Sidebar() {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()

  const role = profile?.role ?? 'hotel_admin'
  const visibleItems = NAV_ITEMS.filter(item => item.roles.includes(role))

  let lastSection = ''

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="flex flex-col h-full bg-foreground text-background">
      <Link to="/" className="font-display text-2xl px-5 py-6 shrink-0 tracking-tight">ManageInn</Link>
      
      <div className="flex-1 min-h-0 overflow-y-auto px-2 space-y-5 custom-scrollbar">
        {visibleItems.reduce((acc: React.ReactNode[], item) => {
          const showSection = item.section && item.section !== lastSection
          if (item.section) lastSection = item.section

          if (showSection) {
            acc.push(
              <div key={`section-${item.section}`} className="px-3 text-[10px] uppercase tracking-widest text-background/40 mb-1.5 mt-5">
                {item.section}
              </div>
            )
          }

          acc.push(
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/hotel' || item.to === '/restaurant' || item.to === '/hybrid'}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition ${
                  isActive ? "bg-op-purple text-foreground font-medium" : "text-background/70 hover:bg-white/5"
                }`
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          )
          
          return acc
        }, [])}
      </div>

      <div className="shrink-0 p-4 space-y-3 mt-4">
        {/* User Role Switcher / Details */}
        <div className="relative">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-between gap-2 bg-white/5 hover:bg-white/10 transition rounded-xl px-3 py-2.5 text-xs text-left"
            title="Click to Sign Out"
          >
            <span className="text-background/50 truncate max-w-[80px]">{profile?.name?.split(' ')[0]}</span>
            <span className="font-semibold flex items-center gap-1 truncate text-op-purple">
              Sign Out
            </span>
          </button>
        </div>

        {/* AI Copilot Widget */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-2 text-xs text-op-purple mb-2 font-semibold">
            <Sparkles className="h-3.5 w-3.5" /> AI Copilot
          </div>
          <p className="text-sm text-background/70 leading-relaxed">Suggest pricing for next weekend?</p>
          <button className="mt-3 w-full text-xs bg-op-purple text-foreground rounded-full px-3 py-2 font-semibold hover:opacity-90 transition">
            Run suggestion
          </button>
        </div>
      </div>
    </div>
  )
}
