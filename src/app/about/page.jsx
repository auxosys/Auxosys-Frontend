'use client';
import { useState, useEffect } from "react";
import { Lightbulb, Star, Eye, Maximize, BookOpen, Users } from "lucide-react";

const css = `
  .wwa-hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  .wwa-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(8, 14, 23, 0.75); /* Dark overlay */
    z-index: 1;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    opacity: 0;
    animation: bgFade 18s infinite;
  }
  .hero-bg-1 { animation-delay: 0s; }
  .hero-bg-2 { animation-delay: 6s; }
  .hero-bg-3 { animation-delay: 12s; }
  
  @keyframes bgFade {
    0%, 25% { opacity: 1; }
    33%, 92% { opacity: 0; }
    100% { opacity: 1; }
  }

  .hero-left {
    padding: 120px 24px 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(92,201,214,0.1);
    border: 1px solid rgba(92,201,214,0.3);
    border-radius: 999px;
    padding: 6px 16px;
    font-size: 12px;
    font-weight: 500;
    color: var(--teal);
    letter-spacing: 0.05em;
    margin-bottom: 32px;
    width: fit-content;
  }
  .badge::before { content: '●'; font-size: 8px; }

  .hero-heading {
    font-family: var(--font-display);
    font-size: clamp(38px, 5vw, 68px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--white);
    margin-bottom: 28px;
  }
  .hero-heading em {
    font-style: normal;
    background: linear-gradient(135deg, var(--teal), #3C9CA8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-desc {
    font-size: 17px;
    line-height: 1.75;
    color: var(--gray);
    max-width: 520px;
    margin-bottom: 48px;
  }

  .hero-ctas {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .btn-primary {
    background: var(--orange);
    color: var(--white);
    border: none;
    border-radius: 8px;
    padding: 14px 28px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    text-decoration: none;
    display: inline-block;
  }
  .btn-primary:hover { background: var(--orange-hover); transform: translateY(-1px); }

  .btn-secondary {
    background: transparent;
    color: var(--white);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px 28px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: border-color 0.2s, transform 0.2s;
    text-decoration: none;
    display: inline-block;
  }
  .btn-secondary:hover { border-color: var(--teal); transform: translateY(-1px); }

  /* Orbit visual */
  .orbit-wrap {
    width: 380px;
    height: 380px;
    position: relative;
    z-index: 1;
  }
  .orbit-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(92,201,214,0.18);
  }
  .orbit-ring-1 { width: 100%; height: 100%; top: 0; left: 0; }
  .orbit-ring-2 { width: 72%; height: 72%; top: 14%; left: 14%; border-color: rgba(255,107,53,0.15); }
  .orbit-ring-3 { width: 44%; height: 44%; top: 28%; left: 28%; }

  .orbit-node {
    position: absolute;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 600;
    color: var(--white);
    letter-spacing: 0.04em;
  }
  .orbit-node-lg { width: 64px; height: 64px; background: linear-gradient(135deg, var(--orange), var(--orange-hover)); top: 50%; left: 50%; transform: translate(-50%,-50%); }
  .orbit-node-md { width: 46px; height: 46px; background: linear-gradient(135deg, var(--teal), #3C9CA8); }
  .orbit-node-sm { width: 32px; height: 32px; background: var(--bg-1); border: 1.5px solid var(--teal); font-size: 10px; }

  .orbit-line {
    position: absolute;
    background: linear-gradient(90deg, var(--teal), transparent);
    height: 1px;
    transform-origin: left center;
  }

  /* Story section */
  .story-section {
    padding: 120px 80px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 100px;
    align-items: center;
    border-top: 1px solid var(--divider);
  }
  .section-eyebrow {
    font-size: 12px;
    font-weight: 600;
    color: var(--teal);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  .section-heading {
    font-family: var(--font-display);
    font-size: clamp(28px, 3vw, 44px);
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: -0.02em;
    margin-bottom: 24px;
    color: var(--white);
  }
  .section-body {
    font-size: 16px;
    line-height: 1.8;
    color: var(--gray);
  }
  .section-body + .section-body { margin-top: 16px; }

  /* Values section */
  .values-section {
    padding: 100px 80px;
    background: var(--bg-1);
    border-top: 1px solid var(--divider);
  }
  .values-header { text-align: center; margin-bottom: 64px; }
  .values-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    background: var(--divider);
    border-radius: 16px;
    overflow: hidden;
  }
  .value-card {
    background: var(--bg-1);
    padding: 48px 36px;
    transition: background 0.2s;
    position: relative;
    overflow: hidden;
  }
  .value-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px; height: 0;
    background: linear-gradient(180deg, var(--teal), var(--orange));
    transition: height 0.3s;
  }
  .value-card:hover { background: var(--hover-slate); }
  .value-card:hover::before { height: 100%; }

  .value-icon {
    width: 48px; height: 48px;
    background: rgba(92,201,214,0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    color: var(--teal);
  }
  .value-name {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 10px;
  }
  .value-desc { font-size: 14px; line-height: 1.7; color: var(--muted); }

  /* Vision Mission */
  .vm-section {
    padding: 100px 80px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    border-top: 1px solid var(--divider);
    background: var(--bg-0);
  }
  .vm-card {
    padding: 56px 48px;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
  }
  .vm-card-vision {
    background: linear-gradient(135deg, rgba(92,201,214,0.12), rgba(92,201,214,0.03));
    border: 1px solid rgba(92,201,214,0.2);
  }
  .vm-card-mission {
    background: linear-gradient(135deg, rgba(255,107,53,0.12), rgba(255,107,53,0.03));
    border: 1px solid rgba(255,107,53,0.2);
  }
  .vm-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 24px;
  }
  .vm-label-vision { color: var(--teal); }
  .vm-label-mission { color: var(--orange); }
  .vm-text {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 600;
    line-height: 1.5;
    color: var(--white);
  }

  /* Differences */
  .diff-section {
    padding: 100px 80px;
    background: var(--bg-0);
    border-top: 1px solid var(--divider);
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 100px;
    align-items: center;
  }
  .diff-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .diff-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 18px 24px;
    border-radius: 10px;
    border: 1px solid var(--border);
    font-size: 15px;
    font-weight: 500;
    color: var(--gray);
    transition: all 0.2s;
    cursor: default;
  }
  .diff-item:hover {
    border-color: var(--teal);
    color: var(--white);
    background: rgba(92,201,214,0.05);
  }
  .diff-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--teal);
    flex-shrink: 0;
  }

  /* Tech section */
  .tech-section {
    padding: 100px 80px;
    background: var(--bg-1);
    border-top: 1px solid var(--divider);
  }
  .tech-header { text-align: center; margin-bottom: 64px; }
  .tech-groups {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
  }
  .tech-group {
    background: var(--bg-0);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 28px 20px;
    text-align: center;
    transition: border-color 0.2s, transform 0.2s;
  }
  .tech-group:hover { border-color: var(--teal); transform: translateY(-4px); }
  .tech-group-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--teal);
    margin-bottom: 16px;
  }
  .tech-items {
    font-size: 13px;
    line-height: 1.9;
    color: var(--gray);
  }

  /* Commitment CTA */
  .commit-section {
    padding: 120px 80px;
    text-align: center;
    position: relative;
    overflow: hidden;
    border-top: 1px solid var(--divider);
  }
  .commit-section::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(255,107,53,0.08), transparent 70%);
    pointer-events: none;
  }
  .commit-heading {
    font-family: var(--font-display);
    font-size: clamp(30px, 4vw, 52px);
    font-weight: 800;
    line-height: 1.1;
    max-width: 680px;
    margin: 0 auto 24px;
    letter-spacing: -0.02em;
  }
  .commit-desc {
    font-size: 17px;
    color: var(--gray);
    max-width: 540px;
    margin: 0 auto 48px;
    line-height: 1.75;
  }

  @media (max-width: 900px) {
    .wwa-hero { grid-template-columns: 1fr; }
    .hero-right { display: none; }
    .hero-left { padding: 100px 24px 60px; }
    .story-section, .vm-section, .diff-section { grid-template-columns: 1fr; gap: 48px; padding: 60px 24px; }
    .values-section, .tech-section, .commit-section { padding: 60px 24px; }
    .values-grid { grid-template-columns: 1fr; }
    .tech-groups { grid-template-columns: repeat(2, 1fr); }
  }
`;

