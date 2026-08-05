import React, { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  // States for preferences (Necessary is always true)
  const [analytics, setAnalytics] = useState(false);
  const [functional, setFunctional] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [checkedCategories, setCheckedCategories] = useState({
    Necessary: true, // Always true
    Analytics: false,
    Marketing: false,
    Preferences: false,
  });
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';
        const API_URL = process.env.NEXT_PUBLIC_API_URL || (isLocal ? 'http://localhost:5002' : 'https://auxosys-backend.vercel.app');
        const res = await fetch(`${API_URL}/cookies/config`);
        const data = await res.json();
        if (data.success && data.data && data.data.config) {
          const fetchedTheme = data.data.config.theme || 'light';
          if (fetchedTheme === 'auto') {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(isDark ? 'dark' : 'light');
          } else {
            setTheme(fetchedTheme);
          }
        }
      } catch (err) {
        console.error('Error fetching cookie banner config', err);
      }
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    // Check if consent has already been given locally
    const consent = localStorage.getItem('auxosys_cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }

    // Listen for events to reopen banner
    const handleOpenSettings = () => setShowPreferences(true);
    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
  }, []);

  const calculateBitmask = (a, f, m) => {
    let mask = 1; // Necessary (1)
    if (a) mask |= 2; // Analytics (2)
    if (f) mask |= 4; // Functional (4)
    if (m) mask |= 8; // Marketing (8)
    return mask;
  };

  const applyConsent = async (a, f, m) => {
    setShowBanner(false);
    setShowPreferences(false);

    const bitmask = calculateBitmask(a, f, m);

    // Save locally
    localStorage.setItem('auxosys_cookie_consent', JSON.stringify({
      categories: bitmask,
      timestamp: new Date().toISOString()
    }));

    // Generate pseudo IDs for tracking (in a real app, generate securely)
    let visitorId = localStorage.getItem('aux_vid');
    if (!visitorId) {
      visitorId = 'AUXVIS' + Math.random().toString(36).substr(2, 9).toUpperCase();
      localStorage.setItem('aux_vid', visitorId);
    }

    let sessionId = sessionStorage.getItem('aux_sid');
    if (!sessionId) {
      sessionId = 'AUXSES' + Math.random().toString(36).substr(2, 9).toUpperCase();
      sessionStorage.setItem('aux_sid', sessionId);
    }

    // Push to Google Tag Manager Data Layer (Consent Mode v2)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'cookie_consent_update',
      analytics_storage: a ? 'granted' : 'denied',
      ad_storage: m ? 'granted' : 'denied',
      ad_user_data: m ? 'granted' : 'denied',
      ad_personalization: m ? 'granted' : 'denied',
      functionality_storage: f ? 'granted' : 'denied'
    });

    // Collect UTM parameters
    const urlParams = new URLSearchParams(window.location.search);
    const utm_source = urlParams.get('utm_source') || null;
    const utm_medium = urlParams.get('utm_medium') || null;
    const utm_campaign = urlParams.get('utm_campaign') || null;
    
    // Fetch Country Code (Silent fallback if fails)
    let country_code = 'Unknown';
    try {
      const geoRes = await fetch('https://get.geojs.io/v1/ip/country.json');
      if (geoRes.ok) {
        const geoData = await geoRes.json();
        country_code = geoData.country; // returns 2-letter ISO code
      }
    } catch (e) { console.error('Geo fetch failed', e); }

    // Send to Backend
    try {
      const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';
      const API_URL = process.env.NEXT_PUBLIC_API_URL || (isLocal ? 'http://localhost:5002' : 'https://auxosys-backend.vercel.app');
      await fetch(`${API_URL}/cookies/consent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consent_id: 'AUXCON' + Math.random().toString(36).substr(2, 9).toUpperCase(), // Should ideally be stable per consent session
          visitor_id: visitorId,
          session_id: sessionId,
          categories: bitmask,
          status: 1, // Active
          country_code: country_code,
          device_type: window.innerWidth > 1024 ? 'desktop' : window.innerWidth > 768 ? 'tablet' : 'mobile',
          page_slug: window.location.pathname,
          referrer: document.referrer,
          utm_source,
          utm_medium,
          utm_campaign,
          consent_version: 'v1.0'
        })
      });
    } catch (err) {
      console.error('Failed to sync consent with backend:', err);
    }
  };

  const handleAcceptAll = () => applyConsent(true, true, true);
  const handleRejectAll = () => applyConsent(false, false, false);
  const handleSavePreferences = () => applyConsent(analytics, functional, marketing);

  if (!showBanner && !showPreferences) return null;

  const Toggle = ({ checked, onChange }) => (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="track" />
      <span className="thumb" />
    </label>
  );

  return (
    <>
      <style jsx>{`
        .cookie-wrap {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: flex-end; justify-content: flex-end;
          padding: 24px;
          padding-bottom: max(24px, env(safe-area-inset-bottom));
          pointer-events: none;
        }
        .cookie-overlay {
          position: fixed; inset: 0;
          background: rgba(14,27,33,0.4);
          backdrop-filter: blur(4px);
          pointer-events: auto;
        }
        .cookie-card {
          position: relative;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(231, 236, 236, 0.8);
          border-radius: 16px;
          box-shadow: 0 24px 60px -18px rgba(14,27,33,0.25);
          width: 100%;
          max-width: 880px;
          overflow: hidden;
          pointer-events: auto;
          transition: transform 0.35s ease, opacity 0.35s ease;
          transform: translateY(24px);
          opacity: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .cookie-card.visible { transform: translateY(0); opacity: 1; }
        .cookie-card.modal { max-width: 640px; margin: auto; z-index: 10; border-radius: 20px; background: #FFFFFF; }

        .banner-body { 
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
        }
        .banner-content {
          flex: 1;
        }
        .banner-head { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
        .banner-icon {
          width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
          background: rgba(15,181,166,0.1); color: #0FB5A6;
          display: flex; align-items: center; justify-content: center;
        }
        .banner-head h2 { font-size: 16px; font-weight: 800; color: #0E1B21; margin: 0; letter-spacing: -0.01em; }
        .banner-content p { font-size: 13.5px; color: #56656B; line-height: 1.5; margin: 0; }
        .banner-content p strong { color: #0E1B21; font-weight: 700; }
        .cookie-link { display: inline-block; margin-left: 6px; color: #0FB5A6; font-weight: 700; text-decoration: none; white-space: nowrap; }
        .cookie-link:hover { text-decoration: underline; }

        .banner-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        
        .btn-primary {
          background: #0E1B21; color: #FFFFFF;
          padding: 11px 24px; border-radius: 10px; border: none;
          font-size: 14px; font-weight: 700; cursor: pointer;
          transition: background 0.15s ease;
          white-space: nowrap;
        }
        .btn-primary:hover { background: #14232A; }
        .btn-secondary {
          background: #F5F8F8; border: 1px solid #E7ECEC; color: #10201F;
          padding: 10px 18px; border-radius: 10px; font-size: 13.5px; font-weight: 600;
          cursor: pointer; transition: background 0.15s ease, border-color 0.15s ease;
          white-space: nowrap;
        }
        .btn-secondary:hover { background: #E7ECEC; }
        .btn-secondary.outline { background: #FFFFFF; border-color: #D8E0E0; }
        .btn-secondary.outline:hover { background: #F5F8F8; border-color: #0FB5A6; }

        /* ── Preferences modal ── */
        .modal-inner { display: flex; flex-direction: column; max-height: 85vh; }
        .modal-header {
          padding: 22px 26px; border-bottom: 1px solid #E7ECEC; background: #F5F8F8;
          display: flex; align-items: center; justify-content: space-between;
        }
        .modal-header h2 { font-size: 19px; font-weight: 800; color: #0E1B21; margin: 0; }
        .modal-close {
          background: none; border: none; color: #7C8A8F; cursor: pointer;
          width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
          border-radius: 8px; transition: background 0.15s ease, color 0.15s ease;
        }
        .modal-close:hover { background: #E7ECEC; color: #0E1B21; }

        .modal-body { padding: 24px 26px; overflow-y: auto; }
        .modal-intro { font-size: 13.5px; color: #56656B; line-height: 1.6; margin: 0 0 20px; }

        .category-row {
          display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;
          padding: 18px 0; border-top: 1px solid #E7ECEC;
        }
        .category-row:first-of-type { border-top: none; padding-top: 0; }
        .category-row h3 { font-size: 14.5px; font-weight: 700; color: #0E1B21; margin: 0 0 4px; }
        .category-row p { font-size: 12.5px; color: #7C8A8F; line-height: 1.55; margin: 0; }
        .always-active { font-size: 12.5px; font-weight: 700; color: #0FB5A6; white-space: nowrap; margin-top: 2px; }

        .toggle { position: relative; display: inline-block; width: 42px; height: 24px; flex-shrink: 0; margin-top: 2px; cursor: pointer; }
        .toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
        .toggle .track { position: absolute; inset: 0; background: #E7ECEC; border-radius: 999px; transition: background 0.15s ease; }
        .toggle input:checked + .track { background: #0FB5A6; }
        .toggle .thumb { position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; background: #FFFFFF; border-radius: 50%; transition: transform 0.15s ease; box-shadow: 0 1px 3px rgba(14,27,33,0.25); }
        .toggle input:checked ~ .thumb { transform: translateX(18px); }

        .modal-footer { padding: 22px 26px; border-top: 1px solid #E7ECEC; background: #F5F8F8; }
        .modal-footer .btn-primary { width: 100%; padding: 14px; font-size: 15px; border-radius: 12px; }

        @media (max-width: 768px) {
          .banner-body { flex-direction: column; align-items: stretch; gap: 20px; }
          .banner-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
          .btn-primary { grid-column: span 2; }
          .cookie-card { max-width: 100%; border-radius: 20px; }
          .cookie-wrap { padding: 16px; }
        }

        /* ── Dark Theme Overrides ── */
        .theme-dark { background: rgba(14, 27, 33, 0.98); border-color: #2A3A41; }
        .theme-dark .banner-head h2, .theme-dark .banner-content p strong { color: #FFFFFF; }
        .theme-dark .banner-content p { color: #A0ABB0; }
        .theme-dark .btn-primary { background: #0FB5A6; color: #FFFFFF; }
        .theme-dark .btn-primary:hover { background: #0D9F91; box-shadow: 0 10px 30px -8px rgba(15, 181, 166, 0.5); }
        .theme-dark .btn-secondary { background: #1A2E35; border-color: #2A3A41; color: #E7ECEC; }
        .theme-dark .btn-secondary:hover { background: #233B44; }
        .theme-dark .btn-secondary.outline { background: #1A2E35 !important; border: 1px solid #2A3A41 !important; color: #E7ECEC !important; }
        .theme-dark .btn-secondary.outline:hover { background: #233B44 !important; border: 1px solid #2A3A41 !important; }
        .theme-dark.modal { background: #0E1B21; }
        .theme-dark .modal-header, .theme-dark .modal-footer { background: #14232A; border-color: #2A3A41; }
        .theme-dark .modal-header h2, .theme-dark .category-row h3 { color: #FFFFFF; }
        .theme-dark .modal-intro, .theme-dark .category-row p { color: #A0ABB0; }
        .theme-dark .category-row { border-color: #2A3A41; }
        .theme-dark .toggle .track { background: #2A3A41; }
        .theme-dark .toggle .thumb { background: #A0ABB0; box-shadow: none; }
        .theme-dark .toggle input:checked + .track { background: #0FB5A6; }
        .theme-dark .toggle input:checked ~ .thumb { background: #FFFFFF; }
        .theme-dark .modal-close:hover { background: #2A3A41; color: #FFFFFF; }
      `}</style>

      <div className="cookie-wrap">
        {showPreferences && (
          <div className="cookie-overlay" onClick={() => setShowPreferences(false)} />
        )}

        <div className={`cookie-card theme-${theme} ${showBanner || showPreferences ? 'visible' : ''} ${showPreferences ? 'modal' : ''}`}>

          {/* Main Banner View */}
          {!showPreferences && (
            <div className="banner-body">
              <div className="banner-content">
                <div className="banner-head">
                  <div className="banner-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                      <path d="M8.5 8.5v.01" />
                      <path d="M16 15.5v.01" />
                      <path d="M12 12v.01" />
                      <path d="M11 17v.01" />
                      <path d="M7 14v.01" />
                    </svg>
                  </div>
                  <h2>Your privacy matters</h2>
                </div>

                <p>
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking <strong style={{ whiteSpace: 'nowrap' }}>&quot;Accept All&quot;</strong>, you consent to our use of cookies.
                  <a href="/legal/CookiePolicy" className="cookie-link">Read our Cookie Policy</a>
                </p>
              </div>

              <div className="banner-actions">
                <button className="btn-secondary" onClick={handleRejectAll}>Reject All</button>
                <button className="btn-secondary outline" onClick={() => setShowPreferences(true)}>Customize</button>
                <button className="btn-primary" onClick={handleAcceptAll}>Accept All</button>
              </div>
            </div>
          )}

          {/* Preferences Modal View */}
          {showPreferences && (
            <div className="modal-inner">
              <div className="modal-header">
                <h2>Cookie Preferences</h2>
                <button
                  className="modal-close"
                  onClick={() => { setShowPreferences(false); if (!localStorage.getItem('auxosys_cookie_consent')) setShowBanner(true); }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="modal-body">
                <p className="modal-intro">
                  You can choose which cookie categories you want to allow. Please note that changing your settings may impact how our website functions.
                </p>

                <div className="category-row">
                  <div>
                    <h3>Strictly Necessary</h3>
                    <p>Essential for the website to function securely. Cannot be disabled.</p>
                  </div>
                  <div className="always-active">Always Active</div>
                </div>

                <div className="category-row">
                  <div>
                    <h3>Analytics</h3>
                    <p>Helps us understand how visitors interact with the website to improve user experience.</p>
                  </div>
                  <Toggle checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
                </div>

                <div className="category-row">
                  <div>
                    <h3>Functional</h3>
                    <p>Enables enhanced functionality and personalization, such as remembering your language.</p>
                  </div>
                  <Toggle checked={functional} onChange={(e) => setFunctional(e.target.checked)} />
                </div>

                <div className="category-row">
                  <div>
                    <h3>Marketing</h3>
                    <p>Used to track visitors across websites for relevant advertising and marketing purposes.</p>
                  </div>
                  <Toggle checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-primary" onClick={handleSavePreferences}>
                  Save My Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CookieBanner;