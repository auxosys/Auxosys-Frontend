import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient } from "../helper/apiClient";
import { toast } from "react-toastify";
import RichTextEditor from "../Components/RichTextEditor";
import { usePermissions } from "../hooks/usePermissions";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { canWrite, loading: permsLoading } = usePermissions("careers");

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  const AREAS_OF_INTEREST = [
    "Software Development", "Cloud Services", "Design Sector", "IOT Engineering", "Product Engineering", "Marketing & Sales", "Human Resources", "Finance & Operations",
    "Front-End Engineer", "Back-End Engineer", "Full Stack Engineer", "Software Engineer in Test (QA Engineer)", "Software Development Engineer in Test (SDET)",
    "DevOps Engineer", "Security Engineer", "Data Engineer", "Cloud Architect", "Systems Engineer", "Mobile Engineer", "Technical Support Engineer", "Game Developer",
    "Machine Learning (ML) Engineer", "Artificial Intelligence (AI) Engineers", "Blockchain Engineers", "Embedded Systems Engineers", "Web Application Security Engineers (WASE)",
    "Site Reliability Engineers (SREs)", "User Experience (UX) Engineers", "User Interface (UI) Engineers", "Robotics Engineers", "Internet of Things (IoT) Engineers", "Software Integration Engineer",
    "Graphics Designer", "Social Media Manager", "Digital Marketing", "Content Creation", "Product Management", "Project Management", "Business Management", "Brand Management", "Marketing Communications"
  ];

  useEffect(() => {
    let alive = true;

    const fetchJob = async () => {
      try {
        setLoading(true);
        // Use admin endpoint — works for Active, Inactive, and Draft jobs
        const res = await apiClient.get(`/job/admin/${id}`);
        const data = res?.data?.data ?? res?.data;

        if (alive) {
          if (!data) { toast.error("Job not found"); navigate("/careers"); return; }

          const locStr = data.location || "";
          const match = locStr.match(/^(.*?),\s*(.*?)\s*\((.*?)\)$/);
          if (match) {
            data.city = match[1];
            data.jobState = match[2];
            data.workMode = match[3];
          } else {
            // fallback if it was the old format
            data.workMode = locStr;
            data.city = "";
            data.jobState = "";
          }

          setJob(data);
        }
      } catch {
        if (alive) {
          toast.error("Failed to load job");
          navigate("/careers");
        }
      } finally {
        if (alive) setLoading(false);
      }
    };

    fetchJob();
    return () => { alive = false; };
  }, [id, navigate]);

  useEffect(() => {
    if (!permsLoading && !canWrite) {
      toast.error("Permission denied");
      navigate("/careers");
    }
  }, [canWrite, permsLoading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({ ...prev, [name]: value }));
  };

  const saveJob = async (status = null) => {
    const {
      title, type, city, jobState, workMode, department, summary, salary,
      closingDate, description, responsibilities, requirements, experienceLevel,
    } = job;

    if (!city || !jobState || !workMode) {
      toast.error("City, State, and Work Mode are required");
      return;
    }

    const combinedLocation = `${city.trim()}, ${jobState} (${workMode})`;

    try {
      setSaving(true);
      await apiClient.put(`/job/${id}`, {
        title, type, location: combinedLocation, department, summary,
        salary: typeof salary === "object" ? (salary?.display || undefined) : salary || undefined,
        closingDate, description, responsibilities, requirements, experienceLevel,
        seoTitle: job.seoTitle || undefined,
        seoDescription: job.seoDescription || undefined,
        status: status || job.status,
      });
      toast.success("Job updated successfully");
      navigate("/careers");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update job");
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async () => {
    try {
      const res = await apiClient.patch(`/job/${id}/toggle`);
      // Backend returns { success, data: { status: "Active"|"Inactive" }, message }
      const newStatus = res?.data?.data?.status ?? (job.status === "Active" ? "Inactive" : "Active");
      setJob((prev) => ({ ...prev, status: newStatus }));
      toast.success(`Job is now ${newStatus}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to toggle status");
    }
  };

  const deleteJob = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await apiClient.delete(`/job/${id}`);
      toast.success("Job deleted successfully");
      navigate("/careers");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete job");
    }
  };

  if (loading) return <div className="p-8 text-gray-500">Loading job details...</div>;
  if (!job) return <div className="p-8 text-red-500">Job not found.</div>;

  const isActive = job.status === "Active";

  // requirements/responsibilities may be string[] from DB or HTML string from editor
  const toEditorValue = (val) =>
    Array.isArray(val) ? val.join("\n") : val || "";

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-2xl font-bold mb-1">Edit Job Post</h1>
      <p className="text-gray-500 mb-6">Edit a job opening for candidates to apply.</p>

      {/* Status Toggle */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6 flex justify-between items-center">
        <span className="text-sm">When active, candidates can view and apply for this role.</span>
        <button
          onClick={toggleStatus}
          className={`px-4 py-1 rounded-full text-sm transition ${isActive ? "bg-[#0c55cc] text-white" : "bg-gray-300 text-gray-700"
            }`}
        >
          {isActive ? "Active" : "Closed"}
        </button>
      </div>

      {/* Job Details */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        <h2 className="font-semibold mb-4">Job Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Job Title</label>
            <input
              name="title"
              value={job.title || ""}
              className="input"
              onChange={handleChange}
              placeholder="Job Title"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Role Type</label>
            <select name="type" value={job.type || ""} className="input" onChange={handleChange}>
              <option value="">Select role type</option>
              <option value="Full-time">Full Time</option>
              <option value="Part-time">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Work Mode</label>
            <select name="workMode" value={job.workMode || ""} className="input" onChange={handleChange}>
              <option value="">Select work mode</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">State (India)</label>
            <select name="jobState" value={job.jobState || ""} className="input" onChange={handleChange}>
              <option value="">Select state</option>
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
            <input
              name="city"
              value={job.city || ""}
              className="input"
              onChange={handleChange}
              placeholder="e.g. Mumbai, Bangalore"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Area of Interest (Department)</label>
            <select name="department" className="input" onChange={handleChange} value={job.department || ""}>
              <option value="">Select Area of Interest</option>
              {AREAS_OF_INTEREST.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Salary / Stipend</label>
            <input
              name="salary"
              value={typeof job.salary === "object" ? job.salary?.display || "" : job.salary || ""}
              className="input"
              onChange={handleChange}
              placeholder="e.g. ₹6 LPA / ₹10,000 stipend"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Application Deadline</label>
            <input
              type="date"
              name="closingDate"
              value={job.closingDate ? job.closingDate.slice(0, 10) : ""}
              className="input"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Experience Level</label>
            <select name="experienceLevel" value={job.experienceLevel || ""} className="input" onChange={handleChange}>
              <option value="">Select experience level</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior">Senior</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-600 mb-1">Short Summary</label>
            <textarea
              name="summary"
              rows={2}
              value={job.summary || ""}
              className="input resize-none w-full"
              onChange={handleChange}
              placeholder="Brief overview shown in listings..."
            />
          </div>
        </div>
      </div>

      {/* Role Description */}
      <div className="bg-white rounded-xl border p-6">
        <h2 className="font-semibold mb-4">Role Description</h2>

        <div className="mb-6">
          <label className="block text-xs font-medium text-gray-600 mb-2">Job Description</label>
          <RichTextEditor
            value={job.description || ""}
            onChange={(value) => setJob((prev) => ({ ...prev, description: value }))}
          />
        </div>

        <div className="mb-6">
          <label className="block text-xs font-medium text-gray-600 mb-2">Responsibilities</label>
          <RichTextEditor
            value={toEditorValue(job.responsibilities)}
            onChange={(value) => setJob((prev) => ({ ...prev, responsibilities: value }))}
          />
        </div>

        <div className="mb-6">
          <label className="block text-xs font-medium text-gray-600 mb-2">Requirements</label>
          <RichTextEditor
            value={toEditorValue(job.requirements)}
            onChange={(value) => setJob((prev) => ({ ...prev, requirements: value }))}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={deleteJob} className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">Delete Post</button>
          <button onClick={() => navigate(-1)} className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Cancel</button>
          {job.status === "Draft" && (
             <button onClick={() => saveJob("Draft")} disabled={saving} className="px-4 py-2 text-sm bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-lg font-medium">
               {saving ? "Saving..." : "Save Draft"}
             </button>
          )}
          <button onClick={() => saveJob("Active")} disabled={saving} className="px-4 py-2 text-sm bg-[#0c55cc] text-white hover:bg-[#0c55cc] rounded-lg font-medium shadow-sm">
            {saving ? "Saving..." : job.status === "Draft" ? "Publish Job" : "Update Job"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditJob;
