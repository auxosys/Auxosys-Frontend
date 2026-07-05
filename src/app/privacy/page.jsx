import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Auxosys Careers',
  description: 'Privacy Policy for Job & Internship Applicants at Auxosys',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 py-16 px-6 sm:px-12 font-sans selection:bg-[#5cc9d6] selection:text-[#0a0a0a]">
      <div className="max-w-3xl mx-auto bg-[#141414] border border-[#2a2a2a] rounded-2xl p-8 md:p-12 shadow-2xl">
        <Link href="/careers" className="inline-flex items-center gap-2 text-[#5cc9d6] hover:text-[#4bb1be] transition-colors font-semibold text-sm mb-12">
          <ArrowLeft size={16} />
          Back to Careers
        </Link>
        
        <header className="mb-12 border-b border-[#2a2a2a] pb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Privacy Policy for Job & Internship Applicants</h1>
          <p className="text-gray-400 text-sm font-medium">Last Updated: January 2026</p>
        </header>

        <div className="space-y-10 text-[15px] leading-relaxed">
          <section>
            <p className="mb-6">
              At <strong className="text-white">Auxosys</strong>, we value your privacy and are committed to protecting the personal information you share during the recruitment process. This Privacy Policy explains how we collect, use, store, and protect your information when you apply for a job or internship with us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#5cc9d6]">1.</span> Information We Collect
            </h2>
            <p className="mb-4">During the application process, we may collect:</p>
            
            <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">Personal Information</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400 marker:text-[#5cc9d6]">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Residential Address (if applicable)</li>
              <li>Date of Birth (if required)</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">Professional Information</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400 marker:text-[#5cc9d6]">
              <li>Resume / CV</li>
              <li>Cover Letter</li>
              <li>Portfolio</li>
              <li>LinkedIn Profile</li>
              <li>GitHub Profile</li>
              <li>Personal Website</li>
              <li>Educational Qualifications</li>
              <li>Work Experience</li>
              <li>Skills & Certifications</li>
              <li>Projects and Achievements</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">Internship Applicants</h3>
            <p className="mb-3 text-gray-400">We may also collect:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400 marker:text-[#5cc9d6]">
              <li>College/University Name</li>
              <li>Degree</li>
              <li>Branch/Stream</li>
              <li>Current Semester/Year</li>
              <li>Graduation Year</li>
              <li>CGPA/Percentage</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">Additional Information</h3>
            <p className="text-gray-400">Any information voluntarily submitted through application forms, questionnaires, or interview processes.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#5cc9d6]">2.</span> Purpose of Data Collection
            </h2>
            <p className="mb-4">Your information is collected solely for recruitment-related purposes, including:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400 marker:text-[#5cc9d6]">
              <li>Reviewing applications</li>
              <li>Assessing qualifications</li>
              <li>Scheduling interviews</li>
              <li>Communicating recruitment updates</li>
              <li>Verifying information provided</li>
              <li>Evaluating candidates for current and future opportunities</li>
              <li>Maintaining recruitment records</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#5cc9d6]">3.</span> Data Storage & Security
            </h2>
            <p className="mb-4">
              Auxosys implements reasonable technical and organizational measures to protect applicant information from unauthorized access, disclosure, alteration, or destruction.
            </p>
            <p className="text-gray-400">
              Only authorized recruitment personnel and designated hiring managers have access to applicant data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#5cc9d6]">4.</span> Data Retention
            </h2>
            <p className="mb-4">
              Applicant information may be retained for future recruitment opportunities unless you request its removal.
            </p>
            <p className="text-gray-400">
              If you wish to have your information deleted, you may contact us at:{' '}
              <a href="mailto:careers@auxosys.com" className="text-[#ff5a00] hover:underline font-medium">careers@auxosys.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#5cc9d6]">5.</span> Sharing of Information
            </h2>
            <p className="mb-4">
              Auxosys does <strong className="text-white">not sell, rent, or trade</strong> applicant information.
            </p>
            <p className="mb-3 text-gray-400">Your information may only be shared with:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400 marker:text-[#5cc9d6]">
              <li>Internal hiring teams</li>
              <li>Authorized recruitment personnel</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#5cc9d6]">6.</span> Accuracy of Information
            </h2>
            <p className="mb-4">
              Applicants are responsible for ensuring that all submitted information is accurate, complete, and truthful.
            </p>
            <p className="text-gray-400">
              Providing false or misleading information may result in rejection of the application or withdrawal of any employment offer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#5cc9d6]">7.</span> Cookies & Analytics
            </h2>
            <p className="mb-4">
              Our careers portal may use cookies and analytics tools to improve user experience, website performance, and application functionality.
            </p>
            <p className="text-gray-400">
              These technologies do not collect sensitive recruitment information beyond what is voluntarily submitted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#5cc9d6]">8.</span> Your Rights
            </h2>
            <p className="mb-3">You may request to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400 marker:text-[#5cc9d6] mb-4">
              <li>Access your application data</li>
              <li>Correct inaccurate information</li>
              <li>Withdraw your application</li>
              <li>Request deletion of your personal information (subject to legal obligations)</li>
            </ul>
            <p className="text-gray-400">
              Requests can be sent to:{' '}
              <a href="mailto:privacy@auxosys.com" className="text-[#ff5a00] hover:underline font-medium">privacy@auxosys.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#5cc9d6]">9.</span> Changes to This Policy
            </h2>
            <p className="text-gray-400">
              Auxosys reserves the right to update this Privacy Policy at any time. Updated versions will be published on this page with the revised effective date.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
