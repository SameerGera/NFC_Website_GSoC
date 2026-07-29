"use client";

import { useState } from "react";
import { Member, Project, Certificate, Achievement, MemberStatus } from "@/types/member";

interface Props {
  initialData?: Member;
  onSubmit: (data: Member) => Promise<void>;
  onCancel?: () => void;
}

const emptyMember: Member = {
  username: "",
  name: "",
  email: "",
  phone: "",
  clubrole: "",
  department: "",
  year: "",
  bio: "",
  "registration number": "",
  "profile Image": "",
  skills: [],
  projects: [],
  certificates: [],
  achievements: [],
  github: "",
  linkedin: "",
  portfolio: "",
  status: "Verified",
};

export default function MemberForm({ initialData, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<Member>(initialData ?? emptyMember);
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof Member>(key: K, value: Member[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const addSkill = (value: string) =>
    setForm((prev) => ({ ...prev, skills: [...(prev.skills ?? []), value] }));

  const removeSkill = (index: number) =>
    setForm((prev) => ({
      ...prev,
      skills: (prev.skills ?? []).filter((_, i) => i !== index),
    }));

  const addProject = () =>
    setForm((prev) => ({
      ...prev,
      projects: [...(prev.projects ?? []), { title: "", description: "", technologies: [], githubLink: "", liveDemo: "" }],
    }));

  const updateProject = (index: number, data: Project) =>
    setForm((prev) => ({
      ...prev,
      projects: (prev.projects ?? []).map((p, i) => (i === index ? data : p)),
    }));

  const removeProject = (index: number) =>
    setForm((prev) => ({
      ...prev,
      projects: (prev.projects ?? []).filter((_, i) => i !== index),
    }));

  const addCertificate = () =>
    setForm((prev) => ({
      ...prev,
      certificates: [...(prev.certificates ?? []), { name: "", issuingOrganization: "", issueDate: "" }],
    }));

  const updateCertificate = (index: number, data: Certificate) =>
    setForm((prev) => ({
      ...prev,
      certificates: (prev.certificates ?? []).map((c, i) => (i === index ? data : c)),
    }));

  const removeCertificate = (index: number) =>
    setForm((prev) => ({
      ...prev,
      certificates: (prev.certificates ?? []).filter((_, i) => i !== index),
    }));

  const addAchievement = () =>
    setForm((prev) => ({
      ...prev,
      achievements: [...(prev.achievements ?? []), { title: "", event: "", date: "", description: "" }],
    }));

  const updateAchievement = (index: number, data: Achievement) =>
    setForm((prev) => ({
      ...prev,
      achievements: (prev.achievements ?? []).map((a, i) => (i === index ? data : a)),
    }));

  const removeAchievement = (index: number) =>
    setForm((prev) => ({
      ...prev,
      achievements: (prev.achievements ?? []).filter((_, i) => i !== index),
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(form);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full rounded-xl border border-card-border bg-primary-bg/30 px-3 py-2.5 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-text-secondary">Username (Document ID)</label>
          <input className={inputClass} value={form.username} onChange={(e) => update("username", e.target.value)} required disabled={!!initialData} />
        </div>
        <div>
          <label className="mb-1 block text-sm text-text-secondary">Name</label>
          <input className={inputClass} value={form.name} onChange={(e) => update("name", e.target.value)} required />
        </div>
        <div>
          <label className="mb-1 block text-sm text-text-secondary">Email</label>
          <input className={inputClass} type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
        </div>
        <div>
          <label className="mb-1 block text-sm text-text-secondary">Phone</label>
          <input className={inputClass} type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm text-text-secondary">Registration Number</label>
          <input className={inputClass} value={form["registration number"]} onChange={(e) => update("registration number", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm text-text-secondary">Department</label>
          <input className={inputClass} value={form.department} onChange={(e) => update("department", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm text-text-secondary">Year</label>
          <input className={inputClass} value={form.year} onChange={(e) => update("year", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm text-text-secondary">Club Role</label>
          <input className={inputClass} value={form.clubrole} onChange={(e) => update("clubrole", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm text-text-secondary">Profile Image URL</label>
          <input className={inputClass} value={form["profile Image"]} onChange={(e) => update("profile Image", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm text-text-secondary">Status</label>
          <select className={inputClass} value={form.status ?? "Verified"} onChange={(e) => update("status", e.target.value as MemberStatus)}>
            <option value="Verified">Verified</option>
            <option value="Unverified">Unverified</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-text-secondary">Bio</label>
        <textarea className={inputClass} rows={3} value={form.bio} onChange={(e) => update("bio", e.target.value)} />
      </div>

      <div>
        <label className="mb-1 block text-sm text-text-secondary">Social Links</label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <input className={inputClass} placeholder="GitHub URL" value={form.github ?? ""} onChange={(e) => update("github", e.target.value)} />
          <input className={inputClass} placeholder="LinkedIn URL" value={form.linkedin ?? ""} onChange={(e) => update("linkedin", e.target.value)} />
          <input className={inputClass} placeholder="Portfolio URL" value={form.portfolio ?? ""} onChange={(e) => update("portfolio", e.target.value)} />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-text-secondary">Skills</label>
        <div className="flex flex-wrap gap-2">
          {(form.skills ?? []).map((s, i) => (
            <span key={i} className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm text-primary">
              {s}
              <button type="button" onClick={() => removeSkill(i)} className="ml-1 text-primary/60 hover:text-primary">&times;</button>
            </span>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <input className={inputClass} placeholder="Add skill" id="skill-input" onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const el = document.getElementById("skill-input") as HTMLInputElement;
              if (el.value.trim()) { addSkill(el.value.trim()); el.value = ""; }
            }
          }} />
          <button type="button" onClick={() => {
            const el = document.getElementById("skill-input") as HTMLInputElement;
            if (el.value.trim()) { addSkill(el.value.trim()); el.value = ""; }
          }} className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-light">Add</button>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm text-text-secondary">Projects</label>
          <button type="button" onClick={addProject} className="text-sm text-primary font-medium hover:text-primary-light">+ Add</button>
        </div>
        {(form.projects ?? []).map((p, i) => (
          <div key={i} className="mb-3 rounded-xl bg-primary-bg/30 border border-card-border p-4">
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium text-text-primary">Project {i + 1}</span>
              <button type="button" onClick={() => removeProject(i)} className="text-sm text-red-500 font-medium hover:text-red-600">Remove</button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input className={inputClass} placeholder="Title" value={p.title} onChange={(e) => updateProject(i, { ...p, title: e.target.value })} />
              <input className={inputClass} placeholder="Technologies (comma-sep)" value={p.technologies.join(", ")} onChange={(e) => updateProject(i, { ...p, technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
              <input className={inputClass} placeholder="GitHub Link" value={p.githubLink} onChange={(e) => updateProject(i, { ...p, githubLink: e.target.value })} />
              <input className={inputClass} placeholder="Live Demo" value={p.liveDemo} onChange={(e) => updateProject(i, { ...p, liveDemo: e.target.value })} />
            </div>
            <textarea className={`${inputClass} mt-2`} rows={2} placeholder="Description" value={p.description} onChange={(e) => updateProject(i, { ...p, description: e.target.value })} />
          </div>
        ))}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm text-text-secondary">Certificates</label>
          <button type="button" onClick={addCertificate} className="text-sm text-primary font-medium hover:text-primary-light">+ Add</button>
        </div>
        {(form.certificates ?? []).map((c, i) => (
          <div key={i} className="mb-3 rounded-xl bg-primary-bg/30 border border-card-border p-4">
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium text-text-primary">Certificate {i + 1}</span>
              <button type="button" onClick={() => removeCertificate(i)} className="text-sm text-red-500 font-medium hover:text-red-600">Remove</button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <input className={inputClass} placeholder="Name" value={c.name} onChange={(e) => updateCertificate(i, { ...c, name: e.target.value })} />
              <input className={inputClass} placeholder="Organization" value={c.issuingOrganization} onChange={(e) => updateCertificate(i, { ...c, issuingOrganization: e.target.value })} />
              <input className={inputClass} placeholder="Issue Date" value={c.issueDate} onChange={(e) => updateCertificate(i, { ...c, issueDate: e.target.value })} />
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm text-text-secondary">Achievements</label>
          <button type="button" onClick={addAchievement} className="text-sm text-primary font-medium hover:text-primary-light">+ Add</button>
        </div>
        {(form.achievements ?? []).map((a, i) => (
          <div key={i} className="mb-3 rounded-xl bg-primary-bg/30 border border-card-border p-4">
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium text-text-primary">Achievement {i + 1}</span>
              <button type="button" onClick={() => removeAchievement(i)} className="text-sm text-red-500 font-medium hover:text-red-600">Remove</button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <input className={inputClass} placeholder="Title" value={a.title} onChange={(e) => updateAchievement(i, { ...a, title: e.target.value })} />
              <input className={inputClass} placeholder="Event" value={a.event} onChange={(e) => updateAchievement(i, { ...a, event: e.target.value })} />
              <input className={inputClass} placeholder="Date" value={a.date} onChange={(e) => updateAchievement(i, { ...a, date: e.target.value })} />
            </div>
            <textarea className={`${inputClass} mt-2`} rows={2} placeholder="Description" value={a.description} onChange={(e) => updateAchievement(i, { ...a, description: e.target.value })} />
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-primary-light disabled:opacity-50"
        >
          {submitting ? "Saving..." : initialData ? "Update Member" : "Add Member"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="rounded-full border border-card-border bg-card px-6 py-2.5 text-sm font-medium text-text-primary transition hover:bg-primary-bg">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
