'use client';
import { useState } from "react";
import { Sparkles, Users, Cloud, Settings, Hexagon, Brain, Cloud as Cloudy, Lock, Zap, Smartphone, Shield, BarChart, Link } from "lucide-react";

const css = `
  .products-hero {
    min-height: 100vh;
    padding: 180px 24px 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .products-hero::before {
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
  .hero-bg-2 { animation-delay: -12s; }
  .hero-bg-3 { animation-delay: -6s; }
  
  @keyframes bgFade {
    0%, 22.22% { opacity: 1; }
    33.33%, 88.88% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  .products-hero h1, .products-hero p {
    position: relative;
    z-index: 2;
  }
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(92,201,214,0.08);
    border: 1px solid rgba(92,201,214,0.25);
    border-radius: 6px;
    padding: 7px 18px;
    font-size: 12px;
    font-weight: 600;
    color: var(--teal);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 36px;
  }
  .products-hero h1 {
    font-family: var(--font-display);
    font-size: clamp(36px, 5.5vw, 72px);
    font-weight: 800;
    line-height: 1.04;
    letter-spacing: -0.03em;
    max-width: 820px;
    margin: 0 auto 28px;
  }
  .products-hero h1 span {
    background: linear-gradient(135deg, var(--orange), #FF824D 60%, var(--teal));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .products-hero p {
    font-size: 18px;
    line-height: 1.75;
    color: var(--gray);
    max-width: 600px;
    margin: 0 auto;
  }

  /* Principles */
  .principles {
    margin-top: 60px;
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
  }
  .principle-tag {
    padding: 8px 20px;
    border-radius: 999px;
    border: 1px solid var(--border);
    font-size: 13px;
    font-weight: 500;
    color: var(--muted);
    transition: all 0.2s;
    cursor: default;
  }
  .principle-tag:hover { border-color: var(--teal); color: var(--teal); }

  /* Products grid */
  .products-grid-section {
    padding: 80px;
    border-top: 1px solid var(--divider);
  }
  .section-eyebrow {
    font-size: 12px;
    font-weight: 600;
    color: var(--teal);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 16px;
    text-align: center;
  }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(26px, 3vw, 44px);
    font-weight: 700;
    letter-spacing: -0.02em;
    text-align: center;
    margin-bottom: 64px;
    color: var(--white);
  }
  .products-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .products-grid .card-wide {
    grid-column: span 2;
  }

  .product-card {
    background: var(--bg-1);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 40px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s, transform 0.3s;
    cursor: default;
  }
  .product-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 80% 20%, rgba(92,201,214,0.06), transparent 60%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .product-card:hover { border-color: rgba(92,201,214,0.35); transform: translateY(-4px); }
  .product-card:hover::after { opacity: 1; }
  .product-card.orange-glow::after {
    background: radial-gradient(circle at 80% 20%, rgba(255,107,53,0.08), transparent 60%);
  }
  .product-card.orange-glow:hover { border-color: rgba(255,107,53,0.35); }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border-radius: 999px;
    padding: 5px 14px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    margin-bottom: 28px;
  }
  .status-coming { background: rgba(92,201,214,0.12); color: var(--teal); border: 1px solid rgba(92,201,214,0.25); }
  .status-dev { background: rgba(255,107,53,0.12); color: var(--orange); border: 1px solid rgba(255,107,53,0.25); }
  .status-research { background: rgba(245,158,11,0.12); color: #F59E0B; border: 1px solid rgba(245,158,11,0.25); }
  .status-planning { background: rgba(59,130,246,0.12); color: #3B82F6; border: 1px solid rgba(59,130,246,0.25); }
  .status-future { background: rgba(127,147,163,0.12); color: var(--muted); border: 1px solid rgba(127,147,163,0.25); }

  .status-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: currentColor;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  .status-coming .status-dot, .status-dev .status-dot { animation: pulse 2s infinite; }
  .status-future .status-dot { animation: none; }

  .product-icon {
    width: 56px; height: 56px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    color: var(--teal);
  }
  .product-name {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 12px;
    letter-spacing: -0.01em;
  }
  .product-desc {
    font-size: 15px;
    line-height: 1.75;
    color: var(--gray);
    margin-bottom: 32px;
  }
  .product-features {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 36px;
  }
  .feature-tag {
    font-size: 11px;
    font-weight: 500;
    color: var(--muted);
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 4px 12px;
  }
  .product-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: var(--teal);
    cursor: pointer;
    transition: gap 0.2s;
    background: none;
    border: none;
    padding: 0;
  }
  .product-cta:hover { gap: 14px; }
  .product-cta-arrow { font-size: 16px; }

  /* Features grid */
  .features-section {
    padding: 100px 80px;
    background: var(--bg-1);
    border-top: 1px solid var(--divider);
  }
  .features-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-top: 56px;
  }
  .feature-card {
    background: var(--bg-0);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 28px 24px;
    text-align: center;
    transition: all 0.2s;
  }
  .feature-card:hover {
    border-color: var(--teal);
    transform: translateY(-3px);
  }
  .feature-card-icon {
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--teal);
  }
  .feature-card-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--white);
  }

  /* Roadmap */
  .roadmap-section {
    padding: 100px 80px;
    border-top: 1px solid var(--divider);
  }
  .roadmap-track {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2px;
    margin-top: 56px;
    border-radius: 16px;
    overflow: hidden;
    background: var(--divider);
  }
  .roadmap-phase {
    padding: 48px 40px;
    position: relative;
  }
  .roadmap-phase-current { background: linear-gradient(135deg, rgba(92,201,214,0.12), var(--bg-1)); }
  .roadmap-phase-next { background: linear-gradient(135deg, rgba(255,107,53,0.08), var(--bg-1)); }
  .roadmap-phase-future { background: var(--bg-1); }

  .roadmap-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  .roadmap-label-current { color: var(--teal); }
  .roadmap-label-next { color: var(--orange); }
  .roadmap-label-future { color: var(--muted); }

  .roadmap-text {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 700;
    color: var(--white);
    line-height: 1.3;
  }

  /* CTA */
  .products-cta {
    padding: 120px 80px;
    text-align: center;
    border-top: 1px solid var(--divider);
    position: relative;
    overflow: hidden;
  }
  .products-cta::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 700px; height: 400px;
    background: radial-gradient(ellipse, rgba(255,107,53,0.07), transparent 70%);
    pointer-events: none;
  }
  .cta-heading {
    font-family: var(--font-display);
    font-size: clamp(28px, 4vw, 50px);
    font-weight: 800;
    letter-spacing: -0.02em;
    max-width: 600px;
    margin: 0 auto 24px;
    color: var(--white);
  }
  .cta-sub {
    color: var(--gray);
    font-size: 17px;
    max-width: 460px;
    margin: 0 auto 48px;
    line-height: 1.7;
  }
  .cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .btn-primary {
    background: var(--orange);
    color: var(--white);
    border: none; border-radius: 8px;
    padding: 14px 28px; font-size: 15px; font-weight: 600;
    cursor: pointer; transition: background 0.2s, transform 0.2s;
    text-decoration: none;
  }
  .btn-primary:hover { background: #FF824D; transform: translateY(-1px); }
  .btn-outline {
    background: transparent; color: var(--white);
    border: 1px solid var(--border); border-radius: 8px;
    padding: 14px 28px; font-size: 15px; font-weight: 500;
    cursor: pointer; transition: all 0.2s;
    text-decoration: none;
  }
  .btn-outline:hover { border-color: var(--teal); transform: translateY(-1px); }

  @media (max-width: 1000px) {
    .products-hero, .products-grid-section, .features-section, .roadmap-section, .products-cta { padding: 60px 24px; }
    .principles { padding: 0 24px 60px; }
    .products-grid { grid-template-columns: 1fr; }
    .products-grid .card-wide { grid-column: span 1; }
    .features-grid { grid-template-columns: repeat(2, 1fr); }
    .roadmap-track { grid-template-columns: 1fr; }
  }
`;

