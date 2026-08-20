'use client';

import React, { useState } from 'react';
import SEO from '@/components/SEO';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Phone, Mail, MapPin, MessageSquare, CheckCircle, X } from 'lucide-react';
import { COUNTRY_CODES } from '@/utils/countryCodes';

import { fetchSeoData } from '@/utils/fetchSeo';

export default function ContactUs({ globalSeo }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';
      const API_URL = process.env.NEXT_PUBLIC_API_URL || (isLocal ? 'https://auxosys-backend.onrender.com' : 'https://auxosys-backend.onrender.com');
      const response = await fetch(`${API_URL}/public/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          subject: formData.subject,
          message: formData.message
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShowModal(true);
        setFormData({
          name: '',
          email: '',
          countryCode: '+91',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (error) {
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <SEO 
        globalSeo={globalSeo}
        title="Contact Us | Start Your Digital Project - Auxosys"
        description="Get in touch with Auxosys to discuss your next digital product, custom software, or enterprise transformation project."
        urlPath="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Auxosys",
          "url": `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "contact@auxosys.com",
            "contactType": "customer support"
          }
        }}
      />
      <div className="contact-page">
      <style jsx>{`
        .contact-page {
          min-height: 100vh;
          padding: 80px 24px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-0, #fff);
        }

        .contact-container {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          width: 100%;
          max-width: 1100px;
          height: calc(100vh - 110px);
          min-height: 480px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--border, #E2E8F0);
          box-shadow: 0 10px 40px rgba(0,0,0,0.04);
        }

        /* ── LEFT PANEL ── */
        .contact-left {
          position: relative;
          background: var(--auxo-ink, #17262B);
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
        }

        .contact-left-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0.8;
          filter: saturate(1);
        }

        .contact-left-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%);
        }

        .contact-left::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.06) 1.5px, transparent 1.5px);
          background-size: 22px 22px;
          -webkit-mask-image: linear-gradient(180deg, black, transparent 75%);
          mask-image: linear-gradient(180deg, black, transparent 75%);
          pointer-events: none;
        }

        .contact-left-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .contact-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon-img { filter: none; }

        .logo-text {
          font-family: var(--font-display, sans-serif);
          font-weight: 800;
          font-size: 18px;
          letter-spacing: 0.06em;
          color: #fff;
        }

        .contact-left-headline {
          margin: auto 0;
        }

        .contact-left-headline h2 {
          display: none;
        }

        .contact-left-headline p {
          font-size: 16px;
          color: #ffffff !important;
          opacity: 1 !important;
          font-weight: 500;
          max-width: 320px;
          line-height: 1.6;
          margin: 0;
        }

        .contact-info-list {
          margin-top: 20px;
          padding-top: 0;
          border-top: none;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .info-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(14,165,233,0.18);
          border: 1px solid rgba(14,165,233,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--teal, #0EA5E9);
          flex-shrink: 0;
        }

        .info-text {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .info-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #ffffff !important;
          opacity: 1 !important;
        }

        .info-label::before {
          content: '';
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--orange, #FF6B35);
          box-shadow: 0 0 0 0 rgba(255,107,53,0.6);
          animation: pulse-dot 2.2s infinite;
        }

        @keyframes pulse-dot {
          0% { box-shadow: 0 0 0 0 rgba(255,107,53,0.55); }
          70% { box-shadow: 0 0 0 7px rgba(255,107,53,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,107,53,0); }
        }

        .info-value {
          font-size: 14.5px;
          color: #ffffff !important;
          opacity: 1 !important;
          font-weight: 600;
        }

        /* ── RIGHT PANEL ── */
        .contact-right {
          padding: 24px 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: var(--bg-1, #F8FAFC);
          overflow-y: auto;
        }

        .contact-title {
          font-family: var(--font-display, sans-serif);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--teal, #0EA5E9);
          margin: 0 0 4px;
        }

        .contact-form-container {
          max-width: 100%;
        }

        .form-header {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .form-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(14,165,233,0.08);
          border: 1px solid rgba(14,165,233,0.25);
          color: var(--teal, #0EA5E9);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .form-header-text h3 {
          font-family: var(--font-display, sans-serif);
          font-size: 20px;
          font-weight: 700;
          color: var(--white, #0F172A);
          margin: 0 0 4px;
          letter-spacing: -0.02em;
        }

        .form-header-text p {
          font-size: 14px;
          color: var(--muted, #64748B);
          margin: 0;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .form-group label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--gray, #475569);
        }

        .form-group input,
        .form-group textarea,
        .country-select {
          font-size: 13px;
          color: var(--white, #0F172A);
          background: #fff;
          border: 1.5px solid var(--border, #E2E8F0);
          border-radius: 8px;
          padding: 8px 12px;
          font-family: inherit;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          width: 100%;
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #A6B0C0;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .country-select:focus {
          outline: none;
          border-color: var(--teal, #0EA5E9);
          box-shadow: 0 0 0 4px rgba(14,165,233,0.12);
        }

        .form-group textarea { resize: vertical; min-height: 40px; }

        .phone-input-group {
          display: grid;
          grid-template-columns: 132px 1fr;
          gap: 10px;
        }

        .select-wrapper { position: relative; }

        .country-select {
          appearance: none;
          cursor: pointer;
          padding-right: 28px;
        }

        .select-wrapper::after {
          content: '';
          position: absolute;
          right: 12px;
          top: 50%;
          width: 7px;
          height: 7px;
          border-right: 1.5px solid var(--muted, #64748B);
          border-bottom: 1.5px solid var(--muted, #64748B);
          transform: translateY(-70%) rotate(45deg);
          pointer-events: none;
        }

        .submit-btn {
          margin-top: 0;
          background: var(--auxo-ink, #17262B);
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          border: none;
          border-radius: 9999px;
          padding: 10px 20px;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease, background 0.15s ease;
          box-shadow: 0 10px 24px -10px rgba(23,38,43,0.55);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px -10px rgba(23,38,43,0.65);
          background: #223A42;
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* ── SUCCESS MODAL ── */
        .success-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15,23,42,0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 20px;
        }

        .success-modal {
          background: #fff;
          border-radius: 20px;
          padding: 40px 36px;
          max-width: 380px;
          width: 100%;
          text-align: center;
          box-shadow: 0 30px 60px rgba(0,0,0,0.25);
        }

        .success-icon {
          color: var(--teal, #0EA5E9);
          background: rgba(14,165,233,0.1);
          border-radius: 50%;
          padding: 12px;
          margin-bottom: 16px;
        }

        .success-modal h2 {
          font-family: var(--font-display, sans-serif);
          font-size: 21px;
          font-weight: 700;
          color: var(--white, #0F172A);
          margin: 0 0 10px;
        }

        .success-modal p {
          font-size: 14.5px;
          color: var(--muted, #64748B);
          line-height: 1.6;
          margin: 0 0 22px;
        }
          
        .success-modal .btn {
          display: inline-block;
          background: var(--auxo-ink, #17262B);
          color: #fff;
          padding: 10px 24px;
          border-radius: 9999px;
          font-weight: 500;
          transition: background 0.2s;
        }
        
        .success-modal .btn:hover {
          background: #223A42;
        }

        /* ── DESKTOP VIEW ON MOBILE (TALL SCREENS) ── */
        @media (max-aspect-ratio: 1/1) and (min-width: 901px) {
          .contact-page {
            min-height: max-content;
            height: max-content;
            padding-top: 140px;
            padding-bottom: 80px;
          }
          .contact-container {
            height: 750px;
            min-height: 750px;
          }
        }

        /* ── MOBILE ── */
        @media (max-width: 900px) {
          .contact-page {
            display: block;
            padding: 100px 16px 40px;
          }
          .contact-container { 
            grid-template-columns: 1fr;
            height: auto;
            min-height: auto;
          }
          .contact-left { padding: 40px 24px 40px; }
          .contact-left-headline { padding-top: 30px; }
          .contact-left-headline h2 { font-size: 26px; }
          .contact-right { 
            padding: 40px 20px 48px;
            overflow-y: visible;
          }
          .phone-input-group { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="contact-container">

        {/* LEFT PANEL */}
        <div className="contact-left">
          <div className="contact-left-bg" style={{ backgroundImage: "url('/contact-bg.jpg')" }}></div>
          <div className="contact-left-overlay"></div>

          <div className="contact-left-content">
            <div className="contact-logo">
              <Image src="/Auxosys-icon-mono-white.svg" alt="Auxosys Logo" width={32} height={32} className="logo-icon-img" />
              <span className="logo-text">AUXOSYS</span>
            </div>

            <div className="contact-left-headline">
              <h1>Tell us what you're building. We'll tell you how to ship it.</h1>
              <p>Every message reaches an actual engineer, not a queue. No forms disappearing into the void.</p>
            </div>

            <div className="contact-info-list">
              <div className="info-item">
                <div className="info-icon">
                  <Clock size={20} />
                </div>
                <div className="info-text">
                  <span className="info-label">OFFICE HOURS</span>
                  <span className="info-value">Monday to Friday, 10 AM – 6 PM</span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <Mail size={20} />
                </div>
                <div className="info-text">
                  <span className="info-label">GENERAL INQUIRIES</span>
                  <a href="mailto:contact@auxosys.com" className="info-value hover:opacity-80 transition-opacity" style={{textDecoration: 'none', color: 'inherit'}}>
                    contact@auxosys.com
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="contact-right">

          <div className="contact-form-container">
            <div className="form-header">
              <div className="form-icon">
                <MessageSquare size={18} />
              </div>
              <div className="form-header-text">
                <h3>How can we help?</h3>
                <p>Fill out the form below and we'll respond within 24 hours</p>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
              </div>

              <div className="form-group">
                <label>Contact Number *</label>
                <div className="phone-input-group">
                  <div className="select-wrapper">
                    <select className="country-select" name="countryCode" value={formData.countryCode} onChange={handleChange}>
                      {COUNTRY_CODES.map((item) => (
                        <option key={item.country} value={item.code}>
                          {item.code} ({item.country})
                        </option>
                      ))}
                    </select>
                  </div>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Contact Number" required />
                </div>
              </div>

              <div className="form-group">
                <label>Subject *</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is this about?" required />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea rows="2" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us what's on your mind..." required></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

      </div>

      {showModal && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <CheckCircle className="success-icon" size={48} />
            <h2>Message Sent</h2>
            <p>Thank you for reaching out!<br />We will connect with you shortly.</p>
            <Link href="/" className="btn mt-4">Back to Home</Link>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export async function getStaticProps() {
  const globalSeo = await fetchSeoData('/contact');
  
  return {
    props: {
      globalSeo
    },
    revalidate: 60,
  };
}
