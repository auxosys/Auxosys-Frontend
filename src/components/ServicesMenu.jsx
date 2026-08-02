import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './ServicesMenu.module.css';

const SERVICES_DATA = {
  col1: {
    title: "Business & Consulting",
    items: [
      { name: "Digital Strategy Consulting", href: "/services/digital-strategy-consulting" },
      { name: "Product Strategy & Roadmapping", href: "/services/product-strategy-and-roadmapping" },
      { name: "UX Research & Product Design", href: "/services/ux-research-and-product-design" },
      { name: "Marketing & GTM Strategy", href: "/services/marketing-and-gtm-strategy" },
      { name: "Operations & Process Optimization", href: "/services/operations-and-process-optimization" },
      { name: "Business Analytics", href: "/services/business-analytics" },
    ]
  },
  col2: {
    title: "Software Development",
    items: [
      { name: "Custom Software Development", href: "/services/custom-software-development" },
      { name: "SaaS Product Development", href: "/services/saas-product-development" },
      { name: "Enterprise Applications", href: "/services/enterprise-applications" },
      { name: "Web Development", href: "/services/web-development" },
      { name: "Mobile App Development", href: "/services/mobile-app-development" },
      { name: "API Development", href: "/services/api-development" },
    ]
  },
  col3: {
    title: "AI, Cloud & Enterprise",
    items: [
      { name: "AI & Intelligent Automation", href: "/services/ai-and-intelligent-automation" },
      { name: "Cloud Services", href: "/services/cloud-services" },
      { name: "CRM & ERP Solutions", href: "/services/crm-and-erp-solutions" },
      { name: "WhatsApp Business Solutions", href: "/services/whatsapp-business-solutions" },
      { name: "Cybersecurity", href: "/services/cybersecurity" },
      { name: "DevOps & Integrations", href: "/services/devops-and-integrations" },
    ]
  },
  col4: {
    title: "Blockchain & Web3",
    items: [
      { name: "Smart Contract Development", href: "/services/smart-contract-development" },
      { name: "dApp Development", href: "/services/dapp-development" },
      { name: "Enterprise Blockchain Solutions", href: "/services/enterprise-blockchain-solutions" },
      { name: "Crypto Wallet Development", href: "/services/crypto-wallet-development" },
      { name: "Tokenization Solutions", href: "/services/tokenization-solutions" },
      { name: "Web3 Integration", href: "/services/web3-integration" },
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
        <MobileServiceGroup group={SERVICES_DATA.col4} onClose={onClose} />
        
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

        {/* Column 4 */}
        <div className={styles.linkCol}>
          <ServiceGroup group={SERVICES_DATA.col4} onClose={onClose} />
        </div>

        {/* Full-width Horizontal CTA */}
        <div className={styles.ctaCard}>
          <div className={styles.ctaText}>
            <p>Need a Custom Solution?</p>
            <span className={styles.ctaDesc}>Let's build software designed around your business.</span>
          </div>
          <Link href="/services" className={styles.ctaLink} onClick={onClose}>
            Explore Our Services <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}
