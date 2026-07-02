"use client";

import { useState } from "react";
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
} from "@/components/Icons";

const css = `
  /* ─── HERO ─── */
  .ind-hero {
    min-height: 72vh;
    padding: 140px 80px 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid var(--divider);
  }
  .hero-bg-slider {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
  }
  .hero-bg-slider::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(9, 15, 28, 0.5), rgba(9, 15, 28, 0.95));
    z-index: 1;
  }
  .hero-bg-slide {
    position: absolute; inset: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0;
    z-index: 0;
    animation: heroFadeCycle 15s infinite;
  }
  .hero-bg-slide.slide-1 { background-image: url('/images/industries-hero-1.jpg'); animation-delay: 0s; }
  .hero-bg-slide.slide-2 { background-image: url('/images/industries-hero-2.jpg'); animation-delay: 5s; }
  .hero-bg-slide.slide-3 { background-image: url('/images/industries-hero-3.jpg'); animation-delay: 10s; }
  
  @keyframes heroFadeCycle {
    0%, 25% { opacity: 1; transform: scale(1); }
    33.3%, 91.6% { opacity: 0; transform: scale(1.05); }
    100% { opacity: 1; transform: scale(1); }
  }
  /* floating label pills behind hero */
  .hero-floaters {
    position: absolute; inset: 0;
    pointer-events: none; overflow: hidden;
  }
  .hero-float {
    position: absolute;
    font-size: 11px; font-weight: 600;
    color: var(--border);
    background: var(--bg-1);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 5px 14px;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }
  .hero-eyebrow {
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--teal); margin-bottom: 24px;
    position: relative; z-index: 1;
  }
  .ind-h1 {
    font-family: var(--font-display);
    font-size: clamp(40px, 5.5vw, 72px);
    font-weight: 800; line-height: 1.04;
    letter-spacing: -0.03em;
    max-width: 860px;
    margin-bottom: 28px;
    position: relative; z-index: 1;
  }
  .ind-h1 span {
    display: inline-block;
    background: linear-gradient(135deg, var(--teal) 0%, var(--orange) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .ind-hero-desc {
    font-size: 18px; line-height: 1.78;
    color: var(--gray);
    max-width: 640px; margin-bottom: 52px;
    position: relative; z-index: 1;
  }
  .hero-count-row {
    display: flex; gap: 48px; flex-wrap: wrap;
    justify-content: center;
    position: relative; z-index: 1;
  }
  .hero-count { text-align: center; }
  .hero-count-num {
    font-family: var(--font-display);
    font-size: 44px; font-weight: 800;
    line-height: 1; letter-spacing: -0.04em;
    color: var(--white);
  }
  .hero-count-num sup { font-size: 22px; color: var(--teal); }
  .hero-count-label { font-size: 13px; color: var(--muted); margin-top: 6px; }

  /* ─── INDUSTRIES MOSAIC ─── */
  .industries-section {
    padding: 100px 80px;
  }
  .section-eyebrow {
    font-size: 12px; font-weight: 600;
    color: var(--teal); letter-spacing: 0.15em;
    text-transform: uppercase; margin-bottom: 14px;
    text-align: center;
  }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(26px, 3vw, 44px);
    font-weight: 700; letter-spacing: -0.02em;
    text-align: center; margin-bottom: 56px;
  }

  /* Mosaic: rows of varying column counts */
  .mosaic {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .mosaic-row {
    display: grid;
    gap: 12px;
  }
  .mosaic-row-3 { grid-template-columns: 1.4fr 1fr 1fr; }
  .mosaic-row-4 { grid-template-columns: 1fr 1fr 1fr 1fr; }
  .mosaic-row-4b { grid-template-columns: 1fr 1fr 1.4fr 1fr; }

  .ind-card {
    background: var(--bg-1);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 36px 32px;
    position: relative;
    overflow: hidden;
    cursor: default;
    transition: transform 0.3s, border-color 0.3s;
    min-height: 190px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .ind-card::before {
    content: '';
    position: absolute; inset: 0;
    opacity: 0;
    transition: opacity 0.35s;
    border-radius: 18px;
  }
  .ind-card:hover { transform: translateY(-5px); }
  .ind-card:hover::before { opacity: 1; }

  /* unique gradient per card using css vars */
  .ind-card[data-glow="teal"]::before {
    background: radial-gradient(circle at 0% 0%, rgba(92,201,214,0.12), transparent 65%);
    border: 1px solid rgba(92,201,214,0.2);
  }
  .ind-card[data-glow="teal"]:hover { border-color: rgba(92,201,214,0.4); }
  .ind-card[data-glow="orange"]::before {
    background: radial-gradient(circle at 0% 0%, rgba(255,107,53,0.12), transparent 65%);
  }
  .ind-card[data-glow="orange"]:hover { border-color: rgba(255,107,53,0.35); }
  .ind-card[data-glow="amber"]::before {
    background: radial-gradient(circle at 0% 0%, rgba(245,158,11,0.1), transparent 65%);
  }
  .ind-card[data-glow="amber"]:hover { border-color: rgba(245,158,11,0.3); }

  .ind-card-top { display: flex; align-items: flex-start; justify-content: space-between; }
  .ind-card-icon {
    width: 56px; height: 56px;
    border-radius: 14px;
    background: rgba(255,255,255,0.04);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    color: var(--teal);
  }
  .ind-card-icon svg { width: 32px; height: 32px; }
  .ind-card-arrow {
    font-size: 18px; color: var(--border);
    transition: color 0.2s, transform 0.2s;
  }
  .ind-card:hover .ind-card-arrow { color: var(--teal); transform: translate(3px, -3px); }

  .ind-card-name {
    font-family: var(--font-display);
    font-size: 20px; font-weight: 700;
    color: var(--white); margin-bottom: 8px;
  }
  .ind-card-desc {
    font-size: 13px; line-height: 1.7;
    color: var(--muted);
    max-height: 0; overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.3s;
    opacity: 0;
  }
  .ind-card:hover .ind-card-desc { max-height: 100px; opacity: 1; }

  .ind-card-tags {
    display: flex; gap: 6px; flex-wrap: wrap; margin-top: 16px;
  }
  .ind-tag {
    font-size: 11px; font-weight: 500;
    color: var(--muted);
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 5px; padding: 3px 10px;
  }

  /* ─── APPROACH ─── */
  .approach-section {
    padding: 100px 80px;
    background: var(--bg-1);
    border-top: 1px solid var(--divider);
  }
  .approach-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2px;
    background: var(--divider);
    border-radius: 16px;
    overflow: hidden;
    margin-top: 56px;
  }
  .approach-step {
    background: var(--bg-1);
    padding: 40px 28px;
    position: relative;
    transition: background 0.2s;
  }
  .approach-step:hover { background: var(--hover-slate); }
  .approach-step-num {
    font-family: var(--font-display);
    font-size: 48px; font-weight: 800;
    color: rgba(92,201,214,0.08);
    line-height: 1; margin-bottom: 20px;
    transition: color 0.2s;
  }
  .approach-step:hover .approach-step-num { color: rgba(92,201,214,0.18); }
  .approach-step-name {
    font-family: var(--font-display);
    font-size: 16px; font-weight: 700;
    color: var(--teal); margin-bottom: 10px;
  }
  .approach-step-desc { font-size: 13px; color: var(--muted); line-height: 1.7; }

  /* ─── TECH ACROSS INDUSTRIES ─── */
  .tech-section {
    padding: 100px 80px;
    border-top: 1px solid var(--divider);
  }
  .tech-pills {
    display: flex; flex-wrap: wrap;
    gap: 12px; justify-content: center;
    margin-top: 52px;
  }
  .tech-pill {
    display: flex; align-items: center; gap: 10px;
    background: var(--bg-1);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px 24px;
    transition: all 0.2s;
    cursor: default;
  }
  .tech-pill:hover { border-color: var(--teal); transform: translateY(-3px); background: var(--hover-slate); }
  .tech-pill-icon { width: 22px; height: 22px; color: var(--teal); }
  .tech-pill-name { font-size: 14px; font-weight: 600; color: var(--white); }

  /* ─── CTA ─── */
  .ind-cta {
    padding: 120px 80px;
    border-top: 1px solid var(--divider);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    position: relative; overflow: hidden;
  }
  .ind-cta::before {
    content: '';
    position: absolute; left: -100px; top: 50%;
    transform: translateY(-50%);
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(92,201,214,0.06), transparent 70%);
    pointer-events: none;
  }
  .cta-label { font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--orange); margin-bottom: 20px; }
  .cta-h2 {
    font-family: var(--font-display);
    font-size: clamp(28px, 3.5vw, 48px);
    font-weight: 800; letter-spacing: -0.02em;
    line-height: 1.08; margin-bottom: 20px;
  }
  .cta-p { font-size: 16px; color: var(--gray); line-height: 1.8; margin-bottom: 40px; }
  .cta-row { display: flex; gap: 14px; flex-wrap: wrap; }
  .btn-primary {
    background: var(--orange); color: var(--white);
    border: none; border-radius: 8px;
    padding: 14px 28px; font-size: 15px; font-weight: 600;
    cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block;
  }
  .btn-primary:hover { background: var(--orange-hover); transform: translateY(-1px); }
  .btn-ghost {
    background: transparent; color: var(--white);
    border: 1px solid var(--border); border-radius: 8px;
    padding: 14px 28px; font-size: 15px; font-weight: 500;
    cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block;
  }
  .btn-ghost:hover { border-color: var(--teal); transform: translateY(-1px); }

  .cta-right {
    background: var(--bg-1);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 48px 40px;
  }
  .cta-right-title {
    font-family: var(--font-display);
    font-size: 18px; font-weight: 700; color: var(--white); margin-bottom: 24px;
  }
  .cta-checklist { display: flex; flex-direction: column; gap: 14px; }
  .cta-check {
    display: flex; align-items: center; gap: 14px;
    font-size: 14px; color: var(--gray);
  }
  .check-icon {
    width: 28px; height: 28px; border-radius: 50%;
    background: rgba(92,201,214,0.12);
    border: 1px solid rgba(92,201,214,0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; color: var(--teal); flex-shrink: 0;
  }

  @media (max-width: 960px) {
    .ind-hero { padding: 100px 24px 60px; }
    .hero-floaters { display: none; }
    .industries-section, .approach-section, .tech-section { padding: 60px 24px; }
    .mosaic-row-3, .mosaic-row-4, .mosaic-row-4b { grid-template-columns: 1fr 1fr; }
    .approach-grid { grid-template-columns: 1fr; }
    .ind-cta { grid-template-columns: 1fr; gap: 40px; padding: 60px 24px; }
  }
`;

