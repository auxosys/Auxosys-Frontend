import HeroGlobe from '@/components/HeroGlobe';
import Reveal from '@/components/Reveal';
import {
  IconBrain, IconCRM, IconCloud, IconTools,
  IconAI, IconSaaS, IconWeb, IconMobile, IconBlockchain, IconBulb, IconDesign,
  IconHealthcare, IconFinance, IconEducation, IconRetail, IconManufacturing,
  IconRealEstate, IconLogistics, IconStartup,
  IconLightning, IconShield, IconScale, IconSearch, IconHandshake, IconSupport,
} from '@/components/Icons';

export default function HomePage() {
  return (
    <>


      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div>

            <h1>Building Intelligent Digital Products That Scale Businesses</h1>
            <span className="hero-highlight">AI • SaaS • Cloud • Blockchain • Enterprise Solutions</span>
            <p className="desc">Auxosys helps startups, businesses, and enterprises transform ambitious ideas into secure, scalable, and intelligent digital products. From AI-powered applications and SaaS platforms to enterprise software and blockchain solutions, we build technology designed for long-term growth.</p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">Start Your Project</a>
              <a href="#services" className="btn btn-outline">Explore Our Solutions</a>
            </div>
          </div>

          <div className="hero-right">
            <HeroGlobe />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="container about-grid">
          <Reveal>
            <div className="eyebrow">Who We Are</div>
            <h2 style={{ fontSize: "36px", marginBottom: "20px" }}>About Auxosys</h2>
            <p>Auxosys is a technology startup building innovative digital products, SaaS platforms, AI-powered solutions, blockchain applications, and cloud solutions for businesses worldwide.</p>
            <p>Unlike a traditional software agency, we follow a hybrid model — building our own products while delivering premium technology services to startups, enterprises, and organizations. Our mission is to create reliable software that combines intelligent automation, beautiful design, and modern engineering practices.</p>
          </Reveal>
          <Reveal className="values-grid">
            <div className="value-card"><div className="num">01</div><h4>Innovation</h4><p>Building solutions with emerging technologies.</p></div>
            <div className="value-card"><div className="num">02</div><h4>Quality</h4><p>Delivering software built for performance and scalability.</p></div>
            <div className="value-card"><div className="num">03</div><h4>Trust</h4><p>Maintaining transparent communication and reliable partnerships.</p></div>
            <div className="value-card"><div className="num">04</div><h4>Growth</h4><p>Helping businesses scale through technology.</p></div>
          </Reveal>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section alt" id="products">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Our Products</div>
            <h2>Innovative Products for a <span className="accent">Smarter Tomorrow</span></h2>
            <p>We're building a growing ecosystem of software products designed to solve everyday business challenges.</p>
          </Reveal>
          <Reveal>
            <div className="card-grid cols-4">
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
            </div>
          </Reveal>
          <div className="section-cta"><a href="#" className="btn btn-outline">View All Products</a></div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" id="services">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Our Services</div>
            <h2>End-to-End Technology Services</h2>
            <p>From idea validation to enterprise deployment, we provide end-to-end technology services.</p>
          </Reveal>
          <Reveal>
            <div className="card-grid cols-4">
              <div className="card"><div className="card-icon"><IconAI /></div><h3>AI Development</h3><p>Custom AI applications, chatbots, recommendation systems, and intelligent automation.</p></div>
              <div className="card"><div className="card-icon"><IconSaaS /></div><h3>SaaS Development</h3><p>Scalable multi-tenant SaaS platforms designed for rapid business growth.</p></div>
              <div className="card"><div className="card-icon"><IconWeb /></div><h3>Web Development</h3><p>Modern, responsive, and high-performance websites and web applications.</p></div>
              <div className="card"><div className="card-icon"><IconMobile /></div><h3>Mobile Development</h3><p>Cross-platform Android and iOS applications.</p></div>
              <div className="card"><div className="card-icon"><IconCloud /></div><h3>Cloud Solutions</h3><p>Cloud-native infrastructure, migration, DevOps, and monitoring.</p></div>
              <div className="card"><div className="card-icon"><IconBlockchain /></div><h3>Blockchain Development</h3><p>Smart contracts, decentralized applications, and Web3 solutions.</p></div>
              <div className="card"><div className="card-icon"><IconBulb /></div><h3>Product Consulting</h3><p>Helping startups validate, design, and launch successful products.</p></div>
              <div className="card"><div className="card-icon"><IconDesign /></div><h3>UI/UX Design</h3><p>Human-centered interfaces with exceptional user experiences.</p></div>
            </div>
          </Reveal>
          <div className="section-cta"><a href="#" className="btn btn-outline">Explore Services</a></div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">How We Work</div>
            <h2>A Process Built for Clarity</h2>
            <p>Six steps, the same order every time, so you always know what's next and why.</p>
          </Reveal>
          <Reveal>
            <div className="timeline">
              <div className="tl-step"><div className="tl-dot">01</div><h4>Discover</h4><p>Understand your goals, users, and technical constraints.</p></div>
              <div className="tl-step"><div className="tl-dot">02</div><h4>Strategize</h4><p>Define scope, architecture, and a realistic roadmap.</p></div>
              <div className="tl-step"><div className="tl-dot">03</div><h4>Design</h4><p>Craft interfaces and systems built for clarity.</p></div>
              <div className="tl-step"><div className="tl-dot">04</div><h4>Develop</h4><p>Build with modern, scalable engineering practices.</p></div>
              <div className="tl-step"><div className="tl-dot">05</div><h4>Test &amp; Launch</h4><p>Rigorous QA before anything goes live.</p></div>
              <div className="tl-step"><div className="tl-dot">06</div><h4>Support</h4><p>Ongoing maintenance, monitoring, and iteration.</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section" id="industries">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Industries</div>
            <h2>Industries We Empower</h2>
            <p>Every industry has unique challenges. We create tailored technology solutions that drive measurable outcomes.</p>
          </Reveal>
          <Reveal>
            <div className="card-grid cols-4">
              <div className="card"><div className="card-icon"><IconHealthcare /></div><h3>Healthcare</h3><p>Secure healthcare software and patient management systems.</p></div>
              <div className="card"><div className="card-icon"><IconFinance /></div><h3>Finance</h3><p>Digital banking, fintech, payment systems, and analytics.</p></div>
              <div className="card"><div className="card-icon"><IconEducation /></div><h3>Education</h3><p>Learning management systems and digital education platforms.</p></div>
              <div className="card"><div className="card-icon"><IconRetail /></div><h3>Retail</h3><p>Omnichannel commerce and inventory management.</p></div>
              <div className="card"><div className="card-icon"><IconManufacturing /></div><h3>Manufacturing</h3><p>Factory automation and operational intelligence.</p></div>
              <div className="card"><div className="card-icon"><IconRealEstate /></div><h3>Real Estate</h3><p>Property management and smart real estate platforms.</p></div>
              <div className="card"><div className="card-icon"><IconLogistics /></div><h3>Logistics</h3><p>Fleet tracking and logistics optimization.</p></div>
              <div className="card"><div className="card-icon"><IconStartup /></div><h3>Startups</h3><p>MVP development and product engineering.</p></div>
            </div>
          </Reveal>
          <div className="section-cta"><a href="#" className="btn btn-outline">Explore Industries</a></div>
        </div>
      </section>

      {/* TRUSTED TECH */}
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Tech Stack</div>
            <h2>Built with Modern Technologies</h2>
            <p>We leverage modern frameworks, cloud platforms, and AI technologies to build scalable, secure, and high-performance software.</p>
          </Reveal>
          <Reveal>
            <div className="tech-grid">
              <div className="tech-item">React</div>
              <div className="tech-item">Next.js</div>
              <div className="tech-item">TypeScript</div>
              <div className="tech-item">Node.js</div>
              <div className="tech-item">NestJS</div>
              <div className="tech-item">Supabase</div>
              <div className="tech-item">PostgreSQL</div>
              <div className="tech-item">Docker</div>
              <div className="tech-item">Kubernetes</div>
              <div className="tech-item">AWS</div>
              <div className="tech-item">Google Cloud</div>
              <div className="tech-item">OpenAI</div>
              <div className="tech-item">Gemini</div>
              <div className="tech-item">Claude</div>
              <div className="tech-item">Python</div>
              <div className="tech-item">Blockchain</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE */}
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

      {/* STATS */}
      <section className="section alt">
        <div className="container">
          <Reveal className="section-head" style={{ marginBottom: "48px" }}>
            <div className="eyebrow">By the Numbers</div>
            <h2>Numbers That Reflect Our Vision</h2>
          </Reveal>
          <Reveal>
            <div className="stats-grid">
              <div className="stat-card"><div className="stat-num">50+</div><div className="stat-label">Projects Delivered</div></div>
              <div className="stat-card"><div className="stat-num">30+</div><div className="stat-label">Technologies Mastered</div></div>
              <div className="stat-card"><div className="stat-num">15+</div><div className="stat-label">Industries Served</div></div>
              <div className="stat-card"><div className="stat-num">10+</div><div className="stat-label">Solutions in Development</div></div>
              <div className="stat-card"><div className="stat-num">Growing</div><div className="stat-label">Global Clients</div></div>
              <div className="stat-card"><div className="stat-num">24/7</div><div className="stat-label">Support Availability</div></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Coming Soon</div>
            <h2>What Our Future Clients Will Say</h2>
          </Reveal>
          <Reveal>
            <div className="card-grid cols-3">
              <div className="testimonial-card"><span className="badge">Coming Soon</span><h4>Client Testimonial</h4><p>Real stories from our partners will appear here soon.</p></div>
              <div className="testimonial-card"><span className="badge">Coming Soon</span><h4>Client Testimonial</h4><p>Real stories from our partners will appear here soon.</p></div>
              <div className="testimonial-card"><span className="badge">Coming Soon</span><h4>Client Testimonial</h4><p>Real stories from our partners will appear here soon.</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section" id="contact">
        <div className="container">
          <Reveal className="cta-banner">
            <h2>Ready to Build Something Extraordinary?</h2>
            <p>Whether you're launching a startup, modernizing enterprise software, or building the next AI-powered platform, Auxosys is ready to help transform your vision into reality.</p>
            <div className="cta-actions">
              <a href="#" className="btn btn-primary">Start Your Project</a>
              <a href="#" className="btn btn-outline">Contact Our Team</a>
            </div>
          </Reveal>
        </div>
      </section>


    </>
  )
}
