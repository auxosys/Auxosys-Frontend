import Reveal from '@/components/Reveal';
import { ArrowUpRight } from 'lucide-react';
import {
  IconBrain, IconCRM, IconCloud, IconTools,
  IconAI, IconSaaS, IconWeb, IconMobile, IconBlockchain, IconBulb, IconDesign,
  IconHealthcare, IconFinance, IconEducation, IconRetail, IconManufacturing,
  IconRealEstate, IconLogistics, IconStartup,
  IconLightning, IconShield, IconScale, IconSearch, IconHandshake, IconSupport,
} from '@/components/Icons';

/* small arrow affordance reused by every card link */
const Arrow = () => (
  <span className="arw"><ArrowUpRight size={13} strokeWidth={2.5} /></span>
);

const VALUES = [
  { n: '01', title: 'Innovation', desc: 'Solutions built with emerging technologies.' },
  { n: '02', title: 'Quality', desc: 'Software built for performance and scale.' },
  { n: '03', title: 'Trust', desc: 'Transparent communication, reliable partnerships.' },
  { n: '04', title: 'Growth', desc: 'Helping businesses scale through technology.' },
];

const DIFFERENCES = [
  { title: 'We build for scale', desc: 'Enterprise-grade architecture from day one.' },
  { title: 'Data-driven decisions', desc: 'Analytics and insights built into the core.' },
  { title: 'Rapid delivery', desc: 'Agile methodologies for faster time-to-market.' },
  { title: 'Long-term partnership', desc: 'Dedicated support and continuous optimization.' }
];

const TECH_GROUPS = [
  { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { label: 'Backend', items: ['Node.js', 'NestJS', 'Express', 'Python', 'Go'] },
  { label: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase'] },
  { label: 'DevOps', items: ['Docker', 'Kubernetes', 'AWS', 'Google Cloud'] },
  { label: 'AI & Data', items: ['OpenAI', 'Gemini', 'Claude', 'TensorFlow'] },
];

export default function AboutPage() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>We are builders, engineers, and strategists.</h1>
            <span className="hero-highlight">About Auxosys</span>
            <p className="desc">
              Auxosys is a technology company building innovative digital products, SaaS platforms,
              AI-powered solutions, and cloud applications for businesses worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== STORY ===================== */}
      <section className="section" id="story">
        <div className="container about-grid">
          <Reveal>
            <div className="eyebrow">Our Story</div>
            <h2>Driven by innovation</h2>
            <p>
              We follow a hybrid model — building our own products while delivering premium technology
              services to startups and enterprises. Our mission is reliable software that combines
              intelligent automation, thoughtful design, and modern engineering.
            </p>
            <p>
              From our early days developing simple web tools to our current focus on enterprise AI 
              and cloud architecture, our core belief hasn't changed: technology should solve real 
              problems seamlessly.
            </p>
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

      {/* ===================== VISION & MISSION ===================== */}
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Purpose</div>
            <h2>Vision & Mission</h2>
          </Reveal>
          <Reveal>
            <div className="card-grid cols-2">
              <div className="card card--dark">
                <div className="card-icon"><IconSearch /></div>
                <h3>Our Vision</h3>
                <p>To be a global leader in intelligent software solutions, empowering businesses to achieve unprecedented scale and efficiency through modern technology.</p>
              </div>
              <div className="card">
                <div className="card-icon"><IconHandshake /></div>
                <h3>Our Mission</h3>
                <p>To design, engineer, and deploy robust digital products that solve complex business challenges while maintaining the highest standards of quality, security, and user experience.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== WHAT SETS US APART ===================== */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">The Auxosys Difference</div>
            <h2>What sets us apart</h2>
          </Reveal>
          <Reveal>
            <div className="card-grid cols-4">
              {DIFFERENCES.map((diff, i) => (
                <div className="card" key={i}>
                  <div className="card-icon"><IconShield /></div>
                  <h3>{diff.title}</h3>
                  <p>{diff.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== TECH GROUPS ===================== */}
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Technology</div>
            <h2>The tools we master</h2>
          </Reveal>
          <Reveal>
            <div className="card-grid cols-3">
              {TECH_GROUPS.map((group) => (
                <div className="card" key={group.label}>
                  <h3>{group.label}</h3>
                  <div style={{ marginTop: '16px' }}>
                    {group.items.map(item => (
                      <div key={item} style={{ marginBottom: '8px', color: 'var(--text-muted)' }}>• {item}</div>
                    ))}
                  </div>
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