const fs = require('fs');

const routeList = [
  { file: 'dashboard.analytics.tsx', routeName: 'analytics', componentName: 'Page' },
  { file: 'dashboard.attendance.tsx', routeName: 'attendance', componentName: 'Page' },
  { file: 'dashboard.channels.tsx', routeName: 'channels', componentName: 'Page' },
  { file: 'dashboard.cms.tsx', routeName: 'cms', componentName: 'Page' },
  { file: 'dashboard.concierge.tsx', routeName: 'concierge', componentName: 'Page' },
  { file: 'dashboard.copilot.tsx', routeName: 'copilot', componentName: 'Page' },
  { file: 'dashboard.documents.tsx', routeName: 'documents', componentName: 'Page' },
  { file: 'dashboard.events.tsx', routeName: 'events', componentName: 'Page' },
  { file: 'dashboard.finance.tsx', routeName: 'finance', componentName: 'Page' },
  { file: 'dashboard.guests.tsx', routeName: 'guests', componentName: 'Page' },
  { file: 'dashboard.housekeeping.tsx', routeName: 'housekeeping', componentName: 'Page' },
  { file: 'dashboard.inbox.tsx', routeName: 'inbox', componentName: 'Page' },
  { file: 'dashboard.index.tsx', routeName: '', componentName: 'Overview' },
  { file: 'dashboard.inventory.tsx', routeName: 'inventory', componentName: 'Page' },
  { file: 'dashboard.loyalty.tsx', routeName: 'loyalty', componentName: 'Page' },
  { file: 'dashboard.maintenance.tsx', routeName: 'maintenance', componentName: 'Page' },
  { file: 'dashboard.payroll.tsx', routeName: 'payroll', componentName: 'Page' },
  { file: 'dashboard.pos.tsx', routeName: 'pos', componentName: 'Page' },
  { file: 'dashboard.procurement.tsx', routeName: 'procurement', componentName: 'Page' },
  { file: 'dashboard.properties.tsx', routeName: 'properties', componentName: 'Page' },
  { file: 'dashboard.reservations.tsx', routeName: 'reservations', componentName: 'Page' },
  { file: 'dashboard.revenue.tsx', routeName: 'revenue', componentName: 'Page' },
  { file: 'dashboard.roles.tsx', routeName: 'roles', componentName: 'Page' },
  { file: 'dashboard.security.tsx', routeName: 'security', componentName: 'Page' },
  { file: 'dashboard.settings.tsx', routeName: 'settings', componentName: 'Page' },
  { file: 'dashboard.staff.tsx', routeName: 'staff', componentName: 'Page' }
];

let imports = '';
let routes = '';

routeList.forEach(r => {
  const comp = r.routeName ? r.routeName.charAt(0).toUpperCase() + r.routeName.slice(1) + 'Page' : 'OverviewPage';
  imports += `const ${comp} = lazy(() => import('../features/operix/${r.file.replace('.tsx', '')}'));\n`;
  
  if (r.routeName === '') {
    routes += `          <Route index element={<${comp} />} />\n`;
  } else {
    routes += `          <Route path="${r.routeName}" element={<${comp} />} />\n`;
  }
});

let routerContent = `import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { RoleGuard, GuestGuard } from '../features/auth/RoleGuard'
import { DashboardShell } from '../components/ui/dashboard-shell'
import { useAuth } from '../features/auth/AuthContext'

// Lazy-loaded pages
const LandingPage = lazy(() => import('../pages/Landing'))
const LoginPage = lazy(() => import('../pages/Auth/Login'))
const SignupPage = lazy(() => import('../pages/Auth/Signup'))
const BusinessDirectory = lazy(() => import('../pages/BusinessDirectory'))
const PricingPage = lazy(() => import('../pages/Pricing'))

// Operix Ported Pages
${imports}

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
${routes}
        </Route>

        {/* Fallbacks for old routes so we don't break links immediately */}
        <Route path="/hotel/*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/restaurant/*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/hybrid/*" element={<Navigate to="/dashboard" replace />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
`;

fs.writeFileSync('src/router/index.tsx', routerContent);
console.log('Router updated.');
