const fs = require('fs');

const files = [
  'src/pages/contact.jsx',
  'src/components/layout/Footer.jsx',
  'src/pages/[slug].jsx',
  'src/pages/careers/index.jsx',
  'src/pages/careers/[slug]/apply.jsx',
  'src/pages/careers/[slug]/index.jsx',
  'src/pages/news/index.jsx',
  'src/pages/news/[slug].jsx',
  'src/components/ui/RelatedNews.jsx'
];

const API_VAR = "const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';\n  const API_URL = process.env.NEXT_PUBLIC_API_URL || (isLocal ? 'http://localhost:5002' : 'https://auxosys-backend.vercel.app');";

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  content = content.replace(/const API_URL = process\.env\.NEXT_PUBLIC_API_URL \|\| "http:\/\/localhost:5002";/g, API_VAR);
  
  content = content.replace(/\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| "http:\/\/localhost:5002"\}/g, "${process.env.NEXT_PUBLIC_API_URL || 'https://auxosys-backend.vercel.app'}");
  
  content = content.replace(/\$\{process\.env\.NEXT_PUBLIC_API_URL\}/g, "${process.env.NEXT_PUBLIC_API_URL || 'https://auxosys-backend.vercel.app'}");
  
  // Also replace any lingering single quotes
  content = content.replace(/\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| 'http:\/\/localhost:5002'\}/g, "${process.env.NEXT_PUBLIC_API_URL || 'https://auxosys-backend.vercel.app'}");

  fs.writeFileSync(file, content);
}
console.log('Done!');
