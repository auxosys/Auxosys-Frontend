import React from 'react';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';
import { ArrowUpRight } from 'lucide-react';
import RelatedNews from '@/components/ui/RelatedNews';
import {
  IconHealthcare,
  IconFinance,
  IconEducation,
  IconRetail,
  IconLogistics,
  IconManufacturing,
  IconRealEstate,
  IconStartup,
  IconWeb,
  IconShield,
  IconBrain,
  IconCloud,
  IconTools,
  IconBlockchain,
  IconSearch,
  IconHandshake,
  IconLightning
} from '@/components/Icons';

/* small arrow affordance reused by every card link */
const Arrow = () => (
  <span className="arw"><ArrowUpRight size={13} strokeWidth={2.5} /></span>
);

const INDUSTRIES = [
  { icon: IconHealthcare, name: "Healthcare & Life Sciences", desc: "Digital healthcare systems, patient management, telemedicine, and secure healthcare platforms.", tags: ["EHR Systems", "Telemedicine", "HIPAA"] },
  { icon: IconRetail, name: "Retail & E-Commerce", desc: "Inventory management, omnichannel commerce, POS systems, and customer engagement.", tags: ["E-Commerce", "POS", "Omnichannel"] },
  { icon: IconManufacturing, name: "Manufacturing & Industrial", desc: "Factory automation, ERP systems, production analytics, and industrial monitoring.", tags: ["ERP", "IoT", "Analytics"] },
  { icon: IconFinance, name: "Banking, Finance & Insurance", desc: "FinTech applications, payment systems, digital banking, and financial analytics.", tags: ["Payments", "Banking", "Compliance"] },
  { icon: IconEducation, name: "Education & EdTech", desc: "Learning Management Systems, EdTech platforms, and digital education solutions.", tags: ["LMS", "EdTech", "E-Learning"] },
  { icon: IconLogistics, name: "Logistics & Supply Chain", desc: "Fleet management, shipment tracking, warehouse automation, and route optimization.", tags: ["Fleet", "Tracking", "Automation"] },
  { icon: IconWeb, name: "Hospitality & Travel", desc: "Booking systems, customer portals, travel management, and hospitality automation.", tags: ["Booking", "CMS", "CRM"] },
  { icon: IconRealEstate, name: "Real Estate & Construction", desc: "Property management platforms, CRM solutions, and real estate marketplaces.", tags: ["Property Mgmt", "CRM", "Marketplace"] },
  { icon: IconLightning, name: "Energy & Utilities", desc: "Smart grid management, energy analytics, IoT integration, and resource optimization.", tags: ["Smart Grid", "IoT", "Analytics"] },
  { icon: IconWeb, name: "Agriculture & AgriTech", desc: "Smart farming, IoT integration, precision agriculture, and supply chain solutions.", tags: ["Smart Farming", "IoT", "Analytics"] },
];

const APPROACHES = [
  { name: "Understand", desc: "Every industry has unique workflows and operational requirements we study first." },
  { name: "Analyze", desc: "Identify opportunities for automation, optimization, and digital innovation." },
  { name: "Design", desc: "Develop customized digital experiences tailored to your users." },
  { name: "Build", desc: "Deliver scalable software with enterprise-grade architecture and security." },
  { name: "Optimize", desc: "Continuously improve systems based on analytics and business insights." },
];

const TECH_PILLS = [
  { icon: IconBrain, name: "Artificial Intelligence" },
  { icon: IconCloud, name: "Cloud Computing" },
  { icon: IconTools, name: "Automation" },
  { icon: IconBlockchain, name: "Blockchain" },
  { icon: IconSearch, name: "Data Analytics" },
  { icon: IconShield, name: "Cybersecurity" },
  { icon: IconWeb, name: "Internet of Things" },
  { icon: IconHandshake, name: "Enterprise Integration" },
];

import { fetchSeoData } from '@/utils/fetchSeo';

