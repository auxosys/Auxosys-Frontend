import Link from 'next/link';
import SEO from '@/components/SEO';

export default function Custom404() {
  return (
    <>
      <SEO 
        title="Page Not Found | Auxosys"
        description="The page you are looking for does not exist."
        urlPath="/404"
      />
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px'
      }}>
        <h1 style={{ fontSize: '80px', fontWeight: '800', margin: '0 0 16px', color: 'var(--teal, #0EA5E9)' }}>404</h1>
        <h2 style={{ fontSize: '24px', fontWeight: '600', margin: '0 0 24px' }}>Page Not Found</h2>
        <p style={{ color: 'var(--muted, #64748B)', maxWidth: '400px', marginBottom: '32px', lineHeight: '1.6' }}>
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" style={{
          background: 'var(--ink, #17262B)',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '8px',
          fontWeight: '500',
          textDecoration: 'none'
        }}>
          Return to Homepage
        </Link>
      </div>
    </>
  );
}
