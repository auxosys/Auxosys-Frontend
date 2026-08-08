import React from "react";
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CandidateTerms() {
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

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', marginBottom: '24px' }}>Candidate Terms & Conditions</h1>
        
        <div style={{ color: 'var(--muted)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p>
            By submitting an application to Auxosys, you agree to these Candidate Terms and Conditions. Please read them carefully before submitting your application.
          </p>

          <h2 style={{ color: '#132242', fontSize: '20px', marginTop: '16px', marginBottom: '8px' }}>1. Accuracy of Information</h2>
          <p>
            You declare that all information provided in your application, resume, and any subsequent interviews or assessments is true, accurate, and complete to the best of your knowledge. Any false statements, misrepresentations, or material omissions may result in the rejection of your application or termination of employment if already hired.
          </p>

          <h2 style={{ color: '#132242', fontSize: '20px', marginTop: '16px', marginBottom: '8px' }}>2. Background Checks</h2>
          <p>
            Auxosys reserves the right to verify the information you have provided. By applying, you consent to us conducting reference checks, educational verification, and other background checks as required for the position.
          </p>

          <h2 style={{ color: '#132242', fontSize: '20px', marginTop: '16px', marginBottom: '8px' }}>3. No Guarantee of Employment</h2>
          <p>
            Submission of an application does not create a contract of employment or a guarantee that you will be offered a position at Auxosys. We reserve the right to close vacancies, modify job requirements, or reject applications at our sole discretion.
          </p>

          <h2 style={{ color: '#132242', fontSize: '20px', marginTop: '16px', marginBottom: '8px' }}>4. Confidentiality</h2>
          <p>
            During the application process, you may receive confidential information about Auxosys, its business, or products. You agree to keep such information strictly confidential and not disclose it to third parties without prior written consent.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
