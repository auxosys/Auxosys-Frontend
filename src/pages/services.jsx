import React from 'react';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';
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

const SERVICES_GROUPS = [
  {
    category: "Business & Consulting",
    items: [
      { title: "Digital Strategy Consulting", href: "/services", Icon: IconBulb, desc: "Align technology with your business objectives." },
      { title: "Product Strategy & Roadmapping", href: "/services", Icon: IconScale, desc: "Plan and prioritize features for maximum impact." },
      { title: "UX Research & Product Design", href: "/services", Icon: IconDesign, desc: "Create intuitive, user-centric interfaces." },
      { title: "Marketing & GTM Strategy", href: "/services", Icon: IconSearch, desc: "Successfully launch and position your products." },
      { title: "Operations & Process Optimization", href: "/services", Icon: IconManufacturing, desc: "Streamline workflows for efficiency." },
      { title: "Business Analytics", href: "/services", Icon: IconFinance, desc: "Data-driven insights for better decisions." }
    ]
  },
  {
    category: "Software Development",
    items: [
      { title: "Custom Software Development", href: "/services", Icon: IconTools, desc: "Bespoke solutions tailored to your unique needs." },
      { title: "SaaS Product Development", href: "/services", Icon: IconSaaS, desc: "Scalable, secure, and multi-tenant platforms." },
      { title: "Enterprise Applications", href: "/services", Icon: IconHealthcare, desc: "Robust software for large-scale operations." },
      { title: "Web Development", href: "/services", Icon: IconWeb, desc: "High-performance, responsive web experiences." },
      { title: "Mobile App Development", href: "/services", Icon: IconMobile, desc: "Native and cross-platform mobile applications." },
      { title: "API Development", href: "/services", Icon: IconCloud, desc: "Secure integrations and enterprise connectivity." }
    ]
  },
  {
    category: "AI, Cloud & Enterprise",
    items: [
      { title: "AI & Intelligent Automation", href: "/services", Icon: IconAI, desc: "Leverage machine learning to automate tasks." },
      { title: "Cloud Services", href: "/services", Icon: IconCloud, desc: "Cloud migration, hosting, and infrastructure." },
      { title: "CRM & ERP Solutions", href: "/services", Icon: IconCRM, desc: "Streamline customer and resource management." },
      { title: "WhatsApp Business Solutions", href: "/services", Icon: IconSupport, desc: "Automate communication and support on WhatsApp." },
      { title: "Cybersecurity", href: "/services", Icon: IconShield, desc: "Protect your data and digital assets." },
      { title: "DevOps & Integrations", href: "/services", Icon: IconLightning, desc: "Continuous delivery and seamless connections." }
    ]
  }
];

const PROCESS = [
  { n: '01', title: 'Discovery', desc: 'Understanding your business goals and requirements.' },
  { n: '02', title: 'Planning', desc: 'Architecture design and project roadmap.' },
  { n: '03', title: 'Design', desc: 'Wireframes, prototypes and UI design.' },
  { n: '04', title: 'Development', desc: 'Modern engineering with clean code.' },
  { n: '05', title: 'Testing', desc: 'Comprehensive quality assurance.' },
  { n: '06', title: 'Launch', desc: "Deployment and production monitoring." },
  { n: '07', title: 'Support', desc: 'Continuous improvement and evolution.' },
];

const WHY = [
  { Icon: IconBrain, title: "Experienced Engineers", desc: "Senior developers with cross-industry expertise." },
  { Icon: IconLightning, title: "Modern Stack", desc: "Latest technologies built for performance and scale." },
  { Icon: IconSearch, title: "Transparent Process", desc: "Full visibility into every stage of development." },
  { Icon: IconTools, title: "Agile Delivery", desc: "Iterative development with rapid feedback cycles." },
  { Icon: IconShield, title: "Enterprise Security", desc: "Security-first architecture from day one." },
  { Icon: IconHandshake, title: "Long-term Support", desc: "Partners for the lifetime of your product." },
];

import { fetchSeoData } from '@/utils/fetchSeo';

