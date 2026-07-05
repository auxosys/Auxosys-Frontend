import React from 'react';

export function PageHero({ title, subtitle, lastUpdated, children }) {
  return (
    <div className="policy-hero" style={{ textAlign: 'center', marginBottom: '40px', paddingTop: '40px' }}>
      {children}
      <h1 className="policy-title" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '700', lineHeight: 1.1, margin: '0 0 16px', color: '#ffffff', letterSpacing: '-0.02em' }}>
        {title}
      </h1>
      
      {subtitle && <p className="policy-subtitle" style={{ fontSize: '18px', color: '#AEB8C7', marginBottom: '12px', maxWidth: '700px', marginInline: 'auto' }}>{subtitle}</p>}
      
      {lastUpdated && (
        <div className="policy-date" style={{ marginTop: '24px', fontSize: '14px', color: '#7f93a3', fontWeight: '500' }}>
          Last Updated: <strong style={{ color: 'white', fontWeight: 'bold' }}>{lastUpdated}</strong>
        </div>
      )}
    </div>
  );
}
