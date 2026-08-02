import DetailTemplate from '@/components/DetailTemplate';
import { SERVICES_DATA } from '@/data/pagesData';

export default function ServiceDetail({ pageData }) {
  return <DetailTemplate pageData={pageData} breadcrumbParent="Services" />;
}

export async function getStaticPaths() {
  const paths = SERVICES_DATA.map((service) => ({
    params: { slug: service.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const pageData = SERVICES_DATA.find((s) => s.slug === params.slug);
  return { props: { pageData } };
}
