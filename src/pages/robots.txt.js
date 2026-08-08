const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function generateRobotsTxt(robotsTxt) {
  if (robotsTxt) return robotsTxt;
  
  // Safe default
  return `User-agent: *\nAllow: /\n\nSitemap: https://www.auxosys.com/sitemap.xml`;
}

export async function getServerSideProps({ res }) {
  try {
    let robotsTxt = null;

    try {
      const settingsRes = await fetch(`${BACKEND_URL}/api/v1/seo/settings`);
      if (settingsRes.ok) {
        const { data } = await settingsRes.json();
        robotsTxt = data?.robots_txt;
      }
    } catch (e) {
      console.error("Failed to fetch robots.txt settings:", e);
    }

    const sitemap = generateRobotsTxt(robotsTxt);

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=600');
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error("Error generating robots.txt", error);
    res.statusCode = 500;
    res.end();
  }

  return { props: {} };
}

export default function Robots() {
  // getServerSideProps handles the request
}
