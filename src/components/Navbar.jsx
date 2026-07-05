'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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
      <div className={`new-nav-wrapper ${scrolled ? 'scrolled' : ''}`}>
        <div className="new-nav-container">
          
          {/* Left Logo Section */}
          <Link href="/" className="new-nav-logo">
            <Image src="/logo-icon.svg" alt="Auxosys Logo" width={32} height={32} className="logo-icon-img" />
            <span className="logo-text">AUXOSYS</span>
          </Link>

          {/* Center Navigation Pill */}
          <nav className="new-nav-pill">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="new-nav-link"
              >
                {link.name}
                <span className="new-nav-link-underline"></span>
              </Link>
            ))}
          </nav>

          {/* Right CTA Button */}
          <Link href="/contact" className="new-nav-cta">
            Connect Us
            <ArrowRight className="cta-arrow" size={20} />
          </Link>

          {/* Mobile Hamburger */}
          <button 
            className="new-nav-hamburger"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
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
