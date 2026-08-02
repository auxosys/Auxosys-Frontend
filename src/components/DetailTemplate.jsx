import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { CheckCircle2, Layers, ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import styles from './DetailTemplate.module.css';

export default function DetailTemplate({ pageData, breadcrumbParent }) {
  if (!pageData) return null;

  return (
    <>
      <Head>
        <title>{pageData.title} | Auxosys</title>
        <meta name="description" content={pageData.description} />
      </Head>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.title}>{pageData.title}</h1>
          <p className={styles.description}>{pageData.description}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          
          {/* Features */}
          <h2 className={styles.sectionTitle}>Key Features</h2>
          <div className={styles.featuresGrid}>
            {pageData.features.map((feature, idx) => (
              <div key={idx} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <Layers size={24} />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <h2 className={styles.sectionTitle}>Why Choose Auxosys</h2>
          <ul className={styles.benefitsList}>
            {pageData.benefits.map((benefit, idx) => (
              <li key={idx} className={styles.benefitItem}>
                <CheckCircle2 size={24} className={styles.benefitCheck} />
                {benefit}
              </li>
            ))}
          </ul>

        </div>
      </section>

      {/* CTA Section */}
      {/* CTA Section */}
      <section className="section home-cta" id="contact">
        <div className="container">
          <Reveal className="cta-banner">
            <div className="cta-content">
              <h2>Success is measured by the value we create — not just the software we ship.</h2>
              <p>At Auxosys, we build for the long term — for our clients, our community, and the future of technology.</p>
            </div>
            <div className="cta-actions">
              <Link href="/contact" className="btn btn-primary">Let's Build Together</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
