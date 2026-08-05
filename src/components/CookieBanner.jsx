import React, { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  // States for preferences (Necessary is always true)
  const [analytics, setAnalytics] = useState(false);
  const [functional, setFunctional] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    // Check if consent has already been given locally
    const consent = localStorage.getItem('auxosys_cookie_consent');
    if (!consent) {
      // Small delay for better UX (don't flash immediately)
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
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

    // Send to Backend
    try {
      await fetch('http://localhost:5002/cookies/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consent_id: 'AUXCON' + Math.random().toString(36).substr(2, 9).toUpperCase(), // Should ideally be stable per consent session
          visitor_id: visitorId,
          session_id: sessionId,
          categories: bitmask,
          status: 1, // Active
          device_type: window.innerWidth > 1024 ? 'desktop' : window.innerWidth > 768 ? 'tablet' : 'mobile',
          page_slug: window.location.pathname,
          referrer: document.referrer,
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

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:p-6 pb-12 sm:pb-6 pointer-events-none">
      
      {/* Dim overlay for preferences modal */}
      {showPreferences && <div className="fixed inset-0 bg-black/50 pointer-events-auto backdrop-blur-sm transition-opacity" onClick={() => setShowPreferences(false)}></div>}

      <div className={`bg-white shadow-2xl rounded-2xl w-full max-w-2xl overflow-hidden pointer-events-auto border border-gray-100 transition-all duration-500 ease-out transform ${showBanner || showPreferences ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${showPreferences ? 'relative z-10 my-auto' : ''}`}>
        
        {/* Main Banner View */}
        {!showPreferences && (
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">We value your privacy</h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies in accordance with our <a href="/cookie-policy" className="text-[#0fb5a6] hover:underline font-medium">Cookie Policy</a>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleAcceptAll}
                className="flex-1 bg-[#0fb5a6] text-white py-2.5 rounded-xl font-semibold hover:bg-teal-600 transition-colors shadow-sm"
              >
                Accept All
              </button>
              <button 
                onClick={handleRejectAll}
                className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Reject All
              </button>
              <button 
                onClick={() => setShowPreferences(true)}
                className="flex-1 border-2 border-gray-200 text-gray-700 py-2.5 rounded-xl font-semibold hover:border-gray-300 transition-colors"
              >
                Customize
              </button>
            </div>
          </div>
        )}

        {/* Preferences Modal View */}
        {showPreferences && (
          <div className="flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center sticky top-0">
              <h2 className="text-xl font-bold text-gray-900">Cookie Preferences</h2>
              <button onClick={() => { setShowPreferences(false); if(!localStorage.getItem('auxosys_cookie_consent')) setShowBanner(true); }} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <p className="text-sm text-gray-600 mb-4">
                You can choose which cookie categories you want to allow. Please note that changing your settings may impact how our website functions.
              </p>

              {/* Necessary */}
              <div className="flex items-start justify-between">
                <div className="pr-4">
                  <h3 className="font-semibold text-gray-900 text-base">Strictly Necessary</h3>
                  <p className="text-sm text-gray-500 mt-1">Essential for the website to function securely. Cannot be disabled.</p>
                </div>
                <div className="text-[#0fb5a6] text-sm font-semibold whitespace-nowrap mt-1">Always Active</div>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between border-t border-gray-100 pt-6">
                <div className="pr-4">
                  <h3 className="font-semibold text-gray-900 text-base">Analytics</h3>
                  <p className="text-sm text-gray-500 mt-1">Helps us understand how visitors interact with the website to improve user experience.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer mt-1">
                  <input type="checkbox" className="sr-only peer" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0fb5a6]"></div>
                </label>
              </div>

              {/* Functional */}
              <div className="flex items-start justify-between border-t border-gray-100 pt-6">
                <div className="pr-4">
                  <h3 className="font-semibold text-gray-900 text-base">Functional</h3>
                  <p className="text-sm text-gray-500 mt-1">Enables enhanced functionality and personalization, such as remembering your language.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer mt-1">
                  <input type="checkbox" className="sr-only peer" checked={functional} onChange={(e) => setFunctional(e.target.checked)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0fb5a6]"></div>
                </label>
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between border-t border-gray-100 pt-6">
                <div className="pr-4">
                  <h3 className="font-semibold text-gray-900 text-base">Marketing</h3>
                  <p className="text-sm text-gray-500 mt-1">Used to track visitors across websites for relevant advertising and marketing purposes.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer mt-1">
                  <input type="checkbox" className="sr-only peer" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0fb5a6]"></div>
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 sticky bottom-0">
              <button 
                onClick={handleSavePreferences}
                className="w-full bg-[#0fb5a6] text-white py-3 rounded-xl font-bold hover:bg-teal-600 transition-colors shadow-md text-lg"
              >
                Save My Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;
