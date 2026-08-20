import React from 'react';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';
import { ProductPhone } from '@/components/ProductPhone';
import { ArrowUpRight } from 'lucide-react';
import {
  IconBrain, IconCRM, IconCloud, IconTools,
  IconAI, IconSaaS, IconWeb, IconMobile, IconBlockchain, IconBulb, IconDesign,
  IconHealthcare, IconFinance, IconEducation, IconRetail, IconManufacturing,
  IconRealEstate, IconLogistics, IconStartup,
  IconLightning, IconShield, IconScale, IconSearch, IconHandshake, IconSupport,
} from '@/components/Icons';
import RelatedNews from '@/components/ui/RelatedNews';

/* small arrow affordance reused by every card link */
const Arrow = () => (
  <span className="arw"><ArrowUpRight size={13} strokeWidth={2.5} /></span>
);

const PRODUCTS = [
  {
    cat: 'AI & Automation', title: 'AI Workspace & Intelligent Agents', href: '/products/ai-workspace', Icon: IconBrain,
    desc: 'An AI-powered productivity platform designed to automate repetitive tasks, generate intelligent insights, and improve team collaboration at scale.',
    status: 'Coming Soon', statusClass: 'status-soon'
  },
  {
    cat: 'AI & Automation', title: 'Customer Experience Platform (CXP)', href: '/products/cxp', Icon: IconSupport,
    desc: 'A modern customer experience platform tailored for growing businesses to elevate customer satisfaction and retention.',
    status: 'In Development', statusClass: 'status-dev'
  },
  {
    cat: 'AI & Automation', title: 'WhatsApp Business Platform', href: '/products/whatsapp', Icon: IconMobile,
    desc: 'Leverage the world\'s most popular messaging app for scalable customer support, sales, and automated marketing.',
    status: 'In Development', statusClass: 'status-dev'
  },
  {
    cat: 'Business Platforms', title: 'Business Operations Suite', href: '/products/business-ops', Icon: IconTools,
    desc: 'Automate workflows, approvals, notifications, and repetitive operational tasks to free your team for higher-value work.',
    status: 'Planned', statusClass: 'status-planned'
  },
  {
    cat: 'Business Platforms', title: 'People & Workforce Hub', href: '/products/workforce', Icon: IconHandshake,
    desc: 'A centralized hub for HR, talent acquisition, onboarding, and employee engagement.',
    status: 'Coming Soon', statusClass: 'status-soon'
  },
  {
    cat: 'Business Platforms', title: 'Inventory & Supply Management', href: '/products/inventory', Icon: IconLogistics,
    desc: 'Real-time tracking, predictive ordering, and seamless logistics management for your entire supply chain.',
    status: 'Planned', statusClass: 'status-planned'
  },
  {
    cat: 'Industry Solutions', title: 'Learning & Training Platform', href: '/products/learning', Icon: IconEducation,
    desc: 'Empower your workforce with scalable, interactive training modules and comprehensive learning management.',
    status: 'Research Phase', statusClass: 'status-research'
  },
  {
    cat: 'Industry Solutions', title: 'Healthcare Operations Suite', href: '/products/healthcare', Icon: IconHealthcare,
    desc: 'Streamline patient management, scheduling, and compliance with our dedicated healthcare operations platform.',
    status: 'Planned', statusClass: 'status-planned'
  },
  {
    cat: 'Industry Solutions', title: 'Project & Team Collaboration Suite', href: '/products/collaboration', Icon: IconCloud,
    desc: 'Secure cloud document management and collaborative workspace built for distributed teams who need real-time access and version control.',
    status: 'Research Phase', statusClass: 'status-research'
  }
];

const FEATURES = [
  { Icon: IconBrain, name: "AI Integration" },
  { Icon: IconCloud, name: "Cloud Native" },
  { Icon: IconShield, name: "Secure Auth" },
  { Icon: IconLightning, name: "Real-Time Collab" },
  { Icon: IconMobile, name: "Mobile Ready" },
  { Icon: IconShield, name: "Enterprise Security" },
  { Icon: IconScale, name: "Analytics Dashboard" },
  { Icon: IconTools, name: "API Integrations" },
];

