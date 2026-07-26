import HeroGlobe from '@/components/HeroGlobe';
import Reveal from '@/components/Reveal';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  IconBrain, IconCRM, IconCloud, IconTools,
  IconAI, IconSaaS, IconWeb, IconMobile, IconBlockchain, IconBulb, IconDesign,
  IconHealthcare, IconFinance, IconEducation, IconRetail, IconManufacturing,
  IconRealEstate, IconLogistics, IconStartup,
  IconLightning, IconShield, IconScale, IconSearch, IconHandshake, IconSupport,
} from '@/components/Icons';

/*
  ────────────────────────────────────────────────────────────────
  AUXOSYS — Home  (pairs with home-pro.css + home-pro-additions.css)

  Card system:
    • .card                 → icon card (services, industries, why)
    • .card.card--media     → media/editorial card (products)
    • .card.card--feature   → 2-col split feature card
    • .card.card--dark      → dark contrast card (inline CTA)
    • .card-link + .arw     → "Learn more ↗" affordance

  Content is data-driven (arrays → map) so sections stay DRY.
  Cards trimmed for an early startup are COMMENTED with a reason —
  search "TRIMMED" to re-enable them.
  ────────────────────────────────────────────────────────────────
*/

/* small arrow affordance reused by every card link */
const Arrow = () => (
  <span className="arw"><ArrowUpRight size={13} strokeWidth={2.5} /></span>
);

/* ---------------- DATA ---------------- */
const PRODUCTS = [
  {
    cat: 'AI', title: 'AI Workspace', href: '/products/ai-workspace', Icon: IconBrain,
    desc: 'An intelligent workspace for automating workflows, content generation, and AI-assisted productivity.'
  },
  {
    cat: 'CRM', title: 'Auxosys CRM', href: '/products/crm', Icon: IconCRM,
    desc: 'A lightweight customer relationship platform for startups and growing businesses.'
  },
  {
    cat: 'Cloud', title: 'Cloud Workspace', href: '/products/cloud-workspace', Icon: IconCloud,
    desc: 'Secure document management and a collaborative cloud platform for modern teams.'
  },
];

const SERVICES = [
  { title: 'AI Development', href: '/services/ai', Icon: IconAI, desc: 'Custom AI applications, chatbots, recommendation systems, and intelligent automation.' },
  { title: 'SaaS Development', href: '/services/saas', Icon: IconSaaS, desc: 'Scalable multi-tenant SaaS platforms designed for rapid business growth.' },
  { title: 'Web Development', href: '/services/web', Icon: IconWeb, desc: 'Modern, responsive, high-performance websites and web applications.' },
  { title: 'Mobile Development', href: '/services/mobile', Icon: IconMobile, desc: 'Cross-platform Android and iOS applications.' },
  { title: 'Cloud Solutions', href: '/services/cloud', Icon: IconCloud, desc: 'Cloud-native infrastructure, migration, DevOps, and monitoring.' },
  { title: 'Blockchain Development', href: '/services/blockchain', Icon: IconBlockchain, desc: 'Smart contracts, decentralized applications, and Web3 solutions.' },
  { title: 'Product Consulting', href: '/services/consulting', Icon: IconBulb, desc: 'Helping startups validate, design, and launch successful products.' },
  { title: 'UI/UX Design', href: '/services/design', Icon: IconDesign, desc: 'Human-centered interfaces with exceptional user experiences.' },
];

const INDUSTRIES = [
  { Icon: IconHealthcare, title: 'Healthcare', desc: 'Secure healthcare software and patient management systems.' },
  { Icon: IconFinance, title: 'Finance', desc: 'Digital banking, fintech, payment systems, and analytics.' },
  { Icon: IconEducation, title: 'Education', desc: 'Learning management and digital education platforms.' },
  { Icon: IconRetail, title: 'Retail', desc: 'Omnichannel commerce and inventory management.' },
  { Icon: IconLogistics, title: 'Logistics', desc: 'Fleet tracking and logistics optimization.' },
  { Icon: IconStartup, title: 'Startups', desc: 'MVP development and product engineering.' },
  // TRIMMED — bring back as case studies land:
  // { Icon: IconManufacturing, title: 'Manufacturing', desc: 'Factory automation and operational intelligence.' },
  // { Icon: IconRealEstate, title: 'Real Estate', desc: 'Property management and smart real estate platforms.' },
];

