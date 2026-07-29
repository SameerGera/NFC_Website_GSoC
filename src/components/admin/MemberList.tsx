"use client";

import { Member, MemberStatus } from "@/types/member";

interface Props {
  members: Member[];
  onEdit: (member: Member) => void;
  onDelete: (username: string) => void;
  onToggleStatus: (username: string, status: MemberStatus) => void;
}

export default function MemberList({ members, onEdit, onDelete, onToggleStatus }: Props) {
  if (members.length === 0) {
    return (
      <div className="rounded-2xl bg-card border border-card-border p-12 text-center">
        <p className="text-text-secondary">No members found. Add your first member.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl bg-card border border-card-border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-card-border text-text-secondary">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Username</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Department</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.username} className="border-b border-card-border/50 transition hover:bg-primary-bg/30">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-primary-bg">
                    {member["profile Image"] ? (
                      <img src={member["profile Image"]} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-primary font-medium">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="font-medium text-text-primary">{member.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-text-secondary">{member.username}</td>
              <td className="px-4 py-3 text-text-secondary">{member.clubrole}</td>
              <td className="px-4 py-3 text-text-secondary">{member.department}</td>
              <td className="px-4 py-3">
                <StatusBadgeInline status={member.status ?? "Verified"} />
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(member)}
                    className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition hover:bg-primary/20"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      onToggleStatus(
                        member.username,
                        (member.status ?? "Verified") === "Verified" ? "Unverified" : "Verified"
                      )
                    }
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                      (member.status ?? "Verified") === "Verified"
                        ? "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                        : "bg-green-50 text-green-600 hover:bg-green-100"
                    }`}
                  >
                    {(member.status ?? "Verified") === "Verified" ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => onDelete(member.username)}
                    className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-medium text-red-500 transition hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadgeInline({ status }: { status: MemberStatus }) {
  const styles: Record<MemberStatus, string> = {
    Verified: "bg-green-50 text-green-600",
    Unverified: "bg-primary-bg text-primary",
    Inactive: "bg-red-50 text-red-500",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}
