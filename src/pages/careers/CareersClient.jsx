"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  IconWeb, IconAI, IconDesign, IconCloud, IconBlockchain,
  IconSearch, IconHandshake, IconTools, IconBrain, IconScale, IconStartup
} from "@/components/Icons";

/* ─── DATA ─── */
const DEPTS = ["All Departments", "Engineering", "AI & Research", "Design", "Product", "Sales & Growth", "Marketing"];
const TYPES = ["All Types", "Full-time", "Part-time", "Contract", "Internship"];
const LOCATIONS = ["All Locations", "Remote", "Hybrid", "On-site"];

const typeClass = {
  "Full-time": "status-dev",
  "Part-time": "status-research",
  "Contract": "status-planned",
  "Internship": "status-soon",
  "Remote": "status-soon",
};

/* Each department gets its own icon + accent so the list reads as a
   categorized board at a glance, not a flat stack of identical rows. */
const DEPT_ICON = {
  "Engineering": IconWeb,
  "AI & Research": IconAI,
  "Design": IconDesign,
  "Product": IconStartup,
  "Sales & Growth": IconHandshake,
  "Marketing": IconSearch,
};
const DEPT_ACCENT = {
  "Engineering": "#2DD4BF",
  "AI & Research": "#A78BFA",
  "Design": "#FB923C",
  "Product": "#38BDF8",
  "Sales & Growth": "#F472B6",
  "Marketing": "#FBBF24",
};
const deptIcon = (d) => DEPT_ICON[d] || IconTools;
const deptAccent = (d) => DEPT_ACCENT[d] || "#2DD4BF";
const tint = (hex, alpha) => `${hex}${alpha}`; // e.g. tint('#2DD4BF','22')

/* ─── LOCAL ICONS ─── */
const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7, flexShrink: 0 }}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
const ChevronIcon = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}><polyline points="6 9 12 15 18 9" /></svg>
);
const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
);
const EmptyIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /><path d="M10 12v2h4v-2" /></svg>
);
const FilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
);

const extractListItems = (html) => {
  if (!html) return [];
  const cleaned = html.replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\\n/g, '\n')
    .trim();
  return cleaned.split('\n').map(s => s.trim()).filter(Boolean).map(l => l.replace(/^[-•*►▶]\s*/, ""));
};