const products = [
  {
    icon: <Sparkles size={28} />,
    iconBg: "rgba(92,201,214,0.12)",
    iconColor: "var(--teal)",
    name: "Auxosys AI Workspace",
    desc: "An AI-powered productivity platform designed to automate repetitive tasks, generate intelligent insights, and improve team collaboration at scale.",
    status: "coming",
    statusLabel: "Coming Soon",
    features: ["AI Automation", "Team Collaboration", "Smart Insights", "Workflow Builder"],
    wide: true,
  },
  {
    icon: <Users size={28} />,
    iconBg: "rgba(255,107,53,0.12)",
    iconColor: "var(--orange)",
    name: "Auxosys CRM",
    desc: "A modern customer relationship management platform tailored for startups and growing businesses who need clarity without complexity.",
    status: "dev",
    statusLabel: "In Development",
    features: ["Contact Management", "Sales Pipeline", "Analytics"],
    wide: false,
  },
  {
    icon: <Cloud size={28} />,
    iconBg: "rgba(92,201,214,0.1)",
    iconColor: "var(--teal)",
    name: "Cloud Workspace",
    desc: "Secure cloud document management and collaborative workspace built for distributed teams who need real-time access and version control.",
    status: "research",
    statusLabel: "Research Phase",
    features: ["Document Management", "Real-Time Sync", "Access Controls"],
    wide: false,
  },
  {
    icon: <Settings size={28} />,
    iconBg: "rgba(245,158,11,0.1)",
    iconColor: "#F59E0B",
    name: "Business Automation Suite",
    desc: "Automate workflows, approvals, notifications, and repetitive operational tasks to free your team for higher-value work.",
    status: "planning",
    statusLabel: "Planning",
    features: ["Workflow Engine", "Approval Flows", "Notifications"],
    wide: false,
  },
  {
    icon: <Hexagon size={28} />,
    iconBg: "rgba(127,147,163,0.1)",
    iconColor: "var(--muted)",
    name: "Developer Platform",
    desc: "A collection of APIs, SDKs, templates, and developer tools for rapid application development and integration.",
    status: "future",
    statusLabel: "Future",
    features: ["REST APIs", "SDKs", "CLI Tools", "Templates"],
    wide: false,
  },
];

