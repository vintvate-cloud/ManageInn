import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { useAuth } from '../../features/auth/AuthContext'
import { useHotelStore, useRestaurantStore } from '../../store'
import { X } from 'lucide-react'

export function DashboardLayout() {
  const { profile } = useAuth()
  const { fetchHotelData } = useHotelStore()
  const { fetchRestaurantData } = useRestaurantStore()
  
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  // Initial Data Sync
  useEffect(() => {
    if (profile?.business_id) {
      if (profile.role === 'hotel_admin' || profile.role === 'hybrid_admin') {
        fetchHotelData(profile.business_id)
      }
      if (profile.role === 'restaurant_admin' || profile.role === 'hybrid_admin') {
        fetchRestaurantData(profile.business_id)
      }
    }
  }, [profile?.business_id, profile?.role, fetchHotelData, fetchRestaurantData])

  return (
    <div className="min-h-screen bg-muted/40 text-foreground flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-foreground text-background h-screen sticky top-0">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setMobileSidebarOpen(false)} />
          <div className="absolute top-0 left-0 h-full w-[84%] max-w-xs bg-foreground text-background flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            <button 
              onClick={() => setMobileSidebarOpen(false)} 
              aria-label="Close menu" 
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 z-50 transition"
            >
              <X className="h-5 w-5 text-background" />
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        <Topbar onMobileMenuToggle={() => setMobileSidebarOpen(true)} />
        
        {/* Main Content Area */}
        <main className="p-4 sm:p-8 space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
