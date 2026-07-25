import HeroGlobe from '@/components/HeroGlobe';
import Reveal from '@/components/Reveal';
import { ArrowRight } from 'lucide-react';
import {
  IconBrain, IconCRM, IconCloud, IconTools,
  IconAI, IconSaaS, IconWeb, IconMobile, IconBlockchain, IconBulb, IconDesign,
  IconHealthcare, IconFinance, IconEducation, IconRetail, IconManufacturing,
  IconRealEstate, IconLogistics, IconStartup,
  IconLightning, IconShield, IconScale, IconSearch, IconHandshake, IconSupport,
} from '@/components/Icons';

/*
  ────────────────────────────────────────────────────────────────
  AUXOSYS — Home
  Styling lives in home.css (import it in app/layout.jsx or globals).
  Every block below uses ONE shared card system: .card / .card-icon /
  .card-grid.cols-N  — so the whole page reads consistently.

  Cards intentionally trimmed for an early product+service startup are
  COMMENTED OUT (not deleted) with a note, so you can switch them back
  on the moment they're truthful. Search "TRIMMED" to find them.
  ────────────────────────────────────────────────────────────────
*/

export default function HomePage() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="hero">
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
          <div className="hero-right">
            <HeroGlobe />
          </div>
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
            <div className="value-card"><div className="num">01</div><h4>Innovation</h4><p>Solutions built with emerging technologies.</p></div>
            <div className="value-card"><div className="num">02</div><h4>Quality</h4><p>Software built for performance and scale.</p></div>
            <div className="value-card"><div className="num">03</div><h4>Trust</h4><p>Transparent communication, reliable partnerships.</p></div>
            <div className="value-card"><div className="num">04</div><h4>Growth</h4><p>Helping businesses scale through technology.</p></div>
          </Reveal>
        </div>
      </section>

      {/* ===================== PRODUCTS ===================== */}
      <section className="section alt" id="products">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Our Products</div>
            <h2>Innovative Products for a <span className="accent">Smarter Tomorrow</span></h2>
            <p>A growing ecosystem of software products designed to solve everyday business challenges.</p>
          </Reveal>
          <Reveal>
            {/* Kept the two strongest, most credible products. cols-2 keeps a
                small line-up looking intentional rather than sparse. */}
            <div className="card-grid cols-2">
              <div className="card">
                <div className="card-icon"><IconBrain /></div>
                <h3>AI Workspace</h3>
                <p>An intelligent workspace for automating business workflows, content generation, and AI-assisted productivity.</p>
                <span className="status-tag status-soon">Coming Soon</span>
              </div>
              <div className="card">
                <div className="card-icon"><IconCRM /></div>
                <h3>Auxosys CRM</h3>
                <p>A lightweight customer relationship management platform for startups and growing businesses.</p>
                <span className="status-tag status-dev">In Development</span>
              </div>

              {/* TRIMMED — "Research" / "Planned" products read as placeholders when
                  every card already says it isn't shipped. Re-enable once they're real:
              <div className="card">
                <div className="card-icon"><IconCloud /></div>
                <h3>Cloud Workspace</h3>
                <p>Secure document management and collaborative cloud platform.</p>
                <span className="status-tag status-research">Research</span>
              </div>
              <div className="card">
                <div className="card-icon"><IconTools /></div>
                <h3>Developer Toolkit</h3>
                <p>A collection of APIs, SDKs, and developer utilities.</p>
                <span className="status-tag status-planned">Planned</span>
              </div>
              */}
            </div>
          </Reveal>
          {/* TRIMMED — no product catalog to link to yet:
          <div className="section-cta"><a href="#" className="btn btn-outline">View All Products</a></div>
          */}
        </div>
      </section>

      {/* ===================== SERVICES (core revenue — full grid kept) ===================== */}
      <section className="section" id="services">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Our Services</div>
            <h2>End-to-End Technology Services</h2>
            <p>From idea validation to enterprise deployment, we deliver across the full product lifecycle.</p>
          </Reveal>
          <Reveal>
            <div className="card-grid cols-4">
              <div className="card"><div className="card-icon"><IconAI /></div><h3>AI Development</h3><p>Custom AI applications, chatbots, recommendation systems, and intelligent automation.</p></div>
              <div className="card"><div className="card-icon"><IconSaaS /></div><h3>SaaS Development</h3><p>Scalable multi-tenant SaaS platforms designed for rapid business growth.</p></div>
              <div className="card"><div className="card-icon"><IconWeb /></div><h3>Web Development</h3><p>Modern, responsive, high-performance websites and web applications.</p></div>
              <div className="card"><div className="card-icon"><IconMobile /></div><h3>Mobile Development</h3><p>Cross-platform Android and iOS applications.</p></div>
              <div className="card"><div className="card-icon"><IconCloud /></div><h3>Cloud Solutions</h3><p>Cloud-native infrastructure, migration, DevOps, and monitoring.</p></div>
              <div className="card"><div className="card-icon"><IconBlockchain /></div><h3>Blockchain Development</h3><p>Smart contracts, decentralized applications, and Web3 solutions.</p></div>
              <div className="card"><div className="card-icon"><IconBulb /></div><h3>Product Consulting</h3><p>Helping startups validate, design, and launch successful products.</p></div>
              <div className="card"><div className="card-icon"><IconDesign /></div><h3>UI/UX Design</h3><p>Human-centered interfaces with exceptional user experiences.</p></div>
            </div>
          </Reveal>
          <div className="section-cta"><a href="/contact" className="btn btn-outline">Discuss Your Project</a></div>
        </div>
      </section>

      {/* ===================== PROCESS ===================== */}
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">How We Work</div>
            <h2>A Process Built for Clarity</h2>
            <p>Six steps, the same order every time, so you always know what&apos;s next and why.</p>
          </Reveal>
          <Reveal>
            <div className="timeline">
              <div className="tl-step"><div className="tl-dot">01</div><h4>Discover</h4><p>Understand your goals, users, and constraints.</p></div>
              <div className="tl-step"><div className="tl-dot">02</div><h4>Strategize</h4><p>Define scope, architecture, and a realistic roadmap.</p></div>
              <div className="tl-step"><div className="tl-dot">03</div><h4>Design</h4><p>Craft interfaces and systems built for clarity.</p></div>
              <div className="tl-step"><div className="tl-dot">04</div><h4>Develop</h4><p>Build with modern, scalable engineering practices.</p></div>
              <div className="tl-step"><div className="tl-dot">05</div><h4>Test &amp; Launch</h4><p>Rigorous QA before anything goes live.</p></div>
              <div className="tl-step"><div className="tl-dot">06</div><h4>Support</h4><p>Ongoing maintenance, monitoring, and iteration.</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== INDUSTRIES ===================== */}
      <section className="section" id="industries">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Industries</div>
            <h2>Industries We Empower</h2>
            <p>Tailored technology solutions that drive measurable outcomes across sectors.</p>
          </Reveal>
          <Reveal>
            {/* Kept six focused sectors. cols-3 → two tidy rows.
                (Original had 8; trimmed the two weakest to avoid overclaiming breadth.) */}
            <div className="card-grid cols-3">
              <div className="card"><div className="card-icon"><IconHealthcare /></div><h3>Healthcare</h3><p>Secure healthcare software and patient management systems.</p></div>
              <div className="card"><div className="card-icon"><IconFinance /></div><h3>Finance</h3><p>Digital banking, fintech, payment systems, and analytics.</p></div>
              <div className="card"><div className="card-icon"><IconEducation /></div><h3>Education</h3><p>Learning management and digital education platforms.</p></div>
              <div className="card"><div className="card-icon"><IconRetail /></div><h3>Retail</h3><p>Omnichannel commerce and inventory management.</p></div>
              <div className="card"><div className="card-icon"><IconLogistics /></div><h3>Logistics</h3><p>Fleet tracking and logistics optimization.</p></div>
              <div className="card"><div className="card-icon"><IconStartup /></div><h3>Startups</h3><p>MVP development and product engineering.</p></div>

              {/* TRIMMED — bring back as case studies land:
              <div className="card"><div className="card-icon"><IconManufacturing /></div><h3>Manufacturing</h3><p>Factory automation and operational intelligence.</p></div>
              <div className="card"><div className="card-icon"><IconRealEstate /></div><h3>Real Estate</h3><p>Property management and smart real estate platforms.</p></div>
              */}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== TECH STACK ===================== */}
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Tech Stack</div>
            <h2>Built with Modern Technologies</h2>
            <p>Modern frameworks, cloud platforms, and AI to build scalable, secure, high-performance software.</p>
          </Reveal>
          <Reveal>
            <div className="tech-grid">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'Supabase', 'PostgreSQL', 'Docker',
                'Kubernetes', 'AWS', 'Google Cloud', 'OpenAI', 'Gemini', 'Claude', 'Python', 'Blockchain']
                .map((t) => <div className="tech-item" key={t}>{t}</div>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== WHY CHOOSE ===================== */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Why Auxosys</div>
            <h2>Why Businesses Choose Auxosys</h2>
          </Reveal>
          <Reveal>
            <div className="why-grid">
              <div className="why-card"><div className="why-icon"><IconLightning /></div><h4>Future-Ready Technology</h4><p>Built using the latest technologies.</p></div>
              <div className="why-card"><div className="why-icon"><IconShield /></div><h4>Enterprise Security</h4><p>Secure architecture following modern best practices.</p></div>
              <div className="why-card"><div className="why-icon"><IconScale /></div><h4>Scalable Architecture</h4><p>Designed to grow alongside your business.</p></div>
              <div className="why-card"><div className="why-icon"><IconSearch /></div><h4>Transparent Process</h4><p>Clear communication and agile development.</p></div>
              <div className="why-card"><div className="why-icon"><IconHandshake /></div><h4>Dedicated Partnership</h4><p>We work as an extension of your team.</p></div>
              <div className="why-card"><div className="why-icon"><IconSupport /></div><h4>Long-Term Support</h4><p>Continuous maintenance and optimization.</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head" style={{ marginBottom: '48px' }}>
            <div className="eyebrow">By the Numbers</div>
            <h2>Numbers That Reflect Our Vision</h2>
          </Reveal>
          <Reveal>
            {/* Kept only claims that are credible for a young company and don't
                invite "prove it." Dropped "50+ Projects Delivered" — the riskiest
                to state early. cols reflow to a clean 4-up on desktop. */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div className="stat-card"><div className="stat-num">30+</div><div className="stat-label">Technologies Mastered</div></div>
              <div className="stat-card"><div className="stat-num">10+</div><div className="stat-label">Solutions in Development</div></div>
              <div className="stat-card"><div className="stat-num">Growing</div><div className="stat-label">Global Clients</div></div>
              <div className="stat-card"><div className="stat-num">24/7</div><div className="stat-label">Support Availability</div></div>

              {/* TRIMMED — re-enable when verifiable:
              <div className="stat-card"><div className="stat-num">50+</div><div className="stat-label">Projects Delivered</div></div>
              <div className="stat-card"><div className="stat-num">15+</div><div className="stat-label">Industries Served</div></div>
              */}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      {/*
        TRIMMED (whole section) — placeholder "Coming Soon" testimonials read as
        unfinished and hurt credibility more than they help. Drop this back in,
        with real quotes, once you have them:

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Testimonials</div>
            <h2>What Our Clients Say</h2>
          </Reveal>
          <Reveal>
            <div className="card-grid cols-3">
              <div className="testimonial-card"><span className="badge">Verified</span><h4>Client Name — Company</h4><p>Real quote here.</p></div>
              <div className="testimonial-card"><span className="badge">Verified</span><h4>Client Name — Company</h4><p>Real quote here.</p></div>
              <div className="testimonial-card"><span className="badge">Verified</span><h4>Client Name — Company</h4><p>Real quote here.</p></div>
            </div>
          </Reveal>
        </div>
      </section>
      */}

      {/* ===================== CTA ===================== */}
      <section className="section home-cta" id="contact">
        <div className="container">
          <Reveal className="cta-banner">
            <h2>Ready to Build Something Extraordinary?</h2>
            <p>Whether you&apos;re launching a startup, modernizing enterprise software, or building the
              next AI-powered platform, Auxosys is ready to turn your vision into reality.</p>
            <div className="cta-actions">
              <a href="/contact" className="btn btn-primary">Contact Our Team</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}