const industries = [
  { icon: IconHealthcare, name: "Healthcare", desc: "Digital healthcare systems, patient management, telemedicine, and secure healthcare platforms.", tags: ["EHR Systems", "Telemedicine", "HIPAA Compliant"], glow: "teal", row: 0 },
  { icon: IconFinance, name: "Finance", desc: "FinTech applications, payment systems, digital banking, and financial analytics.", tags: ["Payments", "Digital Banking", "Compliance"], glow: "orange", row: 0 },
  { icon: IconEducation, name: "Education", desc: "Learning Management Systems, EdTech platforms, and digital education solutions.", tags: ["LMS", "EdTech", "E-Learning"], glow: "amber", row: 0 },
  { icon: IconRetail, name: "Retail & E-Commerce", desc: "Inventory management, omnichannel commerce, POS systems, and customer engagement.", tags: ["E-Commerce", "POS", "Omnichannel"], glow: "teal", row: 1 },
  { icon: IconLogistics, name: "Logistics", desc: "Fleet management, shipment tracking, warehouse automation, and route optimization.", tags: ["Fleet", "Tracking", "Automation"], glow: "orange", row: 1 },
  { icon: IconManufacturing, name: "Manufacturing", desc: "Factory automation, ERP systems, production analytics, and industrial monitoring.", tags: ["ERP", "IoT", "Analytics"], glow: "amber", row: 1 },
  { icon: IconRealEstate, name: "Real Estate", desc: "Property management platforms, CRM solutions, and real estate marketplaces.", tags: ["Property Mgmt", "CRM", "Marketplace"], glow: "teal", row: 1 },
  { icon: IconWeb, name: "Travel & Hospitality", desc: "Booking systems, customer portals, travel management, and hospitality automation.", tags: ["Booking", "CMS", "CRM"], glow: "orange", row: 2 },
  { icon: IconWeb, name: "Agriculture", desc: "Smart farming, IoT integration, precision agriculture, and supply chain solutions.", tags: ["Smart Farming", "IoT", "Analytics"], glow: "amber", row: 2 },
  { icon: IconStartup, name: "Startups", desc: "MVP development, product engineering, AI integration, and growth consulting.", tags: ["MVP", "AI", "Consulting"], glow: "teal", row: 2 },
  { icon: IconShield, name: "Enterprise", desc: "Large-scale digital transformation, enterprise software, and intelligent automation.", tags: ["ERP", "Cloud Migration", "Automation"], glow: "orange", row: 2 },
];

