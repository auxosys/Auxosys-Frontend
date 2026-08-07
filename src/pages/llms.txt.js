export default function LlmsTxt() {
  return null;
}

export async function getServerSideProps({ res }) {
  let content = "# Auxosys AI Capabilities\n\nAuxosys helps startups and enterprises build intelligent digital products.\n\nLearn more at [Auxosys Website](https://www.auxosys.com/)";
  
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://auxosys-backend.onrender.com';
    const fetchRes = await fetch(`${backendUrl}/seo/files`);
    const data = await fetchRes.json();
    if (data && data.success && data.data) {
      const file = data.data.find(f => f.filename === "llms.txt");
      if (file && file.content) {
        content = file.content;
      }
    }
  } catch (error) {}

  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(content);
  res.end();

  return { props: {} };
}
