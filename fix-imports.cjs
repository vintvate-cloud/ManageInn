const fs = require('fs');

let l = fs.readFileSync('src/pages/Landing/index.tsx', 'utf8');
const lIcons = `import { Search, DollarSign, MessageCircle, Plus, ArrowRight, Sparkles, Bed, CheckCircle2, Calendar, TrendingUp, Users, Wrench, ShoppingCart, BarChart3, Star, Zap, Shield, Globe, Hotel, Bot } from 'lucide-react';\nimport { SiteNav, SiteFooter } from '../../components/layout/SiteNav';\nimport gsap from 'gsap';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';\n`;
if (!l.includes('import { Search, DollarSign')) {
  l = lIcons + l;
}
// remove duplicate imports if any
l = l.replace(/import gsap from ['"]gsap['"];/g, '');
l = l.replace(/import \{ ScrollTrigger \} from ['"]gsap\/ScrollTrigger['"];/g, '');
fs.writeFileSync('src/pages/Landing/index.tsx', l);

let p = fs.readFileSync('src/pages/Pricing.tsx', 'utf8');
const pIcons = `import { Sparkles, ArrowRight, Check } from 'lucide-react';\nimport { SiteNav, SiteFooter } from '../../components/layout/SiteNav';\n`;
if (!p.includes('import { Sparkles, ArrowRight, Check }')) {
  p = pIcons + p;
}
fs.writeFileSync('src/pages/Pricing.tsx', p);
