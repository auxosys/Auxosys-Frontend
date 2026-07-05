"use client";
import React from 'react';
import Link from 'next/link';
import LegalTemplate from '../../components/templates/LegalTemplate';

export default function TermsAndConditions() {
  const content = (
    <>
      <h2>Introduction</h2>
      <p>
        By submitting an application through the <strong>Auxosys Careers Portal</strong>, you agree to the following Terms & Conditions.
      </p>

      <h2>Eligibility</h2>
      <p>
        Applicants must provide genuine and accurate information throughout the recruitment process.
      </p>

      <h2>Application Submission</h2>
      <p>Submitting an application does not guarantee:</p>
      <ul>
        <li>Employment or Internship selection</li>
        <li>Interview invitation or Offer of employment</li>
      </ul>
      <p>
        Selection decisions are made based on business requirements and candidate suitability.
      </p>

      <h2>Accuracy of Information</h2>
      <p>
        Applicants certify that all information submitted is true and complete.
      </p>
      <p>
        Auxosys reserves the right to reject applications containing false, misleading, or fraudulent information.
      </p>

      <h2>Recruitment Process</h2>
      <p>The recruitment process may include:</p>
      <ul>
        <li>Resume Screening & Technical Assessment</li>
        <li>Assignment or Coding Test</li>
        <li>HR, Technical, and Final Interviews</li>
        <li>Background Verification (where applicable)</li>
      </ul>
      <p>
        Auxosys may modify the recruitment process at its discretion.
      </p>

      <h2>Confidentiality</h2>
      <p>
        Any assessment materials, interview questions, technical assignments, documents, or communication shared during the recruitment process remain the intellectual property of Auxosys.
      </p>
      <p>
        Applicants must not copy, distribute, publish, or disclose these materials without written permission.
      </p>

      <h2>Internship Applicants</h2>
      <p>
        Internship opportunities are intended for learning and skill development.
      </p>
      <p>
        Stipends, project assignments, duration, certificates, and potential full-time opportunities are subject to individual internship programs and business requirements.
      </p>

      <h2>Employment Offers</h2>
      <p>Any employment or internship offer becomes valid only after:</p>
      <ul>
        <li>Successful completion of the recruitment process</li>
        <li>Required document verification</li>
        <li>Acceptance of the official offer letter</li>
        <li>Compliance with company policies</li>
      </ul>

      <h2>Withdrawal of Application</h2>
      <p>
        Applicants may withdraw their application at any time before an offer is accepted by contacting the recruitment team.
      </p>

      <h2>Data Usage</h2>
      <p>
        By submitting an application, you consent to Auxosys processing your information for recruitment purposes in accordance with the <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>Limitation of Liability</h2>
      <p>Auxosys is not responsible for:</p>
      <ul>
        <li>Internet connectivity issues or technical errors during submission</li>
        <li>Delayed applications caused by external factors</li>
        <li>Third-party service interruptions</li>
      </ul>
      <p>
        Applicants are encouraged to verify that their application has been successfully submitted.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content, branding, logos, website design, software, and recruitment materials displayed on the Auxosys Careers Portal remain the exclusive property of Auxosys.
      </p>
      <p>Unauthorized use is prohibited.</p>

      <h2>Right to Modify</h2>
      <p>Auxosys reserves the right to:</p>
      <ul>
        <li>Modify recruitment requirements or cancel vacancies</li>
        <li>Extend or close application deadlines</li>
        <li>Update these Terms & Conditions without prior notice</li>
      </ul>

      <h2>Governing Law</h2>
      <p>
        These Terms & Conditions shall be governed by the laws of <strong>India</strong>, and any disputes shall be subject to the jurisdiction of the competent courts where Auxosys operates.
      </p>

      <h2>Contact Information</h2>
      <p>
        <strong>Recruitment Team</strong><br/>
        <a href="mailto:careers@auxosys.com">careers@auxosys.com</a>
      </p>
      <p>
        <strong>Privacy-related requests</strong><br/>
        <a href="mailto:privacy@auxosys.com">privacy@auxosys.com</a>
      </p>

      <h2>Applicant Consent</h2>
      <p>By checking the consent box and submitting your application, you confirm that:</p>
      <ul>
        <li>You have read and understood the Privacy Policy.</li>
        <li>You agree to the Terms & Conditions.</li>
        <li>The information provided is accurate and complete.</li>
        <li>You consent to Auxosys processing your personal data for recruitment purposes.</li>
        <li>You understand that submitting an application does not guarantee employment or an interview.</li>
      </ul>
    </>
  );

  return (
    <LegalTemplate 
      title="Career Terms & Conditions"
      subtitle="The terms and rules you agree to when applying for a position at Auxosys."
      lastUpdated="January 2026"
      content={content}
      backFallback="/careers"
    />
  );
}
