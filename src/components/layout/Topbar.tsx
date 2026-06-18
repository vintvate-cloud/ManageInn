import React from 'react'
import { Bell, Search, Menu } from 'lucide-react'
import { useAuth } from '../../features/auth/AuthContext'

interface TopbarProps {
  onMobileMenuToggle: () => void
}

export function Topbar({ onMobileMenuToggle }: TopbarProps) {
  const { profile } = useAuth()

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border flex items-center gap-2 px-3 sm:px-6 py-3">
      <button onClick={onMobileMenuToggle} aria-label="Open menu" className="lg:hidden p-2 rounded-full hover:bg-muted">
        <Menu className="h-5 w-5" />
      </button>
      <div className="flex-1 min-w-0 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Search rooms, guests, orders…"
          className="w-full bg-muted rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/10 transition"
        />
      </div>
      <button className="p-2.5 rounded-full hover:bg-muted relative shrink-0">
        <Bell className="h-4 w-4" />
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-op-orange" />
      </button>
      <div className="h-9 w-9 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-semibold shrink-0 uppercase tracking-wider">
        {profile?.name?.substring(0, 2) ?? 'MI'}
      </div>
    </header>
  )
}
