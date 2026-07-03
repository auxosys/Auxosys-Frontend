"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

// ─── Design Tokens ─────────
const T = {
  bg0: "#081826",
  bg1: "#0F2436",
  bg2: "#132A3A",
  hover: "#22384B",
  border: "#22384B",
  div: "#2E4154",
  teal: "#5CC9D6",
  orange: "#FF6B35",
  orangeH: "#FF824D",
  white: "#F8FAFC",
  gray: "#AEB8C2",
  muted: "#7F93A3",
};

// ─── Reusable primitives ──────────────────────────────────────────────────────

function SectionCard({ children, style }) {
  return (
    <div style={{
      background: T.bg1,
      border: `1px solid ${T.border}`,
      borderRadius: 20,
      padding: "36px 40px",
      boxShadow: "0 4px 32px rgba(0,0,0,0.35)",
      animation: "fadeIn 0.3s ease-out",
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionHeading({ icon, iconColor = T.teal, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
      <div style={{
        width: 40, height: 40,
        borderRadius: 10,
        background: T.bg0,
        border: `1px solid ${T.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: iconColor, flexShrink: 0,
      }}>
        {icon}
      </div>
      <h2 style={{ fontSize: 19, fontWeight: 700, color: T.white, margin: 0 }}>
        {children}
      </h2>
    </div>
  );
}

const inputBase = {
  width: "100%",
  background: T.bg0,
  border: `1px solid ${T.border}`,
  borderRadius: 12,
  padding: "13px 16px",
  fontSize: 14,
  color: T.white,
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

function Field({ label, required, children, error, hidden }) {
  if (hidden) return null;
  return (
    <div style={{ position: "relative", paddingBottom: error ? 20 : 0 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.gray, marginBottom: 7 }}>
        {label}{required && <span style={{ color: T.orange, marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {error && <span style={{ position: "absolute", bottom: 0, left: 0, fontSize: 11, color: T.orange }}>{error}</span>}
    </div>
  );
}

function Input({ name, value, onChange, type = "text", placeholder, required, style, error }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        borderColor: error ? T.orange : focused ? T.teal : T.border,
        boxShadow: focused ? `0 0 0 3px rgba(92,201,214,0.12)` : "none",
        ...style,
      }}
    />
  );
}

function Select({ name, value, onChange, children, error }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputBase,
          appearance: "none",
          cursor: "pointer",
          borderColor: error ? T.orange : focused ? T.teal : T.border,
          boxShadow: focused ? `0 0 0 3px rgba(92,201,214,0.12)` : "none",
        }}
      >
        {children}
      </select>
      <svg
        style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: T.muted }}
        width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

function Textarea({ name, value, onChange, rows = 4, placeholder, error }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        resize: "vertical",
        lineHeight: 1.6,
        borderColor: error ? T.orange : focused ? T.teal : T.border,
        boxShadow: focused ? `0 0 0 3px rgba(92,201,214,0.12)` : "none",
      }}
    />
  );
}

function UploadBox({ name, label, required, file, onChange, accept = ".pdf,.doc,.docx", error, hidden }) {
  const [hovered, setHovered] = useState(false);
  if (hidden) return null;
  return (
    <div style={{ position: "relative", paddingBottom: error ? 20 : 0 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.gray, marginBottom: 8 }}>
        {label}{required && <span style={{ color: T.orange, marginLeft: 3 }}>*</span>}
      </label>
      <label
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          height: 140,
          border: `2px dashed ${error ? T.orange : hovered ? T.teal : T.border}`,
          borderRadius: 14,
          background: hovered ? T.hover : T.bg0,
          cursor: "pointer",
          transition: "border-color 0.2s, background 0.2s",
        }}
      >
        <svg width={32} height={32} fill="none" stroke={hovered ? T.teal : T.muted} strokeWidth={1.5} viewBox="0 0 24 24" style={{ marginBottom: 10, transition: "stroke 0.2s" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <span style={{ fontSize: 13, color: T.white, fontWeight: 600 }}>Click to upload</span>
        <span style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>or drag and drop · PDF, DOC, DOCX</span>
        <input type="file" name={name} accept={accept} onChange={onChange} style={{ display: "none" }} />
      </label>
      {file && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, color: T.teal, fontSize: 13, fontWeight: 500 }}>
          <svg width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 260 }}>{file.name}</span>
        </div>
      )}
      {error && <span style={{ position: "absolute", bottom: 0, left: 0, fontSize: 11, color: T.orange }}>{error}</span>}
    </div>
  );
}

function CheckboxField({ name, checked, onChange, children, error }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ position: "relative", paddingBottom: error ? 20 : 0 }}>
      <label
        style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{
          flexShrink: 0, marginTop: 1,
          width: 20, height: 20,
          borderRadius: 6,
          border: `2px solid ${error ? T.orange : checked ? T.teal : T.border}`,
          background: checked ? T.teal : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.15s",
        }}>
          {checked && (
            <svg width={12} height={12} fill="none" stroke={T.bg0} strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
          <input type="checkbox" name={name} checked={checked} onChange={onChange} style={{ display: "none" }} />
        </div>
        <span style={{ fontSize: 13.5, color: hovered ? T.gray : T.muted, lineHeight: 1.6, transition: "color 0.15s" }}>
          {children}
        </span>
      </label>
      {error && <span style={{ position: "absolute", bottom: 0, left: 32, fontSize: 11, color: T.orange }}>{error}</span>}
    </div>
  );
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const Icons = {
  person: <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  attach: <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>,
  bag: <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  link: <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
  pen: <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  bldg: <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  pin: <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  back: <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
  arrow: <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>,
  spin: <svg style={{ animation: "spin 0.8s linear infinite" }} width={18} height={18} fill="none" viewBox="0 0 24 24"><circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path style={{ opacity: 0.8 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>,
  check: <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
  review: <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
};

// ─── Grid helper ─────────────────────────────────────────────────────────────
function Grid({ cols = 2, gap = 20, children, style, className }) {
  return (
    <div className={className} style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap,
      ...style,
    }}>
      {children}
    </div>
  );
}

function FullWidth({ children }) {
  return <div style={{ gridColumn: "1 / -1" }}>{children}</div>;
}

// ─── Step Indicator ──────────────────────────────────────────────────────────
function StepBar({ current, steps }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 36, overflowX: "auto", paddingBottom: 10 }}>
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={step.id}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: done ? T.teal : active ? T.orange : T.bg0,
                border: `2px solid ${done ? T.teal : active ? T.orange : T.border}`,
                fontSize: 12, fontWeight: 700,
                color: done || active ? T.bg0 : T.muted,
                transition: "all 0.3s",
                flexShrink: 0,
              }}>
                {done ? (
                  <svg width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                ) : i + 1}
              </div>
              <span className="step-label" style={{ fontSize: 10.5, color: active ? T.white : T.muted, fontWeight: active ? 600 : 400, whiteSpace: "nowrap" }}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, minWidth: 20, height: 2, background: i < current ? T.teal : T.border, marginBottom: 18, transition: "background 0.3s" }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function JobApplicationForm() {
  const { slug } = useParams();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [job, setJob] = useState(null);
  const [config, setConfig] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5002/job/${slug}`);
        const data = await res.json();
        if (data.success && data.data) {
          setJob(data.data);
          
          const defaultFields = {
            currentCTC: "optional", expectedCTC: "optional", noticePeriod: "required", 
            portfolio: "optional", github: "optional", linkedin: "optional"
          };
          
          const defaultConfig = data.data.application_form_config || {
            sections: { education: true, experience: true, certifications: true, projects: false },
            fields: defaultFields
          };
          
          setConfig(defaultConfig);
        }
      } catch (err) {
        console.error("Failed to fetch job", err);
        setJob({ title: "Open Position", department: "Engineering", location: "Remote" });
        setConfig({
          sections: { education: true, experience: true, certifications: true, projects: false },
          fields: { currentCTC: "optional", expectedCTC: "optional", noticePeriod: "required", portfolio: "optional", github: "optional", linkedin: "optional" }
        });
      }
    };
    fetchJob();

    // Load saved draft
    const saved = localStorage.getItem(`auxosys_draft_${slug}`);
    if (saved) {
      try {
        setForm(JSON.parse(saved));
      } catch (e) {}
    }
  }, [slug]);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", country: "",
    linkedin: "", github: "", portfolio: "",
    currentCompany: "", currentDesignation: "",
    currentCtc: "", expectedCtc: "", noticePeriod: "", experience: "", qualification: "",
    college: "", degree: "", stream: "", currentSemester: "", graduationYear: "", cgpa: "",
    internshipExperience: "", relevantSkills: "", skills: "", whyAuxosys: "", additionalNotes: "",
    consent: false, privacy: false,
  });

  const [files, setFiles] = useState({ resume: null, coverLetter: null });

  if (!job || !config) return (
    <div style={{ minHeight: "100vh", background: T.bg0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: T.teal, fontSize: 15, animation: "pulse 1.5s infinite" }}>Loading position…</div>
    </div>
  );

  const steps = [
    { id: "personal", label: "Personal" },
    { id: "documents", label: "Documents" },
    (config.sections.education || config.sections.experience) ? { id: "experience", label: "Experience" } : null,
    { id: "skills", label: "Skills" },
    { id: "review", label: "Review" },
    { id: "submit", label: "Submit" }
  ].filter(Boolean);

  const currentStepId = steps[currentStep]?.id;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newForm = { ...form, [name]: type === "checkbox" ? checked : value };
    setForm(newForm);
    
    if (type !== "checkbox" && name !== "consent" && name !== "privacy") {
      localStorage.setItem(`auxosys_draft_${slug}`, JSON.stringify(newForm));
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleFile = (e) => {
    const { name, files: f } = e.target;
    if (f.length > 0) {
      setFiles((p) => ({ ...p, [name]: f[0] }));
      if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const isReq = (field) => config.fields?.[field] === "required";
  const isHide = (field) => {
    if (field === "expectedCTC" && job?.salary_negotiable === false) return true;
    return config.fields?.[field] === "hidden";
  };

  const validateStep = (stepId) => {
    const newErrors = {};
    
    if (stepId === "personal") {
      if (!form.firstName.trim()) newErrors.firstName = "Required";
      if (!form.lastName.trim()) newErrors.lastName = "Required";
      if (!form.email.trim()) newErrors.email = "Required";
      else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Invalid format";
      if (!form.phone.trim()) newErrors.phone = "Required";
      if (!form.country.trim()) newErrors.country = "Required";
    }
    
    if (stepId === "documents") {
      if (!files.resume) newErrors.resume = "Resume is required";
      if (isReq('linkedin') && !form.linkedin.trim()) newErrors.linkedin = "Required";
      if (isReq('github') && !form.github.trim()) newErrors.github = "Required";
      if (isReq('portfolio') && !form.portfolio.trim()) newErrors.portfolio = "Required";
    }

    if (stepId === "experience") {
      const isInternship = config.jobCategory === "Internship";
      
      if (isInternship) {
        if (config.sections.education) {
          if (isReq('college') && !form.college.trim()) newErrors.college = "Required";
          if (isReq('degree') && !form.degree.trim()) newErrors.degree = "Required";
          if (isReq('stream') && !form.stream.trim()) newErrors.stream = "Required";
          if (isReq('currentSemester') && !form.currentSemester.trim()) newErrors.currentSemester = "Required";
          if (isReq('graduationYear') && !form.graduationYear.trim()) newErrors.graduationYear = "Required";
          if (isReq('cgpa') && !form.cgpa.trim()) newErrors.cgpa = "Required";
        }
        if (config.sections.experience) {
          if (isReq('internshipExperience') && !form.internshipExperience.trim()) newErrors.internshipExperience = "Required";
        }
      } else {
        if (config.sections.experience) {
          if (isReq('experience') && !form.experience) newErrors.experience = "Required";
          if (isReq('noticePeriod') && !form.noticePeriod) newErrors.noticePeriod = "Required";
          if (isReq('expectedCTC') && !isHide('expectedCTC') && !form.expectedCtc.trim()) newErrors.expectedCtc = "Required";
          if (isReq('currentCTC') && !form.currentCtc.trim()) newErrors.currentCtc = "Required";
          if (isReq('currentCompany') && !form.currentCompany.trim()) newErrors.currentCompany = "Required";
          if (isReq('currentDesignation') && !form.currentDesignation.trim()) newErrors.currentDesignation = "Required";
        }
        if (config.sections.education) {
          if (isReq('qualification') && !form.qualification) newErrors.qualification = "Required";
        }
      }
    }

    if (stepId === "skills") {
      if (config.jobCategory === "Internship") {
        if (isReq('relevantSkills') && !form.relevantSkills.trim()) newErrors.relevantSkills = "Required";
      } else {
        if (!form.skills.trim()) newErrors.skills = "Required";
      }
      if (!form.whyAuxosys.trim()) newErrors.whyAuxosys = "Required";
    }
    
    if (stepId === "submit") {
      if (!form.consent) newErrors.consent = "Required";
      if (!form.privacy) newErrors.privacy = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStepId)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep("submit")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5002/job/${slug}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      
      localStorage.removeItem(`auxosys_draft_${slug}`);
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: T.bg0, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
        <div style={{ textAlign: "center", maxWidth: 480, animation: "fadeIn 0.5s ease-out" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(92,201,214,0.12)", border: `2px solid ${T.teal}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width={34} height={34} fill="none" stroke={T.teal} strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: T.white, marginBottom: 14 }}>Application Submitted!</h1>
          <p style={{ color: T.gray, fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
            Thanks for applying for <strong style={{ color: T.teal }}>{job?.title}</strong>. We'll review your application and get back to you within 5–7 business days.
          </p>
          <Link href="/careers" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: T.orange, color: "#0a0a0a", fontWeight: 700,
            padding: "14px 28px", borderRadius: 12, fontSize: 15, textDecoration: "none",
            transition: "all 0.2s"
          }}>
            Back to Careers {Icons.arrow}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        * { box-sizing: border-box; }
        ::placeholder { color: ${T.muted}; opacity: 0.6; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${T.bg0}; }
        ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 3px; }
        select option { background: ${T.bg1}; color: ${T.white}; }
        
        .btn-nav {
          padding: 14px 24px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
          font-family: inherit;
        }
        .btn-prev {
          background: transparent;
          border: 1px solid ${T.border};
          color: ${T.white};
        }
        .btn-prev:hover {
          background: ${T.hover};
        }
        .btn-next {
          background: ${T.orange};
          border: 1px solid ${T.orange};
          color: #0a0a0a;
        }
        .btn-next:hover {
          background: ${T.orangeH};
          border-color: ${T.orangeH};
        }
        
        .review-row {
          display: flex;
          padding: 16px 0;
          border-bottom: 1px solid ${T.border};
        }
        .review-row:last-child {
          border-bottom: none;
        }
        .review-label {
          width: 200px;
          color: ${T.gray};
          font-size: 13px;
          font-weight: 600;
        }
        .review-value {
          flex: 1;
          color: ${T.white};
          font-size: 14px;
        }

        @media (max-width: 1024px) {
          .app-layout { flex-direction: column !important; }
          .sidebar { position: static !important; width: 100% !important; }
          .form-col { width: 100% !important; }
          .two-col { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .step-label { display: none; }
          .page-wrap { padding: 24px 16px !important; }
          .review-row { flex-direction: column; gap: 4px; padding: 12px 0; }
        }
      `}</style>

      <div
        style={{ minHeight: "100vh", background: T.bg0, color: T.white, fontFamily: "'Inter', -apple-system, sans-serif", paddingTop: 100 }}
      >
        <div className="page-wrap" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 80px" }}>

          <div style={{ marginBottom: 40 }}>
            <Link href={`/careers/${slug}`} style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              color: T.teal, fontSize: 13.5, fontWeight: 500, textDecoration: "none",
              marginBottom: 20,
              transition: "color 0.2s",
            }}>
              {Icons.back} Back to Job Details
            </Link>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
              <h1 style={{ fontSize: 34, fontWeight: 800, color: T.white, letterSpacing: "-0.02em", margin: 0 }}>
                Application Wizard
              </h1>
              <span style={{
                fontSize: 13, fontWeight: 600, color: T.orange,
                background: "rgba(255,107,53,0.1)", border: `1px solid rgba(255,107,53,0.25)`,
                padding: "4px 12px", borderRadius: 100,
              }}>
                {job.title}
              </span>
            </div>
          </div>

          <div className="app-layout" style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>

            {/* LEFT SIDEBAR */}
            <div className="sidebar" style={{ width: 300, flexShrink: 0, position: "sticky", top: 100 }}>
              <SectionCard style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", color: T.muted, textTransform: "uppercase", marginBottom: 8 }}>
                  Applying For
                </p>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: T.teal, margin: "0 0 20px" }}>
                  {job.title}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { icon: Icons.bldg, label: "Department", value: job.department },
                    { icon: Icons.pin, label: "Location", value: job.location },
                  ].map(({ icon, label, value }) => (
                    <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: T.bg0, border: `1px solid ${T.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: T.muted, flexShrink: 0,
                      }}>
                        {icon}
                      </div>
                      <div>
                        <p style={{ fontSize: 11, color: T.muted, fontWeight: 500, margin: "0 0 2px" }}>{label}</p>
                        <p style={{ fontSize: 13.5, color: T.white, fontWeight: 600, margin: 0 }}>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard style={{ background: "rgba(92,201,214,0.05)", borderColor: "rgba(92,201,214,0.2)" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: T.teal, marginBottom: 12 }}>✦ Application Tips</p>
                {[
                  "We auto-save your progress locally.",
                  "Upload a PDF resume for best results.",
                  "Double check your contact info.",
                  "Be specific in your 'Why Auxosys' answer.",
                ].map((tip) => (
                  <div key={tip} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                    <span style={{ color: T.teal, flexShrink: 0, marginTop: 2 }}>·</span>
                    <span style={{ fontSize: 12.5, color: T.gray, lineHeight: 1.55 }}>{tip}</span>
                  </div>
                ))}
              </SectionCard>
            </div>

            {/* RIGHT FORM COLUMN */}
            <div className="form-col" style={{ flex: 1, minWidth: 0 }}>
              <StepBar current={currentStep} steps={steps} />

              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                {currentStepId === "personal" && (
                  <SectionCard>
                    <SectionHeading icon={Icons.person} iconColor={T.teal}>Personal Information</SectionHeading>
                    <Grid cols={2} gap={20} className="two-col">
                      <Field label="First Name" required error={errors.firstName}>
                        <Input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Jane" error={errors.firstName} />
                      </Field>
                      <Field label="Last Name" required error={errors.lastName}>
                        <Input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" error={errors.lastName} />
                      </Field>
                      <Field label="Email Address" required error={errors.email}>
                        <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" error={errors.email} />
                      </Field>
                      <Field label="Phone Number" required error={errors.phone}>
                        <Input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" error={errors.phone} />
                      </Field>
                      <FullWidth>
                        <Field label="Country of Residence" required error={errors.country}>
                          <Input name="country" value={form.country} onChange={handleChange} placeholder="e.g. United States, India" error={errors.country} />
                        </Field>
                      </FullWidth>
                    </Grid>
                  </SectionCard>
                )}

                {currentStepId === "documents" && (
                  <SectionCard>
                    <SectionHeading icon={Icons.attach} iconColor={T.orange}>Résumé & Profiles</SectionHeading>
                    <Grid cols={2} gap={20} className="two-col">
                      <UploadBox name="resume" label="Résumé / CV (PDF)" required file={files.resume} onChange={handleFile} error={errors.resume} />
                      <UploadBox name="coverLetter" label="Cover Letter (Optional)" file={files.coverLetter} onChange={handleFile} />
                      
                      <Field label="LinkedIn Profile" required={isReq("linkedin")} hidden={isHide("linkedin")} error={errors.linkedin}>
                        <Input type="url" name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/username" error={errors.linkedin} />
                      </Field>
                      <Field label="GitHub Profile" required={isReq("github")} hidden={isHide("github")} error={errors.github}>
                        <Input type="url" name="github" value={form.github} onChange={handleChange} placeholder="https://github.com/username" error={errors.github} />
                      </Field>
                      <FullWidth>
                        <Field label="Personal Website / Portfolio" required={isReq("portfolio")} hidden={isHide("portfolio")} error={errors.portfolio}>
                          <Input type="url" name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="https://yourwebsite.com" error={errors.portfolio} />
                        </Field>
                      </FullWidth>
                    </Grid>
                  </SectionCard>
                )}

                {currentStepId === "experience" && (
                  <SectionCard>
                    <SectionHeading icon={Icons.bag} iconColor={T.teal}>Experience & Qualifications</SectionHeading>
                    <Grid cols={2} gap={20} className="two-col">
                      
                      {config.jobCategory === "Internship" ? (
                        <>
                          {/* Internship Fields */}
                          {config.sections.education && (
                            <>
                              <Field label="College / University" required={isReq("college")} hidden={isHide("college")} error={errors.college}>
                                <Input name="college" value={form.college} onChange={handleChange} placeholder="e.g. MIT" error={errors.college} />
                              </Field>
                              <Field label="Degree" required={isReq("degree")} hidden={isHide("degree")} error={errors.degree}>
                                <Input name="degree" value={form.degree} onChange={handleChange} placeholder="e.g. B.Tech / B.Sc" error={errors.degree} />
                              </Field>
                              <Field label="Stream / Specialization" required={isReq("stream")} hidden={isHide("stream")} error={errors.stream}>
                                <Input name="stream" value={form.stream} onChange={handleChange} placeholder="e.g. Computer Science" error={errors.stream} />
                              </Field>
                              <Field label="Current Year / Semester" required={isReq("currentSemester")} hidden={isHide("currentSemester")} error={errors.currentSemester}>
                                <Input name="currentSemester" value={form.currentSemester} onChange={handleChange} placeholder="e.g. 3rd Year / 6th Semester" error={errors.currentSemester} />
                              </Field>
                              <Field label="Graduation Year" required={isReq("graduationYear")} hidden={isHide("graduationYear")} error={errors.graduationYear}>
                                <Input type="number" name="graduationYear" value={form.graduationYear} onChange={handleChange} placeholder="e.g. 2027" error={errors.graduationYear} />
                              </Field>
                              <Field label="CGPA / Percentage" required={isReq("cgpa")} hidden={isHide("cgpa")} error={errors.cgpa}>
                                <Input name="cgpa" value={form.cgpa} onChange={handleChange} placeholder="e.g. 8.5 / 85%" error={errors.cgpa} />
                              </Field>
                            </>
                          )}
                          {config.sections.experience && (
                            <FullWidth>
                              <Field label="Past Internship / Project Experience" required={isReq("internshipExperience")} hidden={isHide("internshipExperience")} error={errors.internshipExperience}>
                                <Textarea name="internshipExperience" value={form.internshipExperience} onChange={handleChange} rows={4} placeholder="Describe any relevant projects or past internships..." error={errors.internshipExperience} />
                              </Field>
                            </FullWidth>
                          )}
                        </>
                      ) : (
                        <>
                          {/* Professional Fields */}
                          {config.sections.education && (
                            <Field label="Highest Qualification" required error={errors.qualification}>
                              <Select name="qualification" value={form.qualification} onChange={handleChange} error={errors.qualification}>
                                <option value="" disabled>Select qualification…</option>
                                <option value="High School">High School</option>
                                <option value="Bachelors">Bachelor's Degree (B.Tech, BSc…)</option>
                                <option value="Masters">Master's Degree (MS, MBA…)</option>
                                <option value="PhD">Ph.D. / Doctorate</option>
                                <option value="Self Taught">Self Taught / No Degree</option>
                              </Select>
                            </Field>
                          )}
                          {config.sections.experience && (
                            <>
                              <Field label="Current Company" required={isReq("currentCompany")} hidden={isHide("currentCompany")} error={errors.currentCompany}>
                                <Input name="currentCompany" value={form.currentCompany} onChange={handleChange} placeholder="e.g. Acme Corp" error={errors.currentCompany} />
                              </Field>
                              <Field label="Current Designation" required={isReq("currentDesignation")} hidden={isHide("currentDesignation")} error={errors.currentDesignation}>
                                <Input name="currentDesignation" value={form.currentDesignation} onChange={handleChange} placeholder="e.g. Software Engineer" error={errors.currentDesignation} />
                              </Field>
                              <Field label="Years of Experience" required error={errors.experience}>
                                <Select name="experience" value={form.experience} onChange={handleChange} error={errors.experience}>
                                  <option value="" disabled>Select range…</option>
                                  <option>Fresher (0 years)</option>
                                  <option>1–3 Years</option>
                                  <option>3–5 Years</option>
                                  <option>5–8 Years</option>
                                  <option>8+ Years</option>
                                </Select>
                              </Field>
                              <Field label="Notice Period" required={isReq("noticePeriod")} hidden={isHide("noticePeriod")} error={errors.noticePeriod}>
                                <Select name="noticePeriod" value={form.noticePeriod} onChange={handleChange} error={errors.noticePeriod}>
                                  <option value="" disabled>Select notice period…</option>
                                  <option>Immediate Joiner</option>
                                  <option>15 Days</option>
                                  <option>30 Days</option>
                                  <option>60 Days</option>
                                  <option>90 Days</option>
                                </Select>
                              </Field>
                              <Field label="Current CTC" required={isReq("currentCTC")} hidden={isHide("currentCTC")} error={errors.currentCtc}>
                                <Input name="currentCtc" value={form.currentCtc} onChange={handleChange} placeholder="e.g. $120,000 / ₹15,00,000" error={errors.currentCtc} />
                              </Field>
                              <Field label="Expected CTC" required={isReq("expectedCTC")} hidden={isHide("expectedCTC")} error={errors.expectedCtc}>
                                <Input name="expectedCtc" value={form.expectedCtc} onChange={handleChange} placeholder="e.g. $150,000 / ₹20,00,000" error={errors.expectedCtc} />
                              </Field>
                            </>
                          )}
                        </>
                      )}
                    </Grid>
                  </SectionCard>
                )}

                {currentStepId === "skills" && (
                  <SectionCard>
                    <SectionHeading icon={Icons.pen} iconColor={T.teal}>Skills & Notes</SectionHeading>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      {config.jobCategory === "Internship" ? (
                        <Field label="Relevant Skills (comma-separated)" required={isReq("relevantSkills")} hidden={isHide("relevantSkills")} error={errors.relevantSkills}>
                          <Input name="relevantSkills" value={form.relevantSkills} onChange={handleChange} placeholder="React, Node.js, Leadership..." error={errors.relevantSkills} />
                        </Field>
                      ) : (
                        <Field label="Key Skills (comma-separated)" required error={errors.skills}>
                          <Input name="skills" value={form.skills} onChange={handleChange} placeholder="React, Node.js, TypeScript, Project Management…" error={errors.skills} />
                        </Field>
                      )}
                      <Field label="Why do you want to join Auxosys?" required error={errors.whyAuxosys}>
                        <Textarea
                          name="whyAuxosys"
                          value={form.whyAuxosys}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Tell us why you're a great fit and what excites you about this role…"
                          error={errors.whyAuxosys}
                        />
                      </Field>
                      <Field label="Anything else we should know?">
                        <Textarea
                          name="additionalNotes"
                          value={form.additionalNotes}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Optional: projects, open-source work, awards, etc."
                        />
                      </Field>
                    </div>
                  </SectionCard>
                )}

                {currentStepId === "review" && (
                  <SectionCard>
                    <SectionHeading icon={Icons.review} iconColor={T.orange}>Review Application</SectionHeading>
                    <div style={{ background: T.bg0, borderRadius: 12, padding: 24, border: `1px solid ${T.border}` }}>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <h3 style={{ color: T.teal, fontSize: 15, margin: 0 }}>Personal Info</h3>
                        <button onClick={() => setCurrentStep(steps.findIndex(s => s.id === "personal"))} style={{ background: 'none', border: 'none', color: T.muted, cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}>Edit</button>
                      </div>
                      <div className="review-row"><div className="review-label">Name</div><div className="review-value">{form.firstName} {form.lastName}</div></div>
                      <div className="review-row"><div className="review-label">Email</div><div className="review-value">{form.email}</div></div>
                      <div className="review-row"><div className="review-label">Phone</div><div className="review-value">{form.phone}</div></div>
                      <div className="review-row"><div className="review-label">Country</div><div className="review-value">{form.country}</div></div>

                      <div style={{ height: 1, background: T.border, margin: "24px 0" }} />
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <h3 style={{ color: T.teal, fontSize: 15, margin: 0 }}>Documents & Links</h3>
                        <button onClick={() => setCurrentStep(steps.findIndex(s => s.id === "documents"))} style={{ background: 'none', border: 'none', color: T.muted, cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}>Edit</button>
                      </div>
                      <div className="review-row"><div className="review-label">Resume</div><div className="review-value" style={{ color: T.orange }}>{files.resume?.name || "Missing"}</div></div>
                      {!isHide("linkedin") && <div className="review-row"><div className="review-label">LinkedIn</div><div className="review-value">{form.linkedin || "N/A"}</div></div>}

                      {(config.sections.experience || config.sections.education) && (
                        <>
                          <div style={{ height: 1, background: T.border, margin: "24px 0" }} />
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <h3 style={{ color: T.teal, fontSize: 15, margin: 0 }}>Experience & Qualifications</h3>
                            <button onClick={() => setCurrentStep(steps.findIndex(s => s.id === "experience"))} style={{ background: 'none', border: 'none', color: T.muted, cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}>Edit</button>
                          </div>
                          {config.sections.experience && (
                            <>
                              {config.jobCategory === "Internship" ? (
                                <>
                                  {!isHide("internshipExperience") && <div className="review-row"><div className="review-label">Internship Exp.</div><div className="review-value" style={{maxWidth: 300, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{form.internshipExperience || "N/A"}</div></div>}
                                </>
                              ) : (
                                <>
                                  <div className="review-row"><div className="review-label">Experience</div><div className="review-value">{form.experience || "N/A"}</div></div>
                                  {!isHide("expectedCTC") && <div className="review-row"><div className="review-label">Expected CTC</div><div className="review-value">{form.expectedCtc || "N/A"}</div></div>}
                                  {!isHide("noticePeriod") && <div className="review-row"><div className="review-label">Notice Period</div><div className="review-value">{form.noticePeriod || "N/A"}</div></div>}
                                </>
                              )}
                            </>
                          )}
                          {config.sections.education && (
                            <>
                              {config.jobCategory === "Internship" ? (
                                <>
                                  {!isHide("college") && <div className="review-row"><div className="review-label">College</div><div className="review-value">{form.college || "N/A"}</div></div>}
                                  {!isHide("degree") && <div className="review-row"><div className="review-label">Degree</div><div className="review-value">{form.degree || "N/A"}</div></div>}
                                  {!isHide("graduationYear") && <div className="review-row"><div className="review-label">Grad. Year</div><div className="review-value">{form.graduationYear || "N/A"}</div></div>}
                                </>
                              ) : (
                                <div className="review-row"><div className="review-label">Qualification</div><div className="review-value">{form.qualification || "N/A"}</div></div>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </SectionCard>
                )}

                {currentStepId === "submit" && (
                  <SectionCard>
                    <SectionHeading icon={Icons.check} iconColor={T.teal}>Declaration & Submit</SectionHeading>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
                      <CheckboxField name="consent" checked={form.consent} onChange={handleChange} error={errors.consent}>
                        I consent to the processing of my personal data by Auxosys for recruitment purposes in accordance with applicable data protection laws.
                      </CheckboxField>
                      <CheckboxField name="privacy" checked={form.privacy} onChange={handleChange} error={errors.privacy}>
                        I have read and agree to the{" "}
                        <Link href="/privacy" style={{ color: T.teal, textDecoration: "underline", textUnderlineOffset: 3 }}>Privacy Policy</Link>
                        {" "}and{" "}
                        <Link href="/terms" style={{ color: T.teal, textDecoration: "underline", textUnderlineOffset: 3 }}>Terms of Service</Link>.
                      </CheckboxField>
                    </div>

                    <div style={{ height: 1, background: T.div, marginBottom: 24 }} />

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      style={{
                        width: "100%",
                        padding: "16px 28px",
                        background: loading ? T.hover : T.orange,
                        border: "none",
                        borderRadius: 14,
                        color: loading ? T.muted : "#0a0a0a",
                        fontSize: 16,
                        fontWeight: 700,
                        cursor: loading ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                        transition: "all 0.2s",
                        boxShadow: !loading ? "0 0 24px rgba(255,107,53,0.35)" : "none",
                        fontFamily: "inherit",
                      }}
                    >
                      {loading ? <>{Icons.spin} Submitting Application…</> : <>Submit Application {Icons.arrow}</>}
                    </button>
                    
                    <p style={{ textAlign: "center", fontSize: 12, color: T.muted, marginTop: 14 }}>
                      Your data is protected. We'll respond within 5–7 business days.
                    </p>
                  </SectionCard>
                )}

                {/* ── Navigation Buttons ── */}
                {currentStepId !== "submit" && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                    {currentStep > 0 ? (
                      <button type="button" onClick={prevStep} className="btn-nav btn-prev">
                        {Icons.back} Previous
                      </button>
                    ) : <div></div>}
                    
                    <button type="button" onClick={nextStep} className="btn-nav btn-next">
                      Next Step {Icons.arrow}
                    </button>
                  </div>
                )}
                {currentStepId === "submit" && (
                  <div style={{ display: "flex", justifyContent: "flex-start", marginTop: 10 }}>
                    <button type="button" onClick={prevStep} className="btn-nav btn-prev">
                      {Icons.back} Previous
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}