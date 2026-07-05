"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });
  const [legalPages, setLegalPages] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002";

  useEffect(() => {
    fetch(`${API_URL}/public/legal`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setLegalPages(data.data);
        }
      })
      .catch(console.error);
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus({ loading: true, message: '', type: '' });
    try {
      const res = await fetch(`${API_URL}/public/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ loading: false, message: 'Successfully subscribed!', type: 'success' });
        setEmail('');
      } else {
        setStatus({ loading: false, message: data.message || 'Failed to subscribe', type: 'error' });
      }
    } catch (err) {
      setStatus({ loading: false, message: 'An error occurred. Please try again.', type: 'error' });
    }
  };
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="inline-block mb-6" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Image src="/logo-icon.svg" alt="Auxosys" width={32} height={32} className="logo-img" />
              <span className="logo-text" style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '700', color: 'var(--white)', letterSpacing: '0.05em' }}>AUXOSYS</span>
            </Link>
            <p>We build intelligent digital ecosystems that empower businesses worldwide.</p>
            <div className="social-row">
              <a href="#" className="social-icon" aria-label="LinkedIn">in</a>
              <a href="#" className="social-icon" aria-label="GitHub">gh</a>
              <a href="#" className="social-icon" aria-label="X / Twitter">𝕏</a>
              <a href="#" className="social-icon" aria-label="Instagram">ig</a>
            </div>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="/about">Who We Are</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/news">Newsroom</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Solutions</h5>
            <ul>
              <li><a href="/products">Products</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/industries">Industries</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Technologies</h5>
            <ul>
              <li><a href="#">AI</a></li>
              <li><a href="#">Cloud</a></li>
              <li><a href="#">SaaS</a></li>
              <li><a href="#">Blockchain</a></li>
              <li><a href="#">Web Development</a></li>
              <li><a href="#">Mobile Development</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Legal</h5>
            <ul>
              {legalPages.length > 0 ? (
                legalPages.map((page) => (
                  <li key={page.slug}>
                    <Link href={`/${page.slug}`}>{page.title}</Link>
                  </li>
                ))
              ) : (
                <li><span className="text-gray-500 text-sm">No pages yet</span></li>
              )}
            </ul>
          </div>
        </div>
        
        <div className="footer-subscribe-section">
          <h5>Stay Updated</h5>
          <div className="newsletter-box">
            <p>Stay updated with our latest products, technology insights, and company news.</p>
            <form className="news-input-row" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={status.loading}>
                {status.loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {status.message && (
              <p className={`mt-2 text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {status.message}
              </p>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Auxosys. All rights reserved.</span>
          <span className="footer-tagline"><span className="dot"></span>Engineering the Future, Together.</span>
          <span></span>
        </div>
      </div>
    </footer>
  );
}
