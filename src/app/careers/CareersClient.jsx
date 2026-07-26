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
  "Full-time": "status-dev", // Reuse status tags from home-pro
  "Part-time": "status-research",
  "Contract": "status-planned",
  "Internship": "status-soon",
  "Remote": "status-soon",
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

  return (
    <>
      <style>{`
        /* Minimal specific styles for careers board not covered by home-pro */
        .search-input, .filter-select {
          background: var(--surface-bg); border: 1px solid var(--border-subtle);
          border-radius: 8px; color: white; padding: 10px 14px; width: 100%; outline: none;
        }
        .filter-select { padding-right: 36px; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237F93A3' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; }
        .filter-select:focus, .search-input:focus { border-color: var(--teal); }
        .job-card { background: var(--surface-bg); border: 1px solid var(--border-subtle); border-radius: 12px; margin-bottom: 12px; overflow: hidden; transition: all 0.2s; }
        .job-card:hover { border-color: var(--teal); }
        .job-card-top { padding: 24px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
        .job-title { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: white; margin-bottom: 8px; }
        .job-meta-item { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-muted); margin-right: 16px; }
        .job-detail { max-height: 0; overflow: hidden; transition: max-height 0.4s; border-top: 1px solid var(--border-subtle); }
        .job-detail.open { max-height: 800px; }
        .job-detail-inner { padding: 24px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; }
        .job-footer { padding: 16px 24px; background: rgba(0,0,0,0.2); display: flex; justify-content: space-between; align-items: center; }
      `}</style>

      {/* ===================== HERO ===================== */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>Join our mission to build <span className="accent">the future</span></h1>
            <span className="hero-highlight">Careers at Auxosys</span>
            <p className="desc">
              We are a team of passionate engineers, designers, and strategists. If you love solving complex problems with cutting-edge technology, we want you on our team.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== JOBS BOARD ===================== */}
      <section className="section alt" id="openings">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">Open Positions</div>
            <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              Find your role
              <span style={{ fontSize: '14px', background: 'var(--border-subtle)', padding: '4px 12px', borderRadius: '20px', color: 'var(--text-muted)' }}>
                {loading ? "..." : `${filtered.length} positions`}
              </span>
            </h2>
          </Reveal>

          <Reveal>
            {/* Filters */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'flex-end' }}>
              <div style={{ flex: 2, minWidth: '200px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Search</div>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 12, top: 10, color: 'var(--text-muted)' }}><IconSearch style={{ width: 16, height: 16 }} /></span>
                  <input className="search-input" style={{ paddingLeft: 36 }} placeholder="Role, skill, or keyword…" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
              </div>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Department</div>
                <select className="filter-select" value={dept} onChange={e => setDept(e.target.value)}>
                  {DEPTS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Type</div>
                <select className="filter-select" value={type} onChange={e => setType(e.target.value)}>
                  {TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Location</div>
                <select className="filter-select" value={loc} onChange={e => setLoc(e.target.value)}>
                  {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              {(activeFilters.length > 0 || search) && (
                <button className="btn btn-secondary" style={{ padding: '9px 16px' }} onClick={clearAll}>Clear all</button>
              )}
            </div>

            {/* Active filter tags */}
            {activeFilters.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {activeFilters.map(f => (
                  <span key={f.label} onClick={f.clear} style={{ fontSize: '12px', background: 'var(--border-subtle)', color: 'white', padding: '4px 12px', borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {f.label} <span style={{ opacity: 0.5 }}>×</span>
                  </span>
                ))}
              </div>
            )}

            {/* Job cards */}
            <div style={{ marginTop: '24px' }}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Loading positions...</div>
              ) : filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px', background: 'var(--surface-bg)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <IconSearch style={{ width: 48, height: 48, color: 'var(--text-muted)', margin: '0 auto 16px' }} />
                  <p style={{ color: 'var(--text-muted)' }}>No positions match your filters.</p>
                  <button className="btn btn-secondary" style={{ marginTop: '16px' }} onClick={clearAll}>Clear filters</button>
                </div>
              ) : filtered.map(job => (
                <div className="job-card" key={job.id}>
                  <div className="job-card-top">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Link href={`/careers/${job.slug || job.id}`} className="job-title">{job.title}</Link>
                        {job.featured && <span className="status-tag status-soon" style={{ padding: '2px 8px', fontSize: '10px' }}>FEATURED</span>}
                        {job.urgent && <span className="status-tag status-dev" style={{ padding: '2px 8px', fontSize: '10px' }}>URGENT</span>}
                      </div>
                      <div style={{ marginTop: '8px' }}>
                        <span className="job-meta-item"><BuildingIcon /> {job.department}</span>
                        <span className="job-meta-item"><MapPinIcon /> {job.work_mode} {job.city ? `- ${job.city}` : ''}</span>
                        <span className="job-meta-item"><ClockIcon /> {new Date(job.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                    <div>
                      <span className={`status-tag ${typeClass[job.employment_type] || "status-planned"}`}>{job.employment_type}</span>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  <div className={`job-detail${expanded === job.id ? " open" : ""}`}>
                    <div className="job-detail-inner">
                      <div>
                        <p className="eyebrow">Requirements</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {extractListItems(job.requirements).slice(0, 4).map((r, idx) => <li key={idx}>→ {r.replace(/^- /, '')}</li>)}
                        </ul>
                      </div>
                      <div>
                        <p className="eyebrow">Responsibilities</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {extractListItems(job.responsibilities).slice(0, 4).map((r, idx) => <li key={idx}>→ {r.replace(/^- /, '')}</li>)}
                        </ul>
                      </div>
                      <div>
                        <p className="eyebrow">Skills & Tools</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {(job.tech_skills || []).map(s => (
                            <span key={s} style={{ fontSize: 12, background: "var(--border-subtle)", borderRadius: 6, padding: "4px 10px", fontWeight: 500 }}>{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="job-footer">
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>ID: {job.id.substring(0, 8)}</span>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button className="btn btn-secondary" style={{ padding: '8px 16px' }} onClick={() => setExpanded(expanded === job.id ? null : job.id)}>
                        {expanded === job.id ? "Hide Details" : "Quick View"}
                      </button>
                      <Link href={`/careers/${job.slug || job.id}`} className="btn btn-primary" style={{ padding: '8px 16px' }}>
                        Full Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="section home-cta" id="contact">
        <div className="container">
          <Reveal className="cta-banner">
            <div className="cta-content">
              <h2>Success is measured by the value we create — not just the software we ship.</h2>
              <p>At Auxosys, we build for the long term — for our clients, our community, and the future of technology.</p>
            </div>
            <div className="cta-actions">
              <a href="/contact" className="btn btn-primary">Let's Build Together</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}