const approaches = [
  { name: "Understand", desc: "Every industry has unique workflows and operational requirements we study first." },
  { name: "Analyze", desc: "Identify opportunities for automation, optimization, and digital innovation." },
  { name: "Design", desc: "Develop customized digital experiences tailored to your users." },
  { name: "Build", desc: "Deliver scalable software with enterprise-grade architecture and security." },
  { name: "Optimize", desc: "Continuously improve systems based on analytics and business insights." },
];

const techPills = [
  { icon: IconBrain, name: "Artificial Intelligence" },
  { icon: IconCloud, name: "Cloud Computing" },
  { icon: IconTools, name: "Automation" },
  { icon: IconBlockchain, name: "Blockchain" },
  { icon: IconSearch, name: "Data Analytics" },
  { icon: IconShield, name: "Cybersecurity" },
  { icon: IconWeb, name: "Internet of Things" },
  { icon: IconHandshake, name: "Enterprise Integration" },
];

const floaters = [
  { label: "Healthcare", top: "12%", left: "8%" },
  { label: "FinTech", top: "18%", left: "72%" },
  { label: "EdTech", top: "75%", left: "6%" },
  { label: "Blockchain", top: "68%", left: "80%" },
  { label: "AI", top: "40%", left: "88%" },
  { label: "Cloud", top: "85%", left: "40%" },
  { label: "IoT", top: "10%", left: "42%" },
  { label: "Automation", top: "55%", left: "2%" },
];

