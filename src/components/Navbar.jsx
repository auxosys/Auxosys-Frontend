'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initially
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Who We Are', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'Industries', href: '/industries' },
    { name: 'Careers', href: '/careers' },
  ];

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.logo}>
            <Image src="/Auxosys-icon-mono-dark.svg" alt="Auxosys Mobile Logo" width={47} height={47} className={styles.mobileLogo} />
            <span className={styles.logoWord}>AUXOSYS</span>
            <span className={styles.logoMark} style={{ background: 'transparent' }}>
              <Image src="/Auxosys-icon-mono-dark.svg" alt="Auxosys Logo" width={40} height={40} />
            </span>
          </Link>

          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>

          <div className={`${styles.navActions} hidden md:flex items-center`}>
            <Link href="/contact" className={`${styles.navBtn} ${styles.navBtnPrimary} flex items-center`}>
              Connect Us <ArrowRight className="inline ml-1" size={16} />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center p-2 text-black hover:bg-gray-100 rounded-full transition"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer (Preserved from original) */}
      {mobileMenuOpen && (
        <div className="new-mobile-overlay">
          <div className="new-mobile-drawer">
            <div className="drawer-header">
              <span className="logo-text">AUXOSYS</span>
              <button onClick={() => setMobileMenuOpen(false)} className="drawer-close">
                <X size={24} />
              </button>
            </div>

            <nav className="drawer-nav">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="drawer-link"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <Link href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="drawer-cta">
              Connect Us
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
