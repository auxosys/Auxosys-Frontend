import SEO from '@/components/SEO';

export default function TermsAndConditions() {
  return (
    <div style={{ padding: '120px 24px', minHeight: '100vh', maxWidth: '800px', margin: '0 auto' }}>
      <SEO 
        title="Terms & Conditions | Auxosys"
        description="Auxosys terms and conditions of service. Read the rules and regulations for using our website and services."
        urlPath="/terms"
      />
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', marginBottom: '24px' }}>Terms & Conditions</h1>
      <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>This page is currently under construction. Please check back later for our full Terms and Conditions.</p>
    </div>
  );
}
