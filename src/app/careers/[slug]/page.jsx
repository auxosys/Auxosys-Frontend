"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

/* ─── Inline SVG Icons (no dependency needed) ─── */
const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);
const StarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const BuildingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22V12h6v10M8 6h.01M12 6h.01M16 6h.01M8 10h.01M16 10h.01"/>
  </svg>
);
const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const MonitorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const DollarSignIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const LinkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const SparkleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L9.5 9.5 3 12l6.5 2.5L12 21l2.5-6.5L21 12l-6.5-2.5L12 3z"/>
  </svg>
);
const GiftIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>
);
const CodeIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const AlertCircleIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

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

/* ─── Section card component ─── */
function SectionCard({ icon, title, accentColor = "#5CC9D6", children }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(15,36,54,0.9) 0%, rgba(19,42,58,0.7) 100%)",
      border: "1px solid rgba(34,56,75,0.8)",
      borderRadius: "20px",
      padding: "32px",
      backdropFilter: "blur(12px)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Accent top border */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, ${accentColor}, transparent)`,
      }} />
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "10px",
          background: `${accentColor}18`,
          border: `1px solid ${accentColor}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: accentColor, flexShrink: 0,
        }}>
          {icon}
        </div>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "-0.01em" }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

/* ─── Bullet list item ─── */
function BulletItem({ text, color = "#5CC9D6" }) {
  return (
    <li style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "#CBD5E1", lineHeight: 1.7, fontSize: "0.95rem" }}>
      <span style={{ color, marginTop: "5px", flexShrink: 0 }}>
        <ChevronRightIcon />
      </span>
      <span>{text}</span>
    </li>
  );
}

/* ─── Overview row ─── */
function OverviewRow({ icon, label, value, valueColor }) {
  if (!value) return null;
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: "14px",
      padding: "14px 0",
      borderBottom: "1px solid rgba(34,56,75,0.5)",
    }}>
      <div style={{
        width: "34px", height: "34px", borderRadius: "9px",
        background: "rgba(92,201,214,0.08)", border: "1px solid rgba(92,201,214,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#5CC9D6", flexShrink: 0, marginTop: "2px",
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "3px" }}>{label}</p>
        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: valueColor || "#F1F5F9", margin: 0 }}>{value}</p>
      </div>
    </div>
  );
}

export default function JobDetailsPage() {
  const params = useParams();
  const slug = params?.slug;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/${slug}`);
        const json = await res.json();
        if (json.success && json.data) setJob(json.data);
      } catch (err) {
        console.error("Failed to fetch job details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [slug]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ─── Loading ─── */
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#081826", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "50%", border: "3px solid rgba(92,201,214,0.2)", borderTopColor: "#5CC9D6", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: "#5CC9D6", fontSize: "0.9rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Loading position...</p>
      </div>
    );
  }

  /* ─── Not found ─── */
  if (!job) {
    return (
      <div style={{ minHeight: "100vh", background: "#081826", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "40px 24px" }}>
        <div style={{ color: "rgba(92,201,214,0.4)", marginBottom: "24px" }}><AlertCircleIcon /></div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>Position Not Found</h1>
        <p style={{ color: "#64748B", marginBottom: "32px", maxWidth: "400px" }}>This position may have been filled or removed. Explore other openings below.</p>
        <Link href="/careers" style={{ background: "#FF6B35", color: "#fff", padding: "14px 32px", borderRadius: "12px", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>
          View Open Positions
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

  return (
    <div style={{ minHeight: "100vh", background: "#081826", color: "#CBD5E1", fontFamily: "var(--font-sans, system-ui, sans-serif)" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .job-detail-hero { animation: fadeUp 0.5s ease both; }
        .job-detail-main { animation: fadeUp 0.5s 0.1s ease both; }
        .apply-btn { transition: all 0.2s ease; }
        .apply-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(255,107,53,0.4) !important; }
        .copy-btn:hover { background: rgba(34,56,75,0.8) !important; }
        .skill-tag:hover { background: rgba(92,201,214,0.15) !important; border-color: rgba(92,201,214,0.5) !important; }
        @media (max-width: 1024px) {
          .job-layout { flex-direction: column !important; }
          .job-sidebar { position: static !important; width: 100% !important; }
        }
        @media (max-width: 640px) {
          .hero-title { font-size: 2rem !important; }
          .hero-meta { flex-direction: column !important; gap: 8px !important; }
          .hero-actions { flex-direction: column !important; }
        }
      `}</style>

      {/* ═══════════════ HERO ═══════════════ */}
      <div className="job-detail-hero" style={{
        backgroundImage: "linear-gradient(to bottom, rgba(8,24,38,0.72) 0%, rgba(8,24,38,0.88) 60%, rgba(8,24,38,1) 100%), url('/job.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        borderBottom: "1px solid rgba(34,56,75,0.6)",
        paddingTop: "140px",
        paddingBottom: "60px",
        paddingLeft: "24px",
        paddingRight: "24px",
        position: "relative",
        overflow: "hidden",
      }}>

        <div style={{ maxWidth: "1120px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <Link href="/careers" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            color: "#5CC9D6", fontWeight: 600, fontSize: "0.8rem",
            letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
            marginBottom: "32px", opacity: 0.9, transition: "opacity 0.2s",
          }}>
            <ArrowLeftIcon /> Back to Careers
          </Link>

          {/* Tags */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
            {job.department && (
              <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#FF6B35", background: "rgba(255,107,53,0.1)", padding: "5px 14px", borderRadius: "100px", border: "1px solid rgba(255,107,53,0.2)" }}>
                {job.department}
              </span>
            )}
            {job.featured && (
              <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5CC9D6", background: "rgba(92,201,214,0.1)", padding: "5px 14px", borderRadius: "100px", border: "1px solid rgba(92,201,214,0.25)" }}>
                ✦ Featured
              </span>
            )}
            {job.status === "Closed" && (
              <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#EF4444", background: "rgba(239,68,68,0.1)", padding: "5px 14px", borderRadius: "100px", border: "1px solid rgba(239,68,68,0.2)" }}>
                Position Closed
              </span>
            )}
          </div>

          {/* Title row: job name LEFT — [Apply] [CopyIcon] RIGHT, all on one line */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", marginBottom: "20px" }}>
            <h1 className="hero-title" style={{ fontSize: "3.25rem", fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.03em", lineHeight: 1.15, flex: 1, minWidth: "240px" }}>
              {job.title}
            </h1>

            {/* Action buttons — same row as title */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
              {job.status === "Closed" ? (
                <div style={{ padding: "14px 28px", borderRadius: "12px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#FCA5A5", fontWeight: 700, fontSize: "0.95rem" }}>
                  Applications Closed
                </div>
              ) : (
                <Link href={`/careers/${slug}/apply`} className="apply-btn" style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  background: "linear-gradient(135deg, #FF6B35, #E05C00)",
                  color: "#fff", padding: "14px 28px", borderRadius: "12px",
                  fontWeight: 700, fontSize: "0.95rem", textDecoration: "none",
                  boxShadow: "0 8px 30px rgba(255,107,53,0.3)",
                  letterSpacing: "-0.01em", whiteSpace: "nowrap",
                }}>
                  Apply for this Role
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              )}

              {/* Icon-only copy button with tooltip */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={handleCopy}
                  title="Copy Job Link"
                  className="copy-btn"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: "46px", height: "46px", borderRadius: "12px",
                    background: copied ? "rgba(34,197,94,0.12)" : "rgba(34,56,75,0.5)",
                    border: `1px solid ${copied ? "rgba(34,197,94,0.4)" : "rgba(34,56,75,0.9)"}`,
                    color: copied ? "#22C55E" : "#94A3B8",
                    cursor: "pointer", transition: "all 0.2s", flexShrink: 0,
                  }}
                >
                  {copied ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <LinkIcon />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Meta tags row — below title */}
          <div className="hero-meta" style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                {(job.work_mode || job.city) && (
                  <span style={{ display: "flex", alignItems: "center", gap: "7px", color: "#94A3B8", fontSize: "0.875rem", fontWeight: 500 }}>
                    <span style={{ color: "#5CC9D6" }}><MapPinIcon /></span>
                    {job.work_mode}{job.city ? ` — ${job.city}, ${job.country || ""}` : ""}
                  </span>
                )}
                {job.employment_type && (
                  <span style={{ display: "flex", alignItems: "center", gap: "7px", color: "#94A3B8", fontSize: "0.875rem", fontWeight: 500 }}>
                    <span style={{ color: "#5CC9D6" }}><BriefcaseIcon /></span>
                    {job.employment_type}
                  </span>
                )}
                {job.experience_level && (
                  <span style={{ display: "flex", alignItems: "center", gap: "7px", color: "#94A3B8", fontSize: "0.875rem", fontWeight: 500 }}>
                    <span style={{ color: "#F59E0B" }}><StarIcon /></span>
                    {job.experience_level} Level
                  </span>
                )}
                {job.created_at && (
                  <span style={{ display: "flex", alignItems: "center", gap: "7px", color: "#94A3B8", fontSize: "0.875rem", fontWeight: 500 }}>
                    <span style={{ color: "#5CC9D6" }}><ClockIcon /></span>
                    Posted {new Date(job.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                )}
              </div>
        </div>
      </div>

      {/* ═══════════════ CONTENT ═══════════════ */}
      <div className="job-detail-main" style={{ maxWidth: "1120px", margin: "0 auto", padding: "48px 24px 80px" }}>
        <div className="job-layout" style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>

          {/* ── LEFT: Main Content ── */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "28px" }}>

            {/* About the Role */}
            {descriptionLines.length > 0 && (
              <SectionCard icon={<BriefcaseIcon />} title="About the Role" accentColor="#5CC9D6">
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {descriptionLines.map((para, i) => (
                    <p key={i} style={{ color: "#94A3B8", lineHeight: 1.75, fontSize: "0.95rem", margin: 0 }}>{para}</p>
                  ))}
                </div>
              </SectionCard>
            )}

            {/* Responsibilities */}
            {responsibilities.length > 0 && (
              <SectionCard icon={<CheckCircleIcon />} title="What You'll Do" accentColor="#5CC9D6">
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  {responsibilities.map((item, i) => <BulletItem key={i} text={item} color="#5CC9D6" />)}
                </ul>
              </SectionCard>
            )}

            {/* Requirements */}
            {requirements.length > 0 && (
              <SectionCard icon={<StarIcon />} title="Requirements" accentColor="#FF6B35">
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  {requirements.map((item, i) => <BulletItem key={i} text={item} color="#FF6B35" />)}
                </ul>
              </SectionCard>
            )}

            {/* Nice to Have */}
            {niceToHave.length > 0 && (
              <SectionCard icon={<SparkleIcon />} title="Nice to Have" accentColor="#F59E0B">
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  {niceToHave.map((item, i) => <BulletItem key={i} text={item} color="#F59E0B" />)}
                </ul>
              </SectionCard>
            )}

            {/* Benefits */}
            {benefits.length > 0 && (
              <SectionCard icon={<GiftIcon />} title="Benefits & Perks" accentColor="#22C55E">
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  {benefits.map((item, i) => <BulletItem key={i} text={item} color="#22C55E" />)}
                </ul>
              </SectionCard>
            )}

            {/* Tech Skills */}
            {techSkills.length > 0 && (
              <SectionCard icon={<CodeIcon />} title="Tech Stack & Skills" accentColor="#A78BFA">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {techSkills.map((skill, i) => (
                    <span key={i} className="skill-tag" style={{
                      background: "rgba(167,139,250,0.08)", color: "#A78BFA",
                      border: "1px solid rgba(167,139,250,0.2)",
                      padding: "7px 16px", borderRadius: "8px",
                      fontSize: "0.85rem", fontWeight: 600,
                      transition: "all 0.2s", cursor: "default",
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </SectionCard>
            )}


          </div>

          {/* ── RIGHT: Sidebar ── */}
          <div className="job-sidebar" style={{ width: "320px", flexShrink: 0, position: "sticky", top: "100px" }}>
            {/* Job Overview Card */}
            <div style={{
              background: "linear-gradient(160deg, rgba(15,36,54,0.95) 0%, rgba(12,26,40,0.98) 100%)",
              border: "1px solid rgba(34,56,75,0.8)",
              borderRadius: "20px",
              overflow: "hidden",
              backdropFilter: "blur(16px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}>
              {/* Card header */}
              <div style={{
                background: "linear-gradient(135deg, rgba(92,201,214,0.1) 0%, rgba(15,36,54,0.5) 100%)",
                borderBottom: "1px solid rgba(34,56,75,0.6)",
                padding: "20px 24px",
              }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5CC9D6", margin: "0 0 4px" }}>Job Overview</p>
                <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", margin: 0 }}>{job.title}</p>
              </div>

              {/* Overview rows */}
              <div style={{ padding: "8px 24px 8px" }}>
                <OverviewRow icon={<BuildingIcon />} label="Department" value={job.department} />
                {job.team && <OverviewRow icon={<UsersIcon />} label="Team" value={job.team} />}
                <OverviewRow icon={<MonitorIcon />} label="Work Mode" value={job.work_mode} />
                <OverviewRow icon={<BriefcaseIcon />} label="Job Type" value={job.employment_type} />
                {job.experience_level && <OverviewRow icon={<StarIcon />} label="Experience Level" value={job.experience_level} />}
                {(!job.hide_salary && job.min_salary) && (
                  <OverviewRow
                    icon={<DollarSignIcon />}
                    label="Compensation"
                    value={`${formatSalary(job.min_salary)}${job.max_salary ? ` – ${formatSalary(job.max_salary)}` : ""} / ${job.salary_type || "yr"}`}
                    valueColor="#22C55E"
                  />
                )}
                {job.expected_joining_date && (
                  <OverviewRow
                    icon={<CalendarIcon />}
                    label="Expected Joining"
                    value={new Date(job.expected_joining_date).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                  />
                )}
              </div>



              {/* Share section */}
              <div style={{ padding: "20px 24px 24px", borderTop: "1px solid rgba(34,56,75,0.4)", marginTop: "20px" }}>
                <p style={{ fontSize: "0.8rem", color: "#475569", marginBottom: "10px", textAlign: "center" }}>Know someone great for this role?</p>
                <button onClick={handleCopy} className="copy-btn" style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  background: "rgba(34,56,75,0.4)", border: "1px solid rgba(34,56,75,0.8)",
                  color: copied ? "#22C55E" : "#94A3B8",
                  padding: "11px 16px", borderRadius: "10px",
                  fontWeight: 600, fontSize: "0.85rem", cursor: "pointer",
                  transition: "all 0.2s",
                }}>
                  <LinkIcon />
                  {copied ? "Link Copied!" : "Copy Job Link"}
                </button>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
