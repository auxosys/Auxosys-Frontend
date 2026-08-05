import React from 'react';

const CookiePolicy = () => {
  return (
    <>
      <style jsx>{`
        .legal-container {
          background-color: #F5F8F8;
          min-height: 100vh;
          padding-top: 140px; /* Clears the fixed transparent Navbar */
          padding-bottom: 100px;
          font-family: var(--font-body, system-ui, sans-serif);
        }
        .legal-content {
          max-width: 800px;
          margin: 0 auto;
          background: #FFFFFF;
          padding: 56px 64px;
          border-radius: 24px;
          box-shadow: 0 24px 60px -18px rgba(14,27,33,0.08);
          border: 1px solid #E7ECEC;
        }
        .legal-title {
          font-size: 38px;
          font-weight: 800;
          color: #0E1B21;
          margin: 0 0 12px;
          font-family: var(--font-heading, system-ui, sans-serif);
          letter-spacing: -0.02em;
        }
        .legal-meta {
          color: #7C8A8F;
          font-size: 14.5px;
          margin: 0 0 48px;
          font-weight: 500;
        }
        .legal-section {
          margin-bottom: 40px;
        }
        .legal-section:last-child {
          margin-bottom: 0;
        }
        .legal-section h2 {
          font-size: 22px;
          font-weight: 700;
          color: #0E1B21;
          margin: 0 0 16px;
          font-family: var(--font-heading, system-ui, sans-serif);
        }
        .legal-section p {
          font-size: 15.5px;
          line-height: 1.7;
          color: #56656B;
          margin: 0 0 16px;
        }
        
        /* Cookie Type Cards */
        .cookie-type {
          padding: 20px 24px;
          border-radius: 16px;
          background: #F5F8F8;
          margin-bottom: 16px;
          border-left: 4px solid #E7ECEC;
        }
        .cookie-type.necessary { border-color: #0FB5A6; background: rgba(15,181,166,0.04); }
        .cookie-type.analytics { border-color: #3B82F6; }
        .cookie-type.functional { border-color: #F59E0B; }
        .cookie-type.marketing { border-color: #8B5CF6; }
        
        .cookie-type h3 {
          font-size: 16.5px;
          font-weight: 700;
          color: #0E1B21;
          margin: 0 0 8px;
        }
        .cookie-type p {
          font-size: 14.5px;
          margin: 0 0 12px;
          line-height: 1.6;
        }
        .cookie-meta {
          font-size: 12.5px;
          font-weight: 600;
          color: #7C8A8F;
          background: #FFFFFF;
          display: inline-block;
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid #E7ECEC;
        }
        .cookie-meta.always-active {
          color: #0FB5A6;
          border-color: rgba(15,181,166,0.25);
          background: rgba(15,181,166,0.05);
        }
        
        /* Button & Links */
        .btn-manage {
          display: inline-block;
          margin-top: 8px;
          padding: 14px 28px;
          background: #0E1B21;
          color: #FFFFFF;
          border-radius: 14px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          border: none;
          transition: background 0.2s ease, transform 0.1s ease;
        }
        .btn-manage:hover {
          background: #162932;
        }
        .btn-manage:active {
          transform: scale(0.98);
        }
        a.legal-link {
          color: #0FB5A6;
          text-decoration: none;
          font-weight: 600;
        }
        a.legal-link:hover {
          text-decoration: underline;
        }
        
        @media (max-width: 768px) {
          .legal-container { padding-top: 120px; padding-left: 16px; padding-right: 16px; }
          .legal-content { padding: 40px 24px; border-radius: 20px; }
          .legal-title { font-size: 30px; }
        }
      `}</style>
      
      <div className="legal-container">
        <div className="legal-content">
          <h1 className="legal-title">Cookie Policy</h1>
          <p className="legal-meta">Last Updated: August 5, 2026 | Effective Date: August 5, 2026</p>

          <div className="legal-section">
            <h2>1. Introduction</h2>
            <p>
              Auxosys ("we", "us", or "our") uses cookies and similar tracking technologies on our website. This Cookie Policy explains what these technologies are, why we use them, and your rights to control our use of them. This policy is part of our commitment to compliance with the DPDP Act 2023, GDPR, and CCPA.
            </p>
          </div>

          <div className="legal-section">
            <h2>2. What are Cookies?</h2>
            <p>
              Cookies are small data files placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide reporting information.
            </p>
          </div>

          <div className="legal-section">
            <h2>3. Types of Cookies We Use</h2>
            
            <div className="cookie-type necessary">
              <h3>Strictly Necessary Cookies</h3>
              <p>These cookies are essential for you to browse the website and use its features, such as accessing secure areas. The website cannot function properly without these cookies.</p>
              <span className="cookie-meta always-active">Always Active</span>
            </div>

            <div className="cookie-type analytics">
              <h3>Analytics & Performance Cookies</h3>
              <p>These cookies collect information about how you use a website, like which pages you visited and which links you clicked on. None of this information can be used to identify you.</p>
              <span className="cookie-meta">Examples: Google Analytics 4, Microsoft Clarity</span>
            </div>

            <div className="cookie-type functional">
              <h3>Functional Cookies</h3>
              <p>These cookies allow a website to remember choices you have made in the past, like what language you prefer or what region you log in to.</p>
            </div>

            <div className="cookie-type marketing">
              <h3>Marketing & Targeting Cookies</h3>
              <p>These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad. These cookies can share that information with other organizations or advertisers.</p>
              <span className="cookie-meta">Examples: Meta Pixel, Google Ads, LinkedIn Insight</span>
            </div>
          </div>

          <div className="legal-section">
            <h2>4. Managing Your Preferences</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in our Cookie Consent Banner.
            </p>
            <button 
              className="btn-manage"
              onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
            >
              Manage Cookie Preferences
            </button>
          </div>

          <div className="legal-section">
            <h2>5. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please email us at <a href="mailto:privacy@auxosys.com" className="legal-link">privacy@auxosys.com</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicy;