const VALUES = [
  { n: '01', title: 'Innovation', desc: 'Solutions built with emerging technologies.' },
  { n: '02', title: 'Quality', desc: 'Software built for performance and scale.' },
  { n: '03', title: 'Trust', desc: 'Transparent communication, reliable partnerships.' },
  { n: '04', title: 'Growth', desc: 'Helping businesses scale through technology.' },
];

const PROCESS = [
  { n: '01', title: 'Discover', desc: 'Understand your goals, users, and constraints.' },
  { n: '02', title: 'Strategize', desc: 'Define scope, architecture, and a realistic roadmap.' },
  { n: '03', title: 'Design', desc: 'Craft interfaces and systems built for clarity.' },
  { n: '04', title: 'Develop', desc: 'Build with modern, scalable engineering practices.' },
  { n: '05', title: 'Test & Launch', desc: 'Rigorous QA before anything goes live.' },
  { n: '06', title: 'Support', desc: 'Ongoing maintenance, monitoring, and iteration.' },
];

const WHY = [
  { Icon: IconLightning, title: 'Future-Ready Technology', desc: 'Built using the latest technologies.' },
  { Icon: IconShield, title: 'Enterprise Security', desc: 'Secure architecture following modern best practices.' },
  { Icon: IconScale, title: 'Scalable Architecture', desc: 'Designed to grow alongside your business.' },
  { Icon: IconSearch, title: 'Transparent Process', desc: 'Clear communication and agile development.' },
  { Icon: IconHandshake, title: 'Dedicated Partnership', desc: 'We work as an extension of your team.' },
  { Icon: IconSupport, title: 'Long-Term Support', desc: 'Continuous maintenance and optimization.' },
];

const STATS = [
  { num: '30+', label: 'Technologies Mastered' },
  { num: '10+', label: 'Solutions in Development' },
  { num: 'Growing', label: 'Global Clients' },
  { num: '24/7', label: 'Support Availability' },
  // TRIMMED — re-enable when verifiable:
  // { num: '50+', label: 'Projects Delivered' },
  // { num: '15+', label: 'Industries Served' },
];

