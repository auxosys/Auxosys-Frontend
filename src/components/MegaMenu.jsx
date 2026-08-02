import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Sparkles, Building2, Workflow } from 'lucide-react';
import styles from './MegaMenu.module.css';

const MEGA_MENU_DATA = {
  featured: {
    title: "Auxosys Products Workspace",
    description: "Discover how intelligent agents can transform your enterprise productivity and operational scale.",
    badge: null,
    link: "/contact",
    cta: "Connect with our team",
  },
  columnOne: [
    { name: "AI Workspace & Intelligent Agents", href: "/products/ai-workspace", icon: Sparkles },
    { name: "Customer Experience Platform (CXP)", href: "/products/cxp", icon: null },
    { name: "WhatsApp Business Platform", href: "/products/whatsapp", icon: null },
    { name: "Learning & Training Platform", href: "/products/learning", icon: null },
    { name: "Healthcare Operations Suite", href: "/products/healthcare", icon: null },
    { name: "Business Operations Suite", href: "/products/business-ops", icon: Building2 },
  ],
  columnTwo: [
    { name: "People & Workforce Hub", href: "/products/workforce", icon: null },
    { name: "Inventory & Supply Management", href: "/products/inventory", icon: null },
    { name: "Project & Team Collaboration Suite", href: "/products/collaboration", icon: Workflow },
    { name: "Enterprise Blockchain Platform", href: "/products/enterprise-blockchain-platform", icon: null },
    { name: "DAO Management Platform", href: "/products/dao-management-platform", icon: null },
    { name: "Digital Asset Tokenization Platform", href: "/products/digital-asset-tokenization-platform", icon: null },
  ]
};

export default function MegaMenu({ isOpen, isMobile, onClose }) {
  // Mobile accordion view
  if (isMobile) {
    if (!isOpen) return null;
    return (
      <div className={styles.mobileAccordion}>
        <div className={styles.linkGroup}>
          {MEGA_MENU_DATA.columnOne.map((item) => (
            <Link key={item.name} href={item.href} onClick={onClose} className={styles.mobileLink}>
              {item.name}
            </Link>
          ))}
          {MEGA_MENU_DATA.columnTwo.map((item) => (
            <Link key={item.name} href={item.href} onClick={onClose} className={styles.mobileLink}>
              {item.name}
            </Link>
          ))}
        </div>
        <Link href="/products" onClick={onClose} className={styles.viewAllLink} style={{ marginTop: 8 }}>
          View all products <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  // Desktop mega menu
  return (
    <div className={`${styles.megaMenuWrapper} ${isOpen ? styles.open : ''}`}>
      <div className={styles.megaMenuContainer}>
        {/* Left Column: Featured */}
        <div className={styles.featuredCol}>
          <div className={styles.featuredDarkCard}>
            {MEGA_MENU_DATA.featured.badge && (
              <div className={styles.featuredBadge}>{MEGA_MENU_DATA.featured.badge}</div>
            )}
            <div className={styles.featuredContent}>
              <h3>{MEGA_MENU_DATA.featured.title}</h3>
            </div>
          </div>
          <div className={styles.featuredBottom}>
            <p>{MEGA_MENU_DATA.featured.description}</p>
            <Link href={MEGA_MENU_DATA.featured.link} className={styles.featuredCta} onClick={onClose}>
              {MEGA_MENU_DATA.featured.cta} <ArrowRight size={20} strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* Middle Column */}
        <div className={styles.linkCol}>
          <div className={styles.linkGroup}>
            {MEGA_MENU_DATA.columnOne.map((item) => (
              <Link key={item.name} href={item.href} className={styles.menuLink} onClick={onClose}>
                <span>{item.name}</span>
                <ChevronRight size={16} className={styles.linkArrow} />
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.linkCol}>
          <div className={styles.linkGroup}>
            {MEGA_MENU_DATA.columnTwo.map((item) => (
              <Link key={item.name} href={item.href} className={styles.menuLink} onClick={onClose}>
                <span>{item.name}</span>
                <ChevronRight size={16} className={styles.linkArrow} />
              </Link>
            ))}
          </div>

          <Link href="/products" className={styles.viewAllLink} onClick={onClose} style={{ marginTop: 'auto' }}>
            View all products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
