"use client";

import React, { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import DOMPurify from "dompurify";

// ── Brand tokens (matching News/Career details pages) ─────────
const T = {
  brand: "#5CC9D6",
  brandLt: "rgba(92, 201, 214, 0.1)",
  brandMd: "rgba(92, 201, 214, 0.2)",
  black: "#F8FAFC",
  body: "#AEB8C2",
  muted: "#7F93A3",
  cream: "#081826",
  creamDk: "#22384B",
  white: "#0F2436",
};
const FONT = "'DM Sans', sans-serif";

// ── Content Formatter ─────────────────────────────────────────
const linkify = (text) => {
  // Replace emails with mailto: links
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
  let linked = text.replace(emailRegex, '<a href="mailto:$1">$1</a>');

  // Replace URLs with https:// links (if they aren't already part of an href)
  // This simple regex looks for http or https.
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  linked = linked.replace(urlRegex, (url) => {
    // If it's already in an href due to previous regex (unlikely but safe check), skip it.
    if (url.includes('href="')) return url;
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });

  return linked;
};

const formatContent = (raw = "") => {
  const lines = raw.split("\n");
  const html = [];
  let listBuffer = [];

  const flushList = () => {
    if (listBuffer.length) {
      html.push(`<ul>${listBuffer.map((item) => `<li>${linkify(item)}</li>`).join("")}</ul>`);
      listBuffer = [];
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    const bulletMatch = trimmed.match(/^[-•]\s*(.+)/);
    if (bulletMatch) {
      listBuffer.push(bulletMatch[1]);
    } else {
      flushList();
      if (trimmed) html.push(`<p>${linkify(trimmed)}</p>`);
    }
  });
  flushList();

  return html.join("");
};

// ── Skeleton Loader ───────────────────────────────────────────
function ArticleSkeleton() {
  const bar = (w, h = 14, mb = 10, delay = 0, key = undefined) => (
      <div key={key} style={{
          height: h, width: w, borderRadius: 7, marginBottom: mb,
          background: "#22384B", animation: `pulse 1.4s ease-in-out ${delay}s infinite`
      }} />
  );
  return (
      <div style={{ maxWidth: 740, margin: "0 auto", padding: "60px 24px" }}>
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}`}</style>
          {bar("30%", 10, 24)}
          {bar("85%", 38, 12)}
          {bar("60%", 38, 40)}
          <div style={{
              height: 100, borderRadius: 20, background: "#22384B",
              marginBottom: 48, animation: "pulse 1.4s ease-in-out infinite"
          }} />
          {[100, 95, 88, 72, 95, 80].map((w, i) => bar(`${w}%`, 14, 12, i * 0.08, i))}
      </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function LegalPage() {
  const params = useParams();
  const slug = params?.slug;

  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFoundFlag, setNotFoundFlag] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchPage = async () => {
      try {
        setLoading(true);
        setNotFoundFlag(false);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002"}/public/legal/${slug}`);
        if (!res.ok) {
          if (res.status === 404) setNotFoundFlag(true);
          throw new Error("Failed to fetch legal page");
        }
        const json = await res.json();
        if (json.success && json.data) {
          setPageData(json.data);
          if (json.data.seo?.metaTitle) {
            document.title = json.data.seo.metaTitle;
          }
        } else {
          setNotFoundFlag(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return <div style={{ minHeight: "100vh", background: T.cream, paddingTop: 80 }}><ArticleSkeleton /></div>;
  }

  if (notFoundFlag || !pageData) {
    return notFound();
  }

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const parsed = new Date(dateString);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };
  const lastUpdatedLabel = formatDate(pageData.lastUpdated);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { background: ${T.cream}; margin: 0; }
        
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .fu  { animation: fadeUp .5s cubic-bezier(.4,0,.2,1) both; }
        
        /* ── Article Prose Styles ── */
        .article-body {
            font-family: ${FONT};
        }
        .article-body .section-block {
            margin-bottom: 3.5rem;
        }
        .article-body h2 {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          color: #F8FAFC;
          letter-spacing: -0.02em;
          line-height: 1.25;
          font-size: clamp(1.2rem, 2vw, 1.5rem);
          margin: 0 0 1rem 0;
        }
        .article-body p {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px; 
          font-weight: 400;
          color: #AEB8C2; 
          line-height: 1.85;
          margin: 0 0 1.4em;
        }
        .article-body strong, .article-body b {
          font-weight: 700; color: #F8FAFC;
        }
        .article-body a {
          color: #5CC9D6; font-weight: 600;
          text-underline-offset: 3px;
        }
        .article-body a:hover { color: #5CC9D6; filter: brightness(1.1); text-decoration: underline; }
        .article-body ul, .article-body ol {
          padding-left: 0; margin: 0 0 1.4em;
          list-style: none;
        }
        .article-body li {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px; color: #AEB8C2;
          line-height: 1.8; margin-bottom: 0.6em;
          position: relative;
          padding-left: 24px;
        }
        .article-body li::before {
          content: "•";
          position: absolute;
          left: 0;
          top: -2px;
          color: ${T.brand};
          font-weight: 900;
          font-size: 20px;
        }
        .article-body hr {
          border: none; border-top: 1px solid rgba(255,255,255,0.06);
          margin: 0 0 2em 0;
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: T.cream, fontFamily: FONT }}>

        {/* ── HERO SECTION ── */}
        <div className="fu" style={{
            position: "relative",
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            paddingTop: 120,
            paddingBottom: 40,
            marginBottom: 20,
            background: "#081826",
            overflow: "hidden"
        }}>
            {/* Subtle Gradient Glow */}
            <div style={{
                position: "absolute",
                top: "-30%",
                left: "20%",
                width: "60%",
                height: "100%",
                background: "radial-gradient(ellipse at top, rgba(92,201,214,0.08) 0%, rgba(8,24,38,0) 70%)",
                zIndex: 0,
                pointerEvents: "none"
            }} />

            <div style={{ 
                position: "relative", 
                zIndex: 2, 
                maxWidth: 960, 
                margin: "0 auto", 
                padding: "0 24px",
                width: "100%"
            }}>
                <h1 style={{
                    fontSize: "clamp(2rem, 4vw, 2.75rem)", 
                    fontWeight: 700, 
                    color: '#ffffff', 
                    letterSpacing: '-0.02em', 
                    lineHeight: 1.2, 
                    marginBottom: 16,
                    maxWidth: 850, 
                    fontFamily: FONT
                }}>
                    {pageData.title}
                </h1>

                <p style={{
                    fontSize: "1rem",
                    color: T.muted,
                    maxWidth: 700,
                    lineHeight: 1.6,
                    marginBottom: 16
                }}>
                    Please read this document carefully. It outlines our policies, your rights, and how we handle your data across our enterprise digital ecosystems.
                </p>

                {lastUpdatedLabel && (
                    <div style={{
                        display: "flex", alignItems: "center", gap: 12,
                        flexWrap: "wrap", fontFamily: FONT
                    }}>
                        <span style={{ fontSize: 13, color: T.muted, fontWeight: 500, letterSpacing: "0.02em" }}>
                            Last Updated: <strong style={{ color: "#fff", fontWeight: 700 }}>{lastUpdatedLabel}</strong>
                        </span>
                    </div>
                )}
            </div>
        </div>

        {/* ── CONTENT SECTION ── */}
        <div style={{ 
            maxWidth: 780, 
            margin: "0 auto", 
            padding: "0 24px 120px" 
        }}>
            <article className="article-body">
                {pageData.sections?.length > 0 ? (
                    pageData.sections.map((section, index) => {
                        const htmlContent = typeof window !== "undefined"
                            ? DOMPurify.sanitize(formatContent(section.content))
                            : formatContent(section.content);

                        return (
                            <div key={index} className="section-block fu" style={{ animationDelay: `${index * 0.1}s` }}>
                                {section.heading && (
                                    <>
                                        <h2>{section.heading}</h2>
                                        <hr />
                                    </>
                                )}
                                {section.content && (
                                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div style={{ textAlign: "center", padding: "60px 0" }}>
                        <p>This document is currently being updated.</p>
                    </div>
                )}
            </article>
        </div>
      </div>
    </>
  );
}