const TECH = ['React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'Supabase', 'PostgreSQL',
  'Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'OpenAI', 'Gemini', 'Claude', 'Python', 'Blockchain'];

/* ---------------- PAGE ---------------- */
export default function HomePage() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <style>{`
        .home-legacy-hero {
          padding: calc(5px + var(--nav-h)) 0 40px;
          min-height: 100vh;
          max-height: 950px;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, var(--auxo-ice) 0%, #EAF9FB 45%, var(--auxo-white) 100%);
        }
        .home-legacy-hero::before {
          content: "";
          position: absolute;
          top: -200px;
          right: -200px;
          width: 900px;
          height: 900px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(92, 201, 214, 0.16), rgba(92, 201, 214, 0) 70%);
          pointer-events: none;
        }
        .home-legacy-hero .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
          width: 100%;
        }
        .home-legacy-hero h1 {
          font-size: 54px;
          margin-bottom: 18px;
          color: var(--white);
          font-family: var(--font-display);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.03em;
        }
        .home-legacy-hero .hero-highlight {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 15px;
          color: var(--teal);
          letter-spacing: 0.04em;
          margin-bottom: 22px;
          display: block;
          background: transparent;
          border: none;
          padding: 0;
        }
        .home-legacy-hero p.desc {
          color: var(--gray);
          font-size: 17px;
          max-width: 540px;
          margin-bottom: 36px;
          line-height: 1.6;
        }
        .home-legacy-hero .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .home-legacy-hero .btn-glass-pill {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          background: #11262b;
          border: 1px solid #11262b;
          border-radius: 9999px;
          padding: 8px 10px 8px 24px;
          color: #ffffff;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(17, 38, 43, 0.15);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .home-legacy-hero .btn-glass-pill:hover {
          background: #0fb5a6;
          border-color: #0fb5a6;
          box-shadow: 0 6px 20px rgba(15, 181, 166, 0.3);
          transform: translateY(-2px);
        }
        .home-legacy-hero .btn-glass-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .home-legacy-hero .btn-glass-pill:hover .btn-glass-icon {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
        }
        .home-legacy-hero .hero-right {
          display: grid;
          place-items: center;
        }
        @media (max-width: 960px) {
          .home-legacy-hero .hero-grid { 
            display: block; 
            text-align: center; 
          }
          .home-legacy-hero .hero-right {
            position: absolute;
            top: 55%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 140vw;
            height: 140vw;
            opacity: 0.25;
            z-index: 0;
            pointer-events: none;
          }
          .home-legacy-hero h1, .home-legacy-hero .hero-highlight, .home-legacy-hero .desc, .home-legacy-hero .hero-actions {
            position: relative;
            z-index: 10;
          }
          .home-legacy-hero h1 { font-size: 42px; }
          .home-legacy-hero p.desc { margin: 0 auto 36px; }
          .home-legacy-hero .hero-actions { justify-content: center; }
        }
      `}</style>
      <section className="home-legacy-hero">
        <div className="container hero-grid">
          <div>
            <h1>Building Intelligent Digital Products That Scale Businesses</h1>
            <span className="hero-highlight">AI • SaaS • Cloud • Blockchain • Enterprise Solutions</span>
            <p className="desc">
              Auxosys helps startups, businesses, and enterprises turn ambitious ideas into secure,
              scalable, intelligent digital products — from AI-powered applications and SaaS platforms
              to enterprise software and blockchain solutions built for long-term growth.
            </p>
            <div className="hero-actions">
              <a href="/contact" className="btn-glass-pill">
                Accelerate Your Growth
                <span className="btn-glass-icon"><ArrowRight size={18} /></span>
              </a>
            </div>
          </div>
          <div className="hero-right"><HeroGlobe /></div>
        </div>
      </section>

      {/* ===================== ABOUT + VALUES ===================== */}
      <section className="section" id="about">
        <div className="container about-grid">
          <Reveal>
            <div className="eyebrow">Who We Are</div>
            <h2>About Auxosys</h2>
            <p>Auxosys is a technology company building innovative digital products, SaaS platforms,
              AI-powered solutions, and cloud applications for businesses worldwide.</p>
            <p>We follow a hybrid model — building our own products while delivering premium technology
              services to startups and enterprises. Our mission is reliable software that combines
              intelligent automation, thoughtful design, and modern engineering.</p>
          </Reveal>
          <Reveal className="values-grid">
            {VALUES.map((v) => (
              <div className="value-card" key={v.n}>
                <div className="num">{v.n}</div><h4>{v.title}</h4><p>{v.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ===================== PRODUCTS (media cards) ===================== */}
      <section className="section alt" id="products">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Our Products</div>
            <h2>Innovative Products for a <span className="accent">Smarter Tomorrow</span></h2>
            <p>A growing ecosystem of software products designed to solve everyday business challenges.</p>
          </Reveal>
          <Reveal>
            <div className="card-grid cols-3">
              {PRODUCTS.map(({ cat, title, desc, href, Icon }) => (
                <a href={href} className="card card--media" key={title}>
                  <div className="card-media icon-panel">
                    <span className="card-cat">{cat}</span>
                    <Icon />
                  </div>
                  <div className="card-body">
                    <h3>{title}</h3>
                    <p>{desc}</p>
                    <span className="card-link">Learn more <Arrow /></span>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== FEATURED (split feature card) ===================== */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Featured</div>
            <h2>Our Flagship Platform</h2>
          </Reveal>
          <Reveal>
            <div className="card-grid" style={{ gridTemplateColumns: '1fr' }}>
              <article className="card card--feature">
                <div className="card-media icon-panel"><IconBrain /></div>
                <div className="card-body">
                  <span className="eyebrow">Enterprise AI</span>
                  <h3>Ship intelligent products faster</h3>
                  <p>A unified platform combining AI automation, cloud infrastructure, and
                    enterprise-grade security — everything you need to build and scale, in one place.</p>
                  <a href="/platform" className="card-link">Explore the platform <Arrow /></a>
                </div>
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== SERVICES (icon cards + arrow links + dark CTA) ===================== */}
      <section className="section alt" id="services">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Our Services</div>
            <h2>End-to-End Technology Services</h2>
            <p>From idea validation to enterprise deployment, we deliver across the full product lifecycle.</p>
          </Reveal>
          <Reveal>
            <div className="card-grid cols-4">
              {SERVICES.map(({ title, desc, href, Icon }) => (
                <a href={href} className="card" key={title}>
                  <div className="card-icon"><Icon /></div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <span className="card-link">Learn more <Arrow /></span>
                </a>
              ))}

              {/* full-width dark inline CTA — closes the section */}
              <div className="card card--dark card--cta">
                <div className="cta-card-text">
                  <h3>Not sure where to start?</h3>
                  <p>Tell us about your project and we&apos;ll help scope the right approach — no commitment.</p>
                </div>
                <a href="/contact" className="btn">Talk to our team <ArrowUpRight size={16} strokeWidth={2.5} /></a>
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
            <h2>A Process Built for Clarity</h2>
            <p>Six steps, the same order every time, so you always know what&apos;s next and why.</p>
          </Reveal>
          <Reveal>
            <div className="timeline">
              {PROCESS.map(({ n, title, desc }) => (
                <div className="tl-step" key={n}>
                  <div className="tl-dot">{n}</div><h4>{title}</h4><p>{desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== INDUSTRIES ===================== */}
      <section className="section alt" id="industries">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Industries</div>
            <h2>Industries We Empower</h2>
            <p>Tailored technology solutions that drive measurable outcomes across sectors.</p>
          </Reveal>
          <Reveal>
            <div className="card-grid cols-3">
              {INDUSTRIES.map(({ Icon, title, desc }) => (
                <div className="card" key={title}>
                  <div className="card-icon"><Icon /></div><h3>{title}</h3><p>{desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== TECH STACK ===================== */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Tech Stack</div>
            <h2>Built with Modern Technologies</h2>
            <p>Modern frameworks, cloud platforms, and AI to build scalable, secure, high-performance software.</p>
          </Reveal>
          <Reveal>
            <div className="tech-grid">
              {TECH.map((t) => <div className="tech-item" key={t}>{t}</div>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== WHY CHOOSE ===================== */}
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Why Auxosys</div>
            <h2>Why Businesses Choose Auxosys</h2>
          </Reveal>
          <Reveal>
            <div className="why-grid">
              {WHY.map(({ Icon, title, desc }) => (
                <div className="why-card" key={title}>
                  <div className="why-icon"><Icon /></div><h4>{title}</h4><p>{desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head" style={{ marginBottom: '48px' }}>
            <div className="eyebrow">By the Numbers</div>
            <h2>Numbers That Reflect Our Vision</h2>
          </Reveal>
          <Reveal>
            <div className="stats-grid">
              {STATS.map(({ num, label }) => (
                <div className="stat-card" key={label}>
                  <div className="stat-num">{num}</div><div className="stat-label">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== TESTIMONIALS =====================
        TRIMMED (whole section) — placeholder testimonials read as unfinished.
        Drop back in with real quotes:
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Testimonials</div>
            <h2>What Our Clients Say</h2>
          </Reveal>
          <Reveal>
            <div className="card-grid cols-3">
              <div className="testimonial-card"><span className="badge">Verified</span><h4>Client — Company</h4><p>Real quote here.</p></div>
            </div>
          </Reveal>
        </div>
      </section>
      */}

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