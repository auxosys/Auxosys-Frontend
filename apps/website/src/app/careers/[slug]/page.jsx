"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { IconSearch, IconWeb, IconAI, IconDesign, IconCloud, IconBlockchain, IconHandshake, IconTools, IconBrain, IconScale, IconStartup } from "@/components/Icons";

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(`http://localhost:5002/job/${slug}`);
        const json = await res.json();
        if (json.success && json.data) {
          setJob(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch job details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen bg-[#081826] flex items-center justify-center text-white">Loading...</div>;
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#081826] flex flex-col items-center justify-center text-white">
        <IconSearch style={{ width: 64, height: 64, marginBottom: 24, opacity: 0.5 }} />
        <h1 className="text-3xl font-bold mb-4">Job Not Found</h1>
        <p className="text-gray-400 mb-8">The position you are looking for does not exist or has been closed.</p>
        <Link href="/careers" className="bg-[#5CC9D6] text-[#081826] px-6 py-3 rounded-lg font-semibold hover:bg-white transition-colors">
          View Open Positions
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#081826] text-gray-200 font-sans pb-24">
      {/* ── HEADER ── */}
      <div className="pt-28 pb-16 px-6 lg:px-24 border-b border-[#22384B] bg-[#0F2436] relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#5CC9D6] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF6B35] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <Link href="/careers" className="inline-flex items-center text-[#5CC9D6] hover:text-white font-medium mb-8 transition-colors text-sm uppercase tracking-widest">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Careers
          </Link>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold tracking-widest uppercase text-[#FF6B35] bg-[#FF6B35]/10 px-3 py-1 rounded-full border border-[#FF6B35]/20">
                  {job.department}
                </span>
                {job.featured && (
                  <span className="text-xs font-bold tracking-widest uppercase text-[#5CC9D6] bg-[#5CC9D6]/10 px-3 py-1 rounded-full border border-[#5CC9D6]/20">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 font-medium">
                <span className="flex items-center"><span className="mr-2 text-xl">📍</span>{job.work_mode} {job.city ? `— ${job.city}, ${job.country}` : ''}</span>
                <span className="flex items-center"><span className="mr-2 text-xl">💼</span>{job.employment_type}</span>
                {job.experience_level && <span className="flex items-center"><span className="mr-2 text-xl">⭐</span>{job.experience_level} Level</span>}
                <span className="flex items-center"><span className="mr-2 text-xl">🕒</span>Posted on {new Date(job.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link href={`/careers/${slug}/apply`} className="bg-[#FF6B35] text-white hover:bg-[#FF824D] px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(255,107,53,0.3)] flex items-center justify-center min-w-[200px]">
                Apply for this Role →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-6xl mx-auto px-6 lg:px-24 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-12">
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 font-display border-b border-[#22384B] pb-4">About the Role</h2>
              <div className="text-gray-300 leading-relaxed space-y-4 text-lg">
                <p>{job.description || job.short_summary}</p>
              </div>
            </section>

            {job.responsibilities && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 font-display border-b border-[#22384B] pb-4">What You'll Do</h2>
                <ul className="space-y-4">
                  {job.responsibilities.split("\n").map(r => r.trim()).filter(Boolean).map((resp, i) => (
                    <li key={i} className="flex items-start text-gray-300 text-lg">
                      <span className="text-[#5CC9D6] mr-4 mt-1">●</span>
                      <span>{resp.replace(/^- /, '')}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {job.requirements && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 font-display border-b border-[#22384B] pb-4">Requirements</h2>
                <ul className="space-y-4">
                  {job.requirements.split("\n").map(r => r.trim()).filter(Boolean).map((req, i) => (
                    <li key={i} className="flex items-start text-gray-300 text-lg">
                      <span className="text-[#5CC9D6] mr-4 mt-1">●</span>
                      <span>{req.replace(/^- /, '')}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {job.tech_skills && job.tech_skills.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 font-display border-b border-[#22384B] pb-4">Tech Stack & Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {job.tech_skills.map((skill, i) => (
                    <span key={i} className="bg-[#132A3A] text-[#5CC9D6] border border-[#22384B] px-4 py-2 rounded-lg font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
            
            <div className="pt-8 border-t border-[#22384B]">
              <Link href={`/careers/${slug}/apply`} className="bg-[#FF6B35] text-white hover:bg-[#FF824D] px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_4px_20px_rgba(255,107,53,0.3)] inline-flex items-center">
                Submit Your Application →
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#0F2436] border border-[#22384B] rounded-2xl p-8 sticky top-32">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Job Overview</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Department</p>
                  <p className="font-semibold text-white">{job.department}</p>
                </div>
                {job.team && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Team</p>
                    <p className="font-semibold text-white">{job.team}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Work Mode</p>
                  <p className="font-semibold text-white">{job.work_mode}</p>
                </div>
                {(!job.hide_salary && job.min_salary) && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Compensation</p>
                    <p className="font-semibold text-[#22C55E]">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: job.currency || 'USD', maximumFractionDigits: 0 }).format(job.min_salary)} 
                      {job.max_salary ? ` - ${new Intl.NumberFormat('en-US', { style: 'currency', currency: job.currency || 'USD', maximumFractionDigits: 0 }).format(job.max_salary)}` : ''} 
                      <span className="text-gray-500 text-xs ml-1 font-normal">/ {job.salary_type || 'yr'}</span>
                    </p>
                  </div>
                )}
                {job.expected_joining_date && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Expected Joining</p>
                    <p className="font-semibold text-white">{new Date(job.expected_joining_date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-[#22384B]">
                <p className="text-sm text-gray-400 mb-4">Know someone perfect for this role?</p>
                <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); }} className="w-full bg-[#132A3A] hover:bg-[#22384B] text-white border border-[#22384B] transition-colors py-3 rounded-xl font-medium flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                  Copy Job Link
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
