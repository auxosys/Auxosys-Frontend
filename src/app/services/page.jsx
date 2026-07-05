"use client";

import { useState } from "react";
import { 
  IconAI, 
  IconCloud, 
  IconMobile, 
  IconBlockchain, 
  IconBrain, 
  IconLightning, 
  IconSearch, 
  IconTools, 
  IconShield, 
  IconHandshake 
} from "@/components/Icons";

const css = `
  /* ─── HERO ─── */
  .svc-hero {
    height: 100vh;
    min-height: 750px;
    padding: 100px 80px 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid var(--divider);
  }
  .svc-hero-bg-slider {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
  }
  .svc-hero-bg-slider::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(to right, rgba(9, 15, 28, 0.95) 0%, rgba(9, 15, 28, 0.5) 100%);
    z-index: 1;
  }
  .svc-hero-bg-slide {
    position: absolute; inset: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0;
    z-index: 0;
    animation: svcHeroFadeCycle 15s infinite;
  }
  .svc-hero-bg-slide.slide-1 { background-image: url('/images/services-hero-1.jpg'); animation-delay: 0s; }
  .svc-hero-bg-slide.slide-2 { background-image: url('/images/services-hero-2.jpg'); animation-delay: 5s; }
  .svc-hero-bg-slide.slide-3 { background-image: url('/images/services-hero-3.jpg'); animation-delay: 10s; }
  
  @keyframes svcHeroFadeCycle {
    0%, 25% { opacity: 1; transform: scale(1); }
    33.3%, 91.6% { opacity: 0; transform: scale(1.05); }
    100% { opacity: 1; transform: scale(1); }
  }
  .svc-hero > div:not(.svc-hero-bg-slider) {
    position: relative;
    z-index: 2;
  }
  .hero-eyebrow {
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--orange); margin-bottom: 24px;
  }
  .hero-h1 {
    font-family: var(--font-display);
    font-size: clamp(36px, 4.5vw, 66px);
    font-weight: 800; line-height: 1.05;
    letter-spacing: -0.03em; margin-bottom: 28px;
  }
  .hero-h1 em {
    font-style: normal;
    background: linear-gradient(135deg, var(--orange), var(--teal));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-desc {
    font-size: 17px; line-height: 1.8;
    color: var(--gray); margin-bottom: 44px;
  }
  .hero-stats {
    display: flex; gap: 40px; flex-wrap: wrap;
  }
  .hero-stat-num {
    font-family: var(--font-display);
    font-size: 38px; font-weight: 800;
    color: var(--white); letter-spacing: -0.03em;
    line-height: 1;
  }
  .hero-stat-num span { color: var(--orange); }
  .hero-stat-label {
    font-size: 13px; color: var(--muted); margin-top: 4px;
  }

  /* right grid visual */
  .hero-grid-visual {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(3, 1fr);
    gap: 10px;
  }
  .hgv-cell {
    background: var(--bg-1);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 20px;
    transition: all 0.25s;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }
  .hgv-cell:hover { border-color: var(--teal); }
  .hgv-cell.span-2 { grid-row: span 2; border-color: rgba(92,201,214,0.3); }
  .hgv-images {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .hgv-images::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(9,15,28,0.95) 0%, rgba(9,15,28,0.3) 50%, rgba(9,15,28,0.85) 100%);
    z-index: 1;
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
  .hgv-images img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 0;
  }
  .hgv-img-1 {
    animation: fadeCycle1 10s infinite;
  }
  .hgv-img-2 {
    animation: fadeCycle2 10s infinite;
  }
  .hgv-icon { width: 32px; height: 32px; margin-bottom: 14px; display: block; color: var(--teal); position: relative; z-index: 2; }
  .hgv-name {
    font-family: var(--font-display);
    font-size: 16px; font-weight: 700; color: var(--white); margin-bottom: 6px; position: relative; z-index: 2;
  }
  .hgv-desc { font-size: 13px; color: var(--gray); line-height: 1.65; position: relative; z-index: 2; }

  /* ─── SERVICES GRID ─── */
  .services-section {
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
    text-align: center; margin-bottom: 64px;
  }
  .services-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
    background: var(--divider);
    border-radius: 20px;
    overflow: hidden;
  }
  .service-row {
    display: grid;
    grid-template-columns: 60px 1fr auto;
    gap: 0;
    align-items: stretch;
    background: var(--bg-1);
    transition: background 0.2s;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .service-row::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 0;
    background: linear-gradient(180deg, var(--teal), var(--orange));
    transition: width 0.25s;
  }
  .service-row:hover { background: var(--hover-slate); }
  .service-row:hover::before { width: 3px; }
  .service-row.active { background: var(--hover-slate); }
  .service-row.active::before { width: 3px; }

  .svc-num {
    font-family: var(--font-display);
    font-size: 13px; font-weight: 700;
    color: var(--border); padding: 32px 0 32px 24px;
    display: flex; align-items: center;
    transition: color 0.2s;
  }
  .service-row:hover .svc-num,
  .service-row.active .svc-num { color: var(--teal); }

  .svc-main { padding: 32px 24px; }
  .svc-name {
    font-family: var(--font-display);
    font-size: 18px; font-weight: 700;
    color: var(--white); margin-bottom: 4px;
  }
  .svc-short {
    font-size: 14px; color: var(--muted); line-height: 1.55;
  }

  .svc-expand-btn {
    padding: 32px 32px;
    display: flex; align-items: center;
    font-size: 20px; color: var(--muted);
    transition: color 0.2s, transform 0.3s;
    background: none; border: none; cursor: pointer;
  }
  .service-row.active .svc-expand-btn {
    transform: rotate(45deg); color: var(--teal);
  }

  .svc-detail {
    background: var(--bg-0);
    border-left: 3px solid var(--teal);
    padding: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease, padding 0.3s;
  }
  .svc-detail.open {
    max-height: 400px;
    padding: 36px 32px 36px 80px;
  }
  .svc-detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 32px;
  }
  .svc-detail-label {
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--teal); margin-bottom: 12px;
  }
  .svc-detail-list {
    list-style: none;
    display: flex; flex-direction: column; gap: 8px;
  }
  .svc-detail-list li {
    font-size: 14px; color: var(--gray);
    display: flex; align-items: center; gap: 8px;
  }
  .svc-detail-list li::before { content: '→'; color: var(--teal); font-size: 12px; }

  /* ─── PROCESS ─── */
  .process-section {
    padding: 100px 80px;
    background: var(--bg-1);
    border-top: 1px solid var(--divider);
  }
  .process-track {
    display: flex;
    gap: 0;
    margin-top: 64px;
    position: relative;
  }
  .process-track::before {
    content: '';
    position: absolute;
    top: 28px; left: 28px;
    right: 28px; height: 1px;
    background: linear-gradient(90deg, var(--teal), var(--orange), var(--teal));
  }
  .process-step {
    flex: 1;
    text-align: center;
    position: relative;
    padding-top: 0;
  }
  .process-dot {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: var(--bg-0);
    border: 2px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px;
    font-family: var(--font-display);
    font-size: 13px; font-weight: 800;
    color: var(--muted);
    position: relative; z-index: 1;
    transition: all 0.2s;
  }
  .process-step:hover .process-dot {
    border-color: var(--teal);
    color: var(--teal);
    background: rgba(92,201,214,0.08);
  }
  .process-step-name {
    font-family: var(--font-display);
    font-size: 14px; font-weight: 700;
    color: var(--white); margin-bottom: 8px;
  }
  .process-step-desc {
    font-size: 12px; color: var(--muted); line-height: 1.6; padding: 0 4px;
  }

  /* ─── WHY CHOOSE ─── */
  .why-section {
    padding: 100px 80px;
    border-top: 1px solid var(--divider);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
  .why-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .why-card {
    background: var(--bg-1);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 28px 24px;
    transition: all 0.2s;
  }
  .why-card:hover { border-color: var(--teal); transform: translateY(-3px); }
  .why-card-icon { width: 32px; height: 32px; color: var(--teal); margin-bottom: 12px; display: block; }
  .why-card-name { font-size: 14px; font-weight: 600; color: var(--white); margin-bottom: 6px; }
  .why-card-desc { font-size: 13px; color: var(--muted); line-height: 1.65; }

  /* ─── CTA ─── */
  .svc-cta {
    padding: 120px 80px;
    border-top: 1px solid var(--divider);
    background: linear-gradient(180deg, var(--bg-0) 0%, #091e2e 100%);
    text-align: center;
    position: relative; overflow: hidden;
  }
  .svc-cta::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(92,201,214,0.07), transparent);
    pointer-events: none;
  }
  .cta-h2 {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 50px);
    font-weight: 800; letter-spacing: -0.02em;
    max-width: 640px; margin: 16px auto 24px;
  }
  .cta-p { font-size: 17px; color: var(--gray); max-width: 480px; margin: 0 auto 48px; line-height: 1.75; }
  .cta-row { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .btn-primary {
    background: var(--orange); color: var(--white);
    border: none; border-radius: 8px;
    padding: 14px 30px; font-size: 15px; font-weight: 600;
    cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block;
  }
  .btn-primary:hover { background: var(--orange-hover); transform: translateY(-1px); }
  .btn-ghost {
    background: transparent; color: var(--white);
    border: 1px solid var(--border); border-radius: 8px;
    padding: 14px 30px; font-size: 15px; font-weight: 500;
    cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block;
  }
  .btn-ghost:hover { border-color: var(--teal); transform: translateY(-1px); }

  @media (max-width: 960px) {
    .svc-hero, .why-section { grid-template-columns: 1fr; gap: 48px; padding: 80px 24px 60px; }
    .hero-grid-visual { display: none; }
    .services-section, .process-section, .svc-cta { padding: 60px 24px; }
    .process-track { flex-direction: column; gap: 20px; }
    .process-track::before { display: none; }
    .svc-detail.open { padding: 28px 20px 28px 28px; }
    .svc-detail-grid { grid-template-columns: 1fr; gap: 20px; }
    .why-grid { grid-template-columns: 1fr; }
    .why-section { padding: 60px 24px; }
  }
`;

