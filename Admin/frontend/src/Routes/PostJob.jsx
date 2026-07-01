import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../helper/apiClient";
import { toast } from "react-toastify";
import RichTextEditor from "../Components/RichTextEditor";
import { usePermissions } from "../hooks/usePermissions";

const PostJob = () => {
  const navigate = useNavigate();
  const { canWrite, loading: permsLoading } = usePermissions("careers");

  React.useEffect(() => {
    if (!permsLoading && !canWrite) {
      toast.error("Permission denied");
      navigate("/careers");
    }
  }, [canWrite, permsLoading, navigate]);

  const [submitting, setSubmitting] = useState(false);

  // Field names match backend model exactly
  const [form, setForm] = useState({
    title: "",
    type: "",           // backend: type (Full-time | Part-time | Contract | Internship | Remote)
    workMode: "",       // Hybrid | Remote | On-site
    jobState: "",       // India states
    city: "",           // manual input
    department: "",     // required by backend
    summary: "",        // required by backend
    salary: "",         // stored as { display: string } — see backend fix
    closingDate: "",    // backend: closingDate
    description: "",    // backend: description (rich text)
    responsibilities: "",
    requirements: "",
    experienceLevel: "",
    seoTitle: "",
    seoDescription: "",
  });

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").trim();

  const validate = () => {
    if (!form.title.trim()) { toast.error("Enter job title"); return false; }
    if (!form.type) { toast.error("Select role type"); return false; }
    if (!form.workMode) { toast.error("Select work mode"); return false; }
    if (!form.jobState) { toast.error("Select state"); return false; }
    if (!form.city.trim()) { toast.error("Enter city"); return false; }
    if (!form.department.trim()) { toast.error("Enter department"); return false; }
    if (!form.summary.trim()) { toast.error("Enter a short summary"); return false; }
    if (!form.closingDate) { toast.error("Select application deadline"); return false; }

    const d = new Date(form.closingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (d < today) { toast.error("Deadline cannot be in the past"); return false; }

    if (!stripHtml(form.description)) { toast.error("Job description is required"); return false; }
    if (!stripHtml(form.responsibilities)) { toast.error("Responsibilities are required"); return false; }
    if (!stripHtml(form.requirements)) { toast.error("Requirements are required"); return false; }

    return true;
  };

  const handleSubmit = async (status = "Active") => {
    if (status === "Active" && !validate()) return;
    if (status === "Draft") {
      if (!form.title.trim()) { toast.error("Enter a job title to save as draft"); return; }
    }

    try {
      setSubmitting(true);
      const combinedLocation = `${form.city.trim()}, ${form.jobState} (${form.workMode})`;
      await apiClient.post("/job/new", {
        title: form.title,
        type: form.type,
        location: combinedLocation,
        department: form.department,
        summary: form.summary,
        description: form.description,
        responsibilities: form.responsibilities,
        requirements: form.requirements,
        experienceLevel: form.experienceLevel || undefined,
        closingDate: form.closingDate || undefined,
        salary: form.salary || undefined,
        seoTitle: form.seoTitle || undefined,
        seoDescription: form.seoDescription || undefined,
        status,
      });
      toast.success(`Job ${status === "Draft" ? "saved as draft" : "published successfully"}`);
      navigate("/careers");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create job");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Post New Job</h1>
      <p className="text-sm text-gray-500 mb-6">Create a new job opening for candidates to apply.</p>

      {/* JOB DETAILS */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-1">Job Details</h2>
        <p className="text-xs text-gray-500 mb-6">Basic information about the role.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* JOB TITLE */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Job Title</label>
            <input
              name="title"
              placeholder="e.g. Data Analyst, Project Manager, Sales Executive"
              className="input"
              onChange={handleChange}
              value={form.title}
            />
          </div>

          {/* ROLE TYPE — values match backend enum */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Role Type</label>
            <select name="type" className="input" onChange={handleChange} value={form.type}>
              <option value="">Select role type</option>
              <option value="Full-time">Full Time</option>
              <option value="Part-time">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          {/* WORK MODE */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Work Mode</label>
            <select name="workMode" className="input" onChange={handleChange} value={form.workMode}>
              <option value="">Select work mode</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* STATE */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">State (India)</label>
            <select name="jobState" className="input" onChange={handleChange} value={form.jobState}>
              <option value="">Select state</option>
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* CITY */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
            <input
              name="city"
              placeholder="e.g. Mumbai, Bangalore"
              className="input"
              onChange={handleChange}
              value={form.city}
            />
          </div>

          {/* DEPARTMENT (required by backend) */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Area of Interest (Department)</label>
            <select name="department" className="input" onChange={handleChange} value={form.department}>
              <option value="">Select Area of Interest</option>
              {AREAS_OF_INTEREST.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          {/* SALARY */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Salary / Stipend</label>
            <input
              name="salary"
              placeholder="e.g. ₹6 LPA / ₹10,000 stipend"
              className="input"
              onChange={handleChange}
              value={form.salary}
            />
          </div>

          {/* DEADLINE */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Application Deadline</label>
            <input
              type="date"
              name="closingDate"
              className="input"
              onChange={handleChange}
              value={form.closingDate}
            />
          </div>

          {/* EXPERIENCE LEVEL */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Experience Level</label>
            <select
              name="experienceLevel"
              className="input"
              onChange={handleChange}
              value={form.experienceLevel}
            >
              <option value="">Select experience level</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior">Senior</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* SUMMARY (required by backend) */}
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Short Summary <span className="text-red-500">*</span>
            </label>
            <textarea
              name="summary"
              rows={2}
              placeholder="Brief overview shown in listings..."
              className="input resize-none w-full"
              onChange={handleChange}
              value={form.summary}
            />
          </div>
        </div>
      </div>

      {/* ROLE DESCRIPTION */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-1">Role Description</h2>
        <p className="text-xs text-gray-500 mb-6">Detailed information about responsibilities and requirements.</p>

        <div className="mb-6">
          <label className="block text-xs font-medium text-gray-600 mb-2">Job Description</label>
          <RichTextEditor
            value={form.description}
            onChange={(value) => setForm((prev) => ({ ...prev, description: value }))}
          />
        </div>

        <div className="mb-6">
          <label className="block text-xs font-medium text-gray-600 mb-2">Responsibilities</label>
          <RichTextEditor
            value={form.responsibilities}
            onChange={(value) => setForm((prev) => ({ ...prev, responsibilities: value }))}
          />
        </div>

        <div className="mb-6">
          <label className="block text-xs font-medium text-gray-600 mb-2">Requirements</label>
          <RichTextEditor
            value={form.requirements}
            onChange={(value) => setForm((prev) => ({ ...prev, requirements: value }))}
          />
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={() => navigate(-1)} className="btn-secondary">Cancel</button>
          <button 
            onClick={() => handleSubmit("Draft")} 
            className="px-4 py-2 rounded-lg text-sm bg-gray-200 text-gray-800 hover:bg-gray-300 font-medium" 
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save as Draft"}
          </button>
          <button onClick={() => handleSubmit("Active")} className="btn-primary" disabled={submitting}>
            {submitting ? "Publishing..." : "Publish Job"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
