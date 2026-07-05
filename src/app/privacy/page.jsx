"use client";
import React from 'react';
import Link from 'next/link';
import PolicyLayout from '../../components/layout/PolicyLayout';

export default function PrivacyPolicy() {
  const content = (
    <>
      <h2>Introduction</h2>
      <p>
        At <strong>Auxosys</strong>, we value your privacy and are committed to protecting the personal information you share during the recruitment process. This Privacy Policy explains how we collect, use, store, and protect your information when you apply for a job or internship with us.
      </p>

      <h2>Information We Collect</h2>
      <p>During the application process, we may collect:</p>
      
      <h3>Personal Information</h3>
      <ul>
        <li>Full Name</li>
        <li>Email Address</li>
        <li>Phone Number</li>
        <li>Residential Address (if applicable)</li>
        <li>Date of Birth (if required)</li>
      </ul>

      <h3>Professional Information</h3>
      <ul>
        <li>Resume / CV & Cover Letter</li>
        <li>Portfolio & Personal Website</li>
        <li>LinkedIn & GitHub Profiles</li>
        <li>Educational Qualifications & Work Experience</li>
        <li>Skills, Certifications, Projects & Achievements</li>
      </ul>

      <h3>Internship Applicants</h3>
      <p>We may also collect:</p>
      <ul>
        <li>College/University Name, Degree & Branch/Stream</li>
        <li>Current Semester/Year, Graduation Year & CGPA/Percentage</li>
      </ul>

      <h3>Additional Information</h3>
      <p>Any information voluntarily submitted through application forms, questionnaires, or interview processes.</p>

      <h2>Purpose of Data Collection</h2>
      <p>Your information is collected solely for recruitment-related purposes, including:</p>
      <ul>
        <li>Reviewing applications & Assessing qualifications</li>
        <li>Scheduling interviews & Communicating recruitment updates</li>
        <li>Verifying information provided</li>
        <li>Evaluating candidates for current and future opportunities</li>
        <li>Maintaining recruitment records</li>
      </ul>

      <h2>Data Storage & Security</h2>
      <p>
        Auxosys implements reasonable technical and organizational measures to protect applicant information from unauthorized access, disclosure, alteration, or destruction.
      </p>
      <p>
        Only authorized recruitment personnel and designated hiring managers have access to applicant data.
      </p>

      <h2>Data Retention</h2>
      <p>
        Applicant information may be retained for future recruitment opportunities unless you request its removal.
      </p>
      <p>
        If you wish to have your information deleted, you may contact us at:{' '}
        <a href="mailto:careers@auxosys.com">careers@auxosys.com</a>
      </p>

      <h2>Sharing of Information</h2>
      <p>
        Auxosys does <strong>not sell, rent, or trade</strong> applicant information. Your information may only be shared with:
      </p>
      <ul>
        <li>Internal hiring teams</li>
        <li>Authorized recruitment personnel</li>
        <li>Legal authorities when required by law</li>
      </ul>

      <h2>Accuracy of Information</h2>
      <p>
        Applicants are responsible for ensuring that all submitted information is accurate, complete, and truthful.
      </p>
      <p>
        Providing false or misleading information may result in rejection of the application or withdrawal of any employment offer.
      </p>

      <h2>Cookies & Analytics</h2>
      <p>
        Our careers portal may use cookies and analytics tools to improve user experience, website performance, and application functionality.
      </p>
      <p>
        These technologies do not collect sensitive recruitment information beyond what is voluntarily submitted.
      </p>

      <h2>Your Rights</h2>
      <p>You may request to:</p>
      <ul>
        <li>Access your application data</li>
        <li>Correct inaccurate information</li>
        <li>Withdraw your application</li>
        <li>Request deletion of your personal information (subject to legal obligations)</li>
      </ul>
      <p>
        Requests can be sent to:{' '}
        <a href="mailto:privacy@auxosys.com">privacy@auxosys.com</a>
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        Auxosys reserves the right to update this Privacy Policy at any time. Updated versions will be published on this page with the revised effective date.
      </p>
    </>
  );

  return (
    <PolicyLayout 
      title="Privacy Policy"
      subtitle="Privacy Policy for Job & Internship Applicants"
      lastUpdated="January 2026"
      content={content}
      backFallback="/careers/apply"
    />
  );
}
