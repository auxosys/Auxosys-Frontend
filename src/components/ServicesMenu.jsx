import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './ServicesMenu.module.css';

const SERVICES_DATA = {
  col1: {
    title: "Business & Consulting",
    items: [
      { name: "Digital Strategy Consulting", href: "/services" },
      { name: "Product Strategy & Roadmapping", href: "/services" },
      { name: "UX Research & Product Design", href: "/services" },
      { name: "Marketing & GTM Strategy", href: "/services" },
      { name: "Operations & Process Optimization", href: "/services" },
      { name: "Business Analytics", href: "/services" },
    ]
  },
  col2: {
    title: "Software Development",
    items: [
      { name: "Custom Software Development", href: "/services" },
      { name: "SaaS Product Development", href: "/services" },
      { name: "Enterprise Applications", href: "/services" },
      { name: "Web Development", href: "/services" },
      { name: "Mobile App Development", href: "/services" },
      { name: "API Development", href: "/services" },
    ]
  },
  col3: {
    title: "AI, Cloud & Enterprise",
    items: [
      { name: "AI & Intelligent Automation", href: "/services" },
      { name: "Cloud Services", href: "/services" },
      { name: "CRM & ERP Solutions", href: "/services" },
      { name: "WhatsApp Business Solutions", href: "/services" },
      { name: "Cybersecurity", href: "/services" },
      { name: "DevOps & Integrations", href: "/services" },
    ]
  }
};

const ServiceGroup = ({ group, onClose }) => (
  <div className={styles.linkGroup}>
    <h4 className={styles.groupTitle}>{group.title}</h4>
    {group.items.map((item) => (
      <Link key={item.name} href={item.href} className={styles.menuLink} onClick={onClose}>
        <span>{item.name}</span>
      </Link>
    ))}
  </div>
);

const MobileServiceGroup = ({ group, onClose }) => (
  <div className={styles.mobileGroup}>
    <h4 className={styles.mobileGroupTitle}>{group.title}</h4>
    {group.items.map((item) => (
      <Link key={item.name} href={item.href} className={styles.mobileLink} onClick={onClose}>
        {item.name}
      </Link>
    ))}
  </div>
);

export default function ServicesMenu({ isOpen, isMobile, onClose }) {
  if (isMobile) {
    if (!isOpen) return null;
    return (
      <div className={styles.mobileAccordion}>
        <MobileServiceGroup group={SERVICES_DATA.col1} onClose={onClose} />
        <MobileServiceGroup group={SERVICES_DATA.col2} onClose={onClose} />
        <MobileServiceGroup group={SERVICES_DATA.col3} onClose={onClose} />
        
        <div style={{ marginTop: 12 }}>
          <Link href="/services" onClick={onClose} style={{ fontWeight: 700, color: 'var(--auxo-teal)' }}>
            Explore Our Services →
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
          <ServiceGroup group={SERVICES_DATA.col1} onClose={onClose} />
        </div>

        {/* Column 2 */}
        <div className={styles.linkCol}>
          <ServiceGroup group={SERVICES_DATA.col2} onClose={onClose} />
        </div>

        {/* Column 3 */}
        <div className={styles.linkCol}>
          <ServiceGroup group={SERVICES_DATA.col3} onClose={onClose} />
        </div>

        {/* Column 4 - CTA */}
        <div className={styles.linkCol}>
          <div className={styles.ctaCard}>
            <p>Need a Custom Solution?</p>
            <span className={styles.ctaDesc}>Let's build software designed around your business.</span>
            <Link href="/services" className={styles.ctaLink} onClick={onClose}>
              Explore Our Services <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
