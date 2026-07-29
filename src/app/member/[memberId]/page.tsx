import { notFound } from "next/navigation";
import { getMember } from "@/lib/get-member";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileTabsWrapper from "@/components/profile/ProfileTabsWrapper";
import ProfileStatus from "@/components/profile/ProfileStatus";

export const dynamic = "force-dynamic";

export default async function MemberPage({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = await params;
  const member = await getMember(memberId);

  if (!member) {
    notFound();
  }

  if (member.status !== "Verified") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-4">
        <ProfileStatus status={member.status} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-lg px-4 pb-12">
        <ProfileCard member={member} />

        <div className="mt-4">
          <ProfileTabsWrapper member={member} />
        </div>

        <footer className="pt-8 text-center text-xs text-text-secondary">
          GSOCK ID &middot; {member.memberId}
        </footer>
      </div>
    </div>
  );
}
