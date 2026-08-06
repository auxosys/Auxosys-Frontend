import SEO from '@/components/SEO';

export default function PrivacyPolicy() {
  return (
    <div style={{ padding: '120px 24px', minHeight: '100vh', maxWidth: '800px', margin: '0 auto' }}>
      <SEO 
        title="Privacy Policy | Auxosys"
        description="Auxosys privacy policy. Learn how we collect, use, and protect your personal information."
        urlPath="/privacy"
      />
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', marginBottom: '24px' }}>Privacy Policy</h1>
      <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>This page is currently under construction. Please check back later for our full Privacy Policy.</p>
    </div>
  );
}
