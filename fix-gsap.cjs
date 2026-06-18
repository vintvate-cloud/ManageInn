const fs = require('fs');
let l = fs.readFileSync('src/pages/Landing/index.tsx', 'utf8');
if (!l.includes("import gsap from 'gsap';")) {
  l = "import gsap from 'gsap';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';\n" + l;
  fs.writeFileSync('src/pages/Landing/index.tsx', l);
}
