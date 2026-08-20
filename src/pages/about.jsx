import React from 'react';
import Link from 'next/link';
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

const VALUES = [
  { n: '01', icon: IconBulb, title: 'Innovation', desc: 'Solutions built with emerging technologies.' },
  { n: '02', icon: IconShield, title: 'Quality', desc: 'Software built for performance and scale.' },
  { n: '03', icon: IconScale, title: 'Trust', desc: 'Transparent communication, reliable partnerships.' },
  { n: '04', icon: IconLightning, title: 'Growth', desc: 'Helping businesses scale through technology.' },
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


import { fetchSeoData } from '@/utils/fetchSeo';

export default function AboutPage({ globalSeo }) {
  return (
    <>
      <SEO 
        globalSeo={globalSeo}
        title="About Auxosys | Empowering Digital Transformation"
        description="Learn about Auxosys, our mission, values, and how we build enterprise-grade software solutions for modern businesses."
        urlPath="/about"
      />
      <style jsx>{`
        .values-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .value-card {
          background: var(--surface); border: 1px solid var(--border-subtle);
          border-radius: 18px; padding: 26px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .value-card:hover { transform: translateY(-3px); box-shadow: 0 16px 32px -18px rgba(0,0,0,0.15); }
        .value-card .top-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .value-card .num { font-family: var(--font-display, sans-serif); font-size: 22px; font-weight: 800; color: var(--border-subtle); }
        .value-card .v-icon { width: 34px; height: 34px; border-radius: 9px; background: rgba(92,201,214,0.1); color: var(--teal); display: flex; align-items: center; justify-content: center; }
        .value-card h4 { font-size: 17px; font-weight: 700; color: var(--text); margin: 0 0 6px; }
        .value-card p { font-size: 14px; color: var(--text-muted); line-height: 1.6; margin: 0; }

        .tech-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
        .tech-tag {
          font-size: 13px; font-weight: 600; color: var(--text);
          background: var(--surface-bg); border: 1px solid var(--border-subtle);
          border-radius: 100px; padding: 6px 14px;
        }

        /* ── HERO: organic blob layout ── */
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }

        .hero-visual.organic-hero {
          position: relative;
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 20px;
        }

        .organic-blob-bg {
          position: absolute;
          bottom: 0%;
          left: -8%;
          width: 320px;
          height: 420px;
          background-color: #0C8074;
          border-radius: 40% 60% 70% 30% / 45% 55% 45% 55%;
          z-index: 1;
          overflow: hidden;
        }

        .organic-blob-bg::after {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.25) 2px, transparent 2px);
          background-size: 20px 20px;
          -webkit-mask-image: radial-gradient(circle at 35% 60%, black 10%, transparent 45%);
          mask-image: radial-gradient(circle at 35% 60%, black 10%, transparent 45%);
        }

        .weave-dots {
          position: absolute;
          bottom: -150px;
          left: 0;
          width: 100%;
          height: 450px;
          background-image: radial-gradient(rgba(148, 172, 206, 0.4) 2.5px, transparent 2.5px);
          background-size: 24px 24px;
          -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 450' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='fade' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='30%25' stop-color='black' stop-opacity='1'/%3E%3Cstop offset='100%25' stop-color='black' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='url(%23fade)' opacity='0.7'%3E%3Cpath d='M0,150 C240,220 240,80 480,187 C720,260 720,110 960,225 C1200,300 1200,150 1440,300 L1440,450 L0,450 Z' /%3E%3Cpath d='M0,150 C240,80 240,220 480,187 C720,110 720,260 960,225 C1200,150 1200,300 1440,300 L1440,450 L0,450 Z' /%3E%3C/g%3E%3C/svg%3E");
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 450' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='fade' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='30%25' stop-color='black' stop-opacity='1'/%3E%3Cstop offset='100%25' stop-color='black' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='url(%23fade)' opacity='0.7'%3E%3Cpath d='M0,150 C240,220 240,80 480,187 C720,260 720,110 960,225 C1200,300 1200,150 1440,300 L1440,450 L0,450 Z' /%3E%3Cpath d='M0,150 C240,80 240,220 480,187 C720,110 720,260 960,225 C1200,150 1200,300 1440,300 L1440,450 L0,450 Z' /%3E%3C/g%3E%3C/svg%3E");
          -webkit-mask-size: 100% 100%;
          mask-size: 100% 100%;
          z-index: 0;
          pointer-events: none;
        }

        .organic-image-container {
          position: relative;
          width: 440px;
          height: 440px;
          border-radius: 46% 54% 50% 50% / 44% 52% 48% 56%;
          overflow: hidden;
          z-index: 3;
        }

        .organic-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .organic-accent-lines {
          position: absolute;
          top: 30%;
          right: -8%;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transform: rotate(-45deg);
          z-index: 4;
        }

        .organic-accent-lines span {
          width: 60px;
          height: 2px;
          background: #d6e0ec;
          border-radius: 2px;
        }
        .organic-accent-lines span:nth-child(2) { transform: translateX(15px); }

        .organic-floating-circle {
          position: absolute;
          border-radius: 50%;
          background: #edf1f6;
          z-index: 4;
        }

        .organic-floating-circle.c-1 {
          width: 12px;
          height: 12px;
          bottom: -2%;
          right: 32%;
        }

        .organic-floating-circle.c-2 {
          width: 24px;
          height: 24px;
          bottom: -7%;
          right: 25%;
        }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-visual.organic-hero { height: auto; min-height: 400px; margin-top: 48px; margin-left: 0; margin-bottom: 24px; }
          .organic-image-container { width: min(85vw, 380px); height: auto; aspect-ratio: 1; }
          .organic-blob-bg { width: min(75vw, 320px); height: auto; aspect-ratio: 320/420; left: 0%; bottom: 5%; }
          .weave-dots { height: 180px; }
        }
        @media (max-width: 480px) {
          .hero-visual.organic-hero { min-height: 320px; }
        }
      `}</style>
      {/* ===================== HERO ===================== */}
      <section className="hero" style={{ position: 'relative', overflowX: 'hidden' }}>
        <div className="weave-dots" aria-hidden="true" />
        <div className="container hero-grid" style={{ zIndex: 1, position: 'relative' }}>
          <div>
            <h1>We are builders, engineers, and strategists.</h1>

            <p className="desc">
              Auxosys is a technology company building innovative digital products, SaaS platforms,
              AI-powered solutions, and cloud applications for businesses worldwide.
            </p>
          </div>

          {/* Right side — abstract product/engineering visual, fills the space that was blank */}
          <div className="hero-visual organic-hero" aria-hidden="true">
            <div className="organic-blob-bg" />

            <div className="organic-image-container">
              <img src="/images/about-bg-3.jpg" alt="Team working" />
            </div>

            <div className="organic-accent-lines">
              <span /><span /><span />
            </div>

            <div className="organic-floating-circle c-1" />
            <div className="organic-floating-circle c-2" />
          </div>
        </div>
      </section>

      {/* ===================== STORY ===================== */}
      <section className="section" id="story" style={{ paddingTop: '20px' }}>
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
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div className="value-card" key={v.n}>
                  <div className="top-row">
                    <div className="v-icon"><Icon size={16} /></div>
                    <span className="num">{v.n}</span>
                  </div>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              );
            })}
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
            <h2>Why choose Auxosys?</h2>
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
                  <div className="tech-tags">
                    {group.items.map(item => (
                      <span key={item} className="tech-tag">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>


      {/* ===================== CTA ===================== */}
      <RelatedNews relatedPage="about" />
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
  const globalSeo = await fetchSeoData('/about');
  
  return {
    props: {
      globalSeo
    },
    revalidate: 60,
  };
}