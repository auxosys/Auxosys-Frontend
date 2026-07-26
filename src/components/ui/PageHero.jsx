import React from 'react';

export function PageHero({ title, subtitle, lastUpdated, children }) {
  return (
    <div className="policy-hero" style={{ textAlign: 'center', marginBottom: '40px', paddingTop: '40px' }}>
      {children}
      <h1 className="policy-title" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '750', lineHeight: 1.1, margin: '0 0 16px', color: 'var(--text)', letterSpacing: '-0.025em' }}>
        {title}
      </h1>
      
      {subtitle && <p className="policy-subtitle" style={{ fontSize: '18px', color: 'var(--text-muted)', marginBottom: '12px', maxWidth: '700px', marginInline: 'auto' }}>{subtitle}</p>}
      
      {lastUpdated && (
        <div className="policy-date" style={{ marginTop: '24px', fontSize: '14px', color: 'var(--text-soft)', fontWeight: '500' }}>
          Last Updated: <strong style={{ color: 'var(--text)', fontWeight: '600' }}>{lastUpdated}</strong>
        </div>
      )}
    </div>
  );
}
