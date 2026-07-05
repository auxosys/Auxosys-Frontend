"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  IconWeb, IconAI, IconDesign, IconCloud, IconBlockchain,
  IconSearch, IconHandshake, IconTools, IconBrain, IconScale, IconStartup
} from "@/components/Icons";

/* ─── TOKENS ─── */

/* ─── CSS ─── */
const CSS = `

/* ── Layout ── */
.container { max-width: 1200px; margin: 0 auto; padding: 0 40px; }

/* ── Typography ── */
.eyebrow {
  font-size: 12px; font-weight: 700; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--teal); margin-bottom: 16px;
}
.syne { font-family: var(--font-display); }

@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }

.btn-primary {
  display: inline-block;
  background: var(--orange); color: var(--white);
  border: none; border-radius: 8px;
  padding: 13px 28px; font-size: 15px; font-weight: 600;
  cursor: pointer; transition: all 0.2s; text-decoration: none;
}
.btn-primary:hover { background: var(--orange-hover); transform: translateY(-1px); }
.btn-outline {
  display: inline-block;
  background: transparent; color: var(--white);
  border: 1px solid var(--border); border-radius: 8px;
  padding: 13px 28px; font-size: 15px; font-weight: 500;
  cursor: pointer; transition: all 0.2s; text-decoration: none;
}
.btn-outline:hover { border-color: var(--teal); transform: translateY(-1px); }





/* ════════════════════════════════════
   JOB LISTINGS
════════════════════════════════════ */
.jobs-section {
  padding: 160px 0 100px 0;
  background: var(--bg-1);
  border-bottom: 1px solid var(--divider);
}
.jobs-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 48px;
  gap: 20px;
  flex-wrap: wrap;
}
.jobs-title {
  font-family: var(--font-display);
  font-size: clamp(28px, 3vw, 44px);
  font-weight: 700; letter-spacing: -0.02em;
}
.jobs-count {
  font-size: 14px; color: var(--muted);
  background: rgba(92,201,214,0.08);
  border: 1px solid rgba(92,201,214,0.2);
  border-radius: 999px; padding: 6px 16px;
  white-space: nowrap;
}

/* ── Filters ── */
.filters-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 40px;
  align-items: center;
}
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 160px;
}
.filter-label {
  font-size: 11px; font-weight: 600;
  color: var(--muted); letter-spacing: 0.1em;
  text-transform: uppercase; margin-bottom: 2px;
}
.filter-select {
  background: var(--bg-0);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--white);
  font-size: 14px;
  font-family: var(--font-body);
  padding: 10px 14px;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237F93A3' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
  transition: border-color 0.2s;
}
.filter-select:focus { outline: none; border-color: var(--teal); }
.filter-select option { background: var(--bg-1); }

.search-wrap {
  flex: 2; min-width: 200px;
  display: flex; flex-direction: column; gap: 4px;
}
.search-box {
  position: relative;
}
.search-input {
  width: 100%;
  background: var(--bg-0);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--white);
  font-size: 14px;
  font-family: var(--font-body);
  padding: 10px 14px 10px 40px;
  transition: border-color 0.2s;
}
.search-input::placeholder { color: var(--muted); }
.search-input:focus { outline: none; border-color: var(--teal); }
.search-ico {
  position: absolute; left: 13px; top: 50%;
  transform: translateY(-50%);
  font-size: 16px; color: var(--muted);
  pointer-events: none;
}

.clear-btn {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--muted);
  font-size: 13px; font-weight: 500;
  padding: 10px 18px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  align-self: flex-end;
}
.clear-btn:hover { border-color: var(--teal); color: var(--white); }

/* active filter tags */
.active-filters {
  display: flex; gap: 8px; flex-wrap: wrap;
  margin-bottom: 28px;
}
.filter-tag {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(92,201,214,0.1);
  border: 1px solid rgba(92,201,214,0.25);
  border-radius: 999px;
  padding: 5px 14px;
  font-size: 12px; font-weight: 600; color: var(--teal);
  cursor: pointer;
  transition: background 0.15s;
}
.filter-tag:hover { background: rgba(92,201,214,0.18); }
.filter-tag .x { font-size: 14px; opacity: 0.7; }

/* ── Job Cards ── */
.jobs-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.job-card {
  background: var(--bg-0);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 0;
  overflow: hidden;
  transition: border-color 0.25s;
  cursor: default;
}
.job-card:hover { border-color: rgba(92,201,214,0.35); }

.job-card-top {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  align-items: start;
  padding: 28px 32px;
}
.job-left { display: flex; gap: 18px; align-items: flex-start; }
.job-dept-icon {
  width: 48px; height: 48px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; flex-shrink: 0;
  margin-top: 2px;
}
.job-title {
  font-family: var(--font-display);
  font-size: 19px; font-weight: 700;
  color: var(--white); margin-bottom: 8px;
  letter-spacing: -0.01em;
}
.job-meta {
  display: flex; gap: 16px; flex-wrap: wrap; align-items: center;
}
.job-meta-item {
  display: flex; align-items: center; gap: 5px;
  font-size: 13px; color: var(--muted);
}
.job-meta-item .ico { font-size: 13px; }

.job-right {
  display: flex; flex-direction: column;
  align-items: flex-end; gap: 12px;
}
.job-type-badge {
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.06em; text-transform: uppercase;
  border-radius: 999px; padding: 5px 14px;
}
.type-fulltime { background: rgba(92,201,214,0.12); color: var(--teal); border: 1px solid rgba(92,201,214,0.25); }
.type-parttime { background: rgba(245,158,11,0.12); color: #F59E0B; border: 1px solid rgba(245,158,11,0.25); }
.type-internship { background: rgba(255,107,53,0.12); color: var(--orange); border: 1px solid rgba(255,107,53,0.25); }
.type-contract { background: rgba(59,130,246,0.12); color: #3B82F6; border: 1px solid rgba(59,130,246,0.25); }
.type-remote { background: rgba(34,197,94,0.12); color: #22C55E; border: 1px solid rgba(34,197,94,0.25); }

.job-new-badge {
  font-size: 10px; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  background: var(--orange); color: var(--white);
  border-radius: 4px; padding: 3px 8px;
}

/* expandable detail */
.job-detail {
  border-top: 1px solid var(--border);
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.4s ease;
}
.job-detail.open { max-height: 600px; }
.job-detail-inner {
  padding: 28px 32px 32px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
}
.detail-col-label {
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--teal); margin-bottom: 14px;
}
.detail-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.detail-list li {
  font-size: 14px; color: var(--gray);
  display: flex; align-items: flex-start; gap: 8px;
  line-height: 1.5;
}
.detail-list li::before { content: '→'; color: var(--teal); flex-shrink: 0; margin-top: 1px; font-size: 12px; }

.job-footer {
  padding: 0 32px 28px;
  display: flex; align-items: center;
  justify-content: space-between; gap: 16px;
  flex-wrap: wrap;
}
.job-posted { font-size: 12px; color: var(--muted); }
.job-actions { display: flex; gap: 10px; }
.btn-apply {
  background: var(--orange); color: var(--white);
  border: none; border-radius: 7px;
  padding: 10px 22px; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all 0.2s;
}
.btn-apply:hover { background: var(--orange-hover); transform: translateY(-1px); }
.btn-expand {
  background: transparent; color: var(--muted);
  border: 1px solid var(--border); border-radius: 7px;
  padding: 10px 18px; font-size: 14px; font-weight: 500;
  cursor: pointer; transition: all 0.2s;
  display: flex; align-items: center; gap: 6px;
}
.btn-expand:hover { border-color: var(--teal); color: var(--white); }
.expand-arrow { transition: transform 0.3s; display: inline-block; }
.expand-arrow.open { transform: rotate(180deg); }

/* no results */
.no-results {
  text-align: center; padding: 80px 24px;
  color: var(--muted); font-size: 16px;
}
.no-results-icon { font-size: 48px; margin-bottom: 16px; display: flex; justify-content: center; }



/* ════════════════════════════════════
   APPLICATION MODAL
════════════════════════════════════ */
.modal-overlay {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(8,24,38,0.88);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
  backdrop-filter: blur(6px);
}
.modal {
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: 20px;
  width: 100%; max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}
.modal-header {
  padding: 32px 36px 24px;
  border-bottom: 1px solid var(--divider);
  position: sticky; top: 0; background: var(--bg-1); z-index: 1;
}
.modal-title { font-family: var(--font-display); font-size: 22px; font-weight: 700; margin-bottom: 4px; }
.modal-sub { font-size: 14px; color: var(--muted); }
.modal-close {
  position: absolute; top: 28px; right: 28px;
  background: var(--bg-0); border: 1px solid var(--border);
  border-radius: 8px; width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: var(--muted); font-size: 18px;
  transition: all 0.2s;
}
.modal-close:hover { border-color: var(--teal); color: var(--white); }
.modal-body { padding: 28px 36px 36px; display: flex; flex-direction: column; gap: 20px; }
.form-group { display: flex; flex-direction: column; gap: 7px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-label { font-size: 13px; font-weight: 600; color: var(--white); }
.form-input, .form-textarea, .form-select-modal {
  background: var(--bg-0);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--white);
  font-size: 14px;
  font-family: var(--font-body);
  padding: 11px 14px;
  transition: border-color 0.2s;
  width: 100%;
}
.form-input:focus, .form-textarea:focus, .form-select-modal:focus {
  outline: none; border-color: var(--teal);
}
.form-input::placeholder, .form-textarea::placeholder { color: var(--muted); }
.form-textarea { resize: vertical; min-height: 100px; }
.upload-zone {
  border: 1.5px dashed var(--border);
  border-radius: 10px; padding: 28px;
  text-align: center; cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}
.upload-zone:hover { border-color: var(--teal); background: rgba(92,201,214,0.04); }
.upload-icon { font-size: 28px; margin-bottom: 10px; display: block; }
.upload-text { font-size: 14px; font-weight: 500; color: var(--gray); margin-bottom: 4px; }
.upload-hint { font-size: 12px; color: var(--muted); }
.form-submit {
  background: var(--orange); color: var(--white);
  border: none; border-radius: 8px;
  padding: 14px; font-size: 15px; font-weight: 600;
  cursor: pointer; transition: all 0.2s; width: 100%;
}
.form-submit:hover { background: var(--orange-hover); transform: translateY(-1px); }
.modal-note { font-size: 12px; color: var(--muted); text-align: center; line-height: 1.65; }

/* ════════════════════════════════════
   RESPONSIVE
════════════════════════════════════ */
@media (max-width: 1000px) {
  .hero-inner, .culture-grid { grid-template-columns: 1fr; gap: 48px; }
  .hero-right { display: none; }
  .benefit-mosaic { grid-template-columns: 1fr 1fr; }
  .benefit-tile.wide { grid-column: span 2; }
  .intern-grid { grid-template-columns: 1fr; }
  .stats-inner { grid-template-columns: repeat(2, 1fr); }
  .job-detail-inner { grid-template-columns: 1fr 1fr; }
  .form-row { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .container { padding: 0 20px; }
  .careers-hero, .culture-section, .intern-section, .cta-section { padding: 64px 0; }
  .jobs-section { padding: 120px 0 64px 0; }
  .benefit-mosaic { grid-template-columns: 1fr; }
  .benefit-tile.wide { grid-column: span 1; }
  .stats-inner { grid-template-columns: 1fr 1fr; }
  .job-card-top { grid-template-columns: 1fr; }
  .job-right { flex-direction: row; align-items: center; }
  .job-detail-inner { grid-template-columns: 1fr; }
  .modal-body, .modal-header { padding-left: 20px; padding-right: 20px; }
  .cta-box { padding: 48px 24px; }
  .jobs-header { flex-direction: column; align-items: flex-start; }
}
`;

