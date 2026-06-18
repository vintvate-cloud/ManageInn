const fs = require('fs');

const f1 = 'src/features/hotel/FinanceTracker.tsx';
if (fs.existsSync(f1)) {
  let l1 = fs.readFileSync(f1, 'utf8');
  l1 = l1.replace(/styles\.[a-zA-Z0-9_]+/g, '\"p-2\"');
  fs.writeFileSync(f1, l1);
}

const f2 = 'src/features/restaurant/KitchenView.tsx';
if (fs.existsSync(f2)) {
  let l2 = fs.readFileSync(f2, 'utf8');
  l2 = l2.replace(/styles\.[a-zA-Z0-9_]+/g, '\"bg-muted/50 p-2 rounded-lg\"');
  fs.writeFileSync(f2, l2);
}

const f3 = 'src/features/restaurant/TableManagement.tsx';
if (fs.existsSync(f3)) {
  let l3 = fs.readFileSync(f3, 'utf8');
  l3 = l3.replace(/styles\.[a-zA-Z0-9_]+/g, '\"p-4 bg-muted/50 rounded-xl\"');
  fs.writeFileSync(f3, l3);
}

const f4 = 'src/features/shared/HybridDashboard.tsx';
if (fs.existsSync(f4)) {
  let l4 = fs.readFileSync(f4, 'utf8');
  l4 = l4.replace(/import styles from ['"].*\.module\.css['"];?\n/g, '');
  fs.writeFileSync(f4, l4);
}
