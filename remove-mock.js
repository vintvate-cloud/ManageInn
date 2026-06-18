const fs = require('fs');
const path = require('path');

const dir = 'd:/bussiness models/ManageInn/src/features/operix';
const files = fs.readdirSync(dir).filter(f => f.startsWith('dashboard.') && f !== 'dashboard.index.tsx' && f !== 'dashboard.copilot.tsx');

for (const file of files) {
  const p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf8');
  
  // Clear rows array in ModulePage (matches `rows={[ ["Occupancy", ...], ... ]}`)
  content = content.replace(/rows=\{\[[\s\S]*?\]\}/, 'rows={[]}');
  
  // Clear any const arrays like RES, DATA, etc. (matches `const RES = [ { ... }, ... ];`)
  content = content.replace(/const ([A-Z_]+) = \[\s*\{[\s\S]*?\}\s*\];/, 'const $1: any[] = [];');
  
  // Zero out stats values: value: "82%" -> value: "0%"
  content = content.replace(/value:\s*"([^"]*?\d[^"]*?)"/g, (match, val) => {
    if (val.includes('%')) return 'value: "0%"';
    if (val.includes('₹')) return 'value: "₹0"';
    if (val.includes('$')) return 'value: "$0"';
    if (val.includes('/')) return 'value: "0 / 0"';
    return 'value: "0"';
  });

  // Zero out raw numbers in mapping objects (e.g., v: 24)
  content = content.replace(/v:\s*\d+/g, 'v: 0');
  
  // Zero out explicit counts
  content = content.replace(/count:\s*\d+/g, 'count: 0');

  // Zero out deltas (e.g., delta: "+12%")
  content = content.replace(/delta:\s*"([^"]*?)"/g, (match, val) => {
    if (val.includes('%')) return 'delta: "0%"';
    if (val.includes('₹')) return 'delta: "₹0"';
    if (val.includes('$')) return 'delta: "$0"';
    return 'delta: "0"';
  });
  
  fs.writeFileSync(p, content, 'utf8');
}
console.log("Mock data removed from all operix files!");