export default function IndustriesPage({ globalSeo }) {
  return (
    <>
      <SEO 
        globalSeo={globalSeo}
        title="Industries | Tech Solutions for Every Sector - Auxosys"
        description="Auxosys provides specialized digital transformation, cloud architecture, and secure software development for healthcare, finance, retail, logistics, and more."
        urlPath="/industries"
      />
      {/* ===================== HERO ===================== */}
      <section className="hero" style={{ overflow: 'hidden' }}>
        <style>{`
          .industries-hero-visual {
            position: relative;
            width: 100%;
            max-width: 520px;
            aspect-ratio: 520/460;
            margin: 0 auto 40px auto;
          }
          .industries-stat-card {
            position: absolute;
            bottom: 20px;
            left: 0;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.6);
            border-radius: 16px;
            padding: 16px 20px;
            box-shadow: 0 16px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.3) inset;
            z-index: 2;
            display: flex;
            align-items: center;
            gap: 14px;
            max-width: 240px;
          }
          @media (min-width: 768px) {
            .industries-hero-visual {
              height: 460px;
              margin-bottom: 0;
            }
            .industries-stat-card {
              left: -20px;
            }
          }
        `}</style>
        <div className="container hero-grid">
          <div>
            <h1>Industry-Focused <span className="accent">Technology Solutions</span></h1>

            <p className="desc">
              Every industry faces unique operational challenges. Auxosys builds tailored software solutions designed to improve efficiency, automate processes, and create measurable business impact.
            </p>
          </div>

          {/* ---------- RIGHT SIDE VISUAL (blob shape) ---------- */}
          <div className="industries-hero-visual">

            {/* Outline blob (behind, offset) - the thin white/light stroke accent */}
            <svg
              viewBox="0 0 520 460"
              style={{ position: 'absolute', top: '4%', left: '4%', width: '100%', height: '100%', zIndex: 0 }}
            >
              <path
                d="M120,40 C220,-10 380,10 440,110 C500,210 480,330 400,400 C320,470 180,470 100,400 C20,330 0,210 40,130 C60,90 80,60 120,40 Z"
                fill="none"
                stroke="var(--teal)"
                strokeWidth="2"
                opacity="0.4"
              />
            </svg>

            {/* Solid blob with clipped image inside */}
            <svg viewBox="0 0 520 460" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
              <defs>
                <clipPath id="industryBlobClip" clipPathUnits="userSpaceOnUse">
                  <path d="M100,20 C210,-30 380,0 440,100 C500,200 490,320 410,390 C330,460 180,460 100,390 C20,320 -10,200 30,110 C50,70 70,45 100,20 Z" />
                </clipPath>
              </defs>

              {/* fallback solid fill so the shape reads even before/without an image */}
              <path
                d="M100,20 C210,-30 380,0 440,100 C500,200 490,320 410,390 C330,460 180,460 100,390 C20,320 -10,200 30,110 C50,70 70,45 100,20 Z"
                fill="var(--teal)"
                opacity="0.9"
              />

              <image
                href="/images/industries-hero-2.jpg"
                x="0"
                y="0"
                width="520"
                height="460"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#industryBlobClip)"
              />
            </svg>

            {/* Floating stat card, anchored safely within bounds */}
            <div className="industries-stat-card">
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--teal), #00d2ff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: '15px',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(12, 128, 116, 0.3)'
              }}>11+</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text)' }}>Industries Served</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Across every vertical</div>
              </div>
            </div>

            {/* Decorative dot grid, contained within the visual box, not overflowing the section */}
            <div style={{
              position: 'absolute',
              top: '0px',
              right: '0px',
              width: '70px',
              height: '70px',
              backgroundImage: 'radial-gradient(rgba(148, 172, 206, 0.5) 2px, transparent 2px)',
              backgroundSize: '14px 14px',
              zIndex: 0,
            }} />
          </div>
        </div>
      </section>

      {/* ===================== INDUSTRIES GRID ===================== */}
      <section className="section alt" id="industries">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Coverage</div>
            <h2>Every industry, every challenge</h2>
          </Reveal>
          <Reveal>
            <div className="card-grid cols-3">
              {INDUSTRIES.map(({ name, desc, icon: Icon, tags }) => (
                <div className="card" key={name}>
                  <div className="card-icon"><Icon /></div>
                  <h3>{name}</h3>
                  <p>{desc}</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
                    {tags.map(tag => (
                      <span key={tag} style={{ fontSize: '11px', color: 'var(--text-muted)', background: 'var(--border-subtle)', padding: '4px 10px', borderRadius: '4px' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== APPROACH ===================== */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Our Approach</div>
            <h2>How we engage with every industry</h2>
          </Reveal>
          <Reveal>
            <div className="card-grid cols-5">
              {APPROACHES.map((step, i) => (
                <div className="card" key={step.name}>
                  <div className="eyebrow" style={{ color: 'var(--teal)' }}>0{i + 1}</div>
                  <h3 style={{ marginTop: '12px', fontSize: '16px' }}>{step.name}</h3>
                  <p style={{ fontSize: '14px' }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== TECH PILLS ===================== */}
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Technology Domains</div>
            <h2>Cutting-edge tech across every vertical</h2>
          </Reveal>
          <Reveal>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
              {TECH_PILLS.map(({ name, icon: Icon }) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 24px', border: '1px solid var(--border-subtle)', borderRadius: '12px', background: 'var(--surface-bg)' }}>
                  <Icon />
                  <span style={{ fontWeight: 600 }}>{name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <RelatedNews relatedPage="industries" />
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
  const globalSeo = await fetchSeoData('/industries');
  
  return {
    props: {
      globalSeo
    },
    revalidate: 60,
  };
}