"use client";
import React from 'react';
import DOMPurify from 'dompurify';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { PageHero } from '../ui/PageHero';
import { BackButton } from '../ui/BackButton';

export default function LegalTemplate({
  title,
  subtitle,
  lastUpdated,
  content,
  backFallback = "/careers"
}) {
  return (
    <div className="font-sans min-h-screen" style={{ background: 'linear-gradient(to bottom, #071321, #0D1D36)', color: '#F8FAFC' }}>
      <Container>
        {/* HERO */}
        <PageHero title={title} subtitle={subtitle} lastUpdated={lastUpdated}>
          <BackButton fallback={backFallback} label="Back to Application" />
        </PageHero>

        {/* SINGLE CONTENT CARD */}
        <Card className="ds-document mx-auto max-w-[900px]">
          {/* Handle React components OR raw HTML strings */}
          {typeof content === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: typeof window !== 'undefined' ? DOMPurify.sanitize(content) : content }} />
          ) : (
            content
          )}
        </Card>
      </Container>
    </div>
  );
}