const services = [
  {
    num: "01", name: "AI Development",
    short: "Intelligent applications using LLMs, automation, computer vision, and machine learning.",
    includes: ["AI Assistants", "Chatbots & NLP", "LLM Integration", "AI APIs", "Computer Vision"],
    tech: ["OpenAI", "Gemini", "Claude", "Python", "TensorFlow"],
    benefits: ["Reduce manual work", "Faster decision making", "24/7 automated support"],
  },
  {
    num: "02", name: "SaaS Development",
    short: "Secure, scalable, cloud-native SaaS platforms built for long-term business growth.",
    includes: ["Multi-tenant Architecture", "Subscription Billing", "User Management", "Analytics", "API Layer"],
    tech: ["Next.js", "NestJS", "Supabase", "Stripe", "AWS"],
    benefits: ["Recurring revenue model", "Scalable infrastructure", "Global deployment"],
  },
  {
    num: "03", name: "Web Development",
    short: "High-performance websites and web applications using modern technologies.",
    includes: ["Landing Pages", "Web Apps", "E-Commerce", "Portals", "PWAs"],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    benefits: ["Fast load times", "SEO optimized", "Mobile responsive"],
  },
  {
    num: "04", name: "Mobile App Development",
    short: "Cross-platform mobile applications with native-like performance and UX.",
    includes: ["iOS Apps", "Android Apps", "React Native", "Push Notifications", "Offline Support"],
    tech: ["React Native", "Expo", "Swift", "Kotlin", "Firebase"],
    benefits: ["Single codebase", "App store ready", "Native performance"],
  },
  {
    num: "05", name: "Cloud Solutions",
    short: "Cloud migration, DevOps, infrastructure automation, monitoring, and optimization.",
    includes: ["Cloud Migration", "CI/CD Pipelines", "Docker & Kubernetes", "Monitoring", "Cost Optimization"],
    tech: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform"],
    benefits: ["Reduced infrastructure cost", "High availability", "Auto-scaling"],
  },
  {
    num: "06", name: "Blockchain Development",
    short: "Decentralized applications, smart contracts, and secure blockchain solutions.",
    includes: ["Smart Contracts", "DApps", "NFT Platforms", "Token Development", "Web3 Integration"],
    tech: ["Solidity", "Ethereum", "Polygon", "Web3.js", "IPFS"],
    benefits: ["Decentralized trust", "Transparent transactions", "Immutable records"],
  },
  {
    num: "07", name: "UI / UX Design",
    short: "Research-driven interfaces that deliver exceptional user experiences and conversion.",
    includes: ["User Research", "Wireframes", "Prototyping", "Design Systems", "Usability Testing"],
    tech: ["Figma", "Framer", "Adobe XD", "Storybook", "Tailwind"],
    benefits: ["Higher conversion rates", "Reduced churn", "Stronger brand identity"],
  },
  {
    num: "08", name: "API Development",
    short: "REST APIs, GraphQL APIs, third-party integrations, and enterprise system connectivity.",
    includes: ["REST APIs", "GraphQL", "Webhooks", "OAuth Integration", "API Documentation"],
    tech: ["Node.js", "FastAPI", "Swagger", "Postman", "GraphQL"],
    benefits: ["Seamless integrations", "Developer-friendly", "Versioned & documented"],
  },
  {
    num: "09", name: "Product Consulting",
    short: "Helping founders validate ideas, define roadmaps, and launch successful products.",
    includes: ["Idea Validation", "MVP Planning", "Tech Stack Selection", "Roadmap Definition", "Pitch Deck"],
    tech: ["Strategy", "Agile", "OKRs", "Lean Canvas", "User Stories"],
    benefits: ["Faster time-to-market", "Risk reduction", "Investor-ready"],
  },
];

