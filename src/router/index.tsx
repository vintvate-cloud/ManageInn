import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { RoleGuard, GuestGuard } from '../features/auth/RoleGuard'
import { DashboardShell } from '../components/ui/dashboard-shell'
import { useAuth } from '../features/auth/AuthContext'
import { SiteProvider } from '../features/context/SiteContext'

// Lazy-loaded pages
const LandingPage = lazy(() => import('../pages/Landing'))
const LoginPage = lazy(() => import('../pages/Auth/Login'))
const SignupPage = lazy(() => import('../pages/Auth/Signup'))
const BusinessDirectory = lazy(() => import('../pages/BusinessDirectory'))
const PricingPage = lazy(() => import('../pages/Pricing'))

const FrontOfficePage = lazy(() => import('../pages/Dashboard/Hotel/FrontOffice/FrontOffice'));

// Operix Ported Pages
const AnalyticsPage = lazy(() => import('../features/operix/dashboard.analytics'));
const AttendancePage = lazy(() => import('../features/operix/dashboard.attendance'));
const ChannelsPage = lazy(() => import('../features/operix/dashboard.channels'));
const CmsPage = lazy(() => import('../features/operix/dashboard.cms'));
const ConciergePage = lazy(() => import('../features/operix/dashboard.concierge'));
const CopilotPage = lazy(() => import('../features/operix/dashboard.copilot'));
const DocumentsPage = lazy(() => import('../features/operix/dashboard.documents'));
const EventsPage = lazy(() => import('../features/operix/dashboard.events'));
const FinancePage = lazy(() => import('../features/operix/dashboard.finance'));
const GuestsPage = lazy(() => import('../features/operix/dashboard.guests'));
const HousekeepingPage = lazy(() => import('../features/operix/dashboard.housekeeping'));
const InboxPage = lazy(() => import('../features/operix/dashboard.inbox'));
const OverviewPage = lazy(() => import('../features/operix/dashboard.index'));
const InventoryPage = lazy(() => import('../features/operix/dashboard.inventory'));
const LoyaltyPage = lazy(() => import('../features/operix/dashboard.loyalty'));
const MaintenancePage = lazy(() => import('../features/operix/dashboard.maintenance'));
const PayrollPage = lazy(() => import('../features/operix/dashboard.payroll'));
const PosPage = lazy(() => import('../features/operix/dashboard.pos'));
const ProcurementPage = lazy(() => import('../features/operix/dashboard.procurement'));
const PropertiesPage = lazy(() => import('../features/operix/dashboard.properties'));
const ReservationsPage = lazy(() => import('../features/operix/dashboard.reservations'));
const RevenuePage = lazy(() => import('../features/operix/dashboard.revenue'));
const RolesPage = lazy(() => import('../features/operix/dashboard.roles'));
const SecurityPage = lazy(() => import('../features/operix/dashboard.security'));
const SettingsPage = lazy(() => import('../features/operix/dashboard.settings'));
const StaffPage = lazy(() => import('../features/operix/dashboard.staff'));


const LoadingFallback = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-op-purple border-t-transparent" />
      <span className="text-sm text-muted-foreground">Loading OPERIX...</span>
    </div>
  </div>
)

function RoleRedirect() {
  const { profile, loading } = useAuth()
  if (loading) return <LoadingFallback />
  if (!profile) return <Navigate to="/login" replace />
  return <Navigate to="/dashboard" replace />
}

export function AppRouter() {
  return (
    <SiteProvider>
      <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/businesses" element={<BusinessDirectory />} />

        {/* Auth */}
        <Route path="/login" element={<GuestGuard><LoginPage /></GuestGuard>} />
        <Route path="/signup" element={<GuestGuard><SignupPage /></GuestGuard>} />

        {/* Role redirect after login */}
        <Route path="/login-redirect" element={<RoleGuard><RoleRedirect /></RoleGuard>} />

        {/* Operix Dashboard */}
        <Route path="/dashboard" element={<RoleGuard><DashboardShell /></RoleGuard>}>
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="channels" element={<ChannelsPage />} />
          <Route path="cms" element={<CmsPage />} />
          <Route path="concierge" element={<ConciergePage />} />
          <Route path="copilot" element={<CopilotPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="finance" element={<FinancePage />} />
          <Route path="guests" element={<GuestsPage />} />
          <Route path="housekeeping" element={<HousekeepingPage />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route index element={<OverviewPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="loyalty" element={<LoyaltyPage />} />
          <Route path="maintenance" element={<MaintenancePage />} />
          <Route path="payroll" element={<PayrollPage />} />
          <Route path="pos" element={<PosPage />} />
          <Route path="procurement" element={<ProcurementPage />} />
          <Route path="properties" element={<PropertiesPage />} />
          <Route path="reservations" element={<ReservationsPage />} />
          <Route path="revenue" element={<RevenuePage />} />
          <Route path="roles" element={<RolesPage />} />
          <Route path="security" element={<SecurityPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="staff" element={<StaffPage />} />

          <Route path="hotel/frontoffice" element={<FrontOfficePage />} />
        </Route>

        {/* Fallbacks for old routes so we don't break links immediately */}
        <Route path="/hotel/*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/restaurant/*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/hybrid/*" element={<Navigate to="/dashboard" replace />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Suspense>
    </SiteProvider>
  )
}
