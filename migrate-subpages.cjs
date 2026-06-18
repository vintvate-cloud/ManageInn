const fs = require('fs');

const files = [
  'src/features/shared/HybridDashboard.tsx',
  'src/features/shared/Analytics.tsx',
  'src/features/restaurant/TableManagement.tsx',
  'src/features/restaurant/OrderManagement.tsx',
  'src/features/restaurant/MenuManager.tsx',
  'src/features/restaurant/KitchenView.tsx',
  'src/features/restaurant/Billing.tsx',
  'src/features/hotel/RoomManagement.tsx',
  'src/features/hotel/GuestDirectory.tsx',
  'src/features/hotel/FinanceTracker.tsx',
  'src/features/hotel/BookingSystem.tsx'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let l = fs.readFileSync(f, 'utf8');
  
  // Remove import
  l = l.replace(/import styles from ['"].*\.module\.css['"];?\n/g, '');
  
  // Basic layout replacements
  l = l.replace(/className=\{styles\.dashPage\}/g, 'className="space-y-6"');
  l = l.replace(/className=\{styles\.dashHeader\}/g, 'className="mb-6 flex justify-between items-start"');
  l = l.replace(/className=\{styles\.dashTitle\}/g, 'className="text-3xl font-display font-bold"');
  l = l.replace(/className=\{styles\.dashSub\}/g, 'className="text-muted-foreground mt-1"');
  
  l = l.replace(/className=\{styles\.statsGrid\}/g, 'className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"');
  l = l.replace(/className=\{styles\.chartsRow\}/g, 'className="grid grid-cols-1 lg:grid-cols-3 gap-6"');
  l = l.replace(/className=\{styles\.bottomRow\}/g, 'className="grid grid-cols-1 lg:grid-cols-3 gap-6"');
  
  l = l.replace(/className="card"/g, 'className="bg-background rounded-3xl border border-border p-5"');
  l = l.replace(/className="stat-card"/g, 'className="bg-background rounded-3xl border border-border p-5"');
  l = l.replace(/className="data-table"/g, 'className="w-full text-sm text-left"');
  
  // Strip out remaining styles
  l = l.replace(/className=\{styles\.[a-zA-Z0-9_]+\}/g, 'className="mb-4"');
  l = l.replace(/className=\{`\$\{styles\.[a-zA-Z0-9_]+\}.*?`\}/g, 'className="p-2"');
  
  // Strip out the custom styles object references for badges/cells where possible
  // Just let them render with whatever inline styles they had
  
  fs.writeFileSync(f, l);
});

// Also remove the css files
const cssFiles = [
  'src/features/hotel/Hotel.module.css',
  'src/features/restaurant/Restaurant.module.css',
  'src/features/shared/Shared.module.css',
  'src/components/layout/DashboardLayout.module.css',
  'src/components/layout/Sidebar.module.css',
  'src/components/layout/Topbar.module.css'
];

cssFiles.forEach(f => {
  if (fs.existsSync(f)) {
    fs.unlinkSync(f);
  }
});
