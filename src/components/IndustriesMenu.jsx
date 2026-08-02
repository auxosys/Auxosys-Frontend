import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './IndustriesMenu.module.css';

const INDUSTRIES_DATA = {
  col1: [
    { name: "Healthcare & Life Sciences", href: "/industries" },
    { name: "Retail & E-Commerce", href: "/industries" },
    { name: "Manufacturing & Industrial", href: "/industries" },
    { name: "Banking, Finance & Insurance", href: "/industries" },
    { name: "Education & EdTech", href: "/industries" },
  ],
  col2: [
    { name: "Logistics & Supply Chain", href: "/industries" },
    { name: "Hospitality & Travel", href: "/industries" },
    { name: "Real Estate & Construction", href: "/industries" },
    { name: "Energy & Utilities", href: "/industries" },
    { name: "Agriculture & AgriTech", href: "/industries" },
  ]
};

const LinkList = ({ items, onClose }) => (
  <div className={styles.linkGroup}>
    {items.map((item) => (
      <Link key={item.name} href={item.href} className={styles.menuLink} onClick={onClose}>
        <span>{item.name}</span>
      </Link>
    ))}
  </div>
);

const MobileLinkList = ({ items, onClose }) => (
  <div className={styles.mobileGroup}>
    {items.map((item) => (
      <Link key={item.name} href={item.href} className={styles.mobileLink} onClick={onClose}>
        {item.name}
      </Link>
    ))}
  </div>
);

export default function IndustriesMenu({ isOpen, isMobile, onClose }) {
  if (isMobile) {
    if (!isOpen) return null;
    return (
      <div className={styles.mobileAccordion}>
        <MobileLinkList items={INDUSTRIES_DATA.col1} onClose={onClose} />
        <MobileLinkList items={INDUSTRIES_DATA.col2} onClose={onClose} />
        
        <div style={{ marginTop: 12 }}>
          <Link href="/industries" onClick={onClose} style={{ fontWeight: 700, color: 'var(--auxo-teal)' }}>
            View All Industries →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.megaMenuWrapper} ${isOpen ? styles.open : ''}`}>
      <div className={styles.megaMenuContainer}>
        {/* Column 1 */}
        <div className={styles.linkCol}>
          <LinkList items={INDUSTRIES_DATA.col1} onClose={onClose} />
        </div>

        {/* Column 2 */}
        <div className={styles.linkCol}>
          <LinkList items={INDUSTRIES_DATA.col2} onClose={onClose} />
        </div>

        {/* Column 3 - CTA */}
        <div className={styles.linkCol}>
          <div className={styles.ctaCard}>
            <p>Industry-Specific Solutions</p>
            <span className={styles.ctaDesc}>We build tailored digital products that meet the unique compliance, scale, and operational demands of your sector.</span>
            <Link href="/industries" className={styles.ctaLink} onClick={onClose}>
              View All Industries <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
