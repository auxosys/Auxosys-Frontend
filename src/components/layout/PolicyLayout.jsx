"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import DOMPurify from 'dompurify';

export default function PolicyLayout({
  title,
  subtitle,
  lastUpdated,
  content,
  backFallback = "/careers"
}) {
  const router = useRouter();

  const handleBack = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(backFallback);
    }
  };

  return (
    <div className="policy-layout-wrapper font-sans min-h-screen">
      <style>{`
        .policy-layout-wrapper {
          background: linear-gradient(to bottom, #071321, #0D1D36);
          color: #F8FAFC;
        }

        .policy-container {
          margin: 0 auto;
          max-width: 1180px;
          padding: 80px 32px 80px 32px;
        }

        @media (max-width: 900px) {
          .policy-container {
            max-width: 900px;
            padding: 40px 24px 80px 24px;
          }
        }

        @media (max-width: 600px) {
          .policy-container {
            padding: 20px 20px 80px 20px;
          }
        }

        .policy-hero {
          text-align: center;
          margin-bottom: 40px;
          padding-top: 40px;
        }

        .policy-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #7f93a3;
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 24px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: transparent;
          border: none;
          padding: 0;
        }
        .policy-back-btn:hover {
          color: #ff5a00;
          transform: translateX(-4px);
        }

        .policy-title {
          font-size: 48px;
          font-weight: 700;
          line-height: 1.1;
          margin: 0 0 16px;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        @media (max-width: 900px) {
          .policy-title { font-size: 40px; }
        }
        @media (max-width: 600px) {
          .policy-title { font-size: 32px; }
        }

        .policy-subtitle {
          font-size: 18px;
          color: #AEB8C7;
          margin-bottom: 12px;
          max-width: 700px;
          margin-inline: auto;
        }

        .policy-date {
          font-size: 14px;
          color: #7f93a3;
          font-weight: 500;
        }

        .policy-single-card {
          background: #13233E;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 28px;
          padding: 48px;
          margin: 0 auto;
          max-width: 900px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 600px) {
          .policy-single-card {
            padding: 24px;
            border-radius: 20px;
          }
        }

        /* ── TYPOGRAPHY INSIDE CARD ── */
        .policy-single-card h2 {
          font-size: 28px;
          font-weight: 700;
          color: #f8fafc;
          letter-spacing: -0.01em;
          margin: 48px 0 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .policy-single-card h2:first-child {
          margin-top: 0;
        }

        .policy-single-card h3 {
          font-size: 20px;
          font-weight: 600;
          color: #ffffff;
          margin: 32px 0 16px;
        }

        .policy-single-card p {
          font-size: 18px;
          line-height: 1.8;
          color: #AEB8C7;
          margin-bottom: 24px;
        }

        .policy-single-card strong, .policy-single-card b {
          color: #ffffff;
          font-weight: 700;
        }

        .policy-single-card a {
          color: #5CC9D6;
          text-decoration: none;
          font-weight: 600;
          transition: opacity 0.2s;
        }
        .policy-single-card a:hover {
          text-decoration: underline;
        }

        .policy-single-card ul {
          list-style: none;
          padding: 0;
          margin: 0 0 32px 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .policy-single-card li {
          font-size: 18px;
          line-height: 1.6;
          color: #AEB8C7;
          position: relative;
          padding-left: 28px;
        }

        .policy-single-card li::before {
          content: "✓";
          position: absolute;
          left: 0;
          top: 0px;
          color: #5CC9D6;
          font-weight: bold;
          font-size: 18px;
        }
      `}</style>

      <div className="policy-container">
        
        {/* HERO */}
        <div className="policy-hero">
          <button onClick={handleBack} className="policy-back-btn">
            <ArrowLeft size={16} strokeWidth={2.5} />
            Back to Application
          </button>
          
          <h1 className="policy-title">{title}</h1>
          
          {subtitle && <p className="policy-subtitle">{subtitle}</p>}
          
          {lastUpdated && (
            <div className="policy-date mt-6">
              Last Updated: <strong className="text-white">{lastUpdated}</strong>
            </div>
          )}
        </div>

        {/* SINGLE CONTENT CARD */}
        <div className="policy-single-card">
          {/* Handle React components OR raw HTML strings */}
          {typeof content === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: typeof window !== 'undefined' ? DOMPurify.sanitize(content) : content }} />
          ) : (
            content
          )}
        </div>

      </div>
    </div>
  );
}
