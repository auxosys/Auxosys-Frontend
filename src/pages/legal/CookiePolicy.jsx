import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const CookiePolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-20 mt-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
        <p className="text-gray-500 mb-8 font-medium">Last Updated: August 5, 2026 | Effective Date: August 5, 2026</p>

        <div className="bg-white p-8 rounded-2xl shadow-sm border space-y-8 text-gray-700 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              Auxosys ("we", "us", or "our") uses cookies and similar tracking technologies on our website. This Cookie Policy explains what these technologies are, why we use them, and your rights to control our use of them. This policy is part of our commitment to compliance with the DPDP Act 2023, GDPR, and CCPA.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. What are Cookies?</h2>
            <p>
              Cookies are small data files placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide reporting information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
            
            <div className="space-y-6 mt-4">
              <div className="border-l-4 border-[#0fb5a6] pl-4">
                <h3 className="text-lg font-bold text-gray-900">Strictly Necessary Cookies</h3>
                <p className="mt-2 text-sm text-gray-600">
                  These cookies are essential for you to browse the website and use its features, such as accessing secure areas. The website cannot function properly without these cookies.
                </p>
                <div className="mt-2 text-xs bg-gray-50 p-2 rounded inline-block">
                  <span className="font-semibold text-gray-900">Always Active</span>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-bold text-gray-900">Analytics & Performance Cookies</h3>
                <p className="mt-2 text-sm text-gray-600">
                  These cookies collect information about how you use a website, like which pages you visited and which links you clicked on. None of this information can be used to identify you. It is all aggregated and, therefore, anonymized.
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  Examples: Google Analytics 4, Microsoft Clarity
                </div>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg font-bold text-gray-900">Functional Cookies</h3>
                <p className="mt-2 text-sm text-gray-600">
                  These cookies allow a website to remember choices you have made in the past, like what language you prefer or what region you log in to.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-bold text-gray-900">Marketing & Targeting Cookies</h3>
                <p className="mt-2 text-sm text-gray-600">
                  These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad. These cookies can share that information with other organizations or advertisers.
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  Examples: Meta Pixel, Google Ads, LinkedIn Insight
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Managing Your Preferences</h2>
            <p className="mb-4">
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in our Cookie Consent Banner.
            </p>
            <button 
              onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
              className="px-6 py-2 bg-[#0fb5a6] text-white rounded-lg font-medium hover:bg-teal-600 transition-colors"
            >
              Manage Cookie Preferences
            </button>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please email us at <a href="mailto:privacy@auxosys.com" className="text-[#0fb5a6] hover:underline">privacy@auxosys.com</a>.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