/* ─── DATA ─── */
/* ─── DATA ─── */
const DEPTS = ["All Departments", "Engineering", "AI & Research", "Design", "Product", "Sales & Growth", "Marketing"];
const TYPES = ["All Types", "Full-time", "Part-time", "Contract", "Internship"];
const LOCATIONS = ["All Locations", "Remote", "Hybrid", "On-site"];

const typeClass = {
  "Full-time": "type-fulltime",
  "Part-time": "type-parttime",
  "Contract": "type-contract",
  "Internship": "type-internship",
  "Remote": "type-remote",
};

/* ─── HELPERS ─── */
const BuildingIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
);
const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

const extractListItems = (html) => {
  if (!html) return [];
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  const items = [];
  let match;
  while ((match = liRegex.exec(html)) !== null) {
    items.push(match[1].replace(/<[^>]+>/g, '').trim());
  }
  if (items.length > 0) return items;
  // fallback for non-list html
  const cleaned = html.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ');
  return cleaned.split('\n').map(s => s.trim()).filter(Boolean);
};

/* ─── COMPONENT ─── */
export default function CareersClient({ initialJobs = [] }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All Departments");
  const [type, setType] = useState("All Types");
  const [loc, setLoc] = useState("All Locations");
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => {
    return jobs.filter(j => {
      const q = search.toLowerCase();
      const matchSearch = !q || j.title?.toLowerCase().includes(q) || j.department?.toLowerCase().includes(q) || (j.tech_skills || []).some(s => s.toLowerCase().includes(q));
      const matchDept = dept === "All Departments" || j.department === dept;
      const matchType = type === "All Types" || j.employment_type === type;
      const matchLoc = loc === "All Locations" || j.work_mode === loc;
      return matchSearch && matchDept && matchType && matchLoc;
    });
  }, [search, dept, type, loc, jobs]);

  const activeFilters = [
    dept !== "All Departments" && { label: dept, clear: () => setDept("All Departments") },
    type !== "All Types" && { label: type, clear: () => setType("All Types") },
    loc !== "All Locations" && { label: loc, clear: () => setLoc("All Locations") },
  ].filter(Boolean);

  const clearAll = () => { setSearch(""); setDept("All Departments"); setType("All Types"); setLoc("All Locations"); };

  const handleApply = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setApplyJob(null); setSubmitted(false); }, 2200);
  };

  return (
    <>
      <style>{CSS}</style>

      {/* ── JOB LISTINGS ── */}
      <section className="jobs-section" id="jobs">
        <div className="container">
          <div className="jobs-header">
            <div>
              {/* Open Positions removed */}
              <h2 className="jobs-title">Find your role at Auxosys</h2>
            </div>
            <span className="jobs-count">{loading ? "..." : `${filtered.length} of ${jobs.length} positions`}</span>
          </div>

          {/* Filters */}
          <div className="filters-row">
            <div className="search-wrap">
              <div className="filter-label">Search</div>
              <div className="search-box">
                <span className="search-ico"><IconSearch style={{width: 16, height: 16}} /></span>
                <input
                  className="search-input"
                  placeholder="Role, skill, or keyword…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="filter-group">
              <div className="filter-label">Department</div>
              <select className="filter-select" value={dept} onChange={e => setDept(e.target.value)}>
                {DEPTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <div className="filter-label">Job Type</div>
              <select className="filter-select" value={type} onChange={e => setType(e.target.value)}>
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <div className="filter-label">Location</div>
              <select className="filter-select" value={loc} onChange={e => setLoc(e.target.value)}>
                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            {(activeFilters.length > 0 || search) && (
              <button className="clear-btn" onClick={clearAll} style={{ marginTop: "24px" }}>Clear all</button>
            )}
          </div>

          {/* Active filter tags */}
          {activeFilters.length > 0 && (
            <div className="active-filters">
              {activeFilters.map(f => (
                <span className="filter-tag" key={f.label} onClick={f.clear}>
                  {f.label} <span className="x">×</span>
                </span>
              ))}
            </div>
          )}

          {/* Job cards */}
          <div className="jobs-grid">
            {loading ? (
              <div className="no-results"><p>Loading positions...</p></div>
            ) : filtered.length === 0 ? (
              <div className="no-results">
                <span className="no-results-icon"><IconSearch style={{width: 48, height: 48}} /></span>
                <p>No positions match your filters.</p>
                <button className="clear-btn" style={{ marginTop: 20 }} onClick={clearAll}>Clear filters</button>
              </div>
            ) : filtered.map(job => (
              <div className="job-card" key={job.id}>
                <div className="job-card-top">
                  <div className="job-left">

                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                        <Link href={`/careers/${job.slug || job.id}`} className="job-title hover:text-teal-400 transition-colors">{job.title}</Link>
                        {job.featured && <span className="job-new-badge" style={{background: 'var(--teal)'}}>FEATURED</span>}
                        {job.urgent && <span className="job-new-badge">URGENT</span>}
                      </div>
                      <div className="job-meta">
                        <span className="job-meta-item"><span className="ico" style={{ display: "flex", alignItems: "center" }}><BuildingIcon /></span>{job.department}</span>
                        <span className="job-meta-item"><span className="ico" style={{ display: "flex", alignItems: "center" }}><MapPinIcon /></span>{job.work_mode} {job.city ? `- ${job.city}` : ''}</span>
                        <span className="job-meta-item"><span className="ico" style={{ display: "flex", alignItems: "center" }}><ClockIcon /></span>{new Date(job.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                  <div className="job-right">
                    <span className={`job-type-badge ${typeClass[job.employment_type] || "type-fulltime"}`}>{job.employment_type}</span>
                  </div>
                </div>

                {/* Expanded detail */}
                <div className={`job-detail${expanded === job.id ? " open" : ""}`}>
                  <div className="job-detail-inner">
                    <div>
                      <p className="detail-col-label">Requirements</p>
                      <ul className="detail-list">
                        {extractListItems(job.requirements).slice(0, 4).map((r, idx) => <li key={idx}>{r.replace(/^- /, '')}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="detail-col-label">Responsibilities</p>
                      <ul className="detail-list">
                        {extractListItems(job.responsibilities).slice(0, 4).map((r, idx) => <li key={idx}>{r.replace(/^- /, '')}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="detail-col-label">Skills & Tools</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 }}>
                        {(job.tech_skills || []).map(s => (
                          <span key={s} style={{ fontSize: 12, color: "var(--teal)", background: "rgba(92,201,214,0.1)", border: "1px solid rgba(92,201,214,0.2)", borderRadius: 6, padding: "4px 12px", fontWeight: 500 }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="job-footer">
                  <span className="job-posted">Posted on {new Date(job.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <div className="job-actions">
                    <button
                      className="btn-expand"
                      onClick={() => setExpanded(expanded === job.id ? null : job.id)}
                    >
                      {expanded === job.id ? "Hide Details" : "Quick View"}
                      <span className={`expand-arrow${expanded === job.id ? " open" : ""}`}>⌄</span>
                    </button>
                    <Link href={`/careers/${job.slug || job.id}`} className="btn-expand border-teal-500 text-teal-400 hover:bg-teal-500/10">
                      Full Details
                    </Link>
                    <Link href={`/careers/${job.slug || job.id}/apply`} className="btn-apply text-center">
                      Apply Now →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL REMOVED (now a dedicated page) */}
    </>
  );
}