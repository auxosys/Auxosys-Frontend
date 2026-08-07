import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.auxosys.com';

const STATUS_CONFIG = {
  valid: {
    color: '#0C8074', bg: '#EAFAF7', border: '#99F0DE',
    icon: '✓', title: 'Certificate Verified',
    message: 'This certificate is authentic and currently valid.',
  },
  revoked: {
    color: '#DC2626', bg: '#FEF2F2', border: '#FCA5A5',
    icon: '✕', title: 'Certificate Revoked',
    message: 'This certificate has been revoked and is no longer valid.',
  },
  expired: {
    color: '#C2410C', bg: '#FFF7ED', border: '#FED7AA',
    icon: '!', title: 'Certificate Expired',
    message: 'This certificate was valid but has since expired.',
  },
  not_found: {
    color: '#475569', bg: '#F1F5F9', border: '#E2E8F0',
    icon: '?', title: 'Certificate Not Found',
    message: "We couldn't find a certificate matching this link. Double-check the QR code or link, or contact the issuing organization.",
  },
};

export default function VerifyPage() {
  const router = useRouter();
  const { id, t } = router.query;

  const [state, setState] = useState({ loading: true, result: null, certificate: null, error: null });

  useEffect(() => {
    if (!id) return;
    async function run() {
      try {
        const qs = t ? `?t=${encodeURIComponent(t)}` : '';
        const res = await fetch(`${API_BASE}/api/verify/${id}${qs}`);
        const data = await res.json();
        setState({ loading: false, result: data.result || 'not_found', certificate: data.certificate || null, error: null });
      } catch (err) {
        setState({ loading: false, result: 'not_found', certificate: null, error: 'Verification service unavailable.' });
      }
    }
    run();
  }, [id, t]);

  const cfg = STATUS_CONFIG[state.result] || STATUS_CONFIG.not_found;

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: "-apple-system, 'Segoe UI', Roboto, Arial, sans-serif" }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
        }
      `}</style>


      <div style={{ maxWidth: state.result === 'valid' && state.certificate?.pdf_url ? 1400 : 640, margin: '0 auto', padding: '120px 24px 80px' }}>
        {state.loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#94A3B8', fontSize: 14 }}>Verifying…</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 40, alignItems: 'stretch' }}>
            
            {/* Left side: Certificate Preview (only if valid and PDF available) */}
            {state.result === 'valid' && state.certificate?.pdf_url && (
              <div style={{ flex: '1 1 700px', minWidth: 300, background: '#F1F5F9', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', aspectRatio: '1122/793' }} className="no-print">
                <object data={`${state.certificate.pdf_url}#toolbar=0&view=FitH`} type="application/pdf" width="100%" height="100%">
                  <iframe src={`${state.certificate.pdf_url}#toolbar=0&view=FitH`} width="100%" height="100%" style={{ border: 'none', display: 'block' }} title="Certificate Preview" />
                </object>
              </div>
            )}

            {/* Right side: Verification Status and Details */}
            <div style={{ flex: '1 1 350px', maxWidth: state.result === 'valid' && state.certificate?.pdf_url ? 500 : 640, margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
              <div style={{
                background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 16,
                padding: '20px 20px', textAlign: 'center', marginBottom: 16,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', background: cfg.color, color: '#FFFFFF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, fontWeight: 800, margin: '0 auto 10px',
                }}>
                  {cfg.icon}
                </div>
                <h1 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>{cfg.title}</h1>
                <p style={{ fontSize: 14, color: '#475569', margin: 0, lineHeight: 1.6 }}>{cfg.message}</p>
                {state.result === 'revoked' && state.certificate?.revoked_reason && (
                  <p style={{ fontSize: 13, color: '#DC2626', marginTop: 10, fontStyle: 'italic' }}>
                    Reason: {state.certificate.revoked_reason}
                  </p>
                )}
              </div>

              {state.certificate && state.result !== 'not_found' && (
                <div style={{ flex: 1, background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: '20px 24px', display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#14B8A6', margin: '0 0 12px' }}>
                    Certificate Details
                  </p>

                  <DetailRow label="Recipient" value={state.certificate.recipient_name} />
                  <DetailRow label="Employee ID" value={state.certificate.employeeId} />
                  <DetailRow label="Certificate" value={state.certificate.title} />
                  <DetailRow label="Type" value={capitalize(state.certificate.cert_type)} />
                  <DetailRow label="Certificate Number" value={state.certificate.certificate_number} mono />
                  <DetailRow label="Issued" value={formatDate(state.certificate.issued_at)} />
                  {state.certificate.expires_at && (
                    <DetailRow label="Expires" value={formatDate(state.certificate.expires_at)} />
                  )}

                  {state.result === 'valid' && state.certificate.pdf_url && (
                    <div style={{ display: 'flex', gap: 10, marginTop: 'auto', paddingTop: 20 }} className="no-print">
                      <a
                        href={state.certificate.pdf_url}
                        target="_blank" rel="noreferrer"
                        style={{
                          flex: 1, textAlign: 'center', background: '#14B8A6', color: '#FFFFFF',
                          padding: '11px', borderRadius: 8, fontSize: 13.5, fontWeight: 700, textDecoration: 'none',
                        }}
                      >
                        Download PDF
                      </a>
                      <button
                        onClick={() => window.print()}
                        style={{
                          flex: 1, background: '#F1F5F9', color: '#334155', border: 'none',
                          padding: '11px', borderRadius: 8, fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
                        }}
                      >
                        Print
                      </button>
                    </div>
                  )}
                </div>
              )}

              <p className="no-print" style={{ textAlign: 'center', fontSize: 12, color: '#94A3B8', marginTop: 24 }}>
                Verified via Auxosys Certificate Verification · {new Date().toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value, mono }) {
  if (!value) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid #F1F5F9' }}>
      <span style={{ fontSize: 12.5, color: '#64748B' }}>{label}</span>
      <span style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A', fontFamily: mono ? 'monospace' : 'inherit' }}>{value}</span>
    </div>
  );
}

function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }
function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}
