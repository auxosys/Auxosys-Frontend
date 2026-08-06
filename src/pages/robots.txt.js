export default function Robots() {
  return null;
}

export async function getServerSideProps({ res }) {
  let content = "User-agent: *\nAllow: /\nSitemap: https://www.auxosys.com/sitemap.xml";
  
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';
    const fetchRes = await fetch(`${backendUrl}/seo/files`);
    const data = await fetchRes.json();
    if (data && data.success && data.data) {
      const file = data.data.find(f => f.filename === "robots.txt");
      if (file && file.content) {
        content = file.content;
      }
    }
  } catch (error) {
    console.error("Failed to fetch dynamic robots.txt", error);
  }

  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(content);
  res.end();

  return { props: {} };
}
