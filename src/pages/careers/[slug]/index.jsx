"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

/* ─── Inline SVG Icons (no dependency needed) ─── */
const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);
const MapPinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const StarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const ClockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const BuildingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><path d="M9 22V12h6v10M8 6h.01M12 6h.01M16 6h.01M8 10h.01M16 10h.01" />
  </svg>
);
const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const MonitorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);
const DollarSignIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const HashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);
const LinkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);
const PrinterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
);
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.6 8.7L23.3 22H16.6l-5.2-6.8L5.4 22H2.3l8.1-9.3L1.5 2h6.9l4.7 6.2L18.9 2zm-1.2 18h1.7L7.4 3.9H5.6L17.7 20z" /></svg>
);
const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22 6 12 13 2 6" />
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const SparkleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L9.5 9.5 3 12l6.5 2.5L12 21l2.5-6.5L21 12l-6.5-2.5L12 3z" />
  </svg>
);
const GiftIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);
const CodeIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const AlertCircleIcon = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

/* ─── Brand tokens (single restrained accent + one action color) ─── */
const ACCENT = "#5CC9D6";   // informational accent — icons, links, section markers
const ACTION = "#0C8074";   // the one place boldness is spent — Apply CTA
const POSITIVE = "#22C55E"; // reserved for compensation figures only

/* ─── Strip HTML tags from rich text ─── */
function stripHtml(html = "") {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\\n/g, "\n")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
}

/* ─── Parse multiline text into clean array ─── */
function parseLines(text = "") {
  const cleaned = stripHtml(text);
  return cleaned.split("\n").map(l => l.trim()).filter(Boolean).map(l => l.replace(/^[-•*►▶]\s*/, ""));
}

/* ─── Section block — Inner section inside the main card ─── */
function SectionBlock({ icon, title, children }) {
  return (
    <div className="section-block" style={{ paddingBottom: "20px", marginBottom: "20px", borderBottom: "1px dashed var(--border-subtle)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
        <span style={{ color: ACCENT, display: "flex", padding: "8px", background: "rgba(92,201,214,0.1)", borderRadius: "8px" }}>{icon}</span>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text)", margin: 0, letterSpacing: "-0.01em" }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

/* ─── Bullet list item ─── */
function BulletItem({ text }) {
  return (
    <li className="bullet-item" style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "var(--text-muted)", lineHeight: 1.75, fontSize: "0.95rem" }}>
      <span style={{ color: ACCENT, marginTop: "5px", flexShrink: 0, opacity: 0.8 }}>
        <ChevronRightIcon />
      </span>
      <span>{text}</span>
    </li>
  );
}

/* ─── Overview row — label/value pair for the "at a glance" card ─── */
function OverviewRow({ icon, label, value, valueColor }) {
  if (!value) return null;
  return (
    <div className="overview-row" style={{
      display: "flex", alignItems: "flex-start", gap: "14px",
      borderBottom: "1px dashed var(--border-subtle)",
    }}>
      <div style={{ color: ACCENT, flexShrink: 0, marginTop: "3px" }}>{icon}</div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-soft)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 3px" }}>{label}</p>
        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: valueColor || "var(--text)", margin: 0 }}>{value}</p>
      </div>
    </div>
  );
}

/* ─── Quick fact — used in the horizontal strip under the title ─── */
function QuickFact({ icon, children }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: "7px", color: "var(--text-muted)", fontSize: "0.875rem", fontWeight: 500, whiteSpace: "nowrap" }}>
      <span style={{ color: ACCENT, display: "flex" }}>{icon}</span>
      {children}
    </span>
  );
}

