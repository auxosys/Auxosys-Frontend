import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './IndustriesMenu.module.css';

const INDUSTRIES_DATA = {
  col1: [
    { name: "Healthcare & Life Sciences", href: "/industries/healthcare-and-life-sciences" },
    { name: "Retail & E-Commerce", href: "/industries/retail-and-e-commerce" },
    { name: "Manufacturing & Industrial", href: "/industries/manufacturing-and-industrial" },
    { name: "Banking, Finance & Insurance", href: "/industries/banking-finance-and-insurance" },
    { name: "Education & EdTech", href: "/industries/education-and-edtech" },
  ],
  col2: [
    { name: "Logistics & Supply Chain", href: "/industries/logistics-and-supply-chain" },
    { name: "Hospitality & Travel", href: "/industries/hospitality-and-travel" },
    { name: "Real Estate & Construction", href: "/industries/real-estate-and-construction" },
    { name: "Energy & Utilities", href: "/industries/energy-and-utilities" },
    { name: "Agriculture & AgriTech", href: "/industries/agriculture-and-agritech" },
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