const processSteps = [
  { num: "01", name: "Discovery", desc: "Understanding your business goals and requirements." },
  { num: "02", name: "Planning", desc: "Architecture design and project roadmap." },
  { num: "03", name: "Design", desc: "Wireframes, prototypes and UI design." },
  { num: "04", name: "Development", desc: "Modern engineering with clean code." },
  { num: "05", name: "Testing", desc: "Comprehensive quality assurance." },
  { num: "06", name: "Launch", desc: "Deployment and production monitoring." },
  { num: "07", name: "Support", desc: "Continuous improvement and evolution." },
];

const whyCards = [
  { icon: IconBrain, name: "Experienced Engineers", desc: "Senior developers with cross-industry expertise." },
  { icon: IconLightning, name: "Modern Stack", desc: "Latest technologies built for performance and scale." },
  { icon: IconSearch, name: "Transparent Process", desc: "Full visibility into every stage of development." },
  { icon: IconTools, name: "Agile Delivery", desc: "Iterative development with rapid feedback cycles." },
  { icon: IconShield, name: "Enterprise Security", desc: "Security-first architecture from day one." },
  { icon: IconHandshake, name: "Long-term Support", desc: "Partners for the lifetime of your product." },
];

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(null);

  const toggle = (i) => setActiveIdx(activeIdx === i ? null : i);

  return (
    <>
      <style>{css}</style>

      {/* Hero */}
      <section className="svc-hero">
        <div className="svc-hero-bg-slider">
          <div className="svc-hero-bg-slide slide-1"></div>
          <div className="svc-hero-bg-slide slide-2"></div>
          <div className="svc-hero-bg-slide slide-3"></div>
        </div>
        <div>

          <h1 className="hero-h1">Transforming Ideas Into <em>Powerful Digital Solutions</em></h1>
          <p className="hero-desc">From product strategy to deployment and long-term support, Auxosys becomes your technology partner at every stage of the journey.</p>
          <div className="hero-stats">
            <div>
              <p className="hero-stat-num">9<span>+</span></p>
              <p className="hero-stat-label">Core Services</p>
            </div>
            <div>
              <p className="hero-stat-num">11<span>+</span></p>
              <p className="hero-stat-label">Industries Served</p>
            </div>
            <div>
              <p className="hero-stat-num">100<span>%</span></p>
              <p className="hero-stat-label">Agile Delivery</p>
            </div>
          </div>
        </div>

        <div className="hero-grid-visual">
          {[
            { icon: IconAI, name: "AI Development", desc: "LLMs, automation and intelligent systems", span: 2, imgs: ["/services/ai-1.jpg", "/services/ai-2.jpg"] },
            { icon: IconCloud, name: "Cloud Solutions", desc: "Migration and DevOps", span: 1, imgs: ["/services/cloud-1.jpg", "/services/cloud-2.jpg"] },
            { icon: IconBlockchain, name: "Blockchain", desc: "Smart contracts and DApps", span: 2, imgs: ["/services/blockchain-1.jpg", "/services/blockchain-2.jpg"] },
            { icon: IconMobile, name: "Mobile Apps", desc: "Cross-platform native performance", span: 1, imgs: ["/services/mobile-1.jpg", "/services/mobile-2.jpg"] },
          ].map((c, i) => (
            <div className={`hgv-cell ${c.span === 2 ? 'span-2' : ''}`} key={i}>
              <span className="hgv-icon"><c.icon /></span>
              <p className="hgv-name">{c.name}</p>
              <p className="hgv-desc">{c.desc}</p>
              {c.imgs && (
                <div className="hgv-images">
                  <img src={c.imgs[0]} className="hgv-img-1" alt="" style={{ animationDelay: `${i * 1.5}s` }} />
                  <img src={c.imgs[1]} className="hgv-img-2" alt="" style={{ animationDelay: `${i * 1.5}s` }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Services accordion */}
      <section className="services-section">
        <p className="section-eyebrow">What We Build</p>
        <h2 className="section-title">End-to-end technology services</h2>

        <div className="services-list">
          {services.map((s, i) => (
            <div key={s.num}>
              <div
                className={`service-row${activeIdx === i ? " active" : ""}`}
                onClick={() => toggle(i)}
              >
                <span className="svc-num">{s.num}</span>
                <div className="svc-main">
                  <p className="svc-name">{s.name}</p>
                  <p className="svc-short">{s.short}</p>
                </div>
                <button className="svc-expand-btn" aria-label="expand">+</button>
              </div>
              <div className={`svc-detail${activeIdx === i ? " open" : ""}`}>
                <div className="svc-detail-grid">
                  <div>
                    <p className="svc-detail-label">Includes</p>
                    <ul className="svc-detail-list">
                      {s.includes.map(t => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="svc-detail-label">Technologies</p>
                    <ul className="svc-detail-list">
                      {s.tech.map(t => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="svc-detail-label">Benefits</p>
                    <ul className="svc-detail-list">
                      {s.benefits.map(t => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="process-section">
        <p className="section-eyebrow">How We Work</p>
        <h2 className="section-title">Our development process</h2>
        <div className="process-track">
          {processSteps.map((s) => (
            <div className="process-step" key={s.num}>
              <div className="process-dot">{s.num}</div>
              <p className="process-step-name">{s.name}</p>
              <p className="process-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose */}
      <section className="why-section">
        <div>
          <p className="section-eyebrow" style={{ textAlign: "left" }}>Why Choose Auxosys</p>
          <h2 className="section-title" style={{ textAlign: "left", marginBottom: 24 }}>Built for teams who demand more.</h2>
          <p style={{ fontSize: 16, color: "var(--gray)", lineHeight: 1.8 }}>We don't just deliver code. We embed ourselves into your product vision and build with the same care, standards, and long-term thinking as an in-house team — at a fraction of the cost.</p>
        </div>
        <div className="why-grid">
          {whyCards.map(w => (
            <div className="why-card" key={w.name}>
              <span className="why-card-icon"><w.icon /></span>
              <p className="why-card-name">{w.name}</p>
              <p className="why-card-desc">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="svc-cta">
        <p className="section-eyebrow">Start a Project</p>
        <h2 className="cta-h2">Have an idea? Let's turn it into reality.</h2>
        <p className="cta-p">Whether you're a startup looking to launch or an enterprise ready to modernize, we're ready to build alongside you.</p>
        <div className="cta-row">
          <a href="/contact" className="btn-primary">Start a Conversation</a>
          <a href="/products" className="btn-ghost">See Our Products</a>
        </div>
      </section>
    </>
  );
}