const values = [
  { icon: <Lightbulb size={24} />, name: "Innovation", desc: "We embrace emerging technologies to create future-ready solutions for complex business problems." },
  { icon: <Star size={24} />, name: "Excellence", desc: "We maintain the highest standards in design, engineering, and user experience across everything." },
  { icon: <Eye size={24} />, name: "Transparency", desc: "Strong partnerships are built through honest communication, open progress, and shared trust." },
  { icon: <Maximize size={24} />, name: "Scalability", desc: "Every solution we build is designed to grow alongside our clients and their ambitions." },
  { icon: <BookOpen size={24} />, name: "Continuous Learning", desc: "Technology evolves rapidly. We invest in staying ahead so our clients always benefit first." },
  { icon: <Users size={24} />, name: "User-Centricity", desc: "We build for the people who use the product, not the system that powers it." },
];

const diffs = [
  "Product-first engineering mindset",
  "Modern technology stack",
  "AI-first development approach",
  "Enterprise-grade architecture",
  "Long-term technical partnerships",
  "Focus on performance and scalability",
];

const techs = [
  { label: "Frontend", items: "React\nNext.js\nTypeScript" },
  { label: "Backend", items: "Node.js\nNestJS\nSupabase" },
  { label: "Cloud", items: "AWS\nDocker\nKubernetes" },
  { label: "AI", items: "OpenAI\nGemini\nClaude" },
  { label: "Emerging", items: "Blockchain\nWeb3\nAutomation" },
];