const timeAgo = (dateStr) => {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function CareersClient({ initialJobs = [] }) {
  const [jobs] = useState(initialJobs);
  const [loading] = useState(false);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All Departments");
  const [type, setType] = useState("All Types");
  const [loc, setLoc] = useState("All Locations");
  const [quickViewJob, setQuickViewJob] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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

  return (
    <>
      <style>{`
        .filters-bar {
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 18px;
          margin-bottom: 28px;
        }
        .filter-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; align-items: flex-end; }
        @media (max-width: 1024px) { .filter-grid { grid-template-columns: 1fr 1fr; } }
        
        .mobile-filter-toggle { display: none; }
        .filter-dropdowns { display: contents; }
        .search-row { display: contents; }
        
        @media (max-width: 600px) { 
          .filter-grid { grid-template-columns: 1fr 1fr; gap: 12px; } 
          .filter-grid > div:first-child, .filter-grid > button { grid-column: 1 / -1; }
          
          .search-row { display: flex; gap: 10px; grid-column: 1 / -1; align-items: flex-end; }
          .search-row > div { flex: 1; }
          
          .mobile-filter-toggle { display: flex; align-items: center; justify-content: center; background: transparent; border: 1px solid var(--border-subtle); border-radius: 8px; width: 40px; height: 40px; color: var(--text-muted); flex-shrink: 0; cursor: pointer; transition: all 0.2s; }
          .mobile-filter-toggle.active { background: color-mix(in srgb, var(--teal) 15%, transparent); border-color: var(--teal); color: var(--teal); }
          
          .filter-dropdowns { display: none; }
          .filter-dropdowns.show { display: contents; }
        }

        .search-input, .filter-select {
          background: transparent; border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 8px; color: var(--text); padding: 10px 14px; width: 100%; outline: none;
          font-size: 14px; transition: border-color 0.2s;
        }
        .filter-select { padding-right: 36px; appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237F93A3' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; }
        .filter-select:focus, .search-input:focus { border-color: var(--teal); }

        .job-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 16px; }

        .job-card {
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          border-left: 3px solid var(--dept-accent, var(--teal));
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
        }
        .job-card:hover {
          border-color: color-mix(in srgb, var(--dept-accent, var(--teal)) 55%, var(--border-subtle));
          transform: translateY(-2px);
          box-shadow: 0 8px 24px -8px rgba(0,0,0,0.1);
        }

        .job-card-top { padding: 16px 20px; display: flex; gap: 16px; align-items: flex-start; }
        .dept-badge {
          width: 42px; height: 42px; border-radius: 10px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--dept-tint); color: var(--dept-accent);
        }
        .job-main { flex: 1; min-width: 0; }
        .job-title-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .job-title { font-family: var(--font-display); font-size: 19px; font-weight: 700; color: var(--text); text-decoration: none; line-height: 1.2; }
        .job-title:hover { color: var(--dept-accent, var(--teal)); }
        
        .job-badge { 
          display: inline-flex; align-items: center; gap: 6px; 
          padding: 3px 8px; border-radius: 100px; font-size: 10.5px; font-weight: 700; 
          letter-spacing: 0.5px; text-transform: uppercase; margin: 0; 
        }
        .urgent-dot { width: 6px; height: 6px; border-radius: 50%; background: #FB7185; }
        @media (prefers-reduced-motion: no-preference) {
          .urgent-dot { animation: pulse-dot 1.8s ease-in-out infinite; }
        }
        @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        .job-meta-row { display: flex; flex-wrap: wrap; gap: 8px 16px; margin-top: 10px; }
        .job-meta-item { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-muted); }

        .skill-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
        .skill-pill { font-size: 11.5px; font-weight: 500; color: var(--text); background: var(--bg); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 4px 10px; }
        .skill-pill.more { color: var(--dept-accent); border-color: transparent; background: var(--dept-tint); }

        .job-side { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex-shrink: 0; }
        .job-side .job-badge { margin-top: 0; padding: 4px 10px; font-size: 11px; text-transform: capitalize; letter-spacing: 0; }
        .quick-view-modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
          z-index: 100; display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .quick-view-modal-content {
          background: var(--surface); border-radius: 16px; border: 1px solid var(--border-subtle);
          width: 100%; max-width: 600px; max-height: 85vh; overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          position: relative; padding: 32px;
          animation: modal-enter 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes modal-enter { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .modal-close-btn { position: absolute; top: 20px; right: 20px; background: transparent; border: none; cursor: pointer; color: var(--text-muted); padding: 8px; border-radius: 50%; transition: background 0.2s; display: flex; align-items: center; justify-content: center; }
        .modal-close-btn:hover { background: var(--bg); color: var(--text); }
        
        .detail-col ul { list-style: none; padding: 0; margin: 10px 0 0; font-size: 14px; color: var(--text-muted); display: flex; flex-direction: column; gap: 10px; line-height: 1.5; }
        .detail-col li { display: flex; gap: 8px; }
        .detail-col li::before { content: '→'; color: var(--dept-accent, var(--teal)); flex-shrink: 0; }
        .job-detail-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; margin-top: 24px; }

        .job-footer { margin-top: auto; padding: 12px 20px; background: var(--surface); border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
        .job-id { font-size: 11px; font-family: monospace; color: var(--text-muted); opacity: 0.6; }
        .quick-view-btn { display: inline-flex; align-items: center; gap: 6px; }
        .view-role-btn { display: inline-flex; align-items: center; gap: 6px; }

        .skeleton-card { background: var(--surface-bg); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 24px; height: 108px; }
        .skeleton-line { background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 37%, rgba(255,255,255,0.04) 63%); background-size: 400% 100%; border-radius: 6px; }
        @media (prefers-reduced-motion: no-preference) {
          .skeleton-line { animation: shimmer 1.6s ease infinite; }
        }
        @keyframes shimmer { 0% { background-position: 100% 50%; } 100% { background-position: 0 50%; } }

        .empty-state { text-align: center; padding: 64px 24px; background: var(--surface-bg); border-radius: 14px; border: 1px dashed var(--border-subtle); color: var(--text-muted); }
        .empty-state svg { margin: 0 auto 16px; opacity: 0.5; }

        .jobs-section { padding-top: 160px; }

        @media (max-width: 640px) {
          .jobs-section { padding-top: 100px; }
          .job-list { grid-template-columns: 1fr; gap: 12px; }
          
          .job-card { height: max-content; }
          .job-card-top { padding: 12px 14px; display: flex; flex-direction: column; gap: 8px; }
          .dept-badge { display: none; }
          .job-main { width: 100%; display: flex; flex-direction: column; gap: 6px; }
          
          .job-title-row { gap: 6px; }
          .job-title { font-size: 16px; }
          
          .job-meta-row { gap: 4px 10px; margin-top: 0; }
          .job-meta-item { font-size: 11.5px; }
          .job-meta-item svg { width: 12px; height: 12px; }
          
          .skill-pills { margin-top: 4px; gap: 5px; }
          .skill-pill { font-size: 10px; padding: 2px 6px; }
          
          .job-side { display: none; }
          .mobile-emp-type { display: inline-flex !important; }
          
          .job-footer { padding: 10px 14px; }
        }
      `}</style>

      {/* ===================== JOBS BOARD ===================== */}
      <section className="section alt jobs-section" id="openings">
        <div className="container">

          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--text)', margin: '0 0 12px 0', fontFamily: 'var(--font-display)' }}>Join the Auxosys Team</h1>
              <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>Explore our open positions and build the future with us.</p>
            </div>
            {/* Filters */}
            <div className="filters-bar">
              <div className="filter-grid">

                <div className="search-row">
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Search</div>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 12, top: 10, color: 'var(--text-muted)' }}><IconSearch style={{ width: 16, height: 16 }} /></span>
                      <input className="search-input" style={{ paddingLeft: 36, height: '40px' }} placeholder="Role, skill, or keyword…" value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                  </div>
                  <button className={`mobile-filter-toggle ${showMobileFilters ? 'active' : ''}`} onClick={() => setShowMobileFilters(!showMobileFilters)}>
                    <FilterIcon />
                  </button>
                </div>

                <div className={`filter-dropdowns ${showMobileFilters ? 'show' : ''}`}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Department</div>
                    <select className="filter-select" style={{ height: '40px' }} value={dept} onChange={e => setDept(e.target.value)}>
                      {DEPTS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Type</div>
                    <select className="filter-select" style={{ height: '40px' }} value={type} onChange={e => setType(e.target.value)}>
                      {TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Location</div>
                    <select className="filter-select" style={{ height: '40px' }} value={loc} onChange={e => setLoc(e.target.value)}>
                      {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
                {(activeFilters.length > 0 || search) && (
                  <button className="btn btn-secondary" style={{ padding: '9px 16px' }} onClick={clearAll}>Clear all</button>
                )}
              </div>

              {/* Active filter tags */}
              {activeFilters.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '14px' }}>
                  {activeFilters.map(f => (
                    <span key={f.label} onClick={f.clear} style={{ fontSize: '12px', background: 'var(--border-subtle)', color: 'white', padding: '4px 12px', borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {f.label} <span style={{ opacity: 0.5 }}>×</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Job cards */}
            {loading ? (
              <div className="job-list">
                {[0, 1, 2].map(i => (
                  <div key={i} className="skeleton-card">
                    <div className="skeleton-line" style={{ width: '40%', height: 18, marginBottom: 12 }} />
                    <div className="skeleton-line" style={{ width: '65%', height: 12 }} />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="empty-state">
                <EmptyIcon />
                <p style={{ fontSize: 15, color: 'var(--text)', marginBottom: 4 }}>No positions match your filters.</p>
                <p style={{ fontSize: 13 }}>Try widening your search, or clear filters to see every open role.</p>
                <button className="btn btn-secondary" style={{ marginTop: '18px' }} onClick={clearAll}>Clear filters</button>
              </div>
            ) : (
              <div className="job-list">
                {filtered.map(job => {
                  const accent = deptAccent(job.department);
                  const DeptIconCmp = deptIcon(job.department);
                  const skills = job.tech_skills || [];
                  const previewSkills = skills.slice(0, 4);
                  const extraSkills = skills.length - previewSkills.length;

                  return (
                    <div
                      className="job-card"
                      key={job.id}
                      style={{ '--dept-accent': accent, '--dept-tint': tint(accent, '1f') }}
                    >
                      <div className="job-card-top">
                        <div className="dept-badge">
                          <DeptIconCmp style={{ width: 20, height: 20 }} />
                        </div>

                        <div className="job-main">
                          <div className="job-title-row">
                            <Link href={`/careers/${job.slug || job.id}`} className="job-title">{job.title}</Link>
                            {job.featured && <span className="job-badge status-soon">FEATURED</span>}
                            {job.urgent && (
                              <span className="job-badge status-dev">
                                <span className="urgent-dot" /> URGENT
                              </span>
                            )}
                            <span className={`job-badge mobile-emp-type ${typeClass[job.employment_type] || "status-planned"}`} style={{ display: 'none' }}>
                              {job.employment_type}
                            </span>
                          </div>

                          <div className="job-meta-row">
                            <span className="job-meta-item">{job.department}</span>
                            <span className="job-meta-item"><MapPinIcon /> {job.work_mode}{job.city ? ` — ${job.city}` : ''}</span>
                            <span className="job-meta-item"><ClockIcon /> {timeAgo(job.createdAt || job.created_at)}</span>
                          </div>

                          {previewSkills.length > 0 && (
                            <div className="skill-pills">
                              {previewSkills.map(s => <span key={s} className="skill-pill">{s}</span>)}
                              {extraSkills > 0 && <span className="skill-pill more">+{extraSkills} more</span>}
                            </div>
                          )}
                        </div>

                        <div className="job-side">
                          <span className={`job-badge ${typeClass[job.employment_type] || "status-planned"}`}>{job.employment_type}</span>
                          <span className="job-id" style={{ marginRight: '4px' }}>{job.public_id || ('#' + job.id.substring(0, 8))}</span>
                        </div>
                      </div>

                      <div className="job-footer">
                        <button
                          className="btn btn-secondary quick-view-btn"
                          style={{ padding: '8px 16px' }}
                          onClick={() => setQuickViewJob(job)}
                        >
                          Quick view
                        </button>
                        <Link href={`/careers/${job.slug || job.id}`} className="btn btn-primary view-role-btn" style={{ padding: '8px 16px' }}>
                          View role <ArrowRightIcon />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div style={{ marginTop: '60px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <h2 style={{ fontSize: '1.1rem', margin: '0 0 8px 0', color: 'var(--text)' }}>Why join our team?</h2>
              <p>Don't see a role that fits? Email your resume to <a href="mailto:careers@auxosys.com" style={{ color: 'var(--teal)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>careers@auxosys.com</a>.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {quickViewJob && (
        <div className="quick-view-modal-overlay" onClick={() => setQuickViewJob(null)}>
          <div className="quick-view-modal-content" onClick={e => e.stopPropagation()} style={{ '--dept-accent': deptAccent(quickViewJob.department) }}>
            <button className="modal-close-btn" onClick={() => setQuickViewJob(null)}>
              <CloseIcon />
            </button>
            <div style={{ marginBottom: '16px' }}>
              <span className="eyebrow">{quickViewJob.department}</span>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text)', margin: '8px 0', fontFamily: 'var(--font-display)' }}>
                {quickViewJob.title}
              </h3>
              <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--text-muted)' }}>
                <span><MapPinIcon /> {quickViewJob.work_mode}{quickViewJob.city ? ` — ${quickViewJob.city}` : ''}</span>
                <span>{quickViewJob.employment_type}</span>
              </div>
            </div>

            <div className="job-detail-grid">
              <div className="detail-col">
                <p className="eyebrow">Requirements</p>
                <ul>
                  {extractListItems(quickViewJob.requirements).slice(0, 5).map((r, idx) => <li key={idx}>{r}</li>)}
                </ul>
              </div>
              <div className="detail-col">
                <p className="eyebrow">Responsibilities</p>
                <ul>
                  {extractListItems(quickViewJob.responsibilities).slice(0, 5).map((r, idx) => <li key={idx}>{r}</li>)}
                </ul>
              </div>
            </div>

            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn btn-secondary" onClick={() => setQuickViewJob(null)}>Close</button>
              <Link href={`/careers/${quickViewJob.slug || quickViewJob.id}`} className="btn btn-primary" onClick={() => setQuickViewJob(null)}>
                View full role <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}