export default function JobDetailsPage() {
  const router = useRouter();
  const params = router.query;
  const slug = params?.slug;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://auxosys-backend.vercel.app'}/job/${slug}`);
        const json = await res.json();
        if (json.success && json.data) setJob(json.data);
      } catch (err) {
        console.error("Failed to fetch job details:", err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchJob();
  }, [slug]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform) => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${job?.title || "Open role"} — join us`);
    const targets = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      x: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      mail: `mailto:?subject=${text}&body=${url}`,
    };
    if (platform === "mail") window.location.href = targets.mail;
    else window.open(targets[platform], "_blank", "noopener,noreferrer,width=600,height=500");
  };

  /* ─── Loading ─── */
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "18px" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid rgba(92,201,214,0.2)", borderTopColor: ACCENT, animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: "var(--text-soft)", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>Loading position details</p>
      </div>
    );
  }

  /* ─── Not found ─── */
  if (!job) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "40px 24px" }}>
        <div style={{ color: "var(--text-soft)", opacity: 0.5, marginBottom: "20px" }}><AlertCircleIcon /></div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text)", marginBottom: "10px" }}>Position not found</h1>
        <p style={{ color: "var(--text-soft)", marginBottom: "28px", maxWidth: "400px" }}>This role may have been filled or removed. Browse current openings below.</p>
        <Link href="/careers" style={{ background: ACTION, color: "#fff", padding: "13px 30px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem" }}>
          View open positions
        </Link>
      </div>
    );
  }

  const formatSalary = (amount) => {
    if (!amount) return null;
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: job.currency || "INR", maximumFractionDigits: 0 }).format(amount);
  };

  const descriptionLines = parseLines(job.description || job.short_summary || "");
  const responsibilities = parseLines(job.responsibilities || "");
  const requirements = parseLines(job.requirements || "");
  const niceToHave = parseLines(job.nice_to_have || "");
  const benefits = parseLines(job.benefits || "");
  const techSkills = job.tech_skills || [];
  const isClosed = job.status === "Closed";

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text-muted)", fontFamily: "var(--font-sans, system-ui, sans-serif)", paddingTop: "80px" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .job-detail-main { animation: fadeUp 0.4s ease both; }
        .apply-btn { transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease; }
        .apply-btn:hover { background: #0A6B60 !important; transform: translateY(-2px); box-shadow: 0 8px 20px -6px rgba(12,128,116,0.4); }
        .util-btn { transition: background 0.15s ease, border-color 0.15s ease; cursor: pointer; }
        .util-btn:hover { background: var(--border-subtle) !important; }
        .skill-tag { transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease; }
        .skill-tag:hover { background: rgba(92,201,214,0.15) !important; border-color: rgba(92,201,214,0.45) !important; transform: translateY(-1px); }
        .crumb a:hover { text-decoration: underline; }
        
        /* New Redesign Styles */
        .header-hero { background: transparent; border-bottom: 1px solid var(--border-subtle); padding: 56px 24px 24px; }
        .section-card { transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; border: 1px solid var(--border-subtle); background: var(--surface); border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px -10px rgba(0,0,0,0.02); }
        .section-card:hover { transform: translateY(-3px); box-shadow: 0 12px 30px -12px rgba(0,0,0,0.08); border-color: rgba(92,201,214,0.3); }
        .section-block:last-child { padding-bottom: 0; margin-bottom: 0; border-bottom: none; }
        .bullet-item { transition: transform 0.2s ease, color 0.2s ease; }
        .bullet-item:hover { transform: translateX(4px); color: var(--text); }
        .sidebar-glance { background: var(--surface-bg); border: 1px solid var(--border-subtle); border-radius: 16px; overflow: hidden; box-shadow: 0 12px 40px -12px rgba(0,0,0,0.06); }

        @media (max-width: 768px) {
          .job-layout { flex-direction: column !important; gap: 16px !important; }
          .job-sidebar { position: static !important; width: 100% !important; margin-bottom: 24px !important; }
          .header-hero { padding: 40px 16px 20px !important; }
          .job-detail-main { padding: 24px 16px 0 !important; }
          
          /* Hero Section compacting */
          .title-row { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .hero-title { font-size: 2rem !important; line-height: 1.1 !important; }
          
          /* 1-column Facts strip */
          .facts-strip { 
            display: grid !important; 
            grid-template-columns: 1fr; 
            gap: 8px !important; 
          }
          .facts-divider { display: none !important; }
          .hero-actions { width: 100%; }
          .hero-actions .apply-btn { width: 100%; text-align: center; justify-content: center; }

          /* Content cards */
          .section-card { padding: 16px 20px !important; margin-bottom: 0 !important; }
          .section-block { padding-bottom: 16px !important; margin-bottom: 16px !important; }
          .section-block h2 { font-size: 1.1rem !important; }

          .cross-nav { margin-top: 16px !important; }

          /* 1-column Sidebar Glance */
          .glance-grid {
            display: grid !important;
            grid-template-columns: 1fr;
            gap: 0;
          }
          .overview-row { padding: 10px 0 !important; }
        }
        .overview-row { padding: 16px 0; }
        @media print {
          .no-print { display: none !important; }
          .job-layout { display: block !important; }
        }
      `}</style>

      {/* ═══════════════ HEADER ═══════════════ */}
      <div className="header-hero">
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <Link href="/careers" className="no-print" style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            color: "var(--text-soft)", fontWeight: 600, fontSize: "0.78rem",
            letterSpacing: "0.06em", textDecoration: "none", marginBottom: "18px",
          }}>
            <ArrowLeftIcon /> Back to all openings
          </Link>

          {/* Tags */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {job.department && (
              <span style={tagStyle(ACCENT)}>{job.department}</span>
            )}
            {job.featured && <span style={tagStyle(ACCENT)}>Featured role</span>}
            {isClosed && <span style={tagStyle("#EF4444")}>Position closed</span>}
          </div>

          <div className="title-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px", marginBottom: "18px" }}>
            <h1 className="hero-title" style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--text)", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              {job.title}
            </h1>
            
            {/* CTA */}
            <div className="hero-actions" style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
              {isClosed ? (
                <div style={{ padding: "13px 26px", borderRadius: "8px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "#EF4444", fontWeight: 700, fontSize: "0.9rem" }}>
                  Applications closed
                </div>
              ) : (
                <Link href={`/careers/${slug}/apply`} className="apply-btn" style={{
                  display: "inline-flex", alignItems: "center", gap: "9px",
                  background: ACTION, color: "#fff", padding: "13px 26px", borderRadius: "8px",
                  fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", letterSpacing: "-0.01em",
                }}>
                  Apply for this role
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              )}
            </div>
          </div>

          {/* Quick facts strip — the signature element: a dense, scannable summary row */}
          <div className="facts-strip" style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap", marginBottom: "24px" }}>
            {(job.work_mode || job.city) && (
              <QuickFact icon={<MapPinIcon />}>{job.work_mode}{job.city ? ` — ${job.city}, ${job.country || ""}` : ""}</QuickFact>
            )}
            {job.employment_type && (<><span className="facts-divider" style={{ color: "var(--border-subtle)" }}>|</span><QuickFact icon={<BriefcaseIcon />}>{job.employment_type}</QuickFact></>)}
            {job.experience_level && (<><span className="facts-divider" style={{ color: "var(--border-subtle)" }}>|</span><QuickFact icon={<StarIcon />}>{job.experience_level} level</QuickFact></>)}
            {job.created_at && (<><span className="facts-divider" style={{ color: "var(--border-subtle)" }}>|</span><QuickFact icon={<ClockIcon />}>Posted {new Date(job.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</QuickFact></>)}
            <><span className="facts-divider" style={{ color: "var(--border-subtle)" }}>|</span><QuickFact icon={<HashIcon />}>Ref. {String(job.id || "").substring(0, 8).toUpperCase()}</QuickFact></>
          </div>
        </div>
      </div>

      {/* ═══════════════ CONTENT ═══════════════ */}
      <div className="job-detail-main" style={{ maxWidth: "1160px", margin: "0 auto", padding: "32px 24px 0" }}>
        <div className="job-layout" style={{ display: "flex", gap: "48px", alignItems: "flex-start" }}>

          {/* ── LEFT: Main Content ── */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "20px" }}>

            <section className="section-card">
              {descriptionLines.length > 0 && (
                <SectionBlock icon={<BriefcaseIcon />} title="About the role">
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {descriptionLines.map((para, i) => (
                      <p key={i} style={{ color: "var(--text-muted)", lineHeight: 1.75, fontSize: "0.95rem", margin: 0 }}>{para}</p>
                    ))}
                  </div>
                </SectionBlock>
              )}
  
              {responsibilities.length > 0 && (
                <SectionBlock icon={<CheckCircleIcon />} title="Key responsibilities">
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                    {responsibilities.map((item, i) => <BulletItem key={i} text={item} />)}
                  </ul>
                </SectionBlock>
              )}
  
              {requirements.length > 0 && (
                <SectionBlock icon={<StarIcon />} title="Requirements & qualifications">
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                    {requirements.map((item, i) => <BulletItem key={i} text={item} />)}
                  </ul>
                </SectionBlock>
              )}
  
              {niceToHave.length > 0 && (
                <SectionBlock icon={<SparkleIcon />} title="Nice to have">
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                    {niceToHave.map((item, i) => <BulletItem key={i} text={item} />)}
                  </ul>
                </SectionBlock>
              )}
  
              {benefits.length > 0 && (
                <SectionBlock icon={<GiftIcon />} title="Benefits & perks">
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                    {benefits.map((item, i) => <BulletItem key={i} text={item} />)}
                  </ul>
                </SectionBlock>
              )}
  
              {techSkills.length > 0 && (
                <SectionBlock icon={<CodeIcon />} title="Tech stack & skills">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {techSkills.map((skill, i) => (
                      <span key={i} className="skill-tag" style={{
                        background: "rgba(92,201,214,0.08)", color: ACCENT,
                        border: "1px solid rgba(92,201,214,0.2)",
                        padding: "6px 12px", borderRadius: "6px",
                        fontSize: "0.8rem", fontWeight: 600, cursor: "default",
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </SectionBlock>
              )}
            </section>

            {/* Closing cross-nav — enterprise career pages point back to the full board */}
            <div className="no-print cross-nav" style={{
              border: "1px solid var(--border-subtle)", borderRadius: "10px",
              padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: "16px", flexWrap: "wrap"
            }}>
              <div>
                <p style={{ fontWeight: 700, color: "var(--text)", margin: "0 0 4px", fontSize: "0.95rem" }}>Not quite the right fit?</p>
                <p style={{ color: "var(--text-soft)", margin: 0, fontSize: "0.85rem" }}>Explore every open position across the company.</p>
              </div>
              <Link href="/careers" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: ACCENT, fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", whiteSpace: "nowrap" }}>
                View all openings <ChevronRightIcon />
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <div className="job-sidebar" style={{ width: "320px", flexShrink: 0, position: "sticky", top: "100px", marginBottom: "24px" }}>
            <div className="sidebar-glance">
              <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--border-subtle)" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-soft)", margin: 0 }}>Job at a glance</p>
              </div>

              <div className="glance-grid" style={{ padding: "4px 22px 12px" }}>
                <OverviewRow icon={<BuildingIcon />} label="Department" value={job.department} />
                {job.team && <OverviewRow icon={<UsersIcon />} label="Team" value={job.team} />}
                <OverviewRow icon={<MonitorIcon />} label="Work mode" value={job.work_mode} />
                <OverviewRow icon={<BriefcaseIcon />} label="Job type" value={job.employment_type} />
                {job.experience_level && <OverviewRow icon={<StarIcon />} label="Experience level" value={job.experience_level} />}
                {(!job.hide_salary && job.min_salary) && (
                  <OverviewRow
                    icon={<DollarSignIcon />}
                    label="Compensation"
                    value={`${formatSalary(job.min_salary)}${job.max_salary ? ` – ${formatSalary(job.max_salary)}` : ""} / ${job.salary_type || "yr"}`}
                    valueColor={POSITIVE}
                  />
                )}
                {job.expected_joining_date && (
                  <OverviewRow
                    icon={<CalendarIcon />}
                    label="Expected joining"
                    value={new Date(job.expected_joining_date).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                  />
                )}
                {job.application_deadline && (
                  <OverviewRow
                    icon={<CalendarIcon />}
                    label="Apply by"
                    value={new Date(job.application_deadline).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    valueColor="#F59E0B"
                  />
                )}
                <OverviewRow icon={<HashIcon />} label="Reference ID" value={String(job.id || "").substring(0, 8).toUpperCase()} />
              </div>

              <div className="no-print" style={{ padding: "18px 22px 22px", borderTop: "1px solid var(--border-subtle)" }}>
                {isClosed ? (
                  <div style={{ width: "100%", textAlign: "center", padding: "11px 16px", borderRadius: "8px", background: "rgba(239,68,68,0.08)", color: "#EF4444", fontWeight: 700, fontSize: "0.85rem" }}>
                    Applications closed
                  </div>
                ) : (
                  <Link href={`/careers/${slug}/apply`} className="apply-btn" style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    width: "100%", background: ACTION, color: "#fff",
                    padding: "12px 16px", borderRadius: "8px", fontWeight: 700, fontSize: "0.88rem",
                    textDecoration: "none", boxSizing: "border-box",
                  }}>
                    Apply for this role
                  </Link>
                )}
                <button onClick={handleCopy} className="util-btn" style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
                  background: "transparent", border: "1px solid var(--border-subtle)",
                  color: copied ? POSITIVE : "var(--text-muted)",
                  padding: "10px 16px", borderRadius: "8px", marginTop: "8px",
                  fontWeight: 600, fontSize: "0.82rem", boxSizing: "border-box",
                }}>
                  {copied ? <CheckCircleIcon /> : <LinkIcon />}
                  {copied ? "Link copied" : "Copy link to this job"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const utilBtnStyle = {
  display: "flex", alignItems: "center", justifyContent: "center",
  width: "34px", height: "34px", borderRadius: "7px",
  background: "transparent", border: "1px solid var(--border-subtle)",
  color: "var(--text-muted)",
};

function tagStyle(color) {
  return {
    fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
    color, background: `${color}14`, padding: "5px 12px", borderRadius: "5px",
    border: `1px solid ${color}30`,
  };
}