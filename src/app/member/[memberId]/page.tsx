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

  const status = member.status ?? "Verified";

  if (status !== "Verified") {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-bg p-4">
        <ProfileStatus status={status} />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-bg">
      <div className="mx-auto max-w-xl px-3 pb-8 sm:px-4 sm:max-w-2xl">
        <ProfileCard member={member} />

        <div className="mt-2">
          <ProfileTabsWrapper member={member} />
        </div>
      </div>
    </div>
  );
}
