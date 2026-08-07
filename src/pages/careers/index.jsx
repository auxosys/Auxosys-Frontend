import CareersClient from './CareersClient';
import SEO from '@/components/SEO';

export default function CareersPage({ initialJobs }) {
  return (
    <>
      <SEO 
        title="Careers | Join the Auxosys Team"
        description="We are always looking for talented individuals to join our growing team. Explore open positions and build the future with us."
        urlPath="/careers"
      />
      <CareersClient initialJobs={initialJobs} />
    </>
  );
}

export async function getServerSideProps() {
  let initialJobs = [];
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.auxosys.com'}/job`);
    
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        initialJobs = json.data;
      }
    }
  } catch (err) {
    console.error("Failed to fetch jobs server-side:", err);
  }

  return {
    props: {
      initialJobs
    }
  };
}
