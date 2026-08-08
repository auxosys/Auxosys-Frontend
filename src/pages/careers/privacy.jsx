import React from "react";
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";
import Head from 'next/head';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";

export default function CandidatePrivacy() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '120px auto 60px', padding: '0 24px' }}>
        <button 
          onClick={() => router.back()} 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--teal)', fontWeight: '500', marginBottom: '32px', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <ArrowLeft size={16} /> Back to Application
        </button>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', marginBottom: '24px' }}>Candidate Privacy Policy</h1>
        
        <div style={{ color: 'var(--muted)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p>
            Auxosys ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. This Candidate Privacy Policy explains how we collect, use, and process your personal data when you apply for a role with us.
          </p>

          <h2 style={{ color: '#132242', fontSize: '20px', marginTop: '16px', marginBottom: '8px' }}>1. Data We Collect</h2>
          <p>
            We collect information you provide in your application, including your resume, cover letter, contact details, educational background, employment history, and any other information you choose to share with us.
          </p>

          <h2 style={{ color: '#132242', fontSize: '20px', marginTop: '16px', marginBottom: '8px' }}>2. How We Use Your Data</h2>
          <p>
            Your data is used exclusively for recruitment purposes, including assessing your suitability for the role, communicating with you about your application, and conducting background checks (where applicable and permitted by law).
          </p>

          <h2 style={{ color: '#132242', fontSize: '20px', marginTop: '16px', marginBottom: '8px' }}>3. Data Retention</h2>
          <p>
            If your application is successful, the data provided will become part of your employee record. If unsuccessful, we may retain your data for a limited period to consider you for future opportunities, unless you request its deletion.
          </p>

          <h2 style={{ color: '#132242', fontSize: '20px', marginTop: '16px', marginBottom: '8px' }}>4. Your Rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of your personal data. You may withdraw your consent to data processing at any time by contacting our recruitment team.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
