export default function Sitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
  let sitemapConfig = {
    include_products: true,
    include_services: true,
    include_blog: true,
    include_jobs: true,
    include_news: true,
    priority: 0.8,
    change_frequency: 'weekly'
  };

  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://auxosys-backend.onrender.com';
    const fetchRes = await fetch(`${backendUrl}/seo/sitemap`);
    const data = await fetchRes.json();
    if (data && data.success && data.data) {
      sitemapConfig = { ...sitemapConfig, ...data.data };
    }
  } catch (error) {}

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.auxosys.com';
  
  // Basic static routes
  let urls = [
    { loc: baseUrl, priority: 1.0 },
    { loc: `${baseUrl}/about`, priority: sitemapConfig.priority },
    { loc: `${baseUrl}/contact`, priority: sitemapConfig.priority },
  ];

  if (sitemapConfig.include_services) {
    urls.push({ loc: `${baseUrl}/services`, priority: sitemapConfig.priority });
    // In a full implementation, you'd fetch the services slugs from the DB here
  }
  
  if (sitemapConfig.include_products) {
    urls.push({ loc: `${baseUrl}/products`, priority: sitemapConfig.priority });
  }

  if (sitemapConfig.include_news) {
    urls.push({ loc: `${baseUrl}/news`, priority: sitemapConfig.priority });
  }
  
  if (sitemapConfig.include_jobs) {
    urls.push({ loc: `${baseUrl}/careers`, priority: sitemapConfig.priority });
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(u => `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${sitemapConfig.change_frequency}</changefreq>
    <priority>${u.priority}</priority>
  </url>
  `).join('')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=86400");
  res.write(sitemap);
  res.end();

  return { props: {} };
}
