import Reveal from '@/components/Reveal';
import { ArrowUpRight } from 'lucide-react';
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
  IconHandshake 
} from '@/components/Icons';

/* small arrow affordance reused by every card link */
const Arrow = () => (
  <span className="arw"><ArrowUpRight size={13} strokeWidth={2.5} /></span>
);

const INDUSTRIES = [
  { icon: IconHealthcare, name: "Healthcare", desc: "Digital healthcare systems, patient management, telemedicine, and secure healthcare platforms.", tags: ["EHR Systems", "Telemedicine", "HIPAA Compliant"] },
  { icon: IconFinance, name: "Finance", desc: "FinTech applications, payment systems, digital banking, and financial analytics.", tags: ["Payments", "Digital Banking", "Compliance"] },
  { icon: IconEducation, name: "Education", desc: "Learning Management Systems, EdTech platforms, and digital education solutions.", tags: ["LMS", "EdTech", "E-Learning"] },
  { icon: IconRetail, name: "Retail & E-Commerce", desc: "Inventory management, omnichannel commerce, POS systems, and customer engagement.", tags: ["E-Commerce", "POS", "Omnichannel"] },
  { icon: IconLogistics, name: "Logistics", desc: "Fleet management, shipment tracking, warehouse automation, and route optimization.", tags: ["Fleet", "Tracking", "Automation"] },
  { icon: IconManufacturing, name: "Manufacturing", desc: "Factory automation, ERP systems, production analytics, and industrial monitoring.", tags: ["ERP", "IoT", "Analytics"] },
  { icon: IconRealEstate, name: "Real Estate", desc: "Property management platforms, CRM solutions, and real estate marketplaces.", tags: ["Property Mgmt", "CRM", "Marketplace"] },
  { icon: IconWeb, name: "Travel & Hospitality", desc: "Booking systems, customer portals, travel management, and hospitality automation.", tags: ["Booking", "CMS", "CRM"] },
  { icon: IconWeb, name: "Agriculture", desc: "Smart farming, IoT integration, precision agriculture, and supply chain solutions.", tags: ["Smart Farming", "IoT", "Analytics"] },
  { icon: IconStartup, name: "Startups", desc: "MVP development, product engineering, AI integration, and growth consulting.", tags: ["MVP", "AI", "Consulting"] },
  { icon: IconShield, name: "Enterprise", desc: "Large-scale digital transformation, enterprise software, and intelligent automation.", tags: ["ERP", "Cloud Migration", "Automation"] },
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

export default function IndustriesPage() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>Industry-Focused <span className="accent">Technology Solutions</span></h1>
            <span className="hero-highlight">Industries We Serve</span>
            <p className="desc">
              Every industry faces unique operational challenges. Auxosys builds tailored software solutions designed to improve efficiency, automate processes, and create measurable business impact.
            </p>
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