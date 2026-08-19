function escapeXml(unsafe) {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function normalizeUrl(url, baseUrl) {
  if (!url) return null;
  // If it's already an absolute URL starting with our base url, return as is
  if (url.startsWith(baseUrl)) return url;
  
  // If it's an absolute URL for a different domain, we might want to exclude it if it's non-canonical
  // But for safety, ensure we are only mapping local paths to our domain
  if (url.startsWith('http')) return url;
  
  // Add base url to relative paths
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${baseUrl}${cleanPath}`.replace(/\/$/, ''); // strip trailing slash
}

export default function Sitemap() {
  return null;
}

export async function getServerSideProps({ req, res, query }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.auxosys.com';
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://auxosys-backend.onrender.com';
  
  let allUrls = [];
  const urlMap = new Map(); // to prevent duplicates

  try {
    // 1. Fetch Page SEO data
    const pagesRes = await fetch(`${backendUrl}/api/v1/seo/pages`);
    const pagesData = await pagesRes.json();
    
    if (pagesData && pagesData.success && pagesData.data) {
      pagesData.data.forEach(page => {
        // EXCLUSION RULES
        if (page.status !== 'Published') return; // Exclude drafts/archived
        if (!page.robots_index) return; // Exclude noindex
        if (page.include_in_sitemap === false) return; // Explicit exclude
        
        let targetUrl = page.page_slug;
        
        // Handle non-canonical URLs: If a canonical is specified, use that instead of the slug.
        // If the canonical points to an external site, exclude it from our sitemap entirely.
        if (page.canonical && page.canonical !== '') {
            if (page.canonical.startsWith('http') && !page.canonical.startsWith(baseUrl)) {
                return; // Exclude external canonicals
            }
            targetUrl = page.canonical;
        }

        const normalizedUrl = normalizeUrl(targetUrl, baseUrl);
        if (!normalizedUrl) return;

        urlMap.set(normalizedUrl, {
          loc: normalizedUrl,
          lastmod: page.updated_at ? new Date(page.updated_at).toISOString() : new Date().toISOString(),
          changefreq: page.change_frequency || 'weekly',
          priority: page.priority || 0.8
        });
      });
    }

    // 2. Fetch Custom Sitemap Links
    const linksRes = await fetch(`${backendUrl}/api/v1/seo/sitemap-links`);
    const linksData = await linksRes.json();
    
    if (linksData && linksData.success && linksData.data) {
      linksData.data.forEach(link => {
        // EXCLUSION RULES
        if (!link.status) return; // Exclude disabled custom links

        const normalizedUrl = normalizeUrl(link.url, baseUrl);
        if (!normalizedUrl) return;

        // If it exists in Page SEO, this custom link will OVERWRITE it (admin override)
        urlMap.set(normalizedUrl, {
          loc: normalizedUrl,
          lastmod: link.lastmod_override ? (link.lastmod ? new Date(link.lastmod).toISOString() : new Date().toISOString()) : new Date().toISOString(),
          changefreq: link.changefreq || 'weekly',
          priority: link.priority || 0.8
        });
      });
    }

    // 3. Fetch Navigation Links (to automatically include any links added in the Navigation & Sitelinks UI)
    const navRes = await fetch(`${backendUrl}/api/v1/seo/navigation`);
    const navData = await navRes.json();
    
    if (navData && navData.success && navData.data) {
      navData.data.forEach(link => {
        if (!link.url || link.url === '#' || link.url.startsWith('http')) return;
        
        const normalizedUrl = normalizeUrl(link.url, baseUrl);
        if (!normalizedUrl) return;

        // Only add if it doesn't already exist from pages or custom sitemap links
        if (!urlMap.has(normalizedUrl)) {
          urlMap.set(normalizedUrl, {
            loc: normalizedUrl,
            lastmod: link.updated_at ? new Date(link.updated_at).toISOString() : new Date().toISOString(),
            changefreq: 'weekly',
            priority: link.parent_id ? 0.7 : 0.8
          });
        }
      });
    }
  } catch (error) {
    console.error("Sitemap generation error:", error);
  }

  // Convert Map to Array
  allUrls = Array.from(urlMap.values());

  // 50,000 URL limit handling (Sitemap Index)
  const URLS_PER_SITEMAP = 45000;
  const page = parseInt(query.page || '1', 10);
  
  if (allUrls.length > URLS_PER_SITEMAP && !query.page) {
    // Generate Sitemap Index
    const totalPages = Math.ceil(allUrls.length / URLS_PER_SITEMAP);
    
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${Array.from({ length: totalPages }).map((_, i) => `
      <sitemap>
        <loc>${escapeXml(`${baseUrl}/sitemap.xml?page=${i + 1}`)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>
      `).join('')}
    </sitemapindex>`;

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=86400");
    res.write(sitemapIndex.trim());
    res.end();
    return { props: {} };
  }

  // Pagination Slice
  const paginatedUrls = allUrls.slice((page - 1) * URLS_PER_SITEMAP, page * URLS_PER_SITEMAP);

  // Generate Standard Sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${paginatedUrls.map(u => `
  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${escapeXml(u.changefreq)}</changefreq>
    <priority>${u.priority}</priority>
  </url>
  `).join('')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=86400");
  res.write(sitemap.trim());
  res.end();

  return { props: {} };
}
