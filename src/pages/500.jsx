import Link from 'next/link';
import SEO from '@/components/SEO';

export default function Custom500() {
  return (
    <>
      <SEO 
        title="Server Error | Auxosys"
        description="We're experiencing internal server issues."
        urlPath="/500"
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
        <h1 style={{ fontSize: '80px', fontWeight: '800', margin: '0 0 16px', color: 'var(--orange, #FF6B35)' }}>500</h1>
        <h2 style={{ fontSize: '24px', fontWeight: '600', margin: '0 0 24px' }}>Internal Server Error</h2>
        <p style={{ color: 'var(--muted, #64748B)', maxWidth: '400px', marginBottom: '32px', lineHeight: '1.6' }}>
          We're currently experiencing some issues on our end. Please try again later.
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