export default function WhoWeAre() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <>
      <style>{css}</style>

      {/* Hero */}
      <section className="wwa-hero">
        <img src="/images/about-bg-1.jpg" alt="Hydrogen Energy" className="hero-bg hero-bg-1" />
        <img src="/images/about-bg-2.jpg" alt="Engineer" className="hero-bg hero-bg-2" />
        <img src="/images/about-bg-3.jpg" alt="VR Person" className="hero-bg hero-bg-3" />
        
        <div className="hero-left" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "opacity 0.8s, transform 0.8s" }}>

          <h1 className="hero-heading">
            We Engineer<br /><em>Digital Innovation</em><br />for the Next Generation
          </h1>
          <p className="hero-desc">
            Auxosys is a modern technology startup dedicated to transforming ambitious ideas into intelligent digital solutions — AI platforms, SaaS products, blockchain solutions, and enterprise systems built to lead.
          </p>
          <div className="hero-ctas">
            <a href="/services" className="btn-primary">Explore Our Services</a>
            <a href="/contact" className="btn-secondary">Contact Our Team</a>
          </div>
        </div>

      </section>

      {/* Our Story */}
      <section className="story-section">
        <div>
          <p className="section-eyebrow">Our Story</p>
          <h2 className="section-heading">Every great company begins with a vision.</h2>
        </div>
        <div>
          <p className="section-body">Auxosys was founded with a simple yet ambitious goal — to create technology that solves meaningful problems while enabling businesses to embrace digital transformation with confidence.</p>
          <p className="section-body" style={{ marginTop: 18 }}>We believe software should be more than functional. It should be intelligent, scalable, secure, and built to evolve with the future. Whether helping startups launch their first product or supporting enterprises through complex transformation, we approach every challenge with innovation, precision, and long-term thinking.</p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="vm-section">
        <div className="vm-card vm-card-vision">
          <p className="vm-label vm-label-vision">Vision</p>
          <p className="vm-text">To become a globally recognized technology company building innovative digital ecosystems that transform industries through AI, cloud computing, automation, and modern software engineering.</p>
        </div>
        <div className="vm-card vm-card-mission">
          <p className="vm-label vm-label-mission">Mission</p>
          <p className="vm-text">To empower organizations by delivering intelligent software solutions that are scalable, secure, and designed for sustainable business growth.</p>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <div className="values-header">
          <p className="section-eyebrow">Core Values</p>
          <h2 className="section-heading">What drives everything we build</h2>
        </div>
        <div className="values-grid">
          {values.map((v) => (
            <div className="value-card" key={v.name}>
              <div className="value-icon">{v.icon}</div>
              <p className="value-name">{v.name}</p>
              <p className="value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="diff-section">
        <div>
          <p className="section-eyebrow">What Makes Us Different</p>
          <h2 className="section-heading">Built different. By design.</h2>
          <p className="section-body" style={{ marginTop: 16 }}>We don't just deliver projects. We build long-term technology partnerships grounded in engineering excellence.</p>
        </div>
        <div className="diff-list">
          {diffs.map((d) => (
            <div className="diff-item" key={d}>
              <span className="diff-dot" />
              {d}
            </div>
          ))}
        </div>
      </section>

      {/* Technologies */}
      <section className="tech-section">
        <div className="tech-header">
          <p className="section-eyebrow">Technologies We Work With</p>
          <h2 className="section-heading">Modern stack, enterprise results</h2>
        </div>
        <div className="tech-groups">
          {techs.map((t) => (
            <div className="tech-group" key={t.label}>
              <p className="tech-group-label">{t.label}</p>
              <p className="tech-items">{t.items.split("\n").map((item, i) => <span key={i} style={{ display: "block" }}>{item}</span>)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Commitment CTA */}
      <section className="commit-section">
        <p className="section-eyebrow" style={{ marginBottom: 16 }}>Our Commitment</p>
        <h2 className="commit-heading">Success is measured by the value we create — not just the software we ship.</h2>
        <p className="commit-desc">At Auxosys, we build for the long term — for our clients, our community, and the future of technology.</p>
        <a href="/contact" className="btn-primary">Let's Build Together</a>
      </section>
    </>
  );
}