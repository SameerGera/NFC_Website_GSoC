"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { db, auth } from "@/lib/firebase-client";
import { Member, MemberStatus } from "@/types/member";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/admin/AuthGuard";
import MemberList from "@/components/admin/MemberList";
import MemberForm from "@/components/admin/MemberForm";

function DashboardContent() {
  const [members, setMembers] = useState<Member[]>([]);
  const [editing, setEditing] = useState<Member | null>(null);
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth(), (u) => {
      setUser(u);
    });
    return unsub;
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const fetchMembers = async () => {
    const snap = await getDocs(collection(db(), "members"));
    const list = snap.docs.map((d) => {
      const raw = d.data();
      const social = raw.social as Record<string, string> | undefined;
      return {
        username: d.id,
        name: raw.name ?? "",
        email: raw.email ?? "",
        phone: raw.phone ?? "",
        clubrole: raw.clubrole ?? "",
        department: raw.department ?? "",
        year: raw.year ?? "",
        bio: raw.bio ?? "",
        "registration number": raw["registration number"] ?? "",
        "profile Image": raw["profile Image"] ?? "",
        skills: raw.skills ?? [],
        projects: raw.projects ?? [],
        certificates: raw.certificates ?? [],
        achievements: raw.achievements ?? [],
        github: raw.github ?? "",
        linkedin: social?.LinkedIn ?? social?.linkedin ?? raw.linkedin ?? "",
        portfolio: raw.portfolio ?? "",
        status: raw.status ?? "Verified",
      } as Member;
    });
    setMembers(list);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSave = async (data: Member) => {
    const { username, ...rest } = data;
    await setDoc(doc(db(), "members", username), rest);
    await fetchMembers();
    showToast(editing ? "Member updated!" : "Member added!");
    setAdding(false);
    setEditing(null);
  };

  const handleDelete = async (username: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    await deleteDoc(doc(db(), "members", username));
    await fetchMembers();
    showToast("Member deleted");
  };

  const handleToggleStatus = async (username: string, status: MemberStatus) => {
    await updateDoc(doc(db(), "members", username), { status });
    await fetchMembers();
  };

  const handleLogout = async () => {
    await signOut(auth());
    router.push("/admin/login");
  };

  const filtered = members.filter(
    (m) =>
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Admin Dashboard</h1>
            <p className="text-sm text-text-secondary">
              {user?.email} &middot; {members.length} members
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setAdding(true); setEditing(null); }}
              className="rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-light"
            >
              Add Member
            </button>
            <button
              onClick={handleLogout}
              className="rounded-full border border-card-border bg-card px-4 py-2.5 text-sm font-medium text-text-primary transition hover:bg-primary-bg"
            >
              Logout
            </button>
          </div>
        </div>

        {toast && (
          <div className="mb-4 rounded-2xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 px-4 py-3 text-sm font-medium text-green-700 dark:text-green-400 flex items-center gap-2">
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {toast}
          </div>
        )}

        <input
          type="text"
          placeholder="Search by name or username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full rounded-xl border border-card-border bg-card px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {(adding || editing) && (
          <div className="mb-8 rounded-2xl bg-card border border-card-border p-6">
            <h2 className="mb-4 text-lg font-semibold text-text-primary">
              {editing ? `Edit: ${editing.name}` : "Add New Member"}
            </h2>
            <MemberForm
              initialData={editing ?? undefined}
              onSubmit={handleSave}
              onCancel={() => { setAdding(false); setEditing(null); }}
            />
          </div>
        )}

        <MemberList
          members={filtered}
          onEdit={(m) => { setEditing(m); setAdding(false); }}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
