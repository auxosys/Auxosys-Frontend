import CareersClient from './CareersClient';

// Optionally add caching or revalidation. We use no-store if jobs change frequently,
// but for a careers page, revalidate: 60 or cache: 'no-store' works well.
export default async function CareersPage() {
  let initialJobs = [];
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002"}/job`, {
      cache: 'no-store' // Fetch fresh on every request, but server-to-server is fast!
    });
    
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        initialJobs = json.data;
      }
    }
  } catch (err) {
    console.error("Failed to fetch jobs server-side:", err);
  }

  return <CareersClient initialJobs={initialJobs} />;
}
