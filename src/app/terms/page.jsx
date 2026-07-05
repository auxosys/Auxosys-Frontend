import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | Auxosys Careers',
  description: 'Terms & Conditions for Job & Internship Applicants at Auxosys',
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 py-16 px-6 sm:px-12 font-sans selection:bg-[#ff5a00] selection:text-[#0a0a0a]">
      <div className="max-w-3xl mx-auto bg-[#141414] border border-[#2a2a2a] rounded-2xl p-8 md:p-12 shadow-2xl">
        <Link href="/careers" className="inline-flex items-center gap-2 text-[#ff5a00] hover:text-[#d94d00] transition-colors font-semibold text-sm mb-12">
          <ArrowLeft size={16} />
          Back to Careers
        </Link>
        
        <header className="mb-12 border-b border-[#2a2a2a] pb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Terms & Conditions for Job & Internship Applicants</h1>
          <p className="text-gray-400 text-sm font-medium">Last Updated: January 2026</p>
        </header>

        <div className="space-y-10 text-[15px] leading-relaxed">
          <section>
            <p className="mb-6 text-gray-300">
              By submitting an application through the <strong className="text-white">Auxosys Careers Portal</strong>, you agree to the following Terms & Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#ff5a00]">1.</span> Eligibility
            </h2>
            <p className="text-gray-400">
              Applicants must provide genuine and accurate information throughout the recruitment process.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#ff5a00]">2.</span> Application Submission
            </h2>
            <p className="mb-3">Submitting an application does not guarantee:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400 marker:text-[#ff5a00]">
              <li>Employment</li>
              <li>Internship selection</li>
              <li>Interview invitation</li>
              <li>Offer of employment</li>
            </ul>
            <p className="mt-4 text-gray-400">
              Selection decisions are made based on business requirements and candidate suitability.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#ff5a00]">3.</span> Accuracy of Information
            </h2>
            <p className="mb-4">
              Applicants certify that all information submitted is true and complete.
            </p>
            <p className="text-gray-400">
              Auxosys reserves the right to reject applications containing false, misleading, or fraudulent information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#ff5a00]">4.</span> Recruitment Process
            </h2>
            <p className="mb-3">The recruitment process may include:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400 marker:text-[#ff5a00]">
              <li>Resume Screening</li>
              <li>Technical Assessment</li>
              <li>Assignment or Coding Test</li>
              <li>HR Interview</li>
              <li>Technical Interview</li>
              <li>Final Interview</li>
              <li>Background Verification (where applicable)</li>
            </ul>
            <p className="mt-4 text-gray-400">
              Auxosys may modify the recruitment process at its discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#ff5a00]">5.</span> Confidentiality
            </h2>
            <p className="mb-4">
              Any assessment materials, interview questions, technical assignments, documents, or communication shared during the recruitment process remain the intellectual property of Auxosys.
            </p>
            <p className="text-gray-400">
              Applicants must not copy, distribute, publish, or disclose these materials without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#ff5a00]">6.</span> Internship Applicants
            </h2>
            <p className="mb-4">
              Internship opportunities are intended for learning and skill development.
            </p>
            <p className="text-gray-400">
              Stipends, project assignments, duration, certificates, and potential full-time opportunities are subject to individual internship programs and business requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#ff5a00]">7.</span> Employment Offers
            </h2>
            <p className="mb-3">Any employment or internship offer becomes valid only after:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400 marker:text-[#ff5a00]">
              <li>Successful completion of the recruitment process</li>
              <li>Required document verification</li>
              <li>Acceptance of the official offer letter</li>
              <li>Compliance with company policies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#ff5a00]">8.</span> Withdrawal of Application
            </h2>
            <p className="text-gray-400">
              Applicants may withdraw their application at any time before an offer is accepted by contacting the recruitment team.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#ff5a00]">9.</span> Data Usage
            </h2>
            <p className="text-gray-400">
              By submitting an application, you consent to Auxosys processing your information for recruitment purposes in accordance with the <Link href="/privacy" className="text-[#5cc9d6] hover:underline font-medium">Privacy Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#ff5a00]">10.</span> Limitation of Liability
            </h2>
            <p className="mb-3">Auxosys is not responsible for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400 marker:text-[#ff5a00]">
              <li>Internet connectivity issues</li>
              <li>Technical errors during submission</li>
              <li>Delayed applications caused by external factors</li>
              <li>Third-party service interruptions</li>
            </ul>
            <p className="mt-4 text-gray-400">
              Applicants are encouraged to verify that their application has been successfully submitted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#ff5a00]">11.</span> Intellectual Property
            </h2>
            <p className="mb-4">
              All content, branding, logos, website design, software, and recruitment materials displayed on the Auxosys Careers Portal remain the exclusive property of Auxosys.
            </p>
            <p className="text-gray-400">Unauthorized use is prohibited.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#ff5a00]">12.</span> Right to Modify
            </h2>
            <p className="mb-3">Auxosys reserves the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400 marker:text-[#ff5a00]">
              <li>Modify recruitment requirements</li>
              <li>Cancel vacancies</li>
              <li>Extend or close application deadlines</li>
              <li>Update these Terms & Conditions without prior notice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#ff5a00]">13.</span> Governing Law
            </h2>
            <p className="text-gray-400">
              These Terms & Conditions shall be governed by the laws of <strong className="text-white">India</strong>, and any disputes shall be subject to the jurisdiction of the competent courts where Auxosys operates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#ff5a00]">14.</span> Contact Information
            </h2>
            <div className="space-y-4 text-gray-400">
              <p>
                <strong className="text-gray-200 block mb-1">Recruitment Team</strong>
                📧 <a href="mailto:careers@auxosys.com" className="text-[#ff5a00] hover:underline font-medium">careers@auxosys.com</a>
              </p>
              <p>
                <strong className="text-gray-200 block mb-1">Privacy-related requests</strong>
                📧 <a href="mailto:privacy@auxosys.com" className="text-[#ff5a00] hover:underline font-medium">privacy@auxosys.com</a>
              </p>
            </div>
          </section>

          <section className="mt-12 p-6 bg-[#0a0a0a] rounded-xl border border-[#2a2a2a]">
            <h3 className="text-lg font-bold text-white mb-4">Applicant Consent</h3>
            <p className="mb-3 text-gray-400">By checking the consent box and submitting your application, you confirm that:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400 marker:text-[#ff5a00]">
              <li>You have read and understood the Privacy Policy.</li>
              <li>You agree to the Terms & Conditions.</li>
              <li>The information provided is accurate and complete.</li>
              <li>You consent to Auxosys processing your personal data for recruitment purposes.</li>
              <li>You understand that submitting an application does not guarantee employment or an interview.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