const featureCards = [
  { icon: <Brain size={28} />, name: "AI Integration" },
  { icon: <Cloudy size={28} />, name: "Cloud Native" },
  { icon: <Lock size={28} />, name: "Secure Auth" },
  { icon: <Zap size={28} />, name: "Real-Time Collab" },
  { icon: <Smartphone size={28} />, name: "Mobile Ready" },
  { icon: <Shield size={28} />, name: "Enterprise Security" },
  { icon: <BarChart size={28} />, name: "Analytics Dashboard" },
  { icon: <Link size={28} />, name: "API Integrations" },
];

const statusMap = {
  coming: "status-coming",
  dev: "status-dev",
  research: "status-research",
  planning: "status-planning",
  future: "status-future",
};

export default function Products() {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <style>{css}</style>

      {/* Hero */}
      <section className="products-hero">
        <img src="/images/bg-tech.jpg" alt="Technology" className="hero-bg hero-bg-1" />
        <img src="/images/bg-gradient.jpg" alt="Gradient" className="hero-bg hero-bg-2" />
        <img src="/images/bg-robot.jpg" alt="AI Robot" className="hero-bg hero-bg-3" />
        <h1>Building Products That Solve <span>Real Business Problems</span></h1>
        <p style={{ marginTop: 24, maxWidth: "800px", margin: "24px auto 0" }}>Alongside delivering technology services, Auxosys develops innovative software products that simplify operations, improve productivity, and accelerate business growth.</p>
        
        {/* Principles */}
        <div className="principles">
          {["Simplicity", "Scalability", "Security", "Performance", "User Experience"].map(p => (
            <span className="principle-tag" key={p}>{p}</span>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-grid-section">
        <p className="section-eyebrow">Featured Products</p>
        <h2 className="section-title">Our Product Ecosystem</h2>

        <div className="products-grid">
          {products.map((p, i) => (
            <div
              key={p.name}
              className={`product-card${p.status === "dev" || p.status === "planning" ? " orange-glow" : ""}${p.wide ? " card-wide" : ""}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={`status-badge ${statusMap[p.status]}`}>
                <span className="status-dot" />
                {p.statusLabel}
              </div>
              <div className="product-icon" style={{ background: p.iconBg, color: p.iconColor }}>{p.icon}</div>
              <h3 className="product-name">{p.name}</h3>
              <p className="product-desc">{p.desc}</p>
              <div className="product-features">
                {p.features.map(f => <span className="feature-tag" key={f}>{f}</span>)}
              </div>
              <button className="product-cta">
                Learn More <span className="product-cta-arrow">→</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Product Features */}
      <section className="features-section">
        <p className="section-eyebrow">Built-In Capabilities</p>
        <h2 className="section-title" style={{ textAlign: "center" }}>Every product ships with</h2>
        <div className="features-grid">
          {featureCards.map(f => (
            <div className="feature-card" key={f.name}>
              <span className="feature-card-icon">{f.icon}</span>
              <p className="feature-card-name">{f.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="roadmap-section">
        <p className="section-eyebrow">Product Roadmap</p>
        <h2 className="section-title" style={{ textAlign: "left" }}>Where we're headed</h2>
        <div className="roadmap-track">
          <div className="roadmap-phase roadmap-phase-current">
            <p className="roadmap-label roadmap-label-current">↗ Current</p>
            <p className="roadmap-text">Building intelligent SaaS platforms for the modern workforce.</p>
          </div>
          <div className="roadmap-phase roadmap-phase-next">
            <p className="roadmap-label roadmap-label-next">⟳ Next</p>
            <p className="roadmap-text">AI-powered enterprise products with deep automation capabilities.</p>
          </div>
          <div className="roadmap-phase roadmap-phase-future">
            <p className="roadmap-label roadmap-label-future">◎ Future</p>
            <p className="roadmap-text">Industry-specific software ecosystems that redefine digital operations.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="products-cta">
        <p className="section-eyebrow">Early Access</p>
        <h2 className="cta-heading">Be first to experience what we're building.</h2>
        <p className="cta-sub">Join the waitlist for early access to Auxosys products and help shape what comes next.</p>
        <div className="cta-btns">
          <a href="/contact" className="btn-primary">Join Waitlist</a>
          <a href="/services" className="btn-outline">Explore Services</a>
        </div>
      </section>
    </>
  );
}