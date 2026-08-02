import DetailTemplate from '@/components/DetailTemplate';
import { INDUSTRIES_DATA } from '@/data/pagesData';

export default function IndustryDetail({ pageData }) {
  return <DetailTemplate pageData={pageData} breadcrumbParent="Industries" />;
}

export async function getStaticPaths() {
  const paths = INDUSTRIES_DATA.map((industry) => ({
    params: { slug: industry.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const pageData = INDUSTRIES_DATA.find((i) => i.slug === params.slug);
  return { props: { pageData } };
}
