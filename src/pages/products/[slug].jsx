import DetailTemplate from '@/components/DetailTemplate';
import { PRODUCTS_DATA } from '@/data/pagesData';

export default function ProductDetail({ pageData }) {
  return <DetailTemplate pageData={pageData} breadcrumbParent="Products" />;
}

export async function getStaticPaths() {
  const paths = PRODUCTS_DATA.map((product) => ({
    params: { slug: product.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const pageData = PRODUCTS_DATA.find((p) => p.slug === params.slug);
  return { props: { pageData } };
}
