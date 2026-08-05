import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { ArrowUpRight } from 'lucide-react';

const Arrow = () => (
  <span className="arw"><ArrowUpRight size={13} strokeWidth={2.5} /></span>
);

export default function RelatedNews({ relatedPage }) {
  const [news, setNews] = useState([]);
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://auxosys-backend.vercel.app'}/news?relatedPage=${relatedPage}`)
      .then(r => r.json())
      .then(response => {
        if (response.success && Array.isArray(response.data)) {
          setNews(response.data.slice(0, 3));
        } else if (Array.isArray(response)) {
          setNews(response.slice(0, 3));
        }
      })
      .catch(console.error);
  }, [relatedPage]);

  if (!news.length) return null;

  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <div className="eyebrow">News & Updates</div>
          <h2>Related Insights</h2>
        </Reveal>
        <Reveal>
          <style>{`
            .rn-card.card--dark .rn-pill {
              background: rgba(255,255,255,0.1);
            }
            .rn-card.card--dark:hover .rn-pill {
              background: rgba(12, 128, 116, 0.1) !important;
              color: #0C8074 !important;
            }
            .rn-card.card--dark:hover .rn-date {
              color: #475569 !important;
            }
            .rn-card.card--dark .rn-link {
              color: #fff;
            }
            .rn-card.card--dark .rn-link .arw {
              background: #0C8074;
              color: #fff;
            }
            .rn-card.card--dark:hover .rn-link {
              color: #0C8074 !important;
            }
            .rn-card.card--dark:hover .rn-link .arw {
              background: #0C8074 !important;
            }
          `}</style>
          <div className="card-grid cols-2">
            {news.map(item => {
              const dateStr = item.published_at || item.created_at;
              const formattedDate = dateStr ? new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'}) : '';
              return (
                <Link href={`/news/${item.slug}`} key={item.id || item.slug} className="card card--dark rn-card" style={{
                  padding: 0, display: 'flex', flexDirection: 'row', overflow: 'hidden', textDecoration: 'none'
                }}>
                  <div style={{ flex: '1 1 50%', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                    <span className="rn-pill" style={{ 
                      color: 'inherit', padding: '4px 12px', 
                      borderRadius: '100px', fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.05em',
                      textTransform: 'uppercase', alignSelf: 'flex-start', marginBottom: '16px',
                      transition: 'all 0.3s ease'
                    }}>
                      {item.category || 'BLOG'}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', lineHeight: 1.3 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', marginBottom: '20px', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.excerpt}
                    </p>
                    <div className="rn-date" style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', marginBottom: '16px', alignItems: 'center', opacity: 0.8, transition: 'color 0.3s ease' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        {formattedDate}
                      </span>
                    </div>
                    <span className="card-link rn-link" style={{ fontSize: '0.9rem', margin: 0, marginTop: 'auto' }}>
                      Read More <Arrow />
                    </span>
                  </div>
                  <div className="card-media" style={{ flex: '1 1 50%', position: 'relative', margin: 0, aspectRatio: 'auto', background: 'transparent' }}>
                    {(item.image || item.featured_image_url) ? (
                      <img src={item.image || item.featured_image_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                    ) : null}
                  </div>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
