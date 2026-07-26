"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <Link href="/" className="logo">
          <img src="/Auxosys-icon-mono-dark.svg" alt="Auxosys Logo" className="logo-icon-mobile" />
          <span className="logo-word">AUXOSYS</span>
          <span className="logo-mark">A</span>
        </Link>
        <ul className="nav-links">
          <li><Link href="#">Employers</Link></li>
          <li><Link href="#">Job seekers</Link></li>
          <li><Link href="#">Career centers</Link></li>
          <li><Link href="#">AUXOSYS AI</Link></li>
          <li><Link href="#">Research</Link></li>
        </ul>
        <div className="nav-actions">
          <Link href="#" className="nav-btn nav-btn-outline">Log in</Link>
          <Link href="#" className="nav-btn nav-btn-primary">Sign up</Link>
        </div>
      </div>
    </nav>
  );
}
