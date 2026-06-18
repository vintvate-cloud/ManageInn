const fs = require('fs');

function migrate(src, dest, isLanding) {
  let content = fs.readFileSync(src, 'utf8');

  // Replace tanstack imports and add react imports and lucide icons
  content = content.replace(/import \{.*?\} from ['"]@tanstack\/react-router['"];/s, `import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { SiteNav, SiteFooter } from "../../components/layout/SiteNav";`);

  // Remove the old site-nav import if it exists
  content = content.replace(/import \{ SiteNav.*?\} from ['"]@\/components\/site-nav['"];/s, '');

  // Remove old react imports that might clash
  content = content.replace(/import \{ useEffect, useRef, useState \} from "react";/g, '');
  // Insert it once properly
  content = content.replace(/import \{ Link \} from "react-router-dom";/, `import { Link } from "react-router-dom";\nimport { useEffect, useRef, useState } from "react";`);

  // Remove Route export
  content = content.replace(/export const Route = createFileRoute[\s\S]*?\}\);/s, '');

  if (isLanding) {
    content = content.replace(/function Landing\(\)/g, 'export default function Landing()');
  } else {
    content = content.replace(/function Pricing\(\)/g, 'export default function Pricing()');
  }

  content = content.replace(/href="#trial"/g, 'href="/signup"');
  content = content.replace(/href="#demo"/g, 'href="/signup"');
  content = content.replace(/OPERIX/g, 'ManageInn');

  fs.writeFileSync(dest, content);
}

migrate('manageinn-UI/operix-ai-suite/src/routes/index.tsx', 'src/pages/Landing/index.tsx', true);
migrate('manageinn-UI/operix-ai-suite/src/routes/pricing.tsx', 'src/pages/Pricing.tsx', false);
console.log('Migration complete');
