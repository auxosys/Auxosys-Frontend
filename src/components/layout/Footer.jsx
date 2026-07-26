"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { Linkedin, Github, Twitter, Instagram } from 'lucide-react';

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
    <footer className={styles.siteFooter}>
      <div className={styles.footerContainer}>

        {/* Top Grid: Brand + Links */}
        <div className={styles.footerTop}>

          <div className={styles.footerBrand}>
            <h2 className={styles.footerHeroText}>Empowering Businesses<br />Through Intelligent Technology.</h2>
            <div className={styles.footerSocial} style={{ marginTop: 24, marginBottom: 48 }}>
              <a href="#" className={styles.socialIcon} aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="#" className={styles.socialIcon} aria-label="GitHub"><Github size={18} /></a>
              <a href="#" className={styles.socialIcon} aria-label="X / Twitter"><Twitter size={18} /></a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram"><Instagram size={18} /></a>
            </div>

            <div className={styles.footerSubscribe}>
              <p>Get the latest product updates, technology insights, and news.</p>
              <form className={styles.subscribeForm} onSubmit={handleSubscribe}>
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
                <p className={`${styles.subscribeMsg} ${status.type === 'success' ? styles.isSuccess : styles.isError}`}>
                  {status.message}
                </p>
              )}
            </div>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.footerCol}>
              <h5>Company</h5>
              <ul>
                <li><Link href="/about">Who We Are</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/news">Newsroom</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h5>Solutions</h5>
              <ul>
                <li><Link href="/products">Products</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/industries">Industries</Link></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h5>Technologies</h5>
              <ul>
                <li><Link href="#">AI</Link></li>
                <li><Link href="#">Cloud</Link></li>
                <li><Link href="#">SaaS</Link></li>
                <li><Link href="#">Blockchain</Link></li>
                <li><Link href="#">Web & Mobile</Link></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h5>Legal</h5>
              <ul>
                {legalPages.length > 0 ? (
                  legalPages.map((page) => (
                    <li key={page.slug}>
                      <Link href={`/${page.slug}`}>{page.title}</Link>
                    </li>
                  ))
                ) : (
                  <li><span className={styles.footerEmpty}>No pages yet</span></li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Giant Signature Wordmark */}
        <div className={styles.footerWordmark}>
          AUXOSYS
        </div>

        {/* Bottom Bar */}
        <div className={styles.footerBottom}>
          <span>© 2026 Auxosys. All rights reserved.</span>
          <div className={styles.footerBottomLinks}>
            <span className={styles.footerBottomTag} style={{ margin: 0 }}>
              <span className={styles.dot}></span>Engineering the Future, Together.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}