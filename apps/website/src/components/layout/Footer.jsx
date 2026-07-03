export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" className="logo">
              <img src="/logo-wordmark.svg" alt="Auxosys" className="logo-img" />
            </a>
            <p>We build intelligent digital ecosystems that empower businesses worldwide.</p>
            <div className="social-row">
              <a href="#" className="social-icon" aria-label="LinkedIn">in</a>
              <a href="#" className="social-icon" aria-label="GitHub">gh</a>
              <a href="#" className="social-icon" aria-label="X / Twitter">𝕏</a>
              <a href="#" className="social-icon" aria-label="Instagram">ig</a>
            </div>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="/about">Who We Are</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/news">Newsroom</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Solutions</h5>
            <ul>
              <li><a href="/products">Products</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/industries">Industries</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Technologies</h5>
            <ul>
              <li><a href="#">AI</a></li>
              <li><a href="#">Cloud</a></li>
              <li><a href="#">SaaS</a></li>
              <li><a href="#">Blockchain</a></li>
              <li><a href="#">Web Development</a></li>
              <li><a href="#">Mobile Development</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Stay Updated</h5>
            <div className="newsletter-box">
              <p>Stay updated with our latest products, technology insights, and company news.</p>
              <div className="news-input-row">
                <input type="email" placeholder="Enter your email" />
                <button type="button">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Auxosys. All rights reserved.</span>
          <span className="footer-tagline"><span className="dot"></span>Engineering the Future, Together.</span>
          <span>Privacy Policy &nbsp;·&nbsp; Terms &amp; Conditions</span>
        </div>
      </div>
    </footer>
  );
}
