import { MemberStatus } from "@/types/member";

interface Props {
  status: MemberStatus;
}

const messages: Record<MemberStatus, { title: string; desc: string }> = {
  Unverified: {
    title: "Profile Not Verified",
    desc: "This member profile has not been verified yet. Please check back later.",
  },
  Inactive: {
    title: "Profile Inactive",
    desc: "This profile is currently inactive. Contact the club administration for more information.",
  },
  Verified: {
    title: "",
    desc: "",
  },
};

export default function ProfileStatus({ status }: Props) {
  if (status === "Verified") return null;

  const msg = messages[status];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 rounded-2xl bg-card p-12 text-center ring-1 ring-card-border">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50">
        <svg className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-text-primary">{msg.title}</h1>
      <p className="text-text-secondary">{msg.desc}</p>
    </div>
  );
}
