const fs = require('fs');
const path = require('path');

const sourceDir = 'manageinn-UI/operix-ai-suite/src/routes';
const targetDir = 'src/features/operix';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Ensure the shell component is copied and adapted
const shellContent = fs.readFileSync('manageinn-UI/operix-ai-suite/src/components/dashboard-shell.tsx', 'utf8');
let newShellContent = shellContent.replace(
  /import \{ Link, useRouterState \} from "@tanstack\/react-router";/,
  'import { Link, useLocation, Outlet } from "react-router-dom";'
);
newShellContent = newShellContent.replace(
  /const pathname = useRouterState\(\{ select: \(s\) => s\.location\.pathname \}\);/,
  'const { pathname } = useLocation();'
);
newShellContent = newShellContent.replace(
  /<main className="p-4 sm:p-8 space-y-6">\{children\}<\/main>/,
  '<main className="p-4 sm:p-8 space-y-6"><Outlet /></main>'
);
// In React Router Outlet replaces children.
newShellContent = newShellContent.replace(
  /export function DashboardShell\(\{ children \}: \{ children: ReactNode \}\) \{/,
  'export function DashboardShell() {'
);
fs.writeFileSync('src/components/ui/dashboard-shell.tsx', newShellContent);


// Process pages
const files = fs.readdirSync(sourceDir).filter(f => f.startsWith('dashboard.') && f.endsWith('.tsx') && f !== 'dashboard.tsx');

let routeExports = [];

files.forEach(file => {
  let content = fs.readFileSync(path.join(sourceDir, file), 'utf8');
  
  // Replace TanStack routing
  content = content.replace(/import \{ createFileRoute.*?\} from "@tanstack\/react-router";\n?/g, '');
  
  // Find component name
  const routeMatch = content.match(/export const Route = createFileRoute\([^)]+\)\(\{\s*component:\s*([A-Za-z0-9_]+),?\s*\}\);/);
  let componentName = 'DashboardComponent';
  if (routeMatch) {
    componentName = routeMatch[1];
    content = content.replace(routeMatch[0], '');
    content += `\nexport default ${componentName};\n`;
  } else {
    // If it doesn't match the standard shape, try to find the default export or a main function
    const funcMatch = content.match(/function ([A-Z][A-Za-z0-9_]+)/);
    if (funcMatch) {
      componentName = funcMatch[1];
      content += `\nexport default ${componentName};\n`;
    }
  }

  // Handle nested Links
  content = content.replace(/import \{ Link \} from "@tanstack\/react-router";/g, 'import { Link } from "react-router-dom";');

  // Fix internal imports
  content = content.replace(/@\/components\/dashboard-shell/g, '../../components/ui/dashboard-shell');
  content = content.replace(/@\/lib\//g, '../../lib/');
  content = content.replace(/@\/hooks\//g, '../../hooks/');

  // The 'index' page goes to /dashboard, others go to /dashboard/xyz
  const routeName = file === 'dashboard.index.tsx' ? '' : file.replace('dashboard.', '').replace('.tsx', '');
  
  fs.writeFileSync(path.join(targetDir, file), content);
  
  routeExports.push({ file, routeName, componentName });
});

console.log(JSON.stringify(routeExports, null, 2));