import { fetchSeoData } from '@/utils/fetchSeo';

export default function ProductsPage({ globalSeo }) {
  return (
    <>
      <SEO 
        globalSeo={globalSeo}
        title="Products | Intelligent SaaS & Automation Platforms - Auxosys"
        description="Discover Auxosys's suite of intelligent software products, from AI workspaces to enterprise business operations and collaboration platforms."
        urlPath="/products"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Auxosys Products Suite",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web, iOS, Android"
        }}
      />
      {/* ===================== HERO ===================== */}
      <section className="hero" style={{ overflow: 'hidden' }}>
        <div className="container hero-grid">
          <div>
            <h1>Building Products That Solve <span className="accent">Real Problems</span></h1>

            <p className="desc">
              Alongside delivering technology services, Auxosys develops innovative software products
              that simplify operations, improve productivity, and accelerate business growth.
            </p>

          </div>

          <div className="hero-right" style={{ order: 'initial' }}>
            <ProductPhone />
          </div>
        </div>
      </section>

      {/* ===================== PRODUCTS GRID ===================== */}
      <section className="section alt" id="products">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Our Products</div>
            <h2>The Auxosys Ecosystem</h2>
          </Reveal>
          <Reveal>
            <div className="card-grid cols-3">
              {PRODUCTS.map(({ cat, title, desc, href, Icon, status, statusClass }) => (
                <a href={href} className="card card--media" key={title}>
                  <div className="card-media icon-panel">
                    <span className="card-cat">{cat}</span>
                    <Icon />
                  </div>
                  <div className="card-body">
                    <h3>{title}</h3>
                    <p>{desc}</p>
                    <span className={`status-tag ${statusClass}`}>{status}</span>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== CAPABILITIES ===================== */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Built-In Capabilities</div>
            <h2>What is included in every product?</h2>
          </Reveal>
          <Reveal>
            <div className="card-grid cols-4">
              {FEATURES.map(({ Icon, name }) => (
                <div className="card" key={name}>
                  <div className="card-icon"><Icon /></div>
                  <h3 style={{ fontSize: '16px' }}>{name}</h3>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== ROADMAP ===================== */}
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Product Roadmap</div>
            <h2>Where we're headed</h2>
          </Reveal>
          <Reveal>
            <div className="card-grid cols-3">
              <div className="card card--dark">
                <div className="card-icon"><IconSearch /></div>
                <div className="eyebrow" style={{ color: 'var(--teal)' }}>↗ Current</div>
                <h3 style={{ color: 'white', marginTop: '12px' }}>Building intelligent SaaS platforms for the modern workforce.</h3>
              </div>
              <div className="card card--dark">
                <div className="card-icon"><IconLightning /></div>
                <div className="eyebrow" style={{ color: 'var(--orange)' }}>⟳ Next</div>
                <h3 style={{ color: 'white', marginTop: '12px' }}>AI-powered enterprise products with deep automation capabilities.</h3>
              </div>
              <div className="card card--dark">
                <div className="card-icon"><IconScale /></div>
                <div className="eyebrow" style={{ color: 'var(--muted)' }}>◎ Future</div>
                <h3 style={{ color: 'white', marginTop: '12px' }}>Industry-specific software ecosystems that redefine digital operations.</h3>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <RelatedNews relatedPage="products" />
      <section className="section home-cta" id="contact">
        <div className="container">
          <Reveal className="cta-banner">
            <div className="cta-content">
              <h2>Success is measured by the value we create — not just the software we ship.</h2>
              <p>At Auxosys, we build for the long term — for our clients, our community, and the future of technology.</p>
            </div>
            <div className="cta-actions">
              <a href="/contact" className="btn btn-primary">Let's Build Together</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const globalSeo = await fetchSeoData('/products');
  
  return {
    props: {
      globalSeo
    },
    revalidate: 60,
  };
}