import { MemberStatus } from "@/types/member";

interface Props {
  status?: MemberStatus;
}

const styles: Record<MemberStatus, string> = {
  Verified: "bg-green-50 text-green-600 ring-green-200",
  Unverified: "bg-primary-bg text-primary ring-primary/20",
  Inactive: "bg-red-50 text-red-500 ring-red-200",
};

export default function StatusBadge({ status }: Props) {
  const s = status ?? "Verified";
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${styles[s]}`}
    >
      {s}
    </span>
  );
}
