"use client";

import { useState, useRef, useCallback } from "react";
import { Member, Project, Certificate, Achievement, MemberStatus } from "@/types/member";
import { normalizeImageUrl } from "@/lib/utils";
import dynamic from "next/dynamic";

const ImageEditor = dynamic(() => import("./ImageEditor"), { ssr: false });

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
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [editorFile, setEditorFile] = useState<File | null>(null);
  const [imgError, setImgError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof Member>(key: K, value: Member[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const uploadBlob = useCallback(async (blob: Blob) => {
    if (!form.username) {
      alert("Please enter a username first");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", blob, `${form.username}.jpg`);
      formData.append("username", form.username);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      update("profile Image", url);
    } catch {
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  }, [form.username]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setEditorFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) setEditorFile(file);
  };

  const handleEditorConfirm = async (blob: Blob) => {
    setEditorFile(null);
    await uploadBlob(blob);
  };

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
          <label className="mb-1 block text-sm text-text-secondary">Profile Image</label>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-4 transition-all duration-200 ${
              dragOver
                ? "border-primary bg-primary/5"
                : "border-card-border bg-primary-bg/30 hover:border-primary/50 hover:bg-primary/5"
            }`}
          >
            {form["profile Image"] && !imgError ? (
              <div className="flex flex-col items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={form["profile Image"]}
                  src={form["profile Image"]}
                  alt="Preview"
                  crossOrigin="anonymous"
                  className="h-20 w-20 rounded-full object-cover border-2 border-card-border"
                  onError={() => setImgError(true)}
                />
                <span className="text-xs text-text-secondary">Click or drag to replace</span>
              </div>
            ) : form["profile Image"] && imgError ? (
              <div className="flex flex-col items-center gap-2">
                <div className="h-20 w-20 rounded-full bg-red-50 dark:bg-red-500/10 border-2 border-red-200 dark:border-red-500/20 flex items-center justify-center">
                  <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <button type="button" onClick={(e) => { e.stopPropagation(); setImgError(false); }} className="text-xs text-primary underline">Retry</button>
              </div>
            ) : uploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span className="text-xs text-text-secondary">Uploading...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <svg className="h-8 w-8 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                <span className="text-xs text-text-secondary">Click or drag photo here</span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <div className="mt-2">
            <label className="mb-1 block text-xs text-text-secondary">Or paste image URL</label>
            <input
              className={inputClass}
              value={form["profile Image"]}
              onChange={(e) => { update("profile Image", e.target.value); setImgError(false); }}
              onBlur={(e) => {
                const normalized = normalizeImageUrl(e.target.value);
                if (normalized !== e.target.value) update("profile Image", normalized);
              }}
              placeholder="https://res.cloudinary.com/..."
            />
            <p className="mt-1 text-[10px] text-text-secondary">Direct image links only (Cloudinary, Imgur, etc). Google Drive sharing links won&apos;t work.</p>
          </div>
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
          className="relative overflow-hidden rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-primary-light disabled:opacity-80 min-w-[140px]"
        >
          {submitting && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary-light/30 animate-pulse" />
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent relative z-10" />
            </div>
          )}
          <span className={submitting ? "invisible" : ""}>
            {initialData ? "Update Member" : "Add Member"}
          </span>
          {submitting && (
            <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">Saving...</span>
          )}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={submitting} className="rounded-full border border-card-border bg-card px-6 py-2.5 text-sm font-medium text-text-primary transition hover:bg-primary-bg disabled:opacity-50">
            Cancel
          </button>
        )}
      </div>

      {editorFile && (
        <ImageEditor
          file={editorFile}
          onConfirm={handleEditorConfirm}
          onCancel={() => setEditorFile(null)}
        />
      )}
    </form>
  );
}