export default function Industries() {
  const [hovered, setHovered] = useState(null);

  const row0 = industries.filter(i => i.row === 0);
  const row1 = industries.filter(i => i.row === 1);
  const row2 = industries.filter(i => i.row === 2);

  return (
    <>
      <style>{css}</style>

      {/* Hero */}
      <section className="ind-hero">
        <div className="hero-bg-slider">
          <div className="hero-bg-slide slide-1"></div>
          <div className="hero-bg-slide slide-2"></div>
          <div className="hero-bg-slide slide-3"></div>
        </div>
        <div className="hero-floaters">
          {floaters.map((f, i) => (
            <span key={i} className="hero-float" style={{ top: f.top, left: f.left }}>{f.label}</span>
          ))}
        </div>
        <p className="hero-eyebrow">Industries We Serve</p>
        <h1 className="ind-h1">
          Industry-Focused<br /><span>Technology Solutions</span>
        </h1>
        <p className="ind-hero-desc">
          Every industry faces unique operational challenges. Auxosys builds tailored software solutions designed to improve efficiency, automate processes, and create measurable business impact.
        </p>
        <div className="hero-count-row">
          <div className="hero-count">
            <p className="hero-count-num">11<sup>+</sup></p>
            <p className="hero-count-label">Industries</p>
          </div>
          <div className="hero-count">
            <p className="hero-count-num">50<sup>+</sup></p>
            <p className="hero-count-label">Use Cases</p>
          </div>
          <div className="hero-count">
            <p className="hero-count-num">8<sup>+</sup></p>
            <p className="hero-count-label">Tech Domains</p>
          </div>
        </div>
      </section>

      {/* Industries Mosaic */}
      <section className="industries-section">
        <p className="section-eyebrow">Coverage</p>
        <h2 className="section-title">Every industry, every challenge</h2>

        <div className="mosaic">
          <div className="mosaic-row mosaic-row-3">
            {row0.map((ind, i) => (
              <div
                key={ind.name}
                className="ind-card"
                data-glow={ind.glow}
                onMouseEnter={() => setHovered(ind.name)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="ind-card-top">
                  <div className="ind-card-icon"><ind.icon /></div>
                  <span className="ind-card-arrow">↗</span>
                </div>
                <div>
                  <p className="ind-card-name">{ind.name}</p>
                  <p className="ind-card-desc">{ind.desc}</p>
                  <div className="ind-card-tags">
                    {ind.tags.map(t => <span className="ind-tag" key={t}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mosaic-row mosaic-row-4">
            {row1.map((ind) => (
              <div
                key={ind.name}
                className="ind-card"
                data-glow={ind.glow}
                onMouseEnter={() => setHovered(ind.name)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="ind-card-top">
                  <div className="ind-card-icon"><ind.icon /></div>
                  <span className="ind-card-arrow">↗</span>
                </div>
                <div>
                  <p className="ind-card-name">{ind.name}</p>
                  <p className="ind-card-desc">{ind.desc}</p>
                  <div className="ind-card-tags">
                    {ind.tags.map(t => <span className="ind-tag" key={t}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mosaic-row mosaic-row-4b">
            {row2.map((ind) => (
              <div
                key={ind.name}
                className="ind-card"
                data-glow={ind.glow}
                onMouseEnter={() => setHovered(ind.name)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="ind-card-top">
                  <div className="ind-card-icon"><ind.icon /></div>
                  <span className="ind-card-arrow">↗</span>
                </div>
                <div>
                  <p className="ind-card-name">{ind.name}</p>
                  <p className="ind-card-desc">{ind.desc}</p>
                  <div className="ind-card-tags">
                    {ind.tags.map(t => <span className="ind-tag" key={t}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="approach-section">
        <p className="section-eyebrow">Our Approach</p>
        <h2 className="section-title">How we engage with every industry</h2>
        <div className="approach-grid">
          {approaches.map((a, i) => (
            <div className="approach-step" key={a.name}>
              <p className="approach-step-num">0{i + 1}</p>
              <p className="approach-step-name">{a.name}</p>
              <p className="approach-step-desc">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Across Industries */}
      <section className="tech-section">
        <p className="section-eyebrow">Technology Domains</p>
        <h2 className="section-title">Cutting-edge tech across every vertical</h2>
        <div className="tech-pills">
          {techPills.map(t => (
            <div className="tech-pill" key={t.name}>
              <span className="tech-pill-icon"><t.icon /></span>
              <span className="tech-pill-name">{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="ind-cta">
        <div>
          <p className="cta-label">Ready to Transform?</p>
          <h2 className="cta-h2">Let's build the future of your industry together.</h2>
          <p className="cta-p">No matter your industry, our team combines technical expertise with business understanding to create solutions that deliver measurable value.</p>
          <div className="cta-row">
            <a href="/contact" className="btn-primary">Start Your Project</a>
            <a href="/services" className="btn-ghost">View Our Services</a>
          </div>
        </div>

        <div className="cta-right">
          <p className="cta-right-title">What you can expect</p>
          <div className="cta-checklist">
            {[
              "Deep industry-specific discovery sessions",
              "Custom technology recommendations",
              "Agile delivery with full transparency",
              "Enterprise-grade architecture by default",
              "Long-term partnership and support",
              "Scalable solutions built for growth",
            ].map(item => (
              <div className="cta-check" key={item}>
                <span className="check-icon">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}