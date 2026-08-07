export async function fetchSeoData(slug = '/') {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://auxosys-backend.onrender.com';
    const res = await fetch(`${backendUrl}/api/v1/seo/page?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 } // 5 minutes cache
    });
    
    if (!res.ok) {
      console.warn(`Failed to fetch SEO for ${slug}: ${res.status}`);
      return {};
    }
    
    const data = await res.json();
    return data.data?.seo || {};
  } catch (err) {
    console.error(`Error fetching SEO for ${slug}:`, err);
    return {};
  }
}
