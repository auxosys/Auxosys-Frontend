"use client";

import React, { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import PolicyLayout from "../../components/layout/PolicyLayout";

// ── Content Formatter ─────────────────────────────────────────
const linkify = (text) => {
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
  let linked = text.replace(emailRegex, '<a href="mailto:$1">$1</a>');

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  linked = linked.replace(urlRegex, (url) => {
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
          height: h, width: w, borderRadius: 7, margin: "0 auto", marginBottom: mb,
          background: "#22384B", animation: `pulse 1.4s ease-in-out ${delay}s infinite`
      }} />
  );
  return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "120px 24px" }}>
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}`}</style>
          {bar("30%", 20, 24)}
          {bar("60%", 48, 24)}
          {bar("40%", 16, 64)}
          <div style={{
              height: 200, borderRadius: 24, background: "#13233E",
              marginBottom: 24, animation: "pulse 1.4s ease-in-out infinite"
          }} />
          <div style={{
              height: 300, borderRadius: 24, background: "#13233E",
              marginBottom: 24, animation: "pulse 1.4s ease-in-out 0.2s infinite"
          }} />
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
    return <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #071321, #0D1D36)" }}><ArticleSkeleton /></div>;
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

  // Map backend sections to HTML for the single card
  const sectionsHtml = (pageData.sections || []).map(section => {
    const heading = section.heading ? `<h2>${section.heading}</h2>` : '';
    const body = formatContent(section.content || "");
    return `${heading}${body}`;
  }).join("");

  return (
    <PolicyLayout 
      title={pageData.title}
      subtitle="Please read this document carefully. It outlines our policies, your rights, and how we handle your data across our enterprise digital ecosystems."
      lastUpdated={lastUpdatedLabel}
      content={sectionsHtml}
      backFallback="/"
    />
  );
}