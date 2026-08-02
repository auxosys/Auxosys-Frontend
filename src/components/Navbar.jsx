'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Menu, X } from 'lucide-react';
import MegaMenu from './MegaMenu';
import ServicesMenu from './ServicesMenu';
import IndustriesMenu from './IndustriesMenu';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [industriesMenuOpen, setIndustriesMenuOpen] = useState(false);
  const megaMenuTimeoutRef = useRef(null);
  const servicesMenuTimeoutRef = useRef(null);
  const industriesMenuTimeoutRef = useRef(null);

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

  const handleMouseEnter = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 150);
  };

  const handleServicesMouseEnter = () => {
    if (servicesMenuTimeoutRef.current) clearTimeout(servicesMenuTimeoutRef.current);
    setServicesMenuOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesMenuTimeoutRef.current = setTimeout(() => {
      setServicesMenuOpen(false);
    }, 150);
  };

  const handleIndustriesMouseEnter = () => {
    if (industriesMenuTimeoutRef.current) clearTimeout(industriesMenuTimeoutRef.current);
    setIndustriesMenuOpen(true);
  };

  const handleIndustriesMouseLeave = () => {
    industriesMenuTimeoutRef.current = setTimeout(() => {
      setIndustriesMenuOpen(false);
    }, 150);
  };

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
            {navLinks.map((link) => {
              if (link.name === 'Products') {
                return (
                  <li 
                    key={link.name} 
                    className={styles.megaMenuItem}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link href={link.href} className="flex items-center gap-1">
                      {link.name}
                    </Link>
                    <MegaMenu isOpen={megaMenuOpen} isMobile={false} onClose={() => setMegaMenuOpen(false)} />
                  </li>
                );
              }
              if (link.name === 'Industries') {
                return (
                  <li 
                    key={link.name} 
                    className={styles.megaMenuItem}
                    onMouseEnter={handleIndustriesMouseEnter}
                    onMouseLeave={handleIndustriesMouseLeave}
                  >
                    <Link href={link.href} className="flex items-center gap-1">
                      {link.name}
                    </Link>
                    <IndustriesMenu isOpen={industriesMenuOpen} isMobile={false} onClose={() => setIndustriesMenuOpen(false)} />
                  </li>
                );
              }
              if (link.name === 'Services') {
                return (
                  <li 
                    key={link.name} 
                    className={styles.megaMenuItem}
                    onMouseEnter={handleServicesMouseEnter}
                    onMouseLeave={handleServicesMouseLeave}
                  >
                    <Link href={link.href} className="flex items-center gap-1">
                      {link.name}
                    </Link>
                    <ServicesMenu isOpen={servicesMenuOpen} isMobile={false} onClose={() => setServicesMenuOpen(false)} />
                  </li>
                );
              }
              return (
                <li key={link.name}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              );
            })}
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
              {navLinks.map((link) => {
                if (link.name === 'Products') {
                  return (
                    <div key={link.name} className="drawer-item-container">
                      <button 
                        className="drawer-link flex justify-between w-full"
                        onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                      >
                        {link.name}
                      </button>
                      <MegaMenu isOpen={megaMenuOpen} isMobile={true} onClose={() => { setMegaMenuOpen(false); setMobileMenuOpen(false); }} />
                    </div>
                  );
                }
                if (link.name === 'Services') {
                  return (
                    <div key={link.name} className="drawer-item-container">
                      <button 
                        className="drawer-link flex justify-between w-full"
                        onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                      >
                        {link.name}
                      </button>
                      <ServicesMenu isOpen={servicesMenuOpen} isMobile={true} onClose={() => { setServicesMenuOpen(false); setMobileMenuOpen(false); }} />
                    </div>
                  );
                }
                if (link.name === 'Industries') {
                  return (
                    <div key={link.name} className="drawer-item-container">
                      <button 
                        className="drawer-link flex justify-between w-full"
                        onClick={() => setIndustriesMenuOpen(!industriesMenuOpen)}
                      >
                        {link.name}
                      </button>
                      <IndustriesMenu isOpen={industriesMenuOpen} isMobile={true} onClose={() => { setIndustriesMenuOpen(false); setMobileMenuOpen(false); }} />
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="drawer-link"
                  >
                    {link.name}
                  </Link>
                );
              })}
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