export default function ServicesPage({ globalSeo }) {
  return (
    <>
      <SEO 
        globalSeo={globalSeo}
        title="Services | Custom Software, AI & Cloud Solutions - Auxosys"
        description="Explore Auxosys's comprehensive digital services including AI automation, custom software, SaaS product development, and enterprise cloud solutions."
        urlPath="/services"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          "provider": {
            "@type": "Organization",
            "name": "Auxosys"
          },
          "serviceType": ["Software Development", "AI & Cloud Solutions", "Digital Consulting"],
          "areaServed": "Global"
        }}
      />
      {/* ===================== HERO ===================== */}
      <style>{`
        .hero-grid-visual {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: repeat(3, 1fr);
          gap: 16px;
          height: 100%;
          min-height: 500px;
        }
        .hgv-cell {
          background: var(--surface-bg);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        .hgv-cell.span-2 { grid-row: span 2; }
        .hgv-images {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hgv-images::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(9,15,28,0.95) 0%, rgba(9,15,28,0.4) 50%, rgba(9,15,28,0.7) 100%);
          z-index: 1;
        }
        .hgv-images img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @keyframes fadeCycle1 {
          0%, 45% { opacity: 1; transform: scale(1); }
          50%, 95% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeCycle2 {
          0%, 45% { opacity: 0; transform: scale(1.05); }
          50%, 95% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.05); }
        }
        .hgv-img-1 { animation: fadeCycle1 10s infinite; }
        .hgv-img-2 { animation: fadeCycle2 10s infinite; }
        .hgv-icon { width: 28px; height: 28px; color: var(--teal); position: relative; z-index: 2; margin-bottom: 16px; display: block; }
        .hgv-name { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: white; margin-bottom: 6px; position: relative; z-index: 2; }
        .hgv-desc { font-size: 14px; color: var(--text-muted); line-height: 1.5; position: relative; z-index: 2; }
        @media (max-width: 960px) {
          .hero-grid-visual { 
            margin-top: 32px;
            min-height: 400px;
            gap: 12px;
          }
          .hgv-cell {
            padding: 14px;
            min-width: 0; /* prevent min-content overflow */
          }
          .hgv-name {
            font-size: 15px;
            word-wrap: break-word;
            margin-bottom: 4px;
          }
          .hgv-desc {
            font-size: 12px;
          }
          .hgv-icon {
            width: 20px;
            height: 20px;
            margin-bottom: 8px;
          }
        }
      `}</style>
      <section className="hero" style={{ overflowX: 'hidden' }}>
        <div className="container hero-grid" style={{ alignItems: 'center' }}>
          <div>
            <h1>Transforming Ideas Into <span className="accent">Powerful Solutions</span></h1>

            <p className="desc">
              From product strategy to deployment and long-term support, Auxosys becomes your technology partner at every stage of the journey.
            </p>
          </div>

          <div className="hero-grid-visual">
            {[
              { icon: IconAI, name: "AI Development", desc: "LLMs, automation and intelligent systems", span: 2, imgs: ["/services/ai-1.jpg", "/services/ai-2.jpg"] },
              { icon: IconCloud, name: "Cloud Solutions", desc: "Migration and DevOps", span: 1, imgs: ["/services/cloud-1.jpg", "/services/cloud-2.jpg"] },
              { icon: IconBlockchain, name: "Blockchain", desc: "Smart contracts and DApps", span: 2, imgs: ["/services/blockchain-1.jpg", "/services/blockchain-2.jpg"] },
              { icon: IconMobile, name: "Mobile Apps", desc: "Cross-platform native performance", span: 1, imgs: ["/services/mobile-1.jpg", "/services/mobile-2.jpg"] },
            ].map((c, i) => (
              <div className={`hgv-cell ${c.span === 2 ? 'span-2' : ''}`} key={i}>
                {c.imgs && (
                  <div className="hgv-images">
                    <img src={c.imgs[0]} className="hgv-img-1" alt="" style={{ animationDelay: `${i * 1.5}s` }} />
                    <img src={c.imgs[1]} className="hgv-img-2" alt="" style={{ animationDelay: `${i * 1.5}s` }} />
                  </div>
                )}
                <span className="hgv-icon"><c.icon /></span>
                <div style={{ marginTop: 'auto' }}>
                  <p className="hgv-name">{c.name}</p>
                  <p className="hgv-desc">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SERVICES GRID ===================== */}
      <section className="section alt" id="services">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">What We Build</div>
            <h2>End-to-end technology services</h2>
          </Reveal>
          <Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
              {SERVICES_GROUPS.map((group) => (
                <div key={group.category}>
                  <h3 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--auxo-ink)', marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    {group.category}
                  </h3>
                  <div className="card-grid cols-3">
                    {group.items.map(({ title, href, Icon, desc }) => (
                      <a href={href} className="card" key={title}>
                        <div className="card-icon"><Icon /></div>
                        <h3>{title}</h3>
                        <p>{desc}</p>
                        <span className="card-link">Learn more <Arrow /></span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="card card--dark" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', alignItems: 'center', padding: '48px', marginTop: '24px' }}>
                <h3 style={{ fontSize: '24px' }}>Not sure where to start?</h3>
                <p style={{ margin: '16px 0 24px', opacity: 0.8, maxWidth: '600px' }}>
                  Book a free consultation call with our engineering team to discuss your project requirements and let's build software designed around your business.
                </p>
                <a href="/contact" className="btn btn-primary" style={{ background: '#0FB5A6', color: '#ffffff', border: 'none' }}>
                  Book Consultation
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== PROCESS ===================== */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">How We Work</div>
            <h2>Our Development Process</h2>
          </Reveal>
          <Reveal>
            <div className="card-grid cols-4">
              {PROCESS.map((step) => (
                <div className="card" key={step.n}>
                  <div className="eyebrow" style={{ color: 'var(--teal)' }}>{step.n}</div>
                  <h3 style={{ marginTop: '12px' }}>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== WHY CHOOSE US ===================== */}
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">The Auxosys Difference</div>
            <h2>Why partner with us</h2>
          </Reveal>
          <Reveal>
            <div className="card-grid cols-3">
              {WHY.map(({ Icon, title, desc }) => (
                <div className="card" key={title}>
                  <div className="card-icon"><Icon /></div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <RelatedNews relatedPage="services" />
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
  const globalSeo = await fetchSeoData('/services');
  
  return {
    props: {
      globalSeo
    },
    revalidate: 60,